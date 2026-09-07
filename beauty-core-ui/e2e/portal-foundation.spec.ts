import { expect, test } from "@playwright/test";

const OFFICIAL_VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1366", width: 1366, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
] as const;

for (const viewport of OFFICIAL_VIEWPORTS) {
  test(`Portal foundation em ${viewport.name}`, async ({ page }) => {
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

    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    await page.goto("/portal", {
      waitUntil: "domcontentloaded",
    });

    await expect(
      page.getByRole("heading", {
        name: "Sua experiência personalizada começa aqui",
      }),
    ).toBeVisible();

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByLabel("Beauty Core")).toBeVisible();

    const skipLink = page.getByRole("link", {
      name: "Pular para o conteúdo principal",
    });

    await expect(skipLink).toHaveAttribute("href", "#portal-main");

    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth <= window.innerWidth,
      document:
        document.documentElement.scrollWidth <= window.innerWidth,
    }));

    expect(overflow.body).toBe(true);
    expect(overflow.document).toBe(true);

    const links = await page.locator("a").evaluateAll((elements) =>
      elements
        .map((element) => element.getAttribute("href"))
        .filter((href): href is string => Boolean(href)),
    );

    const unsafeLinks = links.filter(
      (href) =>
        !href.startsWith("#") &&
        !href.startsWith("/portal"),
    );

    expect(unsafeLinks).toEqual([]);
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
}

test("Portal e Admin permanecem isolados", async ({ page }) => {
  await page.goto("/portal", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", {
      name: "Sua experiência personalizada começa aqui",
    }),
  ).toBeVisible();

  await page.goto("/admin", {
    waitUntil: "domcontentloaded",
  });

  expect(page.url()).not.toContain("/portal");
  await expect(
    page.getByRole("heading", {
      name: "Sua experiência personalizada começa aqui",
    }),
  ).not.toBeVisible();
});

test("returnTo malicioso nao altera a origem da pagina", async ({ page }) => {
  await page.goto(
    "/portal?returnTo=https%3A%2F%2Fevil.example%2Fsteal",
    {
      waitUntil: "domcontentloaded",
    },
  );

  const currentUrl = new URL(page.url());

  expect(currentUrl.pathname).toBe("/portal");
  expect(currentUrl.hostname).not.toBe("evil.example");

  await expect(
    page.getByRole("heading", {
      name: "Sua experiência personalizada começa aqui",
    }),
  ).toBeVisible();
});

test("raiz neutra nao antecipa telas privadas ou de negocio", async ({
  page,
}) => {
  await page.goto("/portal", {
    waitUntil: "domcontentloaded",
  });

  const futureHeadings = [
    "Dashboard",
    "Perfil",
    "Historico",
    "Agendamentos",
    "Fidelidade",
    "Beneficios",
    "Pacotes",
    "Notificacoes",
  ];

  for (const heading of futureHeadings) {
    await expect(
      page.getByRole("heading", { name: heading }),
    ).not.toBeVisible();
  }
});
