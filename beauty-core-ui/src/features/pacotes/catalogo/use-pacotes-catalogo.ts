"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { pacotesQueryKeys } from "../queries/pacotes-query-keys";
import type { PacotePayload } from "./pacote-form.schema";
import { pacotesCatalogoApi } from "./pacotes-catalogo-api";

type Options = {
  enabled: boolean;
};

export function usePacotesCatalogo({
  enabled,
}: Options) {
  const queryClient =
    useQueryClient();

  const query = useQuery({
    queryKey: pacotesQueryKeys.all,
    queryFn:
      pacotesCatalogoApi.list,
    enabled,
    retry: false,
  });

  const createMutation =
    useMutation({
      mutationFn: (
        payload: PacotePayload,
      ) =>
        pacotesCatalogoApi.create(
          payload,
        ),

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: pacotesQueryKeys.all,
        });
      },
    });

  const updateMutation =
    useMutation({
      mutationFn: ({
        id,
        payload,
      }: {
        id: string;
        payload: PacotePayload;
      }) =>
        pacotesCatalogoApi.update(
          id,
          payload,
        ),

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: pacotesQueryKeys.all,
        });
      },
    });

  const inativarMutation =
    useMutation({
      mutationFn:
        pacotesCatalogoApi.inativar,

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: pacotesQueryKeys.all,
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
