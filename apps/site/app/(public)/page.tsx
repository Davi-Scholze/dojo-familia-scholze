"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  ORG_NAME,
  SLOGAN,
  KANJI,
  LOCALIDADE,
  FILOSOFIA_CITACAO,
  SENSEI,
} from "@dojo-fs/ui";
import { Vantagens } from "../../components/Vantagens";
import { LocaisPlanos } from "../../components/LocaisPlanos";
import { Avaliacoes } from "../../components/Avaliacoes";
import { WhatsAppCTA } from "../../components/WhatsAppCTA";
import {
  motion,
  heroReveal,
  heroRevealDelayed,
  lineDrawReveal,
  staggerContainer,
  staggerContainerSlow,
  cardEnter,
  quoteReveal,
  fadeOnly,
} from "../../components/MotionConfig";

// ─── Stock photos Unsplash (substituir por fotos reais quando Sensei enviar) ──

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1611711605692-acb25d5d8399?q=80&w=2400&auto=format&fit=crop";

const JUDO_IMAGE =
  "https://images.unsplash.com/photo-1514050566906-8d077bae7046?q=80&w=1600&auto=format&fit=crop";

const BJJ_IMAGE =
  "https://images.unsplash.com/photo-1656653121475-e33829581294?q=80&w=1600&auto=format&fit=crop";

const SENSEI_IMAGE =
  "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?q=80&w=1600&auto=format&fit=crop";

// ─── Hero cinematográfico (exclusivo da home — dedicated usam PageHero) ──────

function Hero() {
  const reduced = useReducedMotion();
  const titleVariants = reduced ? fadeOnly : heroReveal;
  const subVariants = reduced ? fadeOnly : heroRevealDelayed;
  const lineVariants = reduced ? fadeOnly : lineDrawReveal;

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Image
        src={HERO_IMAGE}
        alt="Atletas em treino de Jiu-Jitsu"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40 grayscale"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-dojo-black/70 via-dojo-black/50 to-dojo-black"
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-dojo-red"
        style={{ transformOrigin: "left" }}
        initial="hidden"
        animate="visible"
        variants={lineVariants}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center sm:px-8">
        <motion.p
          initial="hidden"
          animate="visible"
          variants={subVariants}
          transition={{ delay: 0.1 }}
          className="mb-6 font-display text-xs uppercase tracking-[0.4em] text-dojo-red sm:text-sm"
        >
          {LOCALIDADE}
        </motion.p>

        <motion.h1
          id="hero-heading"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-dojo-white sm:text-7xl lg:text-8xl"
        >
          Dojô
          <br />
          Família
          <br />
          <span className="text-dojo-red">Scholze</span>
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={subVariants}
          transition={{ delay: 0.4 }}
          className="mt-10 flex items-center gap-6"
        >
          <span className="font-display text-2xl text-dojo-white sm:text-3xl">
            {KANJI.judo}
          </span>
          <span className="h-px w-12 bg-dojo-red" aria-hidden="true" />
          <span className="font-display text-2xl text-dojo-white sm:text-3xl">
            {KANJI.jiujitsu}
          </span>
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={subVariants}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-xl font-display text-lg uppercase tracking-[0.3em] text-dojo-red sm:text-xl"
        >
          {SLOGAN}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={subVariants}
          transition={{ delay: 0.6 }}
          className="mt-14 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#contato"
            className="rounded-sm border border-dojo-red bg-dojo-red px-8 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98]"
          >
            Agendar aula experimental
          </a>
          <a
            href="#locais"
            className="rounded-sm border border-dojo-white/30 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:border-dojo-white hover:bg-dojo-white/5"
          >
            Ver locais & planos
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-dojo-white/50">
        <span className="block animate-pulse">↓ Role</span>
      </div>
    </section>
  );
}

// ─── Sobre ────────────────────────────────────────────────────────────────────

function Sobre() {
  const reduced = useReducedMotion();
  const containerVariants = reduced ? fadeOnly : staggerContainer;
  const itemVariants = reduced ? fadeOnly : cardEnter;

  return (
    <section
      id="sobre"
      className="bg-dojo-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="sobre-heading"
    >
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <Image
            src={SENSEI_IMAGE}
            alt={`Sensei ${SENSEI} em treino`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dojo-black to-transparent" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center"
        >
          <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            Sobre
          </p>
          <h2
            id="sobre-heading"
            className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl"
          >
            Tradição em<br />Curitiba
          </h2>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-dojo-white/70 sm:text-lg">
            <p>
              O <span className="text-dojo-white">{ORG_NAME}</span> é dirigido
              pelo <span className="text-dojo-white">Sensei {SENSEI}</span>, professor
              de Judô e Jiu-Jitsu com décadas de tatame.
            </p>
            <p>
              Aqui não treinamos apenas técnica — treinamos caráter.{" "}
              <span className="font-serif italic text-dojo-white">Ceder pra vencer</span> é
              princípio de combate e de vida.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-dojo-white/10 pt-10">
            <Stat number="30+" label="Anos de tatame" />
            <Stat number="2" label="Modalidades" />
            <Stat number="∞" label="Faixas pretas formadas" />
          </div>

          <Link
            href="/sobre"
            className="mt-10 inline-block text-xs uppercase tracking-[0.3em] text-dojo-red transition-colors hover:text-dojo-white"
          >
            Conhecer a história completa →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-dojo-red sm:text-4xl">
        {number}
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-dojo-white/50">
        {label}
      </p>
    </div>
  );
}

// ─── Modalidades ──────────────────────────────────────────────────────────────

function Modalidades() {
  const reduced = useReducedMotion();
  const containerVariants = reduced ? fadeOnly : staggerContainerSlow;
  const cardVariants = reduced ? fadeOnly : cardEnter;

  return (
    <section
      id="modalidades"
      className="border-t border-dojo-white/5 bg-dojo-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="modalidades-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-16 text-center sm:mb-20">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            O que ensinamos
          </p>
          <h2
            id="modalidades-heading"
            className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl lg:text-6xl"
          >
            Duas Artes,<br />Um Caminho
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={cardVariants}>
            <ModalidadeCard
              image={JUDO_IMAGE}
              kanji={KANJI.judo}
              nome="Judô"
              descricao="Arte do equilíbrio e da projeção. Disciplina olímpica fundada por Jigoro Kano em 1882. Treinamos do iniciante à graduação avançada."
              details={["Kihon (técnicas fundamentais)", "Nage-waza (projeções)", "Ne-waza (solo)", "Randori (treino livre)"]}
              federacao="Filiado à CBJ"
            />
          </motion.div>
          <motion.div variants={cardVariants}>
            <ModalidadeCard
              image={BJJ_IMAGE}
              kanji={KANJI.jiujitsu}
              nome="Jiu-Jitsu"
              descricao="A arte suave. Sistema de luta de solo de origem japonesa refinado no Brasil. Técnica vence força."
              details={["Guarda (defesa de solo)", "Passagem de guarda", "Submissões e finalizações", "Sparring controlado"]}
              federacao="Filiado à IBJJF"
            />
          </motion.div>
        </motion.div>

        <p className="mt-12 text-center">
          <Link
            href="/modalidades"
            className="text-xs uppercase tracking-[0.3em] text-dojo-red transition-colors hover:text-dojo-white"
          >
            Sistema de faixas + cerimônias →
          </Link>
        </p>
      </div>
    </section>
  );
}

function ModalidadeCard({
  image,
  kanji,
  nome,
  descricao,
  details,
  federacao,
}: {
  image: string;
  kanji: string;
  nome: string;
  descricao: string;
  details: string[];
  federacao: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-dojo-white/10 bg-dojo-gray/5 transition-colors duration-300 hover:border-dojo-red/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={nome}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dojo-black via-dojo-black/40 to-transparent" />
        <div className="absolute left-6 top-6">
          <span className="font-display text-5xl text-dojo-white sm:text-6xl">
            {kanji}
          </span>
        </div>
        <span className="absolute right-6 top-6 rounded-sm bg-dojo-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-dojo-white backdrop-blur-sm">
          {federacao}
        </span>
      </div>

      <div className="p-8 sm:p-10">
        <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-dojo-white sm:text-4xl">
          {nome}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-dojo-white/70">
          {descricao}
        </p>

        <ul className="mt-6 space-y-2 border-l-2 border-dojo-red/40 pl-4">
          {details.map((d) => (
            <li
              key={d}
              className="text-xs uppercase tracking-widest text-dojo-white/60"
            >
              {d}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ─── Filosofia ────────────────────────────────────────────────────────────────

function Filosofia() {
  const reduced = useReducedMotion();
  const variants = reduced ? fadeOnly : quoteReveal;

  return (
    <section
      id="filosofia"
      className="relative overflow-hidden border-t border-dojo-white/5 bg-dojo-black py-32 sm:py-40 lg:py-48"
      aria-labelledby="filosofia-heading"
    >
      <div
        className="absolute left-1/2 top-12 h-px w-24 -translate-x-1/2 bg-dojo-red"
        aria-hidden="true"
      />

      <motion.div
        className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants}
      >
        <p className="mb-12 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
          Filosofia
        </p>

        <blockquote id="filosofia-heading">
          <p className="font-serif text-3xl italic leading-relaxed text-dojo-white sm:text-4xl lg:text-5xl">
            &ldquo;{FILOSOFIA_CITACAO.texto}&rdquo;
          </p>
          <footer className="mt-12">
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
  );
}

// ─── Page (consumida pelo PublicLayout) ──────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Hero />
      <Sobre />
      <Modalidades />
      <Vantagens />
      <LocaisPlanos />
      <Filosofia />
      <Avaliacoes />
      <WhatsAppCTA />
    </>
  );
}
