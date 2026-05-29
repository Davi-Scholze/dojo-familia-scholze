import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@dojo-fs/supabase/server";
import type { TablesInsert } from "@dojo-fs/supabase/types";
import { Calendar } from "lucide-react";
import {
  diaSemanaHojeBR,
  dataHojeBR,
  DIAS_SHORT_PT,
} from "../../../../lib/dia-semana";
import { AulaCard } from "./aula-card";

type Turma = {
  id: string;
  dojo_id: string;
  nome: string;
  modalidade: string;
  cor: string;
  horario_recorrente: Array<{ dia: string; inicio: string; fim: string }>;
};

type Aula = {
  id: string;
  turma_id: string;
  horario_inicio: string;
  horario_fim: string;
  foco_do_dia: string | null;
  fechada_em: string | null;
};

type AlunoTurmaRow = {
  aluno_id: string;
  turma_id: string;
  alunos: {
    id: string;
    nome_completo: string;
    apelido: string | null;
    faixa_atual: string;
    graus: number;
  };
};

type PresencaRow = {
  id: string;
  aula_id: string;
  aluno_id: string;
  rsvp_status: string | null;
  rsvp_mensagem: string | null;
  presenca_status: string | null;
};

/**
 * /dashboard/presenca/hoje
 *
 * Pipeline:
 *   1. Computa hoje (BR timezone)
 *   2. SELECT turmas ativas + filtra em JS slots cujo dia = hoje
 *   3. UPSERT aulas pra cada (turma+slot) — UNIQUE constraint garante idempotência
 *   4. SELECT aulas hoje + alunos matriculados + presencas existentes
 *   5. Renderiza timeline de cards (AulaCard) com toggles por aluno
 */
export default async function PresencaHojePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient({
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) =>
      toSet.forEach((c) => cookieStore.set(c.name, c.value, c.options)),
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("dojo_id, role")
    .eq("owner_user_id", user.id)
    .maybeSingle<{ dojo_id: string | null; role: string }>();

  if (!profile?.dojo_id) redirect("/dashboard/onboarding");

  const dataHoje = dataHojeBR();
  const diaHoje = diaSemanaHojeBR();

  // 1. Turmas ativas
  const { data: turmas } = await supabase
    .from("turmas")
    .select("id, dojo_id, nome, modalidade, cor, horario_recorrente")
    .eq("status", "ativa")
    .returns<Turma[]>();

  // 2. Filtra slots de hoje
  const slotsHoje = (turmas ?? []).flatMap((t) =>
    (Array.isArray(t.horario_recorrente) ? t.horario_recorrente : [])
      .filter((s) => s.dia === diaHoje)
      .map((s) => ({ turma: t, slot: s })),
  );

  // 3. Upsert aulas — uma por (turma, data, slot)
  if (slotsHoje.length > 0) {
    const aulasUpsert: TablesInsert<"aulas">[] = slotsHoje.map(
      ({ turma, slot }) => ({
        dojo_id: turma.dojo_id,
        turma_id: turma.id,
        data: dataHoje,
        horario_inicio: normalizeTime(slot.inicio),
        horario_fim: normalizeTime(slot.fim),
      }),
    );

    await (supabase.from("aulas") as any).upsert(aulasUpsert, {
      onConflict: "turma_id,data,horario_inicio",
      ignoreDuplicates: true,
    });
  }

  // 4. Re-fetch aulas hoje
  const turmaIdsHoje = Array.from(
    new Set(slotsHoje.map(({ turma }) => turma.id)),
  );

  const aulas =
    turmaIdsHoje.length > 0
      ? (
          await supabase
            .from("aulas")
            .select(
              "id, turma_id, horario_inicio, horario_fim, foco_do_dia, fechada_em",
            )
            .in("turma_id", turmaIdsHoje)
            .eq("data", dataHoje)
            .order("horario_inicio")
            .returns<Aula[]>()
        ).data ?? []
      : [];

  // 5. Matrículas ativas em cada turma + presencas atuais
  const alunoTurmaRows =
    turmaIdsHoje.length > 0
      ? (
          await supabase
            .from("aluno_turma")
            .select(
              "aluno_id, turma_id, alunos(id, nome_completo, apelido, faixa_atual, graus)",
            )
            .eq("status", "ativo")
            .in("turma_id", turmaIdsHoje)
            .returns<AlunoTurmaRow[]>()
        ).data ?? []
      : [];

  const aulaIds = aulas.map((a) => a.id);
  const presencas =
    aulaIds.length > 0
      ? (
          await supabase
            .from("presencas")
            .select(
              "id, aula_id, aluno_id, rsvp_status, rsvp_mensagem, presenca_status",
            )
            .in("aula_id", aulaIds)
            .returns<PresencaRow[]>()
        ).data ?? []
      : [];

  const turmaById = new Map((turmas ?? []).map((t) => [t.id, t]));

  return (
    <main
      className="min-h-[calc(100vh-57px)] bg-dojo-black px-6 pb-24 pt-12 sm:px-8 lg:px-12"
      aria-label="Presença de hoje"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-2">
          <Link
            href="/dashboard"
            className="text-xs uppercase tracking-widest text-dojo-white/40 hover:text-dojo-white/60"
          >
            ← Dashboard
          </Link>
          <h1 className="font-display text-3xl font-bold text-dojo-white sm:text-4xl">
            Presença — <span className="text-dojo-red">hoje</span>
          </h1>
          <p className="text-sm text-dojo-white/60">
            {DIAS_SHORT_PT[diaHoje]} ·{" "}
            {new Date(dataHoje).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </p>
        </header>

        {aulas.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="space-y-6" aria-label="Aulas de hoje">
            {aulas.map((aula) => {
              const turma = turmaById.get(aula.turma_id);
              if (!turma) return null;
              const matriculados = alunoTurmaRows
                .filter((r) => r.turma_id === aula.turma_id)
                .map((r) => r.alunos);
              const presencasAula = presencas.filter(
                (p) => p.aula_id === aula.id,
              );
              return (
                <AulaCard
                  key={aula.id}
                  aula={aula}
                  turma={turma}
                  alunos={matriculados}
                  presencas={presencasAula}
                />
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-dojo-gray/30 bg-dojo-gray/5 p-12 text-center">
      <Calendar size={32} className="text-dojo-white/30" aria-hidden="true" />
      <p className="font-display text-base text-dojo-white">
        Sem aulas hoje.
      </p>
      <p className="text-sm text-dojo-white/40">
        Nenhuma turma ativa tem horário configurado pra hoje. Configure horários
        recorrentes em{" "}
        <Link href="/dashboard/turmas" className="text-dojo-red hover:underline">
          Turmas
        </Link>
        .
      </p>
    </div>
  );
}

function normalizeTime(t: string): string {
  // Garante HH:MM:SS (Postgres time type aceita ambos mas normalizar evita drift)
  return t.length === 5 ? `${t}:00` : t;
}
