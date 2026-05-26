"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  motion,
  heroReveal,
  heroRevealDelayed,
  lineDrawReveal,
  fadeOnly,
} from "./MotionConfig";

interface PageHeroProps {
  /** Eyebrow uppercase tracking-wide vermelho (ex: "A história", "O que ensinamos") */
  label: string;
  /** Título h1 da página (pode incluir <br /> via JSX como children) */
  title: React.ReactNode;
  /** Lead paragraph descritivo (1-2 frases curtas) */
  lead?: string;
  /** Breadcrumb path atual (sem "Início" — adicionado automático) */
  breadcrumb: string;
}

/**
 * Page Hero padronizado para todas páginas públicas dedicadas
 * (`/sobre`, `/modalidades`, `/contato`).
 *
 * Mantém continuidade visual com home via:
 * - Linha vermelha topo animada (`lineDrawReveal` — mesmo elemento do hero da home)
 * - Tipografia escalada (`text-5xl sm:text-6xl lg:text-7xl` — h1 acima dos h2 internos)
 * - Background `bg-dojo-black` puro (sem imagem — sóbrio vs cinematic da home)
 * - Motion variants importados de MotionConfig (consistência com home)
 */
export function PageHero({ label, title, lead, breadcrumb }: PageHeroProps) {
  const reduced = useReducedMotion();
  const titleVariants = reduced ? fadeOnly : heroReveal;
  const subVariants = reduced ? fadeOnly : heroRevealDelayed;
  const lineVariants = reduced ? fadeOnly : lineDrawReveal;

  return (
    <section className="relative overflow-hidden bg-dojo-black pt-32 pb-20 sm:pt-40 sm:pb-24">
      {/* Linha vermelha topo — continuidade visual com hero da home */}
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-dojo-red"
        style={{ transformOrigin: "left" }}
        initial="hidden"
        animate="visible"
        variants={lineVariants}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav
          className="mb-8 text-xs uppercase tracking-[0.3em] text-dojo-white/50"
          aria-label="Caminho da página"
        >
          <Link
            href="/"
            className="transition-colors hover:text-dojo-red focus-visible:outline-none focus-visible:text-dojo-red"
          >
            Início
          </Link>
          <span className="mx-3" aria-hidden="true">·</span>
          <span className="text-dojo-white/70">{breadcrumb}</span>
        </nav>

        {/* Eyebrow */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={subVariants}
          transition={{ delay: 0.1 }}
          className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red"
        >
          {label}
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="font-display text-5xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        {/* Lead paragraph (opcional) */}
        {lead && (
          <motion.p
            initial="hidden"
            animate="visible"
            variants={subVariants}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-dojo-white/70"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}
