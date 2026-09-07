import { z } from "zod";

import {
  formasPagamentoFinanceiro,
  statusPagamentoFinanceiro,
  tiposCategoriaFinanceira,
  tiposMovimentacaoFinanceira,
} from "@/features/financeiro/types/financeiro.types";

export const tipoMovimentacaoFinanceiraSchema = z.enum(
  tiposMovimentacaoFinanceira,
);

export const formaPagamentoFinanceiroSchema = z.enum(formasPagamentoFinanceiro);

export const statusPagamentoFinanceiroSchema = z.enum(
  statusPagamentoFinanceiro,
);

export const tipoCategoriaFinanceiraSchema = z.enum(tiposCategoriaFinanceira);

const optionalUuidSchema = z.string().uuid().optional();

export const financeiroListQuerySchema = z
  .object({
    page: z.number().int().min(1).optional(),
    limit: z.number().int().min(1).max(100).optional(),
    categoriaId: optionalUuidSchema,
    clienteId: optionalUuidSchema,
    agendamentoId: optionalUuidSchema,
    tipo: tipoMovimentacaoFinanceiraSchema.optional(),
    status: statusPagamentoFinanceiroSchema.optional(),
    orderBy: z
      .enum([
        "dataMovimentacao",
        "createdAt",
        "updatedAt",
        "valor",
        "status",
        "tipo",
        "descricao",
      ])
      .optional(),
    orderDirection: z.enum(["asc", "desc"]).optional(),
  })
  .strict();

export const financeiroPeriodoQuerySchema = z
  .object({
    dataInicio: z.string().min(1).optional(),
    dataFim: z.string().min(1).optional(),
  })
  .strict();

export const financeiroResumoSchema = z
  .object({
    receitas: z.number(),
    despesas: z.number(),
    saldo: z.number(),
  })
  .strict();
