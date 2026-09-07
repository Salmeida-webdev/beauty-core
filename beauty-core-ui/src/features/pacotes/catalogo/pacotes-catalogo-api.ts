import { getApiClient } from "@/services/api/api-client";

import {
  pacoteSchema,
  pacotesSchema,
} from "../schemas/pacotes.schemas";

import type { PacotePayload } from "./pacote-form.schema";

export const pacotesCatalogoApi = {
  async list() {
    const response =
      await getApiClient().get(
        "/pacotes",
      );

    return pacotesSchema.parse(response.data);
  },

  async detail(id: string) {
    const response =
      await getApiClient().get(
        `/pacotes/${encodeURIComponent(id)}`,
      );

    return pacoteSchema.parse(
      response.data,
    );
  },

  async create(
    payload: PacotePayload,
  ) {
    const response =
      await getApiClient().post(
        "/pacotes",
        payload,
      );

    return pacoteSchema.parse(
      response.data,
    );
  },

  async update(
    id: string,
    payload: PacotePayload,
  ) {
    const response =
      await getApiClient().patch(
        `/pacotes/${encodeURIComponent(id)}`,
        payload,
      );

    return pacoteSchema.parse(
      response.data,
    );
  },

  async inativar(id: string) {
    const response =
      await getApiClient().patch(
        `/pacotes/${encodeURIComponent(id)}/inativar`,
      );

    return pacoteSchema.parse(
      response.data,
    );
  },
};
