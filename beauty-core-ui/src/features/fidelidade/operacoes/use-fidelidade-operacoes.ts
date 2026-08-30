"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { fidelidadeQueryKeys } from "../queries/fidelidade-query-keys";
import { fidelidadeOperacoesApi } from "./fidelidade-operacoes-api";
import type {
  AdicionarPontosPayload,
  PontuarPorValorPayload,
  ResgatarPontosPayload,
} from "./fidelidade-operacoes.schema";

export function useFidelidadeOperacoes(
  clienteId: string,
) {
  const queryClient = useQueryClient();

  async function invalidateCliente() {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey:
          fidelidadeQueryKeys.saldo(
            clienteId,
          ),
      }),

      queryClient.invalidateQueries({
        queryKey:
          fidelidadeQueryKeys.historico(
            clienteId,
          ),
      }),
    ]);
  }

  const adicionarMutation = useMutation({
    mutationFn: (
      payload: AdicionarPontosPayload,
    ) =>
      fidelidadeOperacoesApi.adicionarPontos(
        payload,
      ),

    onSuccess: invalidateCliente,
  });

  const resgatarMutation = useMutation({
    mutationFn: (
      payload: ResgatarPontosPayload,
    ) =>
      fidelidadeOperacoesApi.resgatarPontos(
        payload,
      ),

    onSuccess: invalidateCliente,
  });

  const pontuarMutation = useMutation({
    mutationFn: (
      payload: PontuarPorValorPayload,
    ) =>
      fidelidadeOperacoesApi.pontuarPorValor(
        payload,
      ),

    onSuccess: invalidateCliente,
  });

  return {
    adicionarMutation,
    resgatarMutation,
    pontuarMutation,
  };
}
