import { describe, expect, it } from "vitest";

import {
  appointmentsAnalyticsSchema,
  dashboardFiltersSchema,
  dashboardSummarySchema,
  eventsAnalyticsSchema,
  financialAnalyticsSchema,
  loyaltyAnalyticsSchema,
  servicesAnalyticsSchema,
} from "@/features/dashboard/schemas/dashboard.schemas";

describe("dashboard analytics schemas", () => {
  it("aceita filtros ISO válidos e rejeita período invertido", () => {
    const validFilters = {
      dataInicio: "2026-08-01T03:00:00.000Z",
      dataFim: "2026-09-01T02:59:59.999Z",
    };

    expect(
      dashboardFiltersSchema.parse(validFilters),
    ).toEqual(validFilters);

    expect(() =>
      dashboardFiltersSchema.parse({
        dataInicio: validFilters.dataFim,
        dataFim: validFilters.dataInicio,
      }),
    ).toThrow(
      "A data inicial não pode ser posterior à data final.",
    );
  });

  it("valida o retorno consolidado real do dashboard", () => {
    const payload = {
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

    expect(
      dashboardSummarySchema.parse(payload),
    ).toEqual(payload);
  });

  it("preserva zero como dado financeiro válido", () => {
    const payload = {
      receitas: 0,
      despesas: 0,
      saldo: 0,
      ticketMedio: 0,
      receitasMes: 0,
      despesasMes: 0,
      crescimentoFinanceiro: 0,
    };

    expect(
      financialAnalyticsSchema.parse(payload),
    ).toEqual(payload);
  });

  it("rejeita contadores negativos e percentuais não finitos", () => {
    expect(() =>
      appointmentsAnalyticsSchema.parse({
        total: -1,
        confirmados: 0,
        cancelados: 0,
        concluidos: 0,
        pendentes: 0,
        taxaCancelamento: 0,
        taxaConclusao: 0,
      }),
    ).toThrow();

    expect(() =>
      financialAnalyticsSchema.parse({
        receitas: 0,
        despesas: 0,
        saldo: 0,
        ticketMedio: 0,
        receitasMes: 0,
        despesasMes: 0,
        crescimentoFinanceiro: Number.NaN,
      }),
    ).toThrow();
  });

  it("valida rankings e remove campos privados não utilizados", () => {
    expect(
      servicesAnalyticsSchema.parse([
        {
          ranking: 1,
          servico: "Corte",
          quantidade: 4,
          receita: 320,
        },
      ]),
    ).toEqual([
      {
        ranking: 1,
        servico: "Corte",
        quantidade: 4,
        receita: 320,
      },
    ]);

    expect(
      loyaltyAnalyticsSchema.parse({
        clientesComPontos: 1,
        pontosDistribuidos: 100,
        pontosResgatados: 20,
        beneficiosLiberados: 1,
        topClientes: [
          {
            ranking: 1,
            clienteId: "interno",
            nome: "Cliente",
            telefone: "00000000000",
            pontos: 80,
          },
        ],
      }),
    ).toEqual({
      clientesComPontos: 1,
      pontosDistribuidos: 100,
      pontosResgatados: 20,
      beneficiosLiberados: 1,
      topClientes: [
        {
          ranking: 1,
          nome: "Cliente",
          pontos: 80,
        },
      ],
    });
  });

  it("valida distribuições de eventos sem expor estrutura interna", () => {
    const parsed = eventsAnalyticsSchema.parse({
      totalEventos: 2,
      porTipo: {
        AGENDAMENTO: 2,
      },
      porModulo: {
        agenda: 2,
      },
      ultimosEventos: [
        {
          id: "interno",
          metadata: {
            segredo: "não deve ser renderizado",
          },
        },
      ],
    });

    expect(parsed.totalEventos).toBe(2);
    expect(parsed.porTipo).toEqual({
      AGENDAMENTO: 2,
    });
    expect(parsed.porModulo).toEqual({
      agenda: 2,
    });
    expect(parsed.ultimosEventos).toHaveLength(1);
  });
});
