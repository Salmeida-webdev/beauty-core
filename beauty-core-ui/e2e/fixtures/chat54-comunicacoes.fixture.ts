import type {
  Page,
  Request,
  Route,
} from "@playwright/test";

export type Chat54Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "GERENTE"
  | "RECEPCAO"
  | "PROFISSIONAL";

export type Chat54Call = {
  method: string;
  path: string;
  body: unknown;
};

export type Chat54Fixture = {
  calls: Chat54Call[];
  unhandled: string[];
  forbidden: string[];
  callsTo: (
    path: string,
    method?: string,
  ) => number;
};

const CHAT54_API_PREFIXES = [
  "/templates-whatsapp",
  "/mensagens-whatsapp",
  "/campanhas-whatsapp",
  "/notificacoes",
  "/configuracoes-notificacao",
  "/automacoes",
] as const;

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function readRequestBody(
  request: Request,
): unknown {
  const raw = request.postData();

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return raw;
  }
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

function isChat54ApiPath(
  path: string,
): boolean {
  return CHAT54_API_PREFIXES.some(
    (prefix) =>
      path === prefix ||
      path.startsWith(`${prefix}/`),
  );
}

function isNextNavigationRequest(
  request: Request,
  url: URL,
): boolean {
  const headers = request.headers();

  return (
    request.resourceType() === "document" ||
    url.searchParams.has("_rsc") ||
    headers.rsc === "1" ||
    headers["next-router-prefetch"] === "1"
  );
}

export async function installChat54Fixture(
  page: Page,
  role: Chat54Role,
): Promise<Chat54Fixture> {
  const calls: Chat54Call[] = [];
  const unhandled: string[] = [];
  const forbidden: string[] = [];

  const notificationConfig = {
    id: "config-notificacao-e2e",
    notificarAgendamentos: true,
    notificarFinanceiro: true,
    notificarFidelidade: true,
    notificarPacotes: true,
    notificarClientes: true,
    notificarMarketing: false,
  };

  await page.addInitScript(() => {
    window.sessionStorage.setItem(
      "beauty-core:admin:refresh-token",
      "refresh-chat54-e2e",
    );
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      unhandled.push(
        `console:${message.text()}`,
      );
    }
  });

  page.on("pageerror", (error) => {
    unhandled.push(
      `pageerror:${error.message}`,
    );
  });

  page.on("request", (request) => {
    const path = new URL(
      request.url(),
    ).pathname;

    if (
      path === "/queues" ||
      path.startsWith("/queues/") ||
      path.includes("/dlq") ||
      path.includes("reprocessar")
    ) {
      forbidden.push(
        `${request.method()} ${path}`,
      );
    }
  });

  await page.route(
    "**/*",
    async (route) => {
      const request = route.request();
      const url = new URL(
        request.url(),
      );

      const path = url.pathname;
      const method = request.method();

      if (
        isNextNavigationRequest(
          request,
          url,
        )
      ) {
        await route.continue();
        return;
      }

      if (
        path === "/auth/refresh" &&
        method === "POST"
      ) {
        await fulfillJson(route, {
          access_token:
            "access-chat54-e2e",
          refresh_token:
            "refresh-chat54-e2e",
          expires_in: 3600,
        });

        return;
      }

      if (
        path === "/auth/me" &&
        method === "GET"
      ) {
        await fulfillJson(route, {
          id: "usuario-chat54-e2e",
          email:
            "chat54.e2e@beautycore.test",
          role,
          empresaId:
            "empresa-chat54-e2e",
          sessaoId:
            "sessao-chat54-e2e",
        });

        return;
      }

      if (!isChat54ApiPath(path)) {
        await route.continue();
        return;
      }

      const body =
        readRequestBody(request);

      calls.push({
        method,
        path,
        body,
      });

      if (
        path ===
          "/templates-whatsapp" &&
        method === "GET"
      ) {
        await fulfillJson(route, []);
        return;
      }

      if (
        path ===
          "/mensagens-whatsapp" &&
        method === "GET"
      ) {
        const pageNumber = Number(
          url.searchParams.get("page") ??
            "1",
        );

        const limit = Number(
          url.searchParams.get("limit") ??
            "20",
        );

        await fulfillJson(route, {
          data: [],
          meta: {
            page: pageNumber,
            limit,
            total: 0,
            totalPages: 0,
          },
        });

        return;
      }

      if (
        path ===
          "/mensagens-whatsapp/enviar" &&
        method === "POST"
      ) {
        await fulfillJson(route, {
          processado: true,
          processamento: "assincrono",
          whatsappGerado: true,
          mensagemId:
            "mensagem-chat54-e2e",
          jobId:
            "job-whatsapp-chat54-e2e",
          queue: "whatsapp",
        });

        return;
      }

      if (
        path ===
          "/campanhas-whatsapp" &&
        method === "GET"
      ) {
        await fulfillJson(route, []);
        return;
      }

      if (
        path ===
          "/notificacoes/resumo" &&
        method === "GET"
      ) {
        await fulfillJson(route, {
          total: 0,
          naoLidas: 0,
          lidas: 0,
          arquivadas: 0,
        });

        return;
      }

      if (
        path ===
          "/notificacoes/nao-lidas" &&
        method === "GET"
      ) {
        await fulfillJson(route, {
          quantidade: 0,
        });

        return;
      }

      if (
        path === "/notificacoes" &&
        method === "GET"
      ) {
        const pageNumber = Number(
          url.searchParams.get("page") ??
            "1",
        );

        const limit = Number(
          url.searchParams.get("limit") ??
            "20",
        );

        await fulfillJson(route, {
          data: [],
          meta: {
            page: pageNumber,
            limit,
            total: 0,
            totalPages: 0,
          },
        });

        return;
      }

      if (
        path ===
          "/configuracoes-notificacao" &&
        method === "GET"
      ) {
        await fulfillJson(
          route,
          notificationConfig,
        );

        return;
      }

      if (
        path ===
          "/configuracoes-notificacao" &&
        method === "PATCH"
      ) {
        const patch =
          isRecord(body)
            ? body
            : {};

        await fulfillJson(route, {
          ...notificationConfig,
          ...patch,
        });

        return;
      }

      if (
        path ===
          "/automacoes/eventos" &&
        method === "GET"
      ) {
        await fulfillJson(route, {
          total: 0,
          porTipo: {},
          porModulo: {},
          eventos: [],
        });

        return;
      }

      if (
        path ===
          "/automacoes/teste-aniversario" &&
        method === "POST"
      ) {
        await fulfillJson(route, {
          processado: true,
          processamento: "assincrono",
          queue: "aniversarios",
          jobId:
            "job-aniversario-chat54-e2e",
        });

        return;
      }

      if (
        path ===
          "/automacoes/teste-relatorio" &&
        method === "POST"
      ) {
        await fulfillJson(route, {
          processado: true,
          processamento: "assincrono",
          queue: "relatorios",
          jobId:
            "job-relatorio-chat54-e2e",
        });

        return;
      }

      unhandled.push(
        `${method} ${path}`,
      );

      await fulfillJson(
        route,
        {
          message:
            "Rota Chat54 não tratada pela fixture E2E.",
        },
        501,
      );
    },
  );

  return {
    calls,
    unhandled,
    forbidden,

    callsTo(
      path: string,
      method?: string,
    ): number {
      return calls.filter(
        (call) =>
          call.path === path &&
          (
            !method ||
            call.method ===
              method.toUpperCase()
          ),
      ).length;
    },
  };
}