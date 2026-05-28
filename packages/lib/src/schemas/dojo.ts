import { z } from "zod";

/**
 * Modalidades suportadas no schema atual.
 * Crescer aqui = atualizar CHECK constraint em migration.
 */
export const MODALIDADES_DOJO = ["judo", "jiu-jitsu"] as const;
export const ModalidadeDojoSchema = z.enum(MODALIDADES_DOJO);
export type ModalidadeDojo = z.infer<typeof ModalidadeDojoSchema>;

export const PLANOS = ["trial", "basico", "intermediario", "premium"] as const;
export const PlanoSchema = z.enum(PLANOS);
export type Plano = z.infer<typeof PlanoSchema>;

const urlOpcional = z
  .string()
  .url()
  .optional()
  .nullable()
  .or(z.literal(""))
  .transform((v) => (v === "" ? null : v));

export const DojoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/, "slug deve conter apenas a-z, 0-9 e hífen"),
  logo_url: z.string().url().nullable().optional(),
  banner_url: z.string().url().nullable().optional(),
  descricao: z.string().max(2000).nullable().optional(),
  modalidades: z.array(ModalidadeDojoSchema).default([]),
  endereco: z.string().max(300).nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  instagram_url: urlOpcional,
  youtube_url: urlOpcional,
  plano: PlanoSchema.default("trial"),
  trial_inicio: z.string().date(),
  trial_fim: z.string().date(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type Dojo = z.infer<typeof DojoSchema>;

/**
 * Schema para criar dojo (Sprint 1b — onboarding).
 * Server preenche id, slug derivado, trial_inicio = today, trial_fim = +30d, timestamps.
 */
export const DojoInsertSchema = DojoSchema.pick({
  nome: true,
  descricao: true,
  modalidades: true,
  endereco: true,
  whatsapp: true,
  instagram_url: true,
  youtube_url: true,
}).extend({
  nome: z.string().min(2, "Nome do dojô precisa ter ao menos 2 caracteres").max(120),
  modalidades: z
    .array(ModalidadeDojoSchema)
    .min(1, "Selecione ao menos uma modalidade")
    .default(["judo", "jiu-jitsu"]),
});

export type DojoInsert = z.infer<typeof DojoInsertSchema>;

export const DojoUpdateSchema = DojoInsertSchema.partial();
export type DojoUpdate = z.infer<typeof DojoUpdateSchema>;

/**
 * Deriva slug url-safe a partir do nome.
 * Não-bijetivo (perde acentos/caracteres) — apenas pra default na criação.
 */
export function slugifyDojo(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
