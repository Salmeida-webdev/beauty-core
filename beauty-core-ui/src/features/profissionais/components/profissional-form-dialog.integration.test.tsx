import type { ReactNode } from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ProfissionalFormDialog } from "@/features/profissionais/components/profissional-form-dialog";

type ApiResponse = Promise<{
  data: unknown;
}>;

type ApiPost = (url: string, payload?: unknown) => ApiResponse;

type ApiPatch = (url: string, payload?: unknown) => ApiResponse;

const apiPost = vi.hoisted(() => vi.fn<ApiPost>());

const apiPatch = vi.hoisted(() => vi.fn<ApiPatch>());

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    post: apiPost,

    patch: apiPatch,
  }),
}));

const profissional = {
  id: "550e8400-e29b-41d4-a716-446655440020",

  empresaId: "550e8400-e29b-41d4-a716-446655440001",

  nome: "Maria Profissional",

  email: "maria@example.com",

  telefone: null,

  foto: null,

  role: "PROFISSIONAL",

  ativo: true,

  ultimoLogin: null,

  createdAt: "2026-08-28T10:00:00.000Z",

  updatedAt: "2026-08-28T10:00:00.000Z",
} as const;

const clients: QueryClient[] = [];

function renderWithQuery(node: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },

      mutations: {
        retry: false,
      },
    },
  });

  clients.push(queryClient);

  return render(
    <QueryClientProvider client={queryClient}>{node}</QueryClientProvider>,
  );
}

beforeEach(() => {
  apiPost.mockReset();
  apiPatch.mockReset();
});

afterEach(() => {
  cleanup();

  for (const client of clients.splice(0)) {
    client.clear();
  }
});

describe("ProfissionalFormDialog", () => {
  it("cadastra sempre com role PROFISSIONAL", async () => {
    apiPost.mockResolvedValue({
      data: profissional,
    });

    renderWithQuery(
      <ProfissionalFormDialog
        mode="create"
        actorId="550e8400-e29b-41d4-a716-446655440099"
        actorRole="ADMIN"
        open
        onOpenChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/^Perfil/)).toBeDisabled();

    expect(screen.getByLabelText(/^Perfil/)).toHaveValue("Profissional");

    fireEvent.change(screen.getByLabelText(/^Nome/), {
      target: {
        value: "Maria Profissional",
      },
    });

    fireEvent.change(screen.getByLabelText(/^E-mail/), {
      target: {
        value: "MARIA@EXAMPLE.COM",
      },
    });

    fireEvent.change(screen.getByLabelText(/^Senha/), {
      target: {
        value: "Senha123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cadastrar usuário",
      }),
    );

    await waitFor(() => {
      expect(apiPost).toHaveBeenCalledWith("/usuarios", {
        nome: "Maria Profissional",

        email: "maria@example.com",

        role: "PROFISSIONAL",

        senha: "Senha123",
      });
    });
  });

  it("edita sem permitir troca de role", async () => {
    apiPatch.mockResolvedValue({
      data: {
        ...profissional,

        nome: "Maria Atualizada",
      },
    });

    renderWithQuery(
      <ProfissionalFormDialog
        mode="edit"
        profissional={profissional}
        actorId="550e8400-e29b-41d4-a716-446655440099"
        actorRole="GERENTE"
        open
        onOpenChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/^Perfil/)).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/^Nome/), {
      target: {
        value: "Maria Atualizada",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Salvar alterações",
      }),
    );

    await waitFor(() => {
      expect(apiPatch).toHaveBeenCalledWith(`/usuarios/${profissional.id}`, {
        nome: "Maria Atualizada",

        email: "maria@example.com",
      });
    });
  });
});
