import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArquivosList } from "@/features/arquivos/components/arquivos-list";
import type { Arquivo } from "@/features/arquivos/types/arquivos.types";

afterEach(() => {
  cleanup();
});

const arquivo: Arquivo = {
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
  tamanhoBytes: 1536,
  url: "/uploads/documentos/uuid.pdf",
  status: "ATIVO",
  visibilidade: "PUBLICO",
  createdAt: "2026-09-02T12:00:00.000Z",
  updatedAt: "2026-09-02T12:00:00.000Z",
};

describe("ArquivosList", () => {
  it("renderiza os metadados principais", () => {
    render(<ArquivosList arquivos={[arquivo]} onOpenDetails={vi.fn()} />);

    expect(screen.getByText("contrato.pdf")).toBeInTheDocument();
    expect(screen.getByText("Documento")).toBeInTheDocument();
    expect(screen.getByText("1,5 KB")).toBeInTheDocument();
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  it("abre detalhe pelo id real", () => {
    const onOpenDetails = vi.fn();

    render(<ArquivosList arquivos={[arquivo]} onOpenDetails={onOpenDetails} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Ver detalhes de contrato.pdf",
      }),
    );

    expect(onOpenDetails).toHaveBeenCalledWith(arquivo.id);
  });

  it("exibe estado vazio sem inventar dados", () => {
    render(<ArquivosList arquivos={[]} onOpenDetails={vi.fn()} />);

    expect(screen.getByText("Nenhum arquivo encontrado")).toBeInTheDocument();
  });
});
