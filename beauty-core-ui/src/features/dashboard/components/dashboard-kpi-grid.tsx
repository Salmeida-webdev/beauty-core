import {
  CalendarDays,
  CircleDollarSign,
  ReceiptText,
  Users,
  WalletCards,
  WalletMinimal,
} from "lucide-react";

import {
  KpiCard,
} from "@/components/dashboard/kpi-card";
import {
  PageSection,
  ResponsiveGrid,
} from "@/components/layout/page-section";
import type {
  DashboardSummary,
} from "@/features/dashboard/types/dashboard.types";
import {
  formatCurrency,
  formatInteger,
} from "@/features/dashboard/utils/dashboard-formatters";

type DashboardKpiGridProps = {
  summary: DashboardSummary;
};

export function DashboardKpiGrid({
  summary,
}: DashboardKpiGridProps) {
  return (
    <PageSection
      className="mt-8"
      title="Indicadores principais"
      description="Resumo executivo da operação com dados fornecidos pelo backend."
    >
      <ResponsiveGrid className="xl:grid-cols-3">
        <KpiCard
          label="Receita"
          value={formatCurrency(
            summary.financeiro.receitas,
          )}
          description="No período selecionado"
          icon={CircleDollarSign}
        />

        <KpiCard
          label="Despesas"
          value={formatCurrency(
            summary.financeiro.despesas,
          )}
          description="No período selecionado"
          icon={ReceiptText}
        />

        <KpiCard
          label="Saldo"
          value={formatCurrency(
            summary.financeiro.saldo,
          )}
          description="Receitas menos despesas"
          icon={WalletCards}
        />

        <KpiCard
          label="Ticket médio"
          value={formatCurrency(
            summary.financeiro.ticketMedio,
          )}
          description="Por atendimento concluído"
          icon={WalletMinimal}
        />

        <KpiCard
          label="Agendamentos"
          value={formatInteger(
            summary.agendamentos
              .totalAgendamentos,
          )}
          description="No período selecionado"
          icon={CalendarDays}
        />

        <KpiCard
          label="Clientes"
          value={formatInteger(
            summary.clientes.totalClientes,
          )}
          description="Base atual da empresa"
          icon={Users}
        />
      </ResponsiveGrid>
    </PageSection>
  );
}
