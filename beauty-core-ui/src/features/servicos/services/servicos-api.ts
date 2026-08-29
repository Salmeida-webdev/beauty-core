import {
  createServicoPayloadSchema,
  servicoSchema,
  servicosListResponseSchema,
  updateServicoPayloadSchema,
} from "@/features/servicos/schemas/servicos.schemas";
import type {
  CreateServicoPayload,
  Servico,
  UpdateServicoPayload,
} from "@/features/servicos/types/servicos.types";
import { getApiClient } from "@/services/api/api-client";

export async function getServicos(): Promise<Servico[]> {
  const response = await getApiClient().get<unknown>("/servicos");

  return servicosListResponseSchema.parse(response.data);
}

export async function getServicoById(servicoId: string): Promise<Servico> {
  const response = await getApiClient().get<unknown>(`/servicos/${servicoId}`);

  return servicoSchema.parse(response.data);
}

export async function createServico(
  payload: CreateServicoPayload,
): Promise<Servico> {
  const safePayload = createServicoPayloadSchema.parse(payload);

  const response = await getApiClient().post<unknown>("/servicos", safePayload);

  return servicoSchema.parse(response.data);
}

export async function updateServico(
  servicoId: string,
  payload: UpdateServicoPayload,
): Promise<Servico> {
  const safePayload = updateServicoPayloadSchema.parse(payload);

  const response = await getApiClient().patch<unknown>(
    `/servicos/${servicoId}`,
    safePayload,
  );

  return servicoSchema.parse(response.data);
}

export async function inativarServico(servicoId: string): Promise<Servico> {
  const response = await getApiClient().patch<unknown>(
    `/servicos/${servicoId}/inativar`,
  );

  return servicoSchema.parse(response.data);
}

export const servicosApi = {
  list: getServicos,
  detail: getServicoById,
  create: createServico,
  update: updateServico,
  inactivate: inativarServico,
} as const;
