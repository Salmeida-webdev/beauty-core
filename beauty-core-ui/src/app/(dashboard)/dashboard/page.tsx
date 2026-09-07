import {
  Suspense,
} from "react";

import {
  DashboardKpiSkeletonGrid,
} from "@/features/dashboard/components/dashboard-summary-states";
import {
  DashboardView,
} from "@/features/dashboard/components/dashboard-view";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <DashboardKpiSkeletonGrid />
      }
    >
      <DashboardView />
    </Suspense>
  );
}
