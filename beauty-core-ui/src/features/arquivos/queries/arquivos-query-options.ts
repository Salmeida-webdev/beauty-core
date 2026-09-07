import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import {
  buscarArquivo,
  listarArquivos,
  listarArquivosPorTipo,
} from "@/features/arquivos/services/arquivos-api";
import type {
  ArquivosListParams,
  ArquivoTipo,
} from "@/features/arquivos/types/arquivos.types";
import { arquivosKeys } from "@/features/arquivos/queries/arquivos-keys";

export function arquivosListQueryOptions(params: ArquivosListParams) {
  return queryOptions({
    queryKey: arquivosKeys.list(params),
    queryFn: () => listarArquivos(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    retry: false,
  });
}

export function arquivosByTypeQueryOptions(
  tipo: ArquivoTipo,
  params: ArquivosListParams,
) {
  return queryOptions({
    queryKey: arquivosKeys.byType(tipo, params),
    queryFn: () => listarArquivosPorTipo(tipo, params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    retry: false,
  });
}

export function arquivoDetailQueryOptions(arquivoId: string) {
  return queryOptions({
    queryKey: arquivosKeys.detail(arquivoId),
    queryFn: () => buscarArquivo(arquivoId),
    staleTime: 60_000,
    retry: false,
  });
}
