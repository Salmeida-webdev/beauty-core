import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { createAgendamento } from "@/features/agendamentos/services/agendamentos-api";
import { getApiClient } from "@/services/api/api-client";

const apiPost = vi.hoisted(
  () => vi.fn(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: vi.fn(() => ({
      post: apiPost,
    })),
  }),
);

const payload = {
  unidadeId:
    "550e8400-e29b-41d4-a716-446655440004",
  clienteId:
    "550e8400-e29b-41d4-a716-446655440001",
  servicoId:
    "550e8400-e29b-41d4-a716-446655440003",
  profissionalId:
    "550e8400-e29b-41d4-a716-446655440002",
  dataHoraInicio:
    "2026-08-29T15:00:00.000Z",
  dataHoraFim:
    "2026-08-29T15:45:00.000Z",
};

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(
    getApiClient,
  ).mockReturnValue({
    post: apiPost,
  } as never);
});

describe("agendamentos create api", () => {
  it("usa POST /agendamentos com payload sem empresa", async () => {
    apiPost.mockResolvedValue({
      data: {
        id:
          "550e8400-e29b-41d4-a716-446655440000",
        empresaId:
          "550e8400-e29b-41d4-a716-446655449999",
        ...payload,
        observacoes: null,
        status: "PENDENTE",
        createdAt:
          "2026-08-29T14:00:00.000Z",
        updatedAt:
          "2026-08-29T14:00:00.000Z",
      },
    });

    const result =
      await createAgendamento(
        payload,
      );

    expect(
      apiPost,
    ).toHaveBeenCalledWith(
      "/agendamentos",
      payload,
    );

    expect(
      payload,
    ).not.toHaveProperty(
      "empresaId",
    );

    expect(result.status).toBe(
      "PENDENTE",
    );

    expect(
      result,
    ).not.toHaveProperty(
      "empresaId",
    );
  });
});