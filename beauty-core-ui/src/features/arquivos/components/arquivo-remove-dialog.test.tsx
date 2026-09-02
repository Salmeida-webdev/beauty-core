import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArquivoRemoveDialog } from "@/features/arquivos/components/arquivo-remove-dialog";
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
  url: "/uploads/documentos/uuid.pdf",
  status: "ATIVO",
  visibilidade: "PUBLICO",
};

describe("ArquivoRemoveDialog", () => {
  it("explica que a acao nao e exclusao fisica", () => {
    render(
      <ArquivoRemoveDialog
        arquivo={arquivo}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn().mockResolvedValue(undefined)}
        isRemoving={false}
      />,
    );

    expect(
      screen.getByText(/marcará este registro como excluído/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/não é apresentada como exclusão física/i),
    ).toBeInTheDocument();
  });

  it("confirma usando o arquivo real", async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    const onOpenChange = vi.fn();

    render(
      <ArquivoRemoveDialog
        arquivo={arquivo}
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
        isRemoving={false}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Remover arquivo",
      }),
    );

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith(arquivo);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("mantem acao desabilitada durante mutation", () => {
    render(
      <ArquivoRemoveDialog
        arquivo={arquivo}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn().mockResolvedValue(undefined)}
        isRemoving
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Removendo...",
      }),
    ).toBeDisabled();
  });
});
