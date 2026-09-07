import { ADMIN_ROLES } from "@/constants/roles";
import type { AdminRole } from "@/constants/roles";
import {
  USUARIO_ORDER_BY_VALUES,
  USUARIO_ORDER_DIRECTION_VALUES,
} from "@/features/usuarios/types/usuarios.types";
import type {
  UsuarioOrderBy,
  UsuarioOrderDirection,
  UsuariosListParams,
} from "@/features/usuarios/types/usuarios.types";

export const USUARIOS_LIST_DEFAULTS = {
  page: 1,
  limit: 20,
  search: "",
  orderBy: "createdAt",
  orderDirection: "desc",
  role: null,
} as const;

export type UsuariosListUrlState = {
  page: number;
  limit: number;
  search: string;
  orderBy: UsuarioOrderBy;
  orderDirection: UsuarioOrderDirection;
  role: AdminRole | null;
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

function isOrderBy(value: string | null): value is UsuarioOrderBy {
  return value ? USUARIO_ORDER_BY_VALUES.some((item) => item === value) : false;
}

function isOrderDirection(
  value: string | null,
): value is UsuarioOrderDirection {
  return value
    ? USUARIO_ORDER_DIRECTION_VALUES.some((item) => item === value)
    : false;
}

function isAdminRole(value: string | null): value is AdminRole {
  return value ? ADMIN_ROLES.some((role) => role === value) : false;
}

export function parseUsuariosListSearchParams(
  searchParams: SearchParamsReader,
): UsuariosListUrlState {
  const orderBy = searchParams.get("orderBy");

  const orderDirection = searchParams.get("orderDirection");

  const role = searchParams.get("role");

  return {
    page: parsePositiveInteger(
      searchParams.get("page"),
      USUARIOS_LIST_DEFAULTS.page,
    ),

    limit: parsePositiveInteger(
      searchParams.get("limit"),
      USUARIOS_LIST_DEFAULTS.limit,
      100,
    ),

    search: searchParams.get("search")?.trim() ?? "",

    orderBy: isOrderBy(orderBy) ? orderBy : USUARIOS_LIST_DEFAULTS.orderBy,

    orderDirection: isOrderDirection(orderDirection)
      ? orderDirection
      : USUARIOS_LIST_DEFAULTS.orderDirection,

    role: isAdminRole(role) ? role : null,
  };
}

export function toUsuariosListParams(
  state: UsuariosListUrlState,
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

    ...(state.role
      ? {
          role: state.role,
        }
      : {}),
  };
}

export function serializeUsuariosListState(
  state: UsuariosListUrlState,
): URLSearchParams {
  const params = new URLSearchParams();

  if (state.page !== USUARIOS_LIST_DEFAULTS.page) {
    params.set("page", String(state.page));
  }

  if (state.limit !== USUARIOS_LIST_DEFAULTS.limit) {
    params.set("limit", String(state.limit));
  }

  const search = state.search.trim();

  if (search) {
    params.set("search", search);
  }

  if (state.orderBy !== USUARIOS_LIST_DEFAULTS.orderBy) {
    params.set("orderBy", state.orderBy);
  }

  if (state.orderDirection !== USUARIOS_LIST_DEFAULTS.orderDirection) {
    params.set("orderDirection", state.orderDirection);
  }

  if (state.role) {
    params.set("role", state.role);
  }

  return params;
}
