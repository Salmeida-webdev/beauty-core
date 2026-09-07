import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  EmptyState,
  ErrorState,
  LoadingState,
  PermissionState,
} from "@/components/states/feedback-states";
import { Button } from "@/components/ui/button";

describe("feedback states", () => {
  it("expõe loading de forma acessível", () => {
    render(<LoadingState />);

    const state = screen.getByRole("status", {
      name: "Carregando conteúdo",
    });

    expect(state).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });

  it("renderiza estado vazio com ação", () => {
    render(
      <EmptyState
        title="Sem clientes"
        action={
          <Button>
            Criar cliente
          </Button>
        }
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Sem clientes",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Criar cliente",
      }),
    ).toBeInTheDocument();
  });

  it("executa retry no estado de erro", () => {
    const onRetry = vi.fn();

    render(
      <ErrorState onRetry={onRetry} />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Tentar novamente",
      }),
    );

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renderiza estado de permissão", () => {
    render(<PermissionState />);

    expect(
      screen.getByRole("heading", {
        name: "Acesso não permitido",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /não possui permissão/i,
      ),
    ).toBeInTheDocument();
  });
});