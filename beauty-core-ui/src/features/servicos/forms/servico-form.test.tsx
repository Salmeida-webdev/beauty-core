import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ServicoForm } from "@/features/servicos/forms/servico-form";
import { EMPTY_SERVICO_FORM_VALUES } from "@/features/servicos/forms/servico-form.schema";

afterEach(() => {
  cleanup();
});

describe("ServicoForm", () => {
  it("renderiza apenas os campos suportados pelo backend", () => {
    render(
      <ServicoForm
        mode="create"
        initialValues={EMPTY_SERVICO_FORM_VALUES}
        pending={false}
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/Nome/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Duração/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Imagem/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Categoria/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Comissão/i)).not.toBeInTheDocument();
  });

  it("bloqueia submit vazio pela validação Zod", async () => {
    const onSubmit = vi.fn();

    render(
      <ServicoForm
        mode="create"
        initialValues={EMPTY_SERVICO_FORM_VALUES}
        pending={false}
        onCancel={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar serviço" }));

    expect(
      await screen.findByText("Informe ao menos 2 caracteres."),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("envia valores válidos", async () => {
    const onSubmit = vi.fn();

    render(
      <ServicoForm
        mode="create"
        initialValues={EMPTY_SERVICO_FORM_VALUES}
        pending={false}
        onCancel={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText(/Nome/), {
      target: { value: "Limpeza de pele" },
    });
    fireEvent.change(screen.getByLabelText(/Duração/), {
      target: { value: "60" },
    });
    fireEvent.change(screen.getByLabelText(/Preço/), {
      target: { value: "150,00" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Cadastrar serviço" }));

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("bloqueia controles durante envio", () => {
    render(
      <ServicoForm
        mode="edit"
        initialValues={{
          nome: "Limpeza",
          descricao: "",
          duracaoMinutos: "60",
          preco: "150,00",
        }}
        pending
        onCancel={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/Nome/)).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Salvando..." })).toBeDisabled();
  });
});
