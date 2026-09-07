import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  buildAgendamentosRequestParams,
  getAgendamentoById,
  getAgendamentos,
} from "@/features/agendamentos/services/agendamentos-api";
import { getApiClient } from "@/services/api/api-client";

const apiGetMock = vi.hoisted(() =>
  vi.fn(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: vi.fn(() => ({
      get: apiGetMock,
    })),
  }),
);

const ids = {
  agendamento:
    "550e8400-e29b-41d4-a716-446655440000",
  cliente:
    "550e8400-e29b-41d4-a716-446655440001",
  profissional:
    "550e8400-e29b-41d4-a716-446655440002",
  servico:
    "550e8400-e29b-41d4-a716-446655440003",
  unidade:
    "550e8400-e29b-41d4-a716-446655440004",
};

const listItem = {
  id: ids.agendamento,
  clienteId: ids.cliente,
  profissionalId: ids.profissional,
  servicoId: ids.servico,
  unidadeId: ids.unidade,
  dataHoraInicio:
    "2026-08-29T12:00:00.000Z",
  dataHoraFim:
    "2026-08-29T12:45:00.000Z",
  observacoes: null,
  status: "CONFIRMADO",
  createdAt:
    "2026-08-20T12:00:00.000Z",
  updatedAt:
    "2026-08-20T12:00:00.000Z",
  cliente: {
    id: ids.cliente,
    nome: "Maria",
    telefone: "83999999999",
  },
  profissional: {
    id: ids.profissional,
    nome: "Ana",
  },
  servico: {
    id: ids.servico,
    nome: "Corte",
    preco: "80.00",
    duracaoMinutos: 45,
  },
  unidade: {
    id: ids.unidade,
    nome: "Centro",
  },
};

describe("agendamentos api", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(
      getApiClient,
    ).mockReturnValue({
      get: apiGetMock,
    } as never);
  });

  it("monta filtros sem empresaId", () => {
    const params =
      buildAgendamentosRequestParams({
        page: 2,
        limit: 50,
        status: "CONFIRMADO",
        profissionalId:
          ids.profissional,
        dataInicio:
          "2026-08-25T00:00:00.000Z",
        dataFim:
          "2026-08-31T23:59:59.999Z",
      });

    expect(params).toEqual({
      page: 2,
      limit: 50,
      orderBy:
        "dataHoraInicio",
      orderDirection: "asc",
      dataInicio:
        "2026-08-25T00:00:00.000Z",
      dataFim:
        "2026-08-31T23:59:59.999Z",
      status: "CONFIRMADO",
      profissionalId:
        ids.profissional,
    });

    expect(params).not.toHaveProperty(
      "empresaId",
    );
  });

  it("lista agendamentos pelo endpoint real", async () => {
    apiGetMock.mockResolvedValue({
      data: {
        data: [
          listItem,
        ],
        meta: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
        },
      },
    });

    const result =
      await getAgendamentos();

    expect(apiGetMock).toHaveBeenCalledWith(
      "/agendamentos",
      {
        params: {
          page: 1,
          limit: 20,
          orderBy:
            "dataHoraInicio",
          orderDirection: "asc",
        },
      },
    );

    expect(result.data).toHaveLength(
      1,
    );

    expect(result.meta.total).toBe(
      1,
    );
  });

  it("consulta detalhe pelo endpoint real", async () => {
    apiGetMock.mockResolvedValue({
      data: {
        ...listItem,
        cliente: {
          ...listItem.cliente,
          email:
            "maria@example.com",
        },
        profissional: {
          ...listItem.profissional,
          email:
            "ana@example.com",
        },
      },
    });

    const result =
      await getAgendamentoById(
        ids.agendamento,
      );

    expect(apiGetMock).toHaveBeenCalledWith(
      `/agendamentos/${ids.agendamento}`,
    );

    expect(result.id).toBe(
      ids.agendamento,
    );
  });
});