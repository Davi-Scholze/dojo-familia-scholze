import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@dojo-fs/supabase/server";
import { Plus, Users } from "lucide-react";
import { formatDateBR, diffYears } from "@dojo-fs/lib";

type AlunoBrief = {
  id: string;
  nome_completo: string;
  apelido: string | null;
  data_nascimento: string;
  modalidade_principal: string;
  faixa_atual: string;
  graus: number;
  status: string;
  data_matricula: string;
};

const STATUS_LABEL: Record<string, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
  trancado: "Trancado",
};

const MODALIDADE_LABEL: Record<string, string> = {
  judo: "Judô",
  "jiu-jitsu": "Jiu-Jitsu",
  ambos: "Ambas",
};

/**
 * /dashboard/alunos — lista de alunos do dojo do professor logado.
 * Mobile-first: cards stack 1 coluna; aciona /alunos/novo para cadastrar.
 * Ordem default: status ativo primeiro, depois nome A→Z.
 */
export default async function AlunosPage() {
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

  const { data: alunos } = await supabase
    .from("alunos")
    .select(
      "id, nome_completo, apelido, data_nascimento, modalidade_principal, faixa_atual, graus, status, data_matricula",
    )
    .order("nome_completo", { ascending: true })
    .returns<AlunoBrief[]>();

  const ativos = (alunos ?? []).filter((a) => a.status === "ativo");
  const arquivados = (alunos ?? []).filter((a) => a.status !== "ativo");

  return (
    <main
      className="min-h-[calc(100vh-57px)] bg-dojo-black px-6 pb-24 pt-12 sm:px-8 lg:px-12"
      aria-label="Alunos"
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <header className="space-y-4 sm:flex sm:items-end sm:justify-between sm:space-y-0">
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="text-xs uppercase tracking-widest text-dojo-white/40 hover:text-dojo-white/60"
            >
              ← Dashboard
            </Link>
            <h1 className="font-display text-3xl font-bold text-dojo-white sm:text-4xl">
              <span className="text-dojo-red">Alunos</span>
            </h1>
            <p className="text-sm text-dojo-white/60">
              {ativos.length} {ativos.length === 1 ? "aluno ativo" : "alunos ativos"}
              {arquivados.length > 0
                ? ` · ${arquivados.length} arquivado${arquivados.length === 1 ? "" : "s"}`
                : ""}
            </p>
          </div>

          <Link
            href="/dashboard/alunos/novo"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-dojo-red px-4 py-2 text-sm font-medium text-dojo-white transition-colors hover:bg-dojo-red/90"
          >
            <Plus size={16} aria-hidden="true" /> Novo aluno
          </Link>
        </header>

        {/* Lista */}
        {ativos.length === 0 && arquivados.length === 0 ? (
          <EmptyState />
        ) : (
          <section aria-labelledby="alunos-ativos-heading" className="space-y-4">
            {ativos.length > 0 && (
              <>
                <h2
                  id="alunos-ativos-heading"
                  className="font-display text-sm font-bold uppercase tracking-widest text-dojo-white/40"
                >
                  Ativos
                </h2>
                <ul className="space-y-3" role="list">
                  {ativos.map((a) => (
                    <AlunoCard key={a.id} aluno={a} />
                  ))}
                </ul>
              </>
            )}

            {arquivados.length > 0 && (
              <>
                <h2 className="mt-8 font-display text-sm font-bold uppercase tracking-widest text-dojo-white/40">
                  Arquivados
                </h2>
                <ul className="space-y-3 opacity-60" role="list">
                  {arquivados.map((a) => (
                    <AlunoCard key={a.id} aluno={a} />
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

// ─── Subcomponentes ────────────────────────────────────────────────────────

function AlunoCard({ aluno }: { aluno: AlunoBrief }) {
  const idade = diffYears(
    aluno.data_nascimento,
    new Date().toISOString().slice(0, 10),
  );
  const grausStr = aluno.graus > 0 ? ` ${aluno.graus}°` : "";
  const faixa =
    aluno.faixa_atual.charAt(0).toUpperCase() + aluno.faixa_atual.slice(1);

  return (
    <li
      role="listitem"
      className="rounded-lg border border-dojo-gray/20 bg-dojo-gray/5 p-4 transition-colors hover:border-dojo-red/30"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-display text-base font-bold text-dojo-white">
            {aluno.nome_completo}
            {aluno.apelido && (
              <span className="ml-2 text-xs font-normal text-dojo-white/40">
                ({aluno.apelido})
              </span>
            )}
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-dojo-white/40">
            {idade} anos · {MODALIDADE_LABEL[aluno.modalidade_principal] ?? aluno.modalidade_principal}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-dojo-white/60">
          <span className="rounded-sm bg-dojo-gray/20 px-2 py-1">
            Faixa {faixa}
            {grausStr}
          </span>
          {aluno.status !== "ativo" && (
            <span className="rounded-sm bg-dojo-gray/30 px-2 py-1 text-dojo-white/50">
              {STATUS_LABEL[aluno.status] ?? aluno.status}
            </span>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-dojo-white/30">
        Matrícula: {formatDateBR(aluno.data_matricula)}
      </p>
    </li>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-dojo-gray/30 bg-dojo-gray/5 p-12 text-center">
      <Users size={32} className="text-dojo-white/30" aria-hidden="true" />
      <p className="font-display text-base text-dojo-white">
        Nenhum aluno cadastrado ainda.
      </p>
      <p className="text-sm text-dojo-white/40">
        Comece adicionando o primeiro aluno do seu dojô.
      </p>
      <Link
        href="/dashboard/alunos/novo"
        className="mt-2 inline-flex items-center gap-2 rounded-md bg-dojo-red px-4 py-2 text-sm font-medium text-dojo-white hover:bg-dojo-red/90"
      >
        <Plus size={16} aria-hidden="true" /> Cadastrar primeiro aluno
      </Link>
    </div>
  );
}
