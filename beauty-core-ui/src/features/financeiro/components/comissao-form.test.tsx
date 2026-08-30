import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComissaoForm } from "@/features/financeiro/components/comissao-form";

afterEach(() => {
  cleanup();
});

describe("ComissaoForm", () => {
  it("expõe somente campos do DTO real", () => {
    render(<ComissaoForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText("ID do profissional")).toBeInTheDocument();

    expect(screen.getByLabelText("ID do agendamento")).toBeInTheDocument();

    expect(screen.getByLabelText("Valor do serviço")).toBeInTheDocument();

    expect(screen.getByLabelText("Percentual")).toBeInTheDocument();

    expect(
      screen.queryByLabelText("Valor da comissão"),
    ).not.toBeInTheDocument();

    expect(screen.queryByLabelText("Status")).not.toBeInTheDocument();
  });

  it("explica autoridade do backend", () => {
    render(<ComissaoForm onSubmit={vi.fn()} />);

    expect(screen.getByText(/calculado pelo backend/i)).toBeInTheDocument();
  });

  it("bloqueia submit durante mutation", () => {
    render(<ComissaoForm pending onSubmit={vi.fn()} />);

    expect(
      screen.getByRole("button", {
        name: "Criando...",
      }),
    ).toBeDisabled();
  });
});
