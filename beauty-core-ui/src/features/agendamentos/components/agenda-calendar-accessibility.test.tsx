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
import { format } from "date-fns";

import { AgendaCalendar } from "@/features/agendamentos/components/agenda-calendar";

afterEach(() => {
  cleanup();
});

describe("AgendaCalendar visual e acessibilidade", () => {
  it("marca semanticamente o dia atual", () => {
    const today =
      format(
        new Date(),
        "yyyy-MM-dd",
      );

    render(
      <AgendaCalendar
        dateKey={today}
        mode="day"
        items={[]}
        total={0}
        isFetching={false}
        onModeChange={vi.fn()}
        onPrevious={vi.fn()}
        onToday={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(
      screen.getByRole(
        "region",
        {
          name:
            "Calendario de agendamentos",
        },
      ),
    ).toBeInTheDocument();
  });

  it("expõe aria-busy durante refetch", () => {
    render(
      <AgendaCalendar
        dateKey="2026-08-29"
        mode="day"
        items={[]}
        total={0}
        isFetching
        onModeChange={vi.fn()}
        onPrevious={vi.fn()}
        onToday={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(
      screen.getByRole(
        "region",
        {
          name:
            "Calendario de agendamentos",
        },
      ),
    ).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });
});