import { describe, expect, it } from "vitest";

import {
  dashboardKeys,
} from "@/features/dashboard/queries/dashboard-keys";

describe("dashboard query keys", () => {
  const filters = {
    dataInicio: "2026-08-01T03:00:00.000Z",
    dataFim: "2026-09-01T02:59:59.999Z",
  };

  it("centraliza o namespace das queries", () => {
    expect(dashboardKeys.all).toEqual([
      "dashboard",
    ]);

    expect(
      dashboardKeys.analytics(),
    ).toEqual([
      "dashboard",
      "analytics",
    ]);
  });

  it("inclui o período nas queries filtradas", () => {
    expect(
      dashboardKeys.financial(filters),
    ).toEqual([
      "dashboard",
      "analytics",
      "financial",
      filters.dataInicio,
      filters.dataFim,
    ]);
  });

  it("mantém snapshots independentes do período", () => {
    expect(
      dashboardKeys.clients(),
    ).toEqual([
      "dashboard",
      "analytics",
      "clients",
    ]);

    expect(
      dashboardKeys.loyalty(),
    ).toEqual([
      "dashboard",
      "analytics",
      "loyalty",
    ]);
  });
});
