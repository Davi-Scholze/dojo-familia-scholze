"use client";

import { useReducedMotion } from "framer-motion";
import {
  motion,
  staggerContainerSlow,
  cardEnter,
  fadeOnly,
} from "./MotionConfig";

// Placeholder — Sensei Cristiano enviará depoimentos reais com consentimento LGPD
const DEPOIMENTOS = [
  {
    iniciais: "M.S.",
    persona: "Mãe de aluno (10 anos)",
    tempo: "2 anos no Dojô",
    texto:
      "Meu filho era tímido e dispersivo. Hoje ele tem postura, foco na escola e mais amigos. O Sensei trata cada criança como se fosse da família.",
    rating: 5,
  },
  {
    iniciais: "R.L.",
    persona: "Adulto recreativo",
    tempo: "3 anos no Dojô",
    texto:
      "Trabalho 10h por dia sentado. O treino virou minha terapia — saio do tatame com a cabeça limpa. Recomendo pra todo profissional que sente o corpo travado.",
    rating: 5,
  },
  {
    iniciais: "P.A.",
    persona: "Competidor (faixa marrom)",
    tempo: "5 anos no Dojô",
    texto:
      "Comecei como faixa branca aqui. Sensei prepara pra competição com técnica refinada, não só força. Dois títulos estaduais — gratidão.",
    rating: 5,
  },
];

export function Avaliacoes() {
  const reduced = useReducedMotion();
  const containerVariants = reduced ? fadeOnly : staggerContainerSlow;
  const cardVariants = reduced ? fadeOnly : cardEnter;

  return (
    <section
      id="avaliacoes"
      className="border-t border-dojo-white/5 bg-dojo-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="avaliacoes-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-16 text-center sm:mb-20">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            Quem treina diz
          </p>
          <h2
            id="avaliacoes-heading"
            className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl lg:text-6xl"
          >
            Vozes do<br />Tatame
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {DEPOIMENTOS.map((d) => (
            <motion.article
              key={d.iniciais + d.persona}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-sm border border-dojo-white/10 bg-dojo-gray/5 p-8 transition-all hover:border-dojo-red/30 sm:p-10"
            >
              {/* Stars */}
              <div
                className="mb-6 flex gap-1"
                aria-label={`${d.rating} de 5 estrelas`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={i < d.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-dojo-red"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <blockquote className="font-serif text-lg italic leading-relaxed text-dojo-white">
                &ldquo;{d.texto}&rdquo;
              </blockquote>

              <footer className="mt-8 flex items-center gap-4 border-t border-dojo-white/10 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dojo-red/40 bg-dojo-red/10 font-display text-sm font-bold uppercase text-dojo-red">
                  {d.iniciais}
                </div>
                <div>
                  <p className="text-sm font-bold text-dojo-white">
                    {d.persona}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-dojo-white/40">
                    {d.tempo}
                  </p>
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>

        <p className="mt-12 text-center text-xs italic text-dojo-white/40">
          Depoimentos representativos — fotos reais e nomes completos serão adicionados com consentimento LGPD.
        </p>
      </div>
    </section>
  );
}
