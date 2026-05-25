import { z } from "zod";

/**
 * Schema do Aluno — esqueleto Fase 0.
 *
 * Sprints futuros expandem com: faixa atual, graus, modalidades, presença,
 * dados médicos do menor (LGPD), responsavel_ids, foto, observações sensei.
 */
export const AlunoSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(2).max(150),
  data_nascimento: z.string().date(),
  dojo_id: z.string().uuid(),
  responsavel_ids: z.array(z.string().uuid()).default([]),
  is_menor: z.boolean().default(false),
  created_at: z.string().datetime().optional(),
});

export type Aluno = z.infer<typeof AlunoSchema>;

/**
 * Helper: deriva is_menor a partir da data_nascimento.
 * Aluno < 18 anos exige responsavel + termo LGPD (regra de negócio MVP).
 */
export function isMenor(dataNascimento: string): boolean {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  const idade = hoje.getFullYear() - nascimento.getFullYear();
  const aniversarioPassou =
    hoje.getMonth() > nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() >= nascimento.getDate());
  const idadeReal = aniversarioPassou ? idade : idade - 1;
  return idadeReal < 18;
}
