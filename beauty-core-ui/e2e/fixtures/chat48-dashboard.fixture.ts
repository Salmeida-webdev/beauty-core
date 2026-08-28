import type {
  Page,
} from "@playwright/test";

import {
  dashboardApiSuccess,
} from "../../src/features/dashboard/testing/dashboard-api-fixtures";

export type DashboardEndpoint =
  keyof typeof dashboardApiSuccess;

export type DashboardRequestRecord = {
  endpoint: DashboardEndpoint;
  method: string;
  searchParams: Record<string, string>;
};

export type DashboardRuntimeErrors = {
  consoleErrors: string[];
  pageErrors: string[];
};

export type DashboardAnalyticsMockOptions = {
  delayMs?: number;
};

export type DashboardAnalyticsController = {
  requests: DashboardRequestRecord[];
  callsTo: (
    endpoint: DashboardEndpoint,
  ) => number;
  failNext: (
    endpoint: DashboardEndpoint,
    status?: number,
  ) => void;
  failUntilCleared: (
    endpoint: DashboardEndpoint,
    status?: number,
  ) => void;
  clearFailure: () => void;
};

type PendingFailure = {
  endpoint: DashboardEndpoint;
  status: number;
  remaining: number;
};

function isDashboardEndpoint(
  path: string,
): path is DashboardEndpoint {
  return Object.prototype.hasOwnProperty.call(
    dashboardApiSuccess,
    path,
  );
}

function searchParamsToRecord(
  url: URL,
) {
  return Object.fromEntries(
    url.searchParams.entries(),
  );
}

export function monitorDashboardRuntime(
  page: Page,
): DashboardRuntimeErrors {
  const runtimeErrors: DashboardRuntimeErrors = {
    consoleErrors: [],
    pageErrors: [],
  };

  page.on(
    "console",
    (message) => {
      if (message.type() === "error") {
        runtimeErrors.consoleErrors.push(
          message.text(),
        );
      }
    },
  );

  page.on(
    "pageerror",
    (error) => {
      runtimeErrors.pageErrors.push(
        error.message,
      );
    },
  );

  return runtimeErrors;
}

export async function mockDashboardAnalytics(
  page: Page,
  options: DashboardAnalyticsMockOptions = {},
): Promise<DashboardAnalyticsController> {
  const requests: DashboardRequestRecord[] = [];
  let pendingFailure: PendingFailure | null = null;

  const controller: DashboardAnalyticsController = {
    requests,
    callsTo: (endpoint) =>
      requests.filter(
        (request) =>
          request.endpoint === endpoint,
      ).length,
    failNext: (
      endpoint,
      status = 503,
    ) => {
      pendingFailure = {
        endpoint,
        status,
        remaining: 1,
      };
    },
    failUntilCleared: (
      endpoint,
      status = 503,
    ) => {
      pendingFailure = {
        endpoint,
        status,
        remaining: Number.MAX_SAFE_INTEGER,
      };
    },
    clearFailure: () => {
      pendingFailure = null;
    },
  };

  await page.route(
    "**/analytics/**",
    async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const endpoint = url.pathname;

      if (
        !isDashboardEndpoint(endpoint)
      ) {
        await route.fallback();
        return;
      }

      requests.push({
        endpoint,
        method: request.method(),
        searchParams:
          searchParamsToRecord(url),
      });

      if (
        options.delayMs &&
        options.delayMs > 0
      ) {
        await new Promise<void>(
          (resolve) => {
            setTimeout(
              resolve,
              options.delayMs,
            );
          },
        );
      }

      if (
        pendingFailure?.endpoint ===
          endpoint &&
        pendingFailure.remaining > 0
      ) {
        pendingFailure.remaining -= 1;

        await route.fulfill({
          status:
            pendingFailure.status,
          contentType:
            "application/json",
          headers: {
            "x-correlation-id":
              "chat48-e2e-reference",
          },
          body: JSON.stringify({
            statusCode:
              pendingFailure.status,
            message:
              "Falha controlada do teste E2E",
          }),
        });

        return;
      }

      await route.fulfill({
        status: 200,
        contentType:
          "application/json",
        body: JSON.stringify(
          dashboardApiSuccess[endpoint],
        ),
      });
    },
  );

  return controller;
}
