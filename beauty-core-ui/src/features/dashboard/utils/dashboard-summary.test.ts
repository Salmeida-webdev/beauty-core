import {
  describe,
  expect,
  it,
} from "vitest";

import {
  isDashboardSummaryEmpty,
} from "@/features/dashboard/utils/dashboard-summary";
import type {
  DashboardSummary,
} from "@/features/dashboard/types/dashboard.types";

const emptySummary: DashboardSummary = {
  clientes: {
    totalClientes: 0,
    clientesAtivos: 0,
    clientesInativos: 0,
    clientesAniversariantesMes: 0,
  },
  agendamentos: {
    totalAgendamentos: 0,
    confirmados: 0,
    cancelados: 0,
    concluidos: 0,
    pendentes: 0,
  },
  financeiro: {
    receitas: 0,
    despesas: 0,
    saldo: 0,
    ticketMedio: 0,
  },
  fidelidade: {
    clientesComPontos: 0,
    pontosDistribuidos: 0,
    beneficiosLiberados: 0,
  },
  pacotes: {
    pacotesAtivos: 0,
    pacotesFinalizados: 0,
    pacotesVencidos: 0,
  },
  whatsapp: {
    mensagensCriadas: 0,
    mensagensEnviadas: 0,
    campanhasCriadas: 0,
  },
};

describe("dashboard summary state", () => {
  it("considera todos os zeros como Dashboard vazio", () => {
    expect(
      isDashboardSummaryEmpty(
        emptySummary,
      ),
    ).toBe(true);
  });

  it("preserva zero válido quando existe atividade em outra métrica", () => {
    expect(
      isDashboardSummaryEmpty({
        ...emptySummary,
        financeiro: {
          ...emptySummary.financeiro,
          despesas: 50,
          saldo: -50,
        },
      }),
    ).toBe(false);
  });
});
