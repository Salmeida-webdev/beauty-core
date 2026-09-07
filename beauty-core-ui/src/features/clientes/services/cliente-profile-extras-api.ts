import {
  clientesPacotesSchema,
  fidelidadeBeneficioSchema,
  fidelidadeHistoricoSchema,
  fidelidadeNivelAtualSchema,
  fidelidadeSaldoSchema,
} from "@/features/clientes/schemas/cliente-profile-extras.schemas";
import type {
  ClientePacote,
  FidelidadeBeneficio,
  FidelidadeHistorico,
  FidelidadeNivelAtual,
  FidelidadeSaldo,
} from "@/features/clientes/types/cliente-profile-extras.types";
import {
  getApiClient,
} from "@/services/api/api-client";

export async function getClienteFidelidadeSaldo(
  clienteId: string,
): Promise<FidelidadeSaldo> {
  const response =
    await getApiClient().get<unknown>(
      `/fidelidade/cliente/${clienteId}`,
    );

  return fidelidadeSaldoSchema.parse(
    response.data,
  );
}

export async function getClienteFidelidadeHistorico(
  clienteId: string,
): Promise<FidelidadeHistorico> {
  const response =
    await getApiClient().get<unknown>(
      `/fidelidade/historico/${clienteId}`,
    );

  return fidelidadeHistoricoSchema.parse(
    response.data,
  );
}

export async function getClienteFidelidadeBeneficio(
  clienteId: string,
): Promise<FidelidadeBeneficio> {
  const response =
    await getApiClient().get<unknown>(
      `/fidelidade/beneficio-disponivel/${clienteId}`,
    );

  return fidelidadeBeneficioSchema.parse(
    response.data,
  );
}

export async function getClienteFidelidadeNivel(
  clienteId: string,
): Promise<FidelidadeNivelAtual> {
  const response =
    await getApiClient().get<unknown>(
      `/fidelidade/nivel-atual/${clienteId}`,
    );

  return fidelidadeNivelAtualSchema.parse(
    response.data,
  );
}

export async function getClientePacotes(
  clienteId: string,
): Promise<ClientePacote[]> {
  const response =
    await getApiClient().get<unknown>(
      `/clientes-pacotes/cliente/${clienteId}`,
    );

  return clientesPacotesSchema.parse(
    response.data,
  );
}

export const clienteProfileExtrasApi = {
  saldo:
    getClienteFidelidadeSaldo,
  historico:
    getClienteFidelidadeHistorico,
  beneficio:
    getClienteFidelidadeBeneficio,
  nivel:
    getClienteFidelidadeNivel,
  pacotes:
    getClientePacotes,
} as const;
