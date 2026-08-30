import { describe, expect, it } from "vitest";

import {
  toCreateCategoriaFinanceiraPayload,
  toUpdateCategoriaFinanceiraPayload,
} from "@/features/financeiro/forms/categoria-financeira-payload";

describe("categoria financeira payload", () => {
  it("cria somente nome e tipo", () => {
    const payload = toCreateCategoriaFinanceiraPayload({
      nome: "  Serviços  ",
      tipo: "RECEITA",
    });

    expect(payload).toEqual({
      nome: "Serviços",
      tipo: "RECEITA",
    });

    expect(payload).not.toHaveProperty("empresaId");
    expect(payload).not.toHaveProperty("ativo");
    expect(payload).not.toHaveProperty("createdAt");
    expect(payload).not.toHaveProperty("updatedAt");
  });

  it("edita somente campos permitidos", () => {
    expect(
      toUpdateCategoriaFinanceiraPayload({
        nome: "Despesas Fixas",
        tipo: "DESPESA",
      }),
    ).toEqual({
      nome: "Despesas Fixas",
      tipo: "DESPESA",
    });
  });
});
