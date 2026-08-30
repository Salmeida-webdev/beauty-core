import { getApiClient } from "@/services/api/api-client";

import {
  fluxoCaixaFinanceiroSchema,
  resumoFinanceiroOperacionalSchema,
  totalFinanceiroMesSchema,
  type FluxoCaixaFinanceiro,
  type ResumoFinanceiroOperacional,
  type TotalFinanceiroMes,
} from "@/features/financeiro/schemas/relatorios-financeiros.schemas";
import { financeiroEndpoints } from "@/features/financeiro/services/financeiro-api";
import type { FinanceiroPeriodoQuery } from "@/features/financeiro/types/financeiro.types";

export function buildRelatorioFinanceiroPeriodParams(
  period: FinanceiroPeriodoQuery,
) {
  const params = new URLSearchParams();

  if (period.dataInicio) {
    params.set("dataInicio", period.dataInicio);
  }

  if (period.dataFim) {
    params.set("dataFim", period.dataFim);
  }

  return params;
}

export async function getResumoFinanceiro(
  period: FinanceiroPeriodoQuery = {},
): Promise<ResumoFinanceiroOperacional> {
  const response = await getApiClient().get<unknown>(
    financeiroEndpoints.resumo,
    {
      params: buildRelatorioFinanceiroPeriodParams(period),
    },
  );

  return resumoFinanceiroOperacionalSchema.parse(response.data);
}

export async function getFluxoCaixaFinanceiro(
  period: FinanceiroPeriodoQuery = {},
): Promise<FluxoCaixaFinanceiro> {
  const response = await getApiClient().get<unknown>(
    financeiroEndpoints.fluxoCaixa,
    {
      params: buildRelatorioFinanceiroPeriodParams(period),
    },
  );

  return fluxoCaixaFinanceiroSchema.parse(response.data);
}

export async function getReceitasMes(): Promise<TotalFinanceiroMes> {
  const response = await getApiClient().get<unknown>(
    financeiroEndpoints.receitasMes,
  );

  return totalFinanceiroMesSchema.parse(response.data);
}

export async function getDespesasMes(): Promise<TotalFinanceiroMes> {
  const response = await getApiClient().get<unknown>(
    financeiroEndpoints.despesasMes,
  );

  return totalFinanceiroMesSchema.parse(response.data);
}
