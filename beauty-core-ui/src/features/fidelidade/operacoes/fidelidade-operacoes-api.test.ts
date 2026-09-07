import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const { postMock } = vi.hoisted(
  () => ({
    postMock: vi.fn(),
  }),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      post: postMock,
    }),
  }),
);

import { fidelidadeOperacoesApi } from "./fidelidade-operacoes-api";

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

describe("fidelidadeOperacoesApi", () => {
  beforeEach(() => {
    postMock.mockReset();

    postMock.mockResolvedValue({
      data: {},
    });
  });

  it("adiciona pontos pelo endpoint real", async () => {
    const payload = {
      clienteId,
      pontos: 10,
      descricao: "Ajuste administrativo",
    };

    await fidelidadeOperacoesApi.adicionarPontos(
      payload,
    );

    expect(postMock).toHaveBeenCalledWith(
      "/fidelidade/adicionar-pontos",
      payload,
    );
  });

  it("resgata pontos pelo endpoint real", async () => {
    const payload = {
      clienteId,
      pontos: 10,
      descricao: "Resgate autorizado",
    };

    await fidelidadeOperacoesApi.resgatarPontos(
      payload,
    );

    expect(postMock).toHaveBeenCalledWith(
      "/fidelidade/resgatar-pontos",
      payload,
    );
  });

  it("pontua por valor sem calcular pontos localmente", async () => {
    const payload = {
      clienteId,
      valorGasto: 100,
      descricao: "Atendimento",
    };

    await fidelidadeOperacoesApi.pontuarPorValor(
      payload,
    );

    expect(postMock).toHaveBeenCalledWith(
      "/fidelidade/pontuar-por-valor",
      payload,
    );

    expect(payload).not.toHaveProperty(
      "pontos",
    );
  });

  it("não envia tenant nem referências fictícias", async () => {
    const payload = {
      clienteId,
      pontos: 10,
      descricao: "Ajuste",
    };

    await fidelidadeOperacoesApi.adicionarPontos(
      payload,
    );

    expect(payload).not.toHaveProperty(
      "empresaId",
    );

    expect(payload).not.toHaveProperty(
      "referenciaId",
    );

    expect(payload).not.toHaveProperty(
      "beneficioId",
    );
  });
});
