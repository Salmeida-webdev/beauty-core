import {
  expect,
  test,
  type Page,
} from "@playwright/test";

function captureRuntimeErrors(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  return {
    consoleErrors,
    pageErrors,
  };
}

test.describe("Chat 45 — Design System desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 1000,
    });
  });

  test("renderiza o shell técnico sem erros de runtime", async ({
    page,
  }) => {
    const runtimeErrors = captureRuntimeErrors(page);

    await page.goto("/design-system");

    await expect(
      page.getByTestId("design-system-page"),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Design System",
      }),
    ).toBeVisible();

    await expect(
      page.getByLabel(
        "Barra superior administrativa",
      ),
    ).toBeVisible();

    await expect(
      page.getByRole("complementary", {
        name: "Navegação administrativa",
      }),
    ).toBeVisible();

    await expect(
      page.getByText(
        /Demonstração técnica do Design System/,
      ),
    ).toBeVisible();

    expect(runtimeErrors.consoleErrors).toEqual([]);
    expect(runtimeErrors.pageErrors).toEqual([]);
  });

  test("recolhe e expande a sidebar desktop", async ({
    page,
  }) => {
    await page.goto("/design-system");

    const sidebar = page.getByRole(
      "complementary",
      {
        name: "Navegação administrativa",
      },
    );

    await expect(sidebar).toHaveAttribute(
      "data-collapsed",
      "false",
    );

    await page.getByRole("button", {
      name: "Recolher navegação",
    }).click();

    await expect(sidebar).toHaveAttribute(
      "data-collapsed",
      "true",
    );

    await page.getByRole("button", {
      name: "Expandir navegação",
    }).click();

    await expect(sidebar).toHaveAttribute(
      "data-collapsed",
      "false",
    );
  });

  test("alterna entre temas claro e escuro", async ({
    page,
  }) => {
    await page.goto("/design-system");

    const themeButton = page.getByRole(
      "button",
      {
        name: /Ativar tema (claro|escuro)/,
      },
    );

    await expect(themeButton).toBeEnabled();

    const html = page.locator("html");

    const initialClass =
      (await html.getAttribute("class")) ?? "";

    await themeButton.click();

    await expect
      .poll(async () => {
        return (
          (await html.getAttribute("class")) ?? ""
        );
      })
      .not.toBe(initialClass);

    await expect(
      page.getByRole("button", {
        name: /Ativar tema (claro|escuro)/,
      }),
    ).toBeVisible();
  });

  test("abre dialog, confirmação e drawer", async ({
    page,
  }) => {
    await page.goto("/design-system");

    await page.getByRole("button", {
      name: "Abrir dialog",
    }).click();

    await expect(
      page.getByRole("dialog", {
        name: "Editar registro",
      }),
    ).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(
      page.getByRole("dialog", {
        name: "Editar registro",
      }),
    ).not.toBeVisible();

    await page.getByRole("button", {
      name: "Excluir exemplo",
    }).click();

    await expect(
      page.getByRole("alertdialog", {
        name: "Confirmar exclusão?",
      }),
    ).toBeVisible();

    await page.getByRole("button", {
      name: "Cancelar",
    }).click();

    await expect(
      page.getByRole("alertdialog", {
        name: "Confirmar exclusão?",
      }),
    ).not.toBeVisible();

    await page.getByRole("button", {
      name: "Abrir drawer",
    }).click();

    await expect(
      page.getByRole("dialog", {
        name: "Detalhes do registro",
      }),
    ).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(
      page.getByRole("dialog", {
        name: "Detalhes do registro",
      }),
    ).not.toBeVisible();
  });
});

test.describe("Chat 45 — Design System mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });
  });

  test("usa drawer mobile e não gera overflow global", async ({
    page,
  }) => {
    const runtimeErrors = captureRuntimeErrors(page);

    await page.goto("/design-system");

    await expect(
      page.getByTestId("design-system-page"),
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "Abrir navegação",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("complementary", {
        name: "Navegação administrativa",
      }),
    ).toBeHidden();

    await page.getByRole("button", {
      name: "Abrir navegação",
    }).click();

    await expect(
      page.getByLabel(
        "Navegação administrativa mobile",
      ),
    ).toBeVisible();

    await expect(
      page.getByText(
        "Clínica Demo",
        {
          exact: true,
        },
      ),
    ).toHaveCount(0);

    const activeDesignSystem = page
      .getByLabel(
        "Navegação administrativa mobile",
      )
      .getByRole("link", {
        name: /Design System/,
      });

    await expect(
      activeDesignSystem,
    ).toHaveAttribute(
      "aria-current",
      "page",
    );

    await activeDesignSystem.click();

    await expect(
      page.getByLabel(
        "Navegação administrativa mobile",
      ),
    ).not.toBeVisible();

    const dimensions = await page.evaluate(() => ({
      scrollWidth:
        document.documentElement.scrollWidth,
      clientWidth:
        document.documentElement.clientWidth,
    }));

    expect(
      dimensions.scrollWidth,
    ).toBeLessThanOrEqual(
      dimensions.clientWidth,
    );

    expect(runtimeErrors.consoleErrors).toEqual([]);
    expect(runtimeErrors.pageErrors).toEqual([]);
  });

  test("mantém tabela contida em região com scroll horizontal", async ({
    page,
  }) => {
    await page.goto("/design-system");

    const tableRegion = page.getByRole(
      "region",
      {
        name: "Agendamentos demonstrativos",
      },
    );

    await expect(tableRegion).toBeVisible();

    const overflowX = await tableRegion.evaluate(
      (element) =>
        window.getComputedStyle(element).overflowX,
    );

    expect(
      ["auto", "scroll"],
    ).toContain(overflowX);

    const pageDimensions = await page.evaluate(
      () => ({
        scrollWidth:
          document.documentElement.scrollWidth,
        clientWidth:
          document.documentElement.clientWidth,
      }),
    );

    expect(
      pageDimensions.scrollWidth,
    ).toBeLessThanOrEqual(
      pageDimensions.clientWidth,
    );
  });
});