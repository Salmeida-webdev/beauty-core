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

import { UsuarioFormDialog } from "@/features/usuarios/components/usuario-form-dialog";

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

const savedUsuario = {
  id: "550e8400-e29b-41d4-a716-446655440020",

  empresaId: "550e8400-e29b-41d4-a716-446655440001",

  nome: "Maria Gerente",

  email: "maria@example.com",

  telefone: null,

  foto: null,

  role: "GERENTE",

  ativo: true,

  ultimoLogin: null,

  createdAt: "2026-08-28T10:00:00.000Z",

  updatedAt: "2026-08-28T10:00:00.000Z",
};

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

describe("UsuarioFormDialog", () => {
  it("ADMIN cria GERENTE sem enviar empresaId", async () => {
    apiPost.mockResolvedValue({
      data: savedUsuario,
    });

    renderWithQuery(
      <UsuarioFormDialog
        mode="create"
        actorId="550e8400-e29b-41d4-a716-446655440099"
        actorRole="ADMIN"
        open
        onOpenChange={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText(/^Nome/), {
      target: {
        value: "Maria Gerente",
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
        nome: "Maria Gerente",

        email: "maria@example.com",

        role: "GERENTE",

        senha: "Senha123",
      });
    });
  });

  it("self update nao envia propria role", async () => {
    const selfUsuario = {
      ...savedUsuario,

      role: "ADMIN" as const,

      nome: "Admin Atual",

      email: "admin@example.com",
    };

    apiPatch.mockResolvedValue({
      data: {
        ...selfUsuario,

        nome: "Admin Atualizado",
      },
    });

    renderWithQuery(
      <UsuarioFormDialog
        mode="edit"
        usuario={selfUsuario}
        actorId={selfUsuario.id}
        actorRole="ADMIN"
        open
        onOpenChange={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText(/^Nome/), {
      target: {
        value: "Admin Atualizado",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Salvar alterações",
      }),
    );

    await waitFor(() => {
      expect(apiPatch).toHaveBeenCalledWith(`/usuarios/${selfUsuario.id}`, {
        nome: "Admin Atualizado",

        email: "admin@example.com",
      });
    });
  });
});
