import { describe, expect, it } from "vitest";

import {
  canAccessFiles,
  canAccessGallery,
  canDeleteFile,
  canUploadFile,
  canUploadGallery,
} from "@/features/arquivos/permissions/arquivos-permissions";
import {
  arquivoSchema,
  arquivosPageSchema,
} from "@/features/arquivos/schemas/arquivos.schemas";
import { arquivosKeys } from "@/features/arquivos/queries/arquivos-keys";
import {
  formatFileSize,
  getArquivoDisplayName,
} from "@/features/arquivos/utils/arquivos-formatters";
import { getArquivoStatusPresentation } from "@/features/arquivos/utils/arquivo-status";
import {
  DOCUMENT_UPLOAD_MAX_BYTES,
  IMAGE_UPLOAD_MAX_BYTES,
  validateUploadFile,
} from "@/features/arquivos/utils/arquivos-upload-validator";

const arquivoFixture = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  clienteId: null,
  usuarioId: null,
  servicoId: null,
  unidadeId: null,
  tipo: "DOCUMENTO",
  nomeOriginal: "contrato.pdf",
  nomeArquivo: "uuid.pdf",
  mimeType: "application/pdf",
  tamanhoBytes: 1024,
  caminho: "documentos/uuid.pdf",
  url: "/uploads/documentos/uuid.pdf",
  status: "ATIVO",
  visibilidade: "PUBLICO",
  createdAt: "2026-09-02T12:00:00.000Z",
  updatedAt: "2026-09-02T12:00:00.000Z",
};

describe("Chat 55 — foundations de Arquivos", () => {
  it("valida um arquivo real do contrato", () => {
    expect(arquivoSchema.parse(arquivoFixture)).toMatchObject({
      tipo: "DOCUMENTO",
      nomeOriginal: "contrato.pdf",
    });
  });

  it("valida resposta paginada", () => {
    const parsed = arquivosPageSchema.parse({
      data: [arquivoFixture],
      meta: {
        page: 1,
        limit: 10,
        total: 1,
      },
    });

    expect(parsed.data).toHaveLength(1);
    expect(parsed.meta.total).toBe(1);
  });

  it("mantem RBAC administrativo de Arquivos", () => {
    expect(canAccessFiles("ADMIN")).toBe(true);
    expect(canAccessFiles("GERENTE")).toBe(true);
    expect(canAccessFiles("RECEPCAO")).toBe(false);
    expect(canAccessFiles("PROFISSIONAL")).toBe(false);
    expect(canAccessFiles("SUPER_ADMIN")).toBe(false);

    expect(canUploadFile("ADMIN")).toBe(true);
    expect(canDeleteFile("GERENTE")).toBe(true);
  });

  it("preserva leitura ampla da Galeria sem ampliar upload", () => {
    expect(canAccessGallery("RECEPCAO")).toBe(true);
    expect(canAccessGallery("PROFISSIONAL")).toBe(true);
    expect(canUploadGallery("RECEPCAO")).toBe(false);
  });

  it("formata tamanho de arquivo", () => {
    expect(formatFileSize(0)).toBe("0 B");
    expect(formatFileSize(1024)).toBe("1 KB");
    expect(formatFileSize(1536)).toBe("1,5 KB");
    expect(formatFileSize(-1)).toBe("—");
  });

  it("normaliza nome de exibicao", () => {
    expect(getArquivoDisplayName(" contrato.pdf ")).toBe("contrato.pdf");
    expect(getArquivoDisplayName("")).toBe("Arquivo sem nome");
  });

  it("mapeia status sem depender somente de cor", () => {
    expect(getArquivoStatusPresentation("ATIVO")).toEqual({
      label: "Ativo",
      tone: "success",
    });

    expect(getArquivoStatusPresentation("EXCLUIDO")).toEqual({
      label: "Excluído",
      tone: "danger",
    });
  });

  it("espelha os limites auditados de upload", () => {
    expect(IMAGE_UPLOAD_MAX_BYTES).toBe(5 * 1024 * 1024);
    expect(DOCUMENT_UPLOAD_MAX_BYTES).toBe(10 * 1024 * 1024);
  });

  it("aceita PDF valido preventivamente", () => {
    const file = new File(["pdf"], "contrato.pdf", {
      type: "application/pdf",
    });

    expect(validateUploadFile(file, "document")).toEqual({
      valid: true,
      error: null,
    });
  });

  it("rejeita extensao perigosa preventivamente", () => {
    const file = new File(["x"], "payload.exe", {
      type: "application/octet-stream",
    });

    expect(validateUploadFile(file, "document")).toEqual({
      valid: false,
      error: "Selecione um documento PDF.",
    });
  });

  it("cria namespaces de cache sem empresaId", () => {
    expect(
      arquivosKeys.list({
        page: 1,
        limit: 10,
      }),
    ).toEqual([
      "arquivos",
      "list",
      {
        page: 1,
        limit: 10,
      },
    ]);
  });
});
