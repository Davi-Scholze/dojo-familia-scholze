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
import { criarAluno, type CriarAlunoState } from "../actions";

const FAIXAS_JUDO = [
  "branca",
  "amarela",
  "laranja",
  "verde",
  "azul",
  "roxa",
  "marrom",
  "preta",
] as const;

const FAIXAS_BJJ = [
  "branca",
  "cinza",
  "amarela",
  "laranja",
  "verde",
  "azul",
  "roxa",
  "marrom",
  "preta",
  "coral",
] as const;

const FAIXAS = Array.from(new Set([...FAIXAS_JUDO, ...FAIXAS_BJJ])).sort();

/**
 * Form de cadastro de aluno — Sprint 1b mobile-first.
 * Sections: Identificação | Treino | Contato | Saúde + Emergência | Observações.
 * Reusa padrão do OnboardingForm (Card stack + Field helper + Checkbox).
 */
export function AlunoForm() {
  const [state, formAction, isPending] = useActionState<
    CriarAlunoState,
    FormData
  >(criarAluno, {});

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {/* Identificação */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Identificação
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest text-dojo-white/40">
            Dados básicos do aluno
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending} className="space-y-5">
            <Field
              label="Nome completo"
              htmlFor="nome_completo"
              required
              error={state.errors?.nome_completo?.[0]}
            >
              <Input
                id="nome_completo"
                name="nome_completo"
                type="text"
                required
                minLength={2}
                maxLength={150}
                autoComplete="name"
                placeholder="João Silva"
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
              />
            </Field>

            <Field
              label="Apelido (opcional)"
              htmlFor="apelido"
              error={state.errors?.apelido?.[0]}
            >
              <Input
                id="apelido"
                name="apelido"
                type="text"
                maxLength={60}
                placeholder="Joãozinho"
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
              />
            </Field>

            <Field
              label="Data de nascimento"
              htmlFor="data_nascimento"
              required
              error={
                state.errors?.data_nascimento?.[0] ??
                state.errors?.responsavel_profile_id?.[0]
              }
            >
              <Input
                id="data_nascimento"
                name="data_nascimento"
                type="date"
                required
                max={new Date().toISOString().slice(0, 10)}
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white"
              />
            </Field>

            <Field
              label="Gênero (opcional)"
              htmlFor="genero"
              error={state.errors?.genero?.[0]}
            >
              <select
                id="genero"
                name="genero"
                defaultValue=""
                className="h-10 w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
              >
                <option value="">Não informar</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="prefiro-nao-dizer">Prefiro não dizer</option>
              </select>
            </Field>
          </fieldset>
        </CardContent>
      </Card>

      {/* Treino */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Treino
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest text-dojo-white/40">
            Modalidade e graduação atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending} className="space-y-5">
            <Field
              label="Modalidade principal"
              htmlFor="modalidade_principal"
              required
              error={state.errors?.modalidade_principal?.[0]}
            >
              <select
                id="modalidade_principal"
                name="modalidade_principal"
                defaultValue="ambos"
                className="h-10 w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
              >
                <option value="ambos">Ambas</option>
                <option value="judo">Judô</option>
                <option value="jiu-jitsu">Jiu-Jitsu</option>
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Faixa atual"
                htmlFor="faixa_atual"
                required
                error={state.errors?.faixa_atual?.[0]}
              >
                <select
                  id="faixa_atual"
                  name="faixa_atual"
                  defaultValue="branca"
                  className="h-10 w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
                >
                  {FAIXAS.map((f) => (
                    <option key={f} value={f}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Graus"
                htmlFor="graus"
                error={state.errors?.graus?.[0]}
              >
                <Input
                  id="graus"
                  name="graus"
                  type="number"
                  min={0}
                  max={4}
                  defaultValue={0}
                  className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white"
                />
              </Field>
            </div>

            <Field
              label="Data da graduação atual (opcional)"
              htmlFor="data_graduacao_atual"
              error={state.errors?.data_graduacao_atual?.[0]}
            >
              <Input
                id="data_graduacao_atual"
                name="data_graduacao_atual"
                type="date"
                max={new Date().toISOString().slice(0, 10)}
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white"
              />
            </Field>
          </fieldset>
        </CardContent>
      </Card>

      {/* Contato */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Contato
          </CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending} className="space-y-5">
            <Field
              label="Telefone (opcional)"
              htmlFor="telefone"
              error={state.errors?.telefone?.[0]}
            >
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                inputMode="tel"
                maxLength={30}
                autoComplete="tel"
                placeholder="(41) 99999-9999"
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
              />
            </Field>

            <Field
              label="Email (opcional)"
              htmlFor="email"
              error={state.errors?.email?.[0]}
            >
              <Input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="aluno@exemplo.com"
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
              />
            </Field>
          </fieldset>
        </CardContent>
      </Card>

      {/* Saúde + Emergência */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Saúde & emergência
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest text-dojo-white/40">
            Dados sensíveis (LGPD) — informe só o necessário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending} className="space-y-5">
            <Field
              label="Observações médicas (opcional)"
              htmlFor="observacoes_medicas"
              error={state.errors?.dados_medicos?.[0]}
            >
              <textarea
                id="observacoes_medicas"
                name="observacoes_medicas"
                rows={3}
                maxLength={1000}
                placeholder="Alergias, restrições, medicações relevantes ao treino…"
                className="w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white placeholder:text-dojo-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
              />
            </Field>

            <Field
              label="Contato de emergência — nome (opcional)"
              htmlFor="contato_emergencia_nome"
              error={state.errors?.contato_emergencia_nome?.[0]}
            >
              <Input
                id="contato_emergencia_nome"
                name="contato_emergencia_nome"
                type="text"
                maxLength={150}
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Telefone"
                htmlFor="contato_emergencia_telefone"
                error={state.errors?.contato_emergencia_telefone?.[0]}
              >
                <Input
                  id="contato_emergencia_telefone"
                  name="contato_emergencia_telefone"
                  type="tel"
                  inputMode="tel"
                  maxLength={30}
                  placeholder="(41) 99999-9999"
                  className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
                />
              </Field>

              <Field
                label="Parentesco"
                htmlFor="contato_emergencia_parentesco"
                error={state.errors?.contato_emergencia_parentesco?.[0]}
              >
                <Input
                  id="contato_emergencia_parentesco"
                  name="contato_emergencia_parentesco"
                  type="text"
                  maxLength={60}
                  placeholder="Mãe, pai, irmão…"
                  className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
                />
              </Field>
            </div>
          </fieldset>
        </CardContent>
      </Card>

      {/* Observações */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Observações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending}>
            <Field
              label="Observações gerais (opcional)"
              htmlFor="observacoes"
              error={state.errors?.observacoes?.[0]}
            >
              <textarea
                id="observacoes"
                name="observacoes"
                rows={3}
                maxLength={2000}
                placeholder="Notas do sensei…"
                className="w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white placeholder:text-dojo-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
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
          href="/dashboard/alunos"
          className="rounded-md border border-dojo-gray/30 px-4 py-2 text-sm text-dojo-white/70 hover:bg-dojo-gray/10"
        >
          Cancelar
        </a>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-dojo-red text-dojo-white hover:bg-dojo-red/90 disabled:opacity-60"
        >
          {isPending ? "Cadastrando…" : "Cadastrar aluno"}
        </Button>
      </div>
    </form>
  );
}

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
