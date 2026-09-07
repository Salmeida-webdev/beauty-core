import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

describe("PageHeader", () => {
  it("renderiza hierarquia e metadados", () => {
    render(
      <PageHeader
        eyebrow="Beauty Core"
        title="Clientes"
        description="Gestão de clientes."
        meta="Atualizado agora"
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Clientes",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Beauty Core"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Gestão de clientes."),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Atualizado agora"),
    ).toBeInTheDocument();
  });

  it("renderiza área de ações acessível", () => {
    render(
      <PageHeader
        title="Agenda"
        actions={
          <Button>
            Novo horário
          </Button>
        }
      />,
    );

    expect(
      screen.getByLabelText("Ações da página"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Novo horário",
      }),
    ).toBeInTheDocument();
  });
});