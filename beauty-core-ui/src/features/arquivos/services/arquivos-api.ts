import {
  arquivoMutationMessageSchema,
  arquivoSchema,
  arquivosGaleriaUploadSchema,
  arquivosPageSchema,
} from "@/features/arquivos/schemas/arquivos.schemas";
import type {
  Arquivo,
  ArquivosListParams,
  ArquivosPage,
  ArquivoTipo,
} from "@/features/arquivos/types/arquivos.types";
import { getApiClient } from "@/services/api/api-client";

export const ARQUIVOS_ROUTES = {
  base: "/arquivos",
  documentos: "/arquivos/documentos",
  galeria: "/arquivos/galeria",
  logo: "/arquivos/logo",
} as const;

function toPageParams(params: ArquivosListParams) {
  return {
    ...(params.page ? { page: params.page } : {}),
    ...(params.limit ? { limit: params.limit } : {}),
  };
}

export async function listarArquivos(
  params: ArquivosListParams = {},
): Promise<ArquivosPage> {
  const response = await getApiClient().get<unknown>(ARQUIVOS_ROUTES.base, {
    params: toPageParams(params),
  });

  return arquivosPageSchema.parse(response.data);
}

export async function listarArquivosPorTipo(
  tipo: ArquivoTipo,
  params: ArquivosListParams = {},
): Promise<ArquivosPage> {
  const response = await getApiClient().get<unknown>(
    `${ARQUIVOS_ROUTES.base}/tipo/${tipo}`,
    {
      params: toPageParams(params),
    },
  );

  return arquivosPageSchema.parse(response.data);
}

export async function buscarArquivo(arquivoId: string): Promise<Arquivo> {
  const response = await getApiClient().get<unknown>(
    `${ARQUIVOS_ROUTES.base}/${encodeURIComponent(arquivoId)}`,
  );

  return arquivoSchema.parse(response.data);
}

export async function uploadDocumento(file: File): Promise<Arquivo> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await getApiClient().post<unknown>(
    ARQUIVOS_ROUTES.documentos,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return arquivoSchema.parse(response.data);
}

export async function uploadGaleria(
  files: readonly File[],
): Promise<Arquivo[]> {
  const formData = new FormData();

  for (const file of files) {
    formData.append("files", file);
  }

  const response = await getApiClient().post<unknown>(
    ARQUIVOS_ROUTES.galeria,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return arquivosGaleriaUploadSchema.parse(response.data);
}

export async function removerArquivo(
  arquivoId: string,
): Promise<{ message: string }> {
  const response = await getApiClient().delete<unknown>(
    `${ARQUIVOS_ROUTES.base}/${encodeURIComponent(arquivoId)}`,
  );

  return arquivoMutationMessageSchema.parse(response.data);
}
