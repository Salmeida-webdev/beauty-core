import { expect, test } from "@playwright/test";

test("carrega a fundação administrativa sem erros", async ({
  page,
}) => {
  const browserProblems: string[] = [];

  page.on("console", (message) => {
    if (
      message.type() === "error" ||
      message.type() === "warning"
    ) {
      browserProblems.push(
        `${message.type()}: ${message.text()}`,
      );
    }
  });

  page.on("pageerror", (error) => {
    browserProblems.push(`pageerror: ${error.message}`);
  });

  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);

  await expect(page).toHaveTitle(
    "Beauty Core | Painel Administrativo",
  );

  await expect(page.locator("html")).toHaveAttribute(
    "lang",
    "pt-BR",
  );

  await expect(
    page.getByRole("heading", {
      name: "Fundação do frontend pronta",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("list", {
      name: "Recursos configurados",
    }),
  ).toBeVisible();

  await page.waitForLoadState("networkidle");

  expect(browserProblems).toEqual([]);
});
