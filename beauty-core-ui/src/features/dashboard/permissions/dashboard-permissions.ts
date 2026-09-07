import type {
  AdminRole,
} from "@/constants/roles";

export const DASHBOARD_ANALYTICS_ROLES = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly AdminRole[];

export function canAccessDashboardAnalytics(
  role: AdminRole | null | undefined,
): boolean {
  return (
    role === "ADMIN" ||
    role === "GERENTE"
  );
}
