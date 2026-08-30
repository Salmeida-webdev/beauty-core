import { describe, expect, it } from "vitest";

import {
  formatMovimentacaoDate,
  formatMovimentacaoTipo,
} from "./fidelidade-historico-formatters";

describe("fidelidade histórico formatters", () => {
  it("formata tipo sem inventar significado de negócio", () => {
    expect(formatMovimentacaoTipo("RESGATE")).toBe("Resgate");
    expect(formatMovimentacaoTipo("PONTUACAO_AUTOMATICA")).toBe(
      "Pontuacao Automatica",
    );
  });

  it("fornece fallback para tipo vazio", () => {
    expect(formatMovimentacaoTipo("")).toBe("Movimentação");
  });

  it("trata data inválida com fallback textual", () => {
    expect(formatMovimentacaoDate("invalida")).toBe(
      "Data indisponível",
    );
  });
});
