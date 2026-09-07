import { z } from "zod";

const decimalSchema = z
  .union([z.number(), z.string().regex(/^\d+(?:\.\d+)?$/)])
  .transform(Number)
  .pipe(z.number().finite().nonnegative());

export const servicoSchema = z.object({
  id: z.string().uuid(),
  empresaId: z.string().uuid(),
  nome: z.string(),
  descricao: z.string().nullable(),
  duracaoMinutos: z.number().int().min(1),
  preco: decimalSchema,
  imagem: z.string().nullable(),
  ativo: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const servicosListResponseSchema = z.array(servicoSchema);

export const createServicoPayloadSchema = z.object({
  nome: z.string().trim().min(1),
  descricao: z.string().optional(),
  duracaoMinutos: z.number().int().min(1),
  preco: z.number().finite().nonnegative(),
});

export const updateServicoPayloadSchema = z.object({
  nome: z.string().trim().min(2).max(120).optional(),
  descricao: z.string().max(500).optional(),
  duracaoMinutos: z.number().int().min(1).optional(),
  preco: z.number().finite().nonnegative().optional(),
});
