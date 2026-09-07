"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  dashboardQueryOptions,
} from "@/features/dashboard/queries/dashboard-query-options";
import type {
  DashboardFilters,
} from "@/features/dashboard/types/dashboard.types";

type UseDashboardAnalyticsInput = {
  filters: DashboardFilters;
  enabled: boolean;
};

export function useDashboardAnalytics({
  filters,
  enabled,
}: UseDashboardAnalyticsInput) {
  const summary = useQuery(
    dashboardQueryOptions.summary(
      filters,
      enabled,
    ),
  );

  const clients = useQuery(
    dashboardQueryOptions.clients(
      enabled,
    ),
  );

  const appointments = useQuery(
    dashboardQueryOptions.appointments(
      filters,
      enabled,
    ),
  );

  const financial = useQuery(
    dashboardQueryOptions.financial(
      filters,
      enabled,
    ),
  );

  const services = useQuery(
    dashboardQueryOptions.services(
      filters,
      enabled,
    ),
  );

  const professionals = useQuery(
    dashboardQueryOptions.professionals(
      filters,
      enabled,
    ),
  );

  const units = useQuery(
    dashboardQueryOptions.units(
      filters,
      enabled,
    ),
  );

  const loyalty = useQuery(
    dashboardQueryOptions.loyalty(
      enabled,
    ),
  );

  const packages = useQuery(
    dashboardQueryOptions.packages(
      enabled,
    ),
  );

  const whatsapp = useQuery(
    dashboardQueryOptions.whatsapp(
      filters,
      enabled,
    ),
  );

  const notifications = useQuery(
    dashboardQueryOptions.notifications(
      filters,
      enabled,
    ),
  );

  const events = useQuery(
    dashboardQueryOptions.events(
      filters,
      enabled,
    ),
  );

  return {
    summary,
    clients,
    appointments,
    financial,
    services,
    professionals,
    units,
    loyalty,
    packages,
    whatsapp,
    notifications,
    events,
  };
}

export type DashboardAnalyticsQueries =
  ReturnType<
    typeof useDashboardAnalytics
  >;
