import { describe, expect, it } from "vitest";

import { fidelidadeQueryKeys } from "./fidelidade-query-keys";

describe("fidelidadeQueryKeys", () => {
  it("segmenta saldo e histórico por cliente", () => {
    expect(fidelidadeQueryKeys.saldo("cliente-1")).toEqual([
      "fidelidade",
      "saldo",
      "cliente-1",
    ]);

    expect(
      fidelidadeQueryKeys.historico("cliente-1"),
    ).toEqual([
      "fidelidade",
      "historico",
      "cliente-1",
    ]);
  });

  it("centraliza configuração e níveis", () => {
    expect(fidelidadeQueryKeys.configuracao()).toEqual([
      "fidelidade",
      "configuracao",
    ]);

    expect(fidelidadeQueryKeys.niveis()).toEqual([
      "fidelidade",
      "niveis",
    ]);
  });

  it("reserva namespaces para benefícios e cupons", () => {
    expect(fidelidadeQueryKeys.beneficios()).toEqual([
      "fidelidade",
      "beneficios",
    ]);

    expect(fidelidadeQueryKeys.cupons()).toEqual([
      "fidelidade",
      "cupons",
    ]);
  });
});
