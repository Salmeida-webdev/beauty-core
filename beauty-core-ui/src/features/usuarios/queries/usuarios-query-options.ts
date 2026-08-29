import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { usuariosKeys } from "@/features/usuarios/queries/usuarios-keys";
import { usuariosApi } from "@/features/usuarios/services/usuarios-api";
import type { UsuariosListParams } from "@/features/usuarios/types/usuarios.types";

export const USUARIOS_STALE_TIME = {
  list: 30_000,
  detail: 60_000,
} as const;

export const usuariosQueryOptions = {
  list: (params: UsuariosListParams, enabled: boolean) =>
    queryOptions({
      queryKey: usuariosKeys.list(params),
      queryFn: () => usuariosApi.list(params),
      enabled,
      staleTime: USUARIOS_STALE_TIME.list,
      retry: false,
      placeholderData: keepPreviousData,
    }),

  detail: (usuarioId: string, enabled: boolean) =>
    queryOptions({
      queryKey: usuariosKeys.detail(usuarioId),
      queryFn: () => usuariosApi.detail(usuarioId),
      enabled: enabled && usuarioId.length > 0,
      staleTime: USUARIOS_STALE_TIME.detail,
      retry: false,
    }),
} as const;
