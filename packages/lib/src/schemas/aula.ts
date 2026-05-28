import { z } from "zod";

export const TIPOS_MIDIA = ["video", "link", "texto"] as const;
export const TipoMidiaSchema = z.enum(TIPOS_MIDIA);
export type TipoMidia = z.infer<typeof TipoMidiaSchema>;

export const MidiaAnexaSchema = z.object({
  tipo: TipoMidiaSchema,
  url: z.string().url().nullable().optional(),
  descricao: z.string().max(500),
});

export type MidiaAnexa = z.infer<typeof MidiaAnexaSchema>;

export const AulaSchema = z.object({
  id: z.string().uuid(),
  dojo_id: z.string().uuid(),
  turma_id: z.string().uuid(),
  data: z.string().date(),
  horario_inicio: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, "Horário HH:MM ou HH:MM:SS"),
  horario_fim: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, "Horário HH:MM ou HH:MM:SS"),
  foco_do_dia: z.string().max(500).nullable().optional(),
  objetivos: z.string().max(2000).nullable().optional(),
  midia_anexa: z.array(MidiaAnexaSchema).default([]),
  planejamento_cumprido: z.boolean().nullable().optional(),
  observacoes_gerais: z.string().max(2000).nullable().optional(),
  fechada_em: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type Aula = z.infer<typeof AulaSchema>;

/**
 * Schema pra criar/upsert lazy: server gera id, dojo_id deriva da turma.
 * Usado quando dashboard "hoje" expande turmas em aulas concretas.
 */
export const AulaUpsertSchema = AulaSchema.pick({
  turma_id: true,
  data: true,
  horario_inicio: true,
  horario_fim: true,
  foco_do_dia: true,
  objetivos: true,
  midia_anexa: true,
});

export type AulaUpsert = z.infer<typeof AulaUpsertSchema>;

/**
 * Schema pra fechar aula no fim do dia.
 */
export const AulaFecharSchema = z.object({
  planejamento_cumprido: z.boolean(),
  observacoes_gerais: z.string().max(2000).nullable().optional(),
});

export type AulaFechar = z.infer<typeof AulaFecharSchema>;
