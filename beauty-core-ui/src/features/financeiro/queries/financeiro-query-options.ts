import { queryOptions } from "@tanstack/react-query";

import { financeiroKeys } from "@/features/financeiro/queries/financeiro-keys";
import type {
  FinanceiroListQuery,
  FinanceiroResumo,
} from "@/features/financeiro/types/financeiro.types";

export function financeiroResumoQueryOptions(
  queryFn: () => Promise<FinanceiroResumo>,
) {
  return queryOptions({
    queryKey: financeiroKeys.resumo(),
    queryFn,
  });
}

export function financeiroMovimentacoesQueryOptions<TData>(
  query: FinanceiroListQuery,
  queryFn: () => Promise<TData>,
) {
  return queryOptions({
    queryKey: financeiroKeys.movimentacoes(query),
    queryFn,
  });
}
