import type { AdminRole } from "@/constants/roles";

export const USUARIO_ORDER_BY_VALUES = [
  "nome",
  "email",
  "role",
  "createdAt",
  "updatedAt",
  "ultimoLogin",
] as const;

export const USUARIO_ORDER_DIRECTION_VALUES = ["asc", "desc"] as const;

export type UsuarioOrderBy = (typeof USUARIO_ORDER_BY_VALUES)[number];

export type UsuarioOrderDirection =
  (typeof USUARIO_ORDER_DIRECTION_VALUES)[number];

export type UsuarioAdministrativo = {
  id: string;
  empresaId: string | null;
  nome: string;
  email: string;
  telefone: string | null;
  foto: string | null;
  role: AdminRole;
  ativo: boolean;
  ultimoLogin: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UsuariosPaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type UsuariosListResponse = {
  data: UsuarioAdministrativo[];
  meta: UsuariosPaginationMeta;
};

export type UsuariosListParams = {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: UsuarioOrderBy;
  orderDirection?: UsuarioOrderDirection;
  role?: AdminRole;
};

export type CreateUsuarioPayload = {
  empresaId?: string;
  nome: string;
  email: string;
  telefone?: string;
  foto?: string;
  role: AdminRole;
  senha: string;
};

export type UpdateUsuarioPayload = Partial<CreateUsuarioPayload>;
