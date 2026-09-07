"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { fidelidadeQueryKeys } from "../queries/fidelidade-query-keys";
import type { CupomPayload } from "./cupom-form.schema";
import { cupomValidationConsumesUsage } from "./cupom-validation-contract";
import { cuponsApi } from "./cupons-api";

type Options = {
  enabled: boolean;
};

export function useCupons({
  enabled,
}: Options) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey:
      fidelidadeQueryKeys.cupons(),
    queryFn: cuponsApi.list,
    enabled,
  });

  const createMutation = useMutation({
    mutationFn: (
      payload: CupomPayload,
    ) => cuponsApi.create(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          fidelidadeQueryKeys.cupons(),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: CupomPayload;
    }) =>
      cuponsApi.update(
        id,
        payload,
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          fidelidadeQueryKeys.cupons(),
      });
    },
  });

  const inativarMutation = useMutation({
    mutationFn: cuponsApi.inativar,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          fidelidadeQueryKeys.cupons(),
      });
    },
  });

  const validarMutation = useMutation({
    mutationFn: cuponsApi.validar,

    onSuccess: async () => {
      if (
        cupomValidationConsumesUsage
      ) {
        await queryClient.invalidateQueries({
          queryKey:
            fidelidadeQueryKeys.cupons(),
        });
      }
    },
  });

  return {
    query,
    createMutation,
    updateMutation,
    inativarMutation,
    validarMutation,
  };
}
