import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Factory pra Supabase client tipado.
 *
 * Design agnóstico Vite/Next: o package NÃO lê env vars diretamente.
 * App consumidor lê seu próprio env e passa pra cá:
 *
 * @example apps/app (Vite)
 *   const supabase = createDojoSupabase(
 *     import.meta.env.VITE_SUPABASE_URL,
 *     import.meta.env.VITE_SUPABASE_ANON_KEY,
 *   );
 *
 * @example apps/site (Next.js)
 *   const supabase = createDojoSupabase(
 *     process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 *   );
 */
export function createDojoSupabase(
  url: string,
  anonKey: string
): SupabaseClient<Database> {
  if (!url || !anonKey) {
    throw new Error(
      "[@dojo-fs/supabase] SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórios. Veja .env.example."
    );
  }
  return createClient<Database>(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export type DojoSupabaseClient = SupabaseClient<Database>;
