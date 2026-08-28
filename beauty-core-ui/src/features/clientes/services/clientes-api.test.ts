import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  createCliente,
  getClienteById,
  getClientes,
  updateCliente,
} from "@/features/clientes/services/clientes-api";

type ApiResponse = Promise<{
  data: unknown;
}>;

type ApiGet = (
  url: string,
  config?: unknown,
) => ApiResponse;

type ApiPost = (
  url: string,
  payload?: unknown,
) => ApiResponse;

type ApiPatch = (
  url: string,
  payload?: unknown,
) => ApiResponse;

const apiGet = vi.hoisted(
  () => vi.fn<ApiGet>(),
);

const apiPost = vi.hoisted(
  () => vi.fn<ApiPost>(),
);

const apiPatch = vi.hoisted(
  () => vi.fn<ApiPatch>(),
);

vi.mock(
  "@/services/api/api-client",
  () => ({
    getApiClient: () => ({
      get: apiGet,
      post: apiPost,
      patch: apiPatch,
    }),
  }),
);

const cliente = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId:
    "550e8400-e29b-41d4-a716-446655440001",
  nome: "Maria Silva",
  telefone:
    "83999999999",
  email:
    "maria@example.com",
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
    "2026-08-20T15:00:00.000Z",
};

beforeEach(() => {
  apiGet.mockReset();
  apiPost.mockReset();
  apiPatch.mockReset();
});

describe("clientes api", () => {
  it("lista clientes usando somente parâmetros permitidos", async () => {
    apiGet.mockResolvedValue({
      data: {
        data: [cliente],
        meta: {
          total: 1,
          page: 2,
          limit: 20,
          totalPages: 1,
        },
      },
    });

    await getClientes({
      page: 2,
      limit: 20,
      search: " Maria ",
      orderBy: "nome",
      orderDirection: "asc",
    });

    expect(apiGet).toHaveBeenCalledWith(
      "/clientes",
      {
        params: {
          page: 2,
          limit: 20,
          search: "Maria",
          orderBy: "nome",
          orderDirection: "asc",
        },
      },
    );
  });

  it("aplica defaults reais na listagem", async () => {
    apiGet.mockResolvedValue({
      data: {
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
        },
      },
    });

    await getClientes();

    expect(apiGet).toHaveBeenCalledWith(
      "/clientes",
      {
        params: {
          page: 1,
          limit: 20,
          orderBy:
            "createdAt",
          orderDirection:
            "desc",
        },
      },
    );
  });

  it("não envia empresaId pela listagem", async () => {
    apiGet.mockResolvedValue({
      data: {
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
        },
      },
    });

    await getClientes({
      search: "Maria",
    });

    const config =
      apiGet.mock.calls[0]?.[1];

    expect(config).not.toEqual(
      expect.objectContaining({
        empresaId:
          expect.anything(),
      }),
    );
  });

  it("busca detalhe pelo ID", async () => {
    apiGet.mockResolvedValue({
      data: cliente,
    });

    await expect(
      getClienteById(cliente.id),
    ).resolves.toEqual(cliente);

    expect(apiGet).toHaveBeenCalledWith(
      `/clientes/${cliente.id}`,
    );
  });

  it("cria cliente pelo contrato real", async () => {
    apiPost.mockResolvedValue({
      data: cliente,
    });

    const payload = {
      nome: "Maria Silva",
      telefone:
        "83999999999",
      email:
        "maria@example.com",
    };

    await expect(
      createCliente(payload),
    ).resolves.toEqual(cliente);

    expect(apiPost).toHaveBeenCalledWith(
      "/clientes",
      payload,
    );
  });

  it("edita cliente pelo contrato real", async () => {
    apiPatch.mockResolvedValue({
      data: cliente,
    });

    const payload = {
      nome: "Maria Silva",
      telefone:
        "83999999999",
    };

    await expect(
      updateCliente(
        cliente.id,
        payload,
      ),
    ).resolves.toEqual(cliente);

    expect(apiPatch).toHaveBeenCalledWith(
      `/clientes/${cliente.id}`,
      payload,
    );
  });

  it("não injeta empresaId em POST ou PATCH", async () => {
    apiPost.mockResolvedValue({
      data: cliente,
    });

    apiPatch.mockResolvedValue({
      data: cliente,
    });

    const payload = {
      nome: "Maria Silva",
      telefone:
        "83999999999",
    };

    await createCliente(payload);

    await updateCliente(
      cliente.id,
      payload,
    );

    expect(
      apiPost.mock.calls[0]?.[1],
    ).not.toHaveProperty(
      "empresaId",
    );

    expect(
      apiPatch.mock.calls[0]?.[1],
    ).not.toHaveProperty(
      "empresaId",
    );
  });

  it("rejeita resposta incompatível do backend", async () => {
    apiPost.mockResolvedValue({
      data: {
        id: "invalido",
      },
    });

    await expect(
      createCliente({
        nome: "Maria",
        telefone:
          "83999999999",
      }),
    ).rejects.toThrow();
  });
});
