// Chat 54 — Blocos 05/12/13 — Automações API contract

import {
  getApiClient,
} from "@/services/api/api-client";

import {
  automacaoTesteResultadoSchema,
  automacoesEventosResumoSchema,
  processarEventoInputSchema,
  processarEventoResultadoSchema,
} from "../schemas/automacoes.schemas";
import type {
  AutomacoesEventosResumo,
  AutomacaoTesteResultado,
  ProcessarEventoInput,
  ProcessarEventoResultado,
} from "../types/automacoes.types";

export const automacoesApiPaths = {
  root: "/automacoes",
  eventos: "/automacoes/eventos",
  testeAniversario:
    "/automacoes/teste-aniversario",
  testeRelatorio:
    "/automacoes/teste-relatorio",
} as const;

export const automacoesCapabilities = {
  crud: false,
  eventos: true,
  processarEvento: true,
  testeAniversario: true,
  testeRelatorio: true,
} as const;

export async function listarAutomacaoEventos(): Promise<
  AutomacoesEventosResumo
> {
  const response =
    await getApiClient().get<unknown>(
      automacoesApiPaths.eventos,
    );

  return automacoesEventosResumoSchema.parse(
    response.data,
  );
}

export async function processarAutomacaoEvento(
  input: ProcessarEventoInput,
): Promise<ProcessarEventoResultado> {
  const payload =
    processarEventoInputSchema.parse(
      input,
    );

  const response =
    await getApiClient().post<unknown>(
      automacoesApiPaths.eventos,
      payload,
    );

  return processarEventoResultadoSchema.parse(
    response.data,
  );
}

export async function testarAutomacaoAniversario(): Promise<
  AutomacaoTesteResultado
> {
  const response =
    await getApiClient().post<unknown>(
      automacoesApiPaths.testeAniversario,
    );

  return automacaoTesteResultadoSchema.parse(
    response.data,
  );
}

export async function testarAutomacaoRelatorio(): Promise<
  AutomacaoTesteResultado
> {
  const response =
    await getApiClient().post<unknown>(
      automacoesApiPaths.testeRelatorio,
    );

  return automacaoTesteResultadoSchema.parse(
    response.data,
  );
}