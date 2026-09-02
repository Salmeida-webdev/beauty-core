import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  buscarArquivo,
  listarArquivos,
  listarArquivosPorTipo,
  removerArquivo,
  uploadDocumento,
  uploadGaleria,
} from "@/features/arquivos/services/arquivos-api";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  delete: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: mocks.get,
    post: mocks.post,
    delete: mocks.delete,
  }),
}));

const arquivo = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  tipo: "DOCUMENTO",
  nomeOriginal: "contrato.pdf",
  nomeArquivo: "uuid.pdf",
  mimeType: "application/pdf",
  tamanhoBytes: 100,
  url: "/uploads/documentos/uuid.pdf",
  status: "ATIVO",
  visibilidade: "PUBLICO",
};

describe("Arquivos API", () => {
  beforeEach(() => {
    mocks.get.mockReset();
    mocks.post.mockReset();
    mocks.delete.mockReset();
  });

  it("lista somente com page e limit, sem empresaId", async () => {
    mocks.get.mockResolvedValue({
      data: {
        data: [arquivo],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
        },
      },
    });

    await listarArquivos({
      page: 1,
      limit: 10,
    });

    expect(mocks.get).toHaveBeenCalledWith("/arquivos", {
      params: {
        page: 1,
        limit: 10,
      },
    });

    expect(mocks.get.mock.calls[0]?.[1]?.params).not.toHaveProperty(
      "empresaId",
    );
  });

  it("lista por tipo pela rota real", async () => {
    mocks.get.mockResolvedValue({
      data: {
        data: [arquivo],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
        },
      },
    });

    await listarArquivosPorTipo("DOCUMENTO", {
      page: 1,
      limit: 10,
    });

    expect(mocks.get).toHaveBeenCalledWith("/arquivos/tipo/DOCUMENTO", {
      params: {
        page: 1,
        limit: 10,
      },
    });
  });

  it("busca detalhe pela rota real", async () => {
    mocks.get.mockResolvedValue({
      data: arquivo,
    });

    await buscarArquivo(arquivo.id);

    expect(mocks.get).toHaveBeenCalledWith(`/arquivos/${arquivo.id}`);
  });

  it("faz upload de documento com FormData sem empresaId", async () => {
    mocks.post.mockResolvedValue({
      data: arquivo,
    });

    const file = new File(["pdf"], "contrato.pdf", {
      type: "application/pdf",
    });

    await uploadDocumento(file);

    expect(mocks.post).toHaveBeenCalledWith(
      "/arquivos/documentos",
      expect.any(FormData),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    const payload = mocks.post.mock.calls[0]?.[1];

    expect(payload).toBeInstanceOf(FormData);

    if (!(payload instanceof FormData)) {
      throw new Error("Payload deveria ser FormData.");
    }

    expect(payload.get("file")).toBe(file);
    expect(payload.has("empresaId")).toBe(false);
  });

  it("respeita multi-upload apenas da Galeria", async () => {
    mocks.post.mockResolvedValue({
      data: [arquivo, arquivo],
    });

    const first = new File(["a"], "a.png", {
      type: "image/png",
    });
    const second = new File(["b"], "b.webp", {
      type: "image/webp",
    });

    await uploadGaleria([first, second]);

    const payload = mocks.post.mock.calls[0]?.[1];

    expect(payload).toBeInstanceOf(FormData);

    if (!(payload instanceof FormData)) {
      throw new Error("Payload deveria ser FormData.");
    }

    expect(payload.getAll("files")).toHaveLength(2);
    expect(payload.has("empresaId")).toBe(false);
  });

  it("remove pelo endpoint real sem body arbitrario", async () => {
    mocks.delete.mockResolvedValue({
      data: {
        message: "Arquivo removido com sucesso.",
      },
    });

    await removerArquivo(arquivo.id);

    expect(mocks.delete).toHaveBeenCalledWith(`/arquivos/${arquivo.id}`);
  });
});
