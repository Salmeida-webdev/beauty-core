import { getApiClient } from "@/services/api/api-client";

import { cuponsSchema } from "../schemas/fidelidade.schemas";
import type { CupomPayload } from "./cupom-form.schema";

function parseCupom(
  value: unknown,
) {
  const parsed = cuponsSchema.parse([value]);
  const cupom = parsed[0];

  if (!cupom) {
    throw new Error(
      "Resposta de cupom vazia.",
    );
  }

  return cupom;
}

export const cuponsApi = {
  async list() {
    const response = await getApiClient().get(
      "/cupons",
    );

    return cuponsSchema.parse(
      response.data,
    );
  },

  async getById(id: string) {
    const response = await getApiClient().get(
      `/cupons/${encodeURIComponent(id)}`,
    );

    return parseCupom(
      response.data,
    );
  },

  async create(
    payload: CupomPayload,
  ) {
    const response = await getApiClient().post(
      "/cupons",
      payload,
    );

    return parseCupom(
      response.data,
    );
  },

  async update(
    id: string,
    payload: CupomPayload,
  ) {
    const response = await getApiClient().patch(
      `/cupons/${encodeURIComponent(id)}`,
      payload,
    );

    return parseCupom(
      response.data,
    );
  },

  async inativar(id: string) {
    const response = await getApiClient().patch(
      `/cupons/${encodeURIComponent(id)}/inativar`,
    );

    return parseCupom(
      response.data,
    );
  },

  async validar(codigo: string) {
    await getApiClient().post(
      "/cupons/validar",
      {
        codigo,
      },
    );
  },
};
