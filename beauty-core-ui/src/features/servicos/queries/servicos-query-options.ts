import { queryOptions } from "@tanstack/react-query";

import { servicosKeys } from "@/features/servicos/queries/servicos-keys";
import { servicosApi } from "@/features/servicos/services/servicos-api";

export const SERVICOS_STALE_TIME = {
  list: 30_000,
  detail: 60_000,
} as const;

export const servicosQueryOptions = {
  list: (enabled: boolean) =>
    queryOptions({
      queryKey: servicosKeys.list(),
      queryFn: servicosApi.list,
      enabled,
      staleTime: SERVICOS_STALE_TIME.list,
      retry: false,
    }),

  detail: (servicoId: string, enabled: boolean) =>
    queryOptions({
      queryKey: servicosKeys.detail(servicoId),
      queryFn: () => servicosApi.detail(servicoId),
      enabled: enabled && servicoId.length > 0,
      staleTime: SERVICOS_STALE_TIME.detail,
      retry: false,
    }),
} as const;
