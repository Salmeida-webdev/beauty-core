import { describe, expect, it } from "vitest";

import {
  clampArquivosPage,
  getArquivosTotalPages,
} from "@/features/arquivos/utils/arquivos-pagination";

describe("arquivos pagination", () => {
  it("usa totalPages retornado pelo backend quando disponível", () => {
    expect(
      getArquivosTotalPages({
        total: 100,
        limit: 10,
        totalPages: 7,
      }),
    ).toBe(7);
  });

  it("calcula total de paginas quando backend nao envia totalPages", () => {
    expect(
      getArquivosTotalPages({
        total: 21,
        limit: 10,
      }),
    ).toBe(3);
  });

  it("mantem pelo menos uma pagina para lista vazia", () => {
    expect(
      getArquivosTotalPages({
        total: 0,
        limit: 10,
      }),
    ).toBe(1);
  });

  it("limita pagina aos limites validos", () => {
    expect(clampArquivosPage(0, 5)).toBe(1);
    expect(clampArquivosPage(3, 5)).toBe(3);
    expect(clampArquivosPage(9, 5)).toBe(5);
  });
});
