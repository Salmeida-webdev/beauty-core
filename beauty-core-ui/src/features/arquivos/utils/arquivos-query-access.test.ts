import { describe, expect, it } from "vitest";

import { canRunArquivosQueries } from "@/features/arquivos/utils/arquivos-query-access";

describe("arquivos query access", () => {
  it.each(["ADMIN", "GERENTE"] as const)(
    "habilita query autenticada para %s",
    (role) => {
      expect(canRunArquivosQueries("authenticated", role)).toBe(true);
    },
  );

  it.each(["SUPER_ADMIN", "RECEPCAO", "PROFISSIONAL"] as const)(
    "bloqueia query para role sem gestao %s",
    (role) => {
      expect(canRunArquivosQueries("authenticated", role)).toBe(false);
    },
  );

  it("bloqueia antes da autenticacao", () => {
    expect(canRunArquivosQueries("loading", "ADMIN")).toBe(false);

    expect(canRunArquivosQueries("unauthenticated", "ADMIN")).toBe(false);
  });

  it("bloqueia usuario sem role", () => {
    expect(canRunArquivosQueries("authenticated", undefined)).toBe(false);
  });
});
