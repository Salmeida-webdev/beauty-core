// Chat 54 — Blocos 05/10 — Notificações query options

import { queryOptions } from "@tanstack/react-query";

import type {
  NotificacoesListParams,
} from "../types/notificacoes.types";
import {
  notificacoesKeys,
} from "./notificacoes-keys";

type QueryLoader<T> = () => Promise<T>;

export const notificacoesQueryOptions = {
  list: <T>(
    loader: QueryLoader<T>,
    filters: NotificacoesListParams = {},
    enabled = true,
  ) =>
    queryOptions({
      queryKey:
        notificacoesKeys.list(filters),
      queryFn: loader,
      enabled,
      retry: false,
    }),

  naoLidas: <T>(
    loader: QueryLoader<T>,
    filters: NotificacoesListParams = {},
    enabled = true,
  ) =>
    queryOptions({
      queryKey:
        notificacoesKeys.naoLidas(
          filters,
        ),
      queryFn: loader,
      enabled,
      retry: false,
    }),

  resumo: <T>(
    loader: QueryLoader<T>,
    enabled = true,
  ) =>
    queryOptions({
      queryKey: notificacoesKeys.resumo(),
      queryFn: loader,
      enabled,
      retry: false,
    }),

  detail: <T>(
    id: string,
    loader: QueryLoader<T>,
  ) =>
    queryOptions({
      queryKey:
        notificacoesKeys.detail(id),
      queryFn: loader,
      enabled: id.length > 0,
      retry: false,
    }),

  configuracao: <T>(
    loader: QueryLoader<T>,
    enabled = true,
  ) =>
    queryOptions({
      queryKey:
        notificacoesKeys.configuracao(),
      queryFn: loader,
      enabled,
      retry: false,
    }),
};