// Chat 54 — Blocos 05–08 — WhatsApp query options

import { queryOptions } from "@tanstack/react-query";

import type {
  WhatsappMessagesListParams,
} from "../types/whatsapp.types";
import { whatsappKeys } from "./whatsapp-keys";

type QueryLoader<T> = () => Promise<T>;

export const whatsappQueryOptions = {
  configuracao: <T>(loader: QueryLoader<T>) =>
    queryOptions({
      queryKey: whatsappKeys.configuracao(),
      queryFn: loader,
    }),

  templates: <T>(
    loader: QueryLoader<T>,
    enabled = true,
  ) =>
    queryOptions({
      queryKey: whatsappKeys.templates(),
      queryFn: loader,
      enabled,
    }),

  templateDetail: <T>(
    id: string,
    loader: QueryLoader<T>,
  ) =>
    queryOptions({
      queryKey: whatsappKeys.templateDetail(id),
      queryFn: loader,
      enabled: id.length > 0,
    }),

  mensagensList: <T>(
    params: WhatsappMessagesListParams,
    loader: QueryLoader<T>,
    enabled = true,
  ) =>
    queryOptions({
      queryKey:
        whatsappKeys.mensagensList(
          params,
        ),
      queryFn: loader,
      enabled,
      retry: false,
    }),

  mensagemDetail: <T>(
    id: string,
    loader: QueryLoader<T>,
  ) =>
    queryOptions({
      queryKey:
        whatsappKeys.mensagemDetail(id),
      queryFn: loader,
      enabled: id.length > 0,
      retry: false,
    }),

  campanhas: <T>(
    loader: QueryLoader<T>,
    enabled = true,
  ) =>
    queryOptions({
      queryKey: whatsappKeys.campanhas(),
      queryFn: loader,
      enabled,
      retry: false,
    }),

  campanhaDetail: <T>(
    id: string,
    loader: QueryLoader<T>,
  ) =>
    queryOptions({
      queryKey:
        whatsappKeys.campanhaDetail(id),
      queryFn: loader,
      enabled: id.length > 0,
      retry: false,
    }),
};