import type {
  UsuarioOrderBy,
  UsuarioOrderDirection,
  UsuariosListParams,
} from "@/features/usuarios/types/usuarios.types";

export const PROFISSIONAIS_ORDER_BY_VALUES = [
  "nome",
  "email",
  "createdAt",
  "updatedAt",
  "ultimoLogin",
] as const satisfies readonly UsuarioOrderBy[];

export const PROFISSIONAIS_ORDER_DIRECTION_VALUES = [
  "asc",
  "desc",
] as const satisfies readonly UsuarioOrderDirection[];

export type ProfissionaisOrderBy =
  (typeof PROFISSIONAIS_ORDER_BY_VALUES)[number];

export type ProfissionaisOrderDirection =
  (typeof PROFISSIONAIS_ORDER_DIRECTION_VALUES)[number];

export const PROFISSIONAIS_LIST_DEFAULTS = {
  page: 1,
  limit: 20,
  search: "",
  orderBy: "createdAt",
  orderDirection: "desc",
} as const;

export type ProfissionaisListUrlState = {
  page: number;
  limit: number;
  search: string;
  orderBy: ProfissionaisOrderBy;
  orderDirection: ProfissionaisOrderDirection;
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

function isOrderBy(value: string | null): value is ProfissionaisOrderBy {
  return value
    ? PROFISSIONAIS_ORDER_BY_VALUES.some((item) => item === value)
    : false;
}

function isOrderDirection(
  value: string | null,
): value is ProfissionaisOrderDirection {
  return value
    ? PROFISSIONAIS_ORDER_DIRECTION_VALUES.some((item) => item === value)
    : false;
}

export function parseProfissionaisListSearchParams(
  searchParams: SearchParamsReader,
): ProfissionaisListUrlState {
  const orderBy = searchParams.get("orderBy");

  const orderDirection = searchParams.get("orderDirection");

  return {
    page: parsePositiveInteger(
      searchParams.get("page"),
      PROFISSIONAIS_LIST_DEFAULTS.page,
    ),

    limit: parsePositiveInteger(
      searchParams.get("limit"),
      PROFISSIONAIS_LIST_DEFAULTS.limit,
      100,
    ),

    search: searchParams.get("search")?.trim() ?? "",

    orderBy: isOrderBy(orderBy) ? orderBy : PROFISSIONAIS_LIST_DEFAULTS.orderBy,

    orderDirection: isOrderDirection(orderDirection)
      ? orderDirection
      : PROFISSIONAIS_LIST_DEFAULTS.orderDirection,
  };
}

export function toProfissionaisListParams(
  state: ProfissionaisListUrlState,
): UsuariosListParams {
  return {
    page: state.page,
    limit: state.limit,

    ...(state.search
      ? {
          search: state.search.trim(),
        }
      : {}),

    orderBy: state.orderBy,

    orderDirection: state.orderDirection,

    role: "PROFISSIONAL",
  };
}

export function serializeProfissionaisListState(
  state: ProfissionaisListUrlState,
): URLSearchParams {
  const params = new URLSearchParams();

  if (state.page !== PROFISSIONAIS_LIST_DEFAULTS.page) {
    params.set("page", String(state.page));
  }

  if (state.limit !== PROFISSIONAIS_LIST_DEFAULTS.limit) {
    params.set("limit", String(state.limit));
  }

  const search = state.search.trim();

  if (search) {
    params.set("search", search);
  }

  if (state.orderBy !== PROFISSIONAIS_LIST_DEFAULTS.orderBy) {
    params.set("orderBy", state.orderBy);
  }

  if (state.orderDirection !== PROFISSIONAIS_LIST_DEFAULTS.orderDirection) {
    params.set("orderDirection", state.orderDirection);
  }

  return params;
}
