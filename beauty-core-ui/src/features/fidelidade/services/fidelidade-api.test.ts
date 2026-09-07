import { beforeEach, describe, expect, it, vi } from "vitest";

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: getMock,
  }),
}));

import { fidelidadeApi } from "./fidelidade-api";

const id = "550e8400-e29b-41d4-a716-446655440000";

describe("fidelidadeApi", () => {
  beforeEach(() => {
    getMock.mockReset();
  });

  it("consulta saldo sem empresaId", async () => {
    getMock.mockResolvedValue({
      data: {
        id,
        clienteId: id,
        empresaId: "empresa-interna",
        saldoPontos: 80,
        createdAt: "2026-08-30T12:00:00.000Z",
        updatedAt: "2026-08-30T12:00:00.000Z",
      },
    });

    const result = await fidelidadeApi.getSaldo(id);

    expect(getMock).toHaveBeenCalledWith(
      `/fidelidade/cliente/${id}`,
    );
    expect(getMock.mock.calls[0]).toHaveLength(1);
    expect(result).not.toHaveProperty("empresaId");
  });

  it("consulta histórico pelo contrato real", async () => {
    getMock.mockResolvedValue({
      data: [],
    });

    await fidelidadeApi.getHistorico(id);

    expect(getMock).toHaveBeenCalledWith(
      `/fidelidade/historico/${id}`,
    );
  });

  it("consulta configuração sem parâmetros tenant", async () => {
    getMock.mockResolvedValue({
      data: {
        id,
        fidelidadeAtiva: true,
        pontuacaoAutomatica: false,
        pontosPorReal: 1,
        reaisPorPonto: 0.1,
        pontosParaResgate: 100,
        valorResgate: 10,
        niveisAtivos: false,
        beneficiosAutomaticos: false,
        cupomAniversarioAtivo: false,
        cupomAniversarioCodigo: null,
        cupomAniversarioValor: null,
        bonusAniversarioAtivo: false,
        bonusAniversarioPontos: 50,
        automacoesAtivas: false,
        createdAt: "2026-08-30T12:00:00.000Z",
        updatedAt: "2026-08-30T12:00:00.000Z",
      },
    });

    await fidelidadeApi.getConfiguracao();

    expect(getMock).toHaveBeenCalledWith(
      "/configuracao-fidelidade",
    );
    expect(getMock.mock.calls[0]).toHaveLength(1);
  });
});
