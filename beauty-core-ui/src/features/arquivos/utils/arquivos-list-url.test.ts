import { describe, expect, it } from "vitest";

import {
  buildArquivosListHref,
  parseArquivosListSearchParams,
} from "@/features/arquivos/utils/arquivos-list-url";

describe("arquivos list url", () => {
  it("le page e tipo validos", () => {
    const params = new URLSearchParams("page=3&tipo=DOCUMENTO");

    expect(parseArquivosListSearchParams(params)).toEqual({
      page: 3,
      tipo: "DOCUMENTO",
    });
  });

  it("normaliza pagina invalida", () => {
    expect(
      parseArquivosListSearchParams(new URLSearchParams("page=0")),
    ).toEqual({
      page: 1,
      tipo: null,
    });

    expect(
      parseArquivosListSearchParams(new URLSearchParams("page=abc")),
    ).toEqual({
      page: 1,
      tipo: null,
    });
  });

  it("ignora tipo desconhecido", () => {
    expect(
      parseArquivosListSearchParams(new URLSearchParams("tipo=CLIENTE")),
    ).toEqual({
      page: 1,
      tipo: null,
    });
  });

  it("gera URL canonica sem page 1", () => {
    expect(
      buildArquivosListHref("/arquivos", {
        page: 1,
        tipo: "DOCUMENTO",
      }),
    ).toBe("/arquivos?tipo=DOCUMENTO");
  });

  it("gera pagina e tipo sem parametros ficticios", () => {
    expect(
      buildArquivosListHref("/arquivos", {
        page: 4,
        tipo: "GALERIA_EMPRESA",
      }),
    ).toBe("/arquivos?page=4&tipo=GALERIA_EMPRESA");
  });
});
