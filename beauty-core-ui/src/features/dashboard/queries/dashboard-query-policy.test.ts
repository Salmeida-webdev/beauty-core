import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

import {
  shouldRetryDashboardQuery,
} from "@/features/dashboard/queries/dashboard-query-policy";

function axiosError(status?: number) {
  return {
    isAxiosError: true,
    response:
      status === undefined
        ? undefined
        : {
            status,
          },
  };
}

describe("dashboard query policy", () => {
  it("não repete erros de validação", () => {
    const error = new ZodError([]);

    expect(
      shouldRetryDashboardQuery(0, error),
    ).toBe(false);
  });

  it.each([
    400,
    401,
    403,
    404,
    422,
  ])(
    "não repete respostas HTTP %s",
    (status) => {
      expect(
        shouldRetryDashboardQuery(
          0,
          axiosError(status),
        ),
      ).toBe(false);
    },
  );

  it("permite uma repetição para falha de rede ou servidor", () => {
    expect(
      shouldRetryDashboardQuery(
        0,
        axiosError(),
      ),
    ).toBe(true);

    expect(
      shouldRetryDashboardQuery(
        0,
        axiosError(500),
      ),
    ).toBe(true);

    expect(
      shouldRetryDashboardQuery(
        1,
        axiosError(500),
      ),
    ).toBe(false);
  });

  it("permite uma repetição para timeout ou rate limit", () => {
    expect(
      shouldRetryDashboardQuery(
        0,
        axiosError(408),
      ),
    ).toBe(true);

    expect(
      shouldRetryDashboardQuery(
        0,
        axiosError(429),
      ),
    ).toBe(true);
  });
});
