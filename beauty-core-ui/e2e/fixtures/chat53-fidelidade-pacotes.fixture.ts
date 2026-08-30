import type {
  Page,
} from "@playwright/test";

export type Chat53Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "GERENTE"
  | "RECEPCAO"
  | "PROFISSIONAL";

export const CHAT53_IDS = {
  empresa:
    "11111111-1111-4111-8111-111111111111",

  admin:
    "22222222-2222-4222-8222-222222222222",

  cliente:
    "33333333-3333-4333-8333-333333333333",

  fidelidade:
    "44444444-4444-4444-8444-444444444444",

  movimentacao:
    "55555555-5555-4555-8555-555555555555",

  pacote:
    "66666666-6666-4666-8666-666666666666",

  clientePacote:
    "77777777-7777-4777-8777-777777777777",
} as const;

const CREATED_AT =
  "2026-08-30T12:00:00.000Z";

const UPDATED_AT =
  "2026-08-30T13:00:00.000Z";

const CLIENTE = {
  id: CHAT53_IDS.cliente,
  empresaId: CHAT53_IDS.empresa,
  nome: "Maria Silva E2E",
  telefone: "83999990001",
  email: "maria.e2e@beautycore.test",
  foto: null,
  dataNascimento: null,
  observacoes: null,
  ativo: true,
  ativoPortal: true,
  aceitouTermos: true,
  dataAceiteTermos:
    "2026-08-01T12:00:00.000Z",
  ultimoAcessoPortal: null,
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
} as const;

const PACOTE = {
  id: CHAT53_IDS.pacote,
  empresaId: CHAT53_IDS.empresa,
  nome: "Pacote Premium E2E",
  descricao:
    "Pacote controlado pelo E2E do Chat53.",
  valor: 500,
  quantidadeSessoes: 5,
  validadeDias: 90,
  ativo: true,
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
} as const;

const PACOTE_RESUMO = {
  id: PACOTE.id,
  nome: PACOTE.nome,
  descricao: PACOTE.descricao,
  quantidadeSessoes:
    PACOTE.quantidadeSessoes,
  validadeDias:
    PACOTE.validadeDias,
  ativo: PACOTE.ativo,
} as const;

const CONFIGURACAO_FIDELIDADE = {
  id:
    "88888888-8888-4888-8888-888888888888",
  empresaId: CHAT53_IDS.empresa,
  fidelidadeAtiva: true,
  pontuacaoAutomatica: true,
  pontosPorReal: 1,
  reaisPorPonto: 0.1,
  pontosParaResgate: 100,
  valorResgate: 10,
  niveisAtivos: true,
  beneficiosAutomaticos: true,
  cupomAniversarioAtivo: false,
  cupomAniversarioCodigo: null,
  cupomAniversarioValor: null,
  bonusAniversarioAtivo: false,
  bonusAniversarioPontos: 50,
  automacoesAtivas: false,
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT,
} as const;

export type Chat53ApiCall = {
  method: string;
  pathname: string;
  body: string | null;
};

type ClientePacoteState = {
  id: string;
  empresaId: string;
  clienteId: string;
  pacoteId: string;
  sessoesTotal: number;
  sessoesUsadas: number;
  sessoesRestantes: number;
  dataCompra: string;
  dataValidade: string | null;
  status:
    | "ATIVO"
    | "VENCIDO"
    | "FINALIZADO"
    | "CANCELADO";
  createdAt: string;
  updatedAt: string;
  pacote: typeof PACOTE_RESUMO;
};

function createClientePacoteState():
  ClientePacoteState {
  return {
    id:
      CHAT53_IDS.clientePacote,

    empresaId:
      CHAT53_IDS.empresa,

    clienteId:
      CHAT53_IDS.cliente,

    pacoteId:
      CHAT53_IDS.pacote,

    sessoesTotal: 5,
    sessoesUsadas: 1,
    sessoesRestantes: 4,

    dataCompra:
      "2026-08-20T12:00:00.000Z",

    dataValidade:
      "2026-11-18T12:00:00.000Z",

    status: "ATIVO",

    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT,

    pacote:
      PACOTE_RESUMO,
  };
}

function authProfile(
  role: Chat53Role,
) {
  return {
    id: CHAT53_IDS.admin,

    email:
      `${role.toLowerCase()}@beautycore.test`,

    role,

    empresaId:
      role === "SUPER_ADMIN"
        ? null
        : CHAT53_IDS.empresa,

    sessaoId:
      "session-chat53-e2e",
  };
}

function isChat53ApiPath(
  pathname: string,
): boolean {
  return (
    pathname ===
      "/configuracao-fidelidade" ||
    pathname.startsWith(
      "/niveis-fidelidade",
    ) ||
    pathname.startsWith(
      "/beneficios",
    ) ||
    pathname.startsWith(
      "/cupons",
    ) ||
    pathname.startsWith(
      "/fidelidade",
    ) ||
    pathname ===
      "/clientes" ||
    pathname.startsWith(
      "/clientes/",
    ) ||
    pathname ===
      "/pacotes" ||
    pathname.startsWith(
      "/pacotes/",
    ) ||
    pathname ===
      "/clientes-pacotes" ||
    pathname.startsWith(
      "/clientes-pacotes/",
    )
  );
}

export async function installChat53Fixture(
  page: Page,
  role: Chat53Role = "ADMIN",
) {
  const calls:
    Chat53ApiCall[] = [];

  const unhandled:
    string[] = [];

  let clientePacoteState =
    createClientePacoteState();

  await page.addInitScript(() => {
    window.sessionStorage.setItem(
      "beauty-core:admin:refresh-token",
      "refresh-token-chat53-e2e",
    );
  });

  await page.route(
    "**/*",
    async (route) => {
      const request =
        route.request();

      const url =
        new URL(
          request.url(),
        );

      const pathname =
        url.pathname;

      const method =
        request.method();

      if (
        pathname ===
        "/auth/refresh"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body: JSON.stringify({
            access_token:
              "access-token-chat53-e2e",

            refresh_token:
              "refresh-token-chat53-e2e-rotated",

            expires_in: 3600,
          }),
        });

        return;
      }

      if (
        pathname ===
        "/auth/me"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify(
              authProfile(
                role,
              ),
            ),
        });

        return;
      }

      if (
        pathname ===
          "/auth/logout" ||
        pathname ===
          "/auth/logout-all"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify({
              message:
                "Sessão encerrada",
            }),
        });

        return;
      }

      const authorization =
        request.headers()
          .authorization;

      if (
        !authorization ||
        !isChat53ApiPath(
          pathname,
        )
      ) {
        await route.continue();
        return;
      }

      const body =
        request.postData();

      calls.push({
        method,
        pathname,
        body,
      });

      if (
        method === "GET" &&
        pathname ===
          "/configuracao-fidelidade"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify(
              CONFIGURACAO_FIDELIDADE,
            ),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          "/niveis-fidelidade"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body:
            JSON.stringify([]),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          "/beneficios"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body:
            JSON.stringify([]),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          "/cupons"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",
          body:
            JSON.stringify([]),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          "/clientes"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify({
              data: [
                CLIENTE,
              ],

              meta: {
                total: 1,
                page: 1,
                limit: 20,
                totalPages: 1,
              },
            }),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          `/clientes/${CHAT53_IDS.cliente}`
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify(
              CLIENTE,
            ),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          "/pacotes"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify([
              PACOTE,
            ]),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          `/clientes-pacotes/cliente/${CHAT53_IDS.cliente}`
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify([
              clientePacoteState,
            ]),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          "/clientes-pacotes"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify([
              clientePacoteState,
            ]),
        });

        return;
      }

      if (
        method === "PATCH" &&
        pathname ===
          `/clientes-pacotes/${CHAT53_IDS.clientePacote}/usar-sessao`
      ) {
        const nextRemaining =
          clientePacoteState
            .sessoesRestantes -
          1;

        clientePacoteState = {
          ...clientePacoteState,

          sessoesUsadas:
            clientePacoteState
              .sessoesUsadas +
            1,

          sessoesRestantes:
            nextRemaining,

          status:
            nextRemaining === 0
              ? "FINALIZADO"
              : "ATIVO",

          updatedAt:
            "2026-08-30T14:00:00.000Z",
        };

        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify(
              clientePacoteState,
            ),
        });

        return;
      }

      if (
        method === "PATCH" &&
        pathname ===
          `/clientes-pacotes/${CHAT53_IDS.clientePacote}/cancelar`
      ) {
        clientePacoteState = {
          ...clientePacoteState,

          status:
            "CANCELADO",

          updatedAt:
            "2026-08-30T14:30:00.000Z",
        };

        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify(
              clientePacoteState,
            ),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          `/fidelidade/cliente/${CHAT53_IDS.cliente}`
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify({
              id:
                CHAT53_IDS.fidelidade,

              empresaId:
                CHAT53_IDS.empresa,

              clienteId:
                CHAT53_IDS.cliente,

              saldoPontos: 120,

              pontos: 120,
              pontosTotais: 120,

              createdAt:
                CREATED_AT,

              updatedAt:
                UPDATED_AT,
            }),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          `/fidelidade/historico/${CHAT53_IDS.cliente}`
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify([
              {
                id:
                  CHAT53_IDS
                    .movimentacao,

                clienteId:
                  CHAT53_IDS
                    .cliente,

                tipo:
                  "GANHO",

                pontos: 20,

                descricao:
                  "Bônus de fidelidade E2E",

                createdAt:
                  "2026-08-30T10:00:00.000Z",
              },
            ]),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          `/fidelidade/beneficio-disponivel/${CHAT53_IDS.cliente}`
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify({
              clienteId:
                CHAT53_IDS.cliente,

              saldoPontos: 120,

              pontosParaResgate:
                100,

              valorPorResgate:
                10,

              quantidadeResgates:
                1,

              valorDisponivel:
                10,
            }),
        });

        return;
      }

      if (
        method === "GET" &&
        pathname ===
          `/fidelidade/nivel-atual/${CHAT53_IDS.cliente}`
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify({
              clienteId:
                CHAT53_IDS.cliente,

              saldoPontos: 120,

              nivelAtual:
                null,
            }),
        });

        return;
      }

      if (
        method === "POST" &&
        pathname ===
          "/fidelidade/adicionar-pontos"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify({
              id:
                CHAT53_IDS.fidelidade,

              empresaId:
                CHAT53_IDS.empresa,

              clienteId:
                CHAT53_IDS.cliente,

              saldoPontos: 130,

              createdAt:
                CREATED_AT,

              updatedAt:
                UPDATED_AT,
            }),
        });

        return;
      }

      if (
        method === "POST" &&
        pathname ===
          "/fidelidade/resgatar-pontos"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify({
              id:
                CHAT53_IDS.fidelidade,

              empresaId:
                CHAT53_IDS.empresa,

              clienteId:
                CHAT53_IDS.cliente,

              saldoPontos: 110,

              createdAt:
                CREATED_AT,

              updatedAt:
                UPDATED_AT,
            }),
        });

        return;
      }

      if (
        method === "POST" &&
        pathname ===
          "/fidelidade/pontuar-por-valor"
      ) {
        await route.fulfill({
          status: 200,
          contentType:
            "application/json",

          body:
            JSON.stringify({
              pontosGerados: 10,
              saldoAtual: 130,
              pontosPorReal: 1,
            }),
        });

        return;
      }

      unhandled.push(
        `${method} ${pathname}`,
      );

      await route.fulfill({
        status: 404,
        contentType:
          "application/json",

        body:
          JSON.stringify({
            message:
              `E2E Chat53 sem fixture para ${method} ${pathname}`,
          }),
      });
    },
  );

  return {
    calls,

    unhandled,

    callsTo(
      pathname: string,
      method?: string,
    ): number {
      return calls.filter(
        (call) =>
          call.pathname ===
            pathname &&
          (
            !method ||
            call.method ===
              method
          ),
      ).length;
    },

    lastCallTo(
      pathname: string,
      method?: string,
    ):
      | Chat53ApiCall
      | undefined {
      const matching =
        calls.filter(
          (call) =>
            call.pathname ===
              pathname &&
            (
              !method ||
              call.method ===
                method
            ),
        );

      return matching.at(-1);
    },

    getClientePacote():
      ClientePacoteState {
      return {
        ...clientePacoteState,
      };
    },
  };
}
