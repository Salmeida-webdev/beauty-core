import { getApiClient } from "@/services/api/api-client";

import {
  categoriaFinanceiraSchema,
  categoriasFinanceirasSchema,
} from "@/features/financeiro/schemas/categorias-financeiras.schemas";
import { financeiroEndpoints } from "@/features/financeiro/services/financeiro-api";
import type {
  CategoriaFinanceira,
  CreateCategoriaFinanceiraPayload,
  UpdateCategoriaFinanceiraPayload,
} from "@/features/financeiro/types/financeiro.types";

export async function listCategoriasFinanceiras(): Promise<
  CategoriaFinanceira[]
> {
  const response = await getApiClient().get(financeiroEndpoints.categorias);

  return categoriasFinanceirasSchema.parse(response.data);
}

export async function getCategoriaFinanceira(
  id: string,
): Promise<CategoriaFinanceira> {
  const response = await getApiClient().get(financeiroEndpoints.categoria(id));

  return categoriaFinanceiraSchema.parse(response.data);
}

export async function createCategoriaFinanceira(
  payload: CreateCategoriaFinanceiraPayload,
): Promise<CategoriaFinanceira> {
  const response = await getApiClient().post(
    financeiroEndpoints.categorias,
    payload,
  );

  return categoriaFinanceiraSchema.parse(response.data);
}

export async function updateCategoriaFinanceira(
  id: string,
  payload: UpdateCategoriaFinanceiraPayload,
): Promise<CategoriaFinanceira> {
  const response = await getApiClient().patch(
    financeiroEndpoints.categoria(id),
    payload,
  );

  return categoriaFinanceiraSchema.parse(response.data);
}

export async function inativarCategoriaFinanceira(
  id: string,
): Promise<CategoriaFinanceira> {
  const response = await getApiClient().patch(
    financeiroEndpoints.inativarCategoria(id),
  );

  return categoriaFinanceiraSchema.parse(response.data);
}
