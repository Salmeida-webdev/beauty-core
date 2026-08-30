import { describe, expect, it } from "vitest";

import {
  comissaoQueryOptions,
  comissoesQueryOptions,
} from "@/features/financeiro/queries/comissoes-query-options";

describe("comissões query options", () => {
  it("usa namespace central de comissões", () => {
    expect(comissoesQueryOptions().queryKey).toContain("comissoes");
  });

  it("inclui id na key do detalhe", () => {
    expect(comissaoQueryOptions("com-1").queryKey).toContain("com-1");
  });

  it("desabilita detalhe sem id", () => {
    expect(comissaoQueryOptions("").enabled).toBe(false);
  });
});
