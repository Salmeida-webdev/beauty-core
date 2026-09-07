import {
  lgpdAnonimizacaoResponseSchema,
  lgpdClienteExportResponseSchema,
} from "@/features/clientes/schemas/clientes-lgpd.schemas";
import type {
  LgpdAnonimizacaoResponse,
  LgpdClienteExportResponse,
} from "@/features/clientes/schemas/clientes-lgpd.schemas";
import {
  getApiClient,
} from "@/services/api/api-client";

export async function exportarClienteDados(
  clienteId: string,
): Promise<LgpdClienteExportResponse> {
  const response =
    await getApiClient().get<unknown>(
      `/lgpd/exportar-cliente/${clienteId}`,
    );

  return lgpdClienteExportResponseSchema.parse(
    response.data,
  );
}

export async function anonimizarCliente(
  clienteId: string,
): Promise<LgpdAnonimizacaoResponse> {
  const response =
    await getApiClient().post<unknown>(
      `/lgpd/anonimizar-cliente/${clienteId}`,
    );

  return lgpdAnonimizacaoResponseSchema.parse(
    response.data,
  );
}
