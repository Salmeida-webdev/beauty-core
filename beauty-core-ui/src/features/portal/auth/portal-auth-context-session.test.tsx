import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  restorePortalSession: vi.fn(),
  logoutPortalSession: vi.fn(),
  clearPortalSession: vi.fn(),
  hasPortalSession: vi.fn(),
}));

vi.mock("./portal-auth-session", () => ({
  restorePortalSession: mocks.restorePortalSession,
  logoutPortalSession: mocks.logoutPortalSession,
  clearPortalSession: mocks.clearPortalSession,
  hasPortalSession: mocks.hasPortalSession,
}));

import {
  PortalAuthProvider,
  usePortalAuth,
} from "./portal-auth-context";

afterEach(() => {
  cleanup();
});

const identity = {
  clienteId: "cliente-real",
  empresaId: "empresa-real",
  sid: "sessao-real",
};

function Probe() {
  const auth = usePortalAuth();

  return (
    <div>
      <output data-testid="status">{auth.status}</output>
      <output data-testid="identity">
        {auth.identity
          ? `${auth.identity.clienteId}|${auth.identity.empresaId}|${auth.identity.sid}`
          : ""}
      </output>
      <button
        type="button"
        onClick={() => {
          void auth.restoreSession();
        }}
      >
        restaurar sessão
      </button>
      <button
        type="button"
        onClick={() => {
          void auth.logoutSession();
        }}
      >
        sair
      </button>
    </div>
  );
}

describe("PortalAuthProvider — ciclo real de sessão", () => {
  it("restaura e publica a identidade do cliente", async () => {
    mocks.restorePortalSession.mockResolvedValue(identity);

    render(
      <PortalAuthProvider>
        <Probe />
      </PortalAuthProvider>,
    );

    screen.getByRole("button", {
      name: "restaurar sessão",
    }).click();

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent(
        "authenticated",
      );
    });

    expect(screen.getByTestId("identity")).toHaveTextContent(
      "cliente-real|empresa-real|sessao-real",
    );
  });

  it("marca anonymous quando não existe sessão restaurável", async () => {
    mocks.restorePortalSession.mockResolvedValue(null);

    render(
      <PortalAuthProvider>
        <Probe />
      </PortalAuthProvider>,
    );

    screen.getByRole("button", {
      name: "restaurar sessão",
    }).click();

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent(
        "anonymous",
      );
    });
  });

  it("executa logout e limpa o estado do provider", async () => {
    mocks.logoutPortalSession.mockResolvedValue({
      message: "Logout realizado com sucesso.",
    });

    render(
      <PortalAuthProvider
        initialState={{
          status: "authenticated",
          identity,
        }}
      >
        <Probe />
      </PortalAuthProvider>,
    );

    screen.getByRole("button", {
      name: "sair",
    }).click();

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent(
        "anonymous",
      );
    });

    expect(mocks.clearPortalSession).toHaveBeenCalled();
  });

  it("não restaura automaticamente sem restoreOnMount", () => {
    mocks.hasPortalSession.mockReturnValue(true);

    render(
      <PortalAuthProvider>
        <Probe />
      </PortalAuthProvider>,
    );

    expect(screen.getByTestId("status")).toHaveTextContent(
      "unknown",
    );

    expect(mocks.restorePortalSession).not.toHaveBeenCalled();
  });

  it("restaura automaticamente quando restoreOnMount está habilitado", async () => {
    mocks.hasPortalSession.mockReturnValue(true);
    mocks.restorePortalSession.mockResolvedValue(identity);

    render(
      <PortalAuthProvider restoreOnMount>
        <Probe />
      </PortalAuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent(
        "authenticated",
      );
    });

    expect(mocks.restorePortalSession).toHaveBeenCalledTimes(1);
  });
});