import type {
  Page,
} from "@playwright/test";

export type ClientesE2eRole =
  | "ADMIN"
  | "GERENTE"
  | "RECEPCAO"
  | "PROFISSIONAL"
  | "SUPER_ADMIN";

export type ClientesRequestRecord = {
  path: string;
  method: string;
  searchParams: Record<string, string>;
};

export type ClientesRuntimeErrors = {
  consoleErrors: string[];
  pageErrors: string[];
};

export type ClientesApiController = {
  requests: ClientesRequestRecord[];
  callsTo: (
    path: string,
    method?: string,
  ) => number;
  failNext: (
    path: string,
    method?: string,
    status?: number,
  ) => void;
};

type PendingFailure = {
  path: string;
  method: string;
  status: number;
  remaining: number;
};

export const CLIENTE_ID =
  "550e8400-e29b-41d4-a716-446655440000";

export const EMPRESA_ID =
  "550e8400-e29b-41d4-a716-446655440001";

const FIDELIDADE_ID =
  "550e8400-e29b-41d4-a716-446655440002";

const MOVIMENTACAO_ID =
  "550e8400-e29b-41d4-a716-446655440003";

const NIVEL_ID =
  "550e8400-e29b-41d4-a716-446655440004";

const CLIENTE_PACOTE_ID =
  "550e8400-e29b-41d4-a716-446655440005";

const PACOTE_ID =
  "550e8400-e29b-41d4-a716-446655440006";

export const CLIENTE_FIXTURE = {
  id: CLIENTE_ID,
  empresaId: EMPRESA_ID,
  nome: "Maria Silva",
  telefone: "83999999999",
  email: "maria@example.com",
  foto: null,
  dataNascimento:
    "1990-05-10T00:00:00.000Z",
  observacoes:
    "Cliente recorrente da unidade principal.",
  ativo: true,
  ativoPortal: true,
  aceitouTermos: true,
  dataAceiteTermos:
    "2026-01-05T10:00:00.000Z",
  ultimoAcessoPortal:
    "2026-08-27T18:30:00.000Z",
  createdAt:
    "2026-01-01T10:00:00.000Z",
  updatedAt:
    "2026-08-27T18:30:00.000Z",
} as const;

export const CLIENTES_LIST_FIXTURE = {
  data: [
    CLIENTE_FIXTURE,
  ],
  meta: {
    total: 1,
    page: 1,
    limit: 20,
    totalPages: 1,
  },
} as const;

export const FIDELIDADE_SALDO_FIXTURE = {
  id: FIDELIDADE_ID,
  empresaId: EMPRESA_ID,
  clienteId: CLIENTE_ID,
  saldoPontos: 850,
  createdAt:
    "2026-01-01T10:00:00.000Z",
  updatedAt:
    "2026-08-20T10:00:00.000Z",
} as const;

export const FIDELIDADE_HISTORICO_FIXTURE = [
  {
    id: MOVIMENTACAO_ID,
    empresaId: EMPRESA_ID,
    clienteId: CLIENTE_ID,
    tipo: "ADICAO",
    pontos: 100,
    descricao: "Compra de serviço.",
    createdAt:
      "2026-08-20T10:00:00.000Z",
  },
] as const;

export const FIDELIDADE_BENEFICIO_FIXTURE = {
  clienteId: CLIENTE_ID,
  saldoPontos: 850,
  pontosParaResgate: 100,
  valorPorResgate: 10,
  quantidadeResgates: 8,
  valorDisponivel: 80,
} as const;

export const FIDELIDADE_NIVEL_FIXTURE = {
  clienteId: CLIENTE_ID,
  saldoPontos: 850,
  nivelAtual: {
    id: NIVEL_ID,
    empresaId: EMPRESA_ID,
    nome: "Prata",
    pontosMinimos: 500,
    beneficios:
      "Prioridade no atendimento",
    createdAt:
      "2026-01-01T10:00:00.000Z",
    updatedAt:
      "2026-08-20T10:00:00.000Z",
  },
} as const;

export const CLIENTES_PACOTES_FIXTURE = [
  {
    id: CLIENTE_PACOTE_ID,
    empresaId: EMPRESA_ID,
    clienteId: CLIENTE_ID,
    pacoteId: PACOTE_ID,
    sessoesTotal: 10,
    sessoesUsadas: 2,
    sessoesRestantes: 8,
    dataCompra:
      "2026-08-01T10:00:00.000Z",
    dataValidade:
      "2026-09-01T10:00:00.000Z",
    status: "ATIVO",
    createdAt:
      "2026-08-01T10:00:00.000Z",
    updatedAt:
      "2026-08-20T10:00:00.000Z",
    pacote: {
      id: PACOTE_ID,
      empresaId: EMPRESA_ID,
      nome: "Pacote Facial",
      descricao:
        "Dez sessões de cuidados faciais.",
      valor: 500,
      quantidadeSessoes: 10,
      validadeDias: 30,
      ativo: true,
      createdAt:
        "2026-01-01T10:00:00.000Z",
      updatedAt:
        "2026-08-01T10:00:00.000Z",
    },
  },
] as const;

export const LGPD_EXPORT_FIXTURE = {
  exportadoEm:
    "2026-08-28T12:00:00.000Z",
  clienteId: CLIENTE_ID,
  empresaId: EMPRESA_ID,
  perfil: CLIENTE_FIXTURE,
  agendamentos: [],
  pontos: {},
  pacotes: {},
  notificacoes: [],
  mensagensWhatsApp: [],
} as const;

export const LGPD_ANONIMIZACAO_FIXTURE = {
  success: true,
  clienteId: CLIENTE_ID,
  empresaId: EMPRESA_ID,
  anonimizadoEm:
    "2026-08-28T12:05:00.000Z",
  camposAnonimizados: [
    "nome",
    "telefone",
    "email",
  ],
  observacao:
    "Movimentacoes financeiras e auditoria historica foram preservadas.",
} as const;

export const CLIENTE_PROFILE_ENDPOINTS = [
  `/clientes/${CLIENTE_ID}`,
  `/fidelidade/cliente/${CLIENTE_ID}`,
  `/fidelidade/historico/${CLIENTE_ID}`,
  `/fidelidade/beneficio-disponivel/${CLIENTE_ID}`,
  `/fidelidade/nivel-atual/${CLIENTE_ID}`,
  `/clientes-pacotes/cliente/${CLIENTE_ID}`,
] as const;

function searchParamsToRecord(
  url: URL,
): Record<string, string> {
  return Object.fromEntries(
    url.searchParams.entries(),
  );
}

function isClientesApiRequest(
  path: string,
  method: string,
): boolean {
  if (
    path === "/clientes" &&
    (
      method === "GET" ||
      method === "POST"
    )
  ) {
    return true;
  }

  if (
    path === `/clientes/${CLIENTE_ID}` &&
    (
      method === "GET" ||
      method === "PATCH"
    )
  ) {
    return true;
  }

  if (
    path ===
      `/clientes/${CLIENTE_ID}/inativar` &&
    method === "PATCH"
  ) {
    return true;
  }

  if (
    path ===
      `/arquivos/clientes/${CLIENTE_ID}/foto` &&
    method === "POST"
  ) {
    return true;
  }

  if (
    CLIENTE_PROFILE_ENDPOINTS.includes(
      path as (
        typeof CLIENTE_PROFILE_ENDPOINTS
      )[number],
    ) &&
    method === "GET"
  ) {
    return true;
  }

  if (
    path ===
      `/lgpd/exportar-cliente/${CLIENTE_ID}` &&
    method === "GET"
  ) {
    return true;
  }

  return (
    path ===
      `/lgpd/anonimizar-cliente/${CLIENTE_ID}` &&
    method === "POST"
  );
}

function responseFor(
  path: string,
  method: string,
): unknown {
  if (
    path === "/clientes" &&
    method === "GET"
  ) {
    return CLIENTES_LIST_FIXTURE;
  }

  if (
    path === "/clientes" &&
    method === "POST"
  ) {
    return CLIENTE_FIXTURE;
  }

  if (
    path === `/clientes/${CLIENTE_ID}` &&
    (
      method === "GET" ||
      method === "PATCH"
    )
  ) {
    return CLIENTE_FIXTURE;
  }

  if (
    path ===
      `/clientes/${CLIENTE_ID}/inativar`
  ) {
    return {
      ...CLIENTE_FIXTURE,
      ativo: false,
    };
  }

  if (
    path ===
      `/arquivos/clientes/${CLIENTE_ID}/foto`
  ) {
    return {
      ...CLIENTE_FIXTURE,
      foto:
        "/uploads/clientes/maria-silva.png",
    };
  }

  if (
    path ===
      `/fidelidade/cliente/${CLIENTE_ID}`
  ) {
    return FIDELIDADE_SALDO_FIXTURE;
  }

  if (
    path ===
      `/fidelidade/historico/${CLIENTE_ID}`
  ) {
    return FIDELIDADE_HISTORICO_FIXTURE;
  }

  if (
    path ===
      `/fidelidade/beneficio-disponivel/${CLIENTE_ID}`
  ) {
    return FIDELIDADE_BENEFICIO_FIXTURE;
  }

  if (
    path ===
      `/fidelidade/nivel-atual/${CLIENTE_ID}`
  ) {
    return FIDELIDADE_NIVEL_FIXTURE;
  }

  if (
    path ===
      `/clientes-pacotes/cliente/${CLIENTE_ID}`
  ) {
    return CLIENTES_PACOTES_FIXTURE;
  }

  if (
    path ===
      `/lgpd/exportar-cliente/${CLIENTE_ID}`
  ) {
    return LGPD_EXPORT_FIXTURE;
  }

  if (
    path ===
      `/lgpd/anonimizar-cliente/${CLIENTE_ID}`
  ) {
    return LGPD_ANONIMIZACAO_FIXTURE;
  }

  throw new Error(
    `Resposta E2E não configurada para ${method} ${path}`,
  );
}

export function monitorClientesRuntime(
  page: Page,
): ClientesRuntimeErrors {
  const runtimeErrors: ClientesRuntimeErrors = {
    consoleErrors: [],
    pageErrors: [],
  };

  page.on(
    "console",
    (message) => {
      if (message.type() === "error") {
        runtimeErrors.consoleErrors.push(
          message.text(),
        );
      }
    },
  );

  page.on(
    "pageerror",
    (error) => {
      runtimeErrors.pageErrors.push(
        error.message,
      );
    },
  );

  return runtimeErrors;
}

export async function installAuthenticatedUser(
  page: Page,
  role: ClientesE2eRole = "ADMIN",
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
        body: JSON.stringify({
          id: `user-${role.toLowerCase()}`,
          email:
            `${role.toLowerCase()}@beautycore.test`,
          role,
          empresaId: EMPRESA_ID,
          sessaoId:
            "session-current",
        }),
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
          message: "Sessão encerrada",
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
          totalRevogadas: 1,
        }),
      });
    },
  );
}

export async function mockClientesApi(
  page: Page,
): Promise<ClientesApiController> {
  const requests: ClientesRequestRecord[] = [];
  let pendingFailure: PendingFailure | null =
    null;

  const controller: ClientesApiController = {
    requests,
    callsTo: (
      path,
      method,
    ) =>
      requests.filter(
        (request) =>
          request.path === path &&
          (
            method === undefined ||
            request.method === method
          ),
      ).length,
    failNext: (
      path,
      method = "GET",
      status = 503,
    ) => {
      pendingFailure = {
        path,
        method,
        status,
        remaining: 1,
      };
    },
  };

  await page.route(
    "**/*",
    async (route) => {
      const request = route.request();
      const url = new URL(
        request.url(),
      );
      const path = url.pathname;
      const method = request.method();
      const authorization =
        request.headers().authorization;

      if (
        !authorization?.startsWith(
          "Bearer ",
        ) ||
        !isClientesApiRequest(
          path,
          method,
        )
      ) {
        await route.fallback();
        return;
      }

      requests.push({
        path,
        method,
        searchParams:
          searchParamsToRecord(url),
      });

      if (
        pendingFailure?.path === path &&
        pendingFailure.method === method &&
        pendingFailure.remaining > 0
      ) {
        pendingFailure.remaining -= 1;

        await route.fulfill({
          status:
            pendingFailure.status,
          contentType:
            "application/json",
          headers: {
            "x-correlation-id":
              "chat49-e2e-reference",
          },
          body: JSON.stringify({
            statusCode:
              pendingFailure.status,
            message:
              "Falha controlada do teste E2E",
          }),
        });

        return;
      }

      await route.fulfill({
        status: 200,
        contentType:
          "application/json",
        body: JSON.stringify(
          responseFor(
            path,
            method,
          ),
        ),
      });
    },
  );

  return controller;
}
