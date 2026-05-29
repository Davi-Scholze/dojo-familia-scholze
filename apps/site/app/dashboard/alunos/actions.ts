"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@dojo-fs/supabase/server";
import type { TablesInsert } from "@dojo-fs/supabase/types";
import {
  AlunoInsertSchema,
  type DadosMedicos,
} from "@dojo-fs/lib";

export type CriarAlunoState = {
  ok?: boolean;
  errors?: Record<string, string[] | undefined>;
  message?: string;
};

/**
 * Server Action — cria novo aluno vinculado ao dojo do professor logado.
 *
 * Fluxo:
 *   1. Valida session + role=professor + dojo_id
 *   2. Coleta campos do FormData + monta DadosMedicosSchema jsonb
 *   3. AlunoInsertSchema valida (inclui superRefine "menor exige responsavel")
 *   4. INSERT → revalidatePath('/dashboard/alunos') → redirect
 *
 * Sprint 1b: responsavel_profile_id sempre null (UI de responsavel é Sprint 1c).
 * Logo, cadastro de menor < 18 será bloqueado pelo Zod com mensagem amigavel.
 */
export async function criarAluno(
  _prev: CriarAlunoState,
  formData: FormData,
): Promise<CriarAlunoState> {
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
      message: "Complete seu onboarding antes de cadastrar alunos.",
    };
  }
  if (profile.role !== "professor") {
    return {
      ok: false,
      message: "Apenas professores podem cadastrar alunos.",
    };
  }

  // Monta dados_medicos jsonb a partir de 1 textarea livre (UI Sprint 1b simplificada)
  const observacoesMedicas = formData.get("observacoes_medicas");
  const dadosMedicos: DadosMedicos =
    typeof observacoesMedicas === "string" && observacoesMedicas.trim()
      ? { observacoes: observacoesMedicas.trim() }
      : {};

  const raw = {
    dojo_id: profile.dojo_id,
    responsavel_profile_id: null,
    nome_completo: formData.get("nome_completo"),
    apelido: formData.get("apelido") || null,
    data_nascimento: formData.get("data_nascimento"),
    genero: formData.get("genero") || null,
    telefone: formData.get("telefone") || null,
    email: formData.get("email") || null,
    modalidade_principal: formData.get("modalidade_principal") || "ambos",
    faixa_atual: formData.get("faixa_atual") || "branca",
    graus: Number(formData.get("graus") ?? 0),
    data_graduacao_atual: formData.get("data_graduacao_atual") || null,
    dados_medicos: dadosMedicos,
    contato_emergencia_nome: formData.get("contato_emergencia_nome") || null,
    contato_emergencia_telefone:
      formData.get("contato_emergencia_telefone") || null,
    contato_emergencia_parentesco:
      formData.get("contato_emergencia_parentesco") || null,
    observacoes: formData.get("observacoes") || null,
  };

  const parsed = AlunoInsertSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Verifique os campos abaixo.",
    };
  }

  const insert: TablesInsert<"alunos"> = {
    dojo_id: parsed.data.dojo_id,
    responsavel_profile_id: parsed.data.responsavel_profile_id,
    nome_completo: parsed.data.nome_completo,
    apelido: parsed.data.apelido,
    data_nascimento: parsed.data.data_nascimento,
    genero: parsed.data.genero,
    telefone: parsed.data.telefone,
    email: parsed.data.email,
    modalidade_principal: parsed.data.modalidade_principal,
    faixa_atual: parsed.data.faixa_atual,
    graus: parsed.data.graus,
    data_graduacao_atual: parsed.data.data_graduacao_atual,
    dados_medicos: parsed.data.dados_medicos,
    contato_emergencia_nome: parsed.data.contato_emergencia_nome,
    contato_emergencia_telefone: parsed.data.contato_emergencia_telefone,
    contato_emergencia_parentesco: parsed.data.contato_emergencia_parentesco,
    observacoes: parsed.data.observacoes,
  };

  const { error } = await (supabase.from("alunos") as any).insert(insert);

  if (error) {
    return { ok: false, message: `Erro ao cadastrar aluno: ${error.message}` };
  }

  revalidatePath("/dashboard/alunos");
  redirect("/dashboard/alunos");
}
