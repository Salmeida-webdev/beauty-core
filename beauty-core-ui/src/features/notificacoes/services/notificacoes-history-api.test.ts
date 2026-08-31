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

const apiDelete = vi.hoisted(
  () => vi.fn(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      get: apiGet,
      patch: apiPatch,
      delete: apiDelete,
    }),
  }),
);

import {
  archiveNotificacao,
  deleteNotificacao,
  getNotificacao,
  getNotificacoesResumo,
  listNotificacoes,
  listNotificacoesNaoLidas,
  markNotificacaoAsRead,
} from "./notificacoes-api";

const notificacao = {
  id: "notificacao-1",
  empresaId: "empresa-interna",
  usuarioId: "usuario-1",
  clienteId: null,
  tipo: "SISTEMA",
  titulo: "Aviso",
  mensagem: "Mensagem",
  status: "NAO_LIDA",
  dataLeitura: null,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

const paginada = {
  data: [notificacao],
  meta: {
    page: 1,
    limit: 20,
    total: 1,
    totalPages: 1,
  },
};

describe("Chat 54 — Notificações API", () => {
  beforeEach(() => {
    apiGet.mockReset();
    apiPatch.mockReset();
    apiDelete.mockReset();
  });

  it("lista com PaginationDto público", async () => {
    apiGet.mockResolvedValue({
      data: paginada,
    });

    await listNotificacoes({
      page: 1,
      limit: 20,
      search: "aviso",
      orderBy: "createdAt",
      orderDirection: "desc",
    });

    expect(apiGet).toHaveBeenCalledWith(
      "/notificacoes",
      {
        params: {
          page: 1,
          limit: 20,
          search: "aviso",
          orderBy: "createdAt",
          orderDirection: "desc",
        },
      },
    );
  });

  it("usa endpoint dedicado para não lidas", async () => {
    apiGet.mockResolvedValue({
      data: paginada,
    });

    await listNotificacoesNaoLidas();

    expect(apiGet).toHaveBeenCalledWith(
      "/notificacoes/nao-lidas",
      {
        params: {
          page: 1,
          limit: 20,
          orderBy: "createdAt",
          orderDirection: "desc",
        },
      },
    );
  });

  it("carrega resumo real", async () => {
    apiGet.mockResolvedValue({
      data: {
        total: 4,
        naoLidas: 1,
        lidas: 2,
        arquivadas: 1,
      },
    });

    await getNotificacoesResumo();

    expect(apiGet).toHaveBeenCalledWith(
      "/notificacoes/resumo",
    );
  });

  it("busca detalhe real", async () => {
    apiGet.mockResolvedValue({
      data: notificacao,
    });

    const result =
      await getNotificacao(
        "notificacao-1",
      );

    expect(apiGet).toHaveBeenCalledWith(
      "/notificacoes/notificacao-1",
    );

    expect(result).not.toHaveProperty(
      "empresaId",
    );
  });

  it("marca individual como lida", async () => {
    apiPatch.mockResolvedValue({
      data: {
        ...notificacao,
        status: "LIDA",
        dataLeitura:
          "2026-08-30T21:00:00.000Z",
      },
    });

    const result =
      await markNotificacaoAsRead(
        "notificacao-1",
      );

    expect(apiPatch).toHaveBeenCalledWith(
      "/notificacoes/notificacao-1/lida",
    );

    expect(result.status).toBe("LIDA");
  });

  it("arquiva individualmente", async () => {
    apiPatch.mockResolvedValue({
      data: {
        ...notificacao,
        status: "ARQUIVADA",
      },
    });

    const result =
      await archiveNotificacao(
        "notificacao-1",
      );

    expect(apiPatch).toHaveBeenCalledWith(
      "/notificacoes/notificacao-1/arquivar",
    );

    expect(result.status).toBe(
      "ARQUIVADA",
    );
  });

  it("exclui pela rota real", async () => {
    apiDelete.mockResolvedValue({
      data: {
        message:
          "Notificação excluída com sucesso.",
      },
    });

    await deleteNotificacao(
      "notificacao-1",
    );

    expect(apiDelete).toHaveBeenCalledWith(
      "/notificacoes/notificacao-1",
    );
  });

  it("não envia filtros internos não públicos", async () => {
    apiGet.mockResolvedValue({
      data: paginada,
    });

    await listNotificacoes({
      page: 1,
    });

    const config =
      apiGet.mock.calls[0]?.[1];

    expect(config).not.toEqual(
      expect.objectContaining({
        params: expect.objectContaining({
          status: expect.anything(),
        }),
      }),
    );
  });
});