"use client";

import { useTranslation } from "react-i18next";
import {
  ORG_NAME,
  KANJI,
  SENSEI,
  Button,
} from "@dojo-fs/ui";

/**
 * Dashboard placeholder Fase 0. Sprint 1 substitui por:
 * - verificação Supabase session (redirect /login se não autenticado)
 * - dados do dojo + profile do user logado
 * - links pra alunos, turmas, presença, financeiro
 */
export default function DashboardPage() {
  const { t } = useTranslation();

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
            {t("common.welcome_sensei")}
          </h1>
          <p className="text-base text-muted-foreground">
            <span className="font-display text-xl">{KANJI.judo}</span>
            <span className="mx-3 text-dojo-red">•</span>
            <span className="font-display text-xl">{KANJI.jiujitsu}</span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-semibold">{t("common.org_name")}</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {t("common.modalidades")} — {t("common.locale")}
          </p>
        </div>

        <p className="font-display text-2xl font-bold tracking-widest text-dojo-red">
          {t("common.slogan")}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="default" size="lg" disabled>
            {t("auth.signin")} ({t("auth.sprint1_disabled")})
          </Button>
          <Button variant="outline" size="lg" disabled>
            {t("auth.register_dojo")} ({t("auth.sprint1_disabled")})
          </Button>
        </div>

        <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">
          Sensei {SENSEI}
        </p>
      </section>
    </main>
  );
}
