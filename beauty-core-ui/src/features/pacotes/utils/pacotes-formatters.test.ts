import { describe, expect, it } from "vitest";

import {
  formatSaldoSessoes,
  formatStatusClientePacote,
  formatValidadeDias,
} from "./pacotes-formatters";

describe("pacotes formatters", () => {
  it("formata saldo recebido do backend", () => {
    expect(formatSaldoSessoes(3, 5)).toBe(
      "3 de 5 sessões",
    );
  });

  it("não inventa validade quando backend retorna null", () => {
    expect(formatValidadeDias(null)).toBe(
      "Sem validade definida",
    );
  });

  it("formata validade real", () => {
    expect(formatValidadeDias(1)).toBe("1 dia");
    expect(formatValidadeDias(30)).toBe("30 dias");
  });

  it("mantém status textuais reais", () => {
    expect(formatStatusClientePacote("ATIVO")).toBe("Ativo");
    expect(formatStatusClientePacote("FINALIZADO")).toBe(
      "Finalizado",
    );
    expect(formatStatusClientePacote("VENCIDO")).toBe("Vencido");
    expect(formatStatusClientePacote("CANCELADO")).toBe(
      "Cancelado",
    );
  });
});
