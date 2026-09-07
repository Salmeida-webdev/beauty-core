import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const {
  authState,
  searchParamsState,
  operacoesMock,
} = vi.hoisted(() => ({
  authState: {
    role: "ADMIN",
  },

  searchParamsState: {
    clienteId:
      "550e8400-e29b-41d4-a716-446655440000",
  },

  operacoesMock: vi.fn(),
}));

vi.mock("@/stores/auth-store", () => ({
  useAuthStore: (
    selector: (state: {
      user: { role: string };
    }) => unknown,
  ) =>
    selector({
      user: {
        role: authState.role,
      },
    }),
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) =>
      key === "clienteId"
        ? searchParamsState.clienteId
        : null,
  }),
}));

vi.mock("./use-fidelidade-operacoes", () => ({
  useFidelidadeOperacoes:
    operacoesMock,
}));

import { FidelidadeOperacoesView } from "./fidelidade-operacoes-view";

function mutation() {
  return {
    mutateAsync: vi.fn(),
    isPending: false,
    isError: false,
  };
}

afterEach(() => {
  cleanup();
});

describe("FidelidadeOperacoesView", () => {
  beforeEach(() => {
    authState.role = "ADMIN";

    searchParamsState.clienteId =
      "550e8400-e29b-41d4-a716-446655440000";

    operacoesMock.mockReset();

    operacoesMock.mockReturnValue({
      adicionarMutation: mutation(),
      resgatarMutation: mutation(),
      pontuarMutation: mutation(),
    });
  });

  it("ADMIN visualiza as três operações reais", () => {
    render(
      <FidelidadeOperacoesView />,
    );

    expect(
      screen.getByRole("button", {
        name: "Adicionar pontos",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Resgatar pontos",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Pontuar por valor",
      }),
    ).toBeInTheDocument();
  });

  it("RECEPCAO pode operar", () => {
    authState.role = "RECEPCAO";

    render(
      <FidelidadeOperacoesView />,
    );

    expect(
      screen.getByText(
        "Operações de pontos",
      ),
    ).toBeInTheDocument();
  });

  it("PROFISSIONAL não recebe escrita", () => {
    authState.role = "PROFISSIONAL";

    render(
      <FidelidadeOperacoesView />,
    );

    expect(
      screen.queryByText(
        "Operações de pontos",
      ),
    ).not.toBeInTheDocument();
  });

  it("exige cliente UUID válido", () => {
    searchParamsState.clienteId =
      "cliente-invalido";

    render(
      <FidelidadeOperacoesView />,
    );

    expect(
      screen.getByText(
        /Selecione um cliente válido/i,
      ),
    ).toBeInTheDocument();
  });

  it("marca descrições como obrigatórias", () => {
    render(
      <FidelidadeOperacoesView />,
    );

    expect(
      screen.getAllByLabelText(
        "Descrição ou motivo",
      ),
    ).toHaveLength(3);

    for (
      const field of
      screen.getAllByLabelText(
        "Descrição ou motivo",
      )
    ) {
      expect(field).toBeRequired();
    }
  });

  it("exige confirmação antes do resgate", () => {
    render(
      <FidelidadeOperacoesView />,
    );

    const button =
      screen.getByRole("button", {
        name: "Resgatar pontos",
      });

    expect(button).toBeDisabled();

    fireEvent.click(
      screen.getByRole(
        "checkbox",
        {
          name: /Confirmo a retirada dos pontos/i,
        },
      ),
    );

    expect(button).not.toBeDisabled();
  });

  it("não expõe estorno ou ajuste negativo", () => {
    render(
      <FidelidadeOperacoesView />,
    );

    expect(
      screen.queryByRole("button", {
        name: /estorn/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /ajuste negativo/i,
      }),
    ).not.toBeInTheDocument();
  });
});
