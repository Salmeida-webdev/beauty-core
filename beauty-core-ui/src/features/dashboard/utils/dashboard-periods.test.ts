import { describe, expect, it } from "vitest";

import {
  DEFAULT_DASHBOARD_PERIOD,
  getDashboardPeriodLabel,
  parseDashboardPeriodPreset,
  resolveDashboardPeriod,
} from "@/features/dashboard/utils/dashboard-periods";

describe("dashboard periods", () => {
  const referenceDate =
    new Date(2026, 7, 27, 16, 30, 0);

  it("usa 30 dias como período padrão", () => {
    expect(
      parseDashboardPeriodPreset(null),
    ).toBe(DEFAULT_DASHBOARD_PERIOD);

    expect(
      parseDashboardPeriodPreset("invalido"),
    ).toBe(DEFAULT_DASHBOARD_PERIOD);
  });

  it("preserva presets válidos", () => {
    expect(
      parseDashboardPeriodPreset("7d"),
    ).toBe("7d");

    expect(
      getDashboardPeriodLabel("7d"),
    ).toBe("Últimos 7 dias");
  });

  it("gera sete dias de calendário incluindo o dia atual", () => {
    const filters = resolveDashboardPeriod(
      "7d",
      referenceDate,
    );

    const start =
      new Date(filters.dataInicio!);
    const end =
      new Date(filters.dataFim!);

    expect(start.getFullYear()).toBe(2026);
    expect(start.getMonth()).toBe(7);
    expect(start.getDate()).toBe(21);
    expect(start.getHours()).toBe(0);

    expect(end.getDate()).toBe(27);
    expect(end.getHours()).toBe(23);
  });

  it("gera os limites completos do mês anterior", () => {
    const filters = resolveDashboardPeriod(
      "previous-month",
      referenceDate,
    );

    const start =
      new Date(filters.dataInicio!);
    const end =
      new Date(filters.dataFim!);

    expect(start.getFullYear()).toBe(2026);
    expect(start.getMonth()).toBe(6);
    expect(start.getDate()).toBe(1);

    expect(end.getFullYear()).toBe(2026);
    expect(end.getMonth()).toBe(6);
    expect(end.getDate()).toBe(31);
  });
});
