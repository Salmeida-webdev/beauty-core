"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { ConfiguracaoFidelidadePayload } from "../forms/configuracao-fidelidade-form.schema";
import type { NivelFidelidadePayload } from "../forms/nivel-fidelidade-form.schema";
import { fidelidadeQueryKeys } from "../queries/fidelidade-query-keys";
import { fidelidadeProgramaApi } from "../services/fidelidade-programa-api";

type Options = {
  readConfiguracao: boolean;
  readNiveis: boolean;
};

export function useFidelidadePrograma({
  readConfiguracao,
  readNiveis,
}: Options) {
  const queryClient = useQueryClient();

  const configuracaoQuery = useQuery({
    queryKey: fidelidadeQueryKeys.configuracao(),
    queryFn: fidelidadeProgramaApi.getConfiguracao,
    enabled: readConfiguracao,
  });

  const niveisQuery = useQuery({
    queryKey: fidelidadeQueryKeys.niveis(),
    queryFn: fidelidadeProgramaApi.getNiveis,
    enabled: readNiveis,
  });

  const createConfiguracaoMutation = useMutation({
    mutationFn: (payload: ConfiguracaoFidelidadePayload) =>
      fidelidadeProgramaApi.createConfiguracao(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: fidelidadeQueryKeys.configuracao(),
      });
    },
  });

  const updateConfiguracaoMutation = useMutation({
    mutationFn: (payload: ConfiguracaoFidelidadePayload) =>
      fidelidadeProgramaApi.updateConfiguracao(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: fidelidadeQueryKeys.configuracao(),
      });
    },
  });

  const createNivelMutation = useMutation({
    mutationFn: (payload: NivelFidelidadePayload) =>
      fidelidadeProgramaApi.createNivel(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: fidelidadeQueryKeys.niveis(),
      });
    },
  });

  const updateNivelMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: NivelFidelidadePayload;
    }) =>
      fidelidadeProgramaApi.updateNivel(id, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: fidelidadeQueryKeys.niveis(),
      });
    },
  });

  const removeNivelMutation = useMutation({
    mutationFn: fidelidadeProgramaApi.removeNivel,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: fidelidadeQueryKeys.niveis(),
      });
    },
  });

  return {
    configuracaoQuery,
    niveisQuery,
    createConfiguracaoMutation,
    updateConfiguracaoMutation,
    createNivelMutation,
    updateNivelMutation,
    removeNivelMutation,
  };
}
