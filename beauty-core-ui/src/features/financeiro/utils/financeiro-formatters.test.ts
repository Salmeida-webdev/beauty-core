import { describe, expect, it } from "vitest";

import {
  formatFinanceiroCurrency,
  formatFinanceiroPercentual,
} from "@/features/financeiro/utils/financeiro-formatters";

describe("financeiro formatters", () => {
  it("formata BRL sem alterar o valor autoritativo", () => {
    const formatted = formatFinanceiroCurrency(1234.5);

    expect(formatted).toContain("R$");
    expect(formatted).toContain("1.234,50");
  });

  it("aceita decimal serializado somente para exibição", () => {
    expect(formatFinanceiroCurrency("10.50")).toContain("10,50");
  });

  it("formata percentual sem calculá-lo", () => {
    expect(formatFinanceiroPercentual("12.5")).toBe("12,5%");
  });

  it("usa fallback para valor inválido", () => {
    expect(formatFinanceiroCurrency("invalido")).toBe("—");
  });
});
