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

import {
  AdminLoginBoundary,
} from "@/features/auth/components/admin-login-boundary";
import { useAuthStore } from "@/stores/auth-store";

const navigationState = vi.hoisted(() => ({
  replace: vi.fn(),
  refresh: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: navigationState.replace,
    refresh: navigationState.refresh,
  }),
}));

beforeEach(() => {
  navigationState.replace.mockReset();
  navigationState.refresh.mockReset();

  window.history.replaceState(
    {},
    "",
    "/login",
  );

  useAuthStore
    .getState()
    .clearSession();
});

afterEach(() => {
  cleanup();
});

describe("AdminLoginBoundary", () => {
  it("renderiza o login quando a sessão está ausente", () => {
    useAuthStore
      .getState()
      .setUnauthenticated();

    render(
      <AdminLoginBoundary>
        <span>Formulário de login</span>
      </AdminLoginBoundary>,
    );

    expect(
      screen.getByText(
        "Formulário de login",
      ),
    ).toBeInTheDocument();

    expect(
      navigationState.replace,
    ).not.toHaveBeenCalled();
  });

  it("aguarda restauração antes de mostrar o login", () => {
    useAuthStore
      .getState()
      .beginSessionRestore();

    render(
      <AdminLoginBoundary>
        <span>Formulário de login</span>
      </AdminLoginBoundary>,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveTextContent(
      "Validando sua sessão administrativa.",
    );

    expect(
      screen.queryByText(
        "Formulário de login",
      ),
    ).not.toBeInTheDocument();
  });

  it("redireciona usuário autenticado para o returnTo", async () => {
    window.history.replaceState(
      {},
      "",
      "/login?returnTo=%2Fclientes%3Fpage%3D2",
    );

    useAuthStore
      .getState()
      .setAuthenticated({
        id: "user-1",
        email: "admin@example.com",
        role: "ADMIN",
        empresaId: "company-1",
      });

    render(
      <AdminLoginBoundary>
        <span>Formulário de login</span>
      </AdminLoginBoundary>,
    );

    await waitFor(() => {
      expect(
        navigationState.replace,
      ).toHaveBeenCalledWith(
        "/clientes?page=2",
      );
    });

    expect(
      navigationState.refresh,
    ).toHaveBeenCalled();
  });

  it("descarta returnTo externo de usuário autenticado", async () => {
    window.history.replaceState(
      {},
      "",
      "/login?returnTo=https%3A%2F%2Fevil.example",
    );

    useAuthStore
      .getState()
      .setAuthenticated({
        id: "user-1",
        email: "admin@example.com",
        role: "ADMIN",
        empresaId: "company-1",
      });

    render(
      <AdminLoginBoundary>
        <span>Formulário de login</span>
      </AdminLoginBoundary>,
    );

    await waitFor(() => {
      expect(
        navigationState.replace,
      ).toHaveBeenCalledWith(
        "/dashboard",
      );
    });
  });
});
