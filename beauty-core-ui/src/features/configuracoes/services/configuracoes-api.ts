import { arquivoSchema } from "@/features/arquivos/schemas/arquivos.schemas";
import type { Arquivo } from "@/features/arquivos/types/arquivos.types";
import { getApiClient } from "@/services/api/api-client";

const CONFIGURACOES_ROUTES = {
  logo: "/arquivos/logo",
} as const;

export async function uploadLogoEmpresa(file: File): Promise<Arquivo> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await getApiClient().post<unknown>(
    CONFIGURACOES_ROUTES.logo,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return arquivoSchema.parse(response.data);
}
