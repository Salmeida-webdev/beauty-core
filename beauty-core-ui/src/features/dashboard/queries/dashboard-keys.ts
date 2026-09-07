import type {
  DashboardFilters,
} from "@/features/dashboard/types/dashboard.types";

function filterKey(
  filters: DashboardFilters,
): readonly [string | null, string | null] {
  return [
    filters.dataInicio ?? null,
    filters.dataFim ?? null,
  ] as const;
}

export const dashboardKeys = {
  all: ["dashboard"] as const,

  analytics: () =>
    [...dashboardKeys.all, "analytics"] as const,

  summary: (filters: DashboardFilters) =>
    [
      ...dashboardKeys.analytics(),
      "summary",
      ...filterKey(filters),
    ] as const,

  clients: () =>
    [
      ...dashboardKeys.analytics(),
      "clients",
    ] as const,

  appointments: (filters: DashboardFilters) =>
    [
      ...dashboardKeys.analytics(),
      "appointments",
      ...filterKey(filters),
    ] as const,

  financial: (filters: DashboardFilters) =>
    [
      ...dashboardKeys.analytics(),
      "financial",
      ...filterKey(filters),
    ] as const,

  services: (filters: DashboardFilters) =>
    [
      ...dashboardKeys.analytics(),
      "services",
      ...filterKey(filters),
    ] as const,

  professionals: (filters: DashboardFilters) =>
    [
      ...dashboardKeys.analytics(),
      "professionals",
      ...filterKey(filters),
    ] as const,

  units: (filters: DashboardFilters) =>
    [
      ...dashboardKeys.analytics(),
      "units",
      ...filterKey(filters),
    ] as const,

  loyalty: () =>
    [
      ...dashboardKeys.analytics(),
      "loyalty",
    ] as const,

  packages: () =>
    [
      ...dashboardKeys.analytics(),
      "packages",
    ] as const,

  whatsapp: (filters: DashboardFilters) =>
    [
      ...dashboardKeys.analytics(),
      "whatsapp",
      ...filterKey(filters),
    ] as const,

  notifications: (filters: DashboardFilters) =>
    [
      ...dashboardKeys.analytics(),
      "notifications",
      ...filterKey(filters),
    ] as const,

  events: (filters: DashboardFilters) =>
    [
      ...dashboardKeys.analytics(),
      "events",
      ...filterKey(filters),
    ] as const,
} as const;
