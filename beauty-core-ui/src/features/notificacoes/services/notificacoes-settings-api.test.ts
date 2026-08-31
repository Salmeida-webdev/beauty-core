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

const apiPatch = vi.hoisted(
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
      patch: apiPatch,
      post: apiPost,
    }),
  }),
);

import {
  getConfiguracaoNotificacao,
  updateConfiguracaoNotificacao,
} from "./notificacoes-api";

const configuracao = {
  id: "config-1",
  empresaId: "empresa-interna",
  notificarAgendamentos: true,
  notificarFinanceiro: true,
  notificarFidelidade: true,
  notificarPacotes: true,
  notificarClientes: true,
  notificarMarketing: false,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

const payload = {
  notificarAgendamentos: true,
  notificarFinanceiro: true,
  notificarFidelidade: true,
  notificarPacotes: true,
  notificarClientes: true,
  notificarMarketing: false,
};

describe("Chat 54 — configurações API", () => {
  beforeEach(() => {
    apiGet.mockReset();
    apiPatch.mockReset();
    apiPost.mockReset();
  });

  it("carrega configuração pela rota real", async () => {
    apiGet.mockResolvedValue({
      data: configuracao,
    });

    const result =
      await getConfiguracaoNotificacao();

    expect(apiGet).toHaveBeenCalledWith(
      "/configuracoes-notificacao",
    );

    expect(result).not.toHaveProperty(
      "empresaId",
    );
  });

  it("atualiza pela rota PATCH real", async () => {
    apiPatch.mockResolvedValue({
      data: configuracao,
    });

    await updateConfiguracaoNotificacao(
      payload,
    );

    expect(apiPatch).toHaveBeenCalledWith(
      "/configuracoes-notificacao",
      payload,
    );
  });

  it("não usa POST no fluxo frontend", async () => {
    apiGet.mockResolvedValue({
      data: configuracao,
    });

    await getConfiguracaoNotificacao();

    expect(apiPost).not.toHaveBeenCalled();
  });

  it("não envia empresaId", async () => {
    apiPatch.mockResolvedValue({
      data: configuracao,
    });

    await updateConfiguracaoNotificacao(
      payload,
    );

    expect(
      apiPatch.mock.calls[0]?.[1],
    ).not.toHaveProperty(
      "empresaId",
    );
  });
});