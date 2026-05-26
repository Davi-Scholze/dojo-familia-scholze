"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { SENSEI, LOCALIDADE } from "@dojo-fs/ui";
import { PageHero } from "../../../components/PageHero";
import {
  motion,
  staggerContainerSlow,
  cardEnter,
  fadeOnly,
} from "../../../components/MotionConfig";

const WHATSAPP_NUMERO = "5500000000000"; // Placeholder — atualizar com número real do Sensei
const WHATSAPP_MENSAGEM =
  "Olá Sensei! Vim pelo site e gostaria de agendar minha aula experimental gratuita.";
const INSTAGRAM_URL = "https://www.instagram.com/dojofamiliascholze/";
const YOUTUBE_URL = "https://www.youtube.com/@DojoFamiliaScholze";

export default function ContatoPage() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;

  const reduced = useReducedMotion();
  const cardVariants = reduced ? fadeOnly : cardEnter;
  const containerVariants = reduced ? fadeOnly : staggerContainerSlow;

  return (
    <>
      <PageHero
        breadcrumb="Contato"
        label="Fale com a gente"
        title="Contato"
        lead={`Resposta rápida pelo WhatsApp. Sensei ${SENSEI} mesmo responde.`}
        bgImage="https://images.unsplash.com/photo-1753459844216-8644b13d863a?w=2400&auto=format&fit=crop"
        bgAlt=""
      />

      <div className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 lg:px-12">
        {/* CTA WhatsApp primário */}
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
          className="group flex w-full items-center justify-between rounded-sm border-2 border-dojo-red bg-dojo-red/10 p-8 transition-all hover:bg-dojo-red active:scale-[0.99] sm:p-10"
        >
          <div className="flex items-center gap-6">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-sm bg-dojo-red text-dojo-white">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-display text-xl font-bold uppercase tracking-tight text-dojo-white sm:text-2xl">
                WhatsApp
              </p>
              <p className="mt-1 text-sm text-dojo-white/70">
                Aula experimental gratuita — resposta em até 24h
              </p>
            </div>
          </div>

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="hidden text-dojo-white transition-transform group-hover:translate-x-1 sm:block"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.a>

        {/* Redes sociais */}
        <motion.section
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.a
            variants={cardVariants}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-sm border border-dojo-white/10 bg-dojo-gray/5 p-6 transition-all hover:border-dojo-red/40"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm border border-dojo-white/10 text-dojo-white/60 transition-colors group-hover:text-dojo-red">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white">
                Instagram
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-dojo-white/50">
                @dojofamiliascholze
              </p>
            </div>
          </motion.a>

          <motion.a
            variants={cardVariants}
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-sm border border-dojo-white/10 bg-dojo-gray/5 p-6 transition-all hover:border-dojo-red/40"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm border border-dojo-white/10 text-dojo-white/60 transition-colors group-hover:text-dojo-red">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white">
                YouTube
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-dojo-white/50">
                @DojoFamiliaScholze
              </p>
            </div>
          </motion.a>
        </motion.section>

        {/* Localização */}
        <section className="mt-12 rounded-sm border border-dojo-white/10 bg-dojo-gray/5 p-8 sm:p-10">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            Localização
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-dojo-white sm:text-3xl">
            {LOCALIDADE}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-dojo-white/70">
            Duas sedes. Endereços completos disponíveis na seção{" "}
            <Link href="/#locais" className="text-dojo-red transition-colors hover:text-dojo-white">
              Locais & Planos
            </Link>{" "}
            da home.
          </p>
        </section>

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
              href="/modalidades"
              className="text-xs uppercase tracking-[0.3em] text-dojo-red transition-colors hover:text-dojo-white"
            >
              → Modalidades & Faixas
            </Link>
          </div>
        </section>

        {/* Privacidade */}
        <p className="mt-12 text-center text-xs uppercase tracking-widest text-dojo-white/50">
          Seus dados são tratados conforme a LGPD (Lei 13.709/2018).{" "}
          <Link
            href="/legal/privacidade"
            className="text-dojo-white/70 transition-colors hover:text-dojo-red"
          >
            Política de privacidade
          </Link>
        </p>
      </div>
    </>
  );
}
