import {
  expect,
  test,
} from "@playwright/test";

test(
  "rota raiz encaminha visitante administrativo para login",
  async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(
      /\/login\?returnTo=%2Fdashboard$/,
    );

    await expect(
      page.getByRole("heading", {
        name: "Acesse sua conta",
      }),
    ).toBeVisible();
  },
);
