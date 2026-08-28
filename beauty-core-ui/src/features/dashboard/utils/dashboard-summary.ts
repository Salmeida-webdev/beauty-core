import type {
  DashboardSummary,
} from "@/features/dashboard/types/dashboard.types";

export function isDashboardSummaryEmpty(
  summary: DashboardSummary,
): boolean {
  return (
    summary.clientes.totalClientes === 0 &&
    summary.agendamentos.totalAgendamentos === 0 &&
    summary.financeiro.receitas === 0 &&
    summary.financeiro.despesas === 0 &&
    summary.fidelidade.pontosDistribuidos === 0 &&
    summary.pacotes.pacotesAtivos === 0 &&
    summary.whatsapp.mensagensCriadas === 0
  );
}
