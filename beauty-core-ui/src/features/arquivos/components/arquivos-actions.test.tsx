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
  tipo: "DOCUMENTO",
  nomeOriginal: "contrato.pdf",
  nomeArquivo: "uuid.pdf",
  mimeType: "application/pdf",
  tamanhoBytes: 100,
  url: "/uploads/public/documentos/uuid.pdf",
  status: "ATIVO",
  visibilidade: "PUBLICO",
};

describe("ArquivosList actions", () => {
  it("permite download somente do publico baixavel", () => {
    const onDownload = vi.fn();

    render(
      <ArquivosList
        arquivos={[arquivo]}
        onOpenDetails={vi.fn()}
        onDownload={onDownload}
        onRemove={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Baixar contrato.pdf",
      }),
    );

    expect(onDownload).toHaveBeenCalledWith(arquivo);
  });

  it("nao mostra download para arquivo privado", () => {
    render(
      <ArquivosList
        arquivos={[
          {
            ...arquivo,
            visibilidade: "PRIVADO",
          },
        ]}
        onOpenDetails={vi.fn()}
        onDownload={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "Baixar contrato.pdf",
      }),
    ).not.toBeInTheDocument();
  });

  it("abre confirmacao de remocao", () => {
    const onRemove = vi.fn();

    render(
      <ArquivosList
        arquivos={[arquivo]}
        onOpenDetails={vi.fn()}
        onDownload={vi.fn()}
        onRemove={onRemove}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Remover contrato.pdf",
      }),
    );

    expect(onRemove).toHaveBeenCalledWith(arquivo);
  });
});
