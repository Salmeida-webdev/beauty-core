import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  canAccessServicos,
  canCreateServico,
} from "@/features/servicos/permissions/servicos-permissions";
import { servicosKeys } from "@/features/servicos/queries/servicos-keys";
import { servicosApi } from "@/features/servicos/services/servicos-api";
import type { UpdateServicoPayload } from "@/features/servicos/types/servicos.types";

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

const servicoResponse = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  nome: "Limpeza de pele",
  descricao: null,
  duracaoMinutos: 60,
  preco: "150.00",
  imagem: null,
  ativo: true,
  createdAt: "2026-08-28T10:00:00.000Z",
  updatedAt: "2026-08-28T10:00:00.000Z",
};

beforeEach(() => {
  apiGet.mockReset();
  apiPost.mockReset();
  apiPatch.mockReset();
});

describe("fundação de Serviços", () => {
  it("reflete as roles reais de leitura e gestão", () => {
    expect(canAccessServicos("RECEPCAO")).toBe(true);
    expect(canAccessServicos("PROFISSIONAL")).toBe(true);
    expect(canAccessServicos("SUPER_ADMIN")).toBe(false);
    expect(canCreateServico("ADMIN")).toBe(true);
    expect(canCreateServico("GERENTE")).toBe(true);
    expect(canCreateServico("RECEPCAO")).toBe(false);
  });

  it("mantém query keys sem filtros inexistentes", () => {
    expect(servicosKeys.list()).toEqual(["servicos", "list"]);
    expect(servicosKeys.detail("servico-1")).toEqual([
      "servicos",
      "detail",
      "servico-1",
    ]);
  });

  it("lista pelo endpoint real e normaliza Decimal", async () => {
    apiGet.mockResolvedValue({ data: [servicoResponse] });

    const result = await servicosApi.list();

    expect(apiGet).toHaveBeenCalledWith("/servicos");
    expect(result[0]?.preco).toBe(150);
  });

  it("não envia imagem ignorada pelo service do backend", async () => {
    apiPatch.mockResolvedValue({ data: servicoResponse });

    const payload = {
      nome: "Limpeza premium",
      imagem: "/imagem-ignorada.png",
    } as unknown as UpdateServicoPayload;

    await servicosApi.update(servicoResponse.id, payload);

    expect(apiPatch).toHaveBeenCalledWith(`/servicos/${servicoResponse.id}`, {
      nome: "Limpeza premium",
    });
  });
});
