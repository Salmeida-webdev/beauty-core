import { describe, expect, it } from "vitest";

import {
  canAccessClientPackages,
  canAccessPackages,
  canAssignPackage,
  canCancelClientPackage,
  canConsumePackageSession,
  canManagePackages,
} from "./pacotes-permissions";

describe("pacotes permissions", () => {
  it("limita catálogo de pacotes a ADMIN/GERENTE", () => {
    expect(canAccessPackages("ADMIN")).toBe(true);
    expect(canAccessPackages("GERENTE")).toBe(true);
    expect(canAccessPackages("RECEPCAO")).toBe(false);
    expect(canAccessPackages("PROFISSIONAL")).toBe(false);
  });

  it("limita gestão a ADMIN/GERENTE", () => {
    expect(canManagePackages("ADMIN")).toBe(true);
    expect(canManagePackages("GERENTE")).toBe(true);
    expect(canManagePackages("RECEPCAO")).toBe(false);
  });

  it("permite atribuição para recepção", () => {
    expect(canAssignPackage("RECEPCAO")).toBe(true);
    expect(canAssignPackage("PROFISSIONAL")).toBe(false);
  });

  it("permite consultar e consumir para profissional", () => {
    expect(canAccessClientPackages("PROFISSIONAL")).toBe(true);
    expect(canConsumePackageSession("PROFISSIONAL")).toBe(true);
  });

  it("restringe cancelamento a ADMIN/GERENTE", () => {
    expect(canCancelClientPackage("ADMIN")).toBe(true);
    expect(canCancelClientPackage("GERENTE")).toBe(true);
    expect(canCancelClientPackage("RECEPCAO")).toBe(false);
    expect(canCancelClientPackage("PROFISSIONAL")).toBe(false);
  });

  it("não inclui SUPER_ADMIN automaticamente", () => {
    expect(canAccessPackages("SUPER_ADMIN")).toBe(false);
    expect(canAccessClientPackages("SUPER_ADMIN")).toBe(false);
    expect(canAssignPackage("SUPER_ADMIN")).toBe(false);
  });
});
