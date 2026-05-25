"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Input,
  ORG_NAME,
  KANJI,
  SLOGAN,
  SENSEI,
} from "@dojo-fs/ui";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { requestMagicLink } from "./actions";

export default function LoginPage() {
  return (
    <I18nProvider>
      <LoginContent />
    </I18nProvider>
  );
}

function LoginContent() {
  const { t } = useTranslation();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setState("sending");
    setError(null);
    const result = await requestMagicLink(formData);
    if (result.ok) {
      setState("sent");
    } else {
      setError(result.error);
      setState("error");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <section className="flex w-full max-w-md flex-col items-center gap-8 text-center">
        <img
          src="/logo-retangular-preto.png"
          alt={`Logo oficial ${ORG_NAME}`}
          width={320}
          height={160}
          className="h-auto w-full max-w-xs"
        />

        <div className="space-y-2">
          <p className="font-display text-2xl font-bold tracking-widest text-dojo-red">
            {SLOGAN}
          </p>
          <p className="text-base text-muted-foreground">
            <span className="font-display text-lg">{KANJI.judo}</span>
            <span className="mx-3 text-dojo-red">•</span>
            <span className="font-display text-lg">{KANJI.jiujitsu}</span>
          </p>
        </div>

        {state === "sent" ? (
          <div className="w-full space-y-3 rounded-lg border border-dojo-red bg-card px-6 py-8">
            <p className="text-lg font-semibold">{t("auth.signin")} ✓</p>
            <p className="text-sm text-muted-foreground">
              Verifique sua caixa de entrada — enviamos um link de acesso pra você.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setState("idle");
                setError(null);
              }}
            >
              Tentar com outro email
            </Button>
          </div>
        ) : (
          <form action={onSubmit} className="w-full space-y-4">
            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                autoComplete="email"
                disabled={state === "sending"}
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={state === "sending"}
              className="w-full"
            >
              {state === "sending"
                ? "Enviando…"
                : "Receber link de acesso"}
            </Button>

            {state === "error" && error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <p className="text-xs text-muted-foreground">
              Sem senhas — só email. Você recebe um link mágico que faz login automático.
            </p>
          </form>
        )}

        <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
          {ORG_NAME} — Sensei {SENSEI}
        </div>
      </section>
    </main>
  );
}
