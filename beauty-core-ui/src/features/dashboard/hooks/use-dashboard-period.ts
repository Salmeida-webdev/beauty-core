"use client";

import {
  useCallback,
  useMemo,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  buildDashboardPeriodHref,
} from "@/features/dashboard/utils/dashboard-period-url";
import {
  parseDashboardPeriodPreset,
  resolveDashboardPeriod,
  type DashboardPeriodPreset,
} from "@/features/dashboard/utils/dashboard-periods";

export function useDashboardPeriod() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search =
    searchParams.toString();

  const period =
    parseDashboardPeriodPreset(
      searchParams.get("period"),
    );

  const filters = useMemo(
    () =>
      resolveDashboardPeriod(period),
    [period],
  );

  const setPeriod = useCallback(
    (
      nextPeriod:
        DashboardPeriodPreset,
    ) => {
      router.replace(
        buildDashboardPeriodHref(
          pathname,
          search,
          nextPeriod,
        ),
        {
          scroll: false,
        },
      );
    },
    [
      pathname,
      router,
      search,
    ],
  );

  return {
    period,
    filters,
    setPeriod,
  };
}
