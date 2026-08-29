import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  canAccessUsuarios,
  canCreateUsuario,
  canDeactivateUsuario,
  canEditUsuario,
} from "@/features/usuarios/permissions/usuarios-permissions";
import { usuariosKeys } from "@/features/usuarios/queries/usuarios-keys";
import { usuariosApi } from "@/features/usuarios/services/usuarios-api";

type ApiResponse = Promise<{ data: unknown }>;
type ApiGet = (url: string, config?: unknown) => ApiResponse;
type ApiPost = (url: string, payload?: unknown) => ApiResponse;
type ApiPatch = (url: string, payload?: unknown) => ApiResponse;

const apiGet = vi.hoisted(() => vi.fn<ApiGet>());
const apiPost = vi.hoisted(() => vi.fn<ApiPost>());
const apiPatch = vi.hoisted(() => vi.fn<ApiPatch>());

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: apiGet,
    post: apiPost,
    patch: apiPatch,
  }),
}));

const usuarioResponse = {
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

const meta = {
  total: 1,
  page: 2,
  limit: 20,
  totalPages: 1,
};

beforeEach(() => {
  apiGet.mockReset();
  apiPost.mockReset();
  apiPatch.mockReset();
});

describe("fundação de Usuários", () => {
  it("reflete acesso e self-management reais", () => {
    expect(canAccessUsuarios("SUPER_ADMIN")).toBe(true);
    expect(canAccessUsuarios("ADMIN")).toBe(true);
    expect(canAccessUsuarios("GERENTE")).toBe(true);
    expect(canAccessUsuarios("RECEPCAO")).toBe(false);
    expect(canCreateUsuario("GERENTE")).toBe(true);

    expect(
      canEditUsuario({
        actorId: "admin-1",
        actorRole: "ADMIN",
        targetId: "admin-1",
        targetRole: "ADMIN",
      }),
    ).toBe(true);

    expect(
      canDeactivateUsuario({
        actorId: "admin-1",
        actorRole: "ADMIN",
        targetId: "admin-1",
        targetRole: "ADMIN",
      }),
    ).toBe(false);
  });

  it("inclui o filtro server-side de role na chave", () => {
    expect(
      usuariosKeys.list({
        page: 2,
        role: "PROFISSIONAL",
      }),
    ).toEqual([
      "usuarios",
      "list",
      2,
      20,
      null,
      "createdAt",
      "desc",
      "PROFISSIONAL",
    ]);
  });

  it("envia somente query params suportados", async () => {
    apiGet.mockResolvedValue({
      data: { data: [usuarioResponse], meta },
    });

    await usuariosApi.list({
      page: 2,
      search: " Maria ",
      role: "PROFISSIONAL",
    });

    expect(apiGet).toHaveBeenCalledWith("/usuarios", {
      params: {
        page: 2,
        limit: 20,
        search: "Maria",
        orderBy: "createdAt",
        orderDirection: "desc",
        role: "PROFISSIONAL",
      },
    });
  });

  it("normaliza e-mail sem alterar a senha", async () => {
    apiPost.mockResolvedValue({ data: usuarioResponse });

    await usuariosApi.create({
      nome: "Maria Gerente",
      email: " MARIA@BEAUTYCORE.COM ",
      role: "GERENTE",
      senha: "SenhaSegura123",
    });

    expect(apiPost).toHaveBeenCalledWith("/usuarios", {
      nome: "Maria Gerente",
      email: "maria@beautycore.com",
      role: "GERENTE",
      senha: "SenhaSegura123",
    });
  });
});
