// Chat 54 — Blocos 05/12 — Automações

export const automationAccessRoles = [
  "ADMIN",
  "GERENTE",
] as const;

export const automationCrudSupported = false;
export const automationEventsSupported = true;
export const automationManualOperationsSupported = true;

function hasRole(
  roles: readonly string[],
  role: string | null | undefined,
): boolean {
  return typeof role === "string" &&
    roles.some(
      (allowedRole) =>
        allowedRole === role,
    );
}

export function canAccessAutomations(
  role: string | null | undefined,
): boolean {
  return hasRole(
    automationAccessRoles,
    role,
  );
}

export function canManageAutomations(
  role: string | null | undefined,
): boolean {
  return automationCrudSupported &&
    hasRole(
      automationAccessRoles,
      role,
    );
}

export function canOperateAutomations(
  role: string | null | undefined,
): boolean {
  return automationManualOperationsSupported &&
    hasRole(
      automationAccessRoles,
      role,
    );
}

export function canViewAutomationEvents(
  role: string | null | undefined,
): boolean {
  return automationEventsSupported &&
    hasRole(
      automationAccessRoles,
      role,
    );
}