import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
} from "vitest";

import {
  DashboardKpiGrid,
} from "@/features/dashboard/components/dashboard-kpi-grid";

afterEach(() => {
  cleanup();
});

describe("DashboardKpiGrid", () => {
  const summary = {
    clientes: {
      totalClientes: 125,
      clientesAtivos: 100,
      clientesInativos: 25,
      clientesAniversariantesMes: 4,
    },
    agendamentos: {
      totalAgendamentos: 32,
      confirmados: 6,
      cancelados: 2,
      concluidos: 20,
      pendentes: 4,
    },
    financeiro: {
      receitas: 1250.5,
      despesas: 300,
      saldo: 950.5,
      ticketMedio: 62.53,
    },
    fidelidade: {
      clientesComPontos: 10,
      pontosDistribuidos: 500,
      beneficiosLiberados: 2,
    },
    pacotes: {
      pacotesAtivos: 5,
      pacotesFinalizados: 2,
      pacotesVencidos: 1,
    },
    whatsapp: {
      mensagensCriadas: 8,
      mensagensEnviadas: 0,
      campanhasCriadas: 1,
    },
  };

  it("renderiza os seis indicadores executivos", () => {
    render(
      <DashboardKpiGrid
        summary={summary}
      />,
    );

    for (const label of [
      "Receita",
      "Despesas",
      "Saldo",
      "Ticket médio",
      "Agendamentos",
      "Clientes",
    ]) {
      expect(
        screen.getByText(label),
      ).toBeInTheDocument();
    }
  });

  it("formata valores reais em pt-BR", () => {
    render(
      <DashboardKpiGrid
        summary={summary}
      />,
    );

    expect(
      screen.getByText(
        "R$ 1.250,50",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("125"),
    ).toBeInTheDocument();
  });
});
