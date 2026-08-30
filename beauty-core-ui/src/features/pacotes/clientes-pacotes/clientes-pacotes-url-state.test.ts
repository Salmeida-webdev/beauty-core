import {
  describe,
  expect,
  it,
} from "vitest";

import {
  parseClientesPacotesStatusFilter,
  parseClientesPacotesUrlState,
  serializeClientesPacotesUrlState,
} from "./clientes-pacotes-url-state";

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

describe("clientes-pacotes URL state", () => {
  it("aceita cliente UUID e status real", () => {
    const params =
      new URLSearchParams({
        clienteId,
        status: "ATIVO",
      });

    expect(
      parseClientesPacotesUrlState(
        params,
      ),
    ).toEqual({
      clienteId,
      status: "ATIVO",
    });
  });

  it("descarta UUID e status inválidos", () => {
    const params =
      new URLSearchParams({
        clienteId: "invalido",
        status: "QUALQUER",
      });

    expect(
      parseClientesPacotesUrlState(
        params,
      ),
    ).toEqual({
      clienteId: null,
      status: "TODOS",
    });
  });

  it("não serializa defaults", () => {
    expect(
      serializeClientesPacotesUrlState({
        clienteId: null,
        status: "TODOS",
      }).toString(),
    ).toBe("");
  });

  it("preserva cliente e filtro", () => {
    expect(
      serializeClientesPacotesUrlState({
        clienteId,
        status: "FINALIZADO",
      }).toString(),
    ).toBe(
      `clienteId=${clienteId}&status=FINALIZADO`,
    );
  });

  it("normaliza filtro isoladamente", () => {
    expect(
      parseClientesPacotesStatusFilter(
        "VENCIDO",
      ),
    ).toBe("VENCIDO");

    expect(
      parseClientesPacotesStatusFilter(
        "INVALIDO",
      ),
    ).toBe("TODOS");
  });
});
