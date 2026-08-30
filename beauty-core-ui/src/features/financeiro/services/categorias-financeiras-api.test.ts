import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createCategoriaFinanceira,
  getCategoriaFinanceira,
  inativarCategoriaFinanceira,
  listCategoriasFinanceiras,
  updateCategoriaFinanceira,
} from "@/features/financeiro/services/categorias-financeiras-api";

const { mockGet, mockPost, mockPatch } = vi.hoisted(() => ({
  mockGet: vi.fn(),
  mockPost: vi.fn(),
  mockPatch: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: mockGet,
    post: mockPost,
    patch: mockPatch,
  }),
}));

const categoria = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  nome: "Serviços",
  tipo: "RECEITA",
  ativo: true,
  createdAt: "2026-08-29T10:00:00.000Z",
  updatedAt: "2026-08-29T10:00:00.000Z",
};

describe("categorias financeiras api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lista pelo endpoint real", async () => {
    mockGet.mockResolvedValue({
      data: [categoria],
    });

    await expect(listCategoriasFinanceiras()).resolves.toEqual([categoria]);

    expect(mockGet).toHaveBeenCalledWith("/categorias-financeiras");
  });

  it("consulta detalhe pelo endpoint real", async () => {
    mockGet.mockResolvedValue({
      data: categoria,
    });

    await getCategoriaFinanceira(categoria.id);

    expect(mockGet).toHaveBeenCalledWith(
      `/categorias-financeiras/${categoria.id}`,
    );
  });

  it("cria sem empresaId", async () => {
    mockPost.mockResolvedValue({
      data: categoria,
    });

    const payload = {
      nome: "Serviços",
      tipo: "RECEITA" as const,
    };

    await createCategoriaFinanceira(payload);

    expect(mockPost).toHaveBeenCalledWith("/categorias-financeiras", payload);

    expect(payload).not.toHaveProperty("empresaId");
  });

  it("edita por PATCH do recurso", async () => {
    mockPatch.mockResolvedValue({
      data: {
        ...categoria,
        nome: "Procedimentos",
      },
    });

    await updateCategoriaFinanceira(categoria.id, {
      nome: "Procedimentos",
    });

    expect(mockPatch).toHaveBeenCalledWith(
      `/categorias-financeiras/${categoria.id}`,
      {
        nome: "Procedimentos",
      },
    );
  });

  it("inativa pela rota dedicada", async () => {
    mockPatch.mockResolvedValue({
      data: {
        ...categoria,
        ativo: false,
      },
    });

    await inativarCategoriaFinanceira(categoria.id);

    expect(mockPatch).toHaveBeenCalledWith(
      `/categorias-financeiras/${categoria.id}/inativar`,
    );
  });
});
