"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@dojo-fs/supabase/server";
import type { TablesInsert } from "@dojo-fs/supabase/types";
import { PresencaStatusSchema } from "@dojo-fs/lib";

export type ToggleResult = { ok: boolean; message?: string };

/**
 * Server Action — alterna/define presença de um aluno em uma aula.
 *
 * Estados: presente | ausente | justificada | null (não marcado).
 * Mesmo aluno+aula = mesmo row (UNIQUE constraint); upsert via PK composta lógica.
 *
 * Sprint 1b: cria presenca se não existe, atualiza se existe.
 * Quem marca: profile do user atual (registrado em `marcada_por`).
 */
export async function marcarPresenca(
  aulaId: string,
  alunoId: string,
  status: "presente" | "ausente" | "justificada",
): Promise<ToggleResult> {
  const statusParse = PresencaStatusSchema.safeParse(status);
  if (!statusParse.success) {
    return { ok: false, message: "Status inválido." };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Sessão expirada." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, dojo_id")
    .eq("owner_user_id", user.id)
    .maybeSingle<{
      id: string;
      role: string;
      dojo_id: string | null;
    }>();

  if (!profile?.dojo_id || profile.role !== "professor") {
    return { ok: false, message: "Apenas professores podem marcar presença." };
  }

  // Upsert: tenta UPDATE primeiro; se não atualizou, INSERT
  const nowIso = new Date().toISOString();
  const { data: existing } = await supabase
    .from("presencas")
    .select("id")
    .eq("aula_id", aulaId)
    .eq("aluno_id", alunoId)
    .maybeSingle<{ id: string }>();

  if (existing?.id) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const { error } = await (supabase.from("presencas") as any)
      .update({
        presenca_status: statusParse.data,
        presenca_em: nowIso,
        marcada_por: profile.id,
      })
      .eq("id", existing.id);
    /* eslint-enable @typescript-eslint/no-explicit-any */
    if (error) return { ok: false, message: error.message };
  } else {
    const insert: TablesInsert<"presencas"> = {
      aula_id: aulaId,
      aluno_id: alunoId,
      presenca_status: statusParse.data,
      presenca_em: nowIso,
      marcada_por: profile.id,
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const { error } = await (supabase.from("presencas") as any).insert(insert);
    /* eslint-enable @typescript-eslint/no-explicit-any */
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/dashboard/presenca/hoje");
  return { ok: true };
}

/**
 * Server Action — fecha aula (consolida planejamento + observações).
 *
 * Apenas professor do dojô. Operação one-way: aula fechada não reabre nesta sprint.
 */
export async function fecharAula(
  aulaId: string,
  planejamentoCumprido: boolean,
  observacoesGerais: string | null,
): Promise<ToggleResult> {
  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Sessão expirada." };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { error } = await (supabase.from("aulas") as any)
    .update({
      planejamento_cumprido: planejamentoCumprido,
      observacoes_gerais: observacoesGerais,
      fechada_em: new Date().toISOString(),
    })
    .eq("id", aulaId);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  if (error) return { ok: false, message: error.message };

  revalidatePath("/dashboard/presenca/hoje");
  return { ok: true };
}
