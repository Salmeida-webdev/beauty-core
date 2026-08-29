import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AgendaView } from "@/features/agendamentos/types/agendamentos-types";

type AgendaCalendarToolbarProps = {
  mode: AgendaView;
  periodLabel: string;
  isFetching: boolean;
  onModeChange: (
    mode: AgendaView,
  ) => void;
  onPrevious: () => void;
  onToday: () => void;
  onNext: () => void;
};

export function AgendaCalendarToolbar({
  mode,
  periodLabel,
  isFetching,
  onModeChange,
  onPrevious,
  onToday,
  onNext,
}: AgendaCalendarToolbarProps) {
  const previousLabel =
    mode === "day"
      ? "Dia anterior"
      : mode === "week"
        ? "Semana anterior"
        : "Periodo anterior";

  const nextLabel =
    mode === "day"
      ? "Proximo dia"
      : mode === "week"
        ? "Proxima semana"
        : "Proximo periodo";

  const viewLabel =
    mode === "day"
      ? "Visualizacao diaria"
      : mode === "week"
        ? "Visualizacao semanal"
        : "Visualizacao em lista";

  return (
    <div className="flex flex-col gap-4 border-b border-border-subtle bg-surface-elevated p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <CalendarDays
            aria-hidden="true"
            className="size-5 shrink-0 text-text-muted"
          />

          <h2 className="truncate font-semibold text-text-primary">
            {periodLabel}
          </h2>
        </div>

        <p
          aria-live="polite"
          className="mt-1 text-xs text-text-muted"
        >
          {isFetching
            ? "Atualizando agenda..."
            : viewLabel}
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <div
          role="group"
          aria-label="Visualizacao da agenda"
          className="grid grid-cols-3 rounded-lg border border-border-subtle bg-surface-subtle p-1 sm:flex"
        >
          <Button
            type="button"
            size="sm"
            variant={
              mode === "day"
                ? "secondary"
                : "ghost"
            }
            aria-pressed={
              mode === "day"
            }
            onClick={() =>
              onModeChange("day")
            }
          >
            Dia
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              mode === "week"
                ? "secondary"
                : "ghost"
            }
            aria-pressed={
              mode === "week"
            }
            onClick={() =>
              onModeChange("week")
            }
          >
            Semana
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              mode === "list"
                ? "secondary"
                : "ghost"
            }
            aria-pressed={
              mode === "list"
            }
            onClick={() =>
              onModeChange("list")
            }
          >
            Lista
          </Button>
        </div>

        <div
          role="group"
          aria-label="Navegacao temporal"
          className="grid grid-cols-[auto_1fr_auto] gap-2 sm:flex sm:items-center"
        >
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={previousLabel}
            onClick={onPrevious}
          >
            <ChevronLeft
              aria-hidden="true"
              className="size-4"
            />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={onToday}
          >
            Hoje
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={nextLabel}
            onClick={onNext}
          >
            <ChevronRight
              aria-hidden="true"
              className="size-4"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}