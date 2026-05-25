"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@dojo-fs/supabase/server";

type Result =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Server Action — solicita Magic Link via Supabase Auth.
 *
 * Cuidado: dispara email REAL pra `email` informado. Em dev local
 * (email @test.local que nunca chega na inbox), Davi pega o link via
 * `scripts/seed-test-profiles.mjs` em vez de tentar pela form.
 */
export async function requestMagicLink(formData: FormData): Promise<Result> {
  const email = formData.get("email");
  if (!email || typeof email !== "string") {
    return { ok: false, error: "Email obrigatório." };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
