// Chat 54 — Bloco 05/20 — Foundations frontend

export const notificationAccessRoles = ["ADMIN", "GERENTE", "RECEPCAO", "PROFISSIONAL"] as const;

export const notificationSettingsRoles =
  ["ADMIN", "GERENTE"] as const;

function hasRole(
  roles: readonly string[],
  role: string | null | undefined,
): boolean {
  return typeof role === "string" &&
    roles.some((allowedRole) => allowedRole === role);
}

export function canAccessNotifications(
  role: string | null | undefined,
): boolean {
  return hasRole(notificationAccessRoles, role);
}

export function canManageNotificationSettings(
  role: string | null | undefined,
): boolean {
  return hasRole(notificationSettingsRoles, role);
}