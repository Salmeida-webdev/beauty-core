import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getDashboardErrorReference,
} from "@/features/dashboard/utils/dashboard-error-reference";

describe("dashboard error reference", () => {
  it("prioriza correlation id", () => {
    expect(
      getDashboardErrorReference({
        isAxiosError: true,
        response: {
          headers: {
            "x-correlation-id":
              "correlation-123",
            "x-request-id":
              "request-123",
          },
        },
      }),
    ).toBe("correlation-123");
  });

  it("usa request id como fallback", () => {
    expect(
      getDashboardErrorReference({
        isAxiosError: true,
        response: {
          headers: {
            "x-request-id":
              "request-456",
          },
        },
      }),
    ).toBe("request-456");
  });

  it("não expõe referência para erro comum", () => {
    expect(
      getDashboardErrorReference(
        new Error("Falha"),
      ),
    ).toBeUndefined();
  });
});
