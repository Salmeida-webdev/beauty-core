import {
  clienteSchema,
  clientesListParamsSchema,
  clientesListResponseSchema,
} from "@/features/clientes/schemas/clientes.schemas";
import type {
  CreateClientePayload,
  UpdateClientePayload,
} from "@/features/clientes/forms/cliente-payload";
import type {
  Cliente,
  ClientesListParams,
  ClientesListResponse,
} from "@/features/clientes/types/clientes.types";
import {
  getApiClient,
} from "@/services/api/api-client";

function buildClientesRequestParams(
  params: ClientesListParams = {},
) {
  const parsed =
    clientesListParamsSchema.parse(
      params,
    );

  return {
    page: parsed.page,
    limit: parsed.limit,

    ...(parsed.search
      ? {
          search:
            parsed.search,
        }
      : {}),

    orderBy:
      parsed.orderBy,

    orderDirection:
      parsed.orderDirection,
  };
}

export async function getClientes(
  params: ClientesListParams = {},
): Promise<ClientesListResponse> {
  const response =
    await getApiClient().get<unknown>(
      "/clientes",
      {
        params:
          buildClientesRequestParams(
            params,
          ),
      },
    );

  return clientesListResponseSchema.parse(
    response.data,
  );
}

export async function getClienteById(
  clienteId: string,
): Promise<Cliente> {
  const response =
    await getApiClient().get<unknown>(
      `/clientes/${clienteId}`,
    );

  return clienteSchema.parse(
    response.data,
  );
}

export async function createCliente(
  payload: CreateClientePayload,
): Promise<Cliente> {
  const response =
    await getApiClient().post<unknown>(
      "/clientes",
      payload,
    );

  return clienteSchema.parse(
    response.data,
  );
}

export async function updateCliente(
  clienteId: string,
  payload: UpdateClientePayload,
): Promise<Cliente> {
  const response =
    await getApiClient().patch<unknown>(
      `/clientes/${clienteId}`,
      payload,
    );

  return clienteSchema.parse(
    response.data,
  );
}

export async function uploadClienteFoto(
  clienteId: string,
  file: File,
): Promise<void> {
  const formData =
    new FormData();

  formData.append(
    "file",
    file,
  );

  await getApiClient().post<unknown>(
    `/arquivos/clientes/${clienteId}/foto`,
    formData,
  );
}

export async function inativarCliente(
  clienteId: string,
): Promise<void> {
  await getApiClient().patch<unknown>(
    `/clientes/${clienteId}/inativar`,
  );
}
export const clientesApi = {
  list: getClientes,
  detail: getClienteById,
  create: createCliente,
  update: updateCliente,
} as const;
