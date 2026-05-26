"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ORG_SHORT } from "@dojo-fs/ui";

interface MobileNavProps {
  links: { href: string; label: string }[];
  ctaHref: string;
  ctaLabel: string;
}

export function MobileNav({ links, ctaHref, ctaLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Abrir menu"
          className="flex h-11 w-11 items-center justify-center text-dojo-white md:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            aria-hidden="true"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="13" x2="20" y2="13" />
            <line x1="4" y1="19" x2="20" y2="19" />
          </svg>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-dojo-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content
          className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-xs flex-col bg-dojo-black border-l border-dojo-white/10 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>

          {/* Header do drawer */}
          <div className="flex items-center justify-between border-b border-dojo-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-redondo-branco.png"
                alt={`Logo ${ORG_SHORT}`}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <span className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white">
                {ORG_SHORT}
              </span>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Fechar menu"
                className="flex h-11 w-11 items-center justify-center text-dojo-white/60 transition-colors hover:text-dojo-white"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  aria-hidden="true"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Links verticais */}
          <nav className="flex flex-1 flex-col px-6 py-8" aria-label="Navegação móvel">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-lg font-bold uppercase tracking-widest text-dojo-white/70 transition-colors hover:text-dojo-red active:text-dojo-red"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA final */}
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-sm border border-dojo-red bg-dojo-red px-6 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98]"
            >
              {ctaLabel}
            </Link>

            {/* Linha decorativa final */}
            <div className="mt-8 h-px w-full bg-dojo-white/5" aria-hidden="true" />
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-dojo-white/30">
              Ceder para vencer
            </p>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
