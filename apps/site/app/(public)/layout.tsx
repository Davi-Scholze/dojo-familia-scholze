import type { ReactNode } from "react";
import { SiteHeader } from "../../components/SiteHeader";
import { FooterExpanded } from "../../components/FooterExpanded";

/**
 * PublicLayout — wrapper compartilhado de todas as páginas públicas.
 * Inclui SiteHeader sticky + FooterExpanded.
 *
 * Aplicado via Next.js App Router route group `(public)/`.
 * URLs não mudam: `/`, `/sobre`, `/modalidades`, `/contato`.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-dojo-black">{children}</main>
      <FooterExpanded />
    </>
  );
}
