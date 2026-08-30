import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  getMock,
  postMock,
  patchMock,
  deleteMock,
} = vi.hoisted(() => ({
  getMock: vi.fn(),
  postMock: vi.fn(),
  patchMock: vi.fn(),
  deleteMock: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: getMock,
    post: postMock,
    patch: patchMock,
    delete: deleteMock,
  }),
}));

import { fidelidadeProgramaApi } from "./fidelidade-programa-api";

const id = "550e8400-e29b-41d4-a716-446655440000";

const configuracao = {
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
};

const nivel = {
  id,
  nome: "Nível personalizado",
  pontosMinimos: 100,
  beneficios: null,
  createdAt: "2026-08-30T12:00:00.000Z",
  updatedAt: "2026-08-30T12:00:00.000Z",
};

describe("fidelidadeProgramaApi", () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    patchMock.mockReset();
    deleteMock.mockReset();
  });

  it("consulta configuração", async () => {
    getMock.mockResolvedValue({ data: configuracao });

    await fidelidadeProgramaApi.getConfiguracao();

    expect(getMock).toHaveBeenCalledWith(
      "/configuracao-fidelidade",
    );
  });

  it("cria configuração com payload explícito", async () => {
    postMock.mockResolvedValue({ data: configuracao });

    const payload = {
      fidelidadeAtiva: true,
      pontuacaoAutomatica: false,
      reaisPorPonto: 0.1,
      niveisAtivos: false,
      beneficiosAutomaticos: false,
      bonusAniversarioAtivo: false,
    };

    await fidelidadeProgramaApi.createConfiguracao(payload);

    expect(postMock).toHaveBeenCalledWith(
      "/configuracao-fidelidade",
      payload,
    );

    expect(postMock).not.toHaveBeenCalledWith(
      "/configuracao-fidelidade",
      {},
    );
  });

  it("atualiza configuração sem tenant arbitrário", async () => {
    patchMock.mockResolvedValue({ data: configuracao });

    const payload = {
      fidelidadeAtiva: true,
      pontuacaoAutomatica: true,
      reaisPorPonto: 1,
      niveisAtivos: true,
      beneficiosAutomaticos: false,
      bonusAniversarioAtivo: true,
      bonusAniversarioPontos: 25,
    };

    await fidelidadeProgramaApi.updateConfiguracao(payload);

    expect(patchMock).toHaveBeenCalledWith(
      "/configuracao-fidelidade",
      payload,
    );

    expect(payload).not.toHaveProperty("empresaId");
  });

  it("lista níveis", async () => {
    getMock.mockResolvedValue({ data: [nivel] });

    await fidelidadeProgramaApi.getNiveis();

    expect(getMock).toHaveBeenCalledWith(
      "/niveis-fidelidade",
    );
  });

  it("cria nível", async () => {
    postMock.mockResolvedValue({ data: nivel });

    const payload = {
      nome: "Nível personalizado",
      pontosMinimos: 100,
    };

    await fidelidadeProgramaApi.createNivel(payload);

    expect(postMock).toHaveBeenCalledWith(
      "/niveis-fidelidade",
      payload,
    );
  });

  it("atualiza nível", async () => {
    patchMock.mockResolvedValue({ data: nivel });

    const payload = {
      nome: "Nível atualizado",
      pontosMinimos: 200,
      beneficios: "Benefício",
    };

    await fidelidadeProgramaApi.updateNivel(id, payload);

    expect(patchMock).toHaveBeenCalledWith(
      `/niveis-fidelidade/${id}`,
      payload,
    );
  });

  it("remove nível pelo endpoint real", async () => {
    deleteMock.mockResolvedValue({ data: {} });

    await fidelidadeProgramaApi.removeNivel(id);

    expect(deleteMock).toHaveBeenCalledWith(
      `/niveis-fidelidade/${id}`,
    );
  });
});
