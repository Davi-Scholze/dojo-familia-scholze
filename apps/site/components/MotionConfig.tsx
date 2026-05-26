/**
 * MotionConfig.tsx — Variants reutilizáveis de animação (Dojô Família Scholze)
 *
 * Todos os tokens de motion derivam do DESIGN.md §3:
 *   ease-standard:   cubic-bezier(0.2, 0, 0, 1)   — uso geral
 *   ease-emphasized: cubic-bezier(0.3, 0, 0, 1)   — elementos entram em foco
 *   ease-cinematic:  cubic-bezier(0.65, 0, 0.35, 1) — transições de tela
 *   duration-fast:   150ms  — hover/press
 *   duration-base:   250ms  — transição de estado
 *   duration-slow:   400ms  — entrada/saída de elementos grandes
 *   duration-epic:   700ms  — hero reveals, drama
 *
 * Princípios:
 *   - Nunca animar width/height/top/left (causam layout reflow)
 *   - Apenas transform (translateY/X, scale) + opacity
 *   - prefers-reduced-motion: usar useReducedMotion() em cada site de uso
 *   - Mood: refinado, contemplativo — sem spring/bounce
 *
 * Uso:
 *   import { heroReveal, staggerContainer, cardEnter, ... } from "@/components/MotionConfig"
 *   import { useReducedMotion } from "framer-motion"
 *
 *   const reduced = useReducedMotion()
 *   <motion.div variants={reduced ? fadeOnly : heroReveal} initial="hidden" animate="visible" />
 */

import { motion as motionFM } from "framer-motion";
import type { Variants } from "framer-motion";

/**
 * Motion re-export como `any` — contorna conflito framer-motion v12 + React 19
 * types em `onDrag` handler. Issue upstream: github.com/framer/motion/issues/3262.
 *
 * Não usamos features de drag aqui (apenas reveals + stagger + hover),
 * então `any` é seguro escopado.
 *
 * Quando upstream publicar fix definitivo, substituir import direto:
 *   import { motion } from "framer-motion"
 */
// Re-export como any pra contornar conflito de types framer-motion v12 + React 19.
// Não usamos features de drag aqui, então `any` escopado é seguro.
export const motion = motionFM as unknown as Record<string, React.ComponentType<Record<string, unknown>>>;

// ─── Easings (espelham DESIGN.md §3 como constantes JS) ──────────────────────

export const EASE_STANDARD = [0.2, 0, 0, 1] as const;
export const EASE_EMPHASIZED = [0.3, 0, 0, 1] as const;
export const EASE_CINEMATIC = [0.65, 0, 0.35, 1] as const;

export const DURATION_FAST = 0.15;   // 150ms
export const DURATION_BASE = 0.25;   // 250ms
export const DURATION_SLOW = 0.4;    // 400ms
export const DURATION_EPIC = 0.7;    // 700ms

// ─── Variant: fadeOnly ────────────────────────────────────────────────────────
// Usado quando prefers-reduced-motion está ativo.
// Preserva a intenção de reveal sem nenhum movimento.

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION_BASE, ease: EASE_STANDARD },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION_FAST, ease: EASE_STANDARD },
  },
};

// ─── Variant: heroReveal ──────────────────────────────────────────────────────
// Hero principal: logo + slogan + kanji.
// Mood andrewolfboxing.club — épico mas não agressivo.
// translateY de 12px (sutil — não "salta" na tela).

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_EPIC,
      ease: EASE_EMPHASIZED,
    },
  },
};

// ─── Variant: heroRevealDelayed ───────────────────────────────────────────────
// Para slogan e kanji após o logo (delay escalonado manual via transition.delay).
// O consumer passa delay como override na prop `transition`.

export const heroRevealDelayed: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_EPIC,
      ease: EASE_EMPHASIZED,
    },
  },
};

// ─── Variant: staggerContainer ────────────────────────────────────────────────
// Wrapper pai que distribui delay entre filhos via staggerChildren.
// Mood: rig.ai — revelação em cascata, scroll contemplativo.

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,   // 60ms entre cada filho
      delayChildren: 0,
    },
  },
};

// ─── Variant: staggerContainerSlow ───────────────────────────────────────────
// Para cards de seção (grid) — stagger de 80ms conforme briefing §4.

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,   // 80ms entre filhos
      delayChildren: 0,
    },
  },
};

// ─── Variant: metricRowEnter ─────────────────────────────────────────────────
// Linhas de métrica do dashboard — slide-in 8px da esquerda + fade.
// Mood onmat.app — stagger discreto, utilitário.

export const metricRowEnter: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_EMPHASIZED,
    },
  },
};

// ─── Variant: cardEnter ───────────────────────────────────────────────────────
// Cards de seção — fade + scale sutil de 0.96 → 1.0.
// Scale pequeno: percepção de profundidade sem "pop" cartoonesco.

export const cardEnter: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_EMPHASIZED,
    },
  },
};

// ─── Variant: welcomeReveal ───────────────────────────────────────────────────
// Welcome hero do dashboard — h1 slide-up + fade.
// Menor distância (6px) do que o hero login (12px): contexto é utilitário,
// não épico. Ainda assim respira.

export const welcomeReveal: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_EMPHASIZED,
    },
  },
};

// ─── Variant: captionReveal ───────────────────────────────────────────────────
// roleLabel abaixo do h1 — delay de 200ms após welcomeReveal.
// Sequenciado pelo consumer via transition.delay.

export const captionReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_BASE,
      ease: EASE_STANDARD,
    },
  },
};

// ─── Variant: footerReveal ────────────────────────────────────────────────────
// Kanji + slogan do rodapé — fade puro, contemplativo (lupinelights.com).
// Sem translação: o conteúdo já está no lugar certo, só revela-se.
// duration-epic (700ms) com delay grande — o último elemento a aparecer.

export const footerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_EPIC,
      ease: EASE_STANDARD,
    },
  },
};

// ─── Variant: formReveal ─────────────────────────────────────────────────────
// Form do login — aparece depois do hero sem pressa.
// fade + translateY(4px) mínimo: formulário não "salta", desliza suavemente.

export const formReveal: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_STANDARD,
    },
  },
};

// ─── Variant: sentCardReveal ─────────────────────────────────────────────────
// SentCard (estado pós-envio Magic Link) — crossfade com leve scale.
// scale 0.98 → 1.0: praticamente imperceptível conscientemente,
// mas o cérebro percebe como "elemento que ganhou peso/realidade".

export const sentCardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_STANDARD,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: DURATION_FAST,
      ease: EASE_STANDARD,
    },
  },
};

// ─── Variant: quoteReveal ────────────────────────────────────────────────────
// Citação Jigoro Kano — whileInView, translateX(-8px → 0) + fade.
// Referência rig.ai: reveal de fora-do-viewport, scroll contemplativo.

export const quoteReveal: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_EMPHASIZED,
    },
  },
};

// ─── Variant: lineDrawReveal ─────────────────────────────────────────────────
// Linha de faixa vermelha superior — scaleX(0 → 1), transform-origin: left.
// Referência andrewolfboxing.club: linha "desenha" da esquerda.
// Nota: aplicar `style={{ transformOrigin: "left" }}` no motion.div.

export const lineDrawReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,           // 600ms — exatamente como especificado no briefing
      ease: EASE_EMPHASIZED,
    },
  },
};

// ─── Variant: overviewCardReveal ─────────────────────────────────────────────
// Card "Visão geral" — fade + scale 0.98 → 1, sem slide.
// Mais sutil que cardEnter porque é conteúdo utilitário primário.

export const overviewCardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_EMPHASIZED,
    },
  },
};
