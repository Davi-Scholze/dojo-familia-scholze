import { z } from "zod";

export const RSVP_STATUS = ["vou", "nao_vou"] as const;
export const RsvpStatusSchema = z.enum(RSVP_STATUS);
export type RsvpStatus = z.infer<typeof RsvpStatusSchema>;

export const PRESENCA_STATUS = ["presente", "ausente", "justificada"] as const;
export const PresencaStatusSchema = z.enum(PRESENCA_STATUS);
export type PresencaStatus = z.infer<typeof PresencaStatusSchema>;

export const PresencaSchema = z.object({
  id: z.string().uuid(),
  aula_id: z.string().uuid(),
  aluno_id: z.string().uuid(),

  rsvp_status: RsvpStatusSchema.nullable().optional(),
  rsvp_em: z.string().datetime().nullable().optional(),
  rsvp_mensagem: z.string().max(500).nullable().optional(),

  presenca_status: PresencaStatusSchema.nullable().optional(),
  presenca_em: z.string().datetime().nullable().optional(),
  marcada_por: z.string().uuid().nullable().optional(),
  justificativa: z.string().max(500).nullable().optional(),

  feedback_professor: z.string().max(2000).nullable().optional(),

  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type Presenca = z.infer<typeof PresencaSchema>;

/**
 * RSVP do aluno/responsavel pré-aula (Sprint 1b lê; Sprint 2 expõe pro app aluno escrever).
 */
export const RsvpInputSchema = z.object({
  aula_id: z.string().uuid(),
  aluno_id: z.string().uuid(),
  rsvp_status: RsvpStatusSchema,
  rsvp_mensagem: z.string().max(500).optional(),
});

export type RsvpInput = z.infer<typeof RsvpInputSchema>;

/**
 * Professor marca presença/ausência durante ou após aula.
 */
export const MarcarPresencaInputSchema = z.object({
  aula_id: z.string().uuid(),
  aluno_id: z.string().uuid(),
  presenca_status: PresencaStatusSchema,
  justificativa: z.string().max(500).optional(),
});

export type MarcarPresencaInput = z.infer<typeof MarcarPresencaInputSchema>;

/**
 * Professor envia feedback individual ao aluno no fechamento da aula.
 */
export const FeedbackInputSchema = z.object({
  aula_id: z.string().uuid(),
  aluno_id: z.string().uuid(),
  feedback_professor: z.string().min(1).max(2000),
});

export type FeedbackInput = z.infer<typeof FeedbackInputSchema>;
