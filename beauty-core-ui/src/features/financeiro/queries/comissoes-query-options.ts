import { queryOptions } from "@tanstack/react-query";

import { comissoesKeys } from "@/features/financeiro/queries/financeiro-keys";
import {
  getComissao,
  listComissoes,
} from "@/features/financeiro/services/comissoes-api";

export function comissoesQueryOptions() {
  return queryOptions({
    queryKey: [...comissoesKeys.all, "list"] as const,
    queryFn: listComissoes,
  });
}

export function comissaoQueryOptions(id: string) {
  return queryOptions({
    queryKey: [...comissoesKeys.all, "detail", id] as const,
    queryFn: () => getComissao(id),
    enabled: Boolean(id),
  });
}
