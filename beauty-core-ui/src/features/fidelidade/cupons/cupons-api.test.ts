import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { cupomTipoValues } from "./cupom-tipos";

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

import { cuponsApi } from "./cupons-api";

const id =
  "550e8400-e29b-41d4-a716-446655440000";

const cupom = {
  id,
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

describe("cuponsApi", () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    patchMock.mockReset();
  });

  it("lista cupons", async () => {
    getMock.mockResolvedValue({
      data: [cupom],
    });

    await cuponsApi.list();

    expect(getMock).toHaveBeenCalledWith(
      "/cupons",
    );
  });

  it("busca por id", async () => {
    getMock.mockResolvedValue({
      data: cupom,
    });

    await cuponsApi.getById(id);

    expect(getMock).toHaveBeenCalledWith(
      `/cupons/${id}`,
    );
  });

  it("cria sem campos read-only ou tenant", async () => {
    postMock.mockResolvedValue({
      data: cupom,
    });

    const payload = {
      codigo: "CUPOM10",
      nome: "Cupom real",
      tipo: cupomTipoValues[0],
      valor: 10,
    };

    await cuponsApi.create(payload);

    expect(postMock).toHaveBeenCalledWith(
      "/cupons",
      payload,
    );

    expect(payload).not.toHaveProperty(
      "ativo",
    );

    expect(payload).not.toHaveProperty(
      "quantidadeUtilizada",
    );

    expect(payload).not.toHaveProperty(
      "empresaId",
    );
  });

  it("edita pelo PATCH real", async () => {
    patchMock.mockResolvedValue({
      data: cupom,
    });

    const payload = {
      codigo: "CUPOM20",
      nome: "Cupom atualizado",
      tipo: cupomTipoValues[0],
      valor: 20,
    };

    await cuponsApi.update(
      id,
      payload,
    );

    expect(patchMock).toHaveBeenCalledWith(
      `/cupons/${id}`,
      payload,
    );
  });

  it("inativa pelo endpoint real", async () => {
    patchMock.mockResolvedValue({
      data: {
        ...cupom,
        ativo: false,
      },
    });

    await cuponsApi.inativar(id);

    expect(patchMock).toHaveBeenCalledWith(
      `/cupons/${id}/inativar`,
    );
  });

  it("valida enviando somente codigo", async () => {
    postMock.mockResolvedValue({
      data: cupom,
    });

    await cuponsApi.validar(
      "CUPOM10",
    );

    expect(postMock).toHaveBeenCalledWith(
      "/cupons/validar",
      {
        codigo: "CUPOM10",
      },
    );
  });
});
