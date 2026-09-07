import {
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import {
  clientesKeys,
} from "@/features/clientes/queries/clientes-keys";
import {
  clientesApi,
} from "@/features/clientes/services/clientes-api";
import type {
  ClientesListParams,
} from "@/features/clientes/types/clientes.types";

export const CLIENTES_STALE_TIME = {
  list: 30_000,
  detail: 60_000,
} as const;

export const clientesQueryOptions = {
  list: (
    params: ClientesListParams,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        clientesKeys.list(params),
      queryFn: () =>
        clientesApi.list(params),
      enabled,
      staleTime:
        CLIENTES_STALE_TIME.list,
      retry: false,
      placeholderData:
        keepPreviousData,
    }),

  detail: (
    clienteId: string,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        clientesKeys.detail(clienteId),
      queryFn: () =>
        clientesApi.detail(clienteId),
      enabled:
        enabled && clienteId.length > 0,
      staleTime:
        CLIENTES_STALE_TIME.detail,
      retry: false,
    }),
} as const;
