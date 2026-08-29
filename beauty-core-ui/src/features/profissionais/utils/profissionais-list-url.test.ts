import { describe, expect, it } from "vitest";

import {
  parseProfissionaisListSearchParams,
  PROFISSIONAIS_LIST_DEFAULTS,
  serializeProfissionaisListState,
  toProfissionaisListParams,
} from "@/features/profissionais/utils/profissionais-list-url";

describe("profissionais list URL state", () => {
  it("usa defaults seguros", () => {
    expect(parseProfissionaisListSearchParams(new URLSearchParams())).toEqual(
      PROFISSIONAIS_LIST_DEFAULTS,
    );
  });

  it("le os parametros suportados", () => {
    expect(
      parseProfissionaisListSearchParams(
        new URLSearchParams(
          "page=2&limit=50&search=Maria&orderBy=nome&orderDirection=asc",
        ),
      ),
    ).toEqual({
      page: 2,
      limit: 50,
      search: "Maria",
      orderBy: "nome",
      orderDirection: "asc",
    });
  });

  it("descarta valores invalidos", () => {
    expect(
      parseProfissionaisListSearchParams(
        new URLSearchParams("page=0&limit=999&orderBy=role&orderDirection=x"),
      ),
    ).toEqual(PROFISSIONAIS_LIST_DEFAULTS);
  });

  it("remove defaults da URL", () => {
    expect(
      serializeProfissionaisListState({
        ...PROFISSIONAIS_LIST_DEFAULTS,
      }).toString(),
    ).toBe("");
  });

  it("serializa somente estado relevante", () => {
    expect(
      serializeProfissionaisListState({
        ...PROFISSIONAIS_LIST_DEFAULTS,
        page: 3,
        search: " Maria ",
      }).toString(),
    ).toBe("page=3&search=Maria");
  });

  it("fixa PROFISSIONAL no request da API", () => {
    expect(
      toProfissionaisListParams({
        ...PROFISSIONAIS_LIST_DEFAULTS,
        search: " Ana ",
      }),
    ).toEqual({
      page: 1,
      limit: 20,
      search: "Ana",
      orderBy: "createdAt",
      orderDirection: "desc",
      role: "PROFISSIONAL",
    });
  });
});
