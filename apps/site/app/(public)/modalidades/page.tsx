"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ORG_NAME, KANJI } from "@dojo-fs/ui";
import { PageHero } from "../../../components/PageHero";
import { FaixaIcon } from "../../../components/FaixaIcon";
import {
  motion,
  staggerContainerSlow,
  metricRowEnter,
  cardEnter,
  overviewCardReveal,
  fadeOnly,
} from "../../../components/MotionConfig";

/**
 * Cores literais das faixas — EXCEÇÃO SEMÂNTICA documentada:
 * Não são cores da marca (dojo-red/black/white). São cores REAIS das faixas
 * conforme CBJ + IBJJF. Validado via researcher agent contra fontes oficiais
 * cbj.com.br + ibjjf.com em 2026-05-27.
 */

// JUDÔ — Sistema CBJ adulto (foco no que cliente vai ver, sem detalhe kids 11-9 kyu)
const FAIXAS_JUDO = [
  { nome: "Branca", desc: "Iniciante absoluto — qualquer idade", hex: "#FFFFFF" },
  { nome: "Amarela", desc: "Primeiros fundamentos", hex: "#FACC15" },
  { nome: "Laranja", desc: "Domínio dos fundamentos", hex: "#EA580C" },
  { nome: "Verde", desc: "Técnica intermediária", hex: "#16A34A" },
  { nome: "Roxa", desc: "Avançado (a partir de 13 anos)", hex: "#7E22CE" },
  { nome: "Marrom", desc: "1º Kyu — pré-faixa preta (14+, mín 2 anos)", hex: "#92400E" },
  { nome: "Preta", desc: "Yudansha — 1º a 5º Dan (16+, mín 700 pontos)", hex: "#0A0A0A" },
  { nome: "Coral", desc: "Kodansha — 6º a 7º Dan", hex: "#DC2626", stripe: "black" as const },
  { nome: "Vermelha/Branca", desc: "8º Dan — Kodansha superior", hex: "#DC2626", stripe: "white" as const },
  { nome: "Vermelha", desc: "9º a 10º Dan — Grau máximo (rarissimo)", hex: "#DC2626" },
];

// JIU-JITSU — Sistema IBJJF adulto (16+) com sistema de grades (até 4 por faixa, 6 na preta)
const FAIXAS_BJJ = [
  { nome: "Branca", desc: "Inicial — qualquer idade", hex: "#FFFFFF", grades: 4 },
  { nome: "Azul", desc: "16+ • até 4 graus", hex: "#1D4ED8", grades: 4 },
  { nome: "Roxa", desc: "16+ • mín 2 anos azul • até 4 graus", hex: "#7E22CE", grades: 4 },
  { nome: "Marrom", desc: "18+ • mín 1,5 ano roxa • até 4 graus", hex: "#92400E", grades: 4 },
  { nome: "Preta", desc: "19+ • mín 1 ano marrom • até 6 graus", hex: "#0A0A0A", grades: 6, gradeColor: "red" as const },
  { nome: "Coral", desc: "6º a 7º grau preta (≥21 anos preta)", hex: "#DC2626", stripe: "black" as const },
  { nome: "Vermelha/Branca", desc: "8º grau preta", hex: "#DC2626", stripe: "white" as const },
  { nome: "Vermelha", desc: "9º a 10º grau — Grau máximo", hex: "#DC2626" },
];

function FaixasList({
  faixas,
  ariaLabel,
}: {
  faixas: Array<{
    nome: string;
    desc: string;
    hex: string;
    grades?: number;
    gradeColor?: "white" | "red";
    stripe?: "black" | "white";
  }>;
  ariaLabel: string;
}) {
  const reduced = useReducedMotion();
  const containerVariants = reduced ? fadeOnly : staggerContainerSlow;
  const rowVariants = reduced ? fadeOnly : metricRowEnter;

  return (
    <motion.ul
      className="space-y-2"
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {faixas.map((f) => (
        <motion.li
          key={f.nome}
          variants={rowVariants}
          whileHover={reduced ? {} : { scale: 1.01, filter: "brightness(1.1)" }}
          transition={{ duration: 0.4, ease: [0.3, 0, 0, 1] }}
          className="flex items-center gap-5 rounded-sm border border-dojo-white/10 bg-dojo-gray/5 p-4 transition-colors hover:border-dojo-red/40"
        >
          <FaixaIcon
            nome={f.nome}
            hex={f.hex}
            grades={f.grades ?? 0}
            gradeColor={f.gradeColor}
            stripe={f.stripe}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white">
              {f.nome}
            </p>
            <p className="mt-1 text-xs text-dojo-white/60">{f.desc}</p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function TecnicasLista({ items }: { items: string[] }) {
  const reduced = useReducedMotion();
  const containerVariants = reduced ? fadeOnly : staggerContainerSlow;
  const rowVariants = reduced ? fadeOnly : metricRowEnter;

  return (
    <motion.ul
      className="grid grid-cols-1 gap-2 sm:grid-cols-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={rowVariants}
          className="border-l-2 border-dojo-red/40 pl-4 text-sm uppercase tracking-widest text-dojo-white/70 transition-colors hover:border-dojo-red hover:text-dojo-white"
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function ModalidadesPage() {
  const reduced = useReducedMotion();
  const cardVariants = reduced ? fadeOnly : cardEnter;
  const ceremoniaVariants = reduced ? fadeOnly : overviewCardReveal;

  return (
    <>
      <PageHero
        breadcrumb="Modalidades"
        label="O que ensinamos"
        title={
          <>
            Modalidades<br />& Graduações
          </>
        }
        lead="Judô (CBJ) + Jiu-Jitsu (IBJJF) sob o mesmo Sensei. Formação técnica completa, do iniciante absoluto à graduação avançada."
        bgImage="https://images.unsplash.com/photo-1546638008-efbe0b62c730?w=2400&auto=format&fit=crop"
        bgAlt=""
      />

      <div className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 lg:px-12">
        {/* JUDÔ */}
        <motion.section
          className="relative mb-20 overflow-hidden border-t border-dojo-white/10 pt-16 sm:pt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
        >
          {/* Kanji ambient decorativo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 top-1/4 select-none font-display text-[14rem] leading-none text-dojo-white/[0.03]"
          >
            {KANJI.judo}
          </span>

          <div className="relative">
            <div className="mb-8 flex items-baseline gap-6">
              <span className="font-display text-5xl text-dojo-white sm:text-6xl">
                {KANJI.judo}
              </span>
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-dojo-white sm:text-4xl">
                  Judô
                </h2>
                <p className="mt-1 text-xs uppercase tracking-widest text-dojo-red">
                  Filiado à CBJ
                </p>
              </div>
            </div>

            <p className="mb-8 max-w-3xl text-base leading-relaxed text-dojo-white/70 sm:text-lg">
              Arte do equilíbrio e da projeção. Disciplina olímpica fundada por
              Jigoro Kano em 1882. No {ORG_NAME} treinamos do iniciante absoluto
              até a graduação avançada.
            </p>

            <div className="mb-12">
              <h3 className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
                O que se aprende
              </h3>
              <TecnicasLista
                items={[
                  "Kihon — técnicas fundamentais",
                  "Nage-waza — projeções",
                  "Ne-waza — técnicas de solo",
                  "Randori — treino livre",
                ]}
              />
            </div>

            <h3 className="mb-6 font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
              Sistema de faixas — CBJ
            </h3>
            <FaixasList
              faixas={FAIXAS_JUDO}
              ariaLabel="Sistema de faixas do Judô conforme CBJ"
            />
            <p className="mt-4 text-xs italic text-dojo-white/50">
              Sistema simplificado pra adulto. CBJ tem faixas intermediárias adicionais (cinza, azul kids) pra crianças de 4 a 13 anos.
            </p>
          </div>
        </motion.section>

        {/* JIU-JITSU */}
        <motion.section
          className="relative mb-20 overflow-hidden border-t border-dojo-white/10 pt-16 sm:pt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
        >
          {/* Kanji ambient decorativo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 top-1/4 select-none font-display text-[14rem] leading-none text-dojo-white/[0.03]"
          >
            {KANJI.jiujitsu}
          </span>

          <div className="relative">
            <div className="mb-8 flex items-baseline gap-6">
              <span className="font-display text-5xl text-dojo-white sm:text-6xl">
                {KANJI.jiujitsu}
              </span>
              <div>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-dojo-white sm:text-4xl">
                  Jiu-Jitsu
                </h2>
                <p className="mt-1 text-xs uppercase tracking-widest text-dojo-red">
                  Filiado à IBJJF
                </p>
              </div>
            </div>

            <p className="mb-8 max-w-3xl text-base leading-relaxed text-dojo-white/70 sm:text-lg">
              A arte suave. Sistema de luta de solo de origem japonesa, refinado
              no Brasil. Aqui treinamos com foco em técnica pura — força é
              consequência, não premissa.
            </p>

            <div className="mb-12">
              <h3 className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
                O que se aprende
              </h3>
              <TecnicasLista
                items={[
                  "Guarda — defesa de solo",
                  "Passagem de guarda",
                  "Submissões e finalizações",
                  "Sparring controlado",
                ]}
              />
            </div>

            <h3 className="mb-6 font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
              Sistema de faixas — IBJJF (adulto 16+)
            </h3>
            <FaixasList
              faixas={FAIXAS_BJJ}
              ariaLabel="Sistema de faixas do Jiu-Jitsu conforme IBJJF adulto"
            />
            <p className="mt-4 text-xs italic text-dojo-white/50">
              Cada faixa colorida tem até 4 graus (listras). A preta tem até 6
              graus, depois evolui pra coral → vermelha/branca → vermelha (grau
              máximo). Sistema kids (4-15 anos) é separado.
            </p>
          </div>
        </motion.section>

        {/* CERIMÔNIA */}
        <motion.section
          className="relative overflow-hidden rounded-sm border border-dojo-red/30 bg-dojo-red/5 p-8 sm:p-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ceremoniaVariants}
        >
          {/* Quote mark decorativo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-12 select-none font-serif text-[12rem] leading-none text-dojo-white/[0.04]"
          >
            道
          </span>

          <div className="relative">
            <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
              Cerimônia de graduação
            </p>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-dojo-white sm:text-3xl">
              Cada faixa, um marco.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-dojo-white/80">
              No {ORG_NAME}, a passagem de faixa é cerimônia formal. Família
              convidada. Certificado oficial assinado pelo Sensei. Registro
              digital no sistema da escola — pais recebem notificação especial.
            </p>
            <p className="mt-4 text-sm italic text-dojo-white/60">
              Reconhecimento técnico + emoção familiar. Anos de dedicação no
              tatame celebrados como devem ser.
            </p>
          </div>
        </motion.section>

        {/* Explorar também */}
        <section className="mt-16 text-center">
          <p className="mb-6 font-display text-xs uppercase tracking-[0.4em] text-dojo-white/50">
            Explorar também
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
            <Link
              href="/sobre"
              className="text-xs uppercase tracking-[0.3em] text-dojo-red transition-colors hover:text-dojo-white"
            >
              → Sobre o Sensei
            </Link>
            <Link
              href="/contato"
              className="text-xs uppercase tracking-[0.3em] text-dojo-red transition-colors hover:text-dojo-white"
            >
              → Contato direto
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/#contato"
            className="rounded-sm border border-dojo-red bg-dojo-red px-8 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98]"
          >
            Começar agora — aula experimental
          </Link>
          <Link
            href="/#locais"
            className="rounded-sm border border-dojo-white/30 px-8 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:border-dojo-white hover:bg-dojo-white/5"
          >
            Ver locais & planos
          </Link>
        </div>
      </div>
    </>
  );
}
