import { z } from "zod";

import { getApiClient } from "@/services/api/api-client";

import type { ConfiguracaoFidelidadePayload } from "../forms/configuracao-fidelidade-form.schema";
import type { NivelFidelidadePayload } from "../forms/nivel-fidelidade-form.schema";
import {
  configuracaoFidelidadeSchema,
  nivelFidelidadeSchema,
} from "../schemas/fidelidade.schemas";

const niveisSchema = z.array(nivelFidelidadeSchema);

export const fidelidadeProgramaApi = {
  async getConfiguracao() {
    const response = await getApiClient().get(
      "/configuracao-fidelidade",
    );

    return configuracaoFidelidadeSchema.parse(response.data);
  },

  async createConfiguracao(
    payload: ConfiguracaoFidelidadePayload,
  ) {
    const response = await getApiClient().post(
      "/configuracao-fidelidade",
      payload,
    );

    return configuracaoFidelidadeSchema.parse(response.data);
  },

  async updateConfiguracao(
    payload: ConfiguracaoFidelidadePayload,
  ) {
    const response = await getApiClient().patch(
      "/configuracao-fidelidade",
      payload,
    );

    return configuracaoFidelidadeSchema.parse(response.data);
  },

  async getNiveis() {
    const response = await getApiClient().get(
      "/niveis-fidelidade",
    );

    return niveisSchema.parse(response.data);
  },

  async createNivel(payload: NivelFidelidadePayload) {
    const response = await getApiClient().post(
      "/niveis-fidelidade",
      payload,
    );

    return nivelFidelidadeSchema.parse(response.data);
  },

  async updateNivel(
    id: string,
    payload: NivelFidelidadePayload,
  ) {
    const response = await getApiClient().patch(
      `/niveis-fidelidade/${encodeURIComponent(id)}`,
      payload,
    );

    return nivelFidelidadeSchema.parse(response.data);
  },

  async removeNivel(id: string) {
    const response = await getApiClient().delete(
      `/niveis-fidelidade/${encodeURIComponent(id)}`,
    );

    return response.data;
  },
};
