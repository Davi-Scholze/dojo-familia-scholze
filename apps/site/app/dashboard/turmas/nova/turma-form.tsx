"use client";

import { useActionState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@dojo-fs/ui";
import { criarTurma, type CriarTurmaState } from "../actions";

const DIAS = [
  { value: "seg", label: "Seg" },
  { value: "ter", label: "Ter" },
  { value: "qua", label: "Qua" },
  { value: "qui", label: "Qui" },
  { value: "sex", label: "Sex" },
  { value: "sab", label: "Sáb" },
  { value: "dom", label: "Dom" },
] as const;

const CORES_TURMA = [
  { value: "#dc2626", label: "Vermelho dojô" },
  { value: "#ea580c", label: "Laranja" },
  { value: "#ca8a04", label: "Amarelo" },
  { value: "#16a34a", label: "Verde" },
  { value: "#2563eb", label: "Azul" },
  { value: "#7c3aed", label: "Roxo" },
] as const;

/**
 * Form de cadastro de turma. Mobile-first Sprint 1b.
 * Horario_recorrente simplificado: 7 checkboxes dias + 1 par HH:MM.
 * Cor: swatches predefinidos (vs native color input pra consistência mobile).
 */
export function TurmaForm() {
  const [state, formAction, isPending] = useActionState<
    CriarTurmaState,
    FormData
  >(criarTurma, {});

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {/* Identificação */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Identificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending} className="space-y-5">
            <Field
              label="Nome da turma"
              htmlFor="nome"
              required
              error={state.errors?.nome?.[0]}
            >
              <Input
                id="nome"
                name="nome"
                type="text"
                required
                minLength={2}
                maxLength={100}
                placeholder="Ex: Judô Infantil — Terça e Quinta"
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Field
                label="Modalidade"
                htmlFor="modalidade"
                required
                error={state.errors?.modalidade?.[0]}
              >
                <select
                  id="modalidade"
                  name="modalidade"
                  defaultValue="judo"
                  className="h-10 w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
                >
                  <option value="judo">Judô</option>
                  <option value="jiu-jitsu">Jiu-Jitsu</option>
                  <option value="ambos">Ambos</option>
                </select>
              </Field>

              <Field
                label="Faixa etária"
                htmlFor="faixa_etaria"
                error={state.errors?.faixa_etaria?.[0]}
              >
                <select
                  id="faixa_etaria"
                  name="faixa_etaria"
                  defaultValue="livre"
                  className="h-10 w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
                >
                  <option value="livre">Livre</option>
                  <option value="infantil">Infantil</option>
                  <option value="adolescente">Adolescente</option>
                  <option value="adulto">Adulto</option>
                </select>
              </Field>

              <Field
                label="Nível"
                htmlFor="nivel"
                error={state.errors?.nivel?.[0]}
              >
                <select
                  id="nivel"
                  name="nivel"
                  defaultValue="livre"
                  className="h-10 w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
                >
                  <option value="livre">Livre</option>
                  <option value="iniciante">Iniciante</option>
                  <option value="intermediario">Intermediário</option>
                  <option value="avancado">Avançado</option>
                </select>
              </Field>
            </div>

            <Field
              label="Descrição (opcional)"
              htmlFor="descricao"
              error={state.errors?.descricao?.[0]}
            >
              <textarea
                id="descricao"
                name="descricao"
                rows={2}
                maxLength={1000}
                placeholder="Foco da turma, abordagem pedagógica…"
                className="w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white placeholder:text-dojo-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
              />
            </Field>
          </fieldset>
        </CardContent>
      </Card>

      {/* Horário */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Horário recorrente
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest text-dojo-white/40">
            Selecione os dias da semana e o mesmo intervalo de horário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending} className="space-y-5">
            <Field
              label="Dias da semana"
              htmlFor="dias-group"
              required
              error={state.errors?.horario_recorrente?.[0]}
            >
              <div
                id="dias-group"
                role="group"
                aria-label="Dias da semana"
                className="grid grid-cols-7 gap-2"
              >
                {DIAS.map((d) => (
                  <DiaCheckbox key={d.value} value={d.value} label={d.label} />
                ))}
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Início"
                htmlFor="horario_inicio"
                required
                error={state.errors?.horario_recorrente?.[0]}
              >
                <Input
                  id="horario_inicio"
                  name="horario_inicio"
                  type="time"
                  required
                  defaultValue="19:00"
                  className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white"
                />
              </Field>

              <Field
                label="Fim"
                htmlFor="horario_fim"
                required
                error={state.errors?.horario_recorrente?.[0]}
              >
                <Input
                  id="horario_fim"
                  name="horario_fim"
                  type="time"
                  required
                  defaultValue="20:30"
                  className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white"
                />
              </Field>
            </div>
          </fieldset>
        </CardContent>
      </Card>

      {/* Visual + capacidade */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Visual & capacidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending} className="space-y-5">
            <Field
              label="Cor da turma (timeline)"
              htmlFor="cor-group"
              error={state.errors?.cor?.[0]}
            >
              <div
                id="cor-group"
                role="radiogroup"
                aria-label="Cor da turma"
                className="flex flex-wrap gap-3"
              >
                {CORES_TURMA.map((c, idx) => (
                  <CorRadio
                    key={c.value}
                    value={c.value}
                    label={c.label}
                    defaultChecked={idx === 0}
                  />
                ))}
              </div>
            </Field>

            <Field
              label="Capacidade máxima (opcional)"
              htmlFor="capacidade_max"
              error={state.errors?.capacidade_max?.[0]}
            >
              <Input
                id="capacidade_max"
                name="capacidade_max"
                type="number"
                inputMode="numeric"
                min={1}
                max={200}
                placeholder="Ex: 25"
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
              />
            </Field>
          </fieldset>
        </CardContent>
      </Card>

      {state.message && state.ok === false && (
        <p
          role="alert"
          className="rounded-md border border-dojo-red/40 bg-dojo-red/10 p-3 text-sm text-dojo-red"
        >
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <a
          href="/dashboard/turmas"
          className="rounded-md border border-dojo-gray/30 px-4 py-2 text-sm text-dojo-white/70 hover:bg-dojo-gray/10"
        >
          Cancelar
        </a>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-dojo-red text-dojo-white hover:bg-dojo-red/90 disabled:opacity-60"
        >
          {isPending ? "Criando…" : "Criar turma"}
        </Button>
      </div>
    </form>
  );
}

// ─── Sub-helpers ────────────────────────────────────────────────────────────

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-xs uppercase tracking-widest text-dojo-white/60"
      >
        {label}
        {required && <span className="ml-1 text-dojo-red">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-dojo-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function DiaCheckbox({ value, label }: { value: string; label: string }) {
  return (
    <label className="relative flex cursor-pointer items-center justify-center">
      <input
        type="checkbox"
        name="dias"
        value={value}
        className="peer sr-only"
      />
      <span className="flex h-10 w-full items-center justify-center rounded-md border border-dojo-gray/30 bg-dojo-black/40 text-xs uppercase tracking-widest text-dojo-white/60 transition-colors peer-checked:border-dojo-red peer-checked:bg-dojo-red/20 peer-checked:text-dojo-red peer-focus-visible:ring-2 peer-focus-visible:ring-dojo-red">
        {label}
      </span>
    </label>
  );
}

function CorRadio({
  value,
  label,
  defaultChecked,
}: {
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      className="relative flex cursor-pointer items-center gap-2"
      title={label}
    >
      <input
        type="radio"
        name="cor"
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span
        className="h-9 w-9 rounded-full ring-2 ring-transparent transition-all peer-checked:ring-dojo-white peer-checked:ring-offset-2 peer-checked:ring-offset-dojo-gray/5 peer-focus-visible:ring-dojo-white"
        style={{ backgroundColor: value }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </label>
  );
}
