import {
  expect,
  test,
  type Page,
} from "@playwright/test";

const AUTH_PROFILE = {
  id: "admin-e2e",
  email: "admin@beautycore.test",
  role: "ADMIN",
  empresaId: "empresa-e2e",
  sessaoId: "session-current",
} as const;

type SessionFixture = {
  id: string;
  ip: string | null;
  dispositivo: string | null;
  sistemaOperacional: string | null;
  navegador: string | null;
  ultimaAtividade: string;
  expiraEm: string;
  createdAt: string;
};

const CURRENT_SESSION:
  SessionFixture = {
    id: "session-current",
    ip: "127.0.0.1",
    dispositivo: "Desktop",
    sistemaOperacional: "Windows 11",
    navegador: "Chrome",
    ultimaAtividade:
      "2026-08-27T15:40:00.000Z",
    expiraEm:
      "2026-09-03T15:40:00.000Z",
    createdAt:
      "2026-08-27T12:00:00.000Z",
  };

const OTHER_SESSION:
  SessionFixture = {
    id: "session-other",
    ip: "192.168.1.50",
    dispositivo: "Celular",
    sistemaOperacional: "Android",
    navegador: "Chrome Mobile",
    ultimaAtividade:
      "2026-08-27T14:00:00.000Z",
    expiraEm:
      "2026-09-03T14:00:00.000Z",
    createdAt:
      "2026-08-26T18:00:00.000Z",
  };

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
        contentType:
          "application/json",
        body: JSON.stringify({
          access_token:
            "access-token-e2e",
          refresh_token:
            "refresh-token-e2e-rotated",
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
        contentType:
          "application/json",
        body: JSON.stringify(
          AUTH_PROFILE,
        ),
      });
    },
  );

  await page.route(
    "**/auth/logout",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType:
          "application/json",
        body: JSON.stringify({
          message:
            "Sessão encerrada",
        }),
      });
    },
  );

  await page.route(
    "**/auth/logout-all",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType:
          "application/json",
        body: JSON.stringify({
          message:
            "Sessões encerradas",
          totalRevogadas: 2,
        }),
      });
    },
  );
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

test.describe(
  "Chat 47 — autenticação administrativa",
  () => {
    test(
      "login possui estrutura acessível e responsiva",
      async ({ page }) => {
        await page.setViewportSize({
          width: 1440,
          height: 900,
        });

        await page.goto(
          "/login?reason=session-expired",
        );

        await expect(
          page.getByRole("heading", {
            name: "Acesse sua conta",
          }),
        ).toBeVisible();

        const presentation =
          page.getByRole("region", {
            name:
              "Apresentação Beauty Core",
          });

        await expect(
          presentation,
        ).toBeVisible();

        await expect(
          page.getByRole("status"),
        ).toContainText(
          "Sua sessão expirou",
        );

        const email =
          page.locator(
            'input[type="email"]',
          );

        const password =
          page.locator(
            'input[type="password"]',
          );

        await expect(email)
          .toBeVisible();

        await expect(password)
          .toBeVisible();

        await expect(email)
          .toHaveAccessibleName(
            /e-mail/i,
          );

        await expect(password)
          .toHaveAccessibleName(
            /senha/i,
          );

        const submit =
          page.locator(
            'button[type="submit"]',
          );

        await expect(submit)
          .toBeVisible();

        await expect(submit)
          .toHaveAccessibleName(
            /.+/,
          );

        await email.focus();

        await page.keyboard.press(
          "Tab",
        );

        await expect(password)
          .toBeFocused();

        await page.setViewportSize({
          width: 390,
          height: 844,
        });

        await expect(
          presentation,
        ).toBeHidden();

        await expect(
          page.getByRole("heading", {
            name: "Acesse sua conta",
          }),
        ).toBeVisible();

        await expectNoHorizontalOverflow(
          page,
        );
      },
    );

    test(
      "dashboard protegido preserva returnTo",
      async ({ page }) => {
        await page.goto(
          "/dashboard?tab=overview",
        );

        await expect(page).toHaveURL(
          /\/login\?returnTo=%2Fdashboard%3Ftab%3Doverview$/,
        );

        await expect(
          page.getByRole("heading", {
            name: "Acesse sua conta",
          }),
        ).toBeVisible();
      },
    );

    test(
      "dashboard autenticado renderiza shell real",
      async ({ page }) => {
        await installAuthenticatedAdmin(
          page,
        );

        await page.goto(
          "/dashboard",
        );

        await expect(
          page.getByRole("heading", {
            name: "Dashboard Executivo",
          }),
        ).toBeVisible();

        await expect(
          page.getByLabel(
            "Barra superior administrativa",
          ),
        ).toBeVisible();

        await expect(
          page.getByRole("button", {
            name:
              "Abrir menu da conta administrativa",
          }),
        ).toBeVisible();
      },
    );

    test(
      "design system mantém preview técnico sem login",
      async ({ page }) => {
        await page.goto(
          "/design-system",
        );

        await expect(
          page.getByLabel(
            "Barra superior administrativa",
          ),
        ).toBeVisible();

        await expect(
          page.getByText(
            "Modo técnico",
          ),
        ).toBeVisible();

        await expect(page)
          .toHaveURL(
            /\/design-system$/,
          );
      },
    );

    test(
      "403 administrativo preserva autenticação e abre acesso negado",
      async ({ page }) => {
        await installAuthenticatedAdmin(
          page,
        );

        await page.route(
          "**/auth/sessoes",
          async (route) => {
            await route.fulfill({
              status: 403,
              contentType:
                "application/json",
              body: JSON.stringify({
                statusCode: 403,
                message:
                  "Acesso não permitido",
              }),
            });
          },
        );

        await page.goto(
          "/sessoes",
        );

        await expect(page).toHaveURL(
          /\/acesso-negado$/,
        );

        await expect(
          page.getByTestId(
            "admin-access-denied",
          ),
        ).toBeVisible();

        await expect(
          page.getByRole("heading", {
            name:
              "Acesso não permitido",
          }),
        ).toBeVisible();

        await expect(
          page.getByRole("button", {
            name:
              "Abrir menu da conta administrativa",
          }),
        ).toBeVisible();
      },
    );

    test(
      "lista sessões, identifica atual e revoga outro dispositivo",
      async ({ page }) => {
        await installAuthenticatedAdmin(
          page,
        );

        let sessions = [
          CURRENT_SESSION,
          OTHER_SESSION,
        ];

        await page.route(
          "**/auth/sessoes",
          async (route) => {
            if (
              route.request().method() !==
              "GET"
            ) {
              await route.fallback();

              return;
            }

            await route.fulfill({
              status: 200,
              contentType:
                "application/json",
              body: JSON.stringify(
                sessions,
              ),
            });
          },
        );

        await page.route(
          "**/auth/sessoes/**",
          async (route) => {
            const requestUrl =
              new URL(
                route.request().url(),
              );

            const sessionId =
              decodeURIComponent(
                requestUrl.pathname
                  .split("/")
                  .pop() ?? "",
              );

            sessions =
              sessions.filter(
                (session) =>
                  session.id !==
                  sessionId,
              );

            await route.fulfill({
              status: 200,
              contentType:
                "application/json",
              body: JSON.stringify({
                message:
                  "Sessão revogada",
              }),
            });
          },
        );

        await page.goto(
          "/sessoes",
        );

        await expect(
          page.getByTestId(
            "admin-sessions-page",
          ),
        ).toBeVisible();

        await expect(
          page.getByText(
            "Sessão atual",
          ),
        ).toBeVisible();

        await expect(
          page.getByTestId(
            "admin-session-session-current",
          ),
        ).toBeVisible();

        await expect(
          page.getByTestId(
            "admin-session-session-other",
          ),
        ).toBeVisible();

        const revokeOther =
          page.getByRole(
            "button",
            {
              name:
                "Revogar sessão",
            },
          );

        await revokeOther.click();

        await page
          .getByRole("button", {
            name:
              "Confirmar revogação",
          })
          .click();

        await expect(
          page.getByTestId(
            "admin-session-session-other",
          ),
        ).toBeHidden();

        await expect(
          page.getByText(
            "Sessão revogada com sucesso.",
          ),
        ).toBeVisible();

        await page.setViewportSize({
          width: 390,
          height: 844,
        });

        await expect(
          page.getByTestId(
            "admin-session-session-current",
          ),
        ).toBeVisible();

        await expectNoHorizontalOverflow(
          page,
        );
      },
    );

    test(
      "encerrar a própria sessão pela página redireciona para login",
      async ({ page }) => {
        await installAuthenticatedAdmin(
          page,
        );

        await page.route(
          "**/auth/sessoes",
          async (route) => {
            await route.fulfill({
              status: 200,
              contentType:
                "application/json",
              body: JSON.stringify([
                CURRENT_SESSION,
              ]),
            });
          },
        );

        await page.route(
          "**/auth/sessoes/**",
          async (route) => {
            await route.fulfill({
              status: 200,
              contentType:
                "application/json",
              body: JSON.stringify({
                message:
                  "Sessão encerrada",
              }),
            });
          },
        );

        await page.goto(
          "/sessoes",
        );

        await page
          .getByRole("button", {
            name:
              "Encerrar esta sessão",
          })
          .click();

        await page
          .getByRole("button", {
            name:
              "Confirmar saída",
          })
          .click();

        await expect(page)
          .toHaveURL(
            /\/login$/,
          );

        await expect(
          page.getByRole("heading", {
            name: "Acesse sua conta",
          }),
        ).toBeVisible();
      },
    );

    test(
      "logout atual pelo menu encerra sessão sem returnTo",
      async ({ page }) => {
        await installAuthenticatedAdmin(
          page,
        );

        await page.goto(
          "/dashboard",
        );

        await page
          .getByRole("button", {
            name:
              "Abrir menu da conta administrativa",
          })
          .click();

        await page
          .getByRole("menuitem", {
            name:
              "Sair desta sessão",
          })
          .click();

        await expect(page)
          .toHaveURL(
            /\/login$/,
          );

        expect(
          page.url(),
        ).not.toContain(
          "returnTo",
        );
      },
    );

    test(
      "logout global exige confirmação e encerra todas as sessões",
      async ({ page }) => {
        await installAuthenticatedAdmin(
          page,
        );

        await page.goto(
          "/dashboard",
        );

        await page
          .getByRole("button", {
            name:
              "Abrir menu da conta administrativa",
          })
          .click();

        await page
          .getByRole("menuitem", {
            name:
              "Sair de todas as sessões",
          })
          .click();

        await expect(
          page.getByRole("note"),
        ).toContainText(
          "todos os dispositivos",
        );

        await page
          .getByRole("menuitem", {
            name:
              "Confirmar encerramento global",
          })
          .click();

        await expect(page)
          .toHaveURL(
            /\/login$/,
          );

        expect(
          page.url(),
        ).not.toContain(
          "returnTo",
        );
      },
    );
  },
);
