import {
  cleanup,
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

import {
  ClientsOverview,
} from "@/features/dashboard/components/clients-overview";

afterEach(() => {
  cleanup();
});

describe("ClientsOverview", () => {
  it("mostra métricas reais da base atual", () => {
    render(
      <ClientsOverview
        data={{
          totalClientes: 125,
          ativos: 100,
          inativos: 25,
          novosUltimos30Dias: 10,
          aniversariantesMes: 4,
          crescimentoPercentual: 8.2,
        }}
        isPending={false}
        isError={false}
        isFetching={false}
        onRetry={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Total de clientes",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("+8,2%"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("125"),
    ).toBeInTheDocument();
  });

  it("não espalha zeros quando a base está vazia", () => {
    render(
      <ClientsOverview
        data={{
          totalClientes: 0,
          ativos: 0,
          inativos: 0,
          novosUltimos30Dias: 0,
          aniversariantesMes: 0,
          crescimentoPercentual: 0,
        }}
        isPending={false}
        isError={false}
        isFetching={false}
        onRetry={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Nenhum cliente cadastrado",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Total de clientes",
      ),
    ).not.toBeInTheDocument();
  });
});
