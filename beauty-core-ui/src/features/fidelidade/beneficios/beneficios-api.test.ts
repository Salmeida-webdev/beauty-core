import { beforeEach, describe, expect, it, vi } from "vitest";

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

import { beneficiosApi } from "./beneficios-api";

const id = "550e8400-e29b-41d4-a716-446655440000";

const beneficio = {
  id,
  nome: "Benefício personalizado",
  descricao: "Descrição",
  pontosNecessarios: 100,
  ativo: true,
  createdAt: "2026-08-30T12:00:00.000Z",
  updatedAt: "2026-08-30T12:00:00.000Z",
};

describe("beneficiosApi", () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    patchMock.mockReset();
  });

  it("lista benefícios", async () => {
    getMock.mockResolvedValue({
      data: [beneficio],
    });

    await beneficiosApi.list();

    expect(getMock).toHaveBeenCalledWith(
      "/beneficios",
    );
  });

  it("busca benefício por id", async () => {
    getMock.mockResolvedValue({
      data: beneficio,
    });

    await beneficiosApi.getById(id);

    expect(getMock).toHaveBeenCalledWith(
      `/beneficios/${id}`,
    );
  });

  it("cria sem ativo ou empresaId", async () => {
    postMock.mockResolvedValue({
      data: beneficio,
    });

    const payload = {
      nome: "Benefício personalizado",
      descricao: "Descrição",
      pontosNecessarios: 100,
    };

    await beneficiosApi.create(payload);

    expect(postMock).toHaveBeenCalledWith(
      "/beneficios",
      payload,
    );

    expect(payload).not.toHaveProperty("ativo");
    expect(payload).not.toHaveProperty("empresaId");
  });

  it("atualiza pelo PATCH real", async () => {
    patchMock.mockResolvedValue({
      data: beneficio,
    });

    const payload = {
      nome: "Benefício atualizado",
      pontosNecessarios: 200,
    };

    await beneficiosApi.update(
      id,
      payload,
    );

    expect(patchMock).toHaveBeenCalledWith(
      `/beneficios/${id}`,
      payload,
    );
  });

  it("inativa sem inventar delete ou toggle", async () => {
    patchMock.mockResolvedValue({
      data: {
        ...beneficio,
        ativo: false,
      },
    });

    await beneficiosApi.inativar(id);

    expect(patchMock).toHaveBeenCalledWith(
      `/beneficios/${id}/inativar`,
    );
  });
});
