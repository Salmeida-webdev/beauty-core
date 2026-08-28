import {
  Skeleton,
} from "@/components/ui/skeleton";

export function DashboardChartLoading() {
  return (
    <div
      className="h-64 w-full sm:h-72"
      aria-label="Carregando gráfico"
      aria-busy="true"
    >
      <Skeleton className="size-full" />
    </div>
  );
}
