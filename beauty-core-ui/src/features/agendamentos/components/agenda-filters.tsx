"use client";

import { FilterX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AgendaRelatedSelectors } from "@/features/agendamentos/components/agenda-related-selectors";
import { agendamentoStatusSchema } from "@/features/agendamentos/schemas/agendamentos-schemas";
import type { AgendaUrlState } from "@/features/agendamentos/types/agendamentos-types";
import {
  agendaUrlStateToFilters,
  getAgendaActiveFilterCount,
} from "@/features/agendamentos/utils/agenda-filters";
import { formatAgendaStatusLabel } from "@/features/agendamentos/utils/agenda-calendar";

type AgendaFiltersProps = {
  state: AgendaUrlState;
  onChange: (
    patch: Partial<AgendaUrlState>,
  ) => void;
};

export function AgendaFilters({
  state,
  onChange,
}: AgendaFiltersProps) {
  const filters =
    agendaUrlStateToFilters(state);

  const activeCount =
    getAgendaActiveFilterCount(
      filters,
    );

  return (
    <div
      data-testid="agenda-filters"
      className="space-y-4 rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-text-primary">
            Filtros
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            {activeCount === 0
              ? "Nenhum filtro operacional aplicado."
              : activeCount === 1
                ? "1 filtro operacional aplicado."
                : `${activeCount} filtros operacionais aplicados.`}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={activeCount === 0}
          onClick={() => {
            onChange({
              status: undefined,
              clienteId: undefined,
              profissionalId: undefined,
              servicoId: undefined,
              unidadeId: undefined,
            });
          }}
        >
          <FilterX
            aria-hidden="true"
            className="mr-2 size-4"
          />

          Limpar filtros
        </Button>
      </div>

      <div className="max-w-sm space-y-2">
        <label
          htmlFor="agenda-status-filter"
          className="text-sm font-medium text-text-primary"
        >
          Status
        </label>

        <Select
          value={
            state.status ?? "TODOS"
          }
          onValueChange={(value) => {
            onChange({
              status:
                value === "TODOS"
                  ? undefined
                  : agendamentoStatusSchema.parse(
                      value,
                    ),
            });
          }}
        >
          <SelectTrigger
            id="agenda-status-filter"
            className="w-full"
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="TODOS">
              Todos os status
            </SelectItem>

            {agendamentoStatusSchema.options.map(
              (status) => (
                <SelectItem
                  key={status}
                  value={status}
                >
                  {formatAgendaStatusLabel(
                    status,
                  )}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>

      <AgendaRelatedSelectors
        values={{
          clienteId: state.clienteId,
          servicoId: state.servicoId,
          profissionalId:
            state.profissionalId,
          unidadeId: state.unidadeId,
        }}
        onChange={(field, value) => {
          onChange({
            [field]: value,
          } as Partial<AgendaUrlState>);
        }}
      />
    </div>
  );
}