import {
  createUnidadePayloadSchema,
  unidadeSchema,
  unidadesListResponseSchema,
  updateUnidadePayloadSchema,
} from "@/features/unidades/schemas/unidades.schemas";
import type {
  CreateUnidadePayload,
  Unidade,
  UpdateUnidadePayload,
} from "@/features/unidades/types/unidades.types";
import { getApiClient } from "@/services/api/api-client";

export async function getUnidades(): Promise<Unidade[]> {
  const response = await getApiClient().get<unknown>("/unidades");

  return unidadesListResponseSchema.parse(response.data);
}

export async function getUnidadeById(unidadeId: string): Promise<Unidade> {
  const response = await getApiClient().get<unknown>(`/unidades/${unidadeId}`);

  return unidadeSchema.parse(response.data);
}

export async function createUnidade(
  payload: CreateUnidadePayload,
): Promise<Unidade> {
  const safePayload = createUnidadePayloadSchema.parse(payload);

  const response = await getApiClient().post<unknown>("/unidades", safePayload);

  return unidadeSchema.parse(response.data);
}

export async function updateUnidade(
  unidadeId: string,
  payload: UpdateUnidadePayload,
): Promise<Unidade> {
  const safePayload = updateUnidadePayloadSchema.parse(payload);

  const response = await getApiClient().patch<unknown>(
    `/unidades/${unidadeId}`,
    safePayload,
  );

  return unidadeSchema.parse(response.data);
}

export async function inativarUnidade(unidadeId: string): Promise<Unidade> {
  const response = await getApiClient().patch<unknown>(
    `/unidades/${unidadeId}/inativar`,
  );

  return unidadeSchema.parse(response.data);
}

export const unidadesApi = {
  list: getUnidades,
  detail: getUnidadeById,
  create: createUnidade,
  update: updateUnidade,
  inactivate: inativarUnidade,
} as const;
