import type {
  AppointmentsAnalytics,
  FinancialAnalytics,
} from "@/features/dashboard/types/dashboard.types";

export type FinancialChartDatum = {
  label: string;
  receitas: number;
  despesas: number;
  saldo: number;
};

export type AppointmentStatusDatum = {
  status: string;
  total: number;
  color: string;
};

export function buildFinancialChartData(
  data: FinancialAnalytics,
): FinancialChartDatum[] {
  return [
    {
      label: "Período",
      receitas: data.receitas,
      despesas: data.despesas,
      saldo: data.saldo,
    },
  ];
}

export function buildAppointmentStatusData(
  data: AppointmentsAnalytics,
): AppointmentStatusDatum[] {
  return [
    {
      status: "Confirmados",
      total: data.confirmados,
      color: "var(--chart-1)",
    },
    {
      status: "Concluídos",
      total: data.concluidos,
      color: "var(--chart-2)",
    },
    {
      status: "Pendentes",
      total: data.pendentes,
      color: "var(--chart-3)",
    },
    {
      status: "Cancelados",
      total: data.cancelados,
      color: "var(--chart-4)",
    },
  ];
}
