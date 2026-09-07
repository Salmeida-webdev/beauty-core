// Chat 54 — Blocos 05/12 — Automações query options

import {
  queryOptions,
} from "@tanstack/react-query";

import {
  automacoesKeys,
} from "./automacoes-keys";

type QueryLoader<T> = () => Promise<T>;

export const automacoesQueryOptions = {
  eventos: <T>(
    loader: QueryLoader<T>,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        automacoesKeys.eventos(),
      queryFn: loader,
      enabled,
      retry: false,
    }),
};