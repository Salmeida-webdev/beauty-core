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
  ClienteLgpdActions,
} from "@/features/clientes/components/cliente-lgpd-actions";

const apiGet = vi.hoisted(
  () => vi.fn(),
);

const apiPost = vi.hoisted(
  () => vi.fn(),
);

const downloadMock = vi.hoisted(
  () => vi.fn(),
);

const normalizeApiErrorMock =
  vi.hoisted(
    () => vi.fn(),
  );

const toastMock = vi.hoisted(
  () => ({
    success: vi.fn(),
    error: vi.fn(),
  }),
);

const navigation = vi.hoisted(
  () => ({
    replace: vi.fn(),
  }),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      get: apiGet,
      post: apiPost,
    }),
  }),
);

vi.mock(
  "@/features/clientes/utils/clientes-lgpd-download",
  () => ({
    downloadClienteLgpdJson:
      downloadMock,
  }),
);

vi.mock(
  "@/services/api/normalize-api-error",
  () => ({
    normalizeApiError:
      normalizeApiErrorMock,
  }),
);

vi.mock(
  "next/navigation",
  () => ({
    useRouter: () => ({
      replace:
        navigation.replace,
    }),
  }),
);

vi.mock(
  "sonner",
  () => ({
    toast: toastMock,
  }),
);

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

const exportPayload = {
  exportadoEm:
    "2026-08-28T12:00:00.000Z",
  clienteId,
  empresaId:
    "550e8400-e29b-41d4-a716-446655440001",
  perfil: {
    nome: "Maria Silva",
  },
  agendamentos: [],
  pontos: {},
  pacotes: {},
  notificacoes: [],
  mensagensWhatsApp: [],
};

const anonymizationPayload = {
  success: true,
  clienteId,
  empresaId:
    "550e8400-e29b-41d4-a716-446655440001",
  anonimizadoEm:
    "2026-08-28T12:05:00.000Z",
  camposAnonimizados: [
    "nome",
    "telefone",
    "email",
  ],
  observacao:
    "Movimentacoes financeiras e auditoria historica foram preservadas.",
};

const activeClients: QueryClient[] = [];

function renderActions(
  enabled = true,
) {
  const queryClient =
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 60_000,
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
      <ClienteLgpdActions
        clienteId={clienteId}
        clienteNome="Maria Silva"
        returnHref="/clientes"
        enabled={enabled}
      />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  apiGet.mockReset();
  apiPost.mockReset();
  downloadMock.mockReset();
  toastMock.success.mockReset();
  toastMock.error.mockReset();
  navigation.replace.mockReset();

  normalizeApiErrorMock.mockReturnValue({
    statusCode: 500,
    message: "Falha controlada.",
    messages: [
      "Falha controlada.",
    ],
    error: "Internal Server Error",
    requestId: null,
    correlationId: null,
    isNetworkError: false,
  });

  apiGet.mockResolvedValue({
    data: exportPayload,
  });

  apiPost.mockResolvedValue({
    data: anonymizationPayload,
  });
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
  "ClienteLgpdActions integration",
  () => {
    it(
      "exporta dados e disponibiliza o JSON",
      async () => {
        renderActions();

        fireEvent.click(
          await screen.findByRole(
            "button",
            {
              name: "Exportar dados",
            },
          ),
        );

        await waitFor(() => {
          expect(
            apiGet,
          ).toHaveBeenCalledWith(
            `/lgpd/exportar-cliente/${clienteId}`,
          );

          expect(
            downloadMock,
          ).toHaveBeenCalledWith(
            exportPayload,
            clienteId,
          );

          expect(
            toastMock.success,
          ).toHaveBeenCalledWith(
            "Exportação LGPD concluída.",
          );
        });
      },
    );

    it(
      "exige confirmação antes da anonimização",
      async () => {
        renderActions();

        fireEvent.click(
          await screen.findByRole(
            "button",
            {
              name: "Anonimizar cliente",
            },
          ),
        );

        const alertDialog =
          screen.getByRole(
            "alertdialog",
          );

        expect(
          alertDialog,
        ).toHaveTextContent(
          "não poderá ser desfeita",
        );

        expect(
          apiPost,
        ).not.toHaveBeenCalled();

        fireEvent.click(
          screen.getByRole(
            "button",
            {
              name:
                "Confirmar anonimização",
            },
          ),
        );

        await waitFor(() => {
          expect(
            apiPost,
          ).toHaveBeenCalledWith(
            `/lgpd/anonimizar-cliente/${clienteId}`,
          );

          expect(
            navigation.replace,
          ).toHaveBeenCalledWith(
            "/clientes",
          );

          expect(
            toastMock.success,
          ).toHaveBeenCalledWith(
            "Cliente anonimizado com sucesso.",
          );
        });
      },
    );

    it(
      "não renderiza ações quando LGPD está desabilitado",
      () => {
        renderActions(false);

        expect(
          screen.queryByRole(
            "button",
            {
              name: "Exportar dados",
            },
          ),
        ).not.toBeInTheDocument();

        expect(
          screen.queryByRole(
            "button",
            {
              name: "Anonimizar cliente",
            },
          ),
        ).not.toBeInTheDocument();
      },
    );

    it(
      "trata erro na exportação sem persistir dados",
      async () => {
        apiGet.mockRejectedValueOnce(
          new Error("export"),
        );

        renderActions();

        fireEvent.click(
          await screen.findByRole(
            "button",
            {
              name: "Exportar dados",
            },
          ),
        );

        await waitFor(() => {
          expect(
            toastMock.error,
          ).toHaveBeenCalledWith(
            "Falha controlada.",
          );
        });

        expect(
          downloadMock,
        ).not.toHaveBeenCalled();
      },
    );

    it(
      "trata erro na anonimização",
      async () => {
        apiPost.mockRejectedValueOnce(
          new Error("anonymize"),
        );

        renderActions();

        fireEvent.click(
          await screen.findByRole(
            "button",
            {
              name: "Anonimizar cliente",
            },
          ),
        );

        fireEvent.click(
          screen.getByRole(
            "button",
            {
              name:
                "Confirmar anonimização",
            },
          ),
        );

        await waitFor(() => {
          expect(
            toastMock.error,
          ).toHaveBeenCalledWith(
            "Falha controlada.",
          );
        });

        expect(
          navigation.replace,
        ).not.toHaveBeenCalled();
      },
    );
  },
);
