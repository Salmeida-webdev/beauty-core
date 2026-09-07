import { z } from "zod";

const finiteNumberSchema = z.number().finite();
const nonNegativeNumberSchema = finiteNumberSchema.nonnegative();
const nonNegativeIntegerSchema = z.number().int().nonnegative();
const positiveRankingSchema = z.number().int().positive();

const optionalIsoDateTimeSchema = z
  .string()
  .datetime({ offset: true })
  .optional();

export const dashboardFiltersSchema = z
  .object({
    dataInicio: optionalIsoDateTimeSchema,
    dataFim: optionalIsoDateTimeSchema,
  })
  .superRefine((filters, context) => {
    if (
      filters.dataInicio &&
      filters.dataFim &&
      new Date(filters.dataInicio).getTime() >
        new Date(filters.dataFim).getTime()
    ) {
      context.addIssue({
        code: "custom",
        message:
          "A data inicial não pode ser posterior à data final.",
        path: ["dataFim"],
      });
    }
  });

const dashboardClientsSummarySchema = z.object({
  totalClientes: nonNegativeIntegerSchema,
  clientesAtivos: nonNegativeIntegerSchema,
  clientesInativos: nonNegativeIntegerSchema,
  clientesAniversariantesMes: nonNegativeIntegerSchema,
});

const dashboardAppointmentsSummarySchema = z.object({
  totalAgendamentos: nonNegativeIntegerSchema,
  confirmados: nonNegativeIntegerSchema,
  cancelados: nonNegativeIntegerSchema,
  concluidos: nonNegativeIntegerSchema,
  pendentes: nonNegativeIntegerSchema,
});

const dashboardFinancialSummarySchema = z.object({
  receitas: nonNegativeNumberSchema,
  despesas: nonNegativeNumberSchema,
  saldo: finiteNumberSchema,
  ticketMedio: nonNegativeNumberSchema,
});

const dashboardLoyaltySummarySchema = z.object({
  clientesComPontos: nonNegativeIntegerSchema,
  pontosDistribuidos: nonNegativeNumberSchema,
  beneficiosLiberados: nonNegativeIntegerSchema,
});

const dashboardPackagesSummarySchema = z.object({
  pacotesAtivos: nonNegativeIntegerSchema,
  pacotesFinalizados: nonNegativeIntegerSchema,
  pacotesVencidos: nonNegativeIntegerSchema,
});

const dashboardWhatsappSummarySchema = z.object({
  mensagensCriadas: nonNegativeIntegerSchema,
  mensagensEnviadas: nonNegativeIntegerSchema,
  campanhasCriadas: nonNegativeIntegerSchema,
});

export const dashboardSummarySchema = z.object({
  clientes: dashboardClientsSummarySchema,
  agendamentos: dashboardAppointmentsSummarySchema,
  financeiro: dashboardFinancialSummarySchema,
  fidelidade: dashboardLoyaltySummarySchema,
  pacotes: dashboardPackagesSummarySchema,
  whatsapp: dashboardWhatsappSummarySchema,
});

export const clientsAnalyticsSchema = z.object({
  totalClientes: nonNegativeIntegerSchema,
  ativos: nonNegativeIntegerSchema,
  inativos: nonNegativeIntegerSchema,
  novosUltimos30Dias: nonNegativeIntegerSchema,
  aniversariantesMes: nonNegativeIntegerSchema,
  crescimentoPercentual: finiteNumberSchema,
});

export const appointmentsAnalyticsSchema = z.object({
  total: nonNegativeIntegerSchema,
  confirmados: nonNegativeIntegerSchema,
  cancelados: nonNegativeIntegerSchema,
  concluidos: nonNegativeIntegerSchema,
  pendentes: nonNegativeIntegerSchema,
  taxaCancelamento: nonNegativeNumberSchema,
  taxaConclusao: nonNegativeNumberSchema,
});

export const financialAnalyticsSchema = z.object({
  receitas: nonNegativeNumberSchema,
  despesas: nonNegativeNumberSchema,
  saldo: finiteNumberSchema,
  ticketMedio: nonNegativeNumberSchema,
  receitasMes: nonNegativeNumberSchema,
  despesasMes: nonNegativeNumberSchema,
  crescimentoFinanceiro: finiteNumberSchema,
});

export const serviceRankingItemSchema = z.object({
  ranking: positiveRankingSchema,
  servico: z.string().min(1),
  quantidade: nonNegativeIntegerSchema,
  receita: nonNegativeNumberSchema,
});

export const servicesAnalyticsSchema = z.array(
  serviceRankingItemSchema,
);

export const professionalRankingItemSchema = z.object({
  ranking: positiveRankingSchema,
  nome: z.string().min(1),
  atendimentos: nonNegativeIntegerSchema,
  receita: nonNegativeNumberSchema,
  comissao: nonNegativeNumberSchema,
});

export const professionalsAnalyticsSchema = z.array(
  professionalRankingItemSchema,
);

export const unitRankingItemSchema = z.object({
  ranking: positiveRankingSchema,
  unidade: z.string().min(1),
  receita: nonNegativeNumberSchema,
  agendamentos: nonNegativeIntegerSchema,
  clientes: nonNegativeIntegerSchema,
});

export const unitsAnalyticsSchema = z.array(
  unitRankingItemSchema,
);

const loyaltyClientRankingSchema = z.object({
  ranking: positiveRankingSchema,
  nome: z.string().min(1),
  pontos: nonNegativeNumberSchema,
});

export const loyaltyAnalyticsSchema = z.object({
  clientesComPontos: nonNegativeIntegerSchema,
  pontosDistribuidos: nonNegativeNumberSchema,
  pontosResgatados: nonNegativeNumberSchema,
  beneficiosLiberados: nonNegativeIntegerSchema,
  topClientes: z.array(loyaltyClientRankingSchema),
});

export const packagesAnalyticsSchema = z.object({
  pacotesVendidos: nonNegativeIntegerSchema,
  pacotesAtivos: nonNegativeIntegerSchema,
  pacotesFinalizados: nonNegativeIntegerSchema,
  pacotesVencidos: nonNegativeIntegerSchema,
  receitaGerada: nonNegativeNumberSchema,
});

export const whatsappAnalyticsSchema = z.object({
  mensagensCriadas: nonNegativeIntegerSchema,
  mensagensSimuladas: nonNegativeIntegerSchema,
  mensagensEnviadas: nonNegativeIntegerSchema,
  campanhasCriadas: nonNegativeIntegerSchema,
  templatesAtivos: nonNegativeIntegerSchema,
});

export const notificationsAnalyticsSchema = z.object({
  totalNotificacoes: nonNegativeIntegerSchema,
  lidas: nonNegativeIntegerSchema,
  naoLidas: nonNegativeIntegerSchema,
  arquivadas: nonNegativeIntegerSchema,
});

const eventDistributionSchema = z.record(
  z.string(),
  nonNegativeIntegerSchema,
);

export const eventsAnalyticsSchema = z.object({
  totalEventos: nonNegativeIntegerSchema,
  porTipo: eventDistributionSchema,
  porModulo: eventDistributionSchema,
  ultimosEventos: z.array(z.unknown()),
});

export const dashboardAnalyticsSchemas = {
  dashboard: dashboardSummarySchema,
  clientes: clientsAnalyticsSchema,
  agendamentos: appointmentsAnalyticsSchema,
  financeiro: financialAnalyticsSchema,
  servicos: servicesAnalyticsSchema,
  profissionais: professionalsAnalyticsSchema,
  unidades: unitsAnalyticsSchema,
  fidelidade: loyaltyAnalyticsSchema,
  pacotes: packagesAnalyticsSchema,
  whatsapp: whatsappAnalyticsSchema,
  notificacoes: notificationsAnalyticsSchema,
  eventos: eventsAnalyticsSchema,
} as const;
