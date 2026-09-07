import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  getAgendaClienteOptions,
  getAgendaProfissionalOptions,
  getAgendaServicoOptions,
  getAgendaUnidadeOptions,
} from "@/features/agendamentos/services/agendamentos-options-api";
import { getClientes } from "@/features/clientes/services/clientes-api";
import { getServicos } from "@/features/servicos/services/servicos-api";
import { getApiClient } from "@/services/api/api-client";

const apiGetMock = vi.hoisted(() =>
  vi.fn(),
);

vi.mock(
  "@/features/clientes/services/clientes-api",
  () => ({
    getClientes: vi.fn(),
  }),
);

vi.mock(
  "@/features/servicos/services/servicos-api",
  () => ({
    getServicos: vi.fn(),
  }),
);

vi.mock("@/services/api/api-client", () => ({
  getApiClient: vi.fn(() => ({
    get: apiGetMock,
  })),
}));

describe("agendamentos options api", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getApiClient).mockReturnValue({
      get: apiGetMock,
    } as never);
  });

  it("reutiliza busca server-side de clientes", async () => {
    vi.mocked(getClientes).mockResolvedValue({
      data: [
        {
          id: "cliente-1",
          nome: "Maria",
          telefone: "83999999999",
          email: null,
        },
      ],
      meta: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      },
    } as never);

    const result =
      await getAgendaClienteOptions(
        " Maria ",
      );

    expect(getClientes).toHaveBeenCalledWith({
      page: 1,
      limit: 20,
      search: "Maria",
      orderBy: "nome",
      orderDirection: "asc",
    });

    expect(result).toEqual([
      {
        value: "cliente-1",
        label: "Maria",
        description: "83999999999",
      },
    ]);
  });

  it("reutiliza somente servicos ativos", async () => {
    vi.mocked(getServicos).mockResolvedValue([
      {
        id: "servico-1",
        nome: "Corte",
        duracaoMinutos: 45,
        ativo: true,
      },
      {
        id: "servico-2",
        nome: "Inativo",
        duracaoMinutos: 30,
        ativo: false,
      },
    ] as never);

    expect(
      await getAgendaServicoOptions(),
    ).toEqual([
      {
        value: "servico-1",
        label: "Corte",
        description: "45 min",
      },
    ]);
  });

  it("usa lookup seguro de profissionais", async () => {
    apiGetMock.mockResolvedValue({
      data: [
        {
          id: "profissional-1",
          nome: "Ana",
        },
      ],
    });

    const result =
      await getAgendaProfissionalOptions(
        " Ana ",
      );

    expect(getApiClient).toHaveBeenCalled();

    expect(apiGetMock).toHaveBeenCalledWith(
      "/agendamentos/opcoes/profissionais",
      {
        params: {
          search: "Ana",
        },
      },
    );

    expect(result).toEqual([
      {
        value: "profissional-1",
        label: "Ana",
      },
    ]);
  });

  it("usa lookup seguro de unidades", async () => {
    apiGetMock.mockResolvedValue({
      data: [
        {
          id: "unidade-1",
          nome: "Centro",
        },
      ],
    });

    const result =
      await getAgendaUnidadeOptions("");

    expect(getApiClient).toHaveBeenCalled();

    expect(apiGetMock).toHaveBeenCalledWith(
      "/agendamentos/opcoes/unidades",
      {
        params: undefined,
      },
    );

    expect(result).toEqual([
      {
        value: "unidade-1",
        label: "Centro",
      },
    ]);
  });
});