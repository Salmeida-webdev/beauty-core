import type { ReactNode } from "react";

import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { AdminShellBoundary } from "@/components/layout/admin-shell-boundary";
import { useAuthStore } from "@/stores/auth-store";

const navigationState = vi.hoisted(() => ({
  pathname: "/design-system",
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
  useRouter: () => ({
    replace: navigationState.replace,
  }),
}));

vi.mock(
  "@/components/layout/admin-app-shell",
  () => ({
    AdminAppShell: ({
      children,
      role,
      technicalPreview,
    }: {
      children: ReactNode;
      role: string;
      technicalPreview?: boolean;
    }) => (
      <div
        data-testid="mock-admin-shell"
        data-role={role}
        data-preview={
          technicalPreview
            ? "true"
            : "false"
        }
      >
        {children}
      </div>
    ),
  }),
);

beforeEach(() => {
  navigationState.pathname =
    "/design-system";

  navigationState.replace.mockReset();

  window.history.replaceState(
    {},
    "",
    "/design-system",
  );

  useAuthStore
    .getState()
    .clearSession();
});

afterEach(() => {
  cleanup();
});

describe("AdminShellBoundary", () => {
  it("usa preview técnico somente na rota permitida", () => {
    useAuthStore
      .getState()
      .setUnauthenticated();

    render(
      <AdminShellBoundary>
        <span>Conteúdo técnico</span>
      </AdminShellBoundary>,
    );

    const shell = screen.getByTestId(
      "mock-admin-shell",
    );

    expect(shell).toHaveAttribute(
      "data-role",
      "SUPER_ADMIN",
    );

    expect(shell).toHaveAttribute(
      "data-preview",
      "true",
    );

    expect(
      navigationState.replace,
    ).not.toHaveBeenCalled();
  });

  it("usa a role real da sessão autenticada", () => {
    navigationState.pathname =
      "/dashboard";

    useAuthStore
      .getState()
      .setAuthenticated({
        id: "user-1",
        email: "admin@example.com",
        role: "ADMIN",
        empresaId: "company-1",
      });

    render(
      <AdminShellBoundary>
        <span>Conteúdo autenticado</span>
      </AdminShellBoundary>,
    );

    const shell = screen.getByTestId(
      "mock-admin-shell",
    );

    expect(shell).toHaveAttribute(
      "data-role",
      "ADMIN",
    );

    expect(shell).toHaveAttribute(
      "data-preview",
      "false",
    );

    expect(
      navigationState.replace,
    ).not.toHaveBeenCalled();
  });

  it("exibe estado de restauração em rota protegida", () => {
    navigationState.pathname =
      "/dashboard";

    useAuthStore
      .getState()
      .beginSessionRestore();

    render(
      <AdminShellBoundary>
        <span>Conteúdo</span>
      </AdminShellBoundary>,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveTextContent(
      "Restaurando sessão administrativa",
    );

    expect(
      navigationState.replace,
    ).not.toHaveBeenCalled();
  });

  it("redireciona sessão ausente para login preservando a rota", async () => {
    navigationState.pathname =
      "/dashboard";

    window.history.replaceState(
      {},
      "",
      "/dashboard?tab=overview",
    );

    useAuthStore
      .getState()
      .setUnauthenticated();

    render(
      <AdminShellBoundary>
        <span>Conteúdo</span>
      </AdminShellBoundary>,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveTextContent(
      "Redirecionando para o acesso administrativo",
    );

    await waitFor(() => {
      expect(
        navigationState.replace,
      ).toHaveBeenCalledWith(
        "/login?returnTo=%2Fdashboard%3Ftab%3Doverview",
      );
    });
  });

  it("não redireciona preview técnico sem sessão", () => {
    navigationState.pathname =
      "/design-system";

    useAuthStore
      .getState()
      .setUnauthenticated();

    render(
      <AdminShellBoundary>
        <span>Preview</span>
      </AdminShellBoundary>,
    );

    expect(
      screen.getByTestId(
        "mock-admin-shell",
      ),
    ).toBeInTheDocument();

    expect(
      navigationState.replace,
    ).not.toHaveBeenCalled();
  });
});
