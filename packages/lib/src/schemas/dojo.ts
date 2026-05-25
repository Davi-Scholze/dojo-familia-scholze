import { z } from "zod";

/**
 * Schema do Dojô (academia / unidade) — esqueleto Fase 0.
 *
 * Sprints futuros expandem com: timezone, contato, paleta custom, plano ativo,
 * features_habilitadas (jsonb), endereço, modalidades_oferecidas.
 */
export const DojoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/, "slug deve conter apenas a-z, 0-9 e hífen"),
  created_at: z.string().datetime().optional(),
});

export type Dojo = z.infer<typeof DojoSchema>;
