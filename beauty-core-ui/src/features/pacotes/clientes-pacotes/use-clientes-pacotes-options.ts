"use client";

import { useQuery } from "@tanstack/react-query";

import { useDebouncedValue } from "@/features/clientes/hooks/use-debounced-value";
import { clientesQueryOptions } from "@/features/clientes/queries/clientes-query-options";

import { pacotesCatalogoApi } from "../catalogo/pacotes-catalogo-api";
import { pacotesQueryKeys } from "../queries/pacotes-query-keys";

type Options = {
  search: string;
  clienteId: string;
  canReadClients: boolean;
  canReadCatalog: boolean;
};

export function useClientesPacotesOptions({
  search,
  clienteId,
  canReadClients,
  canReadCatalog,
}: Options) {
  const debouncedSearch =
    useDebouncedValue(search);

  const normalizedSearch =
    debouncedSearch.trim();

  const clientesQuery =
    useQuery(
      clientesQueryOptions.list(
        {
          page: 1,
          limit: 20,

          ...(normalizedSearch
            ? {
                search:
                  normalizedSearch,
              }
            : {}),

          orderBy: "nome",
          orderDirection: "asc",
        },
        canReadClients,
      ),
    );

  const clienteQuery =
    useQuery(
      clientesQueryOptions.detail(
        clienteId,
        canReadClients &&
          clienteId.length > 0,
      ),
    );

  const pacotesQuery = useQuery({
    queryKey:
      pacotesQueryKeys.all,

    queryFn:
      pacotesCatalogoApi.list,

    enabled:
      canReadCatalog,

    retry: false,
  });

  return {
    clientesQuery,
    clienteQuery,
    pacotesQuery,
  };
}
