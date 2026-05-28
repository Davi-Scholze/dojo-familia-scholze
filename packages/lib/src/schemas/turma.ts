import { z } from "zod";
import { ModalidadeAlunoSchema } from "./aluno";

export const FAIXAS_ETARIAS = ["infantil", "adolescente", "adulto", "livre"] as const;
export const FaixaEtariaSchema = z.enum(FAIXAS_ETARIAS);
export type FaixaEtaria = z.infer<typeof FaixaEtariaSchema>;

export const NIVEIS_TURMA = ["iniciante", "intermediario", "avancado", "livre"] as const;
export const NivelTurmaSchema = z.enum(NIVEIS_TURMA);
export type NivelTurma = z.infer<typeof NivelTurmaSchema>;

export const STATUS_TURMA = ["ativa", "pausada", "encerrada"] as const;
export const StatusTurmaSchema = z.enum(STATUS_TURMA);
export type StatusTurma = z.infer<typeof StatusTurmaSchema>;

export const DIAS_SEMANA = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"] as const;
export const DiaSemanaSchema = z.enum(DIAS_SEMANA);
export type DiaSemana = z.infer<typeof DiaSemanaSchema>;

/**
 * Slot de horário recorrente: 1 dia da semana + intervalo HH:MM.
 * Array de slots vive em turmas.horario_recorrente jsonb.
 */
export const HorarioSlotSchema = z
  .object({
    dia: DiaSemanaSchema,
    inicio: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Horário no formato HH:MM (24h)"),
    fim: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Horário no formato HH:MM (24h)"),
  })
  .refine(
    (s) => {
      const [hi, mi] = s.inicio.split(":").map(Number);
      const [hf, mf] = s.fim.split(":").map(Number);
      return hf * 60 + mf > hi * 60 + mi;
    },
    { message: "Horário fim deve ser depois do início", path: ["fim"] },
  );

export type HorarioSlot = z.infer<typeof HorarioSlotSchema>;

export const TurmaSchema = z.object({
  id: z.string().uuid(),
  dojo_id: z.string().uuid(),
  nome: z.string().min(2).max(100),
  modalidade: ModalidadeAlunoSchema,
  descricao: z.string().max(1000).nullable().optional(),
  faixa_etaria: FaixaEtariaSchema.default("livre"),
  nivel: NivelTurmaSchema.default("livre"),
  horario_recorrente: z.array(HorarioSlotSchema).default([]),
  capacidade_max: z.number().int().positive().nullable().optional(),
  cor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Cor no formato #RRGGBB hex")
    .default("#dc2626"),
  status: StatusTurmaSchema.default("ativa"),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type Turma = z.infer<typeof TurmaSchema>;

export const TurmaInsertSchema = TurmaSchema.pick({
  dojo_id: true,
  nome: true,
  modalidade: true,
  descricao: true,
  faixa_etaria: true,
  nivel: true,
  horario_recorrente: true,
  capacidade_max: true,
  cor: true,
}).extend({
  nome: z.string().min(2, "Nome da turma obrigatório").max(100),
  horario_recorrente: z
    .array(HorarioSlotSchema)
    .min(1, "Defina ao menos um horário recorrente"),
});

export type TurmaInsert = z.infer<typeof TurmaInsertSchema>;

export const TurmaUpdateSchema = TurmaInsertSchema.extend({
  status: StatusTurmaSchema.optional(),
}).partial();
export type TurmaUpdate = z.infer<typeof TurmaUpdateSchema>;

/**
 * Status de matrícula aluno-turma (relação N:N).
 */
export const STATUS_MATRICULA = ["ativo", "desligado", "trancado"] as const;
export const StatusMatriculaSchema = z.enum(STATUS_MATRICULA);
export type StatusMatricula = z.infer<typeof StatusMatriculaSchema>;

export const AlunoTurmaSchema = z.object({
  aluno_id: z.string().uuid(),
  turma_id: z.string().uuid(),
  matriculado_em: z.string().datetime().optional(),
  status: StatusMatriculaSchema.default("ativo"),
});

export type AlunoTurma = z.infer<typeof AlunoTurmaSchema>;
