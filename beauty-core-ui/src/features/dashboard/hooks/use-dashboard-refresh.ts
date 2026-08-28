"use client";

import {
  useCallback,
} from "react";
import {
  useIsFetching,
  useQueryClient,
} from "@tanstack/react-query";

import {
  dashboardKeys,
} from "@/features/dashboard/queries/dashboard-keys";

export function useDashboardRefresh() {
  const queryClient = useQueryClient();

  const fetchingCount = useIsFetching({
    queryKey:
      dashboardKeys.analytics(),
  });

  const refresh = useCallback(
    async () => {
      await queryClient.invalidateQueries({
        queryKey:
          dashboardKeys.analytics(),
      });
    },
    [queryClient],
  );

  return {
    refresh,
    isRefreshing:
      fetchingCount > 0,
  };
}
