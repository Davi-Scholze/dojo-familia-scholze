"use client";

import { useOptimistic, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@dojo-fs/ui";
import { AlertTriangle, Check, X, Clock3 } from "lucide-react";
import { marcarPresenca } from "./actions";

type Turma = {
  id: string;
  nome: string;
  modalidade: string;
  cor: string;
};

type Aula = {
  id: string;
  horario_inicio: string;
  horario_fim: string;
  foco_do_dia: string | null;
  fechada_em: string | null;
};

type Aluno = {
  id: string;
  nome_completo: string;
  apelido: string | null;
  faixa_atual: string;
  graus: number;
};

type Presenca = {
  id: string;
  aluno_id: string;
  rsvp_status: string | null;
  rsvp_mensagem: string | null;
  presenca_status: string | null;
};

const MODALIDADE_LABEL: Record<string, string> = {
  judo: "Judô",
  "jiu-jitsu": "Jiu-Jitsu",
  ambos: "Ambos",
};

type PresencaStatus = "presente" | "ausente" | "justificada" | null;

type OptimisticPresenca = {
  aluno_id: string;
  status: PresencaStatus;
};

/**
 * Card de aula com lista de alunos matriculados e toggle de presença.
 * useOptimistic atualiza UI instantaneamente; Server Action re-fetcha via revalidatePath.
 */
export function AulaCard({
  aula,
  turma,
  alunos,
  presencas,
}: {
  aula: Aula;
  turma: Turma;
  alunos: Aluno[];
  presencas: Presenca[];
}) {
  const presencaByAluno = new Map(presencas.map((p) => [p.aluno_id, p]));

  const initialOptimistic: OptimisticPresenca[] = alunos.map((a) => ({
    aluno_id: a.id,
    status:
      (presencaByAluno.get(a.id)?.presenca_status as PresencaStatus) ?? null,
  }));

  const [optimistic, setOptimistic] = useOptimistic<
    OptimisticPresenca[],
    { aluno_id: string; status: PresencaStatus }
  >(initialOptimistic, (state, action) =>
    state.map((s) =>
      s.aluno_id === action.aluno_id ? { ...s, status: action.status } : s,
    ),
  );

  const [isPending, startTransition] = useTransition();

  const presentes = optimistic.filter((o) => o.status === "presente").length;
  const ausentes = optimistic.filter((o) => o.status === "ausente").length;
  const naoMarcados = optimistic.filter((o) => o.status === null).length;

  return (
    <Card
      className="border-dojo-gray/20 bg-dojo-gray/5"
      aria-label={`Aula ${turma.nome}`}
    >
      <CardHeader>
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-1 h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: turma.cor }}
          />
          <div className="flex-1 min-w-0">
            <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
              {turma.nome}
            </CardTitle>
            <p className="mt-1 text-xs uppercase tracking-widest text-dojo-white/40">
              {MODALIDADE_LABEL[turma.modalidade] ?? turma.modalidade} ·{" "}
              {aula.horario_inicio.slice(0, 5)}–{aula.horario_fim.slice(0, 5)} ·{" "}
              {alunos.length} matriculad{alunos.length === 1 ? "o" : "os"}
              {presentes > 0 && ` · ${presentes} ✓`}
              {ausentes > 0 && ` · ${ausentes} ✗`}
              {naoMarcados > 0 && ` · ${naoMarcados} pendente${naoMarcados === 1 ? "" : "s"}`}
            </p>
          </div>
          {aula.fechada_em && (
            <span className="rounded-sm bg-dojo-gray/30 px-2 py-1 text-xs uppercase tracking-widest text-dojo-white/60">
              Fechada
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {alunos.length === 0 ? (
          <p className="rounded-md border border-dashed border-dojo-gray/30 p-6 text-center text-sm text-dojo-white/40">
            Nenhum aluno matriculado nesta turma ainda.
          </p>
        ) : (
          <ul className="divide-y divide-dojo-gray/10" role="list">
            {alunos.map((aluno) => {
              const presenca = presencaByAluno.get(aluno.id);
              const current =
                optimistic.find((o) => o.aluno_id === aluno.id)?.status ?? null;

              return (
                <li
                  key={aluno.id}
                  className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-dojo-white">
                      {aluno.nome_completo}
                      {aluno.apelido && (
                        <span className="ml-2 text-xs text-dojo-white/40">
                          ({aluno.apelido})
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-widest text-dojo-white/40">
                      Faixa {aluno.faixa_atual}
                      {aluno.graus > 0 && ` ${aluno.graus}°`}
                    </p>
                    {presenca?.rsvp_mensagem && (
                      <p
                        className="mt-2 flex items-start gap-2 rounded-sm bg-dojo-red/10 p-2 text-xs text-dojo-red"
                        role="note"
                      >
                        <AlertTriangle
                          size={14}
                          className="mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{presenca.rsvp_mensagem}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <PresencaButton
                      status="presente"
                      current={current}
                      onClick={() => {
                        startTransition(async () => {
                          setOptimistic({
                            aluno_id: aluno.id,
                            status: "presente",
                          });
                          await marcarPresenca(aula.id, aluno.id, "presente");
                        });
                      }}
                      disabled={isPending}
                    />
                    <PresencaButton
                      status="ausente"
                      current={current}
                      onClick={() => {
                        startTransition(async () => {
                          setOptimistic({
                            aluno_id: aluno.id,
                            status: "ausente",
                          });
                          await marcarPresenca(aula.id, aluno.id, "ausente");
                        });
                      }}
                      disabled={isPending}
                    />
                    <PresencaButton
                      status="justificada"
                      current={current}
                      onClick={() => {
                        startTransition(async () => {
                          setOptimistic({
                            aluno_id: aluno.id,
                            status: "justificada",
                          });
                          await marcarPresenca(
                            aula.id,
                            aluno.id,
                            "justificada",
                          );
                        });
                      }}
                      disabled={isPending}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function PresencaButton({
  status,
  current,
  onClick,
  disabled,
}: {
  status: "presente" | "ausente" | "justificada";
  current: PresencaStatus;
  onClick: () => void;
  disabled?: boolean;
}) {
  const active = current === status;
  const config = {
    presente: {
      icon: <Check size={16} aria-hidden="true" />,
      label: "Presente",
      activeBg: "bg-green-600/30 border-green-500 text-green-300",
    },
    ausente: {
      icon: <X size={16} aria-hidden="true" />,
      label: "Ausente",
      activeBg: "bg-dojo-red/30 border-dojo-red text-dojo-red",
    },
    justificada: {
      icon: <Clock3 size={16} aria-hidden="true" />,
      label: "Justificada",
      activeBg: "bg-yellow-600/30 border-yellow-500 text-yellow-300",
    },
  }[status];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      aria-label={config.label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${
        active
          ? config.activeBg
          : "border-dojo-gray/30 bg-dojo-black/40 text-dojo-white/40 hover:border-dojo-gray/60 hover:text-dojo-white/70"
      } disabled:opacity-50`}
    >
      {config.icon}
    </button>
  );
}
