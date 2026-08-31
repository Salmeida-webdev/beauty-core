import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  AutomacaoEventoForm,
} from "./automacao-evento-form";

afterEach(() => {
  cleanup();
});

describe("Chat 54 — AutomacaoEventoForm", () => {
  it("renderiza tipo e módulo", () => {
    render(
      <AutomacaoEventoForm
        isSubmitting={false}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Tipo do evento"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Módulo de origem"),
    ).toBeInTheDocument();
  });

  it("exige módulo antes da confirmação", async () => {
    render(
      <AutomacaoEventoForm
        isSubmitting={false}
        onSubmit={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Processar evento",
        },
      ),
    );

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent(
      "Informe um módulo",
    );
  });

  it("pede confirmação antes de processar", async () => {
    const onSubmit = vi.fn();

    render(
      <AutomacaoEventoForm
        isSubmitting={false}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "Ex.: clientes",
      ),
      {
        target: {
          value: "clientes",
        },
      },
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Processar evento",
        },
      ),
    );

    expect(
      await screen.findByText(
        "Confirmar processamento?",
      ),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Confirmar processamento",
        },
      ),
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});