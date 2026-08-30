import { z } from "zod";

const isoDateSchema = z.string().datetime();

const decimalSchema = z
  .union([
    z.number(),
    z.string().regex(/^\d+(?:\.\d+)?$/),
  ])
  .transform((value) => Number(value))
  .pipe(z.number().finite().nonnegative());

export const statusClientePacoteSchema = z.enum([
  "ATIVO",
  "FINALIZADO",
  "VENCIDO",
  "CANCELADO",
]);

export const pacoteSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(1),
  descricao: z.string().nullable().optional(),
  valor: decimalSchema,
  quantidadeSessoes: z.number().int().positive(),
  validadeDias: z.number().int().positive().nullable(),
  ativo: z.boolean(),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
});

export const pacotesSchema = z.array(pacoteSchema);

const clienteResumoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(1),
});

const pacoteResumoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(1),
  valor: decimalSchema.optional(),
  quantidadeSessoes: z.number().int().positive().optional(),
  validadeDias: z.number().int().positive().nullable().optional(),
});

export const clientePacoteSchema = z.object({
  id: z.string().uuid(),
  clienteId: z.string().uuid(),
  pacoteId: z.string().uuid(),
  sessoesTotal: z.number().int().nonnegative(),
  sessoesUsadas: z.number().int().nonnegative(),
  sessoesRestantes: z.number().int().nonnegative(),
  dataCompra: isoDateSchema,
  dataValidade: isoDateSchema.nullable(),
  status: statusClientePacoteSchema,
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,

  clienteNome: z.string().optional(),
  pacoteNome: z.string().optional(),

  cliente: clienteResumoSchema.optional(),
  pacote: pacoteResumoSchema.optional(),
});

export const clientesPacotesSchema = z.array(clientePacoteSchema);
