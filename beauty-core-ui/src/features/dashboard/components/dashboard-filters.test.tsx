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

import {
  DashboardFilters,
} from "@/features/dashboard/components/dashboard-filters";

afterEach(() => {
  cleanup();
});

describe("DashboardFilters", () => {
  const filters = {
    dataInicio:
      "2026-08-01T12:00:00.000Z",
    dataFim:
      "2026-08-30T12:00:00.000Z",
  };

  it("mostra período e contexto dos snapshots", () => {
    render(
      <DashboardFilters
        period="30d"
        filters={filters}
        isRefreshing={false}
        onPeriodChange={vi.fn()}
        onRefresh={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "01/08/2026 – 30/08/2026",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Clientes, fidelidade e pacotes/,
      ),
    ).toBeInTheDocument();
  });

  it("executa atualização manual", () => {
    const onRefresh = vi.fn();

    render(
      <DashboardFilters
        period="30d"
        filters={filters}
        isRefreshing={false}
        onPeriodChange={vi.fn()}
        onRefresh={onRefresh}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Atualizar dashboard",
      }),
    );

    expect(onRefresh).toHaveBeenCalledOnce();
  });

  it("bloqueia múltiplas atualizações simultâneas", () => {
    render(
      <DashboardFilters
        period="30d"
        filters={filters}
        isRefreshing
        onPeriodChange={vi.fn()}
        onRefresh={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Atualizar dashboard",
      }),
    ).toBeDisabled();

    expect(
      screen.getByText(
        "Atualizando indicadores",
      ),
    ).toBeInTheDocument();
  });
});
