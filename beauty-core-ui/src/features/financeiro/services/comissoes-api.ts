import { getApiClient } from "@/services/api/api-client";

import {
  comissaoProfissionalSchema,
  comissoesListSchema,
} from "@/features/financeiro/schemas/comissoes.schemas";
import type {
  ComissaoProfissional,
  CreateComissaoProfissionalPayload,
} from "@/features/financeiro/types/financeiro.types";

export async function listComissoes(): Promise<ComissaoProfissional[]> {
  const response = await getApiClient().get<unknown>("/comissoes");

  return comissoesListSchema.parse(response.data);
}

export async function getComissao(id: string): Promise<ComissaoProfissional> {
  const response = await getApiClient().get<unknown>(`/comissoes/${id}`);

  return comissaoProfissionalSchema.parse(response.data);
}

export async function createComissao(
  payload: CreateComissaoProfissionalPayload,
): Promise<ComissaoProfissional> {
  const response = await getApiClient().post<unknown>("/comissoes", payload);

  return comissaoProfissionalSchema.parse(response.data);
}

export async function pagarComissao(id: string): Promise<ComissaoProfissional> {
  const response = await getApiClient().patch<unknown>(
    `/comissoes/${id}/pagar`,
  );

  return comissaoProfissionalSchema.parse(response.data);
}
