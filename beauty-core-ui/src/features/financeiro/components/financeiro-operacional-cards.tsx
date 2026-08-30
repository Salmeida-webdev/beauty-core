import type {
  ResumoFinanceiroOperacional,
  TotalFinanceiroMes,
} from "@/features/financeiro/schemas/relatorios-financeiros.schemas";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";

type Props = {
  resumo: ResumoFinanceiroOperacional;
  receitasMes: TotalFinanceiroMes;
  despesasMes: TotalFinanceiroMes;
};

export function FinanceiroOperacionalCards({
  resumo,
  receitasMes,
  despesasMes,
}: Props) {
  const cards = [
    {
      label: "Receitas no período",
      value: resumo.receitas,
    },
    {
      label: "Despesas no período",
      value: resumo.despesas,
    },
    {
      label: "Saldo no período",
      value: resumo.saldo,
    },
    {
      label: "Receitas do mês",
      value: receitasMes.total,
    },
    {
      label: "Despesas do mês",
      value: despesasMes.total,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <article key={card.label} className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">{card.label}</p>

          <p className="mt-2 text-xl font-semibold tabular-nums text-card-foreground">
            {formatFinanceiroCurrency(card.value)}
          </p>
        </article>
      ))}
    </div>
  );
}
