"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useReducedMotion } from "framer-motion";
import {
  motion,
  staggerContainer,
  cardEnter,
  fadeOnly,
} from "./MotionConfig";

interface Sede {
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  horarios: { dia: string; faixa: string; modalidade: string }[];
  whatsapp: string;
  mapaQuery: string;
}

// Placeholder — Sensei Cristiano enviará dados reais
const SEDES: Sede[] = [
  {
    nome: "Sede Principal",
    endereco: "Endereço será atualizado em breve",
    bairro: "Bairro a confirmar",
    cidade: "Curitiba/PR",
    horarios: [
      { dia: "Seg / Qua / Sex", faixa: "—", modalidade: "Judô infantil" },
      { dia: "Seg / Qua / Sex", faixa: "—", modalidade: "Judô adulto" },
      { dia: "Ter / Qui", faixa: "—", modalidade: "Jiu-Jitsu" },
      { dia: "Sáb", faixa: "—", modalidade: "Treino aberto" },
    ],
    whatsapp: "5500000000000",
    mapaQuery: "Curitiba+PR",
  },
  {
    nome: "Segunda Sede",
    endereco: "Endereço será atualizado em breve",
    bairro: "Bairro a confirmar",
    cidade: "Curitiba/PR",
    horarios: [
      { dia: "Seg / Qua / Sex", faixa: "—", modalidade: "Judô infantil" },
      { dia: "Ter / Qui", faixa: "—", modalidade: "Jiu-Jitsu adulto" },
    ],
    whatsapp: "5500000000000",
    mapaQuery: "Curitiba+PR",
  },
];

const PLANOS = [
  {
    nome: "Aula Experimental",
    preco: "Gratuita",
    descricao: "Primeira aula sem compromisso. Conheça o tatame, o Sensei e a turma.",
    cta: "Agendar agora",
    destaque: true,
  },
  {
    nome: "Mensal",
    preco: "Sob consulta",
    descricao: "Acesso a todas modalidades da sede escolhida. Sem fidelidade.",
    cta: "Consultar valor",
    destaque: false,
  },
  {
    nome: "Trimestral",
    preco: "Sob consulta",
    descricao: "Compromisso de 3 meses. Desconto progressivo + brindes Família Scholze.",
    cta: "Consultar valor",
    destaque: false,
  },
];

export function LocaisPlanos() {
  const reduced = useReducedMotion();
  const containerVariants = reduced ? fadeOnly : staggerContainer;
  const cardVariants = reduced ? fadeOnly : cardEnter;

  return (
    <section
      id="locais"
      className="border-t border-dojo-white/5 bg-dojo-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="locais-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-16 text-center sm:mb-20">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            Onde + Quanto
          </p>
          <h2
            id="locais-heading"
            className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl lg:text-6xl"
          >
            Locais &<br />Mensalidades
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-dojo-white/60 sm:text-lg">
            Duas sedes em Curitiba. Aula experimental sempre gratuita.
          </p>
        </div>

        {/* SEDES */}
        <div className="mb-20">
          <h3 className="mb-8 font-display text-xs uppercase tracking-[0.4em] text-dojo-white/40">
            Sedes
          </h3>

          <Accordion.Root
            type="single"
            collapsible
            className="space-y-4"
            defaultValue="sede-0"
          >
            {SEDES.map((sede, idx) => (
              <Accordion.Item
                key={sede.nome}
                value={`sede-${idx}`}
                className="overflow-hidden rounded-sm border border-dojo-white/10 bg-dojo-gray/5 transition-colors hover:border-dojo-white/20"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-6 text-left transition-colors hover:bg-dojo-gray/10 sm:px-8">
                    <div>
                      <h4 className="font-display text-xl font-bold uppercase tracking-tight text-dojo-white sm:text-2xl">
                        {sede.nome}
                      </h4>
                      <p className="mt-2 text-sm text-dojo-white/60">
                        {sede.bairro} · {sede.cidade}
                      </p>
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-dojo-red transition-transform duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="border-t border-dojo-white/10 px-6 py-6 sm:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                      {/* Coluna 1: Endereço + horários */}
                      <div>
                        <div className="mb-6">
                          <p className="text-xs uppercase tracking-widest text-dojo-white/40">
                            Endereço
                          </p>
                          <p className="mt-2 text-base text-dojo-white/80">
                            {sede.endereco}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-dojo-white/40">
                            Horários
                          </p>
                          <ul className="mt-3 space-y-2">
                            {sede.horarios.map((h) => (
                              <li
                                key={`${h.dia}-${h.modalidade}`}
                                className="flex justify-between border-b border-dojo-white/5 pb-2 text-sm"
                              >
                                <span className="text-dojo-white/70">
                                  {h.dia}
                                </span>
                                <span className="text-dojo-white">
                                  {h.modalidade}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <p className="mt-3 text-xs italic text-dojo-white/40">
                            Horários completos sob consulta — Sensei envia em breve.
                          </p>
                        </div>
                      </div>

                      {/* Coluna 2: Mapa + CTA */}
                      <div>
                        <div className="aspect-video overflow-hidden rounded-sm bg-dojo-gray/20">
                          <iframe
                            title={`Mapa ${sede.nome}`}
                            src={`https://www.google.com/maps?q=${sede.mapaQuery}&output=embed`}
                            className="h-full w-full grayscale"
                            loading="lazy"
                          />
                        </div>

                        <a
                          href={`https://wa.me/${sede.whatsapp}?text=${encodeURIComponent(
                            `Olá Sensei! Vim pelo site e gostaria de agendar aula experimental na ${sede.nome}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex w-full items-center justify-center rounded-sm border border-dojo-red bg-dojo-red px-6 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98]"
                        >
                          Agendar nesta sede
                        </a>
                      </div>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>

        {/* PLANOS */}
        <div>
          <h3 className="mb-8 text-center font-display text-xs uppercase tracking-[0.4em] text-dojo-white/40">
            Planos
          </h3>

          <motion.div
            className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {PLANOS.map((p) => (
              <motion.article
                key={p.nome}
                variants={cardVariants}
                className={`relative overflow-hidden rounded-sm border p-8 transition-all sm:p-10 ${
                  p.destaque
                    ? "border-dojo-red bg-dojo-red/5"
                    : "border-dojo-white/10 bg-dojo-gray/5 hover:border-dojo-white/20"
                }`}
              >
                {p.destaque && (
                  <span className="absolute right-6 top-6 rounded-sm bg-dojo-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-dojo-white">
                    Comece aqui
                  </span>
                )}

                <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-dojo-white">
                  {p.nome}
                </h4>
                <p
                  className={`mt-4 font-display text-3xl font-bold ${
                    p.destaque ? "text-dojo-red" : "text-dojo-white"
                  }`}
                >
                  {p.preco}
                </p>
                <p className="mt-6 min-h-[3rem] text-sm leading-relaxed text-dojo-white/70">
                  {p.descricao}
                </p>

                <a
                  href={`https://wa.me/5500000000000?text=${encodeURIComponent(
                    `Olá Sensei! Tenho interesse no plano ${p.nome}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-sm px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.98] ${
                    p.destaque
                      ? "border border-dojo-red bg-dojo-red text-dojo-white hover:bg-dojo-red/90"
                      : "border border-dojo-white/30 text-dojo-white hover:border-dojo-white"
                  }`}
                >
                  {p.cta}
                </a>
              </motion.article>
            ))}
          </motion.div>

          <p className="mt-8 text-center text-xs italic text-dojo-white/40">
            Valores específicos sob consulta direta com o Sensei (sem fidelidade obrigatória).
          </p>
        </div>
      </div>
    </section>
  );
}
