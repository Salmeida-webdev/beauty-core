"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { comissoesKeys } from "@/features/financeiro/queries/financeiro-keys";
import {
  comissaoQueryOptions,
  comissoesQueryOptions,
} from "@/features/financeiro/queries/comissoes-query-options";
import {
  createComissao,
  pagarComissao,
} from "@/features/financeiro/services/comissoes-api";
import type { CreateComissaoProfissionalPayload } from "@/features/financeiro/types/financeiro.types";

export function useComissoes() {
  return useQuery(comissoesQueryOptions());
}

export function useComissao(id: string) {
  return useQuery(comissaoQueryOptions(id));
}

export function useCriarComissao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateComissaoProfissionalPayload) =>
      createComissao(payload),
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: comissoesKeys.all,
      });
    },
  });
}

export function usePagarComissao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pagarComissao(id),
    retry: false,
    onSuccess: async (_, id) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: comissoesKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: [...comissoesKeys.all, "detail", id] as const,
        }),
      ]);
    },
  });
}
