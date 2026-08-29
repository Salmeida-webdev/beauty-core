import {
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { AgendaStatusBadge } from "@/features/agendamentos/components/agenda-status-badge";
import type {
  AgendamentoListItem,
  AgendamentosPaginationMeta,
} from "@/features/agendamentos/types/agendamentos-api.types";
import {
  buildAgendaEventAccessibleName,
  formatAgendaDayHeading,
  formatAgendaEventTime,
} from "@/features/agendamentos/utils/agenda-calendar";

type AgendaListProps = {
  items: readonly AgendamentoListItem[];
  meta: AgendamentosPaginationMeta;
  isFetching: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onSelect?: (
    item: AgendamentoListItem,
  ) => void;
};

export function AgendaList({
  items,
  meta,
  isFetching,
  onPreviousPage,
  onNextPage,
  onSelect,
}: AgendaListProps) {
  return (
    <div
      data-testid="agenda-list"
      className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated"
    >
      <div className="flex flex-col gap-3 border-b border-border-subtle p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-foreground">
            Agendamentos do periodo
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {meta.total}{" "}
            {meta.total === 1
              ? "agendamento encontrado"
              : "agendamentos encontrados"}
          </p>
        </div>

        {isFetching ? (
          <span
            aria-live="polite"
            className="text-sm text-muted-foreground"
          >
            Atualizando lista...
          </span>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-10 text-center">
          <p className="font-medium text-foreground">
            Nenhum agendamento na lista
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            O periodo e os filtros atuais nao retornaram registros.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border-subtle">
          {items.map((item) => (
            <article
              key={item.id}
              tabIndex={0}
              aria-label={buildAgendaEventAccessibleName(
                item,
              )}
              className="grid gap-3 p-4 transition-colors motion-reduce:transition-none hover:bg-surface-subtle sm:grid-cols-2 lg:grid-cols-[150px_minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto]"
            >
              <div>
                <p className="text-xs font-medium capitalize text-muted-foreground">
                  {formatAgendaDayHeading(
                    new Date(
                      item.dataHoraInicio,
                    ),
                  )}
                </p>

                <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Clock3
                    aria-hidden="true"
                    className="size-4"
                  />

                  {formatAgendaEventTime(
                    item.dataHoraInicio,
                  )}
                  {" - "}
                  {formatAgendaEventTime(
                    item.dataHoraFim,
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">
                  {item.cliente.nome}
                </p>

                <p className="truncate text-sm text-muted-foreground">
                  {item.servico.nome}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  Profissional
                </p>

                <p className="truncate text-sm font-medium text-foreground">
                  {item.profissional.nome}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  Unidade
                </p>

                <p className="truncate text-sm font-medium text-foreground">
                  {item.unidade.nome}
                </p>
              </div>

              <AgendaStatusBadge
                status={item.status}
                className="self-start"
              />

              {onSelect ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onSelect(item);
                  }}
                >
                  Ver detalhes
                </Button>
              ) : null}
            </article>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-border-subtle p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Pagina {meta.page} de{" "}
          {Math.max(
            meta.totalPages,
            1,
          )}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={
              meta.page <= 1 ||
              isFetching
            }
            onClick={onPreviousPage}
          >
            <ChevronLeft
              aria-hidden="true"
              className="mr-1 size-4"
            />

            Anterior
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={
              meta.totalPages === 0 ||
              meta.page >=
                meta.totalPages ||
              isFetching
            }
            onClick={onNextPage}
          >
            Proxima

            <ChevronRight
              aria-hidden="true"
              className="ml-1 size-4"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}