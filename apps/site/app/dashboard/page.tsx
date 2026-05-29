import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@dojo-fs/supabase/server";
import { Users, Calendar, DollarSign, Clock3 } from "lucide-react";
import {
  ORG_NAME,
  KANJI,
  SLOGAN,
  SENSEI,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@dojo-fs/ui";
import {
  diaSemanaHojeBR,
  dataHojeBR,
  DIAS_SHORT_PT,
} from "../../lib/dia-semana";
import {
  AnimatedWelcome,
  AnimatedOverviewCard,
  AnimatedMetricList,
  AnimatedMetricItem,
  AnimatedModuleGrid,
  AnimatedCard,
  AnimatedFooter,
} from "./components/DashboardSections";

// ─── Role labels ────────────────────────────────────────────────────────────

const ROLE_LABEL: Record<string, string> = {
  admin: "Administrador",
  professor: "Professor",
  aluno: "Aluno",
  responsavel: "Responsável",
};

// ─── Tipos locais ────────────────────────────────────────────────────────────

type ProfileBrief = {
  full_name: string | null;
  role: "admin" | "professor" | "aluno" | "responsavel";
};

// ─── Sub-componentes estáticos (Server Component safe) ───────────────────────

/**
 * Linha separadora horizontal sutil — usa dojo-gray com baixa opacidade.
 * Intencionalmente sem cor forte: deixa o vermelho respirar.
 */
function Divider() {
  return (
    <hr
      className="w-full border-t border-dojo-gray/30"
      aria-hidden="true"
    />
  );
}

/**
 * Bloco de métrica individual dentro do card "Visão geral".
 * Alinha ícone + label + valor com separador esquerdo em dojo-red.
 */
function MetricRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3">
      {/* Barra lateral em dojo-red — parcimônia de cor, máximo impacto */}
      <span
        className="h-full w-0.5 self-stretch rounded-full bg-dojo-red/60"
        aria-hidden="true"
      />
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-dojo-gray/20 text-dojo-white/50"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-widest text-dojo-white/40">
          {label}
        </p>
        <p className="font-display text-xl font-bold tracking-wider text-dojo-white">
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * Card de seção. Sprint 1b: 3 cards funcionais (Alunos, Turmas, Presença) +
 * 1 placeholder (Financeiro Sprint 3).
 */
function SectionCard({
  icon,
  title,
  description,
  href,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  badge?: string;
}) {
  const baseClasses = [
    "group relative flex flex-col gap-4 rounded-lg border p-6 transition-all duration-150",
    href
      ? "border-dojo-gray/20 bg-dojo-gray/5 hover:border-dojo-red/40 hover:bg-dojo-gray/10 cursor-pointer"
      : "border-dojo-gray/20 bg-dojo-gray/5 cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red",
  ].join(" ");

  const inner = (
    <>
      {badge && (
        <span
          className="absolute right-4 top-4 rounded-sm bg-dojo-gray/30 px-2 py-0.5 text-xs uppercase tracking-widest text-dojo-white/40"
          aria-hidden="true"
        >
          {badge}
        </span>
      )}

      <span
        className={`flex h-11 w-11 items-center justify-center rounded-sm bg-dojo-gray/20 transition-colors duration-150 ${
          href
            ? "text-dojo-white/60 group-hover:text-dojo-red"
            : "text-dojo-white/30 group-hover:text-dojo-white/50"
        }`}
        aria-hidden="true"
      >
        {icon}
      </span>

      <div className="space-y-1">
        <h3 className="font-display text-base font-bold uppercase tracking-wider text-dojo-white">
          {title}
        </h3>
        <p className="text-xs text-dojo-white/40">{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} aria-label={title}>
        {inner}
      </Link>
    );
  }
  return (
    <div
      className={baseClasses}
      aria-label={`${title}${badge ? ` — ${badge}` : ""}`}
      tabIndex={0}
      role="article"
    >
      {inner}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

/**
 * Dashboard logado (Server Component) — Sprint 1b.
 *
 * Re-busca user + profile (layout já fez, mas Next.js cache dedupe a query).
 * Design: mood utilitário (OnMat) + refinamento (Lupine Lights) + identidade dojô.
 *
 * Animações via Client Component wrappers em ./components/DashboardSections.tsx.
 * O Server Component continua server-rendered (dados, auth, redirect) —
 * os wrappers Client adicionam apenas o layer de motion sem custo de SSR.
 *
 * Sprint 1c expande cards de seção com links reais.
 * Sprint 3 conecta métricas ao banco.
 */
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, dojo_id")
    .eq("owner_user_id", user.id)
    .maybeSingle<ProfileBrief & { dojo_id: string | null }>();

  // Sem profile completo → manda pro onboarding (Sprint 1b: criar perfil + completar dojô)
  if (!profile?.dojo_id) {
    redirect("/dashboard/onboarding");
  }

  const displayName = profile?.full_name ?? user.email ?? "Sensei";
  const role = profile?.role ?? "sem perfil";
  const roleLabel = ROLE_LABEL[role] ?? role;

  // ── Métricas reais Sprint 1b ──────────────────────────────────────────────
  const diaHoje = diaSemanaHojeBR();
  const dataHoje = dataHojeBR();

  const [
    { count: alunosAtivos },
    { count: turmasAtivas },
    { data: turmasComHorario },
  ] = await Promise.all([
    supabase
      .from("alunos")
      .select("id", { count: "exact", head: true })
      .eq("status", "ativo"),
    supabase
      .from("turmas")
      .select("id", { count: "exact", head: true })
      .eq("status", "ativa"),
    supabase
      .from("turmas")
      .select("id, nome, cor, horario_recorrente")
      .eq("status", "ativa")
      .returns<
        Array<{
          id: string;
          nome: string;
          cor: string;
          horario_recorrente: Array<{
            dia: string;
            inicio: string;
            fim: string;
          }>;
        }>
      >(),
  ]);

  // Próximas aulas hoje: filtra slots de hoje, ordena por horario_inicio
  const aulasHoje = (turmasComHorario ?? [])
    .flatMap((t) =>
      (Array.isArray(t.horario_recorrente) ? t.horario_recorrente : [])
        .filter((s) => s.dia === diaHoje)
        .map((s) => ({
          turma_id: t.id,
          nome: t.nome,
          cor: t.cor,
          inicio: s.inicio,
          fim: s.fim,
        })),
    )
    .sort((a, b) => a.inicio.localeCompare(b.inicio));

  return (
    <main
      className="min-h-[calc(100vh-57px)] bg-dojo-black px-6 pb-24 pt-12 sm:px-8 lg:px-12"
      aria-label="Painel principal"
    >
      <div className="mx-auto max-w-6xl space-y-12 sm:space-y-16">

        {/* ── 1. Welcome hero ─────────────────────────────────────────────── */}
        {/*
          AnimatedWelcome: h1 fade + slide-up 6px em 400ms ease-emphasized.
          caption "Administrador" fade-in com delay de 200ms.
          Client Component — recebe os nós como children, mantém SSR do conteúdo.
        */}
        <section aria-labelledby="welcome-heading">
          <AnimatedWelcome
            heading={
              <h1
                id="welcome-heading"
                className="font-display text-4xl font-bold text-dojo-white sm:text-5xl"
              >
                Bem-vindo,{" "}
                <span className="text-dojo-red">{displayName}</span>
              </h1>
            }
            caption={
              <p className="text-xs uppercase tracking-widest text-dojo-white/40">
                {roleLabel}
              </p>
            }
          />
        </section>

        <Divider />

        {/* ── 2. Card "Visão geral do dojô" ───────────────────────────────── */}
        {/*
          AnimatedOverviewCard: fade + scale 0.98→1, delay 300ms após hero.
          AnimatedMetricList: stagger container — 60ms entre cada linha.
          AnimatedMetricItem: filho do stagger, slide x:-8px→0 + fade.
          delayChildren 450ms no container (métricas depois do card aparecer).
        */}
        <section aria-labelledby="visao-geral-heading">
          <AnimatedOverviewCard>
            <Card className="rounded-lg border border-dojo-gray/20 bg-dojo-gray/5">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-widest text-dojo-white/40">
                      {ORG_NAME}
                    </p>
                    <CardTitle
                      id="visao-geral-heading"
                      className="font-display text-lg font-bold uppercase tracking-widest text-dojo-white"
                    >
                      Visão geral do dojô
                    </CardTitle>
                  </div>

                  {/*
                    Logo redondo — presente em pelo menos 1 seção conforme
                    checklist DESIGN.md §8 ("identidade do pai presente").
                    Usa <Image> do Next.js — regra inviolável §8.
                  */}
                  <Image
                    src="/logo-redondo-branco.png"
                    alt={`Emblema ${ORG_NAME}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full opacity-20"
                    priority={false}
                  />
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                {/* Linhas de métrica com stagger */}
                <AnimatedMetricList
                  className="divide-y divide-dojo-gray/10"
                  role="list"
                  aria-label="Métricas do dojô"
                >
                  <AnimatedMetricItem role="listitem">
                    <MetricRow
                      icon={<Users size={18} aria-hidden="true" />}
                      label="Alunos ativos"
                      value={(alunosAtivos ?? 0).toString()}
                    />
                  </AnimatedMetricItem>
                  <AnimatedMetricItem role="listitem">
                    <MetricRow
                      icon={<Calendar size={18} aria-hidden="true" />}
                      label="Turmas configuradas"
                      value={(turmasAtivas ?? 0).toString()}
                    />
                  </AnimatedMetricItem>
                  <AnimatedMetricItem role="listitem">
                    <MetricRow
                      icon={<Clock3 size={18} aria-hidden="true" />}
                      label={`Aulas hoje (${DIAS_SHORT_PT[diaHoje]})`}
                      value={aulasHoje.length.toString()}
                    />
                  </AnimatedMetricItem>
                  <AnimatedMetricItem role="listitem">
                    <MetricRow
                      icon={<DollarSign size={18} aria-hidden="true" />}
                      label="Mensalidades a receber"
                      value="—"
                    />
                  </AnimatedMetricItem>
                </AnimatedMetricList>

                {(alunosAtivos ?? 0) === 0 && (turmasAtivas ?? 0) === 0 && (
                  <p className="mt-6 text-xs uppercase tracking-widest text-dojo-white/20">
                    Estado inicial — comece cadastrando alunos e criando turmas
                  </p>
                )}
              </CardContent>
            </Card>
          </AnimatedOverviewCard>
        </section>

        {/* ── 2.5. Timeline aulas de hoje ──────────────────────────────────── */}
        {aulasHoje.length > 0 && (
          <section aria-labelledby="aulas-hoje-heading" className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2
                  id="aulas-hoje-heading"
                  className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white/40"
                >
                  Aulas hoje
                </h2>
                <p className="text-xs text-dojo-white/30">
                  {DIAS_SHORT_PT[diaHoje]} ·{" "}
                  {new Date(dataHoje).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    timeZone: "UTC",
                  })}
                </p>
              </div>
              <Link
                href="/dashboard/presenca/hoje"
                className="text-xs uppercase tracking-widest text-dojo-red hover:underline"
              >
                Ver presença →
              </Link>
            </div>

            <ul className="space-y-2" role="list">
              {aulasHoje.slice(0, 5).map((a, idx) => (
                <li
                  key={`${a.turma_id}-${idx}`}
                  className="flex items-center gap-3 rounded-md border border-dojo-gray/20 bg-dojo-gray/5 px-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: a.cor }}
                  />
                  <span className="font-display text-xs uppercase tracking-widest text-dojo-white/50">
                    {a.inicio.slice(0, 5)}–{a.fim.slice(0, 5)}
                  </span>
                  <span className="flex-1 truncate text-sm text-dojo-white">
                    {a.nome}
                  </span>
                </li>
              ))}
              {aulasHoje.length > 5 && (
                <li className="px-4 text-xs text-dojo-white/30">
                  +{aulasHoje.length - 5} aulas
                </li>
              )}
            </ul>
          </section>
        )}

        {/* ── 3. Módulos operacionais Sprint 1b ────────────────────────────── */}
        <section aria-labelledby="modulos-heading">
          <div className="mb-6 space-y-1">
            <h2
              id="modulos-heading"
              className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white/40"
            >
              Módulos
            </h2>
            <p className="text-xs text-dojo-white/30">
              Acesse os módulos operacionais do dojô.
            </p>
          </div>

          {/*
            Mobile-first: 1 coluna → 2 colunas (sm) → 4 colunas (lg).
            3 módulos funcionais Sprint 1b + 1 placeholder Sprint 3 (Financeiro).
          */}
          <AnimatedModuleGrid
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
            aria-label="Módulos do dojô"
          >
            <AnimatedCard role="listitem">
              <SectionCard
                icon={<Users size={22} aria-hidden="true" />}
                title="Alunos"
                description={
                  (alunosAtivos ?? 0) === 0
                    ? "Cadastre o primeiro aluno do dojô."
                    : `${alunosAtivos} aluno${alunosAtivos === 1 ? "" : "s"} ativo${alunosAtivos === 1 ? "" : "s"}`
                }
                href="/dashboard/alunos"
              />
            </AnimatedCard>
            <AnimatedCard role="listitem">
              <SectionCard
                icon={<Calendar size={22} aria-hidden="true" />}
                title="Turmas"
                description={
                  (turmasAtivas ?? 0) === 0
                    ? "Crie a primeira turma e seu horário."
                    : `${turmasAtivas} turma${turmasAtivas === 1 ? "" : "s"} ativa${turmasAtivas === 1 ? "" : "s"}`
                }
                href="/dashboard/turmas"
              />
            </AnimatedCard>
            <AnimatedCard role="listitem">
              <SectionCard
                icon={<Clock3 size={22} aria-hidden="true" />}
                title="Presença"
                description={
                  aulasHoje.length === 0
                    ? "Nenhuma aula hoje."
                    : `${aulasHoje.length} aula${aulasHoje.length === 1 ? "" : "s"} hoje`
                }
                href="/dashboard/presenca/hoje"
              />
            </AnimatedCard>
            <AnimatedCard role="listitem">
              <SectionCard
                icon={<DollarSign size={22} aria-hidden="true" />}
                title="Financeiro"
                description="Mensalidades, inadimplência e relatórios."
                badge="Sprint 3"
              />
            </AnimatedCard>
          </AnimatedModuleGrid>
        </section>

        <Divider />

        {/* ── 4. Rodapé refinado — identidade e filosofia ──────────────────── */}
        {/*
          AnimatedFooter: fade puro duration-epic (700ms), delay 800ms.
          O último elemento a aparecer — contemplativo, como Lupine Lights.
          Sem movimento (x/y): o rodapé já está no lugar certo,
          só "emerge" da escuridão do fundo dojo-black.
        */}
        <AnimatedFooter
          className="flex flex-col items-center gap-3 text-center"
          role="contentinfo"
          aria-label="Identidade do dojô"
        >
          <p
            className="font-display text-lg tracking-[0.25em] text-dojo-white/20"
            aria-label={`Modalidades: Judô e Jiu-Jitsu`}
          >
            {KANJI.judo}
            <span className="mx-3 text-dojo-red/40" aria-hidden="true">
              •
            </span>
            {KANJI.jiujitsu}
          </p>

          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-dojo-red/60">
            {SLOGAN}
          </p>

          <p className="text-xs uppercase tracking-widest text-dojo-white/15">
            Sensei {SENSEI}
          </p>
        </AnimatedFooter>

      </div>
    </main>
  );
}
