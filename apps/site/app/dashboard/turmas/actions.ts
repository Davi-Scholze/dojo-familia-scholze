"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@dojo-fs/supabase/server";
import type { TablesInsert } from "@dojo-fs/supabase/types";
import {
  TurmaInsertSchema,
  DIAS_SEMANA,
  type HorarioSlot,
} from "@dojo-fs/lib";

export type CriarTurmaState = {
  ok?: boolean;
  errors?: Record<string, string[] | undefined>;
  message?: string;
};

/**
 * Server Action — cria nova turma.
 *
 * UI Sprint 1b simplifica horario_recorrente: usuário escolhe N dias da semana
 * (checkboxes) + 1 par HH:MM aplicado a todos. Cobre ~80% casos reais.
 * Sprint 1c pode evoluir pra slots por dia (turmas com horários diferentes).
 */
export async function criarTurma(
  _prev: CriarTurmaState,
  formData: FormData,
): Promise<CriarTurmaState> {
  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return { ok: false, message: "Sessão expirada. Faça login novamente." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("dojo_id, role")
    .eq("owner_user_id", user.id)
    .maybeSingle<{ dojo_id: string | null; role: string }>();

  if (!profile?.dojo_id) {
    return {
      ok: false,
      message: "Complete seu onboarding antes de cadastrar turmas.",
    };
  }
  if (profile.role !== "professor") {
    return {
      ok: false,
      message: "Apenas professores podem cadastrar turmas.",
    };
  }

  // Monta horario_recorrente: dias selecionados x mesmo intervalo HH:MM
  const diasSelecionados = formData.getAll("dias").map(String);
  const inicio = String(formData.get("horario_inicio") ?? "");
  const fim = String(formData.get("horario_fim") ?? "");

  const horarioRecorrente: HorarioSlot[] = diasSelecionados
    .filter((d): d is (typeof DIAS_SEMANA)[number] =>
      (DIAS_SEMANA as readonly string[]).includes(d),
    )
    .map((dia) => ({ dia, inicio, fim }));

  const capacidadeRaw = formData.get("capacidade_max");
  const capacidade_max =
    capacidadeRaw && String(capacidadeRaw).trim()
      ? Number(capacidadeRaw)
      : undefined;

  const raw = {
    dojo_id: profile.dojo_id,
    nome: formData.get("nome"),
    modalidade: formData.get("modalidade"),
    descricao: formData.get("descricao") || null,
    faixa_etaria: formData.get("faixa_etaria") || "livre",
    nivel: formData.get("nivel") || "livre",
    horario_recorrente: horarioRecorrente,
    capacidade_max,
    cor: formData.get("cor") || "#dc2626",
  };

  const parsed = TurmaInsertSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Verifique os campos abaixo.",
    };
  }

  const insert: TablesInsert<"turmas"> = {
    dojo_id: parsed.data.dojo_id,
    nome: parsed.data.nome,
    modalidade: parsed.data.modalidade,
    descricao: parsed.data.descricao ?? null,
    faixa_etaria: parsed.data.faixa_etaria,
    nivel: parsed.data.nivel,
    horario_recorrente: parsed.data.horario_recorrente,
    capacidade_max: parsed.data.capacidade_max ?? null,
    cor: parsed.data.cor,
  };

  const { error } = await (supabase.from("turmas") as any).insert(insert);

  if (error) {
    return { ok: false, message: `Erro ao cadastrar turma: ${error.message}` };
  }

  revalidatePath("/dashboard/turmas");
  redirect("/dashboard/turmas");
}
