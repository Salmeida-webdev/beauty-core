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
  DashboardAccessState,
  DashboardSummaryEmpty,
  DashboardSummaryError,
} from "@/features/dashboard/components/dashboard-summary-states";

afterEach(() => {
  cleanup();
});

describe("dashboard summary states", () => {
  it("usa o asset oficial no estado vazio", () => {
    render(
      <DashboardSummaryEmpty />,
    );

    expect(
      screen.getByTestId(
        "dashboard-empty-state",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByAltText(
        /Painel do Beauty Core/,
      ),
    ).toBeInTheDocument();
  });

  it("permite tentar novamente somente na seção com erro", () => {
    const onRetry = vi.fn();

    render(
      <DashboardSummaryError
        isRetrying={false}
        onRetry={onRetry}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Tentar novamente",
      }),
    );

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("explica o contexto do SUPER_ADMIN sem consultar Analytics", () => {
    render(
      <DashboardAccessState
        role="SUPER_ADMIN"
      />,
    );

    expect(
      screen.getByText(
        "Selecione um contexto empresarial",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Nenhuma consulta de Analytics foi enviada.",
      ),
    ).toBeInTheDocument();
  });
});
