"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ORG_NAME, KANJI } from "@dojo-fs/ui";
import { PageHero } from "../../../components/PageHero";
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
 * conforme CBJ + IBJJF. NÃO trocar por tokens dojo — o contexto (badge pequeno
 * com label cor escrita) deixa claro que é informação semântica.
 */
const FAIXAS_JUDO = [
  { cor: "Branca", desc: "Iniciante", bg: "bg-white", text: "text-dojo-black" },
  { cor: "Amarela", desc: "Primeira graduação", bg: "bg-yellow-400", text: "text-dojo-black" },
  { cor: "Laranja", desc: "Domínio dos fundamentos", bg: "bg-orange-500", text: "text-dojo-white" },
  { cor: "Verde", desc: "Técnica intermediária", bg: "bg-green-600", text: "text-dojo-white" },
  { cor: "Azul", desc: "Pré-avançado", bg: "bg-blue-600", text: "text-dojo-white" },
  { cor: "Roxa", desc: "Avançado", bg: "bg-purple-700", text: "text-dojo-white" },
  { cor: "Marrom", desc: "Pré-faixa preta", bg: "bg-amber-800", text: "text-dojo-white" },
  { cor: "Preta", desc: "Dan (1º a 10º)", bg: "bg-dojo-black border border-dojo-white/30", text: "text-dojo-white" },
];

const FAIXAS_BJJ = [
  { cor: "Branca", desc: "Iniciante (mínimo 1 ano)", bg: "bg-white", text: "text-dojo-black" },
  { cor: "Azul", desc: "Intermediário (mín. 2 anos)", bg: "bg-blue-600", text: "text-dojo-white" },
  { cor: "Roxa", desc: "Avançado (mín. 1.5 anos)", bg: "bg-purple-700", text: "text-dojo-white" },
  { cor: "Marrom", desc: "Pré-preta (mín. 1 ano)", bg: "bg-amber-800", text: "text-dojo-white" },
  { cor: "Preta", desc: "Mestre (1º a 9º grau)", bg: "bg-dojo-black border border-dojo-white/30", text: "text-dojo-white" },
];

function FaixasList({
  faixas,
  ariaLabel,
}: {
  faixas: typeof FAIXAS_JUDO;
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
          key={f.cor}
          variants={rowVariants}
          className="flex items-center gap-4 rounded-sm border border-dojo-white/10 bg-dojo-gray/5 p-3 transition-colors hover:border-dojo-red/40"
        >
          <span
            className={`flex h-8 w-16 items-center justify-center rounded-sm text-xs font-bold uppercase ${f.bg} ${f.text}`}
          >
            {f.cor}
          </span>
          <span className="text-sm text-dojo-white/70">{f.desc}</span>
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
      />

      <div className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 lg:px-12">
        {/* Judô */}
        <motion.section
          className="mb-20 border-t border-dojo-white/10 pt-16 sm:pt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
        >
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

          <div className="mb-10">
            <h3 className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
              O que se aprende
            </h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <li className="border-l-2 border-dojo-red/40 pl-4 text-sm uppercase tracking-widest text-dojo-white/70">
                Kihon — técnicas fundamentais
              </li>
              <li className="border-l-2 border-dojo-red/40 pl-4 text-sm uppercase tracking-widest text-dojo-white/70">
                Nage-waza — projeções
              </li>
              <li className="border-l-2 border-dojo-red/40 pl-4 text-sm uppercase tracking-widest text-dojo-white/70">
                Ne-waza — técnicas de solo
              </li>
              <li className="border-l-2 border-dojo-red/40 pl-4 text-sm uppercase tracking-widest text-dojo-white/70">
                Randori — treino livre
              </li>
            </ul>
          </div>

          <h3 className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
            Sistema de faixas — CBJ
          </h3>
          <FaixasList faixas={FAIXAS_JUDO} ariaLabel="Sistema de faixas do Judô conforme CBJ" />
        </motion.section>

        {/* Jiu-Jitsu */}
        <motion.section
          className="mb-20 border-t border-dojo-white/10 pt-16 sm:pt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
        >
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

          <div className="mb-10">
            <h3 className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
              O que se aprende
            </h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <li className="border-l-2 border-dojo-red/40 pl-4 text-sm uppercase tracking-widest text-dojo-white/70">
                Guarda — defesa de solo
              </li>
              <li className="border-l-2 border-dojo-red/40 pl-4 text-sm uppercase tracking-widest text-dojo-white/70">
                Passagem de guarda
              </li>
              <li className="border-l-2 border-dojo-red/40 pl-4 text-sm uppercase tracking-widest text-dojo-white/70">
                Submissões e finalizações
              </li>
              <li className="border-l-2 border-dojo-red/40 pl-4 text-sm uppercase tracking-widest text-dojo-white/70">
                Sparring controlado
              </li>
            </ul>
          </div>

          <h3 className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-dojo-red">
            Sistema de faixas — IBJJF
          </h3>
          <FaixasList faixas={FAIXAS_BJJ} ariaLabel="Sistema de faixas do Jiu-Jitsu conforme IBJJF" />
        </motion.section>

        {/* Cerimônia de graduação */}
        <motion.section
          className="rounded-sm border border-dojo-red/30 bg-dojo-red/5 p-8 sm:p-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ceremoniaVariants}
        >
          <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            Cerimônia de graduação
          </p>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-dojo-white sm:text-3xl">
            Cada faixa, um marco.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-dojo-white/70">
            No {ORG_NAME}, a passagem de faixa é cerimônia formal. Família
            convidada. Certificado oficial assinado pelo Sensei. Registro
            digital no sistema da escola — pais recebem notificação especial.
          </p>
          <p className="mt-4 text-sm italic text-dojo-white/60">
            Reconhecimento técnico + emoção familiar. Anos de dedicação no
            tatame celebrados como devem ser.
          </p>
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
