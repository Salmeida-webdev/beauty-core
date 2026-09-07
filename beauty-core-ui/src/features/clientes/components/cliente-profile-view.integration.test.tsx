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
  ClienteProfileView,
} from "@/features/clientes/components/cliente-profile-view";

vi.mock(
  "@/features/clientes/components/cliente-profile-extras",
  () => ({
    ClienteProfileExtras: () => (
      <div data-testid="cliente-profile-extras" />
    ),
  }),
);

type ApiResponse = Promise<{
  data: unknown;
}>;

type ApiGet = (
  url: string,
) => ApiResponse;

type ApiMutation = (
  url: string,
  payload?: unknown,
) => ApiResponse;

const apiGet = vi.hoisted(
  () => vi.fn<ApiGet>(),
);

const apiPost = vi.hoisted(
  () => vi.fn<ApiMutation>(),
);

const apiPatch = vi.hoisted(
  () => vi.fn<ApiMutation>(),
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
      post: apiPost,
      patch: apiPatch,
    }),
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
  "sonner",
  () => ({
    toast: toastMock,
  }),
);

vi.mock(
  "next/navigation",
  () => ({
    useSearchParams: () =>
      navigation.params,
    useRouter: () => ({
      replace: navigation.replace,
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

const cliente = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId:
    "550e8400-e29b-41d4-a716-446655440001",
  nome: "Maria Silva",
  telefone:
    "83999999999",
  email:
    "maria@example.com",
  foto: null as string | null,
  dataNascimento:
    "1990-08-20T00:00:00.000Z",
  observacoes:
    "Prefere atendimento à tarde.",
  ativo: true,
  ativoPortal: true,
  aceitouTermos: true,
  dataAceiteTermos:
    "2026-08-01T12:00:00.000Z",
  ultimoAcessoPortal:
    "2026-08-20T15:00:00.000Z",
  createdAt:
    "2026-01-01T10:00:00.000Z",
  updatedAt:
    "2026-08-20T15:00:00.000Z",
};

const activeClients:
  QueryClient[] = [];

function renderProfile() {
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
      <ClienteProfileView
        clienteId={
          cliente.id
        }
      />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  apiGet.mockReset();
  apiPost.mockReset();
  apiPatch.mockReset();
  toastMock.success.mockReset();
  toastMock.error.mockReset();
  navigation.replace.mockReset();

  cliente.foto = null;

  navigation.params =
    new URLSearchParams();

  authState.value.status =
    "authenticated";

  authState.value.user.role =
    "ADMIN";

  normalizeApiErrorMock.mockReset();

  normalizeApiErrorMock.mockReturnValue({
    statusCode: 500,
    message:
      "Falha ao carregar cliente.",
    messages: [
      "Falha ao carregar cliente.",
    ],
    error:
      "Internal Server Error",
    requestId: null,
    correlationId: null,
    isNetworkError: false,
  });

  apiGet.mockResolvedValue({
    data: cliente,
  });

  apiPost.mockResolvedValue({
    data: null,
  });

  apiPatch.mockResolvedValue({
    data: null,
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
  "ClienteProfileView integration",
  () => {
    it(
      "carrega o cliente pelo endpoint real e renderiza dados administrativos",
      async () => {
        renderProfile();

        expect(
          (
            await screen.findAllByText(
              "Maria Silva",
            )
          ).length,
        ).toBeGreaterThan(0);

        expect(
          screen.getByText(
            "83999999999",
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "maria@example.com",
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "20/08/1990",
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Prefere atendimento à tarde.",
          ),
        ).toBeInTheDocument();

        expect(
          apiGet,
        ).toHaveBeenCalledWith(
          `/clientes/${cliente.id}`,
        );
      },
    );

    it(
      "preserva os filtros no retorno para Clientes",
      async () => {
        navigation.params =
          new URLSearchParams(
            "page=3&limit=50&search=Maria&orderBy=nome&orderDirection=asc",
          );

        renderProfile();

        const back =
          await screen.findByRole(
            "link",
            {
              name:
                "Voltar para clientes",
            },
          );

        expect(back).toHaveAttribute(
          "href",
          "/clientes?page=3&limit=50&search=Maria&orderBy=nome&orderDirection=asc",
        );
      },
    );

    it(
      "bloqueia SUPER_ADMIN sem consultar o backend",
      async () => {
        authState.value.user.role =
          "SUPER_ADMIN";

        renderProfile();

        expect(
          screen.getByRole(
            "heading",
            {
              name:
                "Acesso não permitido",
            },
          ),
        ).toBeInTheDocument();

        await vi.waitFor(() => {
          expect(
            apiGet,
          ).not.toHaveBeenCalled();
        });
      },
    );

    it(
      "trata 404 como cliente não encontrado",
      async () => {
        apiGet.mockRejectedValue(
          new Error("404"),
        );

        normalizeApiErrorMock.mockReturnValue({
          statusCode: 404,
          message:
            "Cliente não encontrado.",
          messages: [
            "Cliente não encontrado.",
          ],
          error: "Not Found",
          requestId: null,
          correlationId: null,
          isNetworkError: false,
        });

        renderProfile();

        expect(
          await screen.findByRole(
            "heading",
            {
              name:
                "Cliente não encontrado",
            },
          ),
        ).toBeInTheDocument();
      },
    );

    it(
      "permite retry manual após erro genérico",
      async () => {
        apiGet
          .mockRejectedValueOnce(
            new Error("500"),
          )
          .mockResolvedValueOnce({
            data: cliente,
          });

        renderProfile();

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
      "abre edição com os dados atuais do cliente",
      async () => {
        renderProfile();

        const edit =
          await screen.findByRole(
            "button",
            {
              name:
                "Editar cliente",
            },
          );

        fireEvent.click(
          edit,
        );

        expect(
          screen.getByRole(
            "heading",
            {
              name:
                "Editar cliente",
            },
          ),
        ).toBeInTheDocument();

        expect(
          screen.getByLabelText(
            /Nome/,
          ),
        ).toHaveValue(
          "Maria Silva",
        );
      },
    );

    it(
      "renderiza foto real e permite atualizar a foto",
      async () => {
        cliente.foto =
          "https://cdn.example.com/maria.png";

        renderProfile();

        expect(
          await screen.findByRole(
            "img",
            {
              name:
                "Foto de Maria Silva",
            },
          ),
        ).toBeInTheDocument();

        const fileInput =
          screen.getByLabelText(
            "Selecionar foto do cliente",
          );

        const file = new File(
          ["fake-image"],
          "maria.png",
          {
            type: "image/png",
          },
        );

        fireEvent.change(
          fileInput,
          {
            target: {
              files: [file],
            },
          },
        );

        await waitFor(() => {
          expect(
            apiPost,
          ).toHaveBeenCalledWith(
            `/arquivos/clientes/${cliente.id}/foto`,
            expect.any(FormData),
          );

          expect(
            apiGet.mock.calls.length,
          ).toBe(2);

          expect(
            toastMock.success,
          ).toHaveBeenCalledWith(
            "Foto do cliente atualizada com sucesso.",
          );
        });

        const payload =
          apiPost.mock.calls[0]?.[1];

        expect(payload).toBeInstanceOf(
          FormData,
        );

        expect(
          (payload as FormData).get("file"),
        ).toBe(file);
      },
    );

    it(
      "exibe erro quando o upload da foto falha",
      async () => {
        apiPost.mockRejectedValueOnce(
          new Error("upload"),
        );

        renderProfile();

        const fileInput =
          await screen.findByLabelText(
            "Selecionar foto do cliente",
          );

        const file = new File(
          ["fake-image"],
          "maria.png",
          {
            type: "image/png",
          },
        );

        fireEvent.change(
          fileInput,
          {
            target: {
              files: [file],
            },
          },
        );

        await waitFor(() => {
          expect(
            toastMock.error,
          ).toHaveBeenCalledWith(
            "Falha ao carregar cliente.",
          );
        });
      },
    );

    it(
      "exige confirmação antes de inativar o cliente",
      async () => {
        renderProfile();

        const inactivateButton =
          await screen.findByRole(
            "button",
            {
              name:
                "Inativar cliente",
            },
          );

        fireEvent.click(
          inactivateButton,
        );

        const alertDialog =
          screen.getByRole(
            "alertdialog",
          );

        expect(
          alertDialog,
        ).toHaveTextContent(
          "Maria Silva deixará de aparecer na gestão ativa. Os dados cadastrados não serão apagados.",
        );

        expect(
          apiPatch,
        ).not.toHaveBeenCalled();

        fireEvent.click(
          screen.getByRole(
            "button",
            {
              name:
                "Confirmar inativação",
            },
          ),
        );

        await waitFor(() => {
          expect(
            apiPatch,
          ).toHaveBeenCalledWith(
            `/clientes/${cliente.id}/inativar`,
          );

          expect(
            navigation.replace,
          ).toHaveBeenCalledWith(
            "/clientes",
          );

          expect(
            toastMock.success,
          ).toHaveBeenCalledWith(
            "Cliente inativado com sucesso.",
          );
        });
      },
    );

    it(
      "exibe erro quando a inativação falha",
      async () => {
        apiPatch.mockRejectedValueOnce(
          new Error("inactivate"),
        );

        renderProfile();

        fireEvent.click(
          await screen.findByRole(
            "button",
            {
              name:
                "Inativar cliente",
            },
          ),
        );

        fireEvent.click(
          screen.getByRole(
            "button",
            {
              name:
                "Confirmar inativação",
            },
          ),
        );

        await waitFor(() => {
          expect(
            toastMock.error,
          ).toHaveBeenCalledWith(
            "Falha ao carregar cliente.",
          );
        });

        expect(
          navigation.replace,
        ).not.toHaveBeenCalled();
      },
    );

    it(
      "permite visualizar o perfil sem liberar upload para PROFISSIONAL",
      async () => {
        authState.value.user.role =
          "PROFISSIONAL";

        renderProfile();

        expect(
          (
            await screen.findAllByText(
              "Maria Silva",
            )
          ).length,
        ).toBeGreaterThan(0);

        expect(
          screen.queryByLabelText(
            "Selecionar foto do cliente",
          ),
        ).not.toBeInTheDocument();

        expect(
          screen.getByRole(
            "button",
            {
              name:
                "Inativar cliente",
            },
          ),
        ).toBeInTheDocument();
      },
    );
  },
);
