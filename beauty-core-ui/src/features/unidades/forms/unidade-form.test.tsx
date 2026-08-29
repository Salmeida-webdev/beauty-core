import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { UnidadeForm } from "@/features/unidades/forms/unidade-form";
import { EMPTY_UNIDADE_FORM_VALUES } from "@/features/unidades/forms/unidade-form.schema";

afterEach(() => cleanup());

describe("UnidadeForm", () => {
  const base = {
    mode: "create" as const,
    initialValues: EMPTY_UNIDADE_FORM_VALUES,
    pending: false,
    onCancel: vi.fn(),
    onSubmit: vi.fn(),
  };

  it("renderiza só campos reais", () => {
    render(<UnidadeForm {...base} />);

    for (const name of [/Nome/, /Telefone/, /Email/, /Endereço/]) {
      expect(screen.getByLabelText(name)).toBeInTheDocument();
    }

    for (const name of [/CEP/i, /Cidade/i, /Estado/i]) {
      expect(screen.queryByLabelText(name)).not.toBeInTheDocument();
    }
  });

  it("bloqueia submit sem nome", async () => {
    const onSubmit = vi.fn();

    render(<UnidadeForm {...base} onSubmit={onSubmit} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cadastrar unidade",
      }),
    );

    expect(
      await screen.findByText("Informe ao menos 2 caracteres."),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("envia valores válidos", async () => {
    const onSubmit = vi.fn();

    render(<UnidadeForm {...base} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nome/), {
      target: { value: "Centro" },
    });

    fireEvent.change(screen.getByLabelText(/Email/), {
      target: { value: "c@e.com" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cadastrar unidade",
      }),
    );

    await vi.waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it("bloqueia durante envio", () => {
    render(
      <UnidadeForm
        mode="edit"
        initialValues={{
          nome: "Centro",
          telefone: "",
          email: "",
          endereco: "",
        }}
        pending
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/Nome/)).toBeDisabled();

    expect(
      screen.getByRole("button", {
        name: "Cancelar",
      }),
    ).toBeDisabled();

    expect(
      screen.getByRole("button", {
        name: "Salvando...",
      }),
    ).toBeDisabled();
  });
});
