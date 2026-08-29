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
  AgendamentoStatusActions,
  STATUS_CHANGE_OPTIONS,
} from "@/features/agendamentos/components/agendamento-status-actions";
import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
import type { AgendamentoDetail } from "@/features/agendamentos/types/agendamentos-api.types";
import { normalizeApiError } from "@/services/api/normalize-api-error";

const detail: AgendamentoDetail = {
  id:
    "550e8400-e29b-41d4-a716-446655440000",
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
  observacoes: null,
  status: "PENDENTE",
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
      changeStatus:
        vi.fn(),
      cancel: vi.fn(),
    },
  }),
);

vi.mock(
  "@/services/api/normalize-api-error",
  () => ({
    normalizeApiError:
      vi.fn(),
  }),
);

let queryClient: QueryClient;

function renderActions(
  options?: {
    data?: AgendamentoDetail;
    canChangeStatus?: boolean;
    canCancel?: boolean;
  },
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
      <AgendamentoStatusActions
        detail={
          options?.data ??
          detail
        }
        canChangeStatus={
          options?.canChangeStatus ??
          true
        }
        canCancel={
          options?.canCancel ??
          true
        }
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

describe("AgendamentoStatusActions", () => {
  it("separa CANCELADO das opcoes gerais", () => {
    expect(
      STATUS_CHANGE_OPTIONS,
    ).toEqual([
      "PENDENTE",
      "CONFIRMADO",
      "EM_ANDAMENTO",
      "CONCLUIDO",
      "FALTOU",
    ]);

    expect(
      STATUS_CHANGE_OPTIONS,
    ).not.toContain(
      "CANCELADO",
    );
  });

  it("confirma alteracao de status e invalida cache", async () => {
    vi.mocked(
      agendamentosApi.changeStatus,
    ).mockResolvedValue({
      ...detail,
      status:
        "CONFIRMADO",
      updatedAt:
        "2026-08-29T16:00:00.000Z",
    });

    const {
      invalidateSpy,
    } = renderActions();

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Confirmado",
        },
      ),
    );

    expect(
      screen.getByText(
        "Confirmar alteracao de status",
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Confirmar status",
        },
      ),
    );

    await waitFor(() => {
      expect(
        agendamentosApi.changeStatus,
      ).toHaveBeenCalledWith(
        detail.id,
        "CONFIRMADO",
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

  it("usa cancelamento dedicado somente apos confirmacao", async () => {
    vi.mocked(
      agendamentosApi.cancel,
    ).mockResolvedValue({
      ...detail,
      status:
        "CANCELADO",
      updatedAt:
        "2026-08-29T16:00:00.000Z",
    });

    const {
      invalidateSpy,
    } = renderActions();

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Cancelar agendamento",
        },
      ),
    );

    expect(
      agendamentosApi.cancel,
    ).not.toHaveBeenCalled();

    expect(
      screen.getByRole(
        "heading",
        {
          name:
            "Confirmar cancelamento",
        },
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Confirmar cancelamento",
        },
      ),
    );

    await waitFor(() => {
      expect(
        agendamentosApi.cancel,
      ).toHaveBeenCalledWith(
        detail.id,
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

  it("nao renderiza acoes sem permissao", () => {
    const {
      container,
    } = render(
      <QueryClientProvider
        client={
          new QueryClient()
        }
      >
        <AgendamentoStatusActions
          detail={detail}
          canChangeStatus={
            false
          }
          canCancel={false}
        />
      </QueryClientProvider>,
    );

    expect(
      container,
    ).toBeEmptyDOMElement();
  });

  it("exibe erro normalizado sem optimistic update", async () => {
    vi.mocked(
      agendamentosApi.changeStatus,
    ).mockRejectedValue(
      new Error("500"),
    );

    vi.mocked(
      normalizeApiError,
    ).mockReturnValue({
      statusCode: 500,
      message:
        "Nao foi possivel alterar o status.",
      messages: [
        "Nao foi possivel alterar o status.",
      ],
      error:
        "Internal Server Error",
      requestId: null,
      correlationId: null,
      isNetworkError: false,
    });

    renderActions();

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Confirmado",
        },
      ),
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Confirmar status",
        },
      ),
    );

    expect(
      await screen.findByRole(
        "alert",
      ),
    ).toHaveTextContent(
      "Nao foi possivel alterar o status.",
    );
  });
});