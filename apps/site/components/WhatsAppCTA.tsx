"use client";

import { useReducedMotion } from "framer-motion";
import { motion, heroReveal, fadeOnly } from "./MotionConfig";

const WHATSAPP_NUMERO = "5500000000000"; // Placeholder — atualizar com número do Sensei
const WHATSAPP_MENSAGEM = `Olá Sensei! Vim pelo site e gostaria de agendar minha aula experimental gratuita. Aguardo retorno. 🥋`;

export function WhatsAppCTA() {
  const reduced = useReducedMotion();
  const variants = reduced ? fadeOnly : heroReveal;

  const link = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;

  return (
    <section
      id="contato"
      className="relative overflow-hidden border-t border-dojo-white/5 bg-dojo-black py-32 sm:py-40 lg:py-48"
      aria-labelledby="cta-whatsapp-heading"
    >
      {/* Linha vermelha topo */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 bg-dojo-red"
        aria-hidden="true"
      />

      {/* Acento gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-dojo-red/5 via-transparent to-transparent" />

      <motion.div
        className="relative mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-12"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
          Próximo passo
        </p>

        <h2
          id="cta-whatsapp-heading"
          className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl lg:text-6xl"
        >
          Agende aula<br />experimental
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-dojo-white/70 sm:text-lg">
          Primeira aula <span className="text-dojo-red">gratuita</span>. Sem compromisso.
          Venha conhecer o tatame, o Sensei e a turma.
        </p>

        <div className="mt-12">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-sm border border-dojo-red bg-dojo-red px-10 py-5 text-sm font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98] sm:text-base"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chamar no WhatsApp
          </a>
        </div>

        <p className="mt-6 text-xs uppercase tracking-widest text-dojo-white/40">
          Resposta em até 24h · Sensei Cristiano Scholze
        </p>
      </motion.div>
    </section>
  );
}
