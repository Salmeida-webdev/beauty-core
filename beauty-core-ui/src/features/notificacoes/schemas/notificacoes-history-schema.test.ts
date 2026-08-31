import {
  describe,
  expect,
  it,
} from "vitest";

import {
  notificacaoResumoSchema,
  notificacoesListParamsSchema,
  notificacoesListResponseSchema,
  notificacoesResumoGeralSchema,
} from "./notificacoes.schemas";

const notificacao = {
  id: "notificacao-1",
  empresaId: "empresa-interna",
  usuarioId: "usuario-1",
  clienteId: null,
  tipo: "SISTEMA",
  titulo: "Aviso operacional",
  mensagem: "Mensagem da notificação.",
  status: "NAO_LIDA",
  dataLeitura: null,
  createdAt:
    "2026-08-30T20:00:00.000Z",
  updatedAt:
    "2026-08-30T20:00:00.000Z",
};

describe("Chat 54 — histórico de notificações", () => {
  it("valida registro e remove empresaId", () => {
    const parsed =
      notificacaoResumoSchema.parse(
        notificacao,
      );

    expect(parsed.id).toBe(
      "notificacao-1",
    );

    expect(parsed).not.toHaveProperty(
      "empresaId",
    );
  });

  it("mantém os três status reais", () => {
    for (const status of [
      "NAO_LIDA",
      "LIDA",
      "ARQUIVADA",
    ] as const) {
      expect(
        notificacaoResumoSchema.safeParse({
          ...notificacao,
          status,
        }).success,
      ).toBe(true);
    }
  });

  it("aplica paginação pública padrão", () => {
    expect(
      notificacoesListParamsSchema.parse(
        {},
      ),
    ).toEqual({
      page: 1,
      limit: 20,
      orderBy: "createdAt",
      orderDirection: "desc",
    });
  });

  it("aceita busca pública", () => {
    const parsed =
      notificacoesListParamsSchema.parse({
        search: "aviso",
      });

    expect(parsed.search).toBe(
      "aviso",
    );
  });

  it("rejeita status via query pública", () => {
    const result =
      notificacoesListParamsSchema.safeParse({
        status: "NAO_LIDA",
      });

    expect(result.success).toBe(false);
  });

  it("rejeita tipo e período via query pública", () => {
    expect(
      notificacoesListParamsSchema.safeParse({
        tipo: "SISTEMA",
      }).success,
    ).toBe(false);

    expect(
      notificacoesListParamsSchema.safeParse({
        dataInicio: "2026-08-01",
      }).success,
    ).toBe(false);
  });

  it("valida listagem paginada", () => {
    const parsed =
      notificacoesListResponseSchema.parse({
        data: [notificacao],
        meta: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
        },
      });

    expect(parsed.data).toHaveLength(1);
  });

  it("valida resumo real", () => {
    expect(
      notificacoesResumoGeralSchema.parse({
        total: 10,
        naoLidas: 3,
        lidas: 5,
        arquivadas: 2,
      }),
    ).toEqual({
      total: 10,
      naoLidas: 3,
      lidas: 5,
      arquivadas: 2,
    });
  });
});