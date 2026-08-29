import { describe, expect, it } from "vitest";

import {
  parseUsuariosListSearchParams,
  serializeUsuariosListState,
  toUsuariosListParams,
  USUARIOS_LIST_DEFAULTS,
} from "@/features/usuarios/utils/usuarios-list-url";

describe("usuarios list URL state", () => {
  it("usa defaults seguros", () => {
    expect(parseUsuariosListSearchParams(new URLSearchParams())).toEqual(
      USUARIOS_LIST_DEFAULTS,
    );
  });

  it("le todos os parametros suportados", () => {
    expect(
      parseUsuariosListSearchParams(
        new URLSearchParams(
          "page=2&limit=50&search=Maria&orderBy=nome&orderDirection=asc&role=PROFISSIONAL",
        ),
      ),
    ).toEqual({
      page: 2,
      limit: 50,
      search: "Maria",
      orderBy: "nome",
      orderDirection: "asc",
      role: "PROFISSIONAL",
    });
  });

  it("ignora valores invalidos", () => {
    expect(
      parseUsuariosListSearchParams(
        new URLSearchParams(
          "page=0&limit=999&orderBy=senha&orderDirection=x&role=CLIENTE",
        ),
      ),
    ).toEqual(USUARIOS_LIST_DEFAULTS);
  });

  it("remove defaults da URL", () => {
    expect(
      serializeUsuariosListState({
        ...USUARIOS_LIST_DEFAULTS,
      }).toString(),
    ).toBe("");
  });

  it("serializa estado relevante", () => {
    expect(
      serializeUsuariosListState({
        ...USUARIOS_LIST_DEFAULTS,
        page: 3,
        search: " Maria ",
        role: "GERENTE",
      }).toString(),
    ).toBe("page=3&search=Maria&role=GERENTE");
  });

  it("converte estado para API", () => {
    expect(
      toUsuariosListParams({
        ...USUARIOS_LIST_DEFAULTS,
        search: " Ana ",
        role: "RECEPCAO",
      }),
    ).toEqual({
      page: 1,
      limit: 20,
      search: "Ana",
      orderBy: "createdAt",
      orderDirection: "desc",
      role: "RECEPCAO",
    });
  });
});
