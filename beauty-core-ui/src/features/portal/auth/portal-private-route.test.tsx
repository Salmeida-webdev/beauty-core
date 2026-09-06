import type { ReactNode } from "react";
import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  currentPath: "/portal/perfil",
  router: { replace: vi.fn() },
  usePortalAuth: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => mocks.currentPath,
  useRouter: () => mocks.router,
}));

vi.mock("./portal-auth-context", () => ({
  usePortalAuth: mocks.usePortalAuth,
}));

vi.mock("./portal-auth-route-orchestrator", () => ({
  PortalAuthRouteOrchestrator: ({ children }: { children: ReactNode }) => (
    <>{children}</>
  ),
}));

import { PortalPrivateRoute } from "./portal-private-route";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  mocks.currentPath = "/portal/perfil";
  mocks.router.replace.mockReset();
  mocks.usePortalAuth.mockReset();
});

describe("PortalPrivateRoute", () => {
  it("does not expose private content to an anonymous client", async () => {
    mocks.usePortalAuth.mockReturnValue({
      status: "anonymous",
      identity: null,
    });

    render(
      <PortalPrivateRoute>
        <p>conteudo privado</p>
      </PortalPrivateRoute>,
    );

    expect(screen.queryByText("conteudo privado")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(mocks.router.replace).toHaveBeenCalledWith(
        "/portal?returnTo=%2Fportal%2Fperfil",
      );
    });
  });

  it("waits for auth restoration without fetching a private resource", () => {
    mocks.usePortalAuth.mockReturnValue({
      status: "restoring",
      identity: null,
    });

    render(
      <PortalPrivateRoute>
        <p>conteudo privado</p>
      </PortalPrivateRoute>,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText("conteudo privado")).not.toBeInTheDocument();
    expect(mocks.router.replace).not.toHaveBeenCalled();
  });

  it("exposes the children only after authentication", () => {
    mocks.usePortalAuth.mockReturnValue({
      status: "authenticated",
      identity: {
        clienteId: "cliente-real",
        empresaId: "empresa-real",
        sid: "sessao-real",
      },
    });

    render(
      <PortalPrivateRoute>
        <p>conteudo privado</p>
      </PortalPrivateRoute>,
    );

    expect(screen.getByText("conteudo privado")).toBeInTheDocument();
    expect(mocks.router.replace).not.toHaveBeenCalled();
  });

  it("keeps an administrative path outside the Portal returnTo namespace", async () => {
    mocks.currentPath = "/admin";
    mocks.usePortalAuth.mockReturnValue({
      status: "anonymous",
      identity: null,
    });

    render(
      <PortalPrivateRoute>
        <p>conteudo privado</p>
      </PortalPrivateRoute>,
    );

    await waitFor(() => {
      expect(mocks.router.replace).toHaveBeenCalledWith(
        "/portal?returnTo=%2Fportal",
      );
    });
  });
});