import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildAppointmentStatusData,
  buildFinancialChartData,
} from "@/features/dashboard/utils/dashboard-chart-data";

describe("dashboard chart data", () => {
  it("deriva o gráfico financeiro sem inventar série temporal", () => {
    expect(
      buildFinancialChartData({
        receitas: 1000,
        despesas: 250,
        saldo: 750,
        ticketMedio: 100,
        receitasMes: 900,
        despesasMes: 200,
        crescimentoFinanceiro: 10,
      }),
    ).toEqual([
      {
        label: "Período",
        receitas: 1000,
        despesas: 250,
        saldo: 750,
      },
    ]);
  });

  it("deriva somente os status retornados pelo backend", () => {
    const data =
      buildAppointmentStatusData({
        total: 10,
        confirmados: 2,
        cancelados: 1,
        concluidos: 6,
        pendentes: 1,
        taxaCancelamento: 10,
        taxaConclusao: 60,
      });

    expect(
      data.map((item) => ({
        status: item.status,
        total: item.total,
      })),
    ).toEqual([
      {
        status: "Confirmados",
        total: 2,
      },
      {
        status: "Concluídos",
        total: 6,
      },
      {
        status: "Pendentes",
        total: 1,
      },
      {
        status: "Cancelados",
        total: 1,
      },
    ]);
  });
});
