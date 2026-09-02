import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArquivoUploadDialog } from "@/features/arquivos/components/arquivo-upload-dialog";

afterEach(() => {
  cleanup();
});

function renderDialog(
  overrides?: Partial<{
    onOpenChange: (open: boolean) => void;
    onUploadDocument: (file: File) => Promise<void>;
    onUploadGallery: (files: readonly File[]) => Promise<void>;
    isUploading: boolean;
  }>,
) {
  const onOpenChange = overrides?.onOpenChange ?? vi.fn();
  const onUploadDocument =
    overrides?.onUploadDocument ?? vi.fn().mockResolvedValue(undefined);
  const onUploadGallery =
    overrides?.onUploadGallery ?? vi.fn().mockResolvedValue(undefined);

  render(
    <ArquivoUploadDialog
      open
      onOpenChange={onOpenChange}
      onUploadDocument={onUploadDocument}
      onUploadGallery={onUploadGallery}
      isUploading={overrides?.isUploading ?? false}
    />,
  );

  return {
    onOpenChange,
    onUploadDocument,
    onUploadGallery,
  };
}

describe("ArquivoUploadDialog", () => {
  it("envia PDF válido", async () => {
    const { onOpenChange, onUploadDocument } = renderDialog();

    const input = screen.getByLabelText("Documento PDF");

    const file = new File(["pdf"], "contrato.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(input, {
      target: {
        files: [file],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Enviar",
      }),
    );

    await waitFor(() => {
      expect(onUploadDocument).toHaveBeenCalledWith(file);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("bloqueia documento com extensão inválida", () => {
    const { onUploadDocument } = renderDialog();

    const file = new File(["x"], "payload.exe", {
      type: "application/octet-stream",
    });

    fireEvent.change(screen.getByLabelText("Documento PDF"), {
      target: {
        files: [file],
      },
    });

    expect(screen.getByText("Selecione um documento PDF.")).toBeInTheDocument();

    expect(onUploadDocument).not.toHaveBeenCalled();
  });

  it("envia múltiplas imagens válidas para a galeria", async () => {
    const { onUploadGallery } = renderDialog();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Galeria",
      }),
    );

    const first = new File(["a"], "a.jpg", {
      type: "image/jpeg",
    });

    const second = new File(["b"], "b.webp", {
      type: "image/webp",
    });

    fireEvent.change(screen.getByLabelText("Imagens da galeria"), {
      target: {
        files: [first, second],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Enviar",
      }),
    );

    await waitFor(() => {
      expect(onUploadGallery).toHaveBeenCalledWith([first, second]);
    });
  });

  it("bloqueia mais de dez imagens", () => {
    const { onUploadGallery } = renderDialog();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Galeria",
      }),
    );

    const files = Array.from(
      {
        length: 11,
      },
      (_, index) =>
        new File(["x"], `imagem-${index}.png`, {
          type: "image/png",
        }),
    );

    fireEvent.change(screen.getByLabelText("Imagens da galeria"), {
      target: {
        files,
      },
    });

    expect(
      screen.getByText("Selecione no máximo 10 imagens por envio."),
    ).toBeInTheDocument();

    expect(onUploadGallery).not.toHaveBeenCalled();
  });

  it("mantém controles desabilitados durante upload", () => {
    renderDialog({
      isUploading: true,
    });

    expect(
      screen.getByRole("button", {
        name: "Enviando...",
      }),
    ).toBeDisabled();

    expect(screen.getByLabelText("Documento PDF")).toBeDisabled();
  });
});
