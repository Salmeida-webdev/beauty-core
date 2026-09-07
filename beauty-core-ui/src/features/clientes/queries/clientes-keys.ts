import {
  clientesListParamsSchema,
} from "@/features/clientes/schemas/clientes.schemas";
import type {
  ClientesListParams,
} from "@/features/clientes/types/clientes.types";

function listKey(
  params: ClientesListParams,
) {
  const parsed =
    clientesListParamsSchema.parse(params);

  return [
    parsed.page,
    parsed.limit,
    parsed.search ?? null,
    parsed.orderBy,
    parsed.orderDirection,
  ] as const;
}

export const clientesKeys = {
  all: ["clientes"] as const,

  lists: () =>
    [...clientesKeys.all, "list"] as const,

  list: (
    params: ClientesListParams = {},
  ) =>
    [
      ...clientesKeys.lists(),
      ...listKey(params),
    ] as const,

  details: () =>
    [...clientesKeys.all, "detail"] as const,

  detail: (clienteId: string) =>
    [
      ...clientesKeys.details(),
      clienteId,
    ] as const,
} as const;
