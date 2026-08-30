import { describe, expect, it } from "vitest";

import { financeiroKeys } from "@/features/financeiro/queries/financeiro-keys";
import { financeiroListQuerySchema } from "@/features/financeiro/schemas/financeiro.schemas";
import { buildFinanceiroSearchParams } from "@/features/financeiro/services/financeiro-api";
import { sanitizeFinanceiroListQuery } from "@/features/financeiro/utils/financeiro-query";

describe("contrato de ordenação financeira", () => {
  it("aceita as sete ordenações reais", () => {
    for (const orderBy of [
      "dataMovimentacao",
      "createdAt",
      "updatedAt",
      "valor",
      "status",
      "tipo",
      "descricao",
    ] as const) {
      expect(
        financeiroListQuerySchema.safeParse({
          orderBy,
          orderDirection: "desc",
        }).success,
      ).toBe(true);
    }
  });

  it("rejeita ordenação e direção inventadas", () => {
    expect(
      financeiroListQuerySchema.safeParse({
        orderBy: "saldo",
      }).success,
    ).toBe(false);

    expect(
      financeiroListQuerySchema.safeParse({
        orderDirection: "up",
      }).success,
    ).toBe(false);
  });

  it("preserva ordenação no sanitizador e query key", () => {
    const sanitized = sanitizeFinanceiroListQuery({
      page: 2,
      orderBy: "valor",
      orderDirection: "asc",
    });

    expect(sanitized).toEqual({
      page: 2,
      orderBy: "valor",
      orderDirection: "asc",
    });

    expect(
      financeiroKeys.movimentacoes({
        page: 2,
        orderBy: "valor",
        orderDirection: "asc",
      }),
    ).toEqual([
      "financeiro",
      "movimentacoes",
      {
        page: 2,
        orderBy: "valor",
        orderDirection: "asc",
      },
    ]);
  });

  it("serializa ordenação para o backend", () => {
    const params = buildFinanceiroSearchParams({
      page: 1,
      orderBy: "dataMovimentacao",
      orderDirection: "desc",
    });

    expect(params.get("orderBy")).toBe("dataMovimentacao");

    expect(params.get("orderDirection")).toBe("desc");

    expect(params.has("empresaId")).toBe(false);

    expect(params.has("dataInicio")).toBe(false);

    expect(params.has("dataFim")).toBe(false);
  });
});
