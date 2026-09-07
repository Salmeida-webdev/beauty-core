import { getApiClient } from "@/services/api/api-client";

import type {
  AdicionarPontosPayload,
  PontuarPorValorPayload,
  ResgatarPontosPayload,
} from "./fidelidade-operacoes.schema";

export const fidelidadeOperacoesApi = {
  async adicionarPontos(
    payload: AdicionarPontosPayload,
  ): Promise<void> {
    await getApiClient().post(
      "/fidelidade/adicionar-pontos",
      payload,
    );
  },

  async resgatarPontos(
    payload: ResgatarPontosPayload,
  ): Promise<void> {
    await getApiClient().post(
      "/fidelidade/resgatar-pontos",
      payload,
    );
  },

  async pontuarPorValor(
    payload: PontuarPorValorPayload,
  ): Promise<void> {
    await getApiClient().post(
      "/fidelidade/pontuar-por-valor",
      payload,
    );
  },
};
