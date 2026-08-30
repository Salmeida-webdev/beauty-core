import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { FinanceiroOperacionalCards } from "@/features/financeiro/components/financeiro-operacional-cards";

afterEach(() => {
  cleanup();
});

describe("FinanceiroOperacionalCards", () => {
  it("exibe exatamente valores retornados pelo backend", () => {
    render(
      <FinanceiroOperacionalCards
        resumo={{
          receitas: 1000,
          despesas: 400,
          saldo: 600,
        }}
        receitasMes={{
          total: 900,
        }}
        despesasMes={{
          total: 350,
        }}
      />,
    );

    expect(screen.getByText("Receitas no período")).toBeInTheDocument();

    expect(screen.getByText("Saldo no período")).toBeInTheDocument();

    expect(screen.getByText("R$ 600,00")).toBeInTheDocument();

    expect(screen.getByText("R$ 900,00")).toBeInTheDocument();

    expect(screen.getByText("R$ 350,00")).toBeInTheDocument();
  });
});
