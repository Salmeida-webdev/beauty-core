import type { Page, Request, Route } from "@playwright/test";

export type Chat52Role =
  "SUPER_ADMIN" | "ADMIN" | "GERENTE" | "RECEPCAO" | "PROFISSIONAL";

export type Chat52RecordedRequest = {
  method: string;
  pathname: string;
  search: string;
  body: unknown;
};

export type Chat52Runtime = {
  requests: Chat52RecordedRequest[];
  consoleErrors: string[];
  pageErrors: string[];
};

export const CHAT52_IDS = {
  empresa: "10000000-0000-4000-8000-000000000001",

  categoria: "11111111-1111-4111-8111-111111111111",

  movimentoPendente: "22222222-2222-4222-8222-222222222222",

  movimentoPago: "33333333-3333-4333-8333-333333333333",

  cliente: "44444444-4444-4444-8444-444444444444",

  agendamento: "55555555-5555-4555-8555-555555555555",

  profissional: "66666666-6666-4666-8666-666666666666",

  comissao: "77777777-7777-4777-8777-777777777777",
} as const;

const NOW = "2026-08-29T20:00:00.000Z";

const categoria = {
  id: CHAT52_IDS.categoria,
  empresaId: CHAT52_IDS.empresa,
  nome: "Receitas E2E",
  tipo: "RECEITA",
  ativo: true,
  createdAt: NOW,
  updatedAt: NOW,
};

const cliente = {
  id: CHAT52_IDS.cliente,
  nome: "Cliente Financeiro E2E",
  telefone: "83999999999",
};

const agendamento = {
  id: CHAT52_IDS.agendamento,
  dataHoraInicio: NOW,
  status: "CONFIRMADO",
};

function createMovement(
  id: string,
  descricao: string,
  status: "PENDENTE" | "PAGO" | "CANCELADO",
) {
  return {
    id,
    empresaId: CHAT52_IDS.empresa,
    categoriaId: CHAT52_IDS.categoria,
    clienteId: CHAT52_IDS.cliente,
    agendamentoId: CHAT52_IDS.agendamento,
    descricao,
    tipo: "RECEITA",
    valor: status === "PENDENTE" ? 150 : 320,
    formaPagamento: "PIX",
    status,
    dataMovimentacao: NOW,
    observacoes: null,
    createdAt: NOW,
    updatedAt: NOW,
    categoria,
    cliente,
    agendamento,
  };
}

const initialPendingMovement = createMovement(
  CHAT52_IDS.movimentoPendente,
  "Receita E2E pendente",
  "PENDENTE",
);

const initialPaidMovement = createMovement(
  CHAT52_IDS.movimentoPago,
  "Receita E2E paga",
  "PAGO",
);

const profissional = {
  id: CHAT52_IDS.profissional,
  nome: "Profissional E2E",
};

const initialCommission = {
  id: CHAT52_IDS.comissao,
  empresaId: CHAT52_IDS.empresa,
  profissionalId: CHAT52_IDS.profissional,
  agendamentoId: CHAT52_IDS.agendamento,
  valorServico: 200,
  percentual: 10,
  valorComissao: 20,
  status: "PENDENTE",
  createdAt: NOW,
  updatedAt: NOW,
  profissional,
  agendamento,
};

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

function parseBody(request: Request): unknown {
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

function record(
  runtime: Chat52Runtime,
  request: Request,
): Chat52RecordedRequest {
  const url = new URL(request.url());

  const item = {
    method: request.method(),
    pathname: url.pathname,
    search: url.search,
    body: parseBody(request),
  };

  runtime.requests.push(item);

  return item;
}

export async function installChat52Financeiro(
  page: Page,
  role: Chat52Role = "ADMIN",
): Promise<Chat52Runtime> {
  const runtime: Chat52Runtime = {
    requests: [],
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

  await page.addInitScript(() => {
    window.sessionStorage.setItem(
      "beauty-core:admin:refresh-token",
      "refresh-token-chat52-e2e",
    );
  });

  await page.route("**/auth/refresh", async (route) => {
    await fulfillJson(route, {
      access_token: "access-token-chat52-e2e",

      refresh_token: "refresh-token-chat52-e2e-rotated",

      expires_in: 3600,
    });
  });

  await page.route("**/auth/me", async (route) => {
    await fulfillJson(route, {
      id: `user-${role.toLowerCase()}`,

      email: `${role.toLowerCase()}@beautycore.test`,

      role,

      empresaId: role === "SUPER_ADMIN" ? null : CHAT52_IDS.empresa,

      sessaoId: `session-${role.toLowerCase()}`,
    });
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

  await page.route("**/notificacoes**", async (route) => {
    const url = new URL(route.request().url());

    if (url.pathname === "/notificacoes/resumo") {
      await fulfillJson(route, {
        total: 0,
        totalNaoLidas: 0,
      });

      return;
    }

    await fulfillJson(route, {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      },
    });
  });

  let movements = [initialPendingMovement, initialPaidMovement];

  let commissions = [initialCommission];

  await page.route("**/categorias-financeiras**", async (route) => {
    const request = route.request();

    const url = new URL(request.url());

    record(runtime, request);

    if (
      request.method() === "GET" &&
      url.pathname === "/categorias-financeiras"
    ) {
      await fulfillJson(route, [categoria]);

      return;
    }

    await fulfillJson(route, categoria);
  });

  await page.route("**/financeiro**", async (route) => {
    const request = route.request();

    if (request.resourceType() === "document") {
      await route.fallback();

      return;
    }

    const url = new URL(request.url());

    if (!url.pathname.startsWith("/financeiro")) {
      await route.fallback();

      return;
    }

    const recorded = record(runtime, request);

    if (request.method() === "GET" && url.pathname === "/financeiro/resumo") {
      await fulfillJson(route, {
        receitas: 1000,
        despesas: 250,
        saldo: 750,
      });

      return;
    }

    if (
      request.method() === "GET" &&
      url.pathname === "/financeiro/fluxo-caixa"
    ) {
      await fulfillJson(route, {
        totalEntradas: 1000,
        totalSaidas: 250,
        saldo: 750,
        movimentacoes: movements.filter((item) => item.status === "PAGO"),
      });

      return;
    }

    if (
      request.method() === "GET" &&
      url.pathname === "/financeiro/receitas-mes"
    ) {
      await fulfillJson(route, {
        mes: 8,
        ano: 2026,
        total: 1000,
      });

      return;
    }

    if (
      request.method() === "GET" &&
      url.pathname === "/financeiro/despesas-mes"
    ) {
      await fulfillJson(route, {
        mes: 8,
        ano: 2026,
        total: 250,
      });

      return;
    }

    const payMatch = url.pathname.match(/^\/financeiro\/([^/]+)\/pagar$/);

    if (request.method() === "PATCH" && payMatch) {
      const id = payMatch[1];

      const body = recorded.body as {
        formaPagamento?: string;
      } | null;

      movements = movements.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "PAGO" as const,

              formaPagamento: body?.formaPagamento ?? item.formaPagamento,

              updatedAt: "2026-08-29T20:10:00.000Z",
            }
          : item,
      );

      await fulfillJson(route, movements.find((item) => item.id === id) ?? {});

      return;
    }

    const cancelMatch = url.pathname.match(/^\/financeiro\/([^/]+)\/cancelar$/);

    if (request.method() === "PATCH" && cancelMatch) {
      const id = cancelMatch[1];

      movements = movements.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "CANCELADO" as const,

              updatedAt: "2026-08-29T20:15:00.000Z",
            }
          : item,
      );

      await fulfillJson(route, movements.find((item) => item.id === id) ?? {});

      return;
    }

    if (request.method() === "GET" && url.pathname === "/financeiro") {
      const pageNumber = Number(url.searchParams.get("page") ?? "1");

      const limit = Number(url.searchParams.get("limit") ?? "20");

      await fulfillJson(route, {
        data: movements,
        total: movements.length,
        page: pageNumber,
        limit,
        totalPages: 1,
      });

      return;
    }

    const detailMatch = url.pathname.match(/^\/financeiro\/([^/]+)$/);

    if (request.method() === "GET" && detailMatch) {
      const item = movements.find((movement) => movement.id === detailMatch[1]);

      await fulfillJson(route, item ?? {}, item ? 200 : 404);

      return;
    }

    if (request.method() === "POST" && url.pathname === "/financeiro") {
      await fulfillJson(route, initialPendingMovement, 201);

      return;
    }

    if (request.method() === "PATCH" && detailMatch) {
      const item = movements.find((movement) => movement.id === detailMatch[1]);

      await fulfillJson(route, item ?? initialPendingMovement);

      return;
    }

    await fulfillJson(
      route,
      {
        message: "Rota financeira E2E não mockada",
      },
      404,
    );
  });

  await page.route("**/comissoes**", async (route) => {
    const request = route.request();

    const url = new URL(request.url());

    if (!url.pathname.startsWith("/comissoes")) {
      await route.fallback();

      return;
    }

    record(runtime, request);

    if (request.method() === "GET" && url.pathname === "/comissoes") {
      await fulfillJson(route, commissions);

      return;
    }

    const payMatch = url.pathname.match(/^\/comissoes\/([^/]+)\/pagar$/);

    if (request.method() === "PATCH" && payMatch) {
      commissions = commissions.map((item) =>
        item.id === payMatch[1]
          ? {
              ...item,
              status: "PAGO",

              updatedAt: "2026-08-29T20:20:00.000Z",
            }
          : item,
      );

      await fulfillJson(
        route,
        commissions.find((item) => item.id === payMatch[1]) ?? {},
      );

      return;
    }

    const detailMatch = url.pathname.match(/^\/comissoes\/([^/]+)$/);

    if (request.method() === "GET" && detailMatch) {
      const item = commissions.find(
        (commission) => commission.id === detailMatch[1],
      );

      await fulfillJson(route, item ?? {}, item ? 200 : 404);

      return;
    }

    if (request.method() === "POST" && url.pathname === "/comissoes") {
      await fulfillJson(route, initialCommission, 201);

      return;
    }

    await fulfillJson(
      route,
      {
        message: "Rota comissão E2E não mockada",
      },
      404,
    );
  });

  await page.route("**/analytics/financeiro**", async (route) => {
    record(runtime, route.request());

    await fulfillJson(route, {
      receitas: 0,
      despesas: 0,
      saldo: 0,
    });
  });

  await page.route("**/pagamentos**", async (route) => {
    record(runtime, route.request());

    await fulfillJson(
      route,
      {
        message: "Endpoint fictício detectado",
      },
      404,
    );
  });

  await page.route("**/*estornar*", async (route) => {
    record(runtime, route.request());

    await fulfillJson(
      route,
      {
        message: "Endpoint fictício detectado",
      },
      404,
    );
  });

  return runtime;
}

export async function hasNoHorizontalOverflow(page: Page): Promise<boolean> {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth <=
      document.documentElement.clientWidth,
  );
}
