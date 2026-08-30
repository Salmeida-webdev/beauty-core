import { getApiClient } from "@/services/api/api-client";

import {
  clientePacoteSchema,
  clientesPacotesSchema,
  pacoteSchema,
  pacotesSchema,
} from "../schemas/pacotes.schemas";

export const pacotesApi = {
  async getPacotes() {
    const response = await getApiClient().get("/pacotes");

    return pacotesSchema.parse(response.data);
  },

  async getPacote(id: string) {
    const response = await getApiClient().get(
      `/pacotes/${encodeURIComponent(id)}`,
    );

    return pacoteSchema.parse(response.data);
  },

  async getClientesPacotes() {
    const response = await getApiClient().get("/clientes-pacotes");

    return clientesPacotesSchema.parse(response.data);
  },

  async getClientePacotes(clienteId: string) {
    const response = await getApiClient().get(
      `/clientes-pacotes/cliente/${encodeURIComponent(clienteId)}`,
    );

    return clientesPacotesSchema.parse(response.data);
  },

  async parseClientePacoteResponse(value: unknown) {
    return clientePacoteSchema.parse(value);
  },
};
