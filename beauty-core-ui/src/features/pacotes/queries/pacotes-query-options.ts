import { queryOptions } from "@tanstack/react-query";

import { pacotesApi } from "../services/pacotes-api";
import { pacotesQueryKeys } from "./pacotes-query-keys";

export const pacotesQueryOptions = {
  list() {
    return queryOptions({
      queryKey: pacotesQueryKeys.list(),
      queryFn: () => pacotesApi.getPacotes(),
    });
  },

  detail(id: string) {
    return queryOptions({
      queryKey: pacotesQueryKeys.detail(id),
      queryFn: () => pacotesApi.getPacote(id),
      enabled: id.length > 0,
    });
  },

  clientesPacotes() {
    return queryOptions({
      queryKey: pacotesQueryKeys.clientesPacotes(),
      queryFn: () => pacotesApi.getClientesPacotes(),
    });
  },

  clientePacotes(clienteId: string) {
    return queryOptions({
      queryKey: pacotesQueryKeys.clientePacotes(clienteId),
      queryFn: () => pacotesApi.getClientePacotes(clienteId),
      enabled: clienteId.length > 0,
    });
  },
};
