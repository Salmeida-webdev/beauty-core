import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildClienteDetailHref,
  buildClientesListHref,
  CLIENTES_LIST_DEFAULTS,
  parseClientesListSearchParams,
  serializeClientesListState,
  toClientesListParams,
} from "@/features/clientes/utils/clientes-list-url";

describe("clientes list url", () => {
  it("aplica defaults quando a URL está vazia", () => {
    expect(
      parseClientesListSearchParams(
        new URLSearchParams(),
      ),
    ).toEqual(
      CLIENTES_LIST_DEFAULTS,
    );
  });

  it("interpreta paginação, busca e ordenação válidas", () => {
    const params = new URLSearchParams(
      "page=3&limit=50&search=Maria&orderBy=nome&orderDirection=asc",
    );

    expect(
      parseClientesListSearchParams(
        params,
      ),
    ).toEqual({
      page: 3,
      limit: 50,
      search: "Maria",
      orderBy: "nome",
      orderDirection: "asc",
    });
  });

  it("normaliza parâmetros inválidos individualmente", () => {
    const params = new URLSearchParams(
      "page=-2&limit=999&search=%20Ana%20&orderBy=cpf&orderDirection=random",
    );

    expect(
      parseClientesListSearchParams(
        params,
      ),
    ).toEqual({
      page: 1,
      limit: 20,
      search: "Ana",
      orderBy: "createdAt",
      orderDirection: "desc",
    });
  });

  it("omite defaults da query string", () => {
    expect(
      serializeClientesListState(
        CLIENTES_LIST_DEFAULTS,
      ).toString(),
    ).toBe("");
  });

  it("serializa somente estado não padrão", () => {
    expect(
      serializeClientesListState({
        ...CLIENTES_LIST_DEFAULTS,
        page: 2,
        search: "Maria",
        orderBy: "nome",
        orderDirection: "asc",
      }).toString(),
    ).toBe(
      "page=2&search=Maria&orderBy=nome&orderDirection=asc",
    );
  });

  it("converte estado visual para parâmetros da API", () => {
    expect(
      toClientesListParams({
        ...CLIENTES_LIST_DEFAULTS,
        search: "",
      }),
    ).toEqual({
      page: 1,
      limit: 20,
      orderBy: "createdAt",
      orderDirection: "desc",
    });

    expect(
      toClientesListParams({
        ...CLIENTES_LIST_DEFAULTS,
        search: "Maria",
      }),
    ).toEqual({
      page: 1,
      limit: 20,
      search: "Maria",
      orderBy: "createdAt",
      orderDirection: "desc",
    });
  });

  it("preserva filtros ao navegar para o perfil", () => {
    expect(
      buildClienteDetailHref(
        "cliente-123",
        {
          page: 4,
          limit: 50,
          search: "Maria",
          orderBy: "nome",
          orderDirection: "asc",
        },
      ),
    ).toBe(
      "/clientes/cliente-123?page=4&limit=50&search=Maria&orderBy=nome&orderDirection=asc",
    );
  });

  it("gera retorno limpo para a listagem", () => {
    expect(
      buildClientesListHref(
        CLIENTES_LIST_DEFAULTS,
      ),
    ).toBe("/clientes");

    expect(
      buildClientesListHref({
        ...CLIENTES_LIST_DEFAULTS,
        search: "Ana",
      }),
    ).toBe(
      "/clientes?search=Ana",
    );
  });
});
