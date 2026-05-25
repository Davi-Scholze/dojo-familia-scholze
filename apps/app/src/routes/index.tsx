import {
  ORG_NAME,
  SLOGAN,
  KANJI,
  MODALIDADES,
  LOCALIDADE,
  SENSEI,
  Button,
} from "@dojo-fs/ui";

export function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <section className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <img
          src="/logo-retangular-preto.png"
          alt={`Logo oficial ${ORG_NAME}`}
          width={400}
          height={200}
          className="h-auto w-full max-w-sm"
        />

        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold tracking-wider text-dojo-red sm:text-4xl">
            Bem-vindo, Sensei
          </h1>
          <p className="text-base text-muted-foreground">
            <span className="font-display text-xl">{KANJI.judo}</span>
            <span className="mx-3 text-dojo-red">•</span>
            <span className="font-display text-xl">{KANJI.jiujitsu}</span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-semibold">{ORG_NAME}</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {MODALIDADES.join(" · ")} — {LOCALIDADE}
          </p>
        </div>

        <p className="font-display text-2xl font-bold tracking-widest text-dojo-red">
          {SLOGAN}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="default" size="lg" disabled>
            Entrar (Sprint 1)
          </Button>
          <Button variant="outline" size="lg" disabled>
            Cadastrar dojô (Sprint 1)
          </Button>
        </div>

        <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">
          Sensei {SENSEI}
        </p>
      </section>
    </main>
  );
}
