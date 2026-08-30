import { getApiClient } from "@/services/api/api-client";

import {
  movimentacaoFinanceiraSchema,
  movimentacoesFinanceirasPageSchema,
} from "@/features/financeiro/schemas/movimentacoes-financeiras.schemas";
import {
  buildFinanceiroSearchParams,
  financeiroEndpoints,
} from "@/features/financeiro/services/financeiro-api";
import type {
  CreateMovimentacaoFinanceiraPayload,
  FinanceiroListQuery,
  MovimentacaoFinanceira,
  MovimentacoesFinanceirasPage,
  PagarMovimentacaoFinanceiraPayload,
  UpdateMovimentacaoFinanceiraPayload,
} from "@/features/financeiro/types/financeiro.types";

export async function listMovimentacoesFinanceiras(
  query: FinanceiroListQuery = {},
): Promise<MovimentacoesFinanceirasPage> {
  const response = await getApiClient().get<unknown>(
    financeiroEndpoints.movimentacoes,
    {
      params: buildFinanceiroSearchParams(query),
    },
  );

  return movimentacoesFinanceirasPageSchema.parse(response.data);
}

export async function getMovimentacaoFinanceira(
  id: string,
): Promise<MovimentacaoFinanceira> {
  const response = await getApiClient().get<unknown>(
    financeiroEndpoints.movimentacao(id),
  );

  return movimentacaoFinanceiraSchema.parse(response.data);
}

export async function createMovimentacaoFinanceira(
  payload: CreateMovimentacaoFinanceiraPayload,
): Promise<MovimentacaoFinanceira> {
  const response = await getApiClient().post<unknown>(
    financeiroEndpoints.movimentacoes,
    payload,
  );

  return movimentacaoFinanceiraSchema.parse(response.data);
}

export async function updateMovimentacaoFinanceira(
  id: string,
  payload: UpdateMovimentacaoFinanceiraPayload,
): Promise<MovimentacaoFinanceira> {
  const response = await getApiClient().patch<unknown>(
    financeiroEndpoints.movimentacao(id),
    payload,
  );

  return movimentacaoFinanceiraSchema.parse(response.data);
}

export async function pagarMovimentacaoFinanceira(
  id: string,
  payload: PagarMovimentacaoFinanceiraPayload,
): Promise<MovimentacaoFinanceira> {
  const response = await getApiClient().patch<unknown>(
    financeiroEndpoints.pagarMovimentacao(id),
    payload,
  );

  return movimentacaoFinanceiraSchema.parse(response.data);
}

export async function cancelarMovimentacaoFinanceira(
  id: string,
): Promise<MovimentacaoFinanceira> {
  const response = await getApiClient().patch<unknown>(
    financeiroEndpoints.cancelarMovimentacao(id),
  );

  return movimentacaoFinanceiraSchema.parse(response.data);
}
