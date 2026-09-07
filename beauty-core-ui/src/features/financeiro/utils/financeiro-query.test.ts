import { describe, expect, it } from "vitest";

import { sanitizeFinanceiroListQuery } from "@/features/financeiro/utils/financeiro-query";

describe("sanitizeFinanceiroListQuery", () => {
  it("retorna uma estrutura canônica com os filtros suportados", () => {
    expect(
      sanitizeFinanceiroListQuery({
        status: "PAGO",
        tipo: "RECEITA",
        page: 1,
      }),
    ).toEqual({
      page: 1,
      tipo: "RECEITA",
      status: "PAGO",
    });
  });

  it("rejeita filtro financeiro inventado em runtime", () => {
    expect(() =>
      sanitizeFinanceiroListQuery({
        empresaId: "550e8400-e29b-41d4-a716-446655440000",
      }),
    ).toThrow();
  });
});
