"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Button,
  Input,
  ORG_NAME,
  SLOGAN,
  KANJI,
  FILOSOFIA_CITACAO,
  SENSEI,
} from "@dojo-fs/ui";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import {
  motion,
  heroReveal,
  heroRevealDelayed,
  lineDrawReveal,
  formReveal,
  sentCardReveal,
  quoteReveal,
  fadeOnly,
  DURATION_EPIC,
  EASE_EMPHASIZED,
} from "@/components/MotionConfig";
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
  const reduced = useReducedMotion();
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
      className="relative flex min-h-screen flex-col items-center justify-center bg-dojo-black px-6 py-16 sm:py-24"
      aria-label={`Área de acesso — ${ORG_NAME}`}
    >
      {/*
        Linha de faixa superior — scaleX(0 → 1), transform-origin: left.
        Referência andrewolfboxing.club: linha "desenha" da esquerda,
        sensação de faixa sendo posta no tatame.
        prefers-reduced-motion: sem animação de escala — aparece direto.
      */}
      <motion.div
        className="absolute inset-x-0 top-0 h-0.5 bg-dojo-red"
        aria-hidden="true"
        style={{ transformOrigin: "left" }}
        variants={reduced ? undefined : lineDrawReveal}
        initial={reduced ? undefined : "hidden"}
        animate={reduced ? undefined : "visible"}
      />

      <section className="flex w-full max-w-md flex-col items-center gap-0 text-center">

        {/* ── HERO: Logo ── */}
        {/*
          heroReveal: opacity 0→1 + translateY 12px→0 em duration-epic (700ms).
          Primeiro elemento a aparecer — âncora visual da página.
        */}
        <motion.div
          className="w-full max-w-xs sm:max-w-sm"
          variants={reduced ? fadeOnly : heroReveal}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/logo-retangular-preto.png"
            alt={`Logo oficial ${ORG_NAME}`}
            width={480}
            height={240}
            priority
            className="h-auto w-full object-contain"
          />
        </motion.div>

        {/* ── HERO: Slogan + Kanji ── */}
        {/*
          heroRevealDelayed: mesma curva do logo mas com delay de 150ms.
          Slogan e kanji chegam juntos como uma unidade — separar aumentaria
          o tempo de reveal total sem ganho perceptual.
          Delay 150ms: duration-fast (feedback imediato como referência de tempo).
        */}
        <motion.div
          className="mt-8 space-y-3 sm:mt-10"
          variants={reduced ? fadeOnly : heroRevealDelayed}
          initial="hidden"
          animate="visible"
          transition={
            reduced
              ? undefined
              : {
                  duration: DURATION_EPIC,
                  ease: EASE_EMPHASIZED,
                  delay: 0.15, // 150ms após logo
                }
          }
        >
          <p
            className="font-display text-2xl font-bold uppercase tracking-widest text-dojo-red sm:text-3xl"
            aria-label={`Slogan: ${SLOGAN}`}
          >
            {SLOGAN}
          </p>
          <p
            className="font-display text-lg tracking-wide text-dojo-white sm:text-xl"
            aria-label={`Modalidades: Judô e Jiu-Jitsu`}
          >
            {KANJI.judo}
            <span className="mx-3 text-dojo-red" aria-hidden="true">
              •
            </span>
            {KANJI.jiujitsu}
          </p>
        </motion.div>

        {/* ── Divisor tênue ── */}
        {/*
          Aparece junto com o hero — sem animação própria.
          Fazer o divisor animar separado seria overload visual.
        */}
        <div
          className="my-12 h-px w-16 bg-dojo-red sm:my-14"
          aria-hidden="true"
        />

        {/* ── FORMULÁRIO ou ESTADO "ENVIADO" ── */}
        {/*
          AnimatePresence mode="wait": aguarda exit animation do elemento
          saindo antes de montar o novo.
          Crossfade com scale 0.98→1: sutileza que o cérebro lê como
          "elemento ganhou peso real" sem efeito cartoonesco.

          formReveal: delay 400ms após slogan — não apressado (briefing §4).
          sentCardReveal: sem delay — já é resposta a ação do usuário,
          deve aparecer rápido (dentro do duration-slow de 400ms).
        */}
        <AnimatePresence mode="wait" initial={false}>
          {state === "sent" ? (
            <motion.div
              key="sent"
              className="w-full"
              variants={reduced ? fadeOnly : sentCardReveal}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SentCard
                onReset={() => {
                  setState("idle");
                  setError(null);
                }}
                t={t}
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="w-full"
              variants={reduced ? fadeOnly : formReveal}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 0.4, // duration-slow
                      ease: [0.2, 0, 0, 1], // ease-standard
                      delay: state === "idle" ? 0.4 : 0, // delay inicial 400ms
                    }
              }
            >
              <form
                action={onSubmit}
                className="w-full space-y-5"
                aria-label={t("auth.form_label") || "Formulário de acesso"}
                noValidate
              >
                {/* Label explícita — acessibilidade WCAG 1.3.1 */}
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
                    className={[
                      "h-12 rounded-sm border-dojo-gray bg-transparent",
                      "text-dojo-white placeholder:text-dojo-gray",
                      "focus-visible:border-dojo-red focus-visible:ring-1 focus-visible:ring-dojo-red",
                      "disabled:opacity-50",
                    ].join(" ")}
                  />
                </div>

                {/* Mensagem de erro inline */}
                <AnimatePresence>
                  {state === "error" && error && (
                    <motion.p
                      key="error"
                      role="alert"
                      aria-live="assertive"
                      className="rounded-sm border border-destructive bg-transparent px-4 py-3 text-sm text-destructive"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* CTA principal */}
                {/*
                  whileTap: scale 0.98 — feedback de press físico.
                  Referência andrewolfboxing.club: micro-interação de toque.
                  active:scale-[0.98] Tailwind mantido como fallback CSS
                  (antes do JS hidrate) — o whileTap sobrepõe em runtime.
                  whileHover apenas no botão CTA — não em todo elemento
                  (anti-padrão: hover em TUDO = overload visual).
                */}
                <motion.div
                  whileHover={reduced ? undefined : { scale: 1.005 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
                >
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    disabled={state === "sending"}
                    aria-busy={state === "sending"}
                    className={[
                      "h-12 w-full rounded-sm",
                      "bg-dojo-red text-dojo-white",
                      "text-xs font-bold uppercase tracking-widest",
                      "hover:bg-dojo-red/90 active:scale-[0.98]",
                      "focus-visible:ring-2 focus-visible:ring-dojo-red focus-visible:ring-offset-2 focus-visible:ring-offset-dojo-black",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "transition-all duration-150",
                    ].join(" ")}
                  >
                    {state === "sending"
                      ? (t("auth.sending") || "Enviando…")
                      : (t("auth.cta") || "RECEBER LINK DE ACESSO")}
                  </Button>
                </motion.div>

                {/* Microcopy Magic Link */}
                <p
                  id="login-email-hint"
                  className="mt-1 text-xs uppercase tracking-widest text-dojo-gray"
                >
                  {t("auth.magiclink_hint") ||
                    "Sem senhas. Você recebe um link seguro de acesso direto no email."}
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Divisor contemplativo ── */}
        <div
          className="my-12 h-px w-full bg-dojo-gray/30 sm:my-14"
          aria-hidden="true"
        />

        {/* ── CITAÇÃO JIGORO KANO — mood Lupine Lights ── */}
        {/*
          whileInView: só anima quando entra no viewport.
          viewport.once: true — não re-anima ao rolar de volta (respeitoso).
          viewport.margin: "-40px" — começa um pouco antes do elemento
          estar 100% visível (sensação de continuidade, não abrupta).
          translateX(-8px → 0): revelação da esquerda, como se saísse da
          sombra da borda vermelha onde está apoiada.
        */}
        <motion.blockquote
          className="w-full border-l-2 border-dojo-red pl-6 text-left"
          aria-label={`Citação de ${FILOSOFIA_CITACAO.autor}`}
          variants={reduced ? fadeOnly : quoteReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <p className="font-serif text-sm italic leading-relaxed text-dojo-white/80 sm:text-base">
            &ldquo;{FILOSOFIA_CITACAO.texto}&rdquo;
          </p>
          <footer className="mt-3 text-xs uppercase tracking-widest text-dojo-gray">
            — {FILOSOFIA_CITACAO.autor}
          </footer>
        </motion.blockquote>

        {/* ── FOOTER sutil ── */}
        {/*
          Sem animação de movimento — apenas opacity fade.
          É o elemento mais periférico da página; animar com slide
          ou scale seria hierarquicamente incorreto.
        */}
        <motion.p
          className="mt-12 text-xs uppercase tracking-widest text-dojo-gray sm:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.2, 0, 0, 1], delay: 0.6 }}
        >
          Sensei {SENSEI} · 2026
        </motion.p>

      </section>

      {/* Linha decorativa inferior — espelho da superior, sem animação */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 bg-dojo-gray/30"
        aria-hidden="true"
      />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SentCard — estado após envio do Magic Link
   Mesmo peso visual da identidade, sem sair do dark-first
───────────────────────────────────────────────────────────────────────── */
interface SentCardProps {
  onReset: () => void;
  t: (key: string) => string;
}

function SentCard({ onReset, t }: SentCardProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full space-y-6 rounded-sm border border-dojo-red/40 bg-dojo-gray/10 px-6 py-8 text-left"
    >
      {/* Ícone tênue — envelope em unicode, sem emoji-mood, sem import de lib */}
      <div
        className="flex h-11 w-11 items-center justify-center rounded-sm border border-dojo-red/30"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dojo-red"
          aria-hidden="true"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-widest text-dojo-white">
          {t("auth.sent_title") || "Verifique sua caixa de entrada"}
        </p>
        <p className="text-sm leading-relaxed text-dojo-gray">
          {t("auth.sent_body") ||
            "Enviamos um link de acesso seguro para o seu email. Ele é válido por 10 minutos."}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className={[
          "h-9 px-0 text-xs uppercase tracking-widest",
          "text-dojo-gray hover:text-dojo-white",
          "focus-visible:ring-1 focus-visible:ring-dojo-red",
        ].join(" ")}
      >
        {t("auth.try_another") || "Tentar com outro email"}
      </Button>
    </div>
  );
}
