import { describe, expect, it } from "vitest";

import {
  despesasMesQueryOptions,
  fluxoCaixaFinanceiroQueryOptions,
  receitasMesQueryOptions,
  resumoFinanceiroQueryOptions,
} from "@/features/financeiro/queries/relatorios-financeiros-query-options";

describe("relatórios financeiros query options", () => {
  it("inclui período na key do resumo", () => {
    expect(
      resumoFinanceiroQueryOptions({
        dataInicio: "2026-08-01T00:00:00.000Z",
      }).queryKey,
    ).toContain("resumo");
  });

  it("inclui fluxo em key própria", () => {
    expect(fluxoCaixaFinanceiroQueryOptions({}).queryKey).toContain("fluxo");
  });

  it("separa receitas e despesas mensais", () => {
    expect(receitasMesQueryOptions().queryKey).not.toEqual(
      despesasMesQueryOptions().queryKey,
    );
  });
});
