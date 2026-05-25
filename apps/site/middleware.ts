import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@dojo-fs/supabase/middleware";

/**
 * Middleware Next.js — auth gating dojo-familia-scholze.
 *
 * Comportamento:
 * - Refresca cookies session em toda request (via @dojo-fs/supabase updateSession)
 * - `/dashboard/*` sem session → redirect `/login?next=<original-path>`
 * - `/login` com session ativa → redirect `/dashboard`
 * - Outras rotas: passa direto (públicas / assets)
 *
 * Matcher exclui: _next assets, manifest PWA, service worker, ícones,
 * arquivos estáticos (PNG/JPG/SVG/ICO). Auth callback (`/auth/callback`)
 * passa pelo middleware mas não é interceptado (sem condição).
 */
export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Rotas autenticadas: precisa de session
  if (pathname.startsWith("/dashboard") && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // /login com session ativa → vai direto pro dashboard
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Aplica a todas rotas EXCETO:
     * - _next/static, _next/image (Next.js build assets)
     * - favicon, manifest, sw.js, workbox-*.js (PWA)
     * - arquivos com extensão de imagem (.png, .jpg, .svg, .ico, .webp)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|manifest\\.webmanifest|sw\\.js|workbox-.*\\.js|.*\\.(?:png|jpg|jpeg|svg|webp|ico)).*)",
  ],
};
