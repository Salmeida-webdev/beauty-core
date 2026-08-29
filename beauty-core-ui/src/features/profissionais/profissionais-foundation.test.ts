import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  canAccessProfissionais,
  canCreateProfissional,
} from "@/features/profissionais/permissions/profissionais-permissions";
import { profissionaisKeys } from "@/features/profissionais/queries/profissionais-keys";
import { profissionalSchema } from "@/features/profissionais/schemas/profissionais.schemas";
import { profissionaisApi } from "@/features/profissionais/services/profissionais-api";
import type { UpdateProfissionalPayload } from "@/features/profissionais/types/profissionais.types";

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

const profissionalResponse = {
  id: "550e8400-e29b-41d4-a716-446655440030",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  nome: "Ana Profissional",
  email: "ana@beautycore.com",
  telefone: null,
  foto: null,
  role: "PROFISSIONAL",
  ativo: true,
  ultimoLogin: null,
  createdAt: "2026-08-28T10:00:00.000Z",
  updatedAt: "2026-08-28T10:00:00.000Z",
};

const meta = {
  total: 1,
  page: 1,
  limit: 20,
  totalPages: 1,
};

beforeEach(() => {
  apiGet.mockReset();
  apiPost.mockReset();
  apiPatch.mockReset();
});

describe("fundação de Profissionais", () => {
  it("reflete as roles do controller de Usuários", () => {
    expect(canAccessProfissionais("SUPER_ADMIN")).toBe(true);
    expect(canAccessProfissionais("ADMIN")).toBe(true);
    expect(canAccessProfissionais("GERENTE")).toBe(true);
    expect(canAccessProfissionais("PROFISSIONAL")).toBe(false);
    expect(canCreateProfissional("RECEPCAO")).toBe(false);
  });

  it("mantém query keys independentes de Usuários", () => {
    expect(profissionaisKeys.list({})).toEqual([
      "profissionais",
      "list",
      1,
      20,
      null,
      "createdAt",
      "desc",
    ]);
  });

  it("lista sempre com role=PROFISSIONAL no servidor", async () => {
    apiGet.mockResolvedValue({
      data: { data: [profissionalResponse], meta },
    });

    await profissionaisApi.list({ search: " Ana " });

    expect(apiGet).toHaveBeenCalledWith("/usuarios", {
      params: {
        page: 1,
        limit: 20,
        search: "Ana",
        orderBy: "createdAt",
        orderDirection: "desc",
        role: "PROFISSIONAL",
      },
    });
  });

  it("injeta a role no cadastro e nunca permite trocá-la no PATCH", async () => {
    apiPost.mockResolvedValue({ data: profissionalResponse });
    apiPatch.mockResolvedValue({ data: profissionalResponse });

    await profissionaisApi.create({
      nome: "Ana Profissional",
      email: "ana@beautycore.com",
      senha: "SenhaSegura123",
    });

    expect(apiPost).toHaveBeenCalledWith("/usuarios", {
      nome: "Ana Profissional",
      email: "ana@beautycore.com",
      senha: "SenhaSegura123",
      role: "PROFISSIONAL",
    });

    const unsafeUpdate = {
      nome: "Ana Atualizada",
      role: "ADMIN",
    } as unknown as UpdateProfissionalPayload;

    await profissionaisApi.update(profissionalResponse.id, unsafeUpdate);

    expect(apiPatch).toHaveBeenCalledWith(
      `/usuarios/${profissionalResponse.id}`,
      { nome: "Ana Atualizada" },
    );
  });

  it("rejeita usuário que não seja PROFISSIONAL", () => {
    expect(() =>
      profissionalSchema.parse({
        ...profissionalResponse,
        role: "ADMIN",
      }),
    ).toThrow();
  });
});
