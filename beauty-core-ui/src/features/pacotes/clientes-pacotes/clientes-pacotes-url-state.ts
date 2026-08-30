import { z } from "zod";

import { statusClientePacoteSchema } from "@/features/clientes/schemas/cliente-profile-extras.schemas";

const uuidSchema = z.string().uuid();

export const CLIENTES_PACOTES_STATUS_FILTERS = [
  "TODOS",
  "ATIVO",
  "FINALIZADO",
  "VENCIDO",
  "CANCELADO",
] as const;

export type ClientesPacotesStatusFilter =
  (typeof CLIENTES_PACOTES_STATUS_FILTERS)[number];

export type ClientesPacotesUrlState = {
  clienteId: string | null;
  status: ClientesPacotesStatusFilter;
};

export function parseClientesPacotesStatusFilter(
  value: string | null | undefined,
): ClientesPacotesStatusFilter {
  if (!value || value === "TODOS") {
    return "TODOS";
  }

  const parsed =
    statusClientePacoteSchema.safeParse(
      value,
    );

  return parsed.success
    ? parsed.data
    : "TODOS";
}

export function parseClientesPacotesUrlState(
  searchParams: Pick<
    URLSearchParams,
    "get"
  >,
): ClientesPacotesUrlState {
  const rawClienteId =
    searchParams.get("clienteId");

  const parsedClienteId =
    uuidSchema.safeParse(
      rawClienteId,
    );

  return {
    clienteId:
      parsedClienteId.success
        ? parsedClienteId.data
        : null,

    status:
      parseClientesPacotesStatusFilter(
        searchParams.get("status"),
      ),
  };
}

export function serializeClientesPacotesUrlState(
  state: ClientesPacotesUrlState,
): URLSearchParams {
  const params =
    new URLSearchParams();

  if (state.clienteId) {
    params.set(
      "clienteId",
      state.clienteId,
    );
  }

  if (state.status !== "TODOS") {
    params.set(
      "status",
      state.status,
    );
  }

  return params;
}
