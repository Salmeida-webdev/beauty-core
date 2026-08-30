import { getApiClient } from "@/services/api/api-client";

import { beneficiosSchema } from "../schemas/fidelidade.schemas";
import type { BeneficioPayload } from "./beneficio-form.schema";

function parseBeneficio(value: unknown) {
  const parsed = beneficiosSchema.parse([value]);

  return parsed[0];
}

export const beneficiosApi = {
  async list() {
    const response = await getApiClient().get("/beneficios");

    return beneficiosSchema.parse(response.data);
  },

  async getById(id: string) {
    const response = await getApiClient().get(
      `/beneficios/${encodeURIComponent(id)}`,
    );

    return parseBeneficio(response.data);
  },

  async create(payload: BeneficioPayload) {
    const response = await getApiClient().post(
      "/beneficios",
      payload,
    );

    return parseBeneficio(response.data);
  },

  async update(
    id: string,
    payload: BeneficioPayload,
  ) {
    const response = await getApiClient().patch(
      `/beneficios/${encodeURIComponent(id)}`,
      payload,
    );

    return parseBeneficio(response.data);
  },

  async inativar(id: string) {
    const response = await getApiClient().patch(
      `/beneficios/${encodeURIComponent(id)}/inativar`,
    );

    return parseBeneficio(response.data);
  },
};
