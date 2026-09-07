import { z } from "zod";

import {
  CLIENTE_ORDER_BY_VALUES,
  CLIENTE_ORDER_DIRECTION_VALUES,
} from "@/features/clientes/types/clientes.types";

const nullableStringSchema =
  z.string().nullable();

const nullableDateTimeSchema =
  z.string().datetime().nullable();

export const clienteSchema = z.object({
  id: z.string().uuid(),
  empresaId: z.string().uuid(),
  nome: z.string(),
  telefone: z.string(),
  email: nullableStringSchema,
  foto: nullableStringSchema,
  dataNascimento: nullableDateTimeSchema,
  observacoes: nullableStringSchema,
  ativo: z.boolean(),
  ativoPortal: z.boolean(),
  aceitouTermos: z.boolean(),
  dataAceiteTermos: nullableDateTimeSchema,
  ultimoAcessoPortal: nullableDateTimeSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const clientesPaginationMetaSchema =
  z.object({
    total: z.number().int().nonnegative(),
    page: z.number().int().min(1),
    limit: z.number().int().min(1).max(100),
    totalPages: z.number().int().nonnegative(),
  });

export const clientesListResponseSchema =
  z.object({
    data: z.array(clienteSchema),
    meta: clientesPaginationMetaSchema,
  });

export const clientesListParamsSchema =
  z.object({
    page: z.coerce
      .number()
      .int()
      .min(1)
      .default(1),

    limit: z.coerce
      .number()
      .int()
      .min(1)
      .max(100)
      .default(20),

    search: z
      .string()
      .trim()
      .min(1)
      .optional(),

    orderBy: z
      .enum(CLIENTE_ORDER_BY_VALUES)
      .default("createdAt"),

    orderDirection: z
      .enum(CLIENTE_ORDER_DIRECTION_VALUES)
      .default("desc"),
  });

export type ParsedClientesListParams =
  z.infer<typeof clientesListParamsSchema>;
