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

import { pacotesCatalogoApi } from "./pacotes-catalogo-api";

const pacote = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  nome: "Pacote real",
  descricao: "Descrição",
  valor: 100,
  quantidadeSessoes: 5,
  validadeDias: 30,
  ativo: true,
  createdAt: "2026-08-30T12:00:00.000Z",
  updatedAt: "2026-08-30T12:00:00.000Z",
};

const id =
  "550e8400-e29b-41d4-a716-446655440000";

describe("pacotesCatalogoApi", () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    patchMock.mockReset();
  });

  it("lista pacotes", async () => {
    getMock.mockResolvedValue({
      data: [pacote],
    });

    await pacotesCatalogoApi.list();

    expect(getMock).toHaveBeenCalledWith(
      "/pacotes",
    );
  });

  it("consulta detalhe", async () => {
    getMock.mockResolvedValue({
      data: pacote,
    });

    await pacotesCatalogoApi.detail(id);

    expect(getMock).toHaveBeenCalledWith(
      `/pacotes/${id}`,
    );
  });

  it("cria com DTO real", async () => {
    postMock.mockResolvedValue({
      data: pacote,
    });

    const payload = {
      nome: "Pacote real",
      descricao: "Descrição",
      valor: 100,
      quantidadeSessoes: 5,
      validadeDias: 30,
    };

    await pacotesCatalogoApi.create(
      payload,
    );

    expect(postMock).toHaveBeenCalledWith(
      "/pacotes",
      payload,
    );

    expect(payload).not.toHaveProperty(
      "ativo",
    );

    expect(payload).not.toHaveProperty(
      "empresaId",
    );

    expect(payload).not.toHaveProperty(
      "servicos",
    );
  });

  it("edita pelo PATCH real", async () => {
    patchMock.mockResolvedValue({
      data: pacote,
    });

    const payload = {
      nome: "Pacote atualizado",
      valor: 120,
      quantidadeSessoes: 6,
    };

    await pacotesCatalogoApi.update(
      id,
      payload,
    );

    expect(patchMock).toHaveBeenCalledWith(
      `/pacotes/${id}`,
      payload,
    );
  });

  it("inativa pelo endpoint real", async () => {
    patchMock.mockResolvedValue({
      data: {
        ...pacote,
        ativo: false,
      },
    });

    await pacotesCatalogoApi.inativar(id);

    expect(patchMock).toHaveBeenCalledWith(
      `/pacotes/${id}/inativar`,
    );
  });
});
