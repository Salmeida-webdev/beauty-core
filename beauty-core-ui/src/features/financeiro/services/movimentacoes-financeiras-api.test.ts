import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  cancelarMovimentacaoFinanceira,
  createMovimentacaoFinanceira,
  getMovimentacaoFinanceira,
  listMovimentacoesFinanceiras,
  pagarMovimentacaoFinanceira,
  updateMovimentacaoFinanceira,
} from "@/features/financeiro/services/movimentacoes-financeiras-api";

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

const movimentacao = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  categoriaId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  clienteId: null,
  agendamentoId: null,
  descricao: "Energia",
  tipo: "DESPESA",
  valor: "150.00",
  formaPagamento: "PIX",
  status: "PENDENTE",
  dataMovimentacao: "2026-08-29T12:00:00.000Z",
  observacoes: null,
  createdAt: "2026-08-29T12:00:00.000Z",
  updatedAt: "2026-08-29T12:00:00.000Z",
};

describe("movimentações financeiras api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lista por GET", async () => {
    mockGet.mockResolvedValue({
      data: {
        data: [movimentacao],
        total: 1,
        page: 1,
        limit: 20,
      },
    });

    await listMovimentacoesFinanceiras();

    expect(mockGet.mock.calls[0]?.[0]).toBe("/financeiro");
  });

  it("consulta detalhe por GET", async () => {
    mockGet.mockResolvedValue({
      data: movimentacao,
    });

    await getMovimentacaoFinanceira(movimentacao.id);

    expect(mockGet).toHaveBeenCalledWith(`/financeiro/${movimentacao.id}`);
  });

  it("cria por POST", async () => {
    mockPost.mockResolvedValue({
      data: movimentacao,
    });

    await createMovimentacaoFinanceira({
      categoriaId: movimentacao.categoriaId,
      descricao: "Energia",
      tipo: "DESPESA",
      valor: 150,
      formaPagamento: "PIX",
    });

    expect(mockPost.mock.calls[0]?.[0]).toBe("/financeiro");
  });

  it("edita por PATCH", async () => {
    mockPatch.mockResolvedValue({
      data: movimentacao,
    });

    await updateMovimentacaoFinanceira(movimentacao.id, {
      descricao: "Energia",
    });

    expect(mockPatch.mock.calls[0]?.[0]).toBe(`/financeiro/${movimentacao.id}`);
  });

  it("registra pagamento pelo endpoint dedicado", async () => {
    mockPatch.mockResolvedValue({
      data: {
        ...movimentacao,
        status: "PAGO",
      },
    });

    await pagarMovimentacaoFinanceira(movimentacao.id, {
      formaPagamento: "PIX",
    });

    expect(mockPatch).toHaveBeenCalledWith(
      `/financeiro/${movimentacao.id}/pagar`,
      {
        formaPagamento: "PIX",
      },
    );
  });

  it("cancela sem body pelo endpoint dedicado", async () => {
    mockPatch.mockResolvedValue({
      data: {
        ...movimentacao,
        status: "CANCELADO",
      },
    });

    await expect(
      cancelarMovimentacaoFinanceira(movimentacao.id),
    ).resolves.toMatchObject({
      status: "CANCELADO",
    });

    expect(mockPatch).toHaveBeenCalledWith(
      `/financeiro/${movimentacao.id}/cancelar`,
    );

    expect(mockPatch.mock.calls[0]).toHaveLength(1);
  });
});
