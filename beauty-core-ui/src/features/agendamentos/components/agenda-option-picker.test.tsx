import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { AgendaOptionPicker } from "@/features/agendamentos/components/agenda-option-picker";

afterEach(() => {
  cleanup();
});

describe("AgendaOptionPicker", () => {
  it("abre, busca e seleciona uma opcao", () => {
    const onSearchChange = vi.fn();
    const onChange = vi.fn();

    render(
      <AgendaOptionPicker
        id="cliente"
        label="Cliente"
        options={[
          {
            value: "cliente-1",
            label: "Maria",
          },
        ]}
        searchValue=""
        onSearchChange={onSearchChange}
        onChange={onChange}
        placeholder="Selecionar cliente"
        searchPlaceholder="Buscar cliente"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cliente",
      }),
    );

    expect(
      screen.getByRole("listbox", {
        name: "Cliente - opcoes",
      }),
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByRole("textbox", {
        name: "Cliente - buscar",
      }),
      {
        target: {
          value: "Maria",
        },
      },
    );

    expect(onSearchChange).toHaveBeenCalledWith(
      "Maria",
    );

    fireEvent.click(
      screen.getByRole("option", {
        name: "Maria",
      }),
    );

    expect(onChange).toHaveBeenCalledWith(
      "cliente-1",
    );

    expect(
      screen.queryByRole("listbox", {
        name: "Cliente - opcoes",
      }),
    ).not.toBeInTheDocument();
  });

  it("exibe estado vazio", () => {
    render(
      <AgendaOptionPicker
        id="unidade"
        label="Unidade"
        options={[]}
        searchValue=""
        onSearchChange={vi.fn()}
        onChange={vi.fn()}
        placeholder="Selecionar unidade"
        searchPlaceholder="Buscar unidade"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Unidade",
      }),
    );

    expect(
      screen.getByRole("listbox", {
        name: "Unidade - opcoes",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Nenhuma op\u00e7\u00e3o encontrada.",
      ),
    ).toBeInTheDocument();
  });

  it("exibe loading e erro com retry", () => {
    const onRetry = vi.fn();

    const { rerender } = render(
      <AgendaOptionPicker
        id="profissional"
        label="Profissional"
        options={[]}
        searchValue=""
        onSearchChange={vi.fn()}
        onChange={vi.fn()}
        placeholder="Selecionar profissional"
        searchPlaceholder="Buscar profissional"
        isLoading
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Profissional",
      }),
    );

    expect(
      screen.getByText(
        "Carregando op\u00e7\u00f5es...",
      ),
    ).toBeInTheDocument();

    rerender(
      <AgendaOptionPicker
        id="profissional"
        label="Profissional"
        options={[]}
        searchValue=""
        onSearchChange={vi.fn()}
        onChange={vi.fn()}
        placeholder="Selecionar profissional"
        searchPlaceholder="Buscar profissional"
        errorMessage="Falha ao carregar."
        onRetry={onRetry}
      />,
    );

    expect(
      screen.getByText("Falha ao carregar."),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Tentar novamente",
      }),
    );

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});