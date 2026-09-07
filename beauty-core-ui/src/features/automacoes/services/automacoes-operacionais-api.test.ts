import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const apiGet = vi.hoisted(
  () => vi.fn(),
);

const apiPost = vi.hoisted(
  () => vi.fn(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      get: apiGet,
      post: apiPost,
    }),
  }),
);

import {
  listarAutomacaoEventos,
  processarAutomacaoEvento,
  testarAutomacaoAniversario,
  testarAutomacaoRelatorio,
} from "./automacoes-api";

describe("Chat 54 — automações operacionais API", () => {
  beforeEach(() => {
    apiGet.mockReset();
    apiPost.mockReset();
  });

  it("lista eventos pela rota real", async () => {
    apiGet.mockResolvedValue({
      data: {
        total: 0,
        porTipo: {},
        porModulo: {},
        eventos: [],
      },
    });

    const result =
      await listarAutomacaoEventos();

    expect(apiGet).toHaveBeenCalledWith(
      "/automacoes/eventos",
    );

    expect(result.total).toBe(0);
  });

  it("processa evento sem empresaId", async () => {
    apiPost.mockResolvedValue({
      data: {
        processado: true,
        processamento: "assincrono",
        notificacaoGerada: true,
        jobId: "job-1",
        queue: "notificacoes",
      },
    });

    await processarAutomacaoEvento({
      tipo: "CLIENTE_CADASTRADO",
      modulo: "clientes",
    });

    expect(apiPost).toHaveBeenCalledWith(
      "/automacoes/eventos",
      {
        tipo: "CLIENTE_CADASTRADO",
        modulo: "clientes",
      },
    );

    expect(
      apiPost.mock.calls[0]?.[1],
    ).not.toHaveProperty(
      "empresaId",
    );
  });

  it("rejeita empresaId arbitrário antes do request", async () => {
    await expect(
      processarAutomacaoEvento({
        tipo: "CLIENTE_CADASTRADO",
        modulo: "clientes",
        empresaId: "empresa-arbitraria",
      } as never),
    ).rejects.toBeDefined();

    expect(apiPost).not.toHaveBeenCalled();
  });

  it("executa teste de aniversário sem payload inventado", async () => {
    apiPost.mockResolvedValue({
      data: {
        processado: true,
        processamento: "assincrono",
        queue: "aniversarios",
        jobId: "job-2",
      },
    });

    await testarAutomacaoAniversario();

    expect(apiPost).toHaveBeenCalledWith(
      "/automacoes/teste-aniversario",
    );
  });

  it("executa teste de relatório sem payload inventado", async () => {
    apiPost.mockResolvedValue({
      data: {
        processado: true,
        processamento: "assincrono",
        queue: "relatorios",
        jobId: "job-3",
      },
    });

    await testarAutomacaoRelatorio();

    expect(apiPost).toHaveBeenCalledWith(
      "/automacoes/teste-relatorio",
    );
  });
});