import {
  useMemo,
} from "react";
import {
  isSameDay,
} from "date-fns";

import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
import type { AgendaView } from "@/features/agendamentos/types/agendamentos-types";
import { AgendaCalendarEmpty } from "@/features/agendamentos/components/agenda-calendar-empty";
import { AgendaCalendarEvent } from "@/features/agendamentos/components/agenda-calendar-event";
import { AgendaCalendarToolbar } from "@/features/agendamentos/components/agenda-calendar-toolbar";
import {
  agendaDateKey,
  formatAgendaDayHeading,
  formatAgendaPeriodLabel,
  getAgendaCalendarDays,
  groupAgendaEventsByDate,
  type AgendaCalendarMode,
} from "@/features/agendamentos/utils/agenda-calendar";

type AgendaCalendarProps = {
  dateKey: string;
  mode: AgendaCalendarMode;
  items: readonly AgendamentoListItem[];
  isFetching: boolean;
  total: number;
  filtered?: boolean;
  onModeChange: (
    mode: AgendaView,
  ) => void;
  onPrevious: () => void;
  onToday: () => void;
  onNext: () => void;
  onSelectItem?: (
    item: AgendamentoListItem,
  ) => void;
};

export function AgendaCalendar({
  dateKey,
  mode,
  items,
  isFetching,
  total,
  filtered = false,
  onModeChange,
  onPrevious,
  onToday,
  onNext,
  onSelectItem,
}: AgendaCalendarProps) {
  const days = useMemo(
    () =>
      getAgendaCalendarDays(
        dateKey,
        mode,
      ),
    [
      dateKey,
      mode,
    ],
  );

  const grouped = useMemo(
    () =>
      groupAgendaEventsByDate(
        items,
      ),
    [
      items,
    ],
  );

  const periodLabel = useMemo(
    () =>
      formatAgendaPeriodLabel(
        dateKey,
        mode,
      ),
    [
      dateKey,
      mode,
    ],
  );

  const truncated =
    total > items.length;

  const today =
    new Date();

  return (
    <section
      aria-label="Calendario de agendamentos"
      aria-busy={isFetching}
      data-testid="agenda-calendar"
      className="overflow-hidden rounded-large border border-border-subtle bg-surface-elevated shadow-subtle"
    >
      <AgendaCalendarToolbar
        mode={mode}
        periodLabel={periodLabel}
        isFetching={isFetching}
        onModeChange={onModeChange}
        onPrevious={onPrevious}
        onToday={onToday}
        onNext={onNext}
      />

      {truncated ? (
        <div
          role="status"
          className="border-b border-warning/25 bg-warning/10 px-4 py-3 text-sm text-warning-foreground"
        >
          O periodo possui {total} agendamentos. Esta visualizacao carregou os primeiros {items.length} registros do contrato paginado atual.
        </div>
      ) : null}

      {items.length === 0 ? (
        <AgendaCalendarEmpty
          filtered={filtered}
        />
      ) : (
        <div
          className={
            mode === "week"
              ? "grid grid-cols-1 divide-y divide-border-subtle sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-7"
              : "grid grid-cols-1"
          }
        >
          {days.map((day) => {
            const key =
              agendaDateKey(day);

            const events =
              grouped.get(key) ?? [];

            const isToday =
              isSameDay(
                day,
                today,
              );

            return (
              <section
                key={key}
                aria-labelledby={`agenda-day-${key}`}
                className="min-w-0 bg-surface-elevated"
              >
                <header
                  className={
                    isToday
                      ? "border-b border-primary/25 bg-primary/10 px-3 py-3"
                      : "border-b border-border-subtle bg-surface-subtle px-3 py-3"
                  }
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      id={`agenda-day-${key}`}
                      aria-current={
                        isToday
                          ? "date"
                          : undefined
                      }
                      className="text-sm font-semibold capitalize text-text-primary"
                    >
                      {formatAgendaDayHeading(
                        day,
                      )}
                    </h3>

                    {isToday ? (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
                        Hoje
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1 text-xs text-text-muted">
                    {events.length}{" "}
                    {events.length === 1
                      ? "agendamento"
                      : "agendamentos"}
                  </p>
                </header>

                <div className="min-h-36 space-y-2 p-2">
                  {events.length === 0 ? (
                    <p className="px-2 py-6 text-center text-xs text-text-muted">
                      Sem agendamentos
                    </p>
                  ) : (
                    events.map((item) => (
                      <AgendaCalendarEvent
                        key={item.id}
                        item={item}
                        onSelect={
                          onSelectItem
                        }
                      />
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}