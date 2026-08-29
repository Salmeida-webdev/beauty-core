import { usuariosListParamsSchema } from "@/features/usuarios/schemas/usuarios.schemas";
import type { UsuariosListParams } from "@/features/usuarios/types/usuarios.types";

function listKey(params: UsuariosListParams) {
  const parsed = usuariosListParamsSchema.parse(params);

  return [
    parsed.page,
    parsed.limit,
    parsed.search ?? null,
    parsed.orderBy,
    parsed.orderDirection,
    parsed.role ?? null,
  ] as const;
}

export const usuariosKeys = {
  all: ["usuarios"] as const,

  lists: () => [...usuariosKeys.all, "list"] as const,

  list: (params: UsuariosListParams = {}) =>
    [...usuariosKeys.lists(), ...listKey(params)] as const,

  details: () => [...usuariosKeys.all, "detail"] as const,

  detail: (usuarioId: string) =>
    [...usuariosKeys.details(), usuarioId] as const,
} as const;
