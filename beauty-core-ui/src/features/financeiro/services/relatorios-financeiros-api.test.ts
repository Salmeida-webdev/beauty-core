import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getDespesasMes,
  getFluxoCaixaFinanceiro,
  getReceitasMes,
  getResumoFinanceiro,
} from "@/features/financeiro/services/relatorios-financeiros-api";

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: mockGet,
  }),
}));

describe("relatorios financeiros api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("consulta resumo com período real", async () => {
    mockGet.mockResolvedValue({
      data: {
        receitas: 1000,
        despesas: 400,
        saldo: 600,
      },
    });

    await getResumoFinanceiro({
      dataInicio: "2026-08-01T00:00:00.000Z",
      dataFim: "2026-08-29T23:00:00.000Z",
    });

    expect(mockGet.mock.calls[0]?.[0]).toBe("/financeiro/resumo");

    const params = mockGet.mock.calls[0]?.[1]?.params;

    expect(params.get("dataInicio")).toBe("2026-08-01T00:00:00.000Z");

    expect(params.get("dataFim")).toBe("2026-08-29T23:00:00.000Z");
  });

  it("consulta fluxo com período", async () => {
    mockGet.mockResolvedValue({
      data: {
        totalEntradas: 1000,
        totalSaidas: 400,
        saldo: 600,
        movimentacoes: [],
      },
    });

    await getFluxoCaixaFinanceiro({
      dataInicio: "2026-08-01T00:00:00.000Z",
    });

    expect(mockGet.mock.calls[0]?.[0]).toBe("/financeiro/fluxo-caixa");
  });

  it("consulta receitas do mês sem params", async () => {
    mockGet.mockResolvedValue({
      data: {
        total: 800,
      },
    });

    await getReceitasMes();

    expect(mockGet).toHaveBeenCalledWith("/financeiro/receitas-mes");
  });

  it("consulta despesas do mês sem params", async () => {
    mockGet.mockResolvedValue({
      data: {
        total: 300,
      },
    });

    await getDespesasMes();

    expect(mockGet).toHaveBeenCalledWith("/financeiro/despesas-mes");
  });

  it("não envia parâmetros inventados", async () => {
    mockGet.mockResolvedValue({
      data: {
        receitas: 0,
        despesas: 0,
        saldo: 0,
      },
    });

    await getResumoFinanceiro({});

    const params = mockGet.mock.calls[0]?.[1]?.params;

    expect(Array.from(params.keys())).toEqual([]);
  });
});
