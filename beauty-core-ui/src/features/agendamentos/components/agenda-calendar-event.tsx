import { memo } from "react";
import {
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { AgendaStatusBadge } from "@/features/agendamentos/components/agenda-status-badge";
import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
import {
  buildAgendaEventAccessibleName,
  formatAgendaEventTime,
} from "@/features/agendamentos/utils/agenda-calendar";

type AgendaCalendarEventProps = {
  item: AgendamentoListItem;
  onSelect?: (
    item: AgendamentoListItem,
  ) => void;
};

function AgendaCalendarEventComponent({
  item,
  onSelect,
}: AgendaCalendarEventProps) {
  const start =
    formatAgendaEventTime(
      item.dataHoraInicio,
    );

  const end =
    formatAgendaEventTime(
      item.dataHoraFim,
    );

  return (
    <article
      aria-label={buildAgendaEventAccessibleName(
        item,
      )}
      data-testid="agenda-calendar-event"
      data-status={item.status}
      className="group rounded-large border border-border-subtle bg-surface-elevated p-3 shadow-subtle transition-colors motion-reduce:transition-none hover:border-border hover:bg-surface-subtle"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-text-primary">
          <Clock3
            aria-hidden="true"
            className="size-3.5 shrink-0 text-text-muted"
          />

          <span className="truncate">
            {start} - {end}
          </span>
        </div>

        <AgendaStatusBadge
          status={item.status}
          className="shrink-0"
        />
      </div>

      <div className="mt-3 min-w-0">
        <p className="truncate text-sm font-semibold text-text-primary">
          {item.cliente.nome}
        </p>

        <p className="mt-0.5 truncate text-xs font-medium text-text-secondary">
          {item.servico.nome}
        </p>
      </div>

      <dl className="mt-3 grid gap-1.5 text-xs text-text-muted">
        <div className="flex min-w-0 items-center gap-1.5">
          <UserRound
            aria-hidden="true"
            className="size-3.5 shrink-0"
          />

          <dt className="sr-only">
            Profissional
          </dt>

          <dd className="truncate">
            {item.profissional.nome}
          </dd>
        </div>

        <div className="flex min-w-0 items-center gap-1.5">
          <MapPin
            aria-hidden="true"
            className="size-3.5 shrink-0"
          />

          <dt className="sr-only">
            Unidade
          </dt>

          <dd className="truncate">
            {item.unidade.nome}
          </dd>
        </div>
      </dl>

      {onSelect ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-3 w-full"
          aria-label={`Ver detalhes do agendamento de ${item.cliente.nome}`}
          onClick={() => {
            onSelect(item);
          }}
        >
          Ver detalhes
        </Button>
      ) : null}
    </article>
  );
}

export const AgendaCalendarEvent =
  memo(
    AgendaCalendarEventComponent,
  );

AgendaCalendarEvent.displayName =
  "AgendaCalendarEvent";