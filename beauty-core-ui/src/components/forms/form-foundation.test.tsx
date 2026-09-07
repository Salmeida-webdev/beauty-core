import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  FormActions,
  FormField,
  FormGrid,
  FormSection,
} from "@/components/forms/form-foundation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

describe("form foundation", () => {
  it("associa label, descrição e erro ao campo", () => {
    render(
      <FormField
        id="customer-name"
        label="Nome"
        description="Nome completo."
        error="Campo inválido."
        required
      >
        <Input id="customer-name" />
      </FormField>,
    );

    expect(
      screen.getByLabelText(/Nome/),
    ).toHaveAttribute(
      "id",
      "customer-name",
    );

    expect(
      screen.getByText("Nome completo."),
    ).toHaveAttribute(
      "id",
      "customer-name-description",
    );

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent(
      "Campo inválido.",
    );

    expect(
      screen.getByText("obrigatório"),
    ).toHaveClass("sr-only");
  });

  it("renderiza seção, grid e ações", () => {
    render(
      <FormSection
        title="Cadastro"
        description="Dados administrativos."
      >
        <FormGrid>
          <div>Campo A</div>
          <div>Campo B</div>
        </FormGrid>

        <FormActions>
          <Button>
            Salvar
          </Button>
        </FormActions>
      </FormSection>,
    );

    expect(
      screen.getByRole("heading", {
        name: "Cadastro",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Dados administrativos."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Salvar",
      }),
    ).toBeInTheDocument();
  });
});