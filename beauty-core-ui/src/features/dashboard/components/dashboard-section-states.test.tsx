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
  DashboardCompactEmpty,
  DashboardSectionError,
} from "@/features/dashboard/components/dashboard-section-states";

afterEach(() => {
  cleanup();
});

describe("dashboard section states", () => {
  it("permite retry isolado", () => {
    const onRetry = vi.fn();

    render(
      <DashboardSectionError
        title="Falha financeira"
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

  it("renderiza empty state compacto", () => {
    render(
      <DashboardCompactEmpty
        title="Sem registros"
        description="Não há dados no período."
      />,
    );

    expect(
      screen.getByText("Sem registros"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Não há dados no período.",
      ),
    ).toBeInTheDocument();
  });
});
