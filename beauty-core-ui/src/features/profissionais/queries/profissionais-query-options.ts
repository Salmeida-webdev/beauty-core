import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { profissionaisKeys } from "@/features/profissionais/queries/profissionais-keys";
import { profissionaisApi } from "@/features/profissionais/services/profissionais-api";
import type { ProfissionaisListParams } from "@/features/profissionais/types/profissionais.types";

export const PROFISSIONAIS_STALE_TIME = {
  list: 30_000,
  detail: 60_000,
} as const;

export const profissionaisQueryOptions = {
  list: (params: ProfissionaisListParams, enabled: boolean) =>
    queryOptions({
      queryKey: profissionaisKeys.list(params),
      queryFn: () => profissionaisApi.list(params),
      enabled,
      staleTime: PROFISSIONAIS_STALE_TIME.list,
      retry: false,
      placeholderData: keepPreviousData,
    }),

  detail: (profissionalId: string, enabled: boolean) =>
    queryOptions({
      queryKey: profissionaisKeys.detail(profissionalId),
      queryFn: () => profissionaisApi.detail(profissionalId),
      enabled: enabled && profissionalId.length > 0,
      staleTime: PROFISSIONAIS_STALE_TIME.detail,
      retry: false,
    }),
} as const;
