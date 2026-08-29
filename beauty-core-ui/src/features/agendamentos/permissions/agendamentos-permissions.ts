import type { AdminRole } from "@/constants/roles";

const AGENDA_OPERATION_ROLES = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AdminRole[];

function hasAgendaOperationRole(
  role: AdminRole | null | undefined,
): boolean {
  if (!role) {
    return false;
  }

  return AGENDA_OPERATION_ROLES.some(
    (allowedRole) => allowedRole === role,
  );
}

export function canAccessSchedule(
  role: AdminRole | null | undefined,
): boolean {
  return hasAgendaOperationRole(role);
}

export function canCreateAppointment(
  role: AdminRole | null | undefined,
): boolean {
  return hasAgendaOperationRole(role);
}

export function canEditAppointment(
  role: AdminRole | null | undefined,
): boolean {
  return hasAgendaOperationRole(role);
}

export function canRescheduleAppointment(
  role: AdminRole | null | undefined,
): boolean {
  return hasAgendaOperationRole(role);
}

export function canCancelAppointment(
  role: AdminRole | null | undefined,
): boolean {
  return hasAgendaOperationRole(role);
}

export function canChangeAppointmentStatus(
  role: AdminRole | null | undefined,
): boolean {
  return hasAgendaOperationRole(role);
}