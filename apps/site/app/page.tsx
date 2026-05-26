import Image from "next/image";
import Link from "next/link";
import {
  ORG_NAME,
  ORG_SHORT,
  SLOGAN,
  KANJI,
  MODALIDADES,
  LOCALIDADE,
  FILOSOFIA_CITACAO,
  SENSEI,
} from "@dojo-fs/ui";

// ─── Stock photos Unsplash (FREE Unsplash License) ───────────────────────────
// IDs validados via WebFetch em 2026-05-25 — substituir por fotos reais do dojô do
// pai quando ele enviar (tatame oficial, sensei dando aula, alunos em ação).

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1611711605692-acb25d5d8399?q=80&w=2400&auto=format&fit=crop";
// Atletas BJJ em movimento, grayscale, mood épico

const JUDO_IMAGE =
  "https://images.unsplash.com/photo-1514050566906-8d077bae7046?q=80&w=1600&auto=format&fit=crop";
// Aerial kick martial artist, dinâmico

const BJJ_IMAGE =
  "https://images.unsplash.com/photo-1656653121475-e33829581294?q=80&w=1600&auto=format&fit=crop";
// Pose karatê B&W artístico

const SENSEI_IMAGE =
  "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?q=80&w=1600&auto=format&fit=crop";
// 2 atletas focados, depth of field

// ─── Header sticky ───────────────────────────────────────────────────────────

function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-dojo-white/5 bg-dojo-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="Início">
          <Image
            src="/logo-redondo-branco.png"
            alt={`Logo ${ORG_SHORT}`}
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-full"
          />
          <span className="hidden font-display text-sm font-bold uppercase tracking-widest text-dojo-white sm:inline">
            {ORG_SHORT}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navegação principal"
        >
          <a
            href="#sobre"
            className="text-xs uppercase tracking-widest text-dojo-white/60 transition-colors hover:text-dojo-white"
          >
            Sobre
          </a>
          <a
            href="#modalidades"
            className="text-xs uppercase tracking-widest text-dojo-white/60 transition-colors hover:text-dojo-white"
          >
            Modalidades
          </a>
          <a
            href="#filosofia"
            className="text-xs uppercase tracking-widest text-dojo-white/60 transition-colors hover:text-dojo-white"
          >
            Filosofia
          </a>
        </nav>

        <Link
          href="/login"
          className="rounded-sm border border-dojo-red bg-dojo-red px-5 py-2 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98]"
        >
          Entrar
        </Link>
      </div>
    </header>
  );
}

// ─── Hero cinematográfico (mood Andrew Wolf Boxing) ──────────────────────────

function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Foto B&W de fundo — atletas BJJ em movimento */}
      <Image
        src={HERO_IMAGE}
        alt="Atletas em treino de Jiu-Jitsu"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40 grayscale"
      />

      {/* Overlay gradiente preto pra contraste */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-dojo-black/70 via-dojo-black/50 to-dojo-black"
        aria-hidden="true"
      />

      {/* Linha decorativa superior */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 bg-dojo-red"
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center sm:px-8">
        <p className="mb-6 font-display text-xs uppercase tracking-[0.4em] text-dojo-red sm:text-sm">
          {LOCALIDADE}
        </p>

        <h1
          id="hero-heading"
          className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-dojo-white sm:text-7xl lg:text-8xl"
        >
          Dojô
          <br />
          Família
          <br />
          <span className="text-dojo-red">Scholze</span>
        </h1>

        <div className="mt-10 flex items-center gap-6">
          <span className="font-display text-2xl text-dojo-white sm:text-3xl">
            {KANJI.judo}
          </span>
          <span className="h-px w-12 bg-dojo-red" aria-hidden="true" />
          <span className="font-display text-2xl text-dojo-white sm:text-3xl">
            {KANJI.jiujitsu}
          </span>
        </div>

        <p className="mt-8 max-w-xl font-display text-lg uppercase tracking-[0.3em] text-dojo-red sm:text-xl">
          {SLOGAN}
        </p>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-sm border border-dojo-red bg-dojo-red px-8 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98]"
          >
            Entrar no Dojô
          </Link>
          <a
            href="#sobre"
            className="rounded-sm border border-dojo-white/30 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:border-dojo-white hover:bg-dojo-white/5"
          >
            Conheça
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-dojo-white/40">
        <span className="block animate-pulse">↓ Role</span>
      </div>
    </section>
  );
}

// ─── Sobre o Dojô (split foto + texto) ───────────────────────────────────────

function Sobre() {
  return (
    <section
      id="sobre"
      className="bg-dojo-black py-24 sm:py-32 lg:py-40"
      aria-labelledby="sobre-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Foto */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image
            src={SENSEI_IMAGE}
            alt={`Sensei ${SENSEI} em treino`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dojo-black to-transparent" />
        </div>

        {/* Texto */}
        <div className="flex flex-col justify-center">
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
              O <span className="text-dojo-white">{ORG_NAME}</span> é dirigido pelo{" "}
              <span className="text-dojo-white">Sensei {SENSEI}</span>, professor
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
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-dojo-red sm:text-4xl">
        {number}
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-dojo-white/40">
        {label}
      </p>
    </div>
  );
}

// ─── Modalidades (2 cards grandes) ───────────────────────────────────────────

function Modalidades() {
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <ModalidadeCard
            image={JUDO_IMAGE}
            kanji={KANJI.judo}
            nome="Judô"
            descricao="Arte do equilíbrio e da projeção. Disciplina olímpica fundada por Jigoro Kano em 1882. Treinamos do iniciante à graduação avançada."
            details={["Kihon (técnicas fundamentais)", "Nage-waza (projeções)", "Ne-waza (solo)", "Randori (treino livre)"]}
          />
          <ModalidadeCard
            image={BJJ_IMAGE}
            kanji={KANJI.jiujitsu}
            nome="Jiu-Jitsu"
            descricao="A arte suave. Sistema de luta de solo de origem japonesa refinado no Brasil. Técnica vence força."
            details={["Guarda (defesa de solo)", "Passagem de guarda", "Submissões e finalizações", "Sparring controlado"]}
          />
        </div>
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
}: {
  image: string;
  kanji: string;
  nome: string;
  descricao: string;
  details: string[];
}) {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-dojo-white/10 bg-dojo-gray/5">
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
              className="text-xs uppercase tracking-widest text-dojo-white/50"
            >
              {d}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ─── Filosofia (citação massiva — mood Lupine Lights) ────────────────────────

function Filosofia() {
  return (
    <section
      id="filosofia"
      className="relative overflow-hidden border-t border-dojo-white/5 bg-dojo-black py-32 sm:py-40 lg:py-48"
      aria-labelledby="filosofia-heading"
    >
      {/* Acento visual sutil */}
      <div
        className="absolute left-1/2 top-12 h-px w-24 -translate-x-1/2 bg-dojo-red"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
        <p className="mb-12 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
          Filosofia
        </p>

        <blockquote id="filosofia-heading">
          <p className="font-serif text-3xl italic leading-relaxed text-dojo-white sm:text-4xl lg:text-5xl">
            &ldquo;{FILOSOFIA_CITACAO.texto}&rdquo;
          </p>
          <footer className="mt-12">
            <p className="font-display text-sm uppercase tracking-[0.4em] text-dojo-white/40">
              — {FILOSOFIA_CITACAO.autor}
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-dojo-white/30">
              Fundador do Judô moderno
            </p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

// ─── CTA final ───────────────────────────────────────────────────────────────

function CtaFinal() {
  return (
    <section
      className="border-t border-dojo-white/5 bg-dojo-black py-24 sm:py-32"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-12">
        <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
          Começa aqui
        </p>
        <h2
          id="cta-heading"
          className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl"
        >
          Sua jornada<br />no Dojô
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-dojo-white/60 sm:text-lg">
          Acompanhe presença, evolução de faixa, mensalidades, certificados —
          tudo num só lugar.
        </p>
        <div className="mt-12">
          <Link
            href="/login"
            className="inline-block rounded-sm border border-dojo-red bg-dojo-red px-10 py-5 text-sm font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98]"
          >
            Entrar no Sistema
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-dojo-white/10 bg-dojo-black py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-redondo-branco.png"
              alt={`Logo ${ORG_SHORT}`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full opacity-60"
            />
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white">
                {ORG_SHORT}
              </p>
              <p className="text-xs uppercase tracking-widest text-dojo-white/40">
                {MODALIDADES.join(" · ")} — {LOCALIDADE}
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <p className="font-serif text-sm italic text-dojo-white/60">
              &ldquo;{SLOGAN}&rdquo;
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-dojo-white/30">
              Sensei {SENSEI} · 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-dojo-black">
        <Hero />
        <Sobre />
        <Modalidades />
        <Filosofia />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
