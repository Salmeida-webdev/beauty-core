import { queryOptions } from "@tanstack/react-query";

import { financeiroKeys } from "@/features/financeiro/queries/financeiro-keys";
import {
  getMovimentacaoFinanceira,
  listMovimentacoesFinanceiras,
} from "@/features/financeiro/services/movimentacoes-financeiras-api";
import type { FinanceiroListQuery } from "@/features/financeiro/types/financeiro.types";

export function movimentacoesFinanceirasQueryOptions(
  query: FinanceiroListQuery = {},
) {
  return queryOptions({
    queryKey: financeiroKeys.movimentacoes(query),
    queryFn: () => listMovimentacoesFinanceiras(query),
  });
}

export function movimentacaoFinanceiraQueryOptions(id: string) {
  return queryOptions({
    queryKey: financeiroKeys.detalhe(id),
    queryFn: () => getMovimentacaoFinanceira(id),
    enabled: Boolean(id),
  });
}
