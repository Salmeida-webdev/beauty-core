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
  ClienteFormDialog,
} from "@/features/clientes/components/cliente-form-dialog";

type ApiResponse = Promise<{
  data: unknown;
}>;

type ApiPost = (
  url: string,
  payload?: unknown,
) => ApiResponse;

type ApiPatch = (
  url: string,
  payload?: unknown,
) => ApiResponse;

const apiPost = vi.hoisted(
  () => vi.fn<ApiPost>(),
);

const apiPatch = vi.hoisted(
  () => vi.fn<ApiPatch>(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      post: apiPost,
      patch: apiPatch,
    }),
  }),
);

const cliente = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId:
    "550e8400-e29b-41d4-a716-446655440001",
  nome: "Maria Silva",
  telefone:
    "83999999999",
  email: null,
  foto: null,
  dataNascimento: null,
  observacoes: null,
  ativo: true,
  ativoPortal: true,
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

function renderDialog(
  mode: "create" | "edit",
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

  const invalidateSpy =
    vi.spyOn(
      queryClient,
      "invalidateQueries",
    );

  activeClients.push(
    queryClient,
  );

  const onOpenChange =
    vi.fn();

  render(
    <QueryClientProvider
      client={queryClient}
    >
      <ClienteFormDialog
        mode={mode}
        cliente={
          mode === "edit"
            ? cliente
            : undefined
        }
        open
        onOpenChange={
          onOpenChange
        }
      />
    </QueryClientProvider>,
  );

  return {
    queryClient,
    invalidateSpy,
    onOpenChange,
  };
}

beforeEach(() => {
  apiPost.mockReset();
  apiPatch.mockReset();
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
  "ClienteFormDialog mutations",
  () => {
    it(
      "cria cliente e invalida listagens",
      async () => {
        apiPost.mockResolvedValue({
          data: cliente,
        });

        const {
          invalidateSpy,
          onOpenChange,
        } = renderDialog(
          "create",
        );

        fireEvent.change(
          screen.getByLabelText(
            /Nome/,
          ),
          {
            target: {
              value:
                "Maria Silva",
            },
          },
        );

        fireEvent.change(
          screen.getByLabelText(
            /Telefone/,
          ),
          {
            target: {
              value:
                "(83) 99999-9999",
            },
          },
        );

        fireEvent.click(
          screen.getByRole(
            "button",
            {
              name:
                "Cadastrar cliente",
            },
          ),
        );

        await vi.waitFor(() => {
          expect(
            apiPost,
          ).toHaveBeenCalledWith(
            "/clientes",
            {
              nome:
                "Maria Silva",
              telefone:
                "83999999999",
            },
          );
        });

        expect(
          invalidateSpy,
        ).toHaveBeenCalledWith({
          queryKey: [
            "clientes",
            "list",
          ],
        });

        expect(
          onOpenChange,
        ).toHaveBeenCalledWith(
          false,
        );
      },
    );

    it(
      "edita cliente e atualiza cache do detalhe",
      async () => {
        const edited = {
          ...cliente,
          nome:
            "Maria Atualizada",
        };

        apiPatch.mockResolvedValue({
          data: edited,
        });

        const {
          queryClient,
          onOpenChange,
        } = renderDialog(
          "edit",
        );

        fireEvent.change(
          screen.getByLabelText(
            /Nome/,
          ),
          {
            target: {
              value:
                "Maria Atualizada",
            },
          },
        );

        fireEvent.click(
          screen.getByRole(
            "button",
            {
              name:
                "Salvar alterações",
            },
          ),
        );

        await vi.waitFor(() => {
          expect(
            apiPatch,
          ).toHaveBeenCalledWith(
            `/clientes/${cliente.id}`,
            expect.objectContaining({
              nome:
                "Maria Atualizada",
              telefone:
                "83999999999",
            }),
          );
        });

        await vi.waitFor(() => {
          expect(
            queryClient.getQueryData([
              "clientes",
              "detail",
              cliente.id,
            ]),
          ).toEqual(
            edited,
          );
        });

        expect(
          onOpenChange,
        ).toHaveBeenCalledWith(
          false,
        );
      },
    );
  },
);
