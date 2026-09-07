import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { updateAgendamento } from "@/features/agendamentos/services/agendamentos-api";
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

const payload = {
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
  observacoes:
    "Atualizado.",
};

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(
    getApiClient,
  ).mockReturnValue({
    patch: apiPatch,
  } as never);
});

describe("agendamentos update api", () => {
  it("usa PATCH /agendamentos/:id sem empresaId e sem status", async () => {
    apiPatch.mockResolvedValue({
      data: {
        id,
        empresaId:
          "550e8400-e29b-41d4-a716-446655449999",
        ...payload,
        status: "CONFIRMADO",
        createdAt:
          "2026-08-20T12:00:00.000Z",
        updatedAt:
          "2026-08-29T16:00:00.000Z",

        cliente: {
          id: payload.clienteId,
          nome: "Maria",
          telefone:
            "83999999999",
          email:
            "maria@example.com",
        },

        profissional: {
          id:
            payload.profissionalId,
          nome: "Ana",
          email:
            "ana@example.com",
        },

        servico: {
          id:
            payload.servicoId,
          nome: "Corte",
          preco: "80.00",
          duracaoMinutos: 45,
        },

        unidade: {
          id:
            payload.unidadeId,
          nome: "Centro",
        },
      },
    });

    const result =
      await updateAgendamento(
        id,
        payload,
      );

    expect(
      apiPatch,
    ).toHaveBeenCalledWith(
      `/agendamentos/${id}`,
      payload,
    );

    expect(payload).not.toHaveProperty(
      "empresaId",
    );

    expect(payload).not.toHaveProperty(
      "status",
    );

    expect(result.id).toBe(id);

    expect(
      result,
    ).not.toHaveProperty(
      "empresaId",
    );
  });
});