import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
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
  ClientesView,
} from "@/features/clientes/components/clientes-view";

type ApiConfig = {
  params?: Record<
    string,
    string | number
  >;
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

const navigation = vi.hoisted(
  () => ({
    params:
      new URLSearchParams(),
    replace: vi.fn(),
  }),
);

const authState = vi.hoisted(
  () => ({
    value: {
      status:
        "authenticated",
      user: {
        id: "admin-1",
        nome: "Admin",
        email:
          "admin@beautycore.test",
        role: "ADMIN",
        empresaId:
          "550e8400-e29b-41d4-a716-446655440001",
      },
    },
  }),
);

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
        state:
          typeof authState.value,
      ) => unknown,
    ) =>
      selector(
        authState.value,
      ),
  }),
);

vi.mock(
  "next/navigation",
  () => ({
    useRouter: () => ({
      replace:
        navigation.replace,
    }),
    useSearchParams: () =>
      navigation.params,
  }),
);

const cliente = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId:
    "550e8400-e29b-41d4-a716-446655440001",
  nome: "Maria Silva",
  telefone: "83999999999",
  email: "maria@example.com",
  foto: null,
  dataNascimento: null,
  observacoes: null,
  ativo: true,
  ativoPortal: false,
  aceitouTermos: false,
  dataAceiteTermos: null,
  ultimoAcessoPortal: null,
  createdAt:
    "2026-01-01T10:00:00.000Z",
  updatedAt:
    "2026-08-20T15:00:00.000Z",
};

const activeClients:
  QueryClient[] = [];

function renderClientes() {
  const queryClient =
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
        mutations: {
          retry: false,
        },
      },
    });

  activeClients.push(
    queryClient,
  );

  return render(
    <QueryClientProvider
      client={queryClient}
    >
      <ClientesView />
    </QueryClientProvider>,
  );
}

function installList(
  data = [cliente],
) {
  apiGet.mockResolvedValue({
    data: {
      data,
      meta: {
        total: data.length,
        page: 1,
        limit: 20,
        totalPages:
          data.length > 0
            ? 1
            : 0,
      },
    },
  });
}

beforeEach(() => {
  apiGet.mockReset();
  navigation.replace.mockReset();
  navigation.params =
    new URLSearchParams();

  authState.value.status =
    "authenticated";

  authState.value.user.role =
    "ADMIN";

  installList();
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
  "ClientesView integration",
  () => {
    it(
      "carrega a listagem real permitida",
      async () => {
        renderClientes();

        expect(
          screen.getByRole(
            "heading",
            {
              name: "Clientes",
            },
          ),
        ).toBeInTheDocument();

        expect(
          (
            await screen.findAllByText(
              "Maria Silva",
            )
          ).length,
        ).toBeGreaterThan(0);

        expect(
          apiGet,
        ).toHaveBeenCalledWith(
          "/clientes",
          {
            params: {
              page: 1,
              limit: 20,
              orderBy:
                "createdAt",
              orderDirection:
                "desc",
            },
          },
        );
      },
    );

    it(
      "não consulta backend para SUPER_ADMIN",
      async () => {
        authState.value.user.role =
          "SUPER_ADMIN";

        renderClientes();

        expect(
          screen.getByRole(
            "heading",
            {
              name:
                "Acesso não permitido",
            },
          ),
        ).toBeInTheDocument();

        await waitFor(() => {
          expect(
            apiGet,
          ).not.toHaveBeenCalled();
        });
      },
    );

    it(
      "diferencia listagem vazia sem pesquisa",
      async () => {
        installList([]);

        renderClientes();

        expect(
          await screen.findByRole(
            "heading",
            {
              name:
                "Nenhum cliente cadastrado",
            },
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByAltText(
            "Ilustração da gestão de clientes",
          ),
        ).toBeInTheDocument();
      },
    );

    it(
      "diferencia pesquisa sem resultados",
      async () => {
        navigation.params =
          new URLSearchParams(
            "search=Inexistente",
          );

        installList([]);

        renderClientes();

        expect(
          await screen.findByRole(
            "heading",
            {
              name:
                "Nenhum cliente encontrado",
            },
          ),
        ).toBeInTheDocument();
      },
    );

    it(
      "preserva filtros no link do perfil",
      async () => {
        navigation.params =
          new URLSearchParams(
            "page=2&search=Maria&orderBy=nome&orderDirection=asc",
          );

        apiGet.mockResolvedValue({
          data: {
            data: [cliente],
            meta: {
              total: 40,
              page: 2,
              limit: 20,
              totalPages: 2,
            },
          },
        });

        renderClientes();

        const links =
          await screen.findAllByRole(
            "link",
            {
              name:
                "Abrir perfil de Maria Silva",
            },
          );

        for (const link of links) {
          expect(link).toHaveAttribute(
            "href",
            `/clientes/${cliente.id}?page=2&search=Maria&orderBy=nome&orderDirection=asc`,
          );
        }
      },
    );

    it(
      "executa retry manual após erro",
      async () => {
        apiGet
          .mockRejectedValueOnce(
            new Error(
              "API indisponível",
            ),
          )
          .mockResolvedValueOnce({
            data: {
              data: [cliente],
              meta: {
                total: 1,
                page: 1,
                limit: 20,
                totalPages: 1,
              },
            },
          });

        renderClientes();

        const retry =
          await screen.findByRole(
            "button",
            {
              name:
                "Tentar novamente",
            },
          );

        fireEvent.click(
          retry,
        );

        expect(
          (
            await screen.findAllByText(
              "Maria Silva",
            )
          ).length,
        ).toBeGreaterThan(0);

        expect(
          apiGet.mock.calls.length,
        ).toBe(2);
      },
    );

    it(
      "mantém a busca inicial sincronizada com a URL",
      () => {
        navigation.params =
          new URLSearchParams(
            "search=Maria",
          );

        renderClientes();

        expect(
          screen.getByRole(
            "searchbox",
            {
              name:
                "Buscar clientes",
            },
          ),
        ).toHaveValue(
          "Maria",
        );
      },
    );
  },
);
