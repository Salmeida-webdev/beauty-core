import {
  createUsuarioPayloadSchema,
  updateUsuarioPayloadSchema,
  usuarioSchema,
  usuariosListParamsSchema,
  usuariosListResponseSchema,
} from "@/features/usuarios/schemas/usuarios.schemas";
import type {
  CreateUsuarioPayload,
  UpdateUsuarioPayload,
  UsuarioAdministrativo,
  UsuariosListParams,
  UsuariosListResponse,
} from "@/features/usuarios/types/usuarios.types";
import { getApiClient } from "@/services/api/api-client";

export function buildUsuariosRequestParams(params: UsuariosListParams = {}) {
  const parsed = usuariosListParamsSchema.parse(params);

  return {
    page: parsed.page,
    limit: parsed.limit,
    ...(parsed.search ? { search: parsed.search } : {}),
    orderBy: parsed.orderBy,
    orderDirection: parsed.orderDirection,
    ...(parsed.role ? { role: parsed.role } : {}),
  };
}

export async function getUsuarios(
  params: UsuariosListParams = {},
): Promise<UsuariosListResponse> {
  const response = await getApiClient().get<unknown>("/usuarios", {
    params: buildUsuariosRequestParams(params),
  });

  return usuariosListResponseSchema.parse(response.data);
}

export async function getUsuarioById(
  usuarioId: string,
): Promise<UsuarioAdministrativo> {
  const response = await getApiClient().get<unknown>(`/usuarios/${usuarioId}`);

  return usuarioSchema.parse(response.data);
}

export async function createUsuario(
  payload: CreateUsuarioPayload,
): Promise<UsuarioAdministrativo> {
  const safePayload = createUsuarioPayloadSchema.parse(payload);

  const response = await getApiClient().post<unknown>("/usuarios", safePayload);

  return usuarioSchema.parse(response.data);
}

export async function updateUsuario(
  usuarioId: string,
  payload: UpdateUsuarioPayload,
): Promise<UsuarioAdministrativo> {
  const safePayload = updateUsuarioPayloadSchema.parse(payload);

  const response = await getApiClient().patch<unknown>(
    `/usuarios/${usuarioId}`,
    safePayload,
  );

  return usuarioSchema.parse(response.data);
}

export async function inativarUsuario(
  usuarioId: string,
): Promise<UsuarioAdministrativo> {
  const response = await getApiClient().patch<unknown>(
    `/usuarios/${usuarioId}/inativar`,
  );

  return usuarioSchema.parse(response.data);
}

export const usuariosApi = {
  list: getUsuarios,
  detail: getUsuarioById,
  create: createUsuario,
  update: updateUsuario,
  inactivate: inativarUsuario,
} as const;
