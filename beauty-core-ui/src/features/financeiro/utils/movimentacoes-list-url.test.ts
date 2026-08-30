import { describe, expect, it } from "vitest";

import {
  buildMovimentacoesListSearchParams,
  mergeMovimentacoesFilters,
  parseMovimentacoesListSearchParams,
} from "@/features/financeiro/utils/movimentacoes-list-url";

const categoriaId = "550e8400-e29b-41d4-a716-446655440000";

const clienteId = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

describe("movimentações list URL", () => {
  it("parseia somente parâmetros suportados", () => {
    const parsed = parseMovimentacoesListSearchParams(
      new URLSearchParams({
        page: "2",
        limit: "25",
        categoriaId,
        clienteId,
        tipo: "RECEITA",
        status: "PAGO",
        orderBy: "valor",
        orderDirection: "asc",
      }),
    );

    expect(parsed).toEqual({
      page: 2,
      limit: 25,
      categoriaId,
      clienteId,
      tipo: "RECEITA",
      status: "PAGO",
      orderBy: "valor",
      orderDirection: "asc",
    });
  });

  it("ignora filtros não suportados pela listagem", () => {
    const parsed = parseMovimentacoesListSearchParams(
      new URLSearchParams({
        dataInicio: "2026-08-01",
        dataFim: "2026-08-31",
        period: "month",
        search: "energia",
        empresaId: "550e8400-e29b-41d4-a716-446655440000",
      }),
    );

    expect(parsed).toEqual({});
    expect(parsed).not.toHaveProperty("empresaId");
    expect(parsed).not.toHaveProperty("dataInicio");
  });

  it("ignora valores inválidos", () => {
    const parsed = parseMovimentacoesListSearchParams(
      new URLSearchParams({
        page: "-1",
        limit: "abc",
        categoriaId: "invalido",
        tipo: "OUTRO",
        status: "CONCLUIDO",
        orderBy: "saldo",
        orderDirection: "up",
      }),
    );

    expect(parsed).toEqual({});
  });

  it("serializa somente contrato suportado", () => {
    const params = buildMovimentacoesListSearchParams({
      page: 3,
      limit: 50,
      tipo: "DESPESA",
      status: "PENDENTE",
      orderBy: "dataMovimentacao",
      orderDirection: "desc",
    });

    expect(params.get("page")).toBe("3");
    expect(params.get("limit")).toBe("50");
    expect(params.get("tipo")).toBe("DESPESA");
    expect(params.get("status")).toBe("PENDENTE");
    expect(params.has("dataInicio")).toBe(false);
    expect(params.has("empresaId")).toBe(false);
  });

  it("reseta página ao alterar filtro", () => {
    expect(
      mergeMovimentacoesFilters(
        {
          page: 4,
          limit: 20,
          status: "PAGO",
        },
        {
          status: "PENDENTE",
        },
      ),
    ).toEqual({
      page: 1,
      limit: 20,
      status: "PENDENTE",
    });
  });
});
