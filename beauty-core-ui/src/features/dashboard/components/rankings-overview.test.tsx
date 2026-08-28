import {
  cleanup,
  fireEvent,
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
  RankingsOverview,
} from "@/features/dashboard/components/rankings-overview";

afterEach(() => {
  cleanup();
});

const idleState = {
  isPending: false,
  isError: false,
  isFetching: false,
  onRetry: vi.fn(),
};

describe("RankingsOverview", () => {
  it("limita cada ranking aos cinco primeiros resultados", () => {
    render(
      <RankingsOverview
        services={{
          ...idleState,
          data: Array.from(
            {
              length: 6,
            },
            (_, index) => ({
              ranking: index + 1,
              servico:
                `Serviço ${index + 1}`,
              quantidade:
                10 - index,
              receita:
                1000 - index * 50,
            }),
          ),
        }}
        professionals={{
          ...idleState,
          data: [
            {
              ranking: 1,
              nome: "Profissional A",
              atendimentos: 20,
              receita: 2000,
              comissao: 200,
            },
          ],
        }}
        units={{
          ...idleState,
          data: [
            {
              ranking: 1,
              unidade: "Unidade Centro",
              receita: 3000,
              agendamentos: 30,
              clientes: 0,
            },
          ],
        }}
      />,
    );

    expect(
      screen.getByText("Serviço 1"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Serviço 5"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Serviço 6"),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText(
        "Profissional A",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Unidade Centro",
      ),
    ).toBeInTheDocument();
  });

  it("executa retry somente no ranking que falhou", () => {
    const retryServices = vi.fn();

    render(
      <RankingsOverview
        services={{
          data: undefined,
          isPending: false,
          isError: true,
          isFetching: false,
          onRetry: retryServices,
        }}
        professionals={{
          ...idleState,
          data: [],
        }}
        units={{
          ...idleState,
          data: [],
        }}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Tentar novamente",
      }),
    );

    expect(
      retryServices,
    ).toHaveBeenCalledOnce();

    expect(
      screen.getByText(
        "Nenhum profissional possui dados no período.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Nenhuma unidade possui dados no período.",
      ),
    ).toBeInTheDocument();
  });
});
