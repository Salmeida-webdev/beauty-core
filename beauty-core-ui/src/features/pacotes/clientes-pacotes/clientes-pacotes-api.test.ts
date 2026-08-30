import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

const {
  getMock,
  postMock,
  patchMock,
} = vi.hoisted(() => ({
  getMock: vi.fn(),
  postMock: vi.fn(),
  patchMock: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: getMock,
    post: postMock,
    patch: patchMock,
  }),
}));

import { clientesPacotesApi } from "./clientes-pacotes-api";

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

const pacoteId =
  "550e8400-e29b-41d4-a716-446655440001";

const clientePacoteId =
  "550e8400-e29b-41d4-a716-446655440002";

const clientePacote = {
  id: clientePacoteId,
  clienteId,
  pacoteId,
  sessoesTotal: 5,
  sessoesUsadas: 0,
  sessoesRestantes: 5,
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
    id: pacoteId,
    nome: "Pacote real",
    descricao: null,
    quantidadeSessoes: 5,
    validadeDias: 30,
    ativo: true,
  },
};

describe("clientesPacotesApi", () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    patchMock.mockReset();
  });

  it("lista todos pelo endpoint real", async () => {
    getMock.mockResolvedValue({
      data: [clientePacote],
    });

    await clientesPacotesApi.all();

    expect(getMock).toHaveBeenCalledWith(
      "/clientes-pacotes",
    );
  });

  it("lista pelo cliente", async () => {
    getMock.mockResolvedValue({
      data: [clientePacote],
    });

    await clientesPacotesApi.byCliente(
      clienteId,
    );

    expect(getMock).toHaveBeenCalledWith(
      `/clientes-pacotes/cliente/${clienteId}`,
    );
  });

  it("atribui somente clienteId + pacoteId", async () => {
    postMock.mockResolvedValue({
      data: clientePacote,
    });

    const payload = {
      clienteId,
      pacoteId,
    };

    await clientesPacotesApi.create(
      payload,
    );

    expect(postMock).toHaveBeenCalledWith(
      "/clientes-pacotes",
      payload,
    );

    expect(payload).not.toHaveProperty(
      "valorPago",
    );

    expect(payload).not.toHaveProperty(
      "origem",
    );

    expect(payload).not.toHaveProperty(
      "sessoesTotal",
    );
  });

  it("consome uma sessão pelo endpoint real sem body", async () => {
    patchMock.mockResolvedValue({
      data: {
        ...clientePacote,
        sessoesUsadas: 1,
        sessoesRestantes: 4,
      },
    });

    await clientesPacotesApi.usarSessao(
      clientePacoteId,
    );

    expect(patchMock).toHaveBeenCalledWith(
      `/clientes-pacotes/${clientePacoteId}/usar-sessao`,
    );

    expect(
      patchMock.mock.calls[0],
    ).toHaveLength(1);
  });
  it("cancela pelo endpoint real", async () => {
    patchMock.mockResolvedValue({
      data: {
        ...clientePacote,
        status: "CANCELADO",
      },
    });

    await clientesPacotesApi.cancelar(
      clientePacoteId,
    );

    expect(patchMock).toHaveBeenCalledWith(
      `/clientes-pacotes/${clientePacoteId}/cancelar`,
    );
  });
});
