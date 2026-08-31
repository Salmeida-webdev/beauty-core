// Chat 54 — Blocos 05–08 — WhatsApp query keys

import type {
  WhatsappMessagesListParams,
} from "../types/whatsapp.types";

export const whatsappKeys = {
  all: ["whatsapp"] as const,

  configuracao: () =>
    [...whatsappKeys.all, "configuracao"] as const,

  templates: () =>
    [...whatsappKeys.all, "templates"] as const,

  templateDetail: (id: string) =>
    [...whatsappKeys.templates(), "detail", id] as const,

  mensagens: () =>
    [...whatsappKeys.all, "mensagens"] as const,

  mensagensList: (
    params: WhatsappMessagesListParams,
  ) =>
    [
      ...whatsappKeys.mensagens(),
      "list",
      params,
    ] as const,

  mensagemDetail: (id: string) =>
    [
      ...whatsappKeys.mensagens(),
      "detail",
      id,
    ] as const,

  campanhas: () =>
    [...whatsappKeys.all, "campanhas"] as const,

  campanhaDetail: (id: string) =>
    [
      ...whatsappKeys.campanhas(),
      "detail",
      id,
    ] as const,
};