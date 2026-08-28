import {
  describe,
  expect,
  it,
} from "vitest";

import {
  clientesKeys,
} from "@/features/clientes/queries/clientes-keys";

describe("clientes query keys", () => {
  it("cria raiz estável", () => {
    expect(clientesKeys.all).toEqual([
      "clientes",
    ]);
  });

  it("normaliza defaults da listagem", () => {
    expect(
      clientesKeys.list({}),
    ).toEqual([
      "clientes",
      "list",
      1,
      20,
      null,
      "createdAt",
      "desc",
    ]);
  });

  it("inclui filtros server-side na chave", () => {
    expect(
      clientesKeys.list({
        page: 3,
        limit: 50,
        search: "Ana",
        orderBy: "nome",
        orderDirection: "asc",
      }),
    ).toEqual([
      "clientes",
      "list",
      3,
      50,
      "Ana",
      "nome",
      "asc",
    ]);
  });

  it("isola detalhe por cliente", () => {
    expect(
      clientesKeys.detail("cliente-1"),
    ).toEqual([
      "clientes",
      "detail",
      "cliente-1",
    ]);
  });
});
