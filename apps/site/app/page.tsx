import Image from "next/image";
import {
  ORG_NAME,
  SLOGAN,
  KANJI,
  MODALIDADES,
  LOCALIDADE,
  FILOSOFIA_CITACAO,
  SENSEI,
} from "@dojo-fs/ui";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <section className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <Image
          src="/logo-retangular-preto.png"
          alt={`Logo oficial ${ORG_NAME}`}
          width={480}
          height={240}
          priority
          className="h-auto w-full max-w-md"
        />

        <div className="space-y-2">
          <h1 className="font-display text-4xl font-bold tracking-wider text-dojo-red sm:text-5xl">
            {SLOGAN}
          </h1>
          <p className="text-lg text-muted-foreground">
            <span className="font-display text-2xl">{KANJI.judo}</span>
            <span className="mx-3 text-dojo-red">•</span>
            <span className="font-display text-2xl">{KANJI.jiujitsu}</span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xl font-semibold">{ORG_NAME}</p>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            {MODALIDADES.join(" · ")} — {LOCALIDADE}
          </p>
        </div>

        <blockquote className="mt-8 max-w-2xl border-l-2 border-dojo-red pl-6 text-left italic text-muted-foreground">
          &ldquo;{FILOSOFIA_CITACAO.texto}&rdquo;
          <footer className="mt-2 text-sm not-italic">
            — {FILOSOFIA_CITACAO.autor}
          </footer>
        </blockquote>

        <p className="mt-12 text-xs uppercase tracking-widest text-muted-foreground">
          Sensei {SENSEI}
        </p>
      </section>
    </main>
  );
}
