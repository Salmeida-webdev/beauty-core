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

import { AgendaCalendarToolbar } from "@/features/agendamentos/components/agenda-calendar-toolbar";

afterEach(() => {
  cleanup();
});

describe("AgendaCalendarToolbar", () => {
  it("permite selecionar view list", () => {
    const onModeChange = vi.fn();

    render(
      <AgendaCalendarToolbar
        mode="week"
        periodLabel="24 a 30 de agosto de 2026"
        isFetching={false}
        onModeChange={onModeChange}
        onPrevious={vi.fn()}
        onToday={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Lista",
        },
      ),
    );

    expect(
      onModeChange,
    ).toHaveBeenCalledWith(
      "list",
    );
  });

  it("usa navegacao generica na view list", () => {
    const previous = vi.fn();

    render(
      <AgendaCalendarToolbar
        mode="list"
        periodLabel="24 a 30 de agosto de 2026"
        isFetching={false}
        onModeChange={vi.fn()}
        onPrevious={previous}
        onToday={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Periodo anterior",
        },
      ),
    );

    expect(previous).toHaveBeenCalledTimes(
      1,
    );
  });
});