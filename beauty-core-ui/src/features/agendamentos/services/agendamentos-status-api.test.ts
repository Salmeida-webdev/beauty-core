import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  cancelAgendamento,
  changeAgendamentoStatus,
} from "@/features/agendamentos/services/agendamentos-api";
import { getApiClient } from "@/services/api/api-client";

const apiPatch = vi.hoisted(
  () => vi.fn(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: vi.fn(() => ({
      patch: apiPatch,
    })),
  }),
);

const id =
  "550e8400-e29b-41d4-a716-446655440000";

const response = {
  id,
  empresaId:
    "550e8400-e29b-41d4-a716-446655449999",
  clienteId:
    "550e8400-e29b-41d4-a716-446655440001",
  profissionalId:
    "550e8400-e29b-41d4-a716-446655440002",
  servicoId:
    "550e8400-e29b-41d4-a716-446655440003",
  unidadeId:
    "550e8400-e29b-41d4-a716-446655440004",
  dataHoraInicio:
    "2026-08-29T15:00:00.000Z",
  dataHoraFim:
    "2026-08-29T15:45:00.000Z",
  observacoes: null,
  status: "CONFIRMADO",
  createdAt:
    "2026-08-20T12:00:00.000Z",
  updatedAt:
    "2026-08-29T16:00:00.000Z",

  cliente: {
    id:
      "550e8400-e29b-41d4-a716-446655440001",
    nome: "Maria",
    telefone:
      "83999999999",
    email:
      "maria@example.com",
  },

  profissional: {
    id:
      "550e8400-e29b-41d4-a716-446655440002",
    nome: "Ana",
    email:
      "ana@example.com",
  },

  servico: {
    id:
      "550e8400-e29b-41d4-a716-446655440003",
    nome: "Corte",
    preco: "80.00",
    duracaoMinutos: 45,
  },

  unidade: {
    id:
      "550e8400-e29b-41d4-a716-446655440004",
    nome: "Centro",
  },
};

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(
    getApiClient,
  ).mockReturnValue({
    patch: apiPatch,
  } as never);
});

describe("agendamentos status api", () => {
  it("altera status via PATCH /agendamentos/:id", async () => {
    apiPatch.mockResolvedValue({
      data: response,
    });

    const result =
      await changeAgendamentoStatus(
        id,
        "CONFIRMADO",
      );

    expect(
      apiPatch,
    ).toHaveBeenCalledWith(
      `/agendamentos/${id}`,
      {
        status:
          "CONFIRMADO",
      },
    );

    expect(result.status).toBe(
      "CONFIRMADO",
    );

    expect(
      result,
    ).not.toHaveProperty(
      "empresaId",
    );
  });

  it("cancela pela rota dedicada sem payload", async () => {
    apiPatch.mockResolvedValue({
      data: {
        ...response,
        status:
          "CANCELADO",
      },
    });

    const result =
      await cancelAgendamento(
        id,
      );

    expect(
      apiPatch,
    ).toHaveBeenCalledWith(
      `/agendamentos/${id}/cancelar`,
    );

    expect(result.status).toBe(
      "CANCELADO",
    );

    expect(
      result,
    ).not.toHaveProperty(
      "empresaId",
    );
  });
});