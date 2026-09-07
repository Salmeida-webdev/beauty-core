import {
  createProfissionalPayloadSchema,
  profissionalSchema,
  profissionaisListParamsSchema,
  profissionaisListResponseSchema,
  updateProfissionalPayloadSchema,
} from "@/features/profissionais/schemas/profissionais.schemas";
import type {
  CreateProfissionalPayload,
  Profissional,
  ProfissionaisListParams,
  ProfissionaisListResponse,
  UpdateProfissionalPayload,
} from "@/features/profissionais/types/profissionais.types";
import { getApiClient } from "@/services/api/api-client";

function buildProfissionaisRequestParams(params: ProfissionaisListParams = {}) {
  const parsed = profissionaisListParamsSchema.parse(params);

  return {
    page: parsed.page,
    limit: parsed.limit,
    ...(parsed.search ? { search: parsed.search } : {}),
    orderBy: parsed.orderBy,
    orderDirection: parsed.orderDirection,
    role: "PROFISSIONAL" as const,
  };
}

export async function getProfissionais(
  params: ProfissionaisListParams = {},
): Promise<ProfissionaisListResponse> {
  const response = await getApiClient().get<unknown>("/usuarios", {
    params: buildProfissionaisRequestParams(params),
  });

  return profissionaisListResponseSchema.parse(response.data);
}

export async function getProfissionalById(
  profissionalId: string,
): Promise<Profissional> {
  const response = await getApiClient().get<unknown>(
    `/usuarios/${profissionalId}`,
  );

  return profissionalSchema.parse(response.data);
}

export async function createProfissional(
  payload: CreateProfissionalPayload,
): Promise<Profissional> {
  const safePayload = createProfissionalPayloadSchema.parse(payload);

  const response = await getApiClient().post<unknown>("/usuarios", {
    ...safePayload,
    role: "PROFISSIONAL",
  });

  return profissionalSchema.parse(response.data);
}

export async function updateProfissional(
  profissionalId: string,
  payload: UpdateProfissionalPayload,
): Promise<Profissional> {
  const safePayload = updateProfissionalPayloadSchema.parse(payload);

  const response = await getApiClient().patch<unknown>(
    `/usuarios/${profissionalId}`,
    safePayload,
  );

  return profissionalSchema.parse(response.data);
}

export async function inativarProfissional(
  profissionalId: string,
): Promise<Profissional> {
  const response = await getApiClient().patch<unknown>(
    `/usuarios/${profissionalId}/inativar`,
  );

  return profissionalSchema.parse(response.data);
}

export const profissionaisApi = {
  list: getProfissionais,
  detail: getProfissionalById,
  create: createProfissional,
  update: updateProfissional,
  inactivate: inativarProfissional,
} as const;
