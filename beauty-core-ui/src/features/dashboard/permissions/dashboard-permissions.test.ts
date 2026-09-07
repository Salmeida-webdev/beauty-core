import { describe, expect, it } from "vitest";

import {
  canAccessDashboardAnalytics,
} from "@/features/dashboard/permissions/dashboard-permissions";

describe("dashboard permissions", () => {
  it.each([
    "ADMIN",
    "GERENTE",
  ] as const)(
    "permite analytics para %s",
    (role) => {
      expect(
        canAccessDashboardAnalytics(
          role,
        ),
      ).toBe(true);
    },
  );

  it.each([
    "SUPER_ADMIN",
    "RECEPCAO",
    "PROFISSIONAL",
  ] as const)(
    "não chama analytics para %s",
    (role) => {
      expect(
        canAccessDashboardAnalytics(
          role,
        ),
      ).toBe(false);
    },
  );

  it("não permite estado sem usuário", () => {
    expect(
      canAccessDashboardAnalytics(
        null,
      ),
    ).toBe(false);
  });
});
