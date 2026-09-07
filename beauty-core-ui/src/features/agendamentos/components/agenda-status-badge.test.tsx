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
} from "vitest";

import { AgendaStatusBadge } from "@/features/agendamentos/components/agenda-status-badge";

afterEach(() => {
  cleanup();
});

describe("AgendaStatusBadge", () => {
  it.each([
    [
      "PENDENTE",
      "Pendente",
    ],
    [
      "CONFIRMADO",
      "Confirmado",
    ],
    [
      "EM_ANDAMENTO",
      "Em andamento",
    ],
    [
      "CONCLUIDO",
      "Concluído",
    ],
    [
      "CANCELADO",
      "Cancelado",
    ],
    [
      "FALTOU",
      "Faltou",
    ],
  ] as const)(
    "renderiza %s com label textual %s",
    (
      status,
      label,
    ) => {
      render(
        <AgendaStatusBadge
          status={status}
        />,
      );

      expect(
        screen.getByText(
          label,
        ),
      ).toBeInTheDocument();
    },
  );
});