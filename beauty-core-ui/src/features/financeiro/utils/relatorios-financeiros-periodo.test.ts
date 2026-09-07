import { describe, expect, it } from "vitest";

import { toFinanceiroPeriodQuery } from "@/features/financeiro/utils/relatorios-financeiros-periodo";

describe("toFinanceiroPeriodQuery", () => {
  it("omite período vazio", () => {
    expect(
      toFinanceiroPeriodQuery({
        dataInicio: "",
        dataFim: "",
      }),
    ).toEqual({});
  });

  it("converte datetime-local em ISO", () => {
    const parsed = toFinanceiroPeriodQuery({
      dataInicio: "2026-08-01T08:30",
      dataFim: "2026-08-29T18:45",
    });

    expect(Date.parse(parsed.dataInicio ?? "")).not.toBeNaN();

    expect(Date.parse(parsed.dataFim ?? "")).not.toBeNaN();

    expect(parsed.dataInicio).toMatch(/Z$/);

    expect(parsed.dataFim).toMatch(/Z$/);
  });

  it("omite data inválida", () => {
    expect(
      toFinanceiroPeriodQuery({
        dataInicio: "invalida",
        dataFim: "",
      }),
    ).toEqual({});
  });
});
