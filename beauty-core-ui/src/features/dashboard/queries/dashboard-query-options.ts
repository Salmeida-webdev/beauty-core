import {
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import {
  dashboardKeys,
} from "@/features/dashboard/queries/dashboard-keys";
import {
  DASHBOARD_STALE_TIME,
  shouldRetryDashboardQuery,
} from "@/features/dashboard/queries/dashboard-query-policy";
import {
  dashboardApi,
} from "@/features/dashboard/services/dashboard-api";
import type {
  DashboardFilters,
} from "@/features/dashboard/types/dashboard.types";

export const dashboardQueryOptions = {
  summary: (
    filters: DashboardFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        dashboardKeys.summary(filters),
      queryFn: () =>
        dashboardApi.summary(filters),
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.summary,
      retry:
        shouldRetryDashboardQuery,
      placeholderData:
        keepPreviousData,
    }),

  clients: (enabled: boolean) =>
    queryOptions({
      queryKey:
        dashboardKeys.clients(),
      queryFn:
        dashboardApi.clients,
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.snapshot,
      retry:
        shouldRetryDashboardQuery,
    }),

  appointments: (
    filters: DashboardFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        dashboardKeys.appointments(
          filters,
        ),
      queryFn: () =>
        dashboardApi.appointments(
          filters,
        ),
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.operational,
      retry:
        shouldRetryDashboardQuery,
      placeholderData:
        keepPreviousData,
    }),

  financial: (
    filters: DashboardFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        dashboardKeys.financial(filters),
      queryFn: () =>
        dashboardApi.financial(filters),
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.operational,
      retry:
        shouldRetryDashboardQuery,
      placeholderData:
        keepPreviousData,
    }),

  services: (
    filters: DashboardFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        dashboardKeys.services(filters),
      queryFn: () =>
        dashboardApi.services(filters),
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.rankings,
      retry:
        shouldRetryDashboardQuery,
      placeholderData:
        keepPreviousData,
    }),

  professionals: (
    filters: DashboardFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        dashboardKeys.professionals(
          filters,
        ),
      queryFn: () =>
        dashboardApi.professionals(
          filters,
        ),
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.rankings,
      retry:
        shouldRetryDashboardQuery,
      placeholderData:
        keepPreviousData,
    }),

  units: (
    filters: DashboardFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        dashboardKeys.units(filters),
      queryFn: () =>
        dashboardApi.units(filters),
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.rankings,
      retry:
        shouldRetryDashboardQuery,
      placeholderData:
        keepPreviousData,
    }),

  loyalty: (enabled: boolean) =>
    queryOptions({
      queryKey:
        dashboardKeys.loyalty(),
      queryFn:
        dashboardApi.loyalty,
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.snapshot,
      retry:
        shouldRetryDashboardQuery,
    }),

  packages: (enabled: boolean) =>
    queryOptions({
      queryKey:
        dashboardKeys.packages(),
      queryFn:
        dashboardApi.packages,
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.snapshot,
      retry:
        shouldRetryDashboardQuery,
    }),

  whatsapp: (
    filters: DashboardFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        dashboardKeys.whatsapp(filters),
      queryFn: () =>
        dashboardApi.whatsapp(filters),
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.operational,
      retry:
        shouldRetryDashboardQuery,
      placeholderData:
        keepPreviousData,
    }),

  notifications: (
    filters: DashboardFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        dashboardKeys.notifications(
          filters,
        ),
      queryFn: () =>
        dashboardApi.notifications(
          filters,
        ),
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.operational,
      retry:
        shouldRetryDashboardQuery,
      placeholderData:
        keepPreviousData,
    }),

  events: (
    filters: DashboardFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        dashboardKeys.events(filters),
      queryFn: () =>
        dashboardApi.events(filters),
      enabled,
      staleTime:
        DASHBOARD_STALE_TIME.operational,
      retry:
        shouldRetryDashboardQuery,
      placeholderData:
        keepPreviousData,
    }),
} as const;
