import {
  expect,
  test,
  type Page,
  type Request as PlaywrightRequest,
  type Route,
} from "@playwright/test";

type Chat55Role =
  "SUPER_ADMIN" | "ADMIN" | "GERENTE" | "RECEPCAO" | "PROFISSIONAL";

type ArquivosTracker = {
  gets: string[];
  posts: Array<{
    url: string;
    body: string;
    contentType: string;
  }>;
};

const EMPRESA_ID = "550e8400-e29b-41d4-a716-446655440001";

const documento = {
  id: "550e8400-e29b-41d4-a716-446655440010",
  empresaId: EMPRESA_ID,
  clienteId: null,
  usuarioId: null,
  servicoId: null,
  unidadeId: null,
  tipo: "DOCUMENTO",
  nomeOriginal: "contrato-e2e.pdf",
  nomeArquivo: "contrato-e2e-uuid.pdf",
  mimeType: "application/pdf",
  tamanhoBytes: 2048,
  caminho: "documentos/contrato-e2e-uuid.pdf",
  url: "/uploads/public/empresa-e2e/documentos/contrato-e2e-uuid.pdf",
  status: "ATIVO",
  visibilidade: "PUBLICO",
  createdAt: "2026-09-02T10:00:00.000Z",
  updatedAt: "2026-09-02T10:00:00.000Z",
};

const logo = {
  ...documento,
  id: "550e8400-e29b-41d4-a716-446655440011",
  tipo: "LOGO_EMPRESA",
  nomeOriginal: "logo-e2e.png",
  nomeArquivo: "logo-e2e-uuid.png",
  mimeType: "image/png",
  tamanhoBytes: 1024,
  caminho: "logo/logo-e2e-uuid.png",
  url: "/uploads/public/empresa-e2e/logo/logo-e2e-uuid.png",
};

function makeProfile(role: Chat55Role) {
  return {
    id: `user-e2e-${role.toLowerCase()}`,
    nome: `Usuario ${role}`,
    email: `${role.toLowerCase()}@beautycore.test`,
    role,
    empresaId: EMPRESA_ID,
    sessaoId: `session-${role.toLowerCase()}`,
  };
}

async function fulfillJson(
  route: Route,
  body: unknown,
  status = 200,
): Promise<void> {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

async function installAuthenticatedRole(
  page: Page,
  role: Chat55Role,
): Promise<void> {
  await page.addInitScript(() => {
    window.sessionStorage.setItem(
      "beauty-core:admin:refresh-token",
      "refresh-token-chat55-e2e",
    );
  });

  await page.route("**/auth/refresh", async (route) => {
    await fulfillJson(route, {
      access_token: "access-token-chat55-e2e",
      refresh_token: "refresh-token-chat55-e2e-rotated",
      expires_in: 3600,
    });
  });

  await page.route("**/auth/me", async (route) => {
    await fulfillJson(route, makeProfile(role));
  });

  await page.route("**/auth/logout", async (route) => {
    await fulfillJson(route, {
      message: "Sessão encerrada",
    });
  });

  await page.route("**/auth/logout-all", async (route) => {
    await fulfillJson(route, {
      message: "Sessões encerradas",
      totalRevogadas: 1,
    });
  });
}

function isApplicationNavigation(request: PlaywrightRequest): boolean {
  const headers = request.headers();

  return (
    request.resourceType() === "document" ||
    headers.rsc === "1" ||
    headers["next-router-prefetch"] === "1"
  );
}

function buildPage(
  data: unknown[],
  page = 1,
  total = data.length,
  totalPages = total > 0 ? Math.max(1, Math.ceil(total / 10)) : 0,
) {
  return {
    data,
    meta: {
      total,
      page,
      limit: 10,
      totalPages,
    },
  };
}

async function installArquivosApi(page: Page): Promise<ArquivosTracker> {
  const tracker: ArquivosTracker = {
    gets: [],
    posts: [],
  };

  await page.route("**/arquivos**", async (route) => {
    const request = route.request();

    const url = new URL(request.url());

    const pathname = url.pathname;

    if (!pathname.startsWith("/arquivos")) {
      await route.continue();
      return;
    }

    if (isApplicationNavigation(request)) {
      await route.continue();
      return;
    }

    if (request.method() === "GET" && pathname === "/arquivos") {
      tracker.gets.push(request.url());

      await fulfillJson(
        route,
        buildPage([documento], Number(url.searchParams.get("page") ?? "1")),
      );

      return;
    }

    if (
      request.method() === "GET" &&
      pathname === "/arquivos/tipo/LOGO_EMPRESA"
    ) {
      tracker.gets.push(request.url());

      const currentPage = Number(url.searchParams.get("page") ?? "1");

      await fulfillJson(
        route,
        buildPage(
          [logo],
          currentPage,
          currentPage === 2 ? 11 : 1,
          currentPage === 2 ? 2 : 1,
        ),
      );

      return;
    }

    if (request.method() === "POST" && pathname === "/arquivos/logo") {
      const bodyBuffer = request.postDataBuffer();

      const body = bodyBuffer?.toString("utf8") ?? request.postData() ?? "";

      const contentType = request.headers()["content-type"] ?? "";

      tracker.posts.push({
        url: request.url(),
        body,
        contentType,
      });

      await fulfillJson(route, logo);

      return;
    }

    await route.continue();
  });

  return tracker;
}

function monitorRuntime(page: Page): string[] {
  const errors: string[] = [];

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  return errors;
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const hasOverflow = await page.evaluate(() => {
    const root = document.documentElement;

    return root.scrollWidth > root.clientWidth;
  });

  expect(hasOverflow).toBe(false);
}

async function expectTenantAreaDenied(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    return (
      window.location.pathname === "/acesso-negado" ||
      document.body.textContent?.includes("Acesso não disponível") === true
    );
  });

  const denied = await page.evaluate(() => {
    return (
      window.location.pathname === "/acesso-negado" ||
      document.body.textContent?.includes("Acesso não disponível") === true
    );
  });

  expect(denied).toBe(true);
}

test.describe("Chat 55 — Arquivos + Configurações E2E", () => {
  test("ADMIN acessa Arquivos, recebe lista paginada e navegacao disponível", async ({
    page,
  }) => {
    const runtimeErrors = monitorRuntime(page);

    await installAuthenticatedRole(page, "ADMIN");

    const tracker = await installArquivosApi(page);

    await page.goto("/arquivos");

    await expect(
      page.getByRole("heading", {
        name: "Arquivos",
      }),
    ).toBeVisible();

    await expect(
      page.getByText("contrato-e2e.pdf", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(page.locator('a[href="/arquivos"]').first()).toBeVisible();

    await expect(
      page.locator('a[href="/configuracoes"]').first(),
    ).toBeVisible();

    await expect.poll(() => tracker.gets.length).toBe(1);

    const requestUrl = new URL(tracker.gets[0] ?? "");

    expect(requestUrl.pathname).toBe("/arquivos");

    expect(requestUrl.searchParams.get("page")).toBe("1");

    expect(requestUrl.searchParams.get("limit")).toBe("10");

    expect(requestUrl.searchParams.has("empresaId")).toBe(false);

    expect(runtimeErrors).toEqual([]);
  });

  test("GERENTE possui acesso de gestao a Arquivos", async ({ page }) => {
    await installAuthenticatedRole(page, "GERENTE");

    const tracker = await installArquivosApi(page);

    await page.goto("/arquivos");

    await expect(
      page.getByText("contrato-e2e.pdf", {
        exact: true,
      }),
    ).toBeVisible();

    await expect.poll(() => tracker.gets.length).toBe(1);
  });

  test("tipo LOGO_EMPRESA usa endpoint server-side dedicado e preserva paginacao", async ({
    page,
  }) => {
    await installAuthenticatedRole(page, "ADMIN");

    const tracker = await installArquivosApi(page);

    await page.goto("/arquivos?tipo=LOGO_EMPRESA&page=2");

    await expect(
      page.getByText("logo-e2e.png", {
        exact: true,
      }),
    ).toBeVisible();

    await expect.poll(() => tracker.gets.length).toBe(1);

    const requestUrl = new URL(tracker.gets[0] ?? "");

    expect(requestUrl.pathname).toBe("/arquivos/tipo/LOGO_EMPRESA");

    expect(requestUrl.searchParams.get("page")).toBe("2");

    expect(requestUrl.searchParams.get("limit")).toBe("10");

    expect(requestUrl.searchParams.has("search")).toBe(false);

    expect(requestUrl.searchParams.has("clienteId")).toBe(false);

    expect(requestUrl.searchParams.has("empresaId")).toBe(false);
  });

  test("Configuracoes conecta Branding e Arquivos sem mutation geral de Empresa", async ({
    page,
  }) => {
    await installAuthenticatedRole(page, "ADMIN");

    await page.goto("/configuracoes");

    await expect(
      page.getByRole("heading", {
        name: "Configurações",
      }),
    ).toBeVisible();

    await expect(
      page.locator('a[href="/configuracoes/branding"]'),
    ).toBeVisible();

    await expect(
      page.locator('a[href="/arquivos?tipo=LOGO_EMPRESA"]'),
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: /^Salvar$/i,
      }),
    ).toHaveCount(0);
  });

  test("Branding envia logo por multipart sem empresaId e atualiza preview", async ({
    page,
  }) => {
    const runtimeErrors = monitorRuntime(page);

    await installAuthenticatedRole(page, "ADMIN");

    const tracker = await installArquivosApi(page);

    await page.goto("/configuracoes/branding");

    await expect(page.getByText("Identidade efetiva")).toBeVisible();

    const input = page.getByLabel("Arquivo da logo");

    await expect(input).toBeVisible();

    await input.setInputFiles({
      name: "logo-chat55.png",
      mimeType: "image/png",
      buffer: Buffer.from("beauty-core-chat55-logo"),
    });

    const submit = page.getByRole("button", {
      name: "Enviar logo",
    });

    await expect(submit).toBeEnabled();

    await submit.click();

    await expect(
      page.getByText("Logo personalizada configurada"),
    ).toBeVisible();

    await expect.poll(() => tracker.posts.length).toBe(1);

    const post = tracker.posts[0];

    expect(new URL(post?.url ?? "").pathname).toBe("/arquivos/logo");

    expect(post?.contentType).toContain("multipart/form-data");

    expect(post?.contentType).not.toContain("application/json");

    expect(post?.body).toContain('name="file"');

    expect(post?.body).not.toContain("empresaId");

    expect(runtimeErrors).toEqual([]);
  });

  test("RECEPCAO nao executa GET da gestao de Arquivos", async ({ page }) => {
    await installAuthenticatedRole(page, "RECEPCAO");

    const tracker = await installArquivosApi(page);

    await page.goto("/arquivos");

    await expectTenantAreaDenied(page);

    await page.waitForTimeout(150);

    expect(tracker.gets).toEqual([]);
  });

  test("RECEPCAO nao acessa Configuracoes do tenant", async ({ page }) => {
    await installAuthenticatedRole(page, "RECEPCAO");

    await page.goto("/configuracoes");

    await expectTenantAreaDenied(page);

    await expect(page.locator('a[href="/configuracoes/branding"]')).toHaveCount(
      0,
    );
  });

  test("SUPER_ADMIN nao herda Configuracoes tenant automaticamente", async ({
    page,
  }) => {
    await installAuthenticatedRole(page, "SUPER_ADMIN");

    await page.goto("/configuracoes");

    await expectTenantAreaDenied(page);
  });

  const viewports = [
    {
      width: 360,
      height: 800,
    },
    {
      width: 390,
      height: 844,
    },
    {
      width: 768,
      height: 1024,
    },
    {
      width: 1366,
      height: 768,
    },
    {
      width: 1440,
      height: 900,
    },
    {
      width: 1920,
      height: 1080,
    },
  ] as const;

  for (const viewport of viewports) {
    test(`responsividade ${viewport.width}x${viewport.height} mantém Arquivos e Branding sem overflow global`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);

      await installAuthenticatedRole(page, "ADMIN");

      await installArquivosApi(page);

      await page.goto("/arquivos");

      await expect(
        page.getByRole("heading", {
          name: "Arquivos",
          exact: true,
        }),
      ).toBeVisible();

      await expectNoHorizontalOverflow(page);

      await page.goto("/configuracoes/branding");

      await expect(page.getByText("Identidade efetiva")).toBeVisible();

      await expectNoHorizontalOverflow(page);
    });
  }
});
