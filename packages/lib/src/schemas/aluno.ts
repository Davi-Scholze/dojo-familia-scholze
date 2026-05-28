import { z } from "zod";
import { diffYears } from "../helpers/date-br";

/**
 * Modalidade praticada pelo aluno.
 * Inclui "ambos" porque aluno pode praticar Judô + Jiu-Jitsu (escola comum no BR).
 */
export const MODALIDADES_ALUNO = ["judo", "jiu-jitsu", "ambos"] as const;
export const ModalidadeAlunoSchema = z.enum(MODALIDADES_ALUNO);
export type ModalidadeAluno = z.infer<typeof ModalidadeAlunoSchema>;

export const GENEROS = ["masculino", "feminino", "outro", "prefiro-nao-dizer"] as const;
export const GeneroSchema = z.enum(GENEROS);
export type Genero = z.infer<typeof GeneroSchema>;

export const STATUS_ALUNO = ["ativo", "inativo", "trancado"] as const;
export const StatusAlunoSchema = z.enum(STATUS_ALUNO);
export type StatusAluno = z.infer<typeof StatusAlunoSchema>;

/**
 * Dados médicos do aluno (jsonb encapsulado pra LGPD).
 * Tudo opcional — preenchimento gradual conforme cadastro evolui.
 */
export const DadosMedicosSchema = z.object({
  alergias: z.string().max(500).optional(),
  condicoes_cronicas: z.string().max(500).optional(),
  medicacoes: z.string().max(500).optional(),
  restricoes_treino: z.string().max(500).optional(),
  observacoes: z.string().max(1000).optional(),
});

export type DadosMedicos = z.infer<typeof DadosMedicosSchema>;

export const AlunoSchema = z.object({
  id: z.string().uuid(),
  dojo_id: z.string().uuid(),
  profile_id: z.string().uuid().nullable(),
  responsavel_profile_id: z.string().uuid().nullable(),

  nome_completo: z.string().min(2).max(150),
  apelido: z.string().min(1).max(60).nullable().optional(),
  foto_url: z.string().url().nullable().optional(),
  data_nascimento: z.string().date(),
  genero: GeneroSchema.nullable().optional(),

  telefone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional().or(z.literal("")),

  modalidade_principal: ModalidadeAlunoSchema.default("ambos"),
  faixa_atual: z.string().min(1).max(60).default("branca"),
  graus: z.number().int().min(0).max(4).default(0),
  data_graduacao_atual: z.string().date().nullable().optional(),

  dados_medicos: DadosMedicosSchema.default({}),
  contato_emergencia_nome: z.string().max(150).nullable().optional(),
  contato_emergencia_telefone: z.string().max(30).nullable().optional(),
  contato_emergencia_parentesco: z.string().max(60).nullable().optional(),

  status: StatusAlunoSchema.default("ativo"),
  data_matricula: z.string().date(),
  observacoes: z.string().max(2000).nullable().optional(),

  termo_lgpd_aceito_em: z.string().datetime().nullable().optional(),

  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type Aluno = z.infer<typeof AlunoSchema>;

/**
 * Schema pra criar aluno via Server Action.
 * Validação cruzada: menor (< 18) exige responsavel_profile_id NOT NULL.
 */
export const AlunoInsertSchema = AlunoSchema.pick({
  dojo_id: true,
  responsavel_profile_id: true,
  nome_completo: true,
  apelido: true,
  data_nascimento: true,
  genero: true,
  telefone: true,
  email: true,
  modalidade_principal: true,
  faixa_atual: true,
  graus: true,
  data_graduacao_atual: true,
  dados_medicos: true,
  contato_emergencia_nome: true,
  contato_emergencia_telefone: true,
  contato_emergencia_parentesco: true,
  observacoes: true,
})
  .extend({
    nome_completo: z.string().min(2, "Nome do aluno obrigatório").max(150),
    data_nascimento: z.string().date("Data de nascimento inválida"),
  })
  .superRefine((aluno, ctx) => {
    if (!aluno.data_nascimento) return;
    const idade = diffYears(aluno.data_nascimento, new Date().toISOString().slice(0, 10));
    if (idade < 18 && !aluno.responsavel_profile_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["responsavel_profile_id"],
        message: "Aluno menor de 18 anos exige responsável cadastrado",
      });
    }
  });

export type AlunoInsert = z.infer<typeof AlunoInsertSchema>;

export const AlunoUpdateSchema = AlunoSchema.pick({
  responsavel_profile_id: true,
  nome_completo: true,
  apelido: true,
  foto_url: true,
  data_nascimento: true,
  genero: true,
  telefone: true,
  email: true,
  modalidade_principal: true,
  faixa_atual: true,
  graus: true,
  data_graduacao_atual: true,
  dados_medicos: true,
  contato_emergencia_nome: true,
  contato_emergencia_telefone: true,
  contato_emergencia_parentesco: true,
  status: true,
  observacoes: true,
})
  .partial();

export type AlunoUpdate = z.infer<typeof AlunoUpdateSchema>;

/**
 * Helper: aluno é menor de idade no momento da chamada.
 * Wrap em torno do diffYears pra evitar repetir lógica em UI.
 */
export function isAlunoMenor(dataNascimento: string): boolean {
  return diffYears(dataNascimento, new Date().toISOString().slice(0, 10)) < 18;
}
