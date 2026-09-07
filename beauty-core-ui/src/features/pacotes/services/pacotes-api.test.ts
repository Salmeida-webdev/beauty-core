import { beforeEach, describe, expect, it, vi } from "vitest";

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}));

vi.mock("@/services/api/api-client", () => ({
  getApiClient: () => ({
    get: getMock,
  }),
}));

import { pacotesApi } from "./pacotes-api";

const id = "550e8400-e29b-41d4-a716-446655440000";

describe("pacotesApi", () => {
  beforeEach(() => {
    getMock.mockReset();
  });

  it("lista pacotes sem empresaId", async () => {
    getMock.mockResolvedValue({
      data: [
        {
          id,
          empresaId: "empresa-interna",
          nome: "Pacote real",
          descricao: null,
          valor: "100.00",
          quantidadeSessoes: 5,
          validadeDias: null,
          ativo: true,
          createdAt: "2026-08-30T12:00:00.000Z",
          updatedAt: "2026-08-30T12:00:00.000Z",
        },
      ],
    });

    const result = await pacotesApi.getPacotes();

    expect(getMock).toHaveBeenCalledWith("/pacotes");
    expect(getMock.mock.calls[0]).toHaveLength(1);
    expect(result[0]).not.toHaveProperty("empresaId");
  });

  it("lista pacotes de cliente pelo endpoint real", async () => {
    getMock.mockResolvedValue({
      data: [],
    });

    await pacotesApi.getClientePacotes(id);

    expect(getMock).toHaveBeenCalledWith(
      `/clientes-pacotes/cliente/${id}`,
    );
  });

  it("lista clientes-pacotes sem parâmetros tenant", async () => {
    getMock.mockResolvedValue({
      data: [],
    });

    await pacotesApi.getClientesPacotes();

    expect(getMock).toHaveBeenCalledWith("/clientes-pacotes");
    expect(getMock.mock.calls[0]).toHaveLength(1);
  });
});
