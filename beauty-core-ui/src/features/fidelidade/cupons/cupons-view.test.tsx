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

import { cupomTipoValues } from "./cupom-tipos";

const {
  authState,
  cuponsMock,
} = vi.hoisted(() => ({
  authState: {
    role: "ADMIN",
  },
  cuponsMock: vi.fn(),
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

vi.mock("./use-cupons", () => ({
  useCupons: cuponsMock,
}));

import { CuponsView } from "./cupons-view";

function query(data: unknown[]) {
  return {
    data,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  };
}

function mutation() {
  return {
    mutateAsync: vi.fn(),
    isPending: false,
    isError: false,
  };
}

const cupomAtivo = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  codigo: "CUPOM10",
  nome: "Cupom real",
  descricao: "Descrição",
  tipo: cupomTipoValues[0],
  valor: 10,
  dataInicio: null,
  dataFim: null,
  quantidadeMaxima: 20,
  quantidadeUtilizada: 1,
  ativo: true,
  createdAt:
    "2026-08-30T12:00:00.000Z",
  updatedAt:
    "2026-08-30T12:00:00.000Z",
};

afterEach(() => {
  cleanup();
});

describe("CuponsView", () => {
  beforeEach(() => {
    authState.role = "ADMIN";

    cuponsMock.mockReset();

    cuponsMock.mockReturnValue({
      query: query([cupomAtivo]),
      createMutation: mutation(),
      updateMutation: mutation(),
      inativarMutation: mutation(),
      validarMutation: mutation(),
    });
  });

  it("ADMIN gerencia e valida", () => {
    render(<CuponsView />);

    expect(
      screen.getByRole("button", {
        name: "Criar cupom",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Editar",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Inativar",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        "Código do cupom",
      ),
    ).toBeInTheDocument();
  });

  it("PROFISSIONAL lê e pode validar sem gerenciar", () => {
    authState.role = "PROFISSIONAL";

    render(<CuponsView />);

    expect(
      screen.getByText("Cupom real"),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(
        "Código do cupom",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Criar cupom",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Inativar",
      }),
    ).not.toBeInTheDocument();
  });

  it("cupom inativo não inventa reativação", () => {
    cuponsMock.mockReturnValue({
      query: query([
        {
          ...cupomAtivo,
          ativo: false,
        },
      ]),
      createMutation: mutation(),
      updateMutation: mutation(),
      inativarMutation: mutation(),
      validarMutation: mutation(),
    });

    render(<CuponsView />);

    expect(
      screen.getByText("Inativo"),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /reativar/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Inativar",
      }),
    ).not.toBeInTheDocument();
  });

  it("exige confirmação antes da inativação", () => {
    render(<CuponsView />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Inativar",
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "Confirmar inativação",
      }),
    ).toBeInTheDocument();
  });

  it("diferencia lista vazia", () => {
    cuponsMock.mockReturnValue({
      query: query([]),
      createMutation: mutation(),
      updateMutation: mutation(),
      inativarMutation: mutation(),
      validarMutation: mutation(),
    });

    render(<CuponsView />);

    expect(
      screen.getByText(
        "Nenhum cupom cadastrado",
      ),
    ).toBeInTheDocument();
  });
});
