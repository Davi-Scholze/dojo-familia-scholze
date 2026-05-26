import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ORG_NAME, SENSEI, FILOSOFIA_CITACAO, LOCALIDADE, KANJI } from "@dojo-fs/ui";

export const metadata: Metadata = {
  title: `Sobre o Dojô · ${ORG_NAME}`,
  description: `Conheça o ${ORG_NAME}, dirigido pelo Sensei ${SENSEI} em ${LOCALIDADE}. Tradição em Judô e Jiu-Jitsu seguindo a filosofia de Jigoro Kano.`,
};

const SENSEI_IMAGE =
  "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?q=80&w=1600&auto=format&fit=crop";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-dojo-black pt-24 pb-24 sm:pt-32 sm:pb-32">
      <article className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs uppercase tracking-[0.3em] text-dojo-white/40">
          <Link href="/" className="transition-colors hover:text-dojo-red">
            Início
          </Link>
          <span className="mx-3">·</span>
          <span className="text-dojo-white/60">Sobre</span>
        </nav>

        {/* Header */}
        <header className="mb-16 sm:mb-20">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            A história
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl lg:text-6xl">
            Sobre o<br />
            <span className="text-dojo-red">{ORG_NAME}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-dojo-white/70">
            Uma família que ama lutar. Décadas de tatame em {LOCALIDADE}, formando
            atletas e cidadãos no espírito do Judô tradicional e do Jiu-Jitsu refinado.
          </p>
        </header>

        {/* Foto Sensei */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={SENSEI_IMAGE}
              alt={`Sensei ${SENSEI}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dojo-black to-transparent" />
          </div>

          <div className="flex flex-col justify-center">
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
                Mais que técnica — ensina <span className="font-serif italic text-dojo-white">
                  caráter, disciplina, humildade.
                </span>
              </p>
              <p>
                Cada cerimônia de graduação é um marco familiar. Pais treinam ao
                lado dos filhos. Adultos recreativos compartilham o tatame com
                competidores.
              </p>
            </div>
          </div>
        </div>

        {/* Filosofia */}
        <section className="border-y border-dojo-white/10 py-16 sm:py-20">
          <p className="mb-8 text-center font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
            Filosofia
          </p>

          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-serif text-2xl italic leading-relaxed text-dojo-white sm:text-3xl">
              &ldquo;{FILOSOFIA_CITACAO.texto}&rdquo;
            </p>
            <footer className="mt-8">
              <p className="font-display text-sm uppercase tracking-[0.4em] text-dojo-white/40">
                — {FILOSOFIA_CITACAO.autor}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-dojo-white/30">
                Fundador do Judô moderno
              </p>
            </footer>
          </blockquote>
        </section>

        {/* Kanji + Slogan */}
        <section className="my-16 text-center">
          <div className="flex items-center justify-center gap-6">
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

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
      </article>
    </main>
  );
}
