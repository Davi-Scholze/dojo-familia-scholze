"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "framer-motion";
import {
  Button,
  Input,
  ORG_NAME,
  ORG_SHORT,
  SLOGAN,
  KANJI,
  FILOSOFIA_CITACAO,
  SENSEI,
} from "@dojo-fs/ui";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { requestMagicLink } from "./actions";

// Mesma foto Unsplash B&W usada no hero da landing — consistência visual
const LOGIN_HERO_IMAGE =
  "https://images.unsplash.com/photo-1611711605692-acb25d5d8399?q=80&w=1600&auto=format&fit=crop";

export default function LoginPage() {
  return (
    <I18nProvider>
      <LoginContent />
    </I18nProvider>
  );
}

function LoginContent() {
  const { t } = useTranslation();
  // useReducedMotion mantido pra futura adição de animações pontuais
  useReducedMotion();
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
    <main
      className="min-h-screen bg-dojo-black text-dojo-white"
      aria-label={`Área de acesso — ${ORG_NAME}`}
    >
      {/* Linha decorativa superior */}
      <div
        className="fixed inset-x-0 top-0 z-50 h-0.5 bg-dojo-red"
        aria-hidden="true"
      />

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* ─────────────── LADO ESQUERDO — Foto cinematográfica B&W ─────────────── */}
        <aside
          className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between"
          aria-hidden="true"
        >
          <Image
            src={LOGIN_HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover grayscale"
          />

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-dojo-black/60 via-dojo-black/40 to-dojo-black/80" />

          {/* Top: link "Voltar" */}
          <div className="relative z-10 p-10">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-widest text-dojo-white/70 transition-colors hover:text-dojo-white"
            >
              <span aria-hidden="true">←</span>
              <span>Voltar ao site</span>
            </Link>
          </div>

          {/* Bottom: logo + slogan grande */}
          <div className="relative z-10 p-10">
            <div className="flex items-center gap-4">
              <Image
                src="/logo-redondo-branco.png"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 rounded-full"
              />
              <div>
                <p className="font-display text-2xl font-bold uppercase tracking-widest text-dojo-white">
                  {ORG_SHORT}
                </p>
                <p className="text-xs uppercase tracking-widest text-dojo-white/50">
                  {KANJI.judo} · {KANJI.jiujitsu}
                </p>
              </div>
            </div>

            <p className="mt-8 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white lg:text-5xl">
              {SLOGAN}
            </p>

            <blockquote className="mt-12 border-l-2 border-dojo-red pl-6">
              <p className="font-serif text-base italic leading-relaxed text-dojo-white/80 lg:text-lg">
                &ldquo;{FILOSOFIA_CITACAO.texto}&rdquo;
              </p>
              <footer className="mt-3 text-xs uppercase tracking-widest text-dojo-white/50">
                — {FILOSOFIA_CITACAO.autor}
              </footer>
            </blockquote>
          </div>
        </aside>

        {/* ─────────────── LADO DIREITO — Form ─────────────── */}
        <section className="flex min-h-screen flex-col px-6 py-12 sm:px-12 lg:py-16">
          {/* Header mobile-only: link "Voltar" + logo */}
          <div className="flex items-center justify-between lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-dojo-white/70 transition-colors hover:text-dojo-white"
            >
              <span aria-hidden="true">←</span>
              <span>Voltar</span>
            </Link>
            <Image
              src="/logo-redondo-branco.png"
              alt={`${ORG_SHORT}`}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full"
            />
          </div>

          {/* Centro vertical do form */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              {/* Hero foto mobile-only — substitui o split */}
              <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-sm lg:hidden">
                <Image
                  src={LOGIN_HERO_IMAGE}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dojo-black via-dojo-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-display text-xl font-bold uppercase tracking-widest text-dojo-white">
                    {SLOGAN}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-dojo-white/60">
                    {KANJI.judo} · {KANJI.jiujitsu}
                  </p>
                </div>
              </div>

              {/* Título form */}
              <div className="mb-10 text-left">
                <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-dojo-red">
                  Acesso ao Sistema
                </p>
                <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-dojo-white sm:text-5xl">
                  Entre no
                  <br />
                  <span className="text-dojo-red">Dojô</span>
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-dojo-white/60">
                  Digite seu email — você recebe um link de acesso direto. Sem senhas.
                </p>
              </div>

              {/* Form OR SentCard */}
              {state === "sent" ? (
                <SentCard
                  onReset={() => {
                    setState("idle");
                    setError(null);
                  }}
                />
              ) : (
                <form action={onSubmit} className="space-y-5" noValidate>
                  <div className="space-y-2 text-left">
                    <label
                      htmlFor="login-email"
                      className="block text-xs font-medium uppercase tracking-widest text-dojo-white"
                    >
                      {t("auth.email_label") || "Email"}
                    </label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      required
                      autoComplete="email"
                      placeholder="seu@email.com"
                      disabled={state === "sending"}
                      aria-describedby="login-email-hint"
                      className="h-12 rounded-sm border-dojo-gray bg-transparent text-dojo-white placeholder:text-dojo-gray focus-visible:border-dojo-red focus-visible:ring-1 focus-visible:ring-dojo-red disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {state === "error" && error && (
                    <p
                      role="alert"
                      aria-live="assertive"
                      className="rounded-sm border border-destructive bg-destructive/5 px-4 py-3 text-sm text-destructive"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    disabled={state === "sending"}
                    aria-busy={state === "sending"}
                    className="h-12 w-full rounded-sm bg-dojo-red text-xs font-bold uppercase tracking-widest text-dojo-white transition-all hover:bg-dojo-red/90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-dojo-red focus-visible:ring-offset-2 focus-visible:ring-offset-dojo-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {state === "sending"
                      ? t("auth.sending") || "Enviando…"
                      : t("auth.cta") || "Receber link de acesso"}
                  </Button>

                  <p
                    id="login-email-hint"
                    className="text-xs uppercase tracking-widest text-dojo-gray"
                  >
                    Sistema de acesso por link mágico — sem senhas.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-dojo-white/10 pt-8 text-center text-xs uppercase tracking-widest text-dojo-white/40">
            Sensei {SENSEI} · 2026
          </div>
        </section>
      </div>
    </main>
  );
}

// ─── SentCard — após envio do Magic Link ─────────────────────────────────────

interface SentCardProps {
  onReset: () => void;
}

function SentCard({ onReset }: SentCardProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="space-y-6 rounded-sm border border-dojo-red/40 bg-dojo-gray/10 p-8 text-left"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-sm border border-dojo-red/40"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dojo-red"
        >
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </div>

      <div>
        <p className="font-display text-xl font-bold uppercase tracking-widest text-dojo-white">
          Link enviado
        </p>
        <p className="mt-3 text-sm leading-relaxed text-dojo-white/70">
          Verifique sua caixa de entrada — o link expira em 1 hora e funciona
          apenas uma vez.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="h-11 w-full rounded-sm border border-dojo-white/20 bg-transparent text-xs font-bold uppercase tracking-widest text-dojo-white/70 transition-all hover:border-dojo-white/40 hover:text-dojo-white active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-dojo-red focus-visible:ring-offset-2 focus-visible:ring-offset-dojo-black"
      >
        Tentar com outro email
      </button>
    </div>
  );
}
