import type { ReactNode } from "react";

import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { AdminShellBoundary } from "@/components/layout/admin-shell-boundary";
import { useAuthStore } from "@/stores/auth-store";

const navigationState = vi.hoisted(() => ({
  pathname: "/design-system",
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
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

afterEach(() => {
  cleanup();
  navigationState.pathname = "/design-system";
  useAuthStore.getState().clearSession();
});

describe("AdminShellBoundary", () => {
  it("usa preview técnico somente na rota permitida", () => {
    useAuthStore.getState().setUnauthenticated();

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
  });

  it("usa a role real da sessão autenticada", () => {
    useAuthStore.getState().setAuthenticated({
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
  });

  it("não injeta role falsa em rota comum sem sessão", () => {
    navigationState.pathname = "/dashboard";

    useAuthStore.getState().setUnauthenticated();

    render(
      <AdminShellBoundary>
        <span>Conteúdo</span>
      </AdminShellBoundary>,
    );

    expect(
      screen.queryByTestId(
        "mock-admin-shell",
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent(
      "Autenticação administrativa necessária",
    );
  });

  it("exibe estado de restauração em rota comum", () => {
    navigationState.pathname = "/dashboard";

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
  });
});