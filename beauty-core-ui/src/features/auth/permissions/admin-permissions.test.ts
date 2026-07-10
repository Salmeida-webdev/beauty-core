import { describe, expect, it } from "vitest";

import {
  canAccessCompaniesModule,
  canChangeAdminUserRole,
  canCreateAdminUser,
  canManageAdminUser,
  getCreatableAdminRoles,
  getManageableAdminRoles,
  isGlobalAdministrator,
  requiresCompany,
} from "@/features/auth/permissions/admin-permissions";

describe("permissões administrativas", () => {
  it("reserva empresas ao SUPER_ADMIN", () => {
    expect(canAccessCompaniesModule("SUPER_ADMIN")).toBe(true);
    expect(canAccessCompaniesModule("ADMIN")).toBe(false);
    expect(isGlobalAdministrator("SUPER_ADMIN")).toBe(true);
    expect(isGlobalAdministrator("GERENTE")).toBe(false);
  });

  it("exige empresa para roles não globais", () => {
    expect(requiresCompany("SUPER_ADMIN")).toBe(false);
    expect(requiresCompany("ADMIN")).toBe(true);
    expect(requiresCompany("PROFISSIONAL")).toBe(true);
  });

  it("respeita a matriz de criação", () => {
    expect(canCreateAdminUser("SUPER_ADMIN", "ADMIN")).toBe(true);
    expect(canCreateAdminUser("ADMIN", "GERENTE")).toBe(true);
    expect(canCreateAdminUser("GERENTE", "RECEPCAO")).toBe(true);
    expect(canCreateAdminUser("RECEPCAO", "PROFISSIONAL")).toBe(false);
    expect(getCreatableAdminRoles("PROFISSIONAL")).toEqual([]);
  });

  it("respeita a matriz de gestão", () => {
    expect(canManageAdminUser("ADMIN", "GERENTE")).toBe(true);
    expect(canManageAdminUser("ADMIN", "ADMIN")).toBe(false);
    expect(canManageAdminUser("GERENTE", "PROFISSIONAL")).toBe(true);
    expect(getManageableAdminRoles("RECEPCAO")).toEqual([]);
  });

  it("bloqueia alteração da própria role", () => {
    expect(
      canChangeAdminUserRole({
        actorRole: "SUPER_ADMIN",
        currentTargetRole: "SUPER_ADMIN",
        newTargetRole: "ADMIN",
        isSameUser: true,
      }),
    ).toBe(false);
  });

  it("permite alteração válida de outro usuário", () => {
    expect(
      canChangeAdminUserRole({
        actorRole: "ADMIN",
        currentTargetRole: "GERENTE",
        newTargetRole: "PROFISSIONAL",
        isSameUser: false,
      }),
    ).toBe(true);
  });

  it("bloqueia alteração fora da hierarquia", () => {
    expect(
      canChangeAdminUserRole({
        actorRole: "GERENTE",
        currentTargetRole: "PROFISSIONAL",
        newTargetRole: "ADMIN",
        isSameUser: false,
      }),
    ).toBe(false);
  });
});
