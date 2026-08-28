import { beforeEach, describe, expect, it, vi } from "vitest";

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: getMock,
  }),
}));

import {
  buildDashboardRequestParams,
  getClientsAnalytics,
  getDashboardSummary,
  getFinancialAnalytics,
} from "@/features/dashboard/services/dashboard-api";

describe("dashboard api", () => {
  beforeEach(() => {
    getMock.mockReset();
  });

  it("envia o período ao endpoint consolidado e valida a resposta", async () => {
    const filters = {
      dataInicio: "2026-08-01T03:00:00.000Z",
      dataFim: "2026-09-01T02:59:59.999Z",
    };

    const payload = {
      clientes: {
        totalClientes: 10,
        clientesAtivos: 8,
        clientesInativos: 2,
        clientesAniversariantesMes: 1,
      },
      agendamentos: {
        totalAgendamentos: 20,
        confirmados: 4,
        cancelados: 2,
        concluidos: 12,
        pendentes: 2,
      },
      financeiro: {
        receitas: 1000,
        despesas: 300,
        saldo: 700,
        ticketMedio: 83.33,
      },
      fidelidade: {
        clientesComPontos: 5,
        pontosDistribuidos: 500,
        beneficiosLiberados: 2,
      },
      pacotes: {
        pacotesAtivos: 3,
        pacotesFinalizados: 1,
        pacotesVencidos: 0,
      },
      whatsapp: {
        mensagensCriadas: 8,
        mensagensEnviadas: 0,
        campanhasCriadas: 1,
      },
    };

    getMock.mockResolvedValueOnce({
      data: payload,
    });

    await expect(
      getDashboardSummary(filters),
    ).resolves.toEqual(payload);

    expect(getMock).toHaveBeenCalledWith(
      "/analytics/dashboard",
      {
        params: filters,
      },
    );
  });

  it("não envia filtros para o snapshot de clientes", async () => {
    getMock.mockResolvedValueOnce({
      data: {
        totalClientes: 1,
        ativos: 1,
        inativos: 0,
        novosUltimos30Dias: 1,
        aniversariantesMes: 0,
        crescimentoPercentual: 100,
      },
    });

    await getClientsAnalytics();

    expect(getMock).toHaveBeenCalledWith(
      "/analytics/clientes",
    );
  });

  it("remove propriedades indefinidas dos parâmetros", () => {
    expect(
      buildDashboardRequestParams({
        dataInicio:
          "2026-08-01T03:00:00.000Z",
      }),
    ).toEqual({
      dataInicio:
        "2026-08-01T03:00:00.000Z",
    });

    expect(
      buildDashboardRequestParams({}),
    ).toBeUndefined();
  });

  it("rejeita resposta financeira inválida", async () => {
    getMock.mockResolvedValueOnce({
      data: {
        receitas: -1,
        despesas: 0,
        saldo: -1,
        ticketMedio: 0,
        receitasMes: 0,
        despesasMes: 0,
        crescimentoFinanceiro: 0,
      },
    });

    await expect(
      getFinancialAnalytics({
        dataInicio:
          "2026-08-01T03:00:00.000Z",
        dataFim:
          "2026-09-01T02:59:59.999Z",
      }),
    ).rejects.toThrow();
  });
});
