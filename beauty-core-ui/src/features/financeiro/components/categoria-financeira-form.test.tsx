import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CategoriaFinanceiraForm } from "@/features/financeiro/components/categoria-financeira-form";
afterEach(() => {
  cleanup();
});

describe("CategoriaFinanceiraForm", () => {
  it("expõe nome e tipo", () => {
    render(
      <CategoriaFinanceiraForm
        submitLabel="Salvar categoria"
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();

    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
  });

  it("submete dados válidos", async () => {
    const onSubmit = vi.fn();

    render(
      <CategoriaFinanceiraForm
        submitLabel="Salvar categoria"
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: {
        value: "Energia",
      },
    });

    fireEvent.change(screen.getByLabelText("Tipo"), {
      target: {
        value: "DESPESA",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Salvar categoria",
      }),
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
