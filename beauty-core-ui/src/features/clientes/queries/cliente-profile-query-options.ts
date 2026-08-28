import {
  queryOptions,
} from "@tanstack/react-query";

import {
  clienteProfileKeys,
} from "@/features/clientes/queries/cliente-profile-keys";
import {
  clienteProfileExtrasApi,
} from "@/features/clientes/services/cliente-profile-extras-api";

const STALE_TIME =
  60_000;

export function clienteFidelidadeSaldoQueryOptions(
  clienteId: string,
  enabled = true,
) {
  return queryOptions({
    queryKey:
      clienteProfileKeys.saldo(
        clienteId,
      ),
    queryFn: () =>
      clienteProfileExtrasApi.saldo(
        clienteId,
      ),
    enabled:
      enabled &&
      clienteId.length > 0,
    staleTime: STALE_TIME,
    retry: false,
  });
}

export function clienteFidelidadeHistoricoQueryOptions(
  clienteId: string,
  enabled = true,
) {
  return queryOptions({
    queryKey:
      clienteProfileKeys.historico(
        clienteId,
      ),
    queryFn: () =>
      clienteProfileExtrasApi.historico(
        clienteId,
      ),
    enabled:
      enabled &&
      clienteId.length > 0,
    staleTime: STALE_TIME,
    retry: false,
  });
}

export function clienteFidelidadeBeneficioQueryOptions(
  clienteId: string,
  enabled = true,
) {
  return queryOptions({
    queryKey:
      clienteProfileKeys.beneficio(
        clienteId,
      ),
    queryFn: () =>
      clienteProfileExtrasApi.beneficio(
        clienteId,
      ),
    enabled:
      enabled &&
      clienteId.length > 0,
    staleTime: STALE_TIME,
    retry: false,
  });
}

export function clienteFidelidadeNivelQueryOptions(
  clienteId: string,
  enabled = true,
) {
  return queryOptions({
    queryKey:
      clienteProfileKeys.nivel(
        clienteId,
      ),
    queryFn: () =>
      clienteProfileExtrasApi.nivel(
        clienteId,
      ),
    enabled:
      enabled &&
      clienteId.length > 0,
    staleTime: STALE_TIME,
    retry: false,
  });
}

export function clientePacotesQueryOptions(
  clienteId: string,
  enabled = true,
) {
  return queryOptions({
    queryKey:
      clienteProfileKeys.pacotes(
        clienteId,
      ),
    queryFn: () =>
      clienteProfileExtrasApi.pacotes(
        clienteId,
      ),
    enabled:
      enabled &&
      clienteId.length > 0,
    staleTime: STALE_TIME,
    retry: false,
  });
}
