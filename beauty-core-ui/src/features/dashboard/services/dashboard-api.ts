import type { z } from "zod";

import {
  appointmentsAnalyticsSchema,
  clientsAnalyticsSchema,
  dashboardFiltersSchema,
  dashboardSummarySchema,
  eventsAnalyticsSchema,
  financialAnalyticsSchema,
  loyaltyAnalyticsSchema,
  notificationsAnalyticsSchema,
  packagesAnalyticsSchema,
  professionalsAnalyticsSchema,
  servicesAnalyticsSchema,
  unitsAnalyticsSchema,
  whatsappAnalyticsSchema,
} from "@/features/dashboard/schemas/dashboard.schemas";
import type {
  AppointmentsAnalytics,
  ClientsAnalytics,
  DashboardFilters,
  DashboardSummary,
  EventsAnalytics,
  FinancialAnalytics,
  LoyaltyAnalytics,
  NotificationsAnalytics,
  PackagesAnalytics,
  ProfessionalsAnalytics,
  ServicesAnalytics,
  UnitsAnalytics,
  WhatsappAnalytics,
} from "@/features/dashboard/types/dashboard.types";
import { getApiClient } from "@/services/api/api-client";

type AnalyticsRequestParams = {
  dataInicio?: string;
  dataFim?: string;
};

export function buildDashboardRequestParams(
  filters?: DashboardFilters,
): AnalyticsRequestParams | undefined {
  if (!filters) {
    return undefined;
  }

  const parsedFilters =
    dashboardFiltersSchema.parse(filters);

  const params: AnalyticsRequestParams = {};

  if (parsedFilters.dataInicio) {
    params.dataInicio = parsedFilters.dataInicio;
  }

  if (parsedFilters.dataFim) {
    params.dataFim = parsedFilters.dataFim;
  }

  return Object.keys(params).length > 0
    ? params
    : undefined;
}

async function getAnalytics<TOutput>(
  endpoint: string,
  schema: z.ZodType<TOutput>,
  filters?: DashboardFilters,
): Promise<TOutput> {
  const params =
    buildDashboardRequestParams(filters);

  const response = params
    ? await getApiClient().get<unknown>(
        `/analytics/${endpoint}`,
        { params },
      )
    : await getApiClient().get<unknown>(
        `/analytics/${endpoint}`,
      );

  return schema.parse(response.data);
}

export function getDashboardSummary(
  filters: DashboardFilters,
): Promise<DashboardSummary> {
  return getAnalytics(
    "dashboard",
    dashboardSummarySchema,
    filters,
  );
}

export function getClientsAnalytics(): Promise<ClientsAnalytics> {
  return getAnalytics(
    "clientes",
    clientsAnalyticsSchema,
  );
}

export function getAppointmentsAnalytics(
  filters: DashboardFilters,
): Promise<AppointmentsAnalytics> {
  return getAnalytics(
    "agendamentos",
    appointmentsAnalyticsSchema,
    filters,
  );
}

export function getFinancialAnalytics(
  filters: DashboardFilters,
): Promise<FinancialAnalytics> {
  return getAnalytics(
    "financeiro",
    financialAnalyticsSchema,
    filters,
  );
}

export function getServicesAnalytics(
  filters: DashboardFilters,
): Promise<ServicesAnalytics> {
  return getAnalytics(
    "servicos",
    servicesAnalyticsSchema,
    filters,
  );
}

export function getProfessionalsAnalytics(
  filters: DashboardFilters,
): Promise<ProfessionalsAnalytics> {
  return getAnalytics(
    "profissionais",
    professionalsAnalyticsSchema,
    filters,
  );
}

export function getUnitsAnalytics(
  filters: DashboardFilters,
): Promise<UnitsAnalytics> {
  return getAnalytics(
    "unidades",
    unitsAnalyticsSchema,
    filters,
  );
}

export function getLoyaltyAnalytics(): Promise<LoyaltyAnalytics> {
  return getAnalytics(
    "fidelidade",
    loyaltyAnalyticsSchema,
  );
}

export function getPackagesAnalytics(): Promise<PackagesAnalytics> {
  return getAnalytics(
    "pacotes",
    packagesAnalyticsSchema,
  );
}

export function getWhatsappAnalytics(
  filters: DashboardFilters,
): Promise<WhatsappAnalytics> {
  return getAnalytics(
    "whatsapp",
    whatsappAnalyticsSchema,
    filters,
  );
}

export function getNotificationsAnalytics(
  filters: DashboardFilters,
): Promise<NotificationsAnalytics> {
  return getAnalytics(
    "notificacoes",
    notificationsAnalyticsSchema,
    filters,
  );
}

export function getEventsAnalytics(
  filters: DashboardFilters,
): Promise<EventsAnalytics> {
  return getAnalytics(
    "eventos",
    eventsAnalyticsSchema,
    filters,
  );
}

export const dashboardApi = {
  summary: getDashboardSummary,
  clients: getClientsAnalytics,
  appointments: getAppointmentsAnalytics,
  financial: getFinancialAnalytics,
  services: getServicesAnalytics,
  professionals: getProfessionalsAnalytics,
  units: getUnitsAnalytics,
  loyalty: getLoyaltyAnalytics,
  packages: getPackagesAnalytics,
  whatsapp: getWhatsappAnalytics,
  notifications: getNotificationsAnalytics,
  events: getEventsAnalytics,
} as const;
