import { describe, expect, it } from "vitest";

import {
  formatServicoDuracao,
  formatServicoPreco,
} from "@/features/servicos/utils/servicos-formatters";

describe("servicos formatters", () => {
  it("formata preço centralmente em BRL", () => {
    const formatted = formatServicoPreco(150.5);

    expect(formatted).toContain("R$");
    expect(formatted).toContain("150,50");
    expect(formatServicoPreco(Number.NaN)).toBe("—");
  });

  it("formata duração sem alterar o payload em minutos", () => {
    expect(formatServicoDuracao(30)).toBe("30 min");
    expect(formatServicoDuracao(60)).toBe("1h");
    expect(formatServicoDuracao(90)).toBe("1h 30min");
    expect(formatServicoDuracao(0)).toBe("—");
  });
});
