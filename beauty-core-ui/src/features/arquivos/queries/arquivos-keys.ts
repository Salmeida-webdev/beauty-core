import type {
  ArquivosListParams,
  ArquivoTipo,
} from "@/features/arquivos/types/arquivos.types";

export const arquivosKeys = {
  all: ["arquivos"] as const,

  lists: () => [...arquivosKeys.all, "list"] as const,

  list: (params: ArquivosListParams) =>
    [...arquivosKeys.lists(), params] as const,

  byType: (tipo: ArquivoTipo, params: ArquivosListParams) =>
    [...arquivosKeys.lists(), "tipo", tipo, params] as const,

  details: () => [...arquivosKeys.all, "detail"] as const,

  detail: (arquivoId: string) =>
    [...arquivosKeys.details(), arquivoId] as const,
};
