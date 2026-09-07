import { describe, expect, it } from "vitest";

import { podePagarComissao } from "@/features/financeiro/utils/comissao-actions";

describe("podePagarComissao", () => {
  it("permite somente PENDENTE", () => {
    expect(podePagarComissao("PENDENTE")).toBe(true);

    expect(podePagarComissao("PAGO")).toBe(false);

    expect(podePagarComissao("CANCELADO")).toBe(false);

    expect(podePagarComissao("ESTORNADO")).toBe(false);
  });
});
