import {
  describe,
  expect,
  it,
} from "vitest";

import {
  canAccessSchedule,
  canCancelAppointment,
  canChangeAppointmentStatus,
  canCreateAppointment,
  canEditAppointment,
  canRescheduleAppointment,
} from "@/features/agendamentos/permissions/agendamentos-permissions";

const agendaRoles = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const;

const deniedRoles = [
  "SUPER_ADMIN",
  null,
  undefined,
] as const;

describe("Agendamentos permissions hardening", () => {
  it.each(agendaRoles)(
    "permite todas as capacidades reais para %s",
    (role) => {
      expect(
        canAccessSchedule(role),
      ).toBe(true);

      expect(
        canCreateAppointment(role),
      ).toBe(true);

      expect(
        canEditAppointment(role),
      ).toBe(true);

      expect(
        canRescheduleAppointment(role),
      ).toBe(true);

      expect(
        canCancelAppointment(role),
      ).toBe(true);

      expect(
        canChangeAppointmentStatus(
          role,
        ),
      ).toBe(true);
    },
  );

  it.each(deniedRoles)(
    "nega todas as capacidades para %s",
    (role) => {
      expect(
        canAccessSchedule(role),
      ).toBe(false);

      expect(
        canCreateAppointment(role),
      ).toBe(false);

      expect(
        canEditAppointment(role),
      ).toBe(false);

      expect(
        canRescheduleAppointment(role),
      ).toBe(false);

      expect(
        canCancelAppointment(role),
      ).toBe(false);

      expect(
        canChangeAppointmentStatus(
          role,
        ),
      ).toBe(false);
    },
  );
});