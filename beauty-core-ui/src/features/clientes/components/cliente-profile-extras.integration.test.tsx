import {
  cleanup,
  fireEvent,
  render,
  screen,
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

import {
  ClienteProfileExtras,
} from "@/features/clientes/components/cliente-profile-extras";

type ApiResponse = Promise<{
  data: unknown;
}>;

type ApiGet = (
  url: string,
) => ApiResponse;

const apiGet = vi.hoisted(
  () => vi.fn<ApiGet>(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      get: apiGet,
    }),
  }),
);

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

const activeClients:
  QueryClient[] = [];

function defaultResponse(
  url: string,
): ApiResponse {
  if (
    url ===
    `/fidelidade/cliente/${clienteId}`
  ) {
    return Promise.resolve({
      data: {
        id:
          "550e8400-e29b-41d4-a716-446655440001",
        empresaId:
          "550e8400-e29b-41d4-a716-446655440002",
        clienteId,
        saldoPontos: 850,
        createdAt:
          "2026-01-01T10:00:00.000Z",
        updatedAt:
          "2026-08-20T10:00:00.000Z",
      },
    });
  }

  if (
    url ===
    `/fidelidade/historico/${clienteId}`
  ) {
    return Promise.resolve({
      data: [
        {
          id:
            "550e8400-e29b-41d4-a716-446655440003",
          empresaId:
            "550e8400-e29b-41d4-a716-446655440002",
          clienteId,
          tipo: "ADICAO",
          pontos: 100,
          descricao:
            "Compra de serviço.",
          createdAt:
            "2026-08-20T10:00:00.000Z",
        },
      ],
    });
  }

  if (
    url ===
    `/fidelidade/beneficio-disponivel/${clienteId}`
  ) {
    return Promise.resolve({
      data: {
        clienteId,
        saldoPontos: 850,
        pontosParaResgate: 100,
        valorPorResgate: 10,
        quantidadeResgates: 8,
        valorDisponivel: 80,
      },
    });
  }

  if (
    url ===
    `/fidelidade/nivel-atual/${clienteId}`
  ) {
    return Promise.resolve({
      data: {
        clienteId,
        saldoPontos: 850,
        nivelAtual: {
          id:
            "550e8400-e29b-41d4-a716-446655440004",
          empresaId:
            "550e8400-e29b-41d4-a716-446655440002",
          nome: "Prata",
          pontosMinimos: 500,
          beneficios:
            "Prioridade no atendimento",
          createdAt:
            "2026-01-01T10:00:00.000Z",
          updatedAt:
            "2026-08-20T10:00:00.000Z",
        },
      },
    });
  }

  if (
    url ===
    `/clientes-pacotes/cliente/${clienteId}`
  ) {
    return Promise.resolve({
      data: [
        {
          id:
            "550e8400-e29b-41d4-a716-446655440005",
          empresaId:
            "550e8400-e29b-41d4-a716-446655440002",
          clienteId,
          pacoteId:
            "550e8400-e29b-41d4-a716-446655440006",
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
          cliente: {
            id: clienteId,
            nome: "Maria Silva",
          },
          pacote: {
            id:
              "550e8400-e29b-41d4-a716-446655440006",
            empresaId:
              "550e8400-e29b-41d4-a716-446655440002",
            nome:
              "Pacote Facial",
            descricao:
              "10 sessões faciais",
            valor: "500",
            quantidadeSessoes: 10,
            validadeDias: 30,
            ativo: true,
            createdAt:
              "2026-01-01T10:00:00.000Z",
            updatedAt:
              "2026-08-01T10:00:00.000Z",
          },
        },
      ],
    });
  }

  return Promise.reject(
    new Error(
      `Endpoint inesperado: ${url}`,
    ),
  );
}

function renderExtras(
  enabled = true,
) {
  const queryClient =
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 60_000,
        },
      },
    });

  activeClients.push(
    queryClient,
  );

  render(
    <QueryClientProvider
      client={queryClient}
    >
      <ClienteProfileExtras
        clienteId={clienteId}
        enabled={enabled}
      />
    </QueryClientProvider>,
  );

  return queryClient;
}

beforeEach(() => {
  apiGet.mockReset();

  apiGet.mockImplementation(
    defaultResponse,
  );
});

afterEach(() => {
  cleanup();

  for (
    const queryClient
    of activeClients.splice(0)
  ) {
    queryClient.clear();
  }
});

describe(
  "ClienteProfileExtras integration",
  () => {
    it(
      "renderiza fidelidade, nivel, beneficio, historico e pacotes reais",
      async () => {
        renderExtras();

        expect(
          await screen.findByText(
            "850 pontos",
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Prata",
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "R$ 80,00",
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Compra de serviço.",
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Pacote Facial",
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "8",
          ),
        ).toBeInTheDocument();

        const urls =
          apiGet.mock.calls.map(
            ([url]) => url,
          );

        expect(urls).toEqual(
          expect.arrayContaining([
            `/fidelidade/cliente/${clienteId}`,
            `/fidelidade/historico/${clienteId}`,
            `/fidelidade/beneficio-disponivel/${clienteId}`,
            `/fidelidade/nivel-atual/${clienteId}`,
            `/clientes-pacotes/cliente/${clienteId}`,
          ]),
        );
      },
    );

    it(
      "mostra empty states independentes para historico e pacotes",
      async () => {
        apiGet.mockImplementation(
          (url) => {
            if (
              url ===
                `/fidelidade/historico/${clienteId}` ||
              url ===
                `/clientes-pacotes/cliente/${clienteId}`
            ) {
              return Promise.resolve({
                data: [],
              });
            }

            return defaultResponse(
              url,
            );
          },
        );

        renderExtras();

        expect(
          await screen.findByText(
            "Nenhuma movimentação de pontos",
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Nenhum pacote vinculado",
          ),
        ).toBeInTheDocument();
      },
    );

    it(
      "permite retry somente da secao de pacotes",
      async () => {
        let pacoteAttempts = 0;

        apiGet.mockImplementation(
          (url) => {
            if (
              url ===
              `/clientes-pacotes/cliente/${clienteId}`
            ) {
              pacoteAttempts += 1;

              if (
                pacoteAttempts === 1
              ) {
                return Promise.reject(
                  new Error(
                    "Falha nos pacotes",
                  ),
                );
              }
            }

            return defaultResponse(
              url,
            );
          },
        );

        renderExtras();

        expect(
          await screen.findByRole(
            "heading",
            {
              name:
                "Não foi possível carregar os pacotes",
            },
          ),
        ).toBeInTheDocument();

        fireEvent.click(
          screen.getByRole(
            "button",
            {
              name:
                "Tentar novamente",
            },
          ),
        );

        expect(
          await screen.findByText(
            "Pacote Facial",
          ),
        ).toBeInTheDocument();

        expect(
          pacoteAttempts,
        ).toBe(2);
      },
    );

    it(
      "nao consulta nenhum extra quando disabled",
      async () => {
        renderExtras(false);

        await vi.waitFor(() => {
          expect(
            apiGet,
          ).not.toHaveBeenCalled();
        });
      },
    );
  },
);
