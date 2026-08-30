import { getApiClient } from "@/services/api/api-client";

import {
  beneficiosSchema,
  configuracaoFidelidadeSchema,
  cuponsSchema,
  fidelidadeSchema,
  historicoPontosSchema,
  niveisFidelidadeSchema,
} from "../schemas/fidelidade.schemas";

export const fidelidadeApi = {
  async getSaldo(clienteId: string) {
    const response = await getApiClient().get(
      `/fidelidade/cliente/${encodeURIComponent(clienteId)}`,
    );

    return fidelidadeSchema.parse(response.data);
  },

  async getHistorico(clienteId: string) {
    const response = await getApiClient().get(
      `/fidelidade/historico/${encodeURIComponent(clienteId)}`,
    );

    return historicoPontosSchema.parse(response.data);
  },

  async getConfiguracao() {
    const response = await getApiClient().get("/configuracao-fidelidade");

    return configuracaoFidelidadeSchema.parse(response.data);
  },

  async getNiveis() {
    const response = await getApiClient().get("/niveis-fidelidade");

    return niveisFidelidadeSchema.parse(response.data);
  },

  async getBeneficios() {
    const response = await getApiClient().get("/beneficios");

    return beneficiosSchema.parse(response.data);
  },

  async getCupons() {
    const response = await getApiClient().get("/cupons");

    return cuponsSchema.parse(response.data);
  },
};
