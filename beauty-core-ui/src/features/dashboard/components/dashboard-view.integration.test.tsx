import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { DashboardView } from "./dashboard-view";
import {
  dashboardApiEmpty,
  dashboardApiSuccess,
} from "../testing/dashboard-api-fixtures";

type ApiConfig = {
  params?: Record<string, string>;
};

type ApiGet = (
  url: string,
  config?: ApiConfig,
) => Promise<{
  data: unknown;
}>;

const apiGet = vi.hoisted(
  () => vi.fn<ApiGet>(),
);

const navigation = vi.hoisted(() => ({
  params: new URLSearchParams(),
  replace: vi.fn(),
}));

const authState = vi.hoisted(() => ({
  value: {
    status: "authenticated",
    user: {
      id: "admin-1",
      nome: "Admin Integração",
      email: "admin@beautycore.test",
      role: "ADMIN",
      empresaId: "empresa-1",
    },
  },
}));

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      get: apiGet,
    }),
  }),
);

vi.mock(
  "@/stores/auth-store",
  () => ({
    useAuthStore: (
      selector: (
        state: typeof authState.value,
      ) => unknown,
    ) => selector(authState.value),
  }),
);

vi.mock(
  "next/navigation",
  () => ({
    usePathname: () => "/dashboard",
    useRouter: () => ({
      replace: navigation.replace,
    }),
    useSearchParams: () =>
      navigation.params,
  }),
);

vi.mock(
  "next/dynamic",
  () => ({
    default: () =>
      function DashboardChartMock() {
        return (
          <div
            data-testid="dashboard-chart"
          />
        );
      },
  }),
);

const activeClients: QueryClient[] = [];

function normalizePath(url: string) {
  const withoutQuery = url.split("?")[0];

  return withoutQuery.startsWith("/")
    ? withoutQuery
    : `/${withoutQuery}`;
}

function fixtureFor(
  url: string,
  fixtures: Readonly<
    Record<string, unknown>
  >,
) {
  const path = normalizePath(url);

  if (
    !Object.prototype.hasOwnProperty.call(
      fixtures,
      path,
    )
  ) {
    throw new Error(
      `Fixture ausente para ${path}`,
    );
  }

  return fixtures[path];
}

function installResponses(
  fixtures: Readonly<
    Record<string, unknown>
  > = dashboardApiSuccess,
) {
  apiGet.mockImplementation(
    async (url) => ({
      data: fixtureFor(url, fixtures),
    }),
  );
}

function createRequestError(
  message: string,
) {
  return Object.assign(
    new Error(message),
    {
      isAxiosError: true,
      response: {
        status: 400,
        headers: {},
      },
    },
  );
}

function renderDashboard() {
  const queryClient =
    new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: 0,
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

  activeClients.push(queryClient);

  return render(
    <QueryClientProvider
      client={queryClient}
    >
      <DashboardView />
    </QueryClientProvider>,
  );
}

function callsFor(path: string) {
  return apiGet.mock.calls.filter(
    ([url]) =>
      normalizePath(url) === path,
  );
}

beforeEach(() => {
  apiGet.mockReset();
  navigation.params =
    new URLSearchParams();
  navigation.replace.mockReset();
  authState.value.status =
    "authenticated";
  authState.value.user.role =
    "ADMIN";

  installResponses();
});

afterEach(() => {
  cleanup();

  for (
    const queryClient
    of activeClients.splice(0)
  ) {
    queryClient.clear();
  }

  vi.useRealTimers();
});

describe(
  "DashboardView integration",
  () => {
    it(
      "preserva a estrutura durante o carregamento das queries",
      async () => {
        apiGet.mockImplementation(
          () =>
            new Promise(() => {
              // Mantém as queries pendentes.
            }),
        );

        renderDashboard();

        expect(
          screen.getByRole(
            "heading",
            {
              name: "Dashboard Executivo",
            },
          ),
        ).toBeInTheDocument();

        await waitFor(() => {
          expect(
            apiGet.mock.calls.length,
          ).toBeGreaterThanOrEqual(12);
        });

        expect(
          screen.queryByText(
            /8\.400,00/,
          ),
        ).not.toBeInTheDocument();
      },
    );

    it(
      "leva respostas validadas da API até os KPIs e seções",
      async () => {
        renderDashboard();

        const summary =
          await screen.findByRole(
            "region",
            {
              name: "Indicadores principais",
            },
          );

        for (
          const label
          of [
            "Receita",
            "Despesas",
            "Saldo",
            "Clientes",
            "Agendamentos",
            "Ticket médio",
          ]
        ) {
          expect(
            within(summary).getByText(
              label,
            ),
          ).toBeInTheDocument();
        }

        expect(
          (
            await screen.findAllByText(
              /8\.400,00/,
            )
          ).length,
        ).toBeGreaterThan(0);

        await waitFor(() => {
          expect(
            screen.getAllByTestId(
              "dashboard-chart",
            ),
          ).toHaveLength(2);
        });

        const requestedPaths =
          new Set(
            apiGet.mock.calls.map(
              ([url]) =>
                normalizePath(url),
            ),
          );

        expect(
          requestedPaths.size,
        ).toBe(12);
      },
    );

    it(
      "exibe o empty state oficial quando o consolidado está zerado",
      async () => {
        installResponses(
          dashboardApiEmpty,
        );

        const { container } =
          renderDashboard();

        await waitFor(() => {
          expect(
            container.querySelector(
              'img[src*="beauty-core-dashboard-empty"]',
            ),
          ).not.toBeNull();
        });

        expect(
          screen.queryByText(
            /8\.400,00/,
          ),
        ).not.toBeInTheDocument();
      },
    );

    it(
      "recupera o resumo após erro e retry manual",
      async () => {
        let allowDashboard = false;

        apiGet.mockImplementation(
          async (url) => {
            const path =
              normalizePath(url);

            if (
              path ===
                "/analytics/dashboard" &&
              !allowDashboard
            ) {
              throw createRequestError(
                "Resumo indisponível",
              );
            }

            return {
              data: fixtureFor(
                url,
                dashboardApiSuccess,
              ),
            };
          },
        );

        renderDashboard();

        const retryButton =
          await screen.findByRole(
            "button",
            {
              name: "Tentar novamente",
            },
          );

        allowDashboard = true;
        fireEvent.click(retryButton);

        const summary =
          await screen.findByRole(
            "region",
            {
              name: "Indicadores principais",
            },
          );

        expect(
          within(summary).getByText(
            "Receita",
          ),
        ).toBeInTheDocument();

        expect(
          callsFor(
            "/analytics/dashboard",
          ).length,
        ).toBeGreaterThanOrEqual(2);
      },
    );

    it(
      "mantém falha financeira isolada e refaz somente a seção",
      async () => {
        let allowFinancial = false;

        apiGet.mockImplementation(
          async (url) => {
            const path =
              normalizePath(url);

            if (
              path ===
                "/analytics/financeiro" &&
              !allowFinancial
            ) {
              throw createRequestError(
                "Financeiro indisponível",
              );
            }

            return {
              data: fixtureFor(
                url,
                dashboardApiSuccess,
              ),
            };
          },
        );

        renderDashboard();

        const retryButton =
          await screen.findByRole(
            "button",
            {
              name: "Tentar novamente",
            },
          );

        const dashboardCallsBefore =
          callsFor(
            "/analytics/dashboard",
          ).length;

        allowFinancial = true;
        fireEvent.click(retryButton);

        await waitFor(() => {
          expect(
            callsFor(
              "/analytics/financeiro",
            ).length,
          ).toBeGreaterThanOrEqual(2);

          expect(
            screen.queryByRole(
              "button",
              {
                name:
                  "Tentar novamente",
              },
            ),
          ).not.toBeInTheDocument();

          expect(
            screen.getAllByTestId(
              "dashboard-chart",
            ),
          ).toHaveLength(2);
        });

        expect(
          callsFor(
            "/analytics/dashboard",
          ).length,
        ).toBe(
          dashboardCallsBefore,
        );
      },
    );

    it(
      "propaga o período da URL para as queries filtráveis",
      async () => {
        navigation.params =
          new URLSearchParams(
            "period=7d",
          );

        renderDashboard();

        const periodSelect =
          await screen.findByRole(
            "combobox",
            {
              name:
                "Selecionar período do dashboard",
            },
          );

        expect(
          periodSelect,
        ).toHaveTextContent(
          "Últimos 7 dias",
        );

        await waitFor(() => {
          expect(
            callsFor(
              "/analytics/dashboard",
            ).length,
          ).toBeGreaterThan(0);
        });

        const dashboardParams =
          callsFor(
            "/analytics/dashboard",
          )[0]?.[1]?.params;

        const financialParams =
          callsFor(
            "/analytics/financeiro",
          )[0]?.[1]?.params;

        expect(
          dashboardParams,
        ).toEqual(
          expect.objectContaining({
            dataInicio:
              expect.any(String),
            dataFim:
              expect.any(String),
          }),
        );

        expect(
          financialParams,
        ).toEqual(dashboardParams);
      },
    );

    it(
      "atualiza todas as queries pela ação manual",
      async () => {
        renderDashboard();

        await screen.findByRole(
          "region",
          {
            name: "Indicadores principais",
          },
        );

        await waitFor(() => {
          expect(
            apiGet.mock.calls.length,
          ).toBeGreaterThanOrEqual(12);
        });

        const callsBefore =
          apiGet.mock.calls.length;

        fireEvent.click(
          screen.getByRole(
            "button",
            {
              name:
                "Atualizar dashboard",
            },
          ),
        );

        await waitFor(() => {
          expect(
            apiGet.mock.calls.length,
          ).toBeGreaterThanOrEqual(
            callsBefore + 12,
          );
        });
      },
    );
  },
);
