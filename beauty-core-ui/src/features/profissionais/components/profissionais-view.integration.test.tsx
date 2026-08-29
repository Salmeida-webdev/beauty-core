import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ProfissionaisView } from "@/features/profissionais/components/profissionais-view";

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
      id: "550e8400-e29b-41d4-a716-446655440099",

      nome: "Gerente",

      email: "gerente@beautycore.test",

      role: "GERENTE",

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

const profissional = {
  id: "550e8400-e29b-41d4-a716-446655440020",

  empresaId: "550e8400-e29b-41d4-a716-446655440001",

  nome: "Maria Profissional",

  email: "maria@example.com",

  telefone: "83999999999",

  foto: null,

  role: "PROFISSIONAL",

  ativo: true,

  ultimoLogin: null,

  createdAt: "2026-08-28T10:00:00.000Z",

  updatedAt: "2026-08-28T10:00:00.000Z",
};

const clients: QueryClient[] = [];

function mockList({ page = 1, limit = 20, total = 1, totalPages = 1 } = {}) {
  apiGet.mockResolvedValue({
    data: {
      data: [profissional],

      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    },
  });
}

function renderProfissionais() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,

        gcTime: 0,
      },
    },
  });

  clients.push(queryClient);

  return render(
    <QueryClientProvider client={queryClient}>
      <ProfissionaisView />
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
      id: "550e8400-e29b-41d4-a716-446655440099",

      nome: "Gerente",

      email: "gerente@beautycore.test",

      role: "GERENTE",

      empresaId: "550e8400-e29b-41d4-a716-446655440001",
    },
  };

  mockList();
});

afterEach(() => {
  cleanup();

  for (const client of clients.splice(0)) {
    client.clear();
  }
});

describe("ProfissionaisView", () => {
  it("consulta somente role PROFISSIONAL", async () => {
    renderProfissionais();

    expect(
      (await screen.findAllByText("Maria Profissional")).length,
    ).toBeGreaterThan(0);

    expect(apiGet).toHaveBeenCalledWith("/usuarios", {
      params: {
        page: 1,

        limit: 20,

        orderBy: "createdAt",

        orderDirection: "desc",

        role: "PROFISSIONAL",
      },
    });
  });

  it("nega RECEPCAO sem chamar a API", async () => {
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

    renderProfissionais();

    expect(
      await screen.findByText(
        /não possui permissão para acessar a gestão de profissionais/i,
      ),
    ).toBeInTheDocument();

    expect(apiGet).not.toHaveBeenCalled();
  });

  it("sincroniza busca apos debounce", async () => {
    renderProfissionais();

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: "Buscar profissionais",
      }),
      {
        target: {
          value: "Maria",
        },
      },
    );

    await waitFor(
      () => {
        expect(navigation.replace).toHaveBeenCalledWith(
          "/profissionais?search=Maria",
        );
      },
      {
        timeout: 1200,
      },
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

    renderProfissionais();

    const next = await screen.findByRole("button", {
      name: "Próxima",
    });

    fireEvent.click(next);

    expect(navigation.replace).toHaveBeenCalledWith("/profissionais?page=2");
  });
});
