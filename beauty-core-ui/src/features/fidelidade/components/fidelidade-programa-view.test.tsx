import {
  cleanup,
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
  programaMock,
} = vi.hoisted(() => ({
  authState: {
    role: "ADMIN",
  },
  programaMock: vi.fn(),
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

vi.mock("../hooks/use-fidelidade-programa", () => ({
  useFidelidadePrograma: programaMock,
}));

import { FidelidadeProgramaView } from "./fidelidade-programa-view";

function query<T>(data?: T) {
  return {
    data,
    isPending: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  };
}

function mutation() {
  return {
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    isPending: false,
    isError: false,
  };
}

afterEach(() => {
  cleanup();
});

describe("FidelidadeProgramaView", () => {
  beforeEach(() => {
    authState.role = "ADMIN";
    programaMock.mockReset();

    programaMock.mockReturnValue({
      configuracaoQuery: query({
        id: "550e8400-e29b-41d4-a716-446655440000",
        fidelidadeAtiva: true,
        pontuacaoAutomatica: false,
        pontosPorReal: 1,
        reaisPorPonto: 0.1,
        pontosParaResgate: 100,
        valorResgate: 10,
        niveisAtivos: false,
        beneficiosAutomaticos: false,
        cupomAniversarioAtivo: false,
        cupomAniversarioCodigo: null,
        cupomAniversarioValor: null,
        bonusAniversarioAtivo: false,
        bonusAniversarioPontos: 50,
        automacoesAtivas: false,
        createdAt: "2026-08-30T12:00:00.000Z",
        updatedAt: "2026-08-30T12:00:00.000Z",
      }),

      niveisQuery: query([]),

      createConfiguracaoMutation: mutation(),
      updateConfiguracaoMutation: mutation(),
      createNivelMutation: mutation(),
      updateNivelMutation: mutation(),
      removeNivelMutation: mutation(),
    });
  });

  it("ADMIN gerencia configuração e níveis", () => {
    render(<FidelidadeProgramaView />);

    expect(
      screen.getByRole("button", {
        name: "Salvar configuração",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Criar nível",
      }),
    ).toBeInTheDocument();
  });

  it("GERENTE lê configuração e gerencia níveis", () => {
    authState.role = "GERENTE";

    render(<FidelidadeProgramaView />);

    expect(
      screen.queryByRole("button", {
        name: "Salvar configuração",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText(
        /acesso somente de leitura à configuração/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Criar nível",
      }),
    ).toBeInTheDocument();
  });

  it("PROFISSIONAL lê níveis sem configuração", () => {
    authState.role = "PROFISSIONAL";

    render(<FidelidadeProgramaView />);

    expect(
      screen.queryByText("Configuração do programa"),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Níveis de fidelidade"),
    ).toBeInTheDocument();

    expect(programaMock).toHaveBeenCalledWith({
      readConfiguracao: false,
      readNiveis: true,
    });
  });

  it("não cria níveis padrão", () => {
    render(<FidelidadeProgramaView />);

    expect(
      screen.getByText("Nenhum nível cadastrado"),
    ).toBeInTheDocument();

    expect(screen.queryByText("Bronze")).not.toBeInTheDocument();
    expect(screen.queryByText("Prata")).not.toBeInTheDocument();
    expect(screen.queryByText("Ouro")).not.toBeInTheDocument();
  });
});
