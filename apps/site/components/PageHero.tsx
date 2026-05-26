"use client";

import Image from "next/image";
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
  label: string;
  title: React.ReactNode;
  lead?: string;
  breadcrumb: string;
  /** URL Unsplash/CDN de background grayscale opcional. Aplicado opacity-25 + gradient overlay */
  bgImage?: string;
  /** Alt text da bgImage (decorativa por padrão — "") */
  bgAlt?: string;
}

/**
 * Page Hero padronizado das páginas públicas dedicadas (/sobre, /modalidades, /contato).
 *
 * v2 (2026-05-27): adiciona prop `bgImage` opcional pra atmosfera japonesa
 * (cerejeira, torii, dojô). 3 layers: image grayscale opacity-25 + gradient
 * preto + conteúdo. Sem bgImage, fundo é dojo-black puro (compatibilidade
 * backward com v1).
 */
export function PageHero({
  label,
  title,
  lead,
  breadcrumb,
  bgImage,
  bgAlt = "",
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const titleVariants = reduced ? fadeOnly : heroReveal;
  const subVariants = reduced ? fadeOnly : heroRevealDelayed;
  const lineVariants = reduced ? fadeOnly : lineDrawReveal;

  return (
    <section className="relative overflow-hidden bg-dojo-black pt-32 pb-20 sm:pt-40 sm:pb-24">
      {/* Layer 1: bg image opcional (grayscale + opacity baixa) */}
      {bgImage && (
        <Image
          src={bgImage}
          alt={bgAlt}
          fill
          priority={false}
          sizes="100vw"
          className="object-cover opacity-25 grayscale"
          aria-hidden={bgAlt === "" ? "true" : undefined}
        />
      )}

      {/* Layer 2: gradient overlay pra legibilidade do h1 */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-dojo-black/80 via-dojo-black/60 to-dojo-black"
          aria-hidden="true"
        />
      )}

      {/* Linha vermelha topo animada */}
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-dojo-red"
        style={{ transformOrigin: "left" }}
        initial="hidden"
        animate="visible"
        variants={lineVariants}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
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
            className="mt-8 max-w-2xl text-lg leading-relaxed text-dojo-white/80"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}
