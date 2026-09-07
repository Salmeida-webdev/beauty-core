"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { financeiroKeys } from "@/features/financeiro/queries/financeiro-keys";
import {
  movimentacaoFinanceiraQueryOptions,
  movimentacoesFinanceirasQueryOptions,
} from "@/features/financeiro/queries/movimentacoes-financeiras-query-options";
import {
  cancelarMovimentacaoFinanceira,
  createMovimentacaoFinanceira,
  pagarMovimentacaoFinanceira,
  updateMovimentacaoFinanceira,
} from "@/features/financeiro/services/movimentacoes-financeiras-api";
import type {
  CreateMovimentacaoFinanceiraPayload,
  FinanceiroListQuery,
  PagarMovimentacaoFinanceiraPayload,
  UpdateMovimentacaoFinanceiraPayload,
} from "@/features/financeiro/types/financeiro.types";

function movimentacoesRootKey() {
  return financeiroKeys.movimentacoes().slice(0, 2);
}

async function invalidateMovimentacao(
  queryClient: ReturnType<typeof useQueryClient>,
  id?: string,
) {
  const tasks = [
    queryClient.invalidateQueries({
      queryKey: movimentacoesRootKey(),
    }),
  ];

  if (id) {
    tasks.push(
      queryClient.invalidateQueries({
        queryKey: financeiroKeys.detalhe(id),
      }),
    );
  }

  await Promise.all(tasks);
}

export function useMovimentacoesFinanceiras(query: FinanceiroListQuery = {}) {
  return useQuery(movimentacoesFinanceirasQueryOptions(query));
}

export function useMovimentacaoFinanceira(id: string) {
  return useQuery(movimentacaoFinanceiraQueryOptions(id));
}

export function useCriarMovimentacaoFinanceira() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMovimentacaoFinanceiraPayload) =>
      createMovimentacaoFinanceira(payload),
    retry: false,
    onSuccess: async () => {
      await invalidateMovimentacao(queryClient);
    },
  });
}

export function useAtualizarMovimentacaoFinanceira() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateMovimentacaoFinanceiraPayload;
    }) => updateMovimentacaoFinanceira(id, payload),
    retry: false,
    onSuccess: async (_, variables) => {
      await invalidateMovimentacao(queryClient, variables.id);
    },
  });
}

export function usePagarMovimentacaoFinanceira() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: PagarMovimentacaoFinanceiraPayload;
    }) => pagarMovimentacaoFinanceira(id, payload),
    retry: false,
    onSuccess: async (_, variables) => {
      await invalidateMovimentacao(queryClient, variables.id);
    },
  });
}

export function useCancelarMovimentacaoFinanceira() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelarMovimentacaoFinanceira(id),
    retry: false,
    onSuccess: async (_, id) => {
      await invalidateMovimentacao(queryClient, id);
    },
  });
}
