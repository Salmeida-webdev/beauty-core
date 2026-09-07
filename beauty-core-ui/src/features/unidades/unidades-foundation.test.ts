import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  canAccessUnidades,
  canCreateUnidade,
} from "@/features/unidades/permissions/unidades-permissions";
import { unidadesKeys } from "@/features/unidades/queries/unidades-keys";
import { unidadesApi } from "@/features/unidades/services/unidades-api";
import type { UpdateUnidadePayload } from "@/features/unidades/types/unidades.types";

type ApiResponse = Promise<{ data: unknown }>;
type ApiGet = (url: string) => ApiResponse;
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

const unidadeResponse = {
  id: "550e8400-e29b-41d4-a716-446655440010",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  nome: "Unidade Centro",
  telefone: null,
  email: null,
  endereco: null,
  ativa: true,
  createdAt: "2026-08-28T10:00:00.000Z",
  updatedAt: "2026-08-28T10:00:00.000Z",
};

beforeEach(() => {
  apiGet.mockReset();
  apiPost.mockReset();
  apiPatch.mockReset();
});

describe("fundação de Unidades", () => {
  it("reflete as roles reais do controller", () => {
    expect(canAccessUnidades("ADMIN")).toBe(true);
    expect(canAccessUnidades("GERENTE")).toBe(true);
    expect(canAccessUnidades("SUPER_ADMIN")).toBe(false);
    expect(canAccessUnidades("RECEPCAO")).toBe(false);
    expect(canCreateUnidade("PROFISSIONAL")).toBe(false);
  });

  it("mantém query keys sem paginação fictícia", () => {
    expect(unidadesKeys.list()).toEqual(["unidades", "list"]);
  });

  it("lista unidades pelo endpoint real", async () => {
    apiGet.mockResolvedValue({ data: [unidadeResponse] });

    await expect(unidadesApi.list()).resolves.toEqual([unidadeResponse]);

    expect(apiGet).toHaveBeenCalledWith("/unidades");
  });

  it("remove campos fora do DTO antes do PATCH", async () => {
    apiPatch.mockResolvedValue({ data: unidadeResponse });

    const payload = {
      nome: "Unidade Premium",
      ativa: false,
      cidade: "João Pessoa",
    } as unknown as UpdateUnidadePayload;

    await unidadesApi.update(unidadeResponse.id, payload);

    expect(apiPatch).toHaveBeenCalledWith(`/unidades/${unidadeResponse.id}`, {
      nome: "Unidade Premium",
    });
  });
});
