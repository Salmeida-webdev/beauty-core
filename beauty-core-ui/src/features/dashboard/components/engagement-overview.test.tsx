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
  vi,
} from "vitest";

import {
  EngagementOverview,
  OperationalOverview,
} from "@/features/dashboard/components/engagement-overview";

afterEach(() => {
  cleanup();
});

const idleState = {
  isPending: false,
  isError: false,
  isFetching: false,
  onRetry: vi.fn(),
};

describe("engagement dashboard", () => {
  it("exibe fidelidade e pacotes sem dados privados", () => {
    render(
      <EngagementOverview
        loyalty={{
          ...idleState,
          data: {
            clientesComPontos: 5,
            pontosDistribuidos: 500,
            pontosResgatados: 100,
            beneficiosLiberados: 2,
            topClientes: [
              {
                ranking: 1,
                nome: "Cliente A",
                pontos: 200,
              },
            ],
          },
        }}
        packages={{
          ...idleState,
          data: {
            pacotesVendidos: 4,
            pacotesAtivos: 3,
            pacotesFinalizados: 1,
            pacotesVencidos: 0,
            receitaGerada: 1200,
          },
        }}
      />,
    );

    expect(
      screen.getByText(/Cliente A/),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Receita relacionada",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        /telefone/i,
      ),
    ).not.toBeInTheDocument();
  });

  it("não afirma que o WhatsApp está conectado", () => {
    render(
      <OperationalOverview
        whatsapp={{
          ...idleState,
          data: {
            mensagensCriadas: 10,
            mensagensSimuladas: 8,
            mensagensEnviadas: 0,
            campanhasCriadas: 1,
            templatesAtivos: 2,
          },
        }}
        notifications={{
          ...idleState,
          data: {
            totalNotificacoes: 4,
            lidas: 2,
            naoLidas: 2,
            arquivadas: 0,
          },
        }}
        events={{
          ...idleState,
          data: {
            totalEventos: 3,
            porTipo: {
              AGENDAMENTO_CRIADO: 3,
            },
            porModulo: {
              AGENDA: 3,
            },
            ultimosEventos: [],
          },
        }}
      />,
    );

    expect(
      screen.getByText(
        /não confirmam uma conexão ativa/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "WhatsApp conectado",
      ),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText(
        "Agendamento Criado",
      ),
    ).toBeInTheDocument();
  });
});
