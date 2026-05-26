import type { Metadata } from "next";
import Link from "next/link";
import { ORG_NAME, KANJI } from "@dojo-fs/ui";

export const metadata: Metadata = {
  title: `Modalidades · ${ORG_NAME}`,
  description: `Judô (CBJ) + Jiu-Jitsu (IBJJF) no ${ORG_NAME}. Sistema de faixas, graduações, cerimônias formais. Infantil e adulto.`,
};

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

export default function ModalidadesPage() {
  return (
    <main className="min-h-screen bg-dojo-black pt-24 pb-24 sm:pt-32 sm:pb-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs uppercase tracking-[0.3em] text-dojo-white/40">
          <Link href="/" className="transition-colors hover:text-dojo-red">
            Início
          </Link>
          <span className="mx-3">·</span>
          <span className="text-dojo-white/60">Modalidades</span>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            O que ensinamos
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl lg:text-6xl">
            Modalidades<br />& Graduações
          </h1>
        </header>

        {/* Judô */}
        <section className="mb-20 border-t border-dojo-white/10 pt-12">
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
          <div className="space-y-2">
            {FAIXAS_JUDO.map((f) => (
              <div
                key={f.cor}
                className="flex items-center gap-4 rounded-sm border border-dojo-white/10 bg-dojo-gray/5 p-3 transition-colors hover:border-dojo-white/20"
              >
                <span
                  className={`flex h-8 w-16 items-center justify-center rounded-sm text-xs font-bold uppercase ${f.bg} ${f.text}`}
                >
                  {f.cor}
                </span>
                <span className="text-sm text-dojo-white/70">{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Jiu-Jitsu */}
        <section className="mb-20 border-t border-dojo-white/10 pt-12">
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
          <div className="space-y-2">
            {FAIXAS_BJJ.map((f) => (
              <div
                key={f.cor}
                className="flex items-center gap-4 rounded-sm border border-dojo-white/10 bg-dojo-gray/5 p-3 transition-colors hover:border-dojo-white/20"
              >
                <span
                  className={`flex h-8 w-16 items-center justify-center rounded-sm text-xs font-bold uppercase ${f.bg} ${f.text}`}
                >
                  {f.cor}
                </span>
                <span className="text-sm text-dojo-white/70">{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Cerimônia de graduação */}
        <section className="rounded-sm border border-dojo-red/30 bg-dojo-red/5 p-8 sm:p-10">
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
          <p className="mt-4 text-sm italic text-dojo-white/50">
            Reconhecimento técnico + emoção familiar. Anos de dedicação no
            tatame celebrados como devem ser.
          </p>
        </section>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
    </main>
  );
}
