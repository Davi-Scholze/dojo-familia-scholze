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
import { completarOnboarding, type OnboardingState } from "./actions";

/**
 * Form de onboarding — completa profile do professor + dados do dojô.
 * Mobile-first: 1 coluna no mobile, fieldsets stackeaveis. Sem layout em grid.
 */
export function OnboardingForm({ defaultEmail }: { defaultEmail: string }) {
  const [state, formAction, isPending] = useActionState<
    OnboardingState,
    FormData
  >(completarOnboarding, {});

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {/* Sobre você (Sensei) */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Sobre você
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest text-dojo-white/40">
            Sensei {defaultEmail}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending} className="space-y-5">
            <Field
              label="Seu nome completo"
              htmlFor="full_name"
              error={state.errors?.full_name?.[0]}
              required
            >
              <Input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                placeholder="Cristiano Scholze"
                required
                minLength={2}
                maxLength={150}
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
              />
            </Field>

            <Field
              label="Modalidade principal que ensina"
              htmlFor="modalidade_principal"
              error={state.errors?.modalidade_principal?.[0]}
              required
            >
              <select
                id="modalidade_principal"
                name="modalidade_principal"
                defaultValue="ambos"
                className="h-10 w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
              >
                <option value="ambos">Ambas (Judô + Jiu-Jitsu)</option>
                <option value="judo">Judô</option>
                <option value="jiu-jitsu">Jiu-Jitsu</option>
              </select>
            </Field>

            <Field
              label="Anos de experiência (opcional)"
              htmlFor="anos_experiencia"
              error={state.errors?.anos_experiencia?.[0]}
            >
              <Input
                id="anos_experiencia"
                name="anos_experiencia"
                type="number"
                inputMode="numeric"
                min={0}
                max={80}
                placeholder="Ex: 20"
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
              />
            </Field>
          </fieldset>
        </CardContent>
      </Card>

      {/* Seu Dojô */}
      <Card className="border-dojo-gray/20 bg-dojo-gray/5">
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-widest text-dojo-white">
            Seu Dojô
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest text-dojo-white/40">
            Dados básicos do espaço de treino
          </CardDescription>
        </CardHeader>
        <CardContent>
          <fieldset disabled={isPending} className="space-y-5">
            <Field
              label="Modalidades praticadas"
              htmlFor="modalidades"
              error={state.errors?.modalidades?.[0]}
              required
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <Checkbox
                  name="modalidades"
                  value="judo"
                  label="Judô"
                  defaultChecked
                />
                <Checkbox
                  name="modalidades"
                  value="jiu-jitsu"
                  label="Jiu-Jitsu"
                  defaultChecked
                />
              </div>
            </Field>

            <Field
              label="Descrição (opcional)"
              htmlFor="descricao"
              error={state.errors?.descricao?.[0]}
            >
              <textarea
                id="descricao"
                name="descricao"
                rows={3}
                maxLength={2000}
                placeholder="Filosofia, anos de tradição, diferenciais…"
                className="w-full rounded-md border border-dojo-gray/30 bg-dojo-black/40 px-3 py-2 text-sm text-dojo-white placeholder:text-dojo-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dojo-red"
              />
            </Field>

            <Field
              label="Endereço (opcional)"
              htmlFor="endereco"
              error={state.errors?.endereco?.[0]}
            >
              <Input
                id="endereco"
                name="endereco"
                type="text"
                maxLength={300}
                placeholder="Rua Exemplo, 123 — Curitiba/PR"
                autoComplete="street-address"
                className="bg-dojo-black/40 border-dojo-gray/30 text-dojo-white placeholder:text-dojo-white/30"
              />
            </Field>

            <Field
              label="WhatsApp (opcional)"
              htmlFor="whatsapp"
              error={state.errors?.whatsapp?.[0]}
            >
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                maxLength={30}
                placeholder="(41) 99999-9999"
                autoComplete="tel"
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
        <Button
          type="submit"
          disabled={isPending}
          className="bg-dojo-red text-dojo-white hover:bg-dojo-red/90 disabled:opacity-60"
        >
          {isPending ? "Salvando…" : "Entrar no dojô"}
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

function Checkbox({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-dojo-white">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-dojo-gray/40 bg-dojo-black/40 text-dojo-red focus-visible:ring-2 focus-visible:ring-dojo-red"
      />
      {label}
    </label>
  );
}
