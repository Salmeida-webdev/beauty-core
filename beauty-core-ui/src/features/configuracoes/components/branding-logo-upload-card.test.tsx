import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BrandingLogoUploadCard } from "@/features/configuracoes/components/branding-logo-upload-card";

afterEach(() => {
  cleanup();
});

describe("BrandingLogoUploadCard", () => {
  it("envia imagem valida", async () => {
    const onUpload = vi.fn().mockResolvedValue(undefined);

    render(<BrandingLogoUploadCard onUpload={onUpload} isUploading={false} />);

    const file = new File(["logo"], "logo.png", {
      type: "image/png",
    });

    fireEvent.change(screen.getByLabelText("Arquivo da logo"), {
      target: {
        files: [file],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Enviar logo",
      }),
    );

    await waitFor(() => {
      expect(onUpload).toHaveBeenCalledWith(file);
    });
  });

  it("bloqueia arquivo que nao e imagem permitida", () => {
    const onUpload = vi.fn();

    render(<BrandingLogoUploadCard onUpload={onUpload} isUploading={false} />);

    const file = new File(["pdf"], "logo.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(screen.getByLabelText("Arquivo da logo"), {
      target: {
        files: [file],
      },
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();

    expect(onUpload).not.toHaveBeenCalled();
  });

  it("nao aceita SVG no input", () => {
    render(<BrandingLogoUploadCard onUpload={vi.fn()} isUploading={false} />);

    const input = screen.getByLabelText<HTMLInputElement>("Arquivo da logo");

    expect(input.accept).not.toContain("svg");
  });

  it("desabilita envio durante mutation", () => {
    render(<BrandingLogoUploadCard onUpload={vi.fn()} isUploading />);

    expect(
      screen.getByRole("button", {
        name: "Enviando...",
      }),
    ).toBeDisabled();

    expect(screen.getByLabelText("Arquivo da logo")).toBeDisabled();
  });
});
