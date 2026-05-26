import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@dojo-fs/supabase/server";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
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
 * Card de seção futura (Sprint 1c+).
 * Estado "promessa elegante" — disabled mas visualmente intencionado,
 * não parece broken. Hover sutil de 150ms (duration-fast do sistema).
 */
function SectionCard({
  icon,
  title,
  sprint,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  sprint: string;
  description: string;
}) {
  return (
    <div
      className={[
        "group relative flex flex-col gap-4 rounded-lg border border-dojo-gray/20",
        "bg-dojo-gray/5 p-6 transition-all duration-150",
        "cursor-not-allowed",
        "hover:border-dojo-red/20 hover:bg-dojo-gray/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red",
      ].join(" ")}
      aria-label={`${title} — disponível em ${sprint}`}
      tabIndex={0}
      role="article"
    >
      {/* Badge "Em breve" — canto superior direito */}
      <span
        className="absolute right-4 top-4 rounded-sm bg-dojo-gray/30 px-2 py-0.5 text-xs uppercase tracking-widest text-dojo-white/40"
        aria-hidden="true"
      >
        Em breve
      </span>

      {/* Ícone */}
      <span
        className="flex h-11 w-11 items-center justify-center rounded-sm bg-dojo-gray/20 text-dojo-white/30 transition-colors duration-150 group-hover:text-dojo-white/50"
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Conteúdo */}
      <div className="space-y-1">
        <h3 className="font-display text-base font-bold uppercase tracking-wider text-dojo-white/70">
          {title}
        </h3>
        <p className="text-xs text-dojo-white/30">{description}</p>
        <p className="text-xs uppercase tracking-widest text-dojo-red/50">
          {sprint}
        </p>
      </div>
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
    .select("full_name, role")
    .eq("owner_user_id", user.id)
    .maybeSingle<ProfileBrief>();

  const displayName = profile?.full_name ?? user.email ?? "Sensei";
  const role = profile?.role ?? "sem perfil";
  const roleLabel = ROLE_LABEL[role] ?? role;

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
                      value="0"
                    />
                  </AnimatedMetricItem>
                  <AnimatedMetricItem role="listitem">
                    <MetricRow
                      icon={<Calendar size={18} aria-hidden="true" />}
                      label="Turmas configuradas"
                      value="0"
                    />
                  </AnimatedMetricItem>
                  <AnimatedMetricItem role="listitem">
                    <MetricRow
                      icon={<TrendingUp size={18} aria-hidden="true" />}
                      label="Graduações próximas"
                      value="0"
                    />
                  </AnimatedMetricItem>
                  <AnimatedMetricItem role="listitem">
                    <MetricRow
                      icon={<DollarSign size={18} aria-hidden="true" />}
                      label="Mensalidades a receber"
                      value="R$ 0"
                    />
                  </AnimatedMetricItem>
                </AnimatedMetricList>

                {/*
                  Microcopy de estado vazio — não parece broken, parece à espera.
                  Separado das métricas por padding generoso (rig.ai: espaço pra respirar).
                */}
                <p className="mt-6 text-xs uppercase tracking-widest text-dojo-white/20">
                  Estado inicial — módulos serão configurados na Sprint 1c
                </p>
              </CardContent>
            </Card>
          </AnimatedOverviewCard>
        </section>

        {/* ── 3. Grid de seções futuras ────────────────────────────────────── */}
        {/*
          AnimatedModuleGrid: stagger container — 80ms entre cards.
          AnimatedCard: fade + scale 0.96→1.0 em duration-slow ease-emphasized.
          delayChildren 700ms — cards aparecem depois que métricas terminaram.
        */}
        <section aria-labelledby="modulos-heading">
          <div className="mb-6 space-y-1">
            <h2
              id="modulos-heading"
              className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white/40"
            >
              Módulos
            </h2>
            <p className="text-xs text-dojo-white/20">
              Funcionalidades em desenvolvimento — chegam nas próximas sprints.
            </p>
          </div>

          {/*
            Mobile-first: 1 coluna → 2 colunas (sm) → 3 colunas (lg).
            DESIGN.md §7 e briefing §4 explícitos.
          */}
          <AnimatedModuleGrid
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Módulos disponíveis em breve"
          >
            <AnimatedCard role="listitem">
              <SectionCard
                icon={<Users size={22} aria-hidden="true" />}
                title="Alunos"
                sprint="Sprint 1c"
                description="Cadastro, faixas e histórico de cada aluno do dojô."
              />
            </AnimatedCard>
            <AnimatedCard role="listitem">
              <SectionCard
                icon={<Calendar size={22} aria-hidden="true" />}
                title="Turmas"
                sprint="Sprint 1c"
                description="Horários, modalidades e listas de presença."
              />
            </AnimatedCard>
            <AnimatedCard role="listitem">
              <SectionCard
                icon={<DollarSign size={22} aria-hidden="true" />}
                title="Financeiro"
                sprint="Sprint 3"
                description="Mensalidades, inadimplência e relatórios de caixa."
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
