import { describe, expect, it } from "vitest";

import {
  formatCurrency,
  formatDashboardDate,
  formatDashboardPeriod,
  formatDecimal,
  formatInteger,
  formatPercentage,
  formatSignedPercentage,
} from "@/features/dashboard/utils/dashboard-formatters";

describe("dashboard formatters", () => {
  it("formata moeda e números em pt-BR", () => {
    expect(
      formatCurrency(1234.56),
    ).toContain("1.234,56");

    expect(
      formatCurrency(1234.56),
    ).toContain("R$");

    expect(formatInteger(1234)).toBe(
      "1.234",
    );

    expect(formatDecimal(8.25)).toBe(
      "8,25",
    );
  });

  it("formata percentuais fornecidos pelo backend", () => {
    expect(formatPercentage(8.2)).toBe(
      "8,2%",
    );

    expect(
      formatSignedPercentage(8.2),
    ).toBe("+8,2%");

    expect(
      formatSignedPercentage(-3.1),
    ).toBe("-3,1%");
  });

  it("formata datas sem usar substring", () => {
    expect(
      formatDashboardDate(
        "2026-08-15T12:00:00.000Z",
      ),
    ).toBe("15/08/2026");

    expect(
      formatDashboardDate("inválida"),
    ).toBe("Data inválida");
  });

  it("formata o intervalo completo", () => {
    expect(
      formatDashboardPeriod({
        dataInicio:
          "2026-08-01T12:00:00.000Z",
        dataFim:
          "2026-08-30T12:00:00.000Z",
      }),
    ).toBe(
      "01/08/2026 – 30/08/2026",
    );
  });
});
