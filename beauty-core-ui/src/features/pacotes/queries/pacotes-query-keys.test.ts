import { describe, expect, it } from "vitest";

import { pacotesQueryKeys } from "./pacotes-query-keys";

describe("pacotesQueryKeys", () => {
  it("mantém catálogo e clientes-pacotes separados", () => {
    expect(pacotesQueryKeys.list()).toEqual([
      "pacotes",
      "list",
    ]);

    expect(pacotesQueryKeys.clientesPacotes()).toEqual([
      "pacotes",
      "clientes-pacotes",
    ]);
  });

  it("segmenta pacotes por cliente sem empresaId", () => {
    const key = pacotesQueryKeys.clientePacotes("cliente-1");

    expect(key).toEqual([
      "pacotes",
      "clientes-pacotes",
      "cliente",
      "cliente-1",
    ]);

    expect(JSON.stringify(key)).not.toContain("empresaId");
  });
});
