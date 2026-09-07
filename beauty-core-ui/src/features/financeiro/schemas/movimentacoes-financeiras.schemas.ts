import { z } from "zod";

import {
  formaPagamentoFinanceiroSchema,
  statusPagamentoFinanceiroSchema,
  tipoCategoriaFinanceiraSchema,
  tipoMovimentacaoFinanceiraSchema,
} from "@/features/financeiro/schemas/financeiro.schemas";

const valorFinanceiroSchema = z.union([
  z.number().finite(),
  z.string().regex(/^-?\d+(?:\.\d+)?$/),
]);

const categoriaRelacionadaSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  tipo: tipoCategoriaFinanceiraSchema,
  ativo: z.boolean().optional(),
});

const clienteRelacionadoSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
});

const agendamentoRelacionadoSchema = z.object({
  id: z.string().uuid(),
});

export const movimentacaoFinanceiraSchema = z.object({
  id: z.string().uuid(),
  categoriaId: z.string().uuid(),
  clienteId: z.string().uuid().nullable().optional(),
  agendamentoId: z.string().uuid().nullable().optional(),
  descricao: z.string(),
  tipo: tipoMovimentacaoFinanceiraSchema,
  valor: valorFinanceiroSchema,
  formaPagamento: formaPagamentoFinanceiroSchema,
  status: statusPagamentoFinanceiroSchema,
  dataMovimentacao: z.string(),
  observacoes: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  categoria: categoriaRelacionadaSchema.nullable().optional(),
  cliente: clienteRelacionadoSchema.nullable().optional(),
  agendamento: agendamentoRelacionadoSchema.nullable().optional(),
});

export const movimentacoesFinanceirasPageSchema = z.object({
  data: z.array(movimentacaoFinanceiraSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative().optional(),
});
