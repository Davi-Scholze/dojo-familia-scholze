"use client";

/**
 * DashboardSections.tsx — Client Component wrappers para animação do dashboard.
 *
 * O /dashboard/page.tsx é Server Component e não pode importar Framer Motion
 * diretamente. Este arquivo exporta wrappers "motion-aware" que recebem
 * children do Server Component e aplicam as animações.
 *
 * Arquitetura:
 *   Server Component (page.tsx)
 *     └─ <AnimatedWelcome>     — motion.div com welcomeReveal
 *     └─ <AnimatedOverviewCard> — motion.div com overviewCardReveal
 *     └─ <AnimatedMetricList>  — motion.ul com staggerContainer
 *         └─ <AnimatedMetricItem> — motion.li com metricRowEnter
 *     └─ <AnimatedModuleGrid>  — motion.div com staggerContainerSlow
 *         └─ <AnimatedCard>    — motion.div com cardEnter
 *     └─ <AnimatedFooter>      — motion.footer com footerReveal + delay
 *
 * prefers-reduced-motion:
 *   useReducedMotion() do Framer Motion retorna true quando o SO/navegador
 *   sinalizou preferência de movimento reduzido. Quando true, todos os
 *   variants são substituídos por fadeOnly (apenas opacity, sem translação).
 *
 * Restrições (DESIGN.md §3 + briefing animation-engineer):
 *   - Nenhum spring/bounce (ease array, nunca type: "spring")
 *   - Nenhuma animação width/height/top/left
 *   - Máximo 700ms (duration-epic) pra reveals iniciais
 */

import { useReducedMotion, AnimatePresence } from "framer-motion";
import {
  motion,
  welcomeReveal,
  captionReveal,
  staggerContainer,
  staggerContainerSlow,
  metricRowEnter,
  cardEnter,
  footerReveal,
  overviewCardReveal,
  fadeOnly,
  DURATION_BASE,
  DURATION_SLOW,
  EASE_STANDARD,
} from "@/components/MotionConfig";

// ─── AnimatedWelcome ─────────────────────────────────────────────────────────
// Anima o bloco "Bem-vindo, [Nome]" + label de role.
// h1 revela em 400ms ease-emphasized; caption com delay de 200ms.

interface AnimatedWelcomeProps {
  heading: React.ReactNode;
  caption: React.ReactNode;
}

export function AnimatedWelcome({ heading, caption }: AnimatedWelcomeProps) {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-2">
      <motion.div
        variants={reduced ? fadeOnly : welcomeReveal}
        initial="hidden"
        animate="visible"
      >
        {heading}
      </motion.div>
      <motion.div
        variants={reduced ? fadeOnly : captionReveal}
        initial="hidden"
        animate="visible"
        transition={
          reduced
            ? undefined
            : {
                duration: DURATION_BASE,
                ease: EASE_STANDARD,
                delay: 0.2, // 200ms após welcomeReveal
              }
        }
      >
        {caption}
      </motion.div>
    </div>
  );
}

// ─── AnimatedOverviewCard ─────────────────────────────────────────────────────
// Anima o card "Visão geral do dojô" com fade + scale sutil.
// delay de 300ms: respeita sequência hero → card.

interface AnimatedOverviewCardProps {
  children: React.ReactNode;
}

export function AnimatedOverviewCard({ children }: AnimatedOverviewCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={reduced ? fadeOnly : overviewCardReveal}
      initial="hidden"
      animate="visible"
      transition={
        reduced
          ? undefined
          : { delay: 0.3 } // 300ms após hero
      }
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedMetricList ───────────────────────────────────────────────────────
// Container stagger para as linhas de métrica.
// Cada filho recebe delay acumulado de 60ms (0 / 60 / 120 / 180ms).
// Combinar com <AnimatedMetricItem> em cada <div role="listitem">.

interface AnimatedMetricListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AnimatedMetricList({
  children,
  className,
  ...rest
}: AnimatedMetricListProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : staggerContainer}
      initial="hidden"
      animate="visible"
      transition={
        reduced
          ? undefined
          : { delayChildren: 0.45 } // começa após overview card aparecer
      }
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedMetricItem ────────────────────────────────────────────────────────
// Cada linha de métrica individual — slide da esquerda (x: -8px → 0) + fade.
// É filho direto do AnimatedMetricList para receber o stagger do pai.

interface AnimatedMetricItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AnimatedMetricItem({
  children,
  className,
  ...rest
}: AnimatedMetricItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduced ? fadeOnly : metricRowEnter}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedModuleGrid ────────────────────────────────────────────────────────
// Container stagger para o grid de cards de módulo (Alunos, Turmas, Financeiro).
// stagger de 80ms entre filhos, delay de 700ms pra aparecer depois das métricas.

interface AnimatedModuleGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AnimatedModuleGrid({
  children,
  className,
  ...rest
}: AnimatedModuleGridProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : staggerContainerSlow}
      initial="hidden"
      animate="visible"
      transition={
        reduced
          ? undefined
          : { delayChildren: 0.7 } // após métricas terminarem stagger
      }
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedCard ─────────────────────────────────────────────────────────────
// Cada card de módulo — fade + scale 0.96 → 1.0.
// É filho direto do AnimatedModuleGrid para receber o stagger do pai.

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AnimatedCard({ children, className, ...rest }: AnimatedCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduced ? fadeOnly : cardEnter}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedFooter ────────────────────────────────────────────────────────────
// Rodapé kanji + slogan — reveal contemplativo, fade puro.
// delay de 800ms pós-stagger (o último elemento a aparecer, como especificado).
// duration-epic (700ms) — referência lupinelights.com.

interface AnimatedFooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function AnimatedFooter({ children, className, ...rest }: AnimatedFooterProps) {
  const reduced = useReducedMotion();

  return (
    <motion.footer
      className={className}
      variants={reduced ? fadeOnly : footerReveal}
      initial="hidden"
      animate="visible"
      transition={
        reduced
          ? undefined
          : { delay: 0.8 } // o último elemento — delay 800ms
      }
      {...rest}
    >
      {children}
    </motion.footer>
  );
}

// ─── AnimatedPresenceSwap ─────────────────────────────────────────────────────
// Wrapper genérico para troca entre dois estados com AnimatePresence.
// Usado implicitamente na lógica do login (form ↔ SentCard).
// Exportado pra reuso futuro em outros fluxos de troca de estado.

interface AnimatedPresenceSwapProps {
  motionKey: string;
  children: React.ReactNode;
}

export function AnimatedPresenceSwap({
  motionKey,
  children,
}: AnimatedPresenceSwapProps) {
  // FIX design-reviewer audit 2026-05-25: useReducedMotion estava ausente.
  // Quando reduced=true, mantemos só opacity (sem scale) pra evitar desorientação.
  const reduced = useReducedMotion();
  const initial = reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 };
  const animate = reduced ? { opacity: 1 } : { opacity: 1, scale: 1 };
  const exit = reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={motionKey}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{
          duration: DURATION_SLOW,
          ease: EASE_STANDARD,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
