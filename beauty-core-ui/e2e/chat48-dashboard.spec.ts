import {
  expect,
  test,
  type Page,
} from "@playwright/test";

import {
  mockDashboardAnalytics,
  monitorDashboardRuntime,
} from "./fixtures/chat48-dashboard.fixture";

const AUTH_PROFILE = {
  id: "admin-e2e",
  email: "admin@beautycore.test",
  role: "ADMIN",
  empresaId: "empresa-e2e",
  sessaoId: "session-current",
} as const;

const ENDPOINTS = [
  "/analytics/dashboard",
  "/analytics/clientes",
  "/analytics/agendamentos",
  "/analytics/financeiro",
  "/analytics/servicos",
  "/analytics/profissionais",
  "/analytics/unidades",
  "/analytics/fidelidade",
  "/analytics/pacotes",
  "/analytics/whatsapp",
  "/analytics/notificacoes",
  "/analytics/eventos",
] as const;

async function installAuthenticatedAdmin(
  page: Page,
): Promise<void> {
  await page.addInitScript(() => {
    window.sessionStorage.setItem(
      "beauty-core:admin:refresh-token",
      "refresh-token-e2e",
    );
  });

  await page.route(
    "**/auth/refresh",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          access_token: "access-token-e2e",
          refresh_token: "refresh-token-e2e-rotated",
          expires_in: 3600,
        }),
      });
    },
  );

  await page.route(
    "**/auth/me",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(AUTH_PROFILE),
      });
    },
  );

  await page.route(
    "**/auth/logout",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Sessão encerrada",
        }),
      });
    },
  );

  await page.route(
    "**/auth/logout-all",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Sessões encerradas",
          totalRevogadas: 2,
        }),
      });
    },
  );
}

async function waitForAnalytics(
  callsTo: (
    endpoint: (typeof ENDPOINTS)[number],
  ) => number,
): Promise<void> {
  await expect
    .poll(
      () =>
        ENDPOINTS.filter(
          (endpoint) => callsTo(endpoint) > 0,
        ).length,
    )
    .toBe(ENDPOINTS.length);
}

type RuntimeErrorExpectationOptions = {
  allowControlledServiceUnavailable?: boolean;
};

function expectNoRuntimeErrors(
  runtime: {
    consoleErrors: string[];
    pageErrors: string[];
  },
  options: RuntimeErrorExpectationOptions = {},
): void {
  const controlledServiceUnavailable =
    "Failed to load resource: the server responded with a status of 503 (Service Unavailable)";

  const controlledConsoleErrors =
    runtime.consoleErrors.filter(
      (message) =>
        message === controlledServiceUnavailable,
    );

  const unexpectedConsoleErrors =
    options.allowControlledServiceUnavailable
      ? runtime.consoleErrors.filter(
          (message) =>
            message !== controlledServiceUnavailable,
        )
      : runtime.consoleErrors;

  if (
    options.allowControlledServiceUnavailable
  ) {
    expect(
      controlledConsoleErrors.length,
    ).toBeGreaterThan(0);
  }

  expect(
    unexpectedConsoleErrors,
  ).toEqual([]);

  expect(runtime.pageErrors).toEqual([]);
}

test.describe(
  "Chat 48 — Dashboard Executivo",
  () => {
    test(
      "renderiza dados reais simulados da API nos KPIs e seções",
      async ({ page }) => {
        const runtime =
          monitorDashboardRuntime(page);

        const controller =
          await mockDashboardAnalytics(page);

        await installAuthenticatedAdmin(page);

        await page.goto("/dashboard");

        await expect(
          page.getByRole("heading", {
            name: "Dashboard Executivo",
          }),
        ).toBeVisible();

        await waitForAnalytics(
          controller.callsTo,
        );

        const summary =
          page.getByRole("region", {
            name: "Indicadores principais",
          });

        await expect(summary).toBeVisible();

        for (
          const label of [
            "Receita",
            "Despesas",
            "Saldo",
            "Clientes",
            "Agendamentos",
            "Ticket médio",
          ]
        ) {
          await expect(
            summary.getByText(label, {
              exact: true,
            }),
          ).toBeVisible();
        }

        await expect(
          page.getByText(/8\.400,00/).first(),
        ).toBeVisible();

        expectNoRuntimeErrors(runtime);
      },
    );

    test(
      "propaga o período selecionado para os endpoints filtráveis",
      async ({ page }) => {
        const runtime =
          monitorDashboardRuntime(page);

        const controller =
          await mockDashboardAnalytics(page);

        await installAuthenticatedAdmin(page);

        await page.goto(
          "/dashboard?period=7d",
        );

        await expect(
          page.getByRole("heading", {
            name: "Dashboard Executivo",
          }),
        ).toBeVisible();

        await waitForAnalytics(
          controller.callsTo,
        );

        const periodSelect =
          page.getByRole("combobox", {
            name: "Selecionar período do dashboard",
          });

        await expect(periodSelect).toHaveText(
          "Últimos 7 dias",
        );

        const dashboardRequest =
          controller.requests.find(
            (request) =>
              request.endpoint ===
              "/analytics/dashboard",
          );

        const financialRequest =
          controller.requests.find(
            (request) =>
              request.endpoint ===
              "/analytics/financeiro",
          );

        expect(dashboardRequest).toBeDefined();
        expect(financialRequest).toBeDefined();

        expect(
          dashboardRequest!.searchParams.dataInicio,
        ).toBeTruthy();

        expect(
          dashboardRequest!.searchParams.dataFim,
        ).toBeTruthy();

        expect(
          financialRequest!.searchParams,
        ).toEqual(
          dashboardRequest!.searchParams,
        );

        expectNoRuntimeErrors(runtime);
      },
    );

    test(
      "atualiza todos os endpoints pela ação manual",
      async ({ page }) => {
        const runtime =
          monitorDashboardRuntime(page);

        const controller =
          await mockDashboardAnalytics(page);

        await installAuthenticatedAdmin(page);

        await page.goto("/dashboard");

        await expect(
          page.getByRole("heading", {
            name: "Dashboard Executivo",
          }),
        ).toBeVisible();

        await waitForAnalytics(
          controller.callsTo,
        );

        const totalBefore =
          controller.requests.length;

        const dashboardBefore =
          controller.callsTo(
            "/analytics/dashboard",
          );

        await page.getByRole("button", {
          name: "Atualizar dashboard",
        }).click();

        await expect
          .poll(
            () => controller.requests.length,
          )
          .toBeGreaterThanOrEqual(
            totalBefore + ENDPOINTS.length,
          );

        await expect
          .poll(
            () =>
              controller.callsTo(
                "/analytics/dashboard",
              ),
          )
          .toBeGreaterThanOrEqual(
            dashboardBefore + 1,
          );

        expectNoRuntimeErrors(runtime);
      },
    );

    test(
      "recupera o resumo após falha controlada e retry",
      async ({ page }) => {
        const runtime =
          monitorDashboardRuntime(page);

        const controller =
          await mockDashboardAnalytics(page);

        controller.failUntilCleared(
          "/analytics/dashboard",
        );

        await installAuthenticatedAdmin(page);

        await page.goto("/dashboard");

        await expect(
          page.getByRole("heading", {
            name: "Dashboard Executivo",
          }),
        ).toBeVisible();

        await expect
          .poll(
            () =>
              controller.callsTo(
                "/analytics/dashboard",
              ),
          )
          .toBeGreaterThanOrEqual(1);

        const retryButton =
          page.locator("button").filter({
            hasText: "Tentar novamente",
          }).first();

        await expect(retryButton).toBeVisible({
          timeout: 20000,
        });

        controller.clearFailure();

        await retryButton.click();

        await expect
          .poll(
            () =>
              controller.callsTo(
                "/analytics/dashboard",
              ),
          )
          .toBeGreaterThanOrEqual(2);

        await expect(
          page.getByRole("region", {
            name: "Indicadores principais",
          }),
        ).toBeVisible();

        await expect(
          retryButton,
        ).toHaveCount(0);

        expectNoRuntimeErrors(runtime, {
          allowControlledServiceUnavailable: true,
        });
      },
    );
    test(
      "mantém erro financeiro isolado e refaz somente essa seção",
      async ({ page }) => {
        const runtime =
          monitorDashboardRuntime(page);

        const controller =
          await mockDashboardAnalytics(page);

        controller.failUntilCleared(
          "/analytics/financeiro",
        );

        await installAuthenticatedAdmin(page);

        await page.goto("/dashboard");

        await expect(
          page.getByRole("heading", {
            name: "Dashboard Executivo",
          }),
        ).toBeVisible();

        await waitForAnalytics(
          controller.callsTo,
        );

        const dashboardBefore =
          controller.callsTo(
            "/analytics/dashboard",
          );

        const financialBefore =
          controller.callsTo(
            "/analytics/financeiro",
          );

        const retryButton =
          page.locator("button").filter({
            hasText: "Tentar novamente",
          }).first();

        await expect(retryButton).toBeVisible({
          timeout: 20000,
        });

        controller.clearFailure();

        await retryButton.click();

        await expect
          .poll(
            () =>
              controller.callsTo(
                "/analytics/financeiro",
              ),
          )
          .toBeGreaterThanOrEqual(
            financialBefore + 1,
          );

        await expect
          .poll(
            () =>
              controller.callsTo(
                "/analytics/dashboard",
              ),
          )
          .toBe(dashboardBefore);

        await expect(
          retryButton,
        ).toHaveCount(0);

        expectNoRuntimeErrors(runtime, {
          allowControlledServiceUnavailable: true,
        });
      },
    );
    test(
      "mantém o dashboard sem overflow no mobile",
      async ({ page }) => {
        await page.setViewportSize({
          width: 375,
          height: 812,
        });

        const runtime =
          monitorDashboardRuntime(page);

        const controller =
          await mockDashboardAnalytics(page);

        await installAuthenticatedAdmin(page);

        await page.goto("/dashboard");

        await expect(
          page.getByRole("heading", {
            name: "Dashboard Executivo",
          }),
        ).toBeVisible();

        await waitForAnalytics(
          controller.callsTo,
        );

        const hasOverflow =
          await page.evaluate(() => {
            const root =
              document.documentElement;

            return (
              root.scrollWidth >
              root.clientWidth
            );
          });

        expect(hasOverflow).toBe(false);

        expectNoRuntimeErrors(runtime);
      },
    );
  },
);
