"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  ORG_SHORT,
  ORG_NAME,
  SLOGAN,
  MODALIDADES,
  LOCALIDADE,
  SENSEI,
} from "@dojo-fs/ui";
import { motion, footerReveal, fadeOnly } from "./MotionConfig";

const INSTAGRAM_URL = "https://www.instagram.com/dojofamiliascholze/";
const YOUTUBE_URL = "https://www.youtube.com/@DojoFamiliaScholze";
const WHATSAPP_URL = "https://wa.me/5500000000000"; // Placeholder

export function FooterExpanded() {
  const reduced = useReducedMotion();
  const variants = reduced ? fadeOnly : footerReveal;

  return (
    <footer className="border-t border-dojo-white/10 bg-dojo-black">
      <motion.div
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Coluna 1: Marca */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-redondo-branco.png"
                alt={`Logo ${ORG_SHORT}`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-display text-base font-bold uppercase tracking-widest text-dojo-white">
                  {ORG_NAME}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-dojo-white/40">
                  {MODALIDADES.join(" · ")} — {LOCALIDADE}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md font-serif text-base italic text-dojo-white/60">
              &ldquo;{SLOGAN}&rdquo;
            </p>

            <p className="mt-4 max-w-md text-sm text-dojo-white/50">
              Tradição japonesa de Jigoro Kano. Sensei {SENSEI} forma judocas e
              jiujiteiros há décadas em Curitiba.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Dojô Família Scholze"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-dojo-white/10 text-dojo-white/60 transition-all hover:border-dojo-red hover:text-dojo-red"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Dojô Família Scholze"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-dojo-white/10 text-dojo-white/60 transition-all hover:border-dojo-red hover:text-dojo-red"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Sensei Cristiano"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-dojo-white/10 text-dojo-white/60 transition-all hover:border-dojo-red hover:text-dojo-red"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
              Navegação
            </p>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-dojo-white/60 transition-colors hover:text-dojo-white"
                >
                  Sobre o Dojô
                </Link>
              </li>
              <li>
                <Link
                  href="/modalidades"
                  className="text-sm text-dojo-white/60 transition-colors hover:text-dojo-white"
                >
                  Modalidades
                </Link>
              </li>
              <li>
                <a
                  href="/#locais"
                  className="text-sm text-dojo-white/60 transition-colors hover:text-dojo-white"
                >
                  Locais & Planos
                </a>
              </li>
              <li>
                <a
                  href="/#avaliacoes"
                  className="text-sm text-dojo-white/60 transition-colors hover:text-dojo-white"
                >
                  Avaliações
                </a>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-sm text-dojo-white/60 transition-colors hover:text-dojo-white"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Sistema */}
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
              Sistema
            </p>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-dojo-white/60 transition-colors hover:text-dojo-white"
                >
                  Entrar (Aluno/Professor)
                </Link>
              </li>
              <li>
                <a
                  href="/#contato"
                  className="text-sm text-dojo-white/60 transition-colors hover:text-dojo-white"
                >
                  Aula experimental
                </a>
              </li>
            </ul>

            <p className="mt-8 font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
              Federações
            </p>
            <ul className="mt-4 space-y-2">
              <li className="text-xs uppercase tracking-widest text-dojo-white/50">
                CBJ — Judô
              </li>
              <li className="text-xs uppercase tracking-widest text-dojo-white/50">
                IBJJF — Jiu-Jitsu
              </li>
            </ul>
          </div>
        </div>

        {/* Linha decorativa */}
        <div className="mt-16 h-px w-full bg-dojo-white/5" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs uppercase tracking-widest text-dojo-white/30">
            Sensei {SENSEI} · © 2026 {ORG_SHORT}
          </p>
          <p className="text-xs uppercase tracking-widest text-dojo-white/30">
            Sistema desenvolvido por{" "}
            <a
              href="https://github.com/Davi-Scholze"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dojo-white/50 transition-colors hover:text-dojo-red"
            >
              Davi Scholze · KOD.AI
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
