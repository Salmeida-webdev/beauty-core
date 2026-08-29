import { expect, type Page, type Route } from "@playwright/test";

export type Chat50Role =
  "SUPER_ADMIN" | "ADMIN" | "GERENTE" | "RECEPCAO" | "PROFISSIONAL";

export type Chat50RuntimeErrors = {
  consoleErrors: string[];
  pageErrors: string[];
};

export type Chat50RequestRecord = {
  method: string;
  path: "/servicos" | "/unidades" | "/usuarios";
  searchParams: Record<string, string>;
};

export type Chat50ApiController = {
  requests: Chat50RequestRecord[];
  callsTo: (path: Chat50RequestRecord["path"]) => number;
};

export const EMPRESA_ID = "550e8400-e29b-41d4-a716-446655440001";

export const ADMIN_ID = "550e8400-e29b-41d4-a716-446655440099";

export const GERENTE_ID = "550e8400-e29b-41d4-a716-446655440098";

export const PROFISSIONAL_ID = "550e8400-e29b-41d4-a716-446655440020";

export const SERVICO_ID = "550e8400-e29b-41d4-a716-446655440030";

export const UNIDADE_ID = "550e8400-e29b-41d4-a716-446655440040";

const CREATED_AT = "2026-08-28T10:00:00.000Z";

const UPDATED_AT = "2026-08-28T12:00:00.000Z";

export const SERVICO_FIXTURE = {
  id: SERVICO_ID,
  empresaId: EMPRESA_ID,
  nome: "Limpeza Premium",
  descricao: "Procedimento facial completo.",
  duracaoMinutos: 60,
  preco: 150,
  imagem: null,
  ativo: true,
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
};

export const UNIDADE_FIXTURE = {
  id: UNIDADE_ID,
  empresaId: EMPRESA_ID,
  nome: "Unidade Centro",
  telefone: "83999999999",
  email: "centro@beautycore.test",
  endereco: "Rua Principal, 100",
  ativa: true,
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
};

export const ADMIN_FIXTURE = {
  id: ADMIN_ID,
  empresaId: EMPRESA_ID,
  nome: "Administrador E2E",
  email: "admin@beautycore.test",
  telefone: "83999999999",
  foto: null,
  role: "ADMIN",
  ativo: true,
  ultimoLogin: UPDATED_AT,
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
};

export const GERENTE_FIXTURE = {
  id: GERENTE_ID,
  empresaId: EMPRESA_ID,
  nome: "Gerente E2E",
  email: "gerente@beautycore.test",
  telefone: null,
  foto: null,
  role: "GERENTE",
  ativo: true,
  ultimoLogin: null,
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
};

export const PROFISSIONAL_FIXTURE = {
  id: PROFISSIONAL_ID,
  empresaId: EMPRESA_ID,
  nome: "Maria Profissional",
  email: "maria.profissional@beautycore.test",
  telefone: "83988887777",
  foto: null,
  role: "PROFISSIONAL",
  ativo: true,
  ultimoLogin: UPDATED_AT,
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
};

function authIdForRole(role: Chat50Role): string {
  if (role === "ADMIN") {
    return ADMIN_ID;
  }

  if (role === "GERENTE") {
    return GERENTE_ID;
  }

  return "550e8400-e29b-41d4-a716-446655440097";
}

function authProfile(role: Chat50Role) {
  return {
    id: authIdForRole(role),
    email: `${role.toLowerCase()}@beautycore.test`,
    role,
    empresaId: role === "SUPER_ADMIN" ? null : EMPRESA_ID,
    sessaoId: "session-current",
  };
}

async function fulfillJson(route: Route, data: unknown): Promise<void> {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify(data),
  });
}

export async function installChat50Auth(
  page: Page,
  role: Chat50Role,
): Promise<void> {
  await page.addInitScript(() => {
    window.sessionStorage.setItem(
      "beauty-core:admin:refresh-token",
      "refresh-token-e2e",
    );
  });

  await page.route("**/auth/refresh", async (route) => {
    await fulfillJson(route, {
      access_token: "access-token-e2e",
      refresh_token: "refresh-token-e2e-rotated",
      expires_in: 3600,
    });
  });

  await page.route("**/auth/me", async (route) => {
    await fulfillJson(route, authProfile(role));
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

export function monitorChat50Runtime(page: Page): Chat50RuntimeErrors {
  const runtime: Chat50RuntimeErrors = {
    consoleErrors: [],
    pageErrors: [],
  };

  page.on("console", (message) => {
    if (message.type() === "error") {
      runtime.consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    runtime.pageErrors.push(error.message);
  });

  return runtime;
}

export function expectNoRuntimeErrors(runtime: Chat50RuntimeErrors): void {
  expect(
    runtime.consoleErrors,
    `console.error detectado: ${runtime.consoleErrors.join("\n")}`,
  ).toEqual([]);

  expect(
    runtime.pageErrors,
    `pageerror detectado: ${runtime.pageErrors.join("\n")}`,
  ).toEqual([]);
}

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect
    .poll(
      async () =>
        page.evaluate(() => {
          const root = document.documentElement;

          return root.scrollWidth <= root.clientWidth;
        }),
      {
        timeout: 10_000,
        message: "A página permaneceu com overflow horizontal.",
      },
    )
    .toBe(true);
}

export async function expectVisibleExactText(
  page: Page,
  text: string,
): Promise<void> {
  const matches = page.getByText(text, {
    exact: true,
  });

  await expect
    .poll(
      async () => {
        const count = await matches.count();

        if (count === 0) {
          return false;
        }

        for (let index = 0; index < count; index += 1) {
          if (await matches.nth(index).isVisible()) {
            return true;
          }
        }

        return false;
      },
      {
        timeout: 10_000,
        intervals: [100, 200, 300, 500],
        message: `Nenhuma ocorrência visível encontrada: ${text}`,
      },
    )
    .toBe(true);
}

export async function waitForChat50Request(
  controller: Chat50ApiController,
  path: Chat50RequestRecord["path"],
  predicate: (request: Chat50RequestRecord) => boolean = () => true,
): Promise<Chat50RequestRecord> {
  await expect
    .poll(
      () =>
        controller.requests.some(
          (request) => request.path === path && predicate(request),
        ),
      {
        timeout: 10_000,
        intervals: [100, 200, 300, 500],
        message: `A requisição esperada não ocorreu: ${path}`,
      },
    )
    .toBe(true);

  const request = controller.requests.find(
    (item) => item.path === path && predicate(item),
  );

  if (!request) {
    throw new Error(`Requisição não localizada após espera: ${path}`);
  }

  return request;
}

function searchParamsToRecord(url: URL): Record<string, string> {
  return Object.fromEntries(url.searchParams.entries());
}

function isApiLikeRequest(request: ReturnType<Route["request"]>): boolean {
  const headers = request.headers();

  const accept = headers.accept ?? "";

  const contentType = headers["content-type"] ?? "";

  if (accept.includes("text/x-component")) {
    return false;
  }

  return (
    accept.includes("application/json") ||
    contentType.includes("application/json") ||
    ["POST", "PATCH", "PUT", "DELETE"].includes(request.method())
  );
}

export async function mockChat50ManagementApi(
  page: Page,
): Promise<Chat50ApiController> {
  const requests: Chat50RequestRecord[] = [];

  const controller: Chat50ApiController = {
    requests,

    callsTo: (path) =>
      requests.filter((request) => request.path === path).length,
  };

  await page.route("**/*", async (route) => {
    const request = route.request();

    const url = new URL(request.url());

    if (url.pathname.includes("/auth/")) {
      await route.fallback();

      return;
    }

    if (!isApiLikeRequest(request)) {
      await route.fallback();

      return;
    }

    const method = request.method();

    if (method === "GET" && url.pathname.endsWith("/servicos")) {
      requests.push({
        method,
        path: "/servicos",
        searchParams: searchParamsToRecord(url),
      });

      await fulfillJson(route, [SERVICO_FIXTURE]);

      return;
    }

    if (method === "GET" && url.pathname.endsWith("/unidades")) {
      requests.push({
        method,
        path: "/unidades",
        searchParams: searchParamsToRecord(url),
      });

      await fulfillJson(route, [UNIDADE_FIXTURE]);

      return;
    }

    if (method === "GET" && url.pathname.endsWith("/usuarios")) {
      const searchParams = searchParamsToRecord(url);

      requests.push({
        method,
        path: "/usuarios",
        searchParams,
      });

      const data =
        searchParams.role === "PROFISSIONAL"
          ? [PROFISSIONAL_FIXTURE]
          : [ADMIN_FIXTURE, GERENTE_FIXTURE];

      await fulfillJson(route, {
        data,

        meta: {
          total: data.length,

          page: Number(searchParams.page ?? "1"),

          limit: Number(searchParams.limit ?? "20"),

          totalPages: 1,
        },
      });

      return;
    }

    await route.fallback();
  });

  return controller;
}
