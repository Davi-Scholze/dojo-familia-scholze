"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerClient } from "@dojo-fs/supabase/server";
import type { TablesInsert, TablesUpdate } from "@dojo-fs/supabase/types";
import { ModalidadeDojoSchema } from "@dojo-fs/lib";

const OnboardingSchema = z.object({
  // Dojô
  descricao: z.string().max(2000).optional().nullable(),
  modalidades: z
    .array(ModalidadeDojoSchema)
    .min(1, "Selecione ao menos uma modalidade"),
  endereco: z.string().max(300).optional().nullable(),
  whatsapp: z.string().max(30).optional().nullable(),

  // Professor (profile próprio)
  full_name: z.string().min(2, "Seu nome completo é obrigatório").max(150),
  modalidade_principal: z.enum(["judo", "jiu-jitsu", "ambos"]),
  anos_experiencia: z
    .number({ coerce: true })
    .int()
    .nonnegative()
    .optional()
    .nullable(),
});

export type OnboardingState = {
  ok?: boolean;
  errors?: Record<string, string[] | undefined>;
  message?: string;
};

/**
 * Server Action — completa onboarding do professor + dados do dojô.
 *
 * Fluxo:
 *   1. Valida campos via Zod
 *   2. Garante session ativa
 *   3. INSERT profile (role=professor, vincula ao singleton dojo) — precisa vir
 *      ANTES do UPDATE dojo porque policy dojos_update_professor exige profile
 *      existente com role='professor' do user atual
 *   4. UPDATE dojo singleton com descricao + modalidades + endereco + whatsapp
 *   5. Redirect pro dashboard
 *
 * Idempotência: se profile já existe, retorna erro amigável (cliente redireciona).
 */
export async function completarOnboarding(
  _prev: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const raw = {
    descricao: formData.get("descricao") || null,
    modalidades: formData.getAll("modalidades"),
    endereco: formData.get("endereco") || null,
    whatsapp: formData.get("whatsapp") || null,
    full_name: formData.get("full_name"),
    modalidade_principal: formData.get("modalidade_principal"),
    anos_experiencia: formData.get("anos_experiencia") || null,
  };

  const parsed = OnboardingSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Verifique os campos abaixo.",
    };
  }

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

  const { data: dojo, error: dojoErr } = await supabase
    .from("dojos")
    .select("id")
    .eq("slug", "dojo-familia-scholze")
    .maybeSingle<{ id: string }>();

  if (dojoErr || !dojo) {
    return {
      ok: false,
      message:
        "Dojô base não encontrado. Contate suporte (esta instância exige seed inicial).",
    };
  }

  const profileInsert: TablesInsert<"profiles"> = {
    owner_user_id: user.id,
    dojo_id: dojo.id,
    role: "professor",
    full_name: parsed.data.full_name,
    modalidade_principal: parsed.data.modalidade_principal,
    anos_experiencia: parsed.data.anos_experiencia ?? null,
  };

  // TS inference do supabase-js encadeada com `Database` regenerado falha em
  // `.insert/.update` — single cast contorna sem perder validação Zod (acima).
  // Tech debt: refatorar quando upgrade supabase-js v3 chegar.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { error: profileErr } = await (supabase.from("profiles") as any)
    .insert(profileInsert);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  if (profileErr) {
    if (/duplicate|unique/i.test(profileErr.message)) {
      return {
        ok: false,
        message: "Você já tem perfil cadastrado. Recarregando dashboard…",
      };
    }
    return {
      ok: false,
      message: `Erro ao criar perfil: ${profileErr.message}`,
    };
  }

  const dojoUpdate: TablesUpdate<"dojos"> = {
    descricao: parsed.data.descricao,
    modalidades: parsed.data.modalidades,
    endereco: parsed.data.endereco,
    whatsapp: parsed.data.whatsapp,
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { error: dojoUpdateErr } = await (supabase.from("dojos") as any)
    .update(dojoUpdate)
    .eq("id", dojo.id);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  if (dojoUpdateErr) {
    // Profile criado com sucesso; dojo update falhou — não bloqueia entrada no dashboard.
    // Professor edita depois na tela "Meu Dojô" (Sprint 1c).
    console.warn(
      "[onboarding] dojo update warning:",
      dojoUpdateErr.message,
    );
  }

  redirect("/dashboard");
}
