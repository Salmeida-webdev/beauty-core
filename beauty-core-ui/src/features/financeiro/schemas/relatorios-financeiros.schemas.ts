import { z } from "zod";

import { movimentacaoFinanceiraSchema } from "@/features/financeiro/schemas/movimentacoes-financeiras.schemas";

export const resumoFinanceiroOperacionalSchema = z.object({
  receitas: z.number().finite(),
  despesas: z.number().finite(),
  saldo: z.number().finite(),
});

export const fluxoCaixaFinanceiroSchema = z.object({
  totalEntradas: z.number().finite(),
  totalSaidas: z.number().finite(),
  saldo: z.number().finite(),
  movimentacoes: z.array(movimentacaoFinanceiraSchema),
});

export const totalFinanceiroMesSchema = z.object({
  total: z.number().finite(),
});

export type ResumoFinanceiroOperacional = z.infer<
  typeof resumoFinanceiroOperacionalSchema
>;

export type FluxoCaixaFinanceiro = z.infer<typeof fluxoCaixaFinanceiroSchema>;

export type TotalFinanceiroMes = z.infer<typeof totalFinanceiroMesSchema>;
