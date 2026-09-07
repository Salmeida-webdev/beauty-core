import { z } from "zod";

export const unidadeSchema = z.object({
  id: z.string().uuid(),
  empresaId: z.string().uuid(),
  nome: z.string(),
  telefone: z.string().nullable(),
  email: z.string().nullable(),
  endereco: z.string().nullable(),
  ativa: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const unidadesListResponseSchema = z.array(unidadeSchema);

export const createUnidadePayloadSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  telefone: z.string().trim().max(20).optional(),
  email: z.string().trim().email().max(150).optional(),
  endereco: z.string().trim().max(255).optional(),
});

export const updateUnidadePayloadSchema = createUnidadePayloadSchema.partial();
