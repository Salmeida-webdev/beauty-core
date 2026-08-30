import {
  clientePacoteSchema,
  clientesPacotesSchema,
} from "@/features/clientes/schemas/cliente-profile-extras.schemas";
import { getApiClient } from "@/services/api/api-client";

import type { CreateClientePacotePayload } from "./cliente-pacote-form.schema";

export const clientesPacotesApi = {
  async all() {
    const response =
      await getApiClient().get(
        "/clientes-pacotes",
      );

    return clientesPacotesSchema.parse(
      response.data,
    );
  },

  async byCliente(
    clienteId: string,
  ) {
    const response =
      await getApiClient().get(
        `/clientes-pacotes/cliente/${encodeURIComponent(clienteId)}`,
      );

    return clientesPacotesSchema.parse(
      response.data,
    );
  },

  async create(
    payload: CreateClientePacotePayload,
  ) {
    const response =
      await getApiClient().post(
        "/clientes-pacotes",
        payload,
      );

    return clientePacoteSchema.parse(
      response.data,
    );
  },

  async usarSessao(
    id: string,
  ) {
    const response =
      await getApiClient().patch(
        `/clientes-pacotes/${encodeURIComponent(id)}/usar-sessao`,
      );

    return clientePacoteSchema.parse(
      response.data,
    );
  },
  async cancelar(
    id: string,
  ) {
    const response =
      await getApiClient().patch(
        `/clientes-pacotes/${encodeURIComponent(id)}/cancelar`,
      );

    return clientePacoteSchema.parse(
      response.data,
    );
  },
};
