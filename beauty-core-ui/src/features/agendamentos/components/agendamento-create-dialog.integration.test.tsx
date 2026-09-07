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

import { AgendamentoCreateDialog } from "@/features/agendamentos/components/agendamento-create-dialog";
import type { AgendamentoCreateFormValues } from "@/features/agendamentos/forms/agendamento-create-form.schema";
import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
import { normalizeApiError } from "@/services/api/normalize-api-error";

vi.mock(
  "@/features/agendamentos/services/agendamentos-api",
  () => ({
    agendamentosApi: {
      create: vi.fn(),
    },
  }),
);

vi.mock(
  "@/services/api/normalize-api-error",
  () => ({
    normalizeApiError: vi.fn(),
  }),
);

vi.mock(
  "@/features/agendamentos/forms/agendamento-create-form",
  () => ({
    AgendamentoCreateForm: ({
      onSubmit,
      serverError,
      pending,
    }: {
      onSubmit: (
        values: AgendamentoCreateFormValues,
      ) => void;
      serverError?: string | null;
      pending: boolean;
    }) => (
      <div>
        {serverError ? (
          <p role="alert">
            {serverError}
          </p>
        ) : null}

        <button
          type="button"
          disabled={pending}
          onClick={() =>
            onSubmit({
              related: {
                clienteId:
                  "550e8400-e29b-41d4-a716-446655440001",
                profissionalId:
                  "550e8400-e29b-41d4-a716-446655440002",
                servicoId:
                  "550e8400-e29b-41d4-a716-446655440003",
                unidadeId:
                  "550e8400-e29b-41d4-a716-446655440004",
              },
              dataHoraInicio:
                "2026-08-29T12:00",
              dataHoraFim:
                "2026-08-29T12:45",
              observacoes: "",
            })
          }
        >
          Enviar agendamento
        </button>
      </div>
    ),
  }),
);

let queryClient: QueryClient;

function renderDialog() {
  queryClient =
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
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

  render(
    <QueryClientProvider
      client={queryClient}
    >
      <AgendamentoCreateDialog />
    </QueryClientProvider>,
  );

  return {
    invalidateSpy,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
  queryClient?.clear();
});

describe("AgendamentoCreateDialog", () => {
  it("cria e invalida o cache de Agendamentos", async () => {
    vi.mocked(
      agendamentosApi.create,
    ).mockResolvedValue({
      id:
        "550e8400-e29b-41d4-a716-446655440000",
      unidadeId:
        "550e8400-e29b-41d4-a716-446655440004",
      clienteId:
        "550e8400-e29b-41d4-a716-446655440001",
      servicoId:
        "550e8400-e29b-41d4-a716-446655440003",
      profissionalId:
        "550e8400-e29b-41d4-a716-446655440002",
      dataHoraInicio:
        "2026-08-29T15:00:00.000Z",
      dataHoraFim:
        "2026-08-29T15:45:00.000Z",
      observacoes: null,
      status: "PENDENTE",
      createdAt:
        "2026-08-29T14:00:00.000Z",
      updatedAt:
        "2026-08-29T14:00:00.000Z",
    });

    const {
      invalidateSpy,
    } = renderDialog();

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Novo agendamento",
        },
      ),
    );

    expect(
      screen.getByRole(
        "heading",
        {
          name:
            "Novo agendamento",
        },
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Enviar agendamento",
        },
      ),
    );

    await waitFor(() => {
      expect(
        agendamentosApi.create,
      ).toHaveBeenCalledTimes(
        1,
      );
    });

    await waitFor(() => {
      expect(
        invalidateSpy,
      ).toHaveBeenCalledWith({
        queryKey:
          agendamentosKeys.all,
      });
    });

    await waitFor(() => {
      expect(
        screen.queryByRole(
          "heading",
          {
            name:
              "Novo agendamento",
          },
        ),
      ).not.toBeInTheDocument();
    });
  });

  it("mantem dialog aberto e mostra erro normalizado", async () => {
    vi.mocked(
      agendamentosApi.create,
    ).mockRejectedValue(
      new Error("500"),
    );

    vi.mocked(
      normalizeApiError,
    ).mockReturnValue({
      statusCode: 500,
      message:
        "Nao foi possivel criar o agendamento.",
      messages: [
        "Nao foi possivel criar o agendamento.",
      ],
      error:
        "Internal Server Error",
      requestId: null,
      correlationId: null,
      isNetworkError: false,
    });

    renderDialog();

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Novo agendamento",
        },
      ),
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Enviar agendamento",
        },
      ),
    );

    expect(
      await screen.findByRole(
        "alert",
      ),
    ).toHaveTextContent(
      "Nao foi possivel criar o agendamento.",
    );

    expect(
      screen.getByRole(
        "heading",
        {
          name:
            "Novo agendamento",
        },
      ),
    ).toBeInTheDocument();
  });
});