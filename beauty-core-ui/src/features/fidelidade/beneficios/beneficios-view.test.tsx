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
  beneficiosMock,
} = vi.hoisted(() => ({
  authState: {
    role: "ADMIN",
  },
  beneficiosMock: vi.fn(),
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

vi.mock("./use-beneficios", () => ({
  useBeneficios: beneficiosMock,
}));

import { BeneficiosView } from "./beneficios-view";

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

const beneficioAtivo = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  nome: "Benefício personalizado",
  descricao: "Descrição real",
  pontosNecessarios: 100,
  ativo: true,
  createdAt: "2026-08-30T12:00:00.000Z",
  updatedAt: "2026-08-30T12:00:00.000Z",
};

afterEach(() => {
  cleanup();
});

describe("BeneficiosView", () => {
  beforeEach(() => {
    authState.role = "ADMIN";

    beneficiosMock.mockReset();

    beneficiosMock.mockReturnValue({
      query: query([beneficioAtivo]),
      createMutation: mutation(),
      updateMutation: mutation(),
      inativarMutation: mutation(),
    });
  });

  it("ADMIN visualiza gestão completa", () => {
    render(<BeneficiosView />);

    expect(
      screen.getByRole("button", {
        name: "Criar benefício",
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

  it("PROFISSIONAL possui somente leitura", () => {
    authState.role = "PROFISSIONAL";

    render(<BeneficiosView />);

    expect(
      screen.getByText(
        "Benefício personalizado",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Criar benefício",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Inativar",
      }),
    ).not.toBeInTheDocument();
  });

  it("benefício inativo não oferece reativação", () => {
    beneficiosMock.mockReturnValue({
      query: query([
        {
          ...beneficioAtivo,
          ativo: false,
        },
      ]),
      createMutation: mutation(),
      updateMutation: mutation(),
      inativarMutation: mutation(),
    });

    render(<BeneficiosView />);

    expect(
      screen.getByText("Inativo"),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Inativar",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: /reativar/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("exige confirmação antes de inativar", () => {
    render(<BeneficiosView />);

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
    beneficiosMock.mockReturnValue({
      query: query([]),
      createMutation: mutation(),
      updateMutation: mutation(),
      inativarMutation: mutation(),
    });

    render(<BeneficiosView />);

    expect(
      screen.getByText(
        "Nenhum benefício cadastrado",
      ),
    ).toBeInTheDocument();
  });
});
