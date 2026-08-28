import {
  expect,
  test,
  type Page,
} from "@playwright/test";

import {
  CLIENTE_ID,
  CLIENTE_PROFILE_ENDPOINTS,
  installAuthenticatedUser,
  mockClientesApi,
  monitorClientesRuntime,
  type ClientesApiController,
  type ClientesE2eRole,
  type ClientesRuntimeErrors,
} from "./fixtures/chat49-clientes.fixture";

type RuntimeExpectationOptions = {
  allowControlledServiceUnavailable?: boolean;
};

function expectNoRuntimeErrors(
  runtime: ClientesRuntimeErrors,
  options: RuntimeExpectationOptions = {},
): void {
  const controlledConsoleErrors =
    runtime.consoleErrors.filter(
      (message) =>
        message.includes("503") &&
        message.includes(
          "Failed to load resource",
        ),
    );

  const unexpectedConsoleErrors =
    options.allowControlledServiceUnavailable
      ? runtime.consoleErrors.filter(
          (message) =>
            !(
              message.includes("503") &&
              message.includes(
                "Failed to load resource",
              )
            ),
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

  expect(
    runtime.pageErrors,
  ).toEqual([]);
}

async function expectNoHorizontalOverflow(
  page: Page,
): Promise<void> {
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
}

async function expectVisibleExactText(
  page: Page,
  text: string,
): Promise<void> {
  const matches =
    page.getByText(
      text,
      {
        exact: true,
      },
    );

  await expect
    .poll(
      async () => {
        const count =
          await matches.count();

        const visibility =
          await Promise.all(
            Array.from(
              {
                length: count,
              },
              (_, index) =>
                matches
                  .nth(index)
                  .isVisible(),
            ),
          );

        return visibility.some(
          Boolean,
        );
      },
    )
    .toBe(true);
}

async function waitForProfileRequests(
  controller: ClientesApiController,
): Promise<void> {
  await expect
    .poll(
      () =>
        CLIENTE_PROFILE_ENDPOINTS.filter(
          (endpoint) =>
            controller.callsTo(
              endpoint,
              "GET",
            ) > 0,
        ).length,
    )
    .toBe(
      CLIENTE_PROFILE_ENDPOINTS.length,
    );
}

async function prepareClientesPage(
  page: Page,
  role: ClientesE2eRole = "ADMIN",
): Promise<{
  runtime: ClientesRuntimeErrors;
  controller: ClientesApiController;
}> {
  const runtime =
    monitorClientesRuntime(page);

  const controller =
    await mockClientesApi(page);

  await installAuthenticatedUser(
    page,
    role,
  );

  return {
    runtime,
    controller,
  };
}

test.describe(
  "Chat 49 — Gestão de Clientes",
  () => {
    test(
      "lista clientes com filtros sincronizados na URL e na API",
      async ({ page }) => {
        const {
          runtime,
          controller,
        } = await prepareClientesPage(
          page,
        );

        await page.goto(
          "/clientes?search=Maria&page=1&orderBy=nome&orderDirection=asc",
        );

        await expect(
          page.getByRole(
            "heading",
            {
              name: /clientes/i,
            },
          ).first(),
        ).toBeVisible();

        await expectVisibleExactText(
          page,
          "Maria Silva",
        );

        await expect
          .poll(
            () =>
              controller.requests.some(
                (request) =>
                  request.path ===
                    "/clientes" &&
                  request.method ===
                    "GET" &&
                  request.searchParams
                    .search ===
                    "Maria",
              ),
          )
          .toBe(true);

        const filteredRequest =
          controller.requests.find(
            (request) =>
              request.path ===
                "/clientes" &&
              request.method ===
                "GET" &&
              request.searchParams
                .search ===
                "Maria",
          );

        expect(
          filteredRequest?.searchParams,
        ).toMatchObject({
          search: "Maria",
          page: "1",
          orderBy: "nome",
          orderDirection: "asc",
        });

        await expect(page).toHaveURL(
          /search=Maria/,
        );

        expectNoRuntimeErrors(runtime);
      },
    );

    test(
      "renderiza o Perfil 360 e preserva os filtros no retorno",
      async ({ page }) => {
        const {
          runtime,
          controller,
        } = await prepareClientesPage(
          page,
        );

        await page.goto(
          `/clientes/${CLIENTE_ID}?search=Maria&page=2&orderBy=nome&orderDirection=asc`,
        );

        await expect(
          page.getByRole(
            "heading",
            {
              name: "Maria Silva",
            },
          ).first(),
        ).toBeVisible();

        await waitForProfileRequests(
          controller,
        );

        await expect(
          page.getByText(
            "Portal ativo",
            {
              exact: true,
            },
          ),
        ).toBeVisible();

        await expect(
          page.getByText(
            "850 pontos",
            {
              exact: true,
            },
          ),
        ).toBeVisible();

        await expect(
          page.getByText(
            "Prata",
            {
              exact: true,
            },
          ).first(),
        ).toBeVisible();

        await expect(
          page.getByText(
            "Pacote Facial",
            {
              exact: true,
            },
          ),
        ).toBeVisible();

        const returnLink =
          page.locator(
            'a[href^="/clientes?"]',
          ).first();

        await expect(
          returnLink,
        ).toHaveAttribute(
          "href",
          /search=Maria/,
        );

        await expect(
          returnLink,
        ).toHaveAttribute(
          "href",
          /page=2/,
        );

        expectNoRuntimeErrors(runtime);
      },
    );

    test(
      "recupera a listagem após erro controlado e retry manual",
      async ({ page }) => {
        const {
          runtime,
          controller,
        } = await prepareClientesPage(
          page,
        );

        controller.failNext(
          "/clientes",
          "GET",
          503,
        );

        await page.goto("/clientes");

        const retryButton =
          page.getByRole(
            "button",
            {
              name:
                "Tentar novamente",
            },
          );

        await expect(
          retryButton,
        ).toBeVisible();

        const requestsBeforeRetry =
          controller.callsTo(
            "/clientes",
            "GET",
          );

        await retryButton.click();

        await expect
          .poll(
            () =>
              controller.callsTo(
                "/clientes",
                "GET",
              ),
          )
          .toBeGreaterThan(
            requestsBeforeRetry,
          );

        await expectVisibleExactText(
          page,
          "Maria Silva",
        );

        expectNoRuntimeErrors(
          runtime,
          {
            allowControlledServiceUnavailable:
              true,
          },
        );
      },
    );

    test(
      "aplica permissões de PROFISSIONAL no Perfil 360",
      async ({ page }) => {
        const {
          runtime,
          controller,
        } = await prepareClientesPage(
          page,
          "PROFISSIONAL",
        );

        await page.goto(
          `/clientes/${CLIENTE_ID}`,
        );

        await expect(
          page.getByRole(
            "heading",
            {
              name: "Maria Silva",
            },
          ).first(),
        ).toBeVisible();

        await waitForProfileRequests(
          controller,
        );

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Inativar cliente",
            },
          ),
        ).toBeVisible();

        await expect(
          page.getByLabel(
            "Selecionar foto do cliente",
          ),
        ).toHaveCount(0);

        await expect(
          page.getByRole(
            "button",
            {
              name: "Exportar dados",
            },
          ),
        ).toHaveCount(0);

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Anonimizar cliente",
            },
          ),
        ).toHaveCount(0);

        expectNoRuntimeErrors(runtime);
      },
    );

    test(
      "executa exportação e anonimização LGPD somente como ADMIN",
      async ({ page }) => {
        const {
          runtime,
          controller,
        } = await prepareClientesPage(
          page,
        );

        await page.goto(
          `/clientes/${CLIENTE_ID}`,
        );

        await expect(
          page.getByRole(
            "heading",
            {
              name: "Maria Silva",
            },
          ).first(),
        ).toBeVisible();

        await waitForProfileRequests(
          controller,
        );

        await page.getByRole(
          "button",
          {
            name: "Exportar dados",
          },
        ).click();

        await expect
          .poll(
            () =>
              controller.callsTo(
                `/lgpd/exportar-cliente/${CLIENTE_ID}`,
                "GET",
              ),
          )
          .toBe(1);

        await expect(
          page.getByText(
            "Exportação LGPD concluída.",
            {
              exact: true,
            },
          ),
        ).toBeVisible();

        await page.getByRole(
          "button",
          {
            name:
              "Anonimizar cliente",
          },
        ).click();

        const alertDialog =
          page.getByRole(
            "alertdialog",
          );

        await expect(
          alertDialog,
        ).toContainText(
          "não poderá ser desfeita",
        );

        expect(
          controller.callsTo(
            `/lgpd/anonimizar-cliente/${CLIENTE_ID}`,
            "POST",
          ),
        ).toBe(0);

        await page.getByRole(
          "button",
          {
            name:
              "Confirmar anonimização",
          },
        ).click();

        await expect
          .poll(
            () =>
              controller.callsTo(
                `/lgpd/anonimizar-cliente/${CLIENTE_ID}`,
                "POST",
              ),
          )
          .toBe(1);

        await expect(page).toHaveURL(
          /\/clientes(?:\?.*)?$/,
        );

        await expect(
          page.getByRole(
            "heading",
            {
              name: /clientes/i,
            },
          ).first(),
        ).toBeVisible();

        expectNoRuntimeErrors(runtime);
      },
    );

    test(
      "mantém listagem e Perfil 360 sem overflow no mobile",
      async ({ page }) => {
        await page.setViewportSize({
          width: 375,
          height: 812,
        });

        const {
          runtime,
          controller,
        } = await prepareClientesPage(
          page,
        );

        await page.goto("/clientes");

        await expect(
          page.getByRole(
            "heading",
            {
              name: /clientes/i,
            },
          ).first(),
        ).toBeVisible();

        await expectVisibleExactText(
          page,
          "Maria Silva",
        );

        await expectNoHorizontalOverflow(
          page,
        );

        await page.goto(
          `/clientes/${CLIENTE_ID}`,
        );

        await expect(
          page.getByRole(
            "heading",
            {
              name: "Maria Silva",
            },
          ).first(),
        ).toBeVisible();

        await waitForProfileRequests(
          controller,
        );

        await expectNoHorizontalOverflow(
          page,
        );

        expectNoRuntimeErrors(runtime);
      },
    );
  },
);
