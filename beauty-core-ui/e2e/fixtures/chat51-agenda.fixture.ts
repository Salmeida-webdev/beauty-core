import type {
  Page,
} from "@playwright/test";

export type AgendaE2ERole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "GERENTE"
  | "RECEPCAO"
  | "PROFISSIONAL";

export type AgendaE2EStatus =
  | "PENDENTE"
  | "CONFIRMADO"
  | "EM_ANDAMENTO"
  | "CONCLUIDO"
  | "CANCELADO"
  | "FALTOU";

export type AgendaRequestRecord = {
  method: string;
  pathname: string;
  searchParams: Record<
    string,
    string
  >;
  body: unknown;
};

export type AgendaRuntimeErrors = {
  consoleErrors: string[];
  pageErrors: string[];
};

export const AGENDA_E2E_DATE =
  "2026-08-29";

export const AGENDA_E2E_IDS = {
  agendamento:
    "550e8400-e29b-41d4-a716-446655440000",

  cliente:
    "550e8400-e29b-41d4-a716-446655440001",

  profissional:
    "550e8400-e29b-41d4-a716-446655440002",

  servico:
    "550e8400-e29b-41d4-a716-446655440003",

  unidade:
    "550e8400-e29b-41d4-a716-446655440004",
} as const;

function authProfile(
  role: AgendaE2ERole,
) {
  return {
    id: `user-${role.toLowerCase()}`,
    email:
      `${role.toLowerCase()}@beautycore.test`,
    role,
    empresaId:
      role === "SUPER_ADMIN"
        ? null
        : "empresa-e2e",
    sessaoId:
      `session-${role.toLowerCase()}`,
  };
}

export async function installAgendaAuthenticatedRole(
  page: Page,
  role: AgendaE2ERole,
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
          authProfile(role),
        ),
      });
    },
  );
}

function buildListItem(
  status: AgendaE2EStatus,
) {
  return {
    id:
      AGENDA_E2E_IDS.agendamento,

    clienteId:
      AGENDA_E2E_IDS.cliente,

    profissionalId:
      AGENDA_E2E_IDS.profissional,

    servicoId:
      AGENDA_E2E_IDS.servico,

    unidadeId:
      AGENDA_E2E_IDS.unidade,

    dataHoraInicio:
      "2026-08-29T15:00:00.000Z",

    dataHoraFim:
      "2026-08-29T15:45:00.000Z",

    observacoes:
      "Cliente prefere atendimento no horario agendado.",

    status,

    createdAt:
      "2026-08-20T12:00:00.000Z",

    updatedAt:
      "2026-08-29T14:00:00.000Z",

    cliente: {
      id:
        AGENDA_E2E_IDS.cliente,
      nome:
        "Maria Agenda E2E",
      telefone:
        "83999999999",
    },

    profissional: {
      id:
        AGENDA_E2E_IDS.profissional,
      nome:
        "Ana Profissional",
    },

    servico: {
      id:
        AGENDA_E2E_IDS.servico,
      nome:
        "Corte Premium",
      preco:
        "80.00",
      duracaoMinutos: 45,
    },

    unidade: {
      id:
        AGENDA_E2E_IDS.unidade,
      nome:
        "Unidade Centro",
    },
  };
}

function buildDetail(
  status: AgendaE2EStatus,
) {
  const item =
    buildListItem(status);

  return {
    ...item,

    empresaId:
      "empresa-e2e",

    cliente: {
      ...item.cliente,
      email:
        "maria@beautycore.test",
    },

    profissional: {
      ...item.profissional,
      email:
        "ana@beautycore.test",
    },
  };
}

export async function mockAgendaApi(
  page: Page,
  options?: {
    initialStatus?: AgendaE2EStatus;
  },
) {
  const calls:
    AgendaRequestRecord[] = [];

  let currentStatus:
    AgendaE2EStatus =
      options?.initialStatus ??
      "PENDENTE";

  /*
   * AgendaRelatedSelectors reutiliza os contratos reais
   * de Clientes e Servicos. O servidor Playwright roda
   * apenas o frontend; portanto essas APIs tambem precisam
   * ser simuladas explicitamente no fixture.
   */
  await page.route(
    "**/clientes**",
    async (route) => {
      const request =
        route.request();

      const url =
        new URL(
          request.url(),
        );

      if (
        request.method() === "GET" &&
        url.pathname === "/clientes"
      ) {
        const pageValue =
          Number(
            url.searchParams.get(
              "page",
            ) ?? "1",
          );

        const limit =
          Number(
            url.searchParams.get(
              "limit",
            ) ?? "20",
          );

        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body: JSON.stringify({
            data: [],
            meta: {
              total: 0,
              page: pageValue,
              limit,
              totalPages: 0,
            },
          }),
        });

        return;
      }

      await route.fallback();
    },
  );

  await page.route(
    "**/servicos**",
    async (route) => {
      const request =
        route.request();

      const url =
        new URL(
          request.url(),
        );

      if (
        request.method() === "GET" &&
        url.pathname === "/servicos"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body: JSON.stringify(
            [],
          ),
        });

        return;
      }

      await route.fallback();
    },
  );

  await page.route(
    "**/agendamentos**",
    async (route) => {
      const request =
        route.request();

      const url =
        new URL(
          request.url(),
        );

      if (
        !url.pathname.startsWith(
          "/agendamentos",
        )
      ) {
        await route.fallback();
        return;
      }

      const method =
        request.method();

      let body:
        unknown = null;

      if (
        request.postData()
      ) {
        try {
          body =
            request.postDataJSON();
        }
        catch {
          body =
            request.postData();
        }
      }

      calls.push({
        method,
        pathname:
          url.pathname,
        searchParams:
          Object.fromEntries(
            url.searchParams.entries(),
          ),
        body,
      });

      if (
        url.pathname ===
          "/agendamentos/opcoes/profissionais" &&
        method === "GET"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body: JSON.stringify(
            [],
          ),
        });

        return;
      }

      if (
        url.pathname ===
          "/agendamentos/opcoes/unidades" &&
        method === "GET"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body: JSON.stringify(
            [],
          ),
        });

        return;
      }

      if (
        url.pathname ===
          "/agendamentos" &&
        method === "GET"
      ) {
        const pageValue =
          Number(
            url.searchParams.get(
              "page",
            ) ?? "1",
          );

        const limit =
          Number(
            url.searchParams.get(
              "limit",
            ) ?? "20",
          );

        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body: JSON.stringify({
            data: [
              buildListItem(
                currentStatus,
              ),
            ],

            meta: {
              page:
                pageValue,
              limit,
              total: 1,
              totalPages: 1,
            },
          }),
        });

        return;
      }

      if (
        url.pathname ===
          `/agendamentos/${AGENDA_E2E_IDS.agendamento}` &&
        method === "GET"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body: JSON.stringify(
            buildDetail(
              currentStatus,
            ),
          ),
        });

        return;
      }

      if (
        url.pathname ===
          `/agendamentos/${AGENDA_E2E_IDS.agendamento}` &&
        method === "PATCH"
      ) {
        const payload =
          body as
            | {
                status?: AgendaE2EStatus;
              }
            | null;

        if (
          payload?.status
        ) {
          currentStatus =
            payload.status;
        }

        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body: JSON.stringify(
            buildDetail(
              currentStatus,
            ),
          ),
        });

        return;
      }

      if (
        url.pathname ===
          `/agendamentos/${AGENDA_E2E_IDS.agendamento}/cancelar` &&
        method === "PATCH"
      ) {
        currentStatus =
          "CANCELADO";

        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body: JSON.stringify(
            buildDetail(
              currentStatus,
            ),
          ),
        });

        return;
      }

      await route.fulfill({
        status: 404,
        contentType:
          "application/json",
        body: JSON.stringify({
          message:
            "Rota E2E nao mapeada.",
        }),
      });
    },
  );

  return {
    calls,

    currentStatus: () =>
      currentStatus,
  };
}

export function monitorAgendaRuntime(
  page: Page,
): AgendaRuntimeErrors {
  const runtime:
    AgendaRuntimeErrors = {
      consoleErrors: [],
      pageErrors: [],
    };

  page.on(
    "console",
    (message) => {
      if (
        message.type() ===
        "error"
      ) {
        runtime.consoleErrors.push(
          message.text(),
        );
      }
    },
  );

  page.on(
    "pageerror",
    (error) => {
      runtime.pageErrors.push(
        error.message,
      );
    },
  );

  return runtime;
}

export async function hasHorizontalOverflow(
  page: Page,
): Promise<boolean> {
  return page.evaluate(() => {
    const root =
      document.documentElement;

    return (
      root.scrollWidth >
      root.clientWidth
    );
  });
}