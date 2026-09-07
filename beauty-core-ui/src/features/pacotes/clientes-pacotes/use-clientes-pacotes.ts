"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { clienteProfileKeys } from "@/features/clientes/queries/cliente-profile-keys";

import type { CreateClientePacotePayload } from "./cliente-pacote-form.schema";
import { clientesPacotesApi } from "./clientes-pacotes-api";

type Options = {
  clienteId: string;
  enabled: boolean;
};

export function useClientesPacotes({
  clienteId,
  enabled,
}: Options) {
  const queryClient =
    useQueryClient();

  const query = useQuery({
    queryKey:
      clienteProfileKeys.pacotes(
        clienteId,
      ),

    queryFn: () =>
      clientesPacotesApi.byCliente(
        clienteId,
      ),

    enabled:
      enabled &&
      clienteId.length > 0,

    retry: false,
  });

  const createMutation =
    useMutation({
      mutationFn: (
        payload:
          CreateClientePacotePayload,
      ) =>
        clientesPacotesApi.create(
          payload,
        ),

      onSuccess: async (
        _result,
        payload,
      ) => {
        await queryClient.invalidateQueries({
          queryKey:
            clienteProfileKeys.pacotes(
              payload.clienteId,
            ),
        });
      },
    });

  const usarSessaoMutation =
    useMutation({
      mutationFn: ({
        id,
      }: {
        id: string;
        clienteId: string;
      }) =>
        clientesPacotesApi.usarSessao(
          id,
        ),

      onSettled: async (
        _result,
        _error,
        variables,
      ) => {
        if (!variables) {
          return;
        }

        await queryClient.invalidateQueries({
          queryKey:
            clienteProfileKeys.pacotes(
              variables.clienteId,
            ),
        });
      },
    });
  const cancelarMutation =
    useMutation({
      mutationFn: ({
        id,
      }: {
        id: string;
        clienteId: string;
      }) =>
        clientesPacotesApi.cancelar(
          id,
        ),

      onSuccess: async (
        _result,
        variables,
      ) => {
        await queryClient.invalidateQueries({
          queryKey:
            clienteProfileKeys.pacotes(
              variables.clienteId,
            ),
        });
      },
    });

  return {
    query,
    createMutation,
    usarSessaoMutation,
    cancelarMutation,
  };
}
