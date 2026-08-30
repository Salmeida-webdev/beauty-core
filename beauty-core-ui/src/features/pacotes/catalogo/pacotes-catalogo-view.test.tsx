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
  catalogoMock,
} = vi.hoisted(() => ({
  authState: {
    role: "ADMIN",
  },

  catalogoMock: vi.fn(),
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

vi.mock("./use-pacotes-catalogo", () => ({
  usePacotesCatalogo:
    catalogoMock,
}));

import { PacotesCatalogoView } from "./pacotes-catalogo-view";

function mutation() {
  return {
    mutateAsync: vi.fn(),
    isPending: false,
    isError: false,
  };
}

function query(
  data: unknown[],
) {
  return {
    data,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  };
}

const pacoteAtivo = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  nome: "Pacote real",
  descricao: "Descrição",
  valor: 100,
  quantidadeSessoes: 5,
  validadeDias: 30,
  ativo: true,
  createdAt:
    "2026-08-30T12:00:00.000Z",
  updatedAt:
    "2026-08-30T12:00:00.000Z",
};

afterEach(() => {
  cleanup();
});

describe("PacotesCatalogoView", () => {
  beforeEach(() => {
    authState.role = "ADMIN";

    catalogoMock.mockReset();

    catalogoMock.mockReturnValue({
      query: query([
        pacoteAtivo,
      ]),
      createMutation: mutation(),
      updateMutation: mutation(),
      inativarMutation: mutation(),
    });
  });

  it("ADMIN gerencia catálogo", () => {
    render(
      <PacotesCatalogoView />,
    );

    expect(
      screen.getByRole("button", {
        name: "Criar pacote",
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
  });

  it("GERENTE gerencia catálogo", () => {
    authState.role = "GERENTE";

    render(
      <PacotesCatalogoView />,
    );

    expect(
      screen.getByText(
        "Pacote real",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Criar pacote",
      }),
    ).toBeInTheDocument();
  });

  it("RECEPCAO não acessa catálogo administrativo", () => {
    authState.role = "RECEPCAO";

    render(
      <PacotesCatalogoView />,
    );

    expect(
      screen.getByText(
        /não possui acesso ao catálogo administrativo/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Pacote real",
      ),
    ).not.toBeInTheDocument();
  });

  it("exige confirmação antes de inativar", () => {
    render(
      <PacotesCatalogoView />,
    );

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

  it("não inventa reativação", () => {
    catalogoMock.mockReturnValue({
      query: query([
        {
          ...pacoteAtivo,
          ativo: false,
        },
      ]),
      createMutation: mutation(),
      updateMutation: mutation(),
      inativarMutation: mutation(),
    });

    render(
      <PacotesCatalogoView />,
    );

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

  it("diferencia catálogo vazio", () => {
    catalogoMock.mockReturnValue({
      query: query([]),
      createMutation: mutation(),
      updateMutation: mutation(),
      inativarMutation: mutation(),
    });

    render(
      <PacotesCatalogoView />,
    );

    expect(
      screen.getByText(
        "Nenhum pacote cadastrado",
      ),
    ).toBeInTheDocument();
  });
});
