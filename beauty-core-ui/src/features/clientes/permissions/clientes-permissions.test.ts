import { describe, expect, it } from "vitest";

import {
  canAccessClientes,
  canManageClientes,
  canUploadClientePhoto,
  canUseClienteLgpd,
} from "@/features/clientes/permissions/clientes-permissions";

describe("clientes permissions", () => {
  it("permite o módulo apenas às roles aceitas pelo controller", () => {
    expect(canAccessClientes("ADMIN")).toBe(true);
    expect(canAccessClientes("GERENTE")).toBe(true);
    expect(canAccessClientes("RECEPCAO")).toBe(true);
    expect(canAccessClientes("PROFISSIONAL")).toBe(true);

    expect(
      canAccessClientes("SUPER_ADMIN"),
    ).toBe(false);
  });

  it("mantém gestão cadastral alinhada ao controller", () => {
    expect(canManageClientes("ADMIN")).toBe(true);
    expect(canManageClientes("GERENTE")).toBe(true);
    expect(canManageClientes("RECEPCAO")).toBe(true);
    expect(canManageClientes("PROFISSIONAL")).toBe(true);

    expect(
      canManageClientes("SUPER_ADMIN"),
    ).toBe(false);
  });

  it("restringe upload de foto conforme Arquivos", () => {
    expect(
      canUploadClientePhoto("ADMIN"),
    ).toBe(true);

    expect(
      canUploadClientePhoto("GERENTE"),
    ).toBe(true);

    expect(
      canUploadClientePhoto("RECEPCAO"),
    ).toBe(true);

    expect(
      canUploadClientePhoto("PROFISSIONAL"),
    ).toBe(false);

    expect(
      canUploadClientePhoto("SUPER_ADMIN"),
    ).toBe(false);
  });

  it("restringe LGPD ao ADMIN dentro do módulo Clientes", () => {
    expect(
      canUseClienteLgpd("ADMIN"),
    ).toBe(true);

    expect(
      canUseClienteLgpd("GERENTE"),
    ).toBe(false);

    expect(
      canUseClienteLgpd("RECEPCAO"),
    ).toBe(false);

    expect(
      canUseClienteLgpd("PROFISSIONAL"),
    ).toBe(false);

    expect(
      canUseClienteLgpd("SUPER_ADMIN"),
    ).toBe(false);
  });

  it("nega estado sem role", () => {
    expect(canAccessClientes(null)).toBe(false);
    expect(canAccessClientes(undefined)).toBe(false);
  });
});
