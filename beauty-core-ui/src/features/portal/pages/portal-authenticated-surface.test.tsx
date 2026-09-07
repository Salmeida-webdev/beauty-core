import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TenantProvider } from "@/providers/tenant-provider";
import {
  PortalAuthProvider,
  usePortalAuth,
} from "../auth/portal-auth-context";
import { PortalAuthenticatedSurface } from "./portal-authenticated-surface";

const navigation = vi.hoisted(() => ({
  replace: vi.fn(),
}));

const api = vi.hoisted(() => ({
  logout: vi.fn(),
  logoutAll: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => navigation,
}));

vi.mock("../auth/portal-auth-api", () => ({
  portalAuthApi: api,
}));

vi.mock("../auth/portal-auth-session", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../auth/portal-auth-session")>();

  return {
    ...actual,
    logoutPortalSession: () =>
      api.logout({
        refreshToken: "refresh-token",
      }),
  };
});

function StatusProbe() {
  const { status } = usePortalAuth();

  return <output data-testid="auth-status">{status}</output>;
}

function renderSurface(queryClient = new QueryClient()) {
  return {
    queryClient,
    ...render(
      <TenantProvider>
        <QueryClientProvider client={queryClient}>
          <PortalAuthProvider
            initialState={{
              status: "authenticated",
              identity: {
                clienteId: "cliente-real",
                empresaId: "empresa-real",
                sid: "sessao-real",
              },
            }}
          >
            <StatusProbe />
            <PortalAuthenticatedSurface />
          </PortalAuthProvider>
        </QueryClientProvider>
      </TenantProvider>,
    ),
  };
}

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  navigation.replace.mockReset();
  api.logout.mockReset();
  api.logoutAll.mockReset();
  api.logout.mockResolvedValue({ message: "Logout realizado com sucesso." });
  api.logoutAll.mockResolvedValue({
    message: "Todas as sessões foram encerradas com sucesso.",
  });
});

describe("PortalAuthenticatedSurface", () => {
  it("exposes only the neutral authenticated Portal surface", () => {
    renderSurface();

    expect(
      screen.getByRole("heading", { name: "Acesso autenticado" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Portal protegido")).toBeInTheDocument();
    expect(screen.queryByText("dashboard real")).not.toBeInTheDocument();
  });

  it("logs out the current client session and cleans private state", async () => {
    const { queryClient } = renderSurface();

    queryClient.setQueryData(["portal", "private"], {
      secret: "private-data",
    });

    fireEvent.click(screen.getByRole("button", { name: "Sair" }));

    await waitFor(() => {
      expect(api.logout).toHaveBeenCalledTimes(1);
      expect(navigation.replace).toHaveBeenCalledWith("/portal");
      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
    });

    expect(
      queryClient.getQueryData(["portal", "private"]),
    ).toBeUndefined();
    expect(api.logoutAll).not.toHaveBeenCalled();
  });

  it("logs out all client sessions and cleans private state", async () => {
    const { queryClient } = renderSurface();

    queryClient.setQueryData(["portal", "private"], {
      secret: "private-data",
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Encerrar todas as sessões" }),
    );

    await waitFor(() => {
      expect(api.logoutAll).toHaveBeenCalledTimes(1);
      expect(navigation.replace).toHaveBeenCalledWith("/portal");
      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
    });

    expect(
      queryClient.getQueryData(["portal", "private"]),
    ).toBeUndefined();
    expect(api.logout).not.toHaveBeenCalled();
  });

  it("protects logout actions against double submit", async () => {
    let resolveLogout!: () => void;
    api.logout.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveLogout = () => resolve();
      }),
    );

    renderSurface();

    const button = screen.getByRole("button", { name: "Sair" });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(api.logout).toHaveBeenCalledTimes(1);
    expect(button).toBeDisabled();

    resolveLogout();

    await waitFor(() => {
      expect(navigation.replace).toHaveBeenCalledWith("/portal");
    });
  });

  it("cleans the local session even when the server logout fails", async () => {
    api.logout.mockRejectedValue(new Error("resposta interna da API"));

    const { queryClient } = renderSurface();

    queryClient.setQueryData(["portal", "private"], {
      secret: "private-data",
    });

    fireEvent.click(screen.getByRole("button", { name: "Sair" }));

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
      expect(navigation.replace).toHaveBeenCalledWith("/portal");
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Não foi possível confirmar o logout.",
      );
    });

    expect(
      queryClient.getQueryData(["portal", "private"]),
    ).toBeUndefined();
    expect(screen.getByRole("alert")).not.toHaveTextContent(
      "resposta interna da API",
    );
  });
});
