"use client";

import Image from "next/image";
import Link from "next/link";
import { ORG_SHORT } from "@dojo-fs/ui";
import { MobileNav } from "./MobileNav";

export const NAV_LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/modalidades", label: "Modalidades" },
  { href: "/#locais", label: "Locais" },
  { href: "/#avaliacoes", label: "Avaliações" },
  { href: "/#contato", label: "Agendar" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-dojo-white/5 bg-dojo-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="Início">
          <Image
            src="/logo-redondo-branco.png"
            alt={`Logo ${ORG_SHORT}`}
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-full"
          />
          <span className="hidden font-display text-sm font-bold uppercase tracking-widest text-dojo-white sm:inline">
            {ORG_SHORT}
          </span>
        </Link>

        {/* Nav desktop (md+) */}
        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-dojo-white/60 transition-colors hover:text-dojo-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red focus-visible:ring-offset-2 focus-visible:ring-offset-dojo-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop (md+) */}
        <Link
          href="/login"
          className="hidden rounded-sm border border-dojo-red bg-dojo-red px-5 py-2 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98] md:inline-flex"
        >
          Entrar
        </Link>

        {/* Mobile nav (hamburger + drawer) */}
        <MobileNav
          links={NAV_LINKS}
          ctaHref="/login"
          ctaLabel="Entrar no Dojô"
        />
      </div>
    </header>
  );
}
