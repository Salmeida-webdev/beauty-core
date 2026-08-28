import {
  CLIENTE_ORDER_BY_VALUES,
  CLIENTE_ORDER_DIRECTION_VALUES,
} from "@/features/clientes/types/clientes.types";
import type {
  ClienteOrderBy,
  ClienteOrderDirection,
  ClientesListParams,
} from "@/features/clientes/types/clientes.types";

export const CLIENTES_LIST_DEFAULTS = {
  page: 1,
  limit: 20,
  search: "",
  orderBy: "createdAt",
  orderDirection: "desc",
} as const satisfies Required<
  Omit<ClientesListParams, "search">
> & {
  search: string;
};

export type ClientesListUrlState = {
  page: number;
  limit: number;
  search: string;
  orderBy: ClienteOrderBy;
  orderDirection: ClienteOrderDirection;
};

type SearchParamsReader = {
  get(name: string): string | null;
};

function parsePositiveInteger(
  value: string | null,
  fallback: number,
  max?: number,
): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (
    !Number.isInteger(parsed) ||
    parsed < 1 ||
    (max !== undefined && parsed > max)
  ) {
    return fallback;
  }

  return parsed;
}

function isClienteOrderBy(
  value: string | null,
): value is ClienteOrderBy {
  if (!value) {
    return false;
  }

  return CLIENTE_ORDER_BY_VALUES.some(
    (item) => item === value,
  );
}

function isClienteOrderDirection(
  value: string | null,
): value is ClienteOrderDirection {
  if (!value) {
    return false;
  }

  return CLIENTE_ORDER_DIRECTION_VALUES.some(
    (item) => item === value,
  );
}

export function parseClientesListSearchParams(
  searchParams: SearchParamsReader,
): ClientesListUrlState {
  const rawSearch =
    searchParams.get("search")?.trim() ?? "";

  const rawOrderBy =
    searchParams.get("orderBy");

  const rawOrderDirection =
    searchParams.get("orderDirection");

  return {
    page: parsePositiveInteger(
      searchParams.get("page"),
      CLIENTES_LIST_DEFAULTS.page,
    ),

    limit: parsePositiveInteger(
      searchParams.get("limit"),
      CLIENTES_LIST_DEFAULTS.limit,
      100,
    ),

    search: rawSearch,

    orderBy: isClienteOrderBy(rawOrderBy)
      ? rawOrderBy
      : CLIENTES_LIST_DEFAULTS.orderBy,

    orderDirection:
      isClienteOrderDirection(
        rawOrderDirection,
      )
        ? rawOrderDirection
        : CLIENTES_LIST_DEFAULTS.orderDirection,
  };
}

export function toClientesListParams(
  state: ClientesListUrlState,
): ClientesListParams {
  return {
    page: state.page,
    limit: state.limit,
    ...(state.search
      ? { search: state.search }
      : {}),
    orderBy: state.orderBy,
    orderDirection: state.orderDirection,
  };
}

export function serializeClientesListState(
  state: ClientesListUrlState,
): URLSearchParams {
  const params = new URLSearchParams();

  if (
    state.page !==
    CLIENTES_LIST_DEFAULTS.page
  ) {
    params.set(
      "page",
      String(state.page),
    );
  }

  if (
    state.limit !==
    CLIENTES_LIST_DEFAULTS.limit
  ) {
    params.set(
      "limit",
      String(state.limit),
    );
  }

  const search = state.search.trim();

  if (search) {
    params.set(
      "search",
      search,
    );
  }

  if (
    state.orderBy !==
    CLIENTES_LIST_DEFAULTS.orderBy
  ) {
    params.set(
      "orderBy",
      state.orderBy,
    );
  }

  if (
    state.orderDirection !==
    CLIENTES_LIST_DEFAULTS.orderDirection
  ) {
    params.set(
      "orderDirection",
      state.orderDirection,
    );
  }

  return params;
}

function appendQueryString(
  pathname: string,
  params: URLSearchParams,
): string {
  const query = params.toString();

  return query
    ? `${pathname}?${query}`
    : pathname;
}

export function buildClientesListHref(
  state: ClientesListUrlState,
): string {
  return appendQueryString(
    "/clientes",
    serializeClientesListState(state),
  );
}

export function buildClienteDetailHref(
  clienteId: string,
  state: ClientesListUrlState,
): string {
  return appendQueryString(
    `/clientes/${encodeURIComponent(clienteId)}`,
    serializeClientesListState(state),
  );
}
