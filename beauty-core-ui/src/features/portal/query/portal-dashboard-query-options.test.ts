import { describe, expect, it } from "vitest";

import {
  PORTAL_DASHBOARD_STALE_TIME,
  portalDashboardQueryOptions,
} from "./portal-dashboard-query-options";

describe("portalDashboardQueryOptions", () => {
  it("mantem o dashboard privado e desabilitado sem autenticacao", () => {
    const options = portalDashboardQueryOptions(false);

    expect(options.queryKey).toEqual([
      "portal",
      "private",
      "dashboard",
    ]);
    expect(options.enabled).toBe(false);
    expect(options.retry).toBe(false);
    expect(options.refetchOnWindowFocus).toBe(false);
    expect(options.staleTime).toBe(PORTAL_DASHBOARD_STALE_TIME);
    expect(JSON.stringify(options.queryKey)).not.toContain("empresaId");
  });

  it("habilita uma unica query privada para o cliente autenticado", () => {
    const options = portalDashboardQueryOptions(true);

    expect(options.enabled).toBe(true);
    expect(options.queryKey).toEqual([
      "portal",
      "private",
      "dashboard",
    ]);
  });
});