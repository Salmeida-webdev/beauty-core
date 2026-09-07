import type { ReactNode } from "react";

import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { PortalAuthState } from "../auth/portal-auth";
import {
  PortalAuthProvider,
  usePortalAuth,
} from "../auth/portal-auth-context";
import type { PortalDashboard } from "../contracts/portal-client-contracts";
import { PortalDashboardDataBoundary } from "./portal-dashboard-data-boundary";
import { usePortalDashboardQuery } from "../query/portal-dashboard-query";

const mocks = vi.hoisted(() => ({
  getPortalDashboard: vi.fn(),
}));

vi.mock("../services/portal-client-api", () => ({
  getPortalDashboard: mocks.getPortalDashboard,
}));

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  mocks.getPortalDashboard.mockReset();
});

const AUTHENTICATED_STATE: PortalAuthState = {
  status: "authenticated",
  identity: {
    clienteId: "cliente-real",
    empresaId: "empresa-real",
    sid: "sessao-real",
  },
};

const ANONYMOUS_STATE: PortalAuthState = {
  status: "anonymous",
  identity: null,
};

const dashboard: PortalDashboard = {
  perfil: {
    nome: "Maria",
    telefone: "83999999999",
    email: "maria@example.com",
    foto: null,
    dataNascimento: "1995-08-20",
  },
  agendamentos: {
    proximos: [
      {
        dataHoraInicio: "2026-09-06T14:00:00.000Z",
        dataHoraFim: "2026-09-06T15:00:00.000Z",
        status: "CONFIRMADO",
        servicoNome: "Corte",
        profissionalNome: "Ana",
        profissionalFoto: null,
        unidadeNome: "Centro",
      },
    ],
    ultimo: null,
  },
};

function HookProbe() {
  const query = usePortalDashboardQuery();
  const { status } = usePortalAuth();

  return (
    <output data-testid="dashboard-query">
      {status}|{query.status}|{query.fetchStatus}|{query.data?.perfil.nome ?? ""}
    </output>
  );
}

function renderWithAuth(
  state: PortalAuthState,
  children: ReactNode,
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <PortalAuthProvider initialState={state}>
        {children}
      </PortalAuthProvider>
    </QueryClientProvider>,
  );
}

function renderBoundary(state: PortalAuthState) {
  return renderWithAuth(
    state,
    <PortalDashboardDataBoundary>
      {(value) => (
        <output data-testid="dashboard-view">
          {value.nome}|{value.proximos.length}|{value.proximos[0]?.servicoNome ?? "sem-servico"}
        </output>
      )}
    </PortalDashboardDataBoundary>,
  );
}

describe("portal dashboard data foundation", () => {
  it("shows an authenticated query in its initial fetching state", () => {
    mocks.getPortalDashboard.mockReturnValue(new Promise(() => undefined));

    renderWithAuth(AUTHENTICATED_STATE, <HookProbe />);

    expect(screen.getByTestId("dashboard-query")).toHaveTextContent(
      "authenticated|pending|fetching|",
    );
  });

  it("does not fetch the private dashboard for an anonymous client", () => {
    mocks.getPortalDashboard.mockResolvedValue(dashboard);

    renderWithAuth(ANONYMOUS_STATE, <HookProbe />);

    expect(screen.getByTestId("dashboard-query")).toHaveTextContent(
      "anonymous|pending|idle|",
    );
    expect(mocks.getPortalDashboard).not.toHaveBeenCalled();
  });

  it("loads the mapped dashboard once for an authenticated client", async () => {
    mocks.getPortalDashboard.mockResolvedValueOnce(dashboard);

    renderWithAuth(AUTHENTICATED_STATE, <HookProbe />);

    await waitFor(() => {
      expect(screen.getByTestId("dashboard-query")).toHaveTextContent(
        "authenticated|success|idle|Maria",
      );
    });

    expect(mocks.getPortalDashboard).toHaveBeenCalledTimes(1);
    expect(mocks.getPortalDashboard).toHaveBeenCalledWith();
  });

  it.each([
    [401, "anonymous"],
    [403, "denied"],
  ] as const)(
    "converts dashboard access status %s into the safe auth state",
    async (status, expectedAuthStatus) => {
      mocks.getPortalDashboard.mockRejectedValueOnce({
        isAxiosError: true,
        response: { status },
      });

      renderWithAuth(AUTHENTICATED_STATE, <HookProbe />);

      await waitFor(() => {
        expect(screen.getByTestId("dashboard-query")).toHaveTextContent(
          expectedAuthStatus,
        );
      });

      expect(mocks.getPortalDashboard).toHaveBeenCalledTimes(1);
    },
  );

  it("renders the safe view model and never exposes raw fields", async () => {
    mocks.getPortalDashboard.mockResolvedValueOnce(dashboard);

    renderBoundary(AUTHENTICATED_STATE);

    await waitFor(() => {
      expect(screen.getByTestId("dashboard-view")).toHaveTextContent(
        "Maria|1|Corte",
      );
    });

    expect(screen.queryByText("empresa-real")).not.toBeInTheDocument();
    expect(screen.queryByText("83999999999")).not.toBeInTheDocument();
  });

  it("renders an honest empty state without inventing KPIs", async () => {
    mocks.getPortalDashboard.mockResolvedValueOnce({
      ...dashboard,
      agendamentos: {
        proximos: [],
        ultimo: null,
      },
    });

    renderBoundary(AUTHENTICATED_STATE);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Nenhum atendimento encontrado",
        }),
      ).toBeInTheDocument();
    });

    expect(screen.queryByText(/pontos|saldo|total/i)).not.toBeInTheDocument();
  });

  it("renders a safe server error state with retry", async () => {
    mocks.getPortalDashboard.mockRejectedValueOnce({
      isAxiosError: true,
      response: { status: 500 },
    });

    renderBoundary(AUTHENTICATED_STATE);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Nao foi possivel carregar o dashboard",
        }),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: "Tentar novamente" }),
    ).toBeInTheDocument();
  });

  it("keeps the anonymous surface out of the private dashboard", () => {
    mocks.getPortalDashboard.mockResolvedValue(dashboard);

    renderBoundary(ANONYMOUS_STATE);

    expect(
      screen.getByRole("heading", {
        name: "Acesso ao Portal indisponivel",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("dashboard-view")).not.toBeInTheDocument();
    expect(mocks.getPortalDashboard).not.toHaveBeenCalled();
  });
});