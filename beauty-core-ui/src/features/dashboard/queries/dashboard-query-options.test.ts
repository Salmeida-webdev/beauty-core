import { describe, expect, it } from "vitest";

import {
  shouldRetryDashboardQuery,
} from "@/features/dashboard/queries/dashboard-query-policy";
import {
  dashboardQueryOptions,
} from "@/features/dashboard/queries/dashboard-query-options";

describe("dashboard query options", () => {
  const filters = {
    dataInicio:
      "2026-08-01T03:00:00.000Z",
    dataFim:
      "2026-09-01T02:59:59.999Z",
  };

  it("desabilita as chamadas quando a role não possui acesso", () => {
    const options =
      dashboardQueryOptions.summary(
        filters,
        false,
      );

    expect(options.enabled).toBe(false);
  });

  it("mantém o período na query financeira", () => {
    const options =
      dashboardQueryOptions.financial(
        filters,
        true,
      );

    expect(options.queryKey).toEqual([
      "dashboard",
      "analytics",
      "financial",
      filters.dataInicio,
      filters.dataFim,
    ]);
  });

  it("usa política e stale time específicos", () => {
    const options =
      dashboardQueryOptions.clients(
        true,
      );

    expect(options.retry).toBe(
      shouldRetryDashboardQuery,
    );

    expect(options.staleTime).toBe(
      120_000,
    );
  });
});
