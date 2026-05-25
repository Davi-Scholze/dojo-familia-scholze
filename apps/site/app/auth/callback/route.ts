import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@dojo-fs/supabase/server";

/**
 * Route Handler — processa redirect do Supabase Auth Magic Link.
 *
 * Fluxo:
 *   1. User clica Magic Link no email → Supabase Auth → redirect aqui com `?code=...`
 *   2. Trocamos `code` por session via `supabase.auth.exchangeCodeForSession(code)`
 *      — cookies de session são setados automaticamente pelo cookieMethods
 *   3. Redirect pro `next` (default `/dashboard`)
 *   4. Se falhar: redirect `/login?error=auth_callback`
 *
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=missing_code", origin)
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[/auth/callback] exchange failed:", error.message);
    return NextResponse.redirect(
      new URL(
        `/login?error=auth_callback&message=${encodeURIComponent(error.message)}`,
        origin
      )
    );
  }

  return NextResponse.redirect(new URL(next, origin));
}
