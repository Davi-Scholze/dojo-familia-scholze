"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ORG_NAME, SENSEI, FILOSOFIA_CITACAO, KANJI } from "@dojo-fs/ui";
import { PageHero } from "../../../components/PageHero";
import {
  motion,
  staggerContainer,
  staggerContainerSlow,
  cardEnter,
  quoteReveal,
  fadeOnly,
} from "../../../components/MotionConfig";

const SENSEI_IMAGE =
  "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?q=80&w=1600&auto=format&fit=crop";

const JUDO_IMAGE =
  "https://images.unsplash.com/photo-1514050566906-8d077bae7046?q=80&w=1600&auto=format&fit=crop";

const BJJ_IMAGE =
  "https://images.unsplash.com/photo-1656653121475-e33829581294?q=80&w=1600&auto=format&fit=crop";

export default function SobrePage() {
  const reduced = useReducedMotion();
  const containerVariants = reduced ? fadeOnly : staggerContainer;
  const itemVariants = reduced ? fadeOnly : cardEnter;
  const quoteVariants = reduced ? fadeOnly : quoteReveal;

  return (
    <>
      <PageHero
        breadcrumb="Sobre"
        label="A história"
        title={
          <>
            Sobre o<br />
            <span className="text-dojo-red">{ORG_NAME}</span>
          </>
        }
        lead="Uma família que ama lutar. Décadas de tatame em Curitiba, formando atletas e cidadãos no espírito do Judô tradicional e do Jiu-Jitsu refinado."
        bgImage="https://images.unsplash.com/photo-1599677100568-a367e56ca161?w=2400&auto=format&fit=crop"
        bgAlt=""
      />

      {/* Foto Sensei + texto */}
      <section className="bg-dojo-black py-20 sm:py-24 lg:py-32">
        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="group relative aspect-[4/5] overflow-hidden rounded-sm"
          >
            <Image
              src={SENSEI_IMAGE}
              alt={`Sensei ${SENSEI}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dojo-black to-transparent" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
              O Sensei
            </p>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-4xl">
              {SENSEI}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-dojo-white/70">
              <p>
                Professor de Judô e Jiu-Jitsu com décadas de tatame. Forma atletas
                desde criança até a graduação avançada.
              </p>
              <p>
                Mais que técnica — ensina{" "}
                <span className="font-serif italic text-dojo-white">
                  caráter, disciplina, humildade.
                </span>
              </p>
              <p>
                Cada cerimônia de graduação é um marco familiar. Pais treinam ao
                lado dos filhos. Adultos recreativos compartilham o tatame com
                competidores.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Filosofia */}
      <section className="border-y border-dojo-white/10 bg-dojo-black py-20 sm:py-24 lg:py-32">
        <motion.div
          className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={quoteVariants}
        >
          <p className="mb-8 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            Filosofia
          </p>

          <blockquote>
            <p className="font-serif text-2xl italic leading-relaxed text-dojo-white sm:text-3xl">
              &ldquo;{FILOSOFIA_CITACAO.texto}&rdquo;
            </p>
            <footer className="mt-8">
              <p className="font-display text-sm uppercase tracking-[0.4em] text-dojo-white/50">
                — {FILOSOFIA_CITACAO.autor}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-dojo-white/50">
                Fundador do Judô moderno
              </p>
            </footer>
          </blockquote>
        </motion.div>
      </section>

      {/* 2 Cards Modalidades — Judô + Jiu-Jitsu (mesma cara da home, simplificado) */}
      <section className="bg-dojo-black py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-12 text-center sm:mb-16">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
              O que ensinamos
            </p>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-4xl lg:text-5xl">
              Duas Artes,<br />Um Caminho
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={reduced ? fadeOnly : staggerContainerSlow}
          >
            <motion.article
              variants={itemVariants}
              className="group relative overflow-hidden rounded-sm border border-dojo-white/10 bg-dojo-gray/5 transition-colors duration-300 hover:border-dojo-red/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={JUDO_IMAGE}
                  alt="Judô — projeção e equilíbrio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dojo-black via-dojo-black/40 to-transparent" />
                <span className="absolute left-6 top-6 font-display text-5xl text-dojo-white sm:text-6xl">
                  {KANJI.judo}
                </span>
                <span className="absolute right-6 top-6 rounded-sm bg-dojo-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-dojo-white backdrop-blur-sm">
                  Filiado à CBJ
                </span>
              </div>

              <div className="p-8 sm:p-10">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-dojo-white sm:text-3xl">
                  Judô
                </h3>
                <p className="mt-4 text-base leading-relaxed text-dojo-white/70">
                  Arte do equilíbrio e da projeção. Disciplina olímpica fundada
                  por Jigoro Kano em 1882.
                </p>
                <Link
                  href="/modalidades#judo"
                  className="mt-6 inline-block text-xs uppercase tracking-[0.3em] text-dojo-red transition-colors hover:text-dojo-white"
                >
                  Ver sistema de faixas →
                </Link>
              </div>
            </motion.article>

            <motion.article
              variants={itemVariants}
              className="group relative overflow-hidden rounded-sm border border-dojo-white/10 bg-dojo-gray/5 transition-colors duration-300 hover:border-dojo-red/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={BJJ_IMAGE}
                  alt="Jiu-Jitsu — a arte suave"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dojo-black via-dojo-black/40 to-transparent" />
                <span className="absolute left-6 top-6 font-display text-5xl text-dojo-white sm:text-6xl">
                  {KANJI.jiujitsu}
                </span>
                <span className="absolute right-6 top-6 rounded-sm bg-dojo-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-dojo-white backdrop-blur-sm">
                  Filiado à IBJJF
                </span>
              </div>

              <div className="p-8 sm:p-10">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-dojo-white sm:text-3xl">
                  Jiu-Jitsu
                </h3>
                <p className="mt-4 text-base leading-relaxed text-dojo-white/70">
                  A arte suave. Sistema de luta de solo de origem japonesa,
                  refinado no Brasil. Técnica vence força.
                </p>
                <Link
                  href="/modalidades#jiu-jitsu"
                  className="mt-6 inline-block text-xs uppercase tracking-[0.3em] text-dojo-red transition-colors hover:text-dojo-white"
                >
                  Ver sistema de faixas →
                </Link>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* Kanji + Slogan */}
      <section className="bg-dojo-black py-16 text-center sm:py-20">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 px-6 sm:px-8 lg:px-12">
          <span className="font-display text-4xl text-dojo-white sm:text-5xl">
            {KANJI.judo}
          </span>
          <span className="h-px w-16 bg-dojo-red" aria-hidden="true" />
          <span className="font-display text-4xl text-dojo-white sm:text-5xl">
            {KANJI.jiujitsu}
          </span>
        </div>
        <p className="mt-8 font-display text-base uppercase tracking-[0.4em] text-dojo-red">
          Ceder pra Vencer
        </p>
      </section>

      {/* Explorar também */}
      <section className="bg-dojo-black py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
          <p className="mb-6 font-display text-xs uppercase tracking-[0.4em] text-dojo-white/50">
            Explorar também
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
            <Link
              href="/modalidades"
              className="text-xs uppercase tracking-[0.3em] text-dojo-red transition-colors hover:text-dojo-white"
            >
              → Modalidades & Faixas
            </Link>
            <Link
              href="/contato"
              className="text-xs uppercase tracking-[0.3em] text-dojo-red transition-colors hover:text-dojo-white"
            >
              → Contato direto
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dojo-black pb-20 pt-8 sm:pb-24">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-center sm:px-8 lg:px-12">
          <Link
            href="/#contato"
            className="rounded-sm border border-dojo-red bg-dojo-red px-8 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98]"
          >
            Agendar aula experimental
          </Link>
          <Link
            href="/modalidades"
            className="rounded-sm border border-dojo-white/30 px-8 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:border-dojo-white hover:bg-dojo-white/5"
          >
            Ver modalidades
          </Link>
        </div>
      </section>
    </>
  );
}
