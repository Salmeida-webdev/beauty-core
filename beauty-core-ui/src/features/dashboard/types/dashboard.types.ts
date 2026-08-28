import type { z } from "zod";

import type {
  appointmentsAnalyticsSchema,
  clientsAnalyticsSchema,
  dashboardFiltersSchema,
  dashboardSummarySchema,
  eventsAnalyticsSchema,
  financialAnalyticsSchema,
  loyaltyAnalyticsSchema,
  notificationsAnalyticsSchema,
  packagesAnalyticsSchema,
  professionalRankingItemSchema,
  professionalsAnalyticsSchema,
  serviceRankingItemSchema,
  servicesAnalyticsSchema,
  unitRankingItemSchema,
  unitsAnalyticsSchema,
  whatsappAnalyticsSchema,
} from "@/features/dashboard/schemas/dashboard.schemas";

export type DashboardFilters = z.infer<
  typeof dashboardFiltersSchema
>;

export type DashboardSummary = z.infer<
  typeof dashboardSummarySchema
>;

export type ClientsAnalytics = z.infer<
  typeof clientsAnalyticsSchema
>;

export type AppointmentsAnalytics = z.infer<
  typeof appointmentsAnalyticsSchema
>;

export type FinancialAnalytics = z.infer<
  typeof financialAnalyticsSchema
>;

export type ServiceRankingItem = z.infer<
  typeof serviceRankingItemSchema
>;

export type ServicesAnalytics = z.infer<
  typeof servicesAnalyticsSchema
>;

export type ProfessionalRankingItem = z.infer<
  typeof professionalRankingItemSchema
>;

export type ProfessionalsAnalytics = z.infer<
  typeof professionalsAnalyticsSchema
>;

export type UnitRankingItem = z.infer<
  typeof unitRankingItemSchema
>;

export type UnitsAnalytics = z.infer<
  typeof unitsAnalyticsSchema
>;

export type LoyaltyAnalytics = z.infer<
  typeof loyaltyAnalyticsSchema
>;

export type PackagesAnalytics = z.infer<
  typeof packagesAnalyticsSchema
>;

export type WhatsappAnalytics = z.infer<
  typeof whatsappAnalyticsSchema
>;

export type NotificationsAnalytics = z.infer<
  typeof notificationsAnalyticsSchema
>;

export type EventsAnalytics = z.infer<
  typeof eventsAnalyticsSchema
>;

export type DashboardAnalyticsEndpoint =
  | "dashboard"
  | "clientes"
  | "agendamentos"
  | "financeiro"
  | "servicos"
  | "profissionais"
  | "unidades"
  | "fidelidade"
  | "pacotes"
  | "whatsapp"
  | "notificacoes"
  | "eventos";

export type DashboardAnalyticsDataMap = {
  dashboard: DashboardSummary;
  clientes: ClientsAnalytics;
  agendamentos: AppointmentsAnalytics;
  financeiro: FinancialAnalytics;
  servicos: ServicesAnalytics;
  profissionais: ProfessionalsAnalytics;
  unidades: UnitsAnalytics;
  fidelidade: LoyaltyAnalytics;
  pacotes: PackagesAnalytics;
  whatsapp: WhatsappAnalytics;
  notificacoes: NotificationsAnalytics;
  eventos: EventsAnalytics;
};
