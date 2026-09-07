"use client";

import {
  RefreshCw,
} from "lucide-react";

import {
  ContentToolbar,
} from "@/components/layout/page-section";
import {
  Button,
} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  DashboardFilters as DashboardFiltersValue,
} from "@/features/dashboard/types/dashboard.types";
import {
  formatDashboardDateTime,
  formatDashboardPeriod,
} from "@/features/dashboard/utils/dashboard-formatters";
import {
  DASHBOARD_PERIOD_OPTIONS,
  isDashboardPeriodPreset,
  type DashboardPeriodPreset,
} from "@/features/dashboard/utils/dashboard-periods";

type DashboardFiltersProps = {
  period: DashboardPeriodPreset;
  filters: DashboardFiltersValue;
  isRefreshing: boolean;
  lastUpdatedAt?: number;
  onPeriodChange: (
    period: DashboardPeriodPreset,
  ) => void;
  onRefresh: () => void | Promise<void>;
};

export function DashboardFilters({
  period,
  filters,
  isRefreshing,
  lastUpdatedAt,
  onPeriodChange,
  onRefresh,
}: DashboardFiltersProps) {
  return (
    <ContentToolbar
      className="mt-6"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-end">
        <div className="w-full sm:w-56">
          <label
            htmlFor="dashboard-period"
            className="mb-1.5 block text-label font-semibold text-text-secondary"
          >
            Período
          </label>

          <Select
            value={period}
            disabled={isRefreshing}
            onValueChange={(value) => {
              if (
                isDashboardPeriodPreset(
                  value,
                )
              ) {
                onPeriodChange(value);
              }
            }}
          >
            <SelectTrigger
              id="dashboard-period"
              aria-label="Selecionar período do dashboard"
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {DASHBOARD_PERIOD_OPTIONS.map(
                (option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0 pb-0.5">
          <p className="text-body-small font-medium text-text-primary">
            {formatDashboardPeriod(
              filters,
            )}
          </p>

          <p className="mt-1 text-caption text-text-muted">
            Clientes, fidelidade e pacotes mostram o estado atual da operação.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
        <Button
          type="button"
          variant="outline"
          disabled={isRefreshing}
          aria-label="Atualizar dashboard"
          onClick={() => {
            void onRefresh();
          }}
        >
          <RefreshCw
            aria-hidden="true"
            className={
              isRefreshing
                ? "animate-spin motion-reduce:animate-none"
                : undefined
            }
          />

          {isRefreshing
            ? "Atualizando"
            : "Atualizar"}
        </Button>

        <p
          aria-live="polite"
          className="min-h-4 text-right text-caption text-text-muted"
        >
          {isRefreshing
            ? "Atualizando indicadores"
            : lastUpdatedAt
              ? `Atualizado em ${formatDashboardDateTime(
                  new Date(
                    lastUpdatedAt,
                  ),
                )}`
              : "Aguardando primeira atualização"}
        </p>
      </div>
    </ContentToolbar>
  );
}
