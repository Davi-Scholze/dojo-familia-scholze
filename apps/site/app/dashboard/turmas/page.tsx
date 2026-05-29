import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@dojo-fs/supabase/server";
import { Plus, Calendar } from "lucide-react";

type TurmaBrief = {
  id: string;
  nome: string;
  modalidade: string;
  faixa_etaria: string;
  nivel: string;
  horario_recorrente: Array<{ dia: string; inicio: string; fim: string }>;
  capacidade_max: number | null;
  cor: string;
  status: string;
};

const MODALIDADE_LABEL: Record<string, string> = {
  judo: "Judô",
  "jiu-jitsu": "Jiu-Jitsu",
  ambos: "Ambos",
};

const FAIXA_ETARIA_LABEL: Record<string, string> = {
  infantil: "Infantil",
  adolescente: "Adolescente",
  adulto: "Adulto",
  livre: "Livre",
};

const DIA_LABEL: Record<string, string> = {
  seg: "Seg",
  ter: "Ter",
  qua: "Qua",
  qui: "Qui",
  sex: "Sex",
  sab: "Sáb",
  dom: "Dom",
};

export default async function TurmasPage() {
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

  const { data: turmas } = await supabase
    .from("turmas")
    .select(
      "id, nome, modalidade, faixa_etaria, nivel, horario_recorrente, capacidade_max, cor, status",
    )
    .order("nome", { ascending: true })
    .returns<TurmaBrief[]>();

  const ativas = (turmas ?? []).filter((t) => t.status === "ativa");
  const outras = (turmas ?? []).filter((t) => t.status !== "ativa");

  return (
    <main
      className="min-h-[calc(100vh-57px)] bg-dojo-black px-6 pb-24 pt-12 sm:px-8 lg:px-12"
      aria-label="Turmas"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4 sm:flex sm:items-end sm:justify-between sm:space-y-0">
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="text-xs uppercase tracking-widest text-dojo-white/40 hover:text-dojo-white/60"
            >
              ← Dashboard
            </Link>
            <h1 className="font-display text-3xl font-bold text-dojo-white sm:text-4xl">
              <span className="text-dojo-red">Turmas</span>
            </h1>
            <p className="text-sm text-dojo-white/60">
              {ativas.length} {ativas.length === 1 ? "turma ativa" : "turmas ativas"}
              {outras.length > 0
                ? ` · ${outras.length} pausada${outras.length === 1 ? "" : "s"}`
                : ""}
            </p>
          </div>

          <Link
            href="/dashboard/turmas/nova"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-dojo-red px-4 py-2 text-sm font-medium text-dojo-white transition-colors hover:bg-dojo-red/90"
          >
            <Plus size={16} aria-hidden="true" /> Nova turma
          </Link>
        </header>

        {ativas.length === 0 && outras.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="space-y-4">
            {ativas.length > 0 && (
              <>
                <h2 className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white/40">
                  Ativas
                </h2>
                <ul className="space-y-3" role="list">
                  {ativas.map((t) => (
                    <TurmaCard key={t.id} turma={t} />
                  ))}
                </ul>
              </>
            )}

            {outras.length > 0 && (
              <>
                <h2 className="mt-8 font-display text-sm font-bold uppercase tracking-widest text-dojo-white/40">
                  Pausadas / encerradas
                </h2>
                <ul className="space-y-3 opacity-60" role="list">
                  {outras.map((t) => (
                    <TurmaCard key={t.id} turma={t} />
                  ))}
                </ul>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function TurmaCard({ turma }: { turma: TurmaBrief }) {
  const slots = Array.isArray(turma.horario_recorrente)
    ? turma.horario_recorrente
    : [];
  const diasUnicos = Array.from(new Set(slots.map((s) => s.dia))).sort(
    (a, b) => orderDia(a) - orderDia(b),
  );
  const primeiroSlot = slots[0];

  return (
    <li
      role="listitem"
      className="rounded-lg border border-dojo-gray/20 bg-dojo-gray/5 p-4 transition-colors hover:border-dojo-red/30"
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="mt-1 h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: turma.cor }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-base font-bold text-dojo-white">
                {turma.nome}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-dojo-white/40">
                {MODALIDADE_LABEL[turma.modalidade] ?? turma.modalidade}
                {turma.faixa_etaria !== "livre" &&
                  ` · ${FAIXA_ETARIA_LABEL[turma.faixa_etaria] ?? turma.faixa_etaria}`}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-dojo-white/60">
              {diasUnicos.length > 0 && primeiroSlot && (
                <span className="rounded-sm bg-dojo-gray/20 px-2 py-1 uppercase tracking-widest">
                  {diasUnicos.map((d) => DIA_LABEL[d] ?? d).join(" · ")}
                  <span className="mx-2 text-dojo-white/30">|</span>
                  {primeiroSlot.inicio.slice(0, 5)}–{primeiroSlot.fim.slice(0, 5)}
                </span>
              )}
              {turma.capacidade_max && (
                <span className="rounded-sm bg-dojo-gray/20 px-2 py-1 uppercase tracking-widest">
                  Cap. {turma.capacidade_max}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function orderDia(dia: string): number {
  const ord: Record<string, number> = {
    seg: 1,
    ter: 2,
    qua: 3,
    qui: 4,
    sex: 5,
    sab: 6,
    dom: 7,
  };
  return ord[dia] ?? 99;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-dojo-gray/30 bg-dojo-gray/5 p-12 text-center">
      <Calendar size={32} className="text-dojo-white/30" aria-hidden="true" />
      <p className="font-display text-base text-dojo-white">
        Nenhuma turma criada ainda.
      </p>
      <p className="text-sm text-dojo-white/40">
        Crie sua primeira turma para começar a organizar as aulas.
      </p>
      <Link
        href="/dashboard/turmas/nova"
        className="mt-2 inline-flex items-center gap-2 rounded-md bg-dojo-red px-4 py-2 text-sm font-medium text-dojo-white hover:bg-dojo-red/90"
      >
        <Plus size={16} aria-hidden="true" /> Criar primeira turma
      </Link>
    </div>
  );
}
