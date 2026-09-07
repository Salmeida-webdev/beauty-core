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

import { AgendamentoDetailDialog } from "@/features/agendamentos/components/agendamento-detail-dialog";
import type { AgendamentoEditFormValues } from "@/features/agendamentos/forms/agendamento-edit-payload";
import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
import { normalizeApiError } from "@/services/api/normalize-api-error";

const id =
  "550e8400-e29b-41d4-a716-446655440000";

const detail = {
  id,
  clienteId:
    "550e8400-e29b-41d4-a716-446655440001",
  profissionalId:
    "550e8400-e29b-41d4-a716-446655440002",
  servicoId:
    "550e8400-e29b-41d4-a716-446655440003",
  unidadeId:
    "550e8400-e29b-41d4-a716-446655440004",
  dataHoraInicio:
    "2026-08-29T15:00:00.000Z",
  dataHoraFim:
    "2026-08-29T15:45:00.000Z",
  observacoes:
    "Observacao.",
  status:
    "CONFIRMADO" as const,
  createdAt:
    "2026-08-20T12:00:00.000Z",
  updatedAt:
    "2026-08-29T14:00:00.000Z",

  cliente: {
    id:
      "550e8400-e29b-41d4-a716-446655440001",
    nome: "Maria",
    telefone:
      "83999999999",
    email:
      "maria@example.com",
  },

  profissional: {
    id:
      "550e8400-e29b-41d4-a716-446655440002",
    nome: "Ana",
    email:
      "ana@example.com",
  },

  servico: {
    id:
      "550e8400-e29b-41d4-a716-446655440003",
    nome: "Corte",
    preco: "80.00",
    duracaoMinutos: 45,
  },

  unidade: {
    id:
      "550e8400-e29b-41d4-a716-446655440004",
    nome: "Centro",
  },
};

vi.mock(
  "@/features/agendamentos/services/agendamentos-api",
  () => ({
    agendamentosApi: {
      detail: vi.fn(),
      update: vi.fn(),
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
  "@/features/agendamentos/components/agendamento-status-actions",
  () => ({
    AgendamentoStatusActions: ({
      canChangeStatus,
      canCancel,
    }: {
      canChangeStatus: boolean;
      canCancel: boolean;
    }) => (
      <div>
        status-actions:
        {String(
          canChangeStatus,
        )}
        /
        {String(
          canCancel,
        )}
      </div>
    ),
  }),
);

vi.mock(
  "@/features/agendamentos/forms/agendamento-edit-form",
  () => ({
    AgendamentoEditForm: ({
      onSubmit,
      pending,
    }: {
      onSubmit: (
        values: AgendamentoEditFormValues,
      ) => void;
      pending: boolean;
    }) => (
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          onSubmit({
            related: {
              clienteId:
                detail.clienteId,
              profissionalId:
                detail.profissionalId,
              servicoId:
                detail.servicoId,
              unidadeId:
                detail.unidadeId,
            },
            dataHoraInicio:
              "2026-08-29T12:00",
            dataHoraFim:
              "2026-08-29T12:45",
            observacoes:
              "Editado.",
          })
        }
      >
        Salvar mock
      </button>
    ),
  }),
);

let queryClient: QueryClient;

function renderDialog(
  canEdit = true,
) {
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
      <AgendamentoDetailDialog
        agendamentoId={id}
        canEdit={canEdit}
        canChangeStatus
        canCancel
        onClose={vi.fn()}
      />
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

describe("AgendamentoDetailDialog", () => {
  it("carrega o detalhe real e integra acoes", async () => {
    vi.mocked(
      agendamentosApi.detail,
    ).mockResolvedValue(
      detail,
    );

    renderDialog();

    expect(
      await screen.findByText(
        "Maria",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Corte",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /status-actions:true\/true/,
      ),
    ).toBeInTheDocument();
  });

  it("edita e invalida todo cache de agendamentos", async () => {
    vi.mocked(
      agendamentosApi.detail,
    ).mockResolvedValue(
      detail,
    );

    vi.mocked(
      agendamentosApi.update,
    ).mockResolvedValue({
      ...detail,
      observacoes:
        "Editado.",
      updatedAt:
        "2026-08-29T16:00:00.000Z",
    });

    const {
      invalidateSpy,
    } = renderDialog();

    fireEvent.click(
      await screen.findByRole(
        "button",
        {
          name:
            "Editar agendamento",
        },
      ),
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Salvar mock",
        },
      ),
    );

    await waitFor(() => {
      expect(
        agendamentosApi.update,
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
  });

  it("nao oferece edicao sem permissao", async () => {
    vi.mocked(
      agendamentosApi.detail,
    ).mockResolvedValue(
      detail,
    );

    renderDialog(false);

    await screen.findByText(
      "Maria",
    );

    expect(
      screen.queryByRole(
        "button",
        {
          name:
            "Editar agendamento",
        },
      ),
    ).not.toBeInTheDocument();
  });

  it("trata 404 especificamente", async () => {
    vi.mocked(
      agendamentosApi.detail,
    ).mockRejectedValue(
      new Error("404"),
    );

    vi.mocked(
      normalizeApiError,
    ).mockReturnValue({
      statusCode: 404,
      message:
        "Agendamento nao encontrado.",
      messages: [
        "Agendamento nao encontrado.",
      ],
      error: "Not Found",
      requestId: null,
      correlationId: null,
      isNetworkError: false,
    });

    renderDialog();

    expect(
      await screen.findByText(
        "Agendamento nao encontrado",
      ),
    ).toBeInTheDocument();
  });
});