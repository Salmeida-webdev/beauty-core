import { beforeEach, describe, expect, it, vi } from "vitest";

import { uploadLogoEmpresa } from "@/features/configuracoes/services/configuracoes-api";

const mocks = vi.hoisted(() => ({
  post: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    post: mocks.post,
  }),
}));

describe("Configuracoes API", () => {
  beforeEach(() => {
    mocks.post.mockReset();
  });

  it("usa o endpoint real de logo sem enviar empresaId", async () => {
    mocks.post.mockResolvedValue({
      data: {
        id: "550e8400-e29b-41d4-a716-446655440000",
        empresaId: "550e8400-e29b-41d4-a716-446655440001",
        tipo: "LOGO_EMPRESA",
        nomeOriginal: "logo.png",
        nomeArquivo: "uuid.png",
        mimeType: "image/png",
        tamanhoBytes: 200,
        url: "/uploads/logos/uuid.png",
        status: "ATIVO",
        visibilidade: "PUBLICO",
      },
    });

    const file = new File(["logo"], "logo.png", {
      type: "image/png",
    });

    const result = await uploadLogoEmpresa(file);

    expect(result.tipo).toBe("LOGO_EMPRESA");

    expect(mocks.post).toHaveBeenCalledWith(
      "/arquivos/logo",
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
});
