"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { categoriasFinanceirasQueryOptions } from "@/features/financeiro/queries/categorias-financeiras-query-options";
import { financeiroKeys } from "@/features/financeiro/queries/financeiro-keys";
import {
  createCategoriaFinanceira,
  inativarCategoriaFinanceira,
  updateCategoriaFinanceira,
} from "@/features/financeiro/services/categorias-financeiras-api";
import type {
  CreateCategoriaFinanceiraPayload,
  UpdateCategoriaFinanceiraPayload,
} from "@/features/financeiro/types/financeiro.types";

export function useCategoriasFinanceiras() {
  return useQuery(categoriasFinanceirasQueryOptions());
}

export function useCriarCategoriaFinanceira() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoriaFinanceiraPayload) =>
      createCategoriaFinanceira(payload),
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: financeiroKeys.categorias(),
      });
    },
  });
}

export function useAtualizarCategoriaFinanceira() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCategoriaFinanceiraPayload;
    }) => updateCategoriaFinanceira(id, payload),
    retry: false,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: financeiroKeys.categorias(),
        }),
        queryClient.invalidateQueries({
          queryKey: financeiroKeys.categoria(variables.id),
        }),
      ]);
    },
  });
}

export function useInativarCategoriaFinanceira() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => inativarCategoriaFinanceira(id),
    retry: false,
    onSuccess: async (_, id) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: financeiroKeys.categorias(),
        }),
        queryClient.invalidateQueries({
          queryKey: financeiroKeys.categoria(id),
        }),
      ]);
    },
  });
}
