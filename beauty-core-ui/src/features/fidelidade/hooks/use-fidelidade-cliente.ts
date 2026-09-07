"use client";

import { useQuery } from "@tanstack/react-query";

import { fidelidadeQueryOptions } from "../queries/fidelidade-query-options";

export function useFidelidadeCliente(clienteId: string) {
  const saldoQuery = useQuery(
    fidelidadeQueryOptions.saldo(clienteId),
  );

  const historicoQuery = useQuery(
    fidelidadeQueryOptions.historico(clienteId),
  );

  return {
    saldoQuery,
    historicoQuery,
    isInitialLoading:
      saldoQuery.isPending || historicoQuery.isPending,
    isRefetching:
      saldoQuery.isFetching || historicoQuery.isFetching,
  };
}
