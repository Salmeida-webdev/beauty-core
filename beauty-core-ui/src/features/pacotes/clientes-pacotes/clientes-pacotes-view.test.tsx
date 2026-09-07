import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
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
  optionsMock,
  clientesPacotesMock,
} = vi.hoisted(() => ({
  authState: {
    role: "ADMIN",
  },

  optionsMock: vi.fn(),

  clientesPacotesMock:
    vi.fn(),
}));

const routerReplaceMock =
  vi.hoisted(
    () => vi.fn(),
  );

const navigationState =
  vi.hoisted(() => ({
    clienteId:
      null as string | null,

    status:
      null as string | null,
  }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace:
      routerReplaceMock,
  }),

  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "clienteId") {
        return navigationState.clienteId;
      }

      if (key === "status") {
        return navigationState.status;
      }

      return null;
    },
  }),
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

vi.mock(
  "./use-clientes-pacotes-options",
  () => ({
    useClientesPacotesOptions:
      optionsMock,
  }),
);

vi.mock(
  "./use-clientes-pacotes",
  () => ({
    useClientesPacotes:
      clientesPacotesMock,
  }),
);

import { ClientesPacotesView } from "./clientes-pacotes-view";

const cliente = {
  id:
    "550e8400-e29b-41d4-a716-446655440000",
  empresaId:
    "550e8400-e29b-41d4-a716-446655440009",
  nome: "Maria Silva",
  telefone: "83999999999",
  email: "maria@example.com",
  foto: null,
  dataNascimento: null,
  observacoes: null,
  ativo: true,
  ativoPortal: false,
  aceitouTermos: false,
  dataAceiteTermos: null,
  ultimoAcessoPortal: null,
  createdAt:
    "2026-01-01T10:00:00.000Z",
  updatedAt:
    "2026-08-30T10:00:00.000Z",
};

const pacote = {
  id:
    "550e8400-e29b-41d4-a716-446655440001",
  nome: "Pacote Premium",
  descricao: null,
  valor: 500,
  quantidadeSessoes: 5,
  validadeDias: 30,
  ativo: true,
  createdAt:
    "2026-08-30T10:00:00.000Z",
  updatedAt:
    "2026-08-30T10:00:00.000Z",
};

const clientePacote = {
  id:
    "550e8400-e29b-41d4-a716-446655440002",
  clienteId: cliente.id,
  pacoteId: pacote.id,
  sessoesTotal: 5,
  sessoesUsadas: 1,
  sessoesRestantes: 4,
  dataCompra:
    "2026-08-30T12:00:00.000Z",
  dataValidade:
    "2026-09-29T12:00:00.000Z",
  status: "ATIVO",
  createdAt:
    "2026-08-30T12:00:00.000Z",
  updatedAt:
    "2026-08-30T12:00:00.000Z",
  pacote: {
    id: pacote.id,
    nome: pacote.nome,
    descricao: null,
    quantidadeSessoes: 5,
    validadeDias: 30,
    ativo: true,
  },
};

function mutation() {
  return {
    mutateAsync: vi.fn(),
    isPending: false,
    isError: false,
  };
}

function packageQuery(
  data: unknown[],
) {
  return {
    data,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  };
}

function setupOptions() {
  optionsMock.mockReturnValue({
      clienteQuery: {
        data: undefined,
        isPending: false,
        isError: false,
        refetch: vi.fn(),
      },
    clientesQuery: {
      data: {
        data: [cliente],
        meta: {
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
        },
      },
      isPending: false,
      isError: false,
      refetch: vi.fn(),
    },

    pacotesQuery: packageQuery([
      pacote,
    ]),
  });

  clientesPacotesMock.mockReturnValue({
    query: packageQuery([
      clientePacote,
    ]),
    createMutation: mutation(),
    usarSessaoMutation: mutation(),
    cancelarMutation: mutation(),
  });
}

afterEach(() => {
  cleanup();
});

describe("ClientesPacotesView", () => {
  beforeEach(() => {
    navigationState.clienteId =
      null;

    navigationState.status =
      null;

    routerReplaceMock.mockReset();
    authState.role = "ADMIN";

    optionsMock.mockReset();
    clientesPacotesMock.mockReset();

    setupOptions();
  });

  it("ADMIN seleciona cliente e gerencia vínculo", () => {
    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "Atribuir pacote",
      }),
    ).toBeInTheDocument();

    const vinculosList =
      screen.getByRole("list", {
        name: "Pacotes vinculados ao cliente",
      });

    expect(
      within(vinculosList).getByText(
        "Pacote Premium",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Cancelar pacote",
      }),
    ).toBeInTheDocument();
  });

  it("GERENTE também cancela vínculo", () => {
    authState.role = "GERENTE";

    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "Cancelar pacote",
      }),
    ).toBeInTheDocument();
  });

  it("RECEPCAO lê mas não força catálogo indisponível", () => {
    authState.role = "RECEPCAO";

    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    expect(
      screen.getByText(
        /backend permite atribuição para este perfil/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Cancelar pacote",
      }),
    ).not.toBeInTheDocument();
  });

  it("PROFISSIONAL possui leitura sem gestão", () => {
    authState.role = "PROFISSIONAL";

    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    const vinculosList =
      screen.getByRole("list", {
        name: "Pacotes vinculados ao cliente",
      });

    expect(
      within(vinculosList).getByText(
        "Pacote Premium",
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Atribuir pacote",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Cancelar pacote",
      }),
    ).not.toBeInTheDocument();
  });

  it("exige confirmação antes de cancelar", () => {
    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancelar pacote",
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "Confirmar cancelamento",
      }),
    ).toBeInTheDocument();
  });


  it("exige confirmação explícita para consumir uma sessão", () => {
    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    const usarButton =
      screen.getByRole("button", {
        name: "Usar 1 sessão",
      });

    expect(
      usarButton,
    ).toBeInTheDocument();

    fireEvent.click(
      usarButton,
    );

    expect(
      screen.getByRole("button", {
        name: "Confirmar uso de 1 sessão",
      }),
    ).toBeInTheDocument();
  });

  it("PROFISSIONAL pode consumir sessão sem receber gestão administrativa", () => {
    authState.role = "PROFISSIONAL";

    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: "Usar 1 sessão",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Cancelar pacote",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Atribuir pacote",
      }),
    ).not.toBeInTheDocument();
  });

  it("não oferece consumo para pacote FINALIZADO", () => {
    clientesPacotesMock.mockReturnValue({
      query: packageQuery([
        {
          ...clientePacote,
          status: "FINALIZADO",
          sessoesUsadas: 5,
          sessoesRestantes: 0,
        },
      ]),
      createMutation: mutation(),
      usarSessaoMutation: mutation(),
      cancelarMutation: mutation(),
    });

    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    expect(
      screen.queryByRole("button", {
        name: "Usar 1 sessão",
      }),
    ).not.toBeInTheDocument();
  });

  it("persiste cliente selecionado na URL", () => {
    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    expect(
      routerReplaceMock,
    ).toHaveBeenCalledWith(
      `/pacotes?clienteId=${cliente.id}`,
      {
        scroll: false,
      },
    );
  });

  it("restaura clienteId vindo da URL", () => {
    navigationState.clienteId =
      cliente.id;

    optionsMock.mockReturnValue({
      clientesQuery: {
        data: {
          data: [cliente],
          meta: {
            total: 1,
            page: 1,
            limit: 20,
            totalPages: 1,
          },
        },
        isPending: false,
        isError: false,
        refetch: vi.fn(),
      },

      clienteQuery: {
        data: cliente,
        isPending: false,
        isError: false,
        refetch: vi.fn(),
      },

      pacotesQuery:
        packageQuery([
          pacote,
        ]),
    });

    render(
      <ClientesPacotesView />,
    );

    expect(
      screen.getByText(
        "Cliente selecionado",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name:
          "Abrir fidelidade deste cliente",
      }),
    ).toHaveAttribute(
      "href",
      `/fidelidade?clienteId=${cliente.id}`,
    );
  });

  it("persiste status sem perder cliente selecionado", () => {
    render(
      <ClientesPacotesView />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Maria Silva/i,
      }),
    );

    fireEvent.change(
      screen.getByLabelText(
        "Status",
      ),
      {
        target: {
          value:
            "FINALIZADO",
        },
      },
    );

    expect(
      routerReplaceMock,
    ).toHaveBeenLastCalledWith(
      `/pacotes?clienteId=${cliente.id}&status=FINALIZADO`,
      {
        scroll: false,
      },
    );
  });});
