import { queryOptions } from "@tanstack/react-query";

import { fidelidadeApi } from "../services/fidelidade-api";
import { fidelidadeQueryKeys } from "./fidelidade-query-keys";

export const fidelidadeQueryOptions = {
  saldo(clienteId: string) {
    return queryOptions({
      queryKey: fidelidadeQueryKeys.saldo(clienteId),
      queryFn: () => fidelidadeApi.getSaldo(clienteId),
      enabled: clienteId.length > 0,
    });
  },

  historico(clienteId: string) {
    return queryOptions({
      queryKey: fidelidadeQueryKeys.historico(clienteId),
      queryFn: () => fidelidadeApi.getHistorico(clienteId),
      enabled: clienteId.length > 0,
    });
  },

  configuracao() {
    return queryOptions({
      queryKey: fidelidadeQueryKeys.configuracao(),
      queryFn: () => fidelidadeApi.getConfiguracao(),
    });
  },

  niveis() {
    return queryOptions({
      queryKey: fidelidadeQueryKeys.niveis(),
      queryFn: () => fidelidadeApi.getNiveis(),
    });
  },

  beneficios() {
    return queryOptions({
      queryKey: fidelidadeQueryKeys.beneficios(),
      queryFn: () => fidelidadeApi.getBeneficios(),
    });
  },

  cupons() {
    return queryOptions({
      queryKey: fidelidadeQueryKeys.cupons(),
      queryFn: () => fidelidadeApi.getCupons(),
    });
  },
};
