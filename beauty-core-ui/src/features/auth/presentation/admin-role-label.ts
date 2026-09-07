import type { AdminRole } from "@/constants/roles";

const ADMIN_ROLE_LABELS: Record<
  AdminRole,
  string
> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrador",
  GERENTE: "Gerente",
  RECEPCAO: "Recepção",
  PROFISSIONAL: "Profissional",
};

export function getAdminRoleLabel(
  role: AdminRole,
): string {
  return ADMIN_ROLE_LABELS[role];
}
