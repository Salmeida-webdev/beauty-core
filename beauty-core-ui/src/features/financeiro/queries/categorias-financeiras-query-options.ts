import { queryOptions } from "@tanstack/react-query";

import { financeiroKeys } from "@/features/financeiro/queries/financeiro-keys";
import {
  getCategoriaFinanceira,
  listCategoriasFinanceiras,
} from "@/features/financeiro/services/categorias-financeiras-api";

export function categoriasFinanceirasQueryOptions() {
  return queryOptions({
    queryKey: financeiroKeys.categorias(),
    queryFn: listCategoriasFinanceiras,
  });
}

export function categoriaFinanceiraQueryOptions(id: string) {
  return queryOptions({
    queryKey: financeiroKeys.categoria(id),
    queryFn: () => getCategoriaFinanceira(id),
    enabled: Boolean(id),
  });
}
