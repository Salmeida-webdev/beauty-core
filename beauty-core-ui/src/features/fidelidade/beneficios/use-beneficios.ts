"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { fidelidadeQueryKeys } from "../queries/fidelidade-query-keys";
import type { BeneficioPayload } from "./beneficio-form.schema";
import { beneficiosApi } from "./beneficios-api";

type Options = {
  enabled: boolean;
};

export function useBeneficios({
  enabled,
}: Options) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: fidelidadeQueryKeys.beneficios(),
    queryFn: beneficiosApi.list,
    enabled,
  });

  const createMutation = useMutation({
    mutationFn: (
      payload: BeneficioPayload,
    ) => beneficiosApi.create(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          fidelidadeQueryKeys.beneficios(),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: BeneficioPayload;
    }) =>
      beneficiosApi.update(
        id,
        payload,
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          fidelidadeQueryKeys.beneficios(),
      });
    },
  });

  const inativarMutation = useMutation({
    mutationFn: beneficiosApi.inativar,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          fidelidadeQueryKeys.beneficios(),
      });
    },
  });

  return {
    query,
    createMutation,
    updateMutation,
    inativarMutation,
  };
}
