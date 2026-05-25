import {
  createServerClient as createSSRServerClient,
  type CookieOptions,
} from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./types";

/**
 * Helper pra Next.js middleware refrescar session do Supabase + retornar
 * NextResponse com cookies atualizados.
 *
 * IMPORTANTE: chama `supabase.auth.getUser()` (não getSession) — isso valida
 * o token contra Auth server, evitando session expirada client-side.
 *
 * Pattern oficial Supabase docs (Next.js 15 App Router):
 * https://supabase.com/docs/guides/auth/server-side/nextjs
 *
 * @returns { response, user } — middleware deve retornar a response. User pode
 *   ser null (sem session) ou User object (autenticado).
 */
export async function updateSession(
  request: NextRequest
): Promise<{ response: NextResponse; user: Awaited<ReturnType<typeof getUser>> }> {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createSSRServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: CookieOptions;
          }[]
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Force token refresh — atualiza cookies se token expirou
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response: supabaseResponse, user };
}

// type helper pra signature do retorno
async function getUser() {
  return null as { id: string; email?: string } | null;
}
