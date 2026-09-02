import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Arquivo } from "@/features/arquivos/types/arquivos.types";
import {
  baixarArquivoPublico,
  isArquivoPublicoBaixavel,
} from "@/features/arquivos/utils/arquivos-download";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: mocks.get,
  }),
}));

const arquivoPublico: Arquivo = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  tipo: "DOCUMENTO",
  nomeOriginal: "contrato.pdf",
  nomeArquivo: "uuid.pdf",
  mimeType: "application/pdf",
  tamanhoBytes: 100,
  url: "/uploads/public/documentos/uuid.pdf",
  status: "ATIVO",
  visibilidade: "PUBLICO",
};

describe("arquivos download", () => {
  beforeEach(() => {
    mocks.get.mockReset();

    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: vi.fn(() => "blob:arquivo-test"),
    });

    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: vi.fn(),
    });

    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(
      () => undefined,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("habilita somente URL publica de uploads", () => {
    expect(isArquivoPublicoBaixavel(arquivoPublico)).toBe(true);

    expect(
      isArquivoPublicoBaixavel({
        ...arquivoPublico,
        visibilidade: "PRIVADO",
      }),
    ).toBe(false);

    expect(
      isArquivoPublicoBaixavel({
        ...arquivoPublico,
        url: "javascript:alert(1)",
      }),
    ).toBe(false);

    expect(
      isArquivoPublicoBaixavel({
        ...arquivoPublico,
        url: "/uploads/../segredo.pdf",
      }),
    ).toBe(false);
  });

  it("baixa pelo URL retornado pelo backend e revoga blob", async () => {
    const blob = new Blob(["pdf"], {
      type: "application/pdf",
    });

    mocks.get.mockResolvedValue({
      data: blob,
    });

    await baixarArquivoPublico(arquivoPublico);

    expect(mocks.get).toHaveBeenCalledWith(
      "/uploads/public/documentos/uuid.pdf",
      {
        responseType: "blob",
      },
    );

    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:arquivo-test");
  });

  it("rejeita URL nao publica", async () => {
    await expect(
      baixarArquivoPublico({
        ...arquivoPublico,
        url: "https://externo.example/arquivo.pdf",
      }),
    ).rejects.toThrow("URL pública segura");
  });
});
