import {
  createServerClient as createSSRServerClient,
  type CookieOptions,
} from "@supabase/ssr";
import type { Database } from "./types";

export type DojoSupabaseServerClient = ReturnType<
  typeof createSSRServerClient<Database>
>;

/**
 * Cookie methods interface — abstrai diferenças entre Next.js cookies() API
 * (Server Components / Route Handlers / Server Actions) e o que `createServerClient`
 * espera. Apps consumidores passam a implementação concreta.
 */
export type CookieMethodsServer = {
  getAll: () => { name: string; value: string }[];
  setAll: (
    cookiesToSet: { name: string; value: string; options?: CookieOptions }[]
  ) => void;
};

/**
 * Factory pra Supabase client em contexto server-side com SSR cookies.
 *
 * Uso em Server Component (Next.js App Router):
 *
 * @example
 *   import { cookies } from "next/headers";
 *   import { createServerClient } from "@dojo-fs/supabase/server";
 *
 *   export default async function Page() {
 *     const cookieStore = await cookies();
 *     const supabase = createServerClient({
 *       getAll: () => cookieStore.getAll(),
 *       setAll: (toSet) => toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
 *     });
 *     const { data: { user } } = await supabase.auth.getUser();
 *     return <pre>{JSON.stringify(user, null, 2)}</pre>;
 *   }
 *
 * Em Route Handler (`route.ts`) ou Server Action: idem, com cookies() de `next/headers`.
 *
 * Em Server Component que NÃO pode escrever cookies (rendering): setAll vira no-op
 * (Next.js avisa em runtime mas não falha — Supabase auth-helpers padrão).
 */
export function createServerClient(
  cookieMethods: CookieMethodsServer
): DojoSupabaseServerClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "[@dojo-fs/supabase/server] NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórios. Veja .env.example."
    );
  }

  return createSSRServerClient<Database>(url, anonKey, {
    cookies: cookieMethods,
  });
}
