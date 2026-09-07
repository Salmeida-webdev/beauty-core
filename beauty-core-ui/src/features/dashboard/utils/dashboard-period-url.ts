import type {
  DashboardPeriodPreset,
} from "@/features/dashboard/utils/dashboard-periods";

export function buildDashboardPeriodHref(
  pathname: string,
  currentSearch: string,
  period: DashboardPeriodPreset,
): string {
  const searchParams =
    new URLSearchParams(currentSearch);

  searchParams.set("period", period);

  const queryString =
    searchParams.toString();

  return queryString
    ? `${pathname}?${queryString}`
    : pathname;
}
