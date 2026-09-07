import { describe, expect, it } from "vitest";

import { getArquivoTipoLabel } from "@/features/arquivos/utils/arquivo-tipo";

describe("arquivo tipo", () => {
  it("traduz todos os tipos auditados", () => {
    expect(getArquivoTipoLabel("LOGO_EMPRESA")).toBe("Logo da empresa");
    expect(getArquivoTipoLabel("FOTO_CLIENTE")).toBe("Foto de cliente");
    expect(getArquivoTipoLabel("FOTO_USUARIO")).toBe("Foto de usuário");
    expect(getArquivoTipoLabel("FOTO_PROFISSIONAL")).toBe(
      "Foto de profissional",
    );
    expect(getArquivoTipoLabel("IMAGEM_SERVICO")).toBe("Imagem de serviço");
    expect(getArquivoTipoLabel("GALERIA_EMPRESA")).toBe("Galeria");
    expect(getArquivoTipoLabel("DOCUMENTO")).toBe("Documento");
    expect(getArquivoTipoLabel("OUTRO")).toBe("Outro");
  });
});
