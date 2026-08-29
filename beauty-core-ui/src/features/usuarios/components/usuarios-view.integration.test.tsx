import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { UsuariosView } from "@/features/usuarios/components/usuarios-view";

type MockRole =
  "SUPER_ADMIN" | "ADMIN" | "GERENTE" | "RECEPCAO" | "PROFISSIONAL";

type MockAuthState = {
  status: "idle" | "restoring" | "authenticated" | "unauthenticated";

  user: {
    id: string;
    nome: string;
    email: string;
    role: MockRole;
    empresaId: string | null;
  } | null;
};

type ApiConfig = {
  params?: Record<string, string | number>;
};

type ApiGet = (
  url: string,
  config?: ApiConfig,
) => Promise<{
  data: unknown;
}>;

const apiGet = vi.hoisted(() => vi.fn<ApiGet>());

const navigation = vi.hoisted(() => ({
  params: new URLSearchParams(),

  replace: vi.fn(),
}));

const authState = vi.hoisted(() => ({
  value: {
    status: "authenticated",

    user: {
      id: "550e8400-e29b-41d4-a716-446655440020",
      nome: "Admin",
      email: "admin@beautycore.test",
      role: "ADMIN",
      empresaId: "550e8400-e29b-41d4-a716-446655440001",
    },
  } as MockAuthState,
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: apiGet,
  }),
}));

vi.mock("@/stores/auth-store", () => ({
  useAuthStore: (selector: (state: MockAuthState) => unknown) =>
    selector(authState.value),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: navigation.replace,
  }),

  useSearchParams: () => navigation.params,
}));

const usuario = {
  id: "550e8400-e29b-41d4-a716-446655440020",

  empresaId: "550e8400-e29b-41d4-a716-446655440001",

  nome: "Maria Gerente",

  email: "maria@beautycore.com",

  telefone: null,
  foto: null,
  role: "GERENTE",
  ativo: true,
  ultimoLogin: null,

  createdAt: "2026-08-28T10:00:00.000Z",

  updatedAt: "2026-08-28T10:00:00.000Z",
};

const activeClients: QueryClient[] = [];

function mockList({ page = 1, limit = 20, total = 1, totalPages = 1 } = {}) {
  apiGet.mockResolvedValue({
    data: {
      data: [usuario],

      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    },
  });
}

function renderUsuarios() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  activeClients.push(queryClient);

  return render(
    <QueryClientProvider client={queryClient}>
      <UsuariosView />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  apiGet.mockReset();

  navigation.replace.mockReset();

  navigation.params = new URLSearchParams();

  authState.value = {
    status: "authenticated",

    user: {
      id: "550e8400-e29b-41d4-a716-446655440020",
      nome: "Admin",
      email: "admin@beautycore.test",
      role: "ADMIN",
      empresaId: "550e8400-e29b-41d4-a716-446655440001",
    },
  };

  mockList();
});

afterEach(() => {
  cleanup();

  for (const client of activeClients.splice(0)) {
    client.clear();
  }
});

describe("UsuariosView", () => {
  it("carrega listagem real", async () => {
    renderUsuarios();

    expect(
      (await screen.findAllByText("Maria Gerente")).length,
    ).toBeGreaterThan(0);

    expect(apiGet).toHaveBeenCalledWith("/usuarios", {
      params: {
        page: 1,
        limit: 20,
        orderBy: "createdAt",
        orderDirection: "desc",
      },
    });

    expect(screen.getAllByText("Você").length).toBeGreaterThan(0);
  });

  it("nega RECEPCAO sem API", async () => {
    authState.value = {
      status: "authenticated",

      user: {
        id: "550e8400-e29b-41d4-a716-446655440030",
        nome: "Recepção",
        email: "recepcao@beautycore.test",
        role: "RECEPCAO",
        empresaId: "550e8400-e29b-41d4-a716-446655440001",
      },
    };

    renderUsuarios();

    expect(
      await screen.findByText(
        /não possui permissão para acessar a gestão administrativa de usuários/i,
      ),
    ).toBeInTheDocument();

    expect(apiGet).not.toHaveBeenCalled();
  });

  it("usa filtros da URL", async () => {
    apiGet.mockReset();

    navigation.params = new URLSearchParams(
      "page=2&limit=50&role=PROFISSIONAL&orderBy=nome&orderDirection=asc",
    );

    mockList({
      page: 2,
      limit: 50,
      total: 51,
      totalPages: 2,
    });

    renderUsuarios();

    await screen.findAllByText("Maria Gerente");

    expect(apiGet).toHaveBeenCalledWith("/usuarios", {
      params: {
        page: 2,
        limit: 50,
        orderBy: "nome",
        orderDirection: "asc",
        role: "PROFISSIONAL",
      },
    });
  });

  it("executa retry manual", async () => {
    apiGet
      .mockReset()
      .mockRejectedValueOnce(new Error("API indisponível"))
      .mockResolvedValueOnce({
        data: {
          data: [usuario],

          meta: {
            total: 1,
            page: 1,
            limit: 20,
            totalPages: 1,
          },
        },
      });

    renderUsuarios();

    const retry = await screen.findByRole("button", {
      name: "Tentar novamente",
    });

    fireEvent.click(retry);

    expect(
      (await screen.findAllByText("Maria Gerente")).length,
    ).toBeGreaterThan(0);

    expect(apiGet).toHaveBeenCalledTimes(2);
  });

  it("sincroniza busca apos debounce", async () => {
    renderUsuarios();

    const search = screen.getByRole("searchbox", {
      name: "Buscar usuários",
    });

    fireEvent.change(search, {
      target: {
        value: "Maria",
      },
    });

    await waitFor(
      () => {
        expect(navigation.replace).toHaveBeenCalledWith(
          "/usuarios?search=Maria",
        );
      },
      {
        timeout: 1200,
      },
    );
  });

  it("sincroniza role", async () => {
    renderUsuarios();

    await screen.findAllByText("Maria Gerente");

    fireEvent.change(
      screen.getByRole("combobox", {
        name: "Filtrar por perfil",
      }),
      {
        target: {
          value: "PROFISSIONAL",
        },
      },
    );

    expect(navigation.replace).toHaveBeenCalledWith(
      "/usuarios?role=PROFISSIONAL",
    );
  });

  it("pagina server-side", async () => {
    apiGet.mockReset();

    mockList({
      page: 1,
      limit: 20,
      total: 40,
      totalPages: 2,
    });

    renderUsuarios();

    const next = await screen.findByRole("button", {
      name: "Próxima",
    });

    fireEvent.click(next);

    expect(navigation.replace).toHaveBeenCalledWith("/usuarios?page=2");
  });
});
