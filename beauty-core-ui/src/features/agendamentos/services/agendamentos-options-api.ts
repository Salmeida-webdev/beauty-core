import { agendaLookupOptionsSchema } from "@/features/agendamentos/schemas/agendamentos-options.schemas";
import type { AgendaOption } from "@/features/agendamentos/types/agendamentos-options.types";
import { getClientes } from "@/features/clientes/services/clientes-api";
import { getServicos } from "@/features/servicos/services/servicos-api";
import { getApiClient } from "@/services/api/api-client";

function normalizeSearch(search: string): string {
  return search.trim();
}

export async function getAgendaClienteOptions(
  search: string,
): Promise<AgendaOption[]> {
  const normalizedSearch = normalizeSearch(search);

  const response = await getClientes({
    page: 1,
    limit: 20,
    ...(normalizedSearch
      ? {
          search: normalizedSearch,
        }
      : {}),
    orderBy: "nome",
    orderDirection: "asc",
  });

  return response.data.map((cliente) => ({
    value: cliente.id,
    label: cliente.nome,
    description:
      cliente.telefone ??
      cliente.email ??
      undefined,
  }));
}

export async function getAgendaServicoOptions(): Promise<
  AgendaOption[]
> {
  const servicos = await getServicos();

  return servicos
    .filter((servico) => servico.ativo)
    .map((servico) => ({
      value: servico.id,
      label: servico.nome,
      description: `${servico.duracaoMinutos} min`,
    }));
}

export async function getAgendaProfissionalOptions(
  search: string,
): Promise<AgendaOption[]> {
  const normalizedSearch = normalizeSearch(search);

  const response =
    await getApiClient().get<unknown>(
      "/agendamentos/opcoes/profissionais",
      {
        params: normalizedSearch
          ? {
              search: normalizedSearch,
            }
          : undefined,
      },
    );

  const profissionais =
    agendaLookupOptionsSchema.parse(
      response.data,
    );

  return profissionais.map((profissional) => ({
    value: profissional.id,
    label: profissional.nome,
  }));
}

export async function getAgendaUnidadeOptions(
  search: string,
): Promise<AgendaOption[]> {
  const normalizedSearch = normalizeSearch(search);

  const response =
    await getApiClient().get<unknown>(
      "/agendamentos/opcoes/unidades",
      {
        params: normalizedSearch
          ? {
              search: normalizedSearch,
            }
          : undefined,
      },
    );

  const unidades =
    agendaLookupOptionsSchema.parse(
      response.data,
    );

  return unidades.map((unidade) => ({
    value: unidade.id,
    label: unidade.nome,
  }));
}

export const agendamentosOptionsApi = {
  clientes: getAgendaClienteOptions,
  servicos: getAgendaServicoOptions,
  profissionais: getAgendaProfissionalOptions,
  unidades: getAgendaUnidadeOptions,
};