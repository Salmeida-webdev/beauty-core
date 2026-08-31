// Chat 54 — Blocos 05/10 — Notificações query keys

import type {
  NotificacoesListParams,
} from "../types/notificacoes.types";

export const notificacoesKeys = {
  all: ["notificacoes"] as const,

  lists: () =>
    [...notificacoesKeys.all, "list"] as const,

  list: (
    filters: NotificacoesListParams = {},
  ) =>
    [
      ...notificacoesKeys.lists(),
      filters,
    ] as const,

  naoLidas: (
    filters: NotificacoesListParams = {},
  ) =>
    [
      ...notificacoesKeys.lists(),
      "nao-lidas",
      filters,
    ] as const,

  resumo: () =>
    [...notificacoesKeys.all, "resumo"] as const,

  detail: (id: string) =>
    [
      ...notificacoesKeys.all,
      "detail",
      id,
    ] as const,

  configuracao: () =>
    [
      ...notificacoesKeys.all,
      "configuracao",
    ] as const,
};