import { describe, expect, it } from "vitest";

import {
  podeOferecerCancelamento,
  podeRegistrarPagamento,
} from "@/features/financeiro/utils/movimentacao-financeira-actions";

describe("ações da movimentação financeira", () => {
  it("oferece pagamento somente para pendente", () => {
    expect(podeRegistrarPagamento("PENDENTE")).toBe(true);

    expect(podeRegistrarPagamento("PAGO")).toBe(false);

    expect(podeRegistrarPagamento("CANCELADO")).toBe(false);

    expect(podeRegistrarPagamento("ESTORNADO")).toBe(false);
  });

  it("oferece cancelamento para pendente e pago", () => {
    expect(podeOferecerCancelamento("PENDENTE")).toBe(true);

    expect(podeOferecerCancelamento("PAGO")).toBe(true);
  });

  it("não oferece nova transição em estados terminais", () => {
    expect(podeOferecerCancelamento("CANCELADO")).toBe(false);

    expect(podeOferecerCancelamento("ESTORNADO")).toBe(false);
  });
});
