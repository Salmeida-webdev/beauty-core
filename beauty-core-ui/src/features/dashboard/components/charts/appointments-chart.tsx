"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  AppointmentsAnalytics,
} from "@/features/dashboard/types/dashboard.types";
import {
  buildAppointmentStatusData,
} from "@/features/dashboard/utils/dashboard-chart-data";
import {
  formatInteger,
} from "@/features/dashboard/utils/dashboard-formatters";

type AppointmentsChartProps = {
  data: AppointmentsAnalytics;
};

export function AppointmentsChart({
  data,
}: AppointmentsChartProps) {
  const chartData =
    buildAppointmentStatusData(data);

  return (
    <div
      className="h-64 min-w-0 w-full overflow-hidden sm:h-72"
      role="img"
      aria-label="Distribuição dos agendamentos por status"
    >
      <p className="sr-only">
        Confirmados: {formatInteger(data.confirmados)}.
        Concluídos: {formatInteger(data.concluidos)}.
        Pendentes: {formatInteger(data.pendentes)}.
        Cancelados: {formatInteger(data.cancelados)}.
      </p>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 8,
            right: 16,
            bottom: 0,
            left: 8,
          }}
          accessibilityLayer
        >
          <CartesianGrid
            horizontal={false}
            stroke="var(--border)"
            strokeDasharray="4 4"
          />

          <XAxis
            type="number"
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
            }}
          />

          <YAxis
            type="category"
            dataKey="status"
            width={88}
            axisLine={false}
            tickLine={false}
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
            formatter={(value) => [
              formatInteger(
                Number(value),
              ),
              "Agendamentos",
            ]}
          />

          <Bar
            dataKey="total"
            isAnimationActive={false}
            name="Agendamentos"
            radius={[0, 4, 4, 0]}
          >
            {chartData.map((item) => (
              <Cell
                key={item.status}
                fill={item.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
