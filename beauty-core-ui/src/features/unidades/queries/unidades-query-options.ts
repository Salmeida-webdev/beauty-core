import { queryOptions } from "@tanstack/react-query";

import { unidadesKeys } from "@/features/unidades/queries/unidades-keys";
import { unidadesApi } from "@/features/unidades/services/unidades-api";

export const UNIDADES_STALE_TIME = {
  list: 30_000,
  detail: 60_000,
} as const;

export const unidadesQueryOptions = {
  list: (enabled: boolean) =>
    queryOptions({
      queryKey: unidadesKeys.list(),
      queryFn: unidadesApi.list,
      enabled,
      staleTime: UNIDADES_STALE_TIME.list,
      retry: false,
    }),

  detail: (unidadeId: string, enabled: boolean) =>
    queryOptions({
      queryKey: unidadesKeys.detail(unidadeId),
      queryFn: () => unidadesApi.detail(unidadeId),
      enabled: enabled && unidadeId.length > 0,
      staleTime: UNIDADES_STALE_TIME.detail,
      retry: false,
    }),
} as const;
