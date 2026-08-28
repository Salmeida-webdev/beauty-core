"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  FinancialAnalytics,
} from "@/features/dashboard/types/dashboard.types";
import {
  buildFinancialChartData,
} from "@/features/dashboard/utils/dashboard-chart-data";
import {
  formatCurrency,
  formatInteger,
} from "@/features/dashboard/utils/dashboard-formatters";

type FinancialChartProps = {
  data: FinancialAnalytics;
};

export function FinancialChart({
  data,
}: FinancialChartProps) {
  const chartData =
    buildFinancialChartData(data);

  return (
    <div
      className="h-64 min-w-0 w-full overflow-hidden sm:h-72"
      role="img"
      aria-label="Comparação entre receitas, despesas e saldo no período selecionado"
    >
      <p className="sr-only">
        Receitas: {formatCurrency(data.receitas)}.
        Despesas: {formatCurrency(data.despesas)}.
        Saldo: {formatCurrency(data.saldo)}.
      </p>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={chartData}
          margin={{
            top: 12,
            right: 8,
            bottom: 0,
            left: 0,
          }}
          accessibilityLayer
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            width={72}
            tickFormatter={(value) =>
              formatInteger(
                Number(value),
              )
            }
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />

          <Tooltip
            cursor={{
              fill: "var(--muted)",
              opacity: 0.45,
            }}
            contentStyle={{
              background:
                "var(--popover)",
              border:
                "1px solid var(--border)",
              borderRadius:
                "var(--radius-md)",
              color:
                "var(--popover-foreground)",
            }}
            formatter={(value) =>
              formatCurrency(
                Number(value),
              )
            }
            labelFormatter={() =>
              "Período selecionado"
            }
          />

          <Legend />

          <Bar
            dataKey="receitas"
            isAnimationActive={false}
            name="Receitas"
            fill="var(--chart-1)"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="despesas"
            isAnimationActive={false}
            name="Despesas"
            fill="var(--chart-3)"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="saldo"
            isAnimationActive={false}
            name="Saldo"
            fill="var(--chart-5)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
