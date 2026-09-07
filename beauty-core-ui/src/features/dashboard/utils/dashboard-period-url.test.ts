import { describe, expect, it } from "vitest";

import {
  buildDashboardPeriodHref,
} from "@/features/dashboard/utils/dashboard-period-url";

describe("dashboard period URL", () => {
  it("adiciona o período à rota", () => {
    expect(
      buildDashboardPeriodHref(
        "/dashboard",
        "",
        "30d",
      ),
    ).toBe(
      "/dashboard?period=30d",
    );
  });

  it("preserva outros parâmetros", () => {
    expect(
      buildDashboardPeriodHref(
        "/dashboard",
        "origem=atalho&period=7d",
        "current-month",
      ),
    ).toBe(
      "/dashboard?origem=atalho&period=current-month",
    );
  });
});
