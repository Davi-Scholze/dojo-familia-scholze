"use client";

import { useReducedMotion } from "framer-motion";
import {
  motion,
  staggerContainerSlow,
  cardEnter,
  fadeOnly,
} from "./MotionConfig";

const VANTAGENS = [
  {
    kanji: "心",
    titulo: "Bem-estar adulto",
    descricao:
      "Treino como ferramenta de gestão de estresse. Meditação ativa, liberação de endorfina, qualidade do sono.",
  },
  {
    kanji: "礼",
    titulo: "Disciplina pras crianças",
    descricao:
      "Coordenação motora, respeito ao colega, foco — base sólida pra escola e pra vida.",
  },
  {
    kanji: "双",
    titulo: "Duas artes, um caminho",
    descricao:
      "Judô (CBJ) + Jiu-Jitsu (IBJJF) sob o mesmo Sensei. Formação técnica completa em artes marciais.",
  },
  {
    kanji: "道",
    titulo: "Filosofia tradicional",
    descricao:
      "Linhagem japonesa autêntica de Jigoro Kano. Ceder pra vencer é princípio de combate e de vida.",
  },
  {
    kanji: "家",
    titulo: "Comunidade família",
    descricao:
      "Crianças, adultos recreativos e competidores no mesmo tatame. Pais treinam com filhos. Uma família que ama lutar.",
  },
  {
    kanji: "技",
    titulo: "Evolução por faixas",
    descricao:
      "Sistema oficial de graduação CBJ + IBJJF. Cerimônias formais. Certificado físico + registro digital.",
  },
];

export function Vantagens() {
  const reduced = useReducedMotion();
  const containerVariants = reduced ? fadeOnly : staggerContainerSlow;
  const cardVariants = reduced ? fadeOnly : cardEnter;

  return (
    <section
      id="vantagens"
      className="border-t border-dojo-white/5 bg-dojo-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="vantagens-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-16 text-center sm:mb-20">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            Por que treinar aqui
          </p>
          <h2
            id="vantagens-heading"
            className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl lg:text-6xl"
          >
            Mais que técnica.<br />Tradição viva.
          </h2>
        </div>

        <motion.ul
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {VANTAGENS.map((v) => (
            <motion.li
              key={v.titulo}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-sm border border-dojo-white/10 bg-dojo-gray/5 p-8 transition-colors duration-300 hover:border-dojo-red/40 sm:p-10"
            >
              <div className="absolute right-6 top-6 font-display text-5xl text-dojo-white/5 transition-all duration-500 group-hover:text-dojo-red/20 sm:text-6xl">
                {v.kanji}
              </div>

              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-dojo-white sm:text-2xl">
                {v.titulo}
              </h3>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-dojo-white/70">
                {v.descricao}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
