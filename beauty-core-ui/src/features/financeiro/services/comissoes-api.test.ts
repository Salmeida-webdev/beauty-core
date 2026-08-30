import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createComissao,
  getComissao,
  listComissoes,
  pagarComissao,
} from "@/features/financeiro/services/comissoes-api";

const { mockGet, mockPost, mockPatch } = vi.hoisted(() => ({
  mockGet: vi.fn(),
  mockPost: vi.fn(),
  mockPatch: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: mockGet,
    post: mockPost,
    patch: mockPatch,
  }),
}));

const comissao = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  profissionalId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
  valorServico: "200.00",
  percentual: "10.00",
  valorComissao: "20.00",
  status: "PENDENTE",
  createdAt: "2026-08-29T12:00:00.000Z",
  updatedAt: "2026-08-29T12:00:00.000Z",
};

describe("comissoes api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lista sem filtros ou query params", async () => {
    mockGet.mockResolvedValue({
      data: [comissao],
    });

    await expect(listComissoes()).resolves.toHaveLength(1);

    expect(mockGet).toHaveBeenCalledWith("/comissoes");

    expect(mockGet.mock.calls[0]).toHaveLength(1);
  });

  it("consulta detalhe", async () => {
    mockGet.mockResolvedValue({
      data: comissao,
    });

    await getComissao(comissao.id);

    expect(mockGet).toHaveBeenCalledWith(`/comissoes/${comissao.id}`);
  });

  it("cria somente com DTO real", async () => {
    mockPost.mockResolvedValue({
      data: comissao,
    });

    const payload = {
      profissionalId: comissao.profissionalId,
      agendamentoId: comissao.agendamentoId,
      valorServico: 200,
      percentual: 10,
    };

    await createComissao(payload);

    expect(mockPost).toHaveBeenCalledWith("/comissoes", payload);

    expect(payload).not.toHaveProperty("valorComissao");

    expect(payload).not.toHaveProperty("empresaId");
  });

  it("paga pela rota dedicada sem body", async () => {
    mockPatch.mockResolvedValue({
      data: {
        ...comissao,
        status: "PAGO",
      },
    });

    await expect(pagarComissao(comissao.id)).resolves.toMatchObject({
      status: "PAGO",
    });

    expect(mockPatch).toHaveBeenCalledWith(`/comissoes/${comissao.id}/pagar`);

    expect(mockPatch.mock.calls[0]).toHaveLength(1);
  });
});
