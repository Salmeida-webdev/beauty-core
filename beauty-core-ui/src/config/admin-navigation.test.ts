import { describe, expect, it } from "vitest";

import { ADMIN_ROLES, type AdminRole } from "@/constants/roles";
import {
  ADMIN_NAVIGATION,
  getNavigationForRole,
  type NavigationGroup,
  type NavigationItem,
} from "@/config/admin-navigation";

function flattenItems(
  groups: readonly NavigationGroup[],
): NavigationItem[] {
  return groups.flatMap((group) =>
    group.items.flatMap((item) => [
      item,
      ...(item.children ?? []),
    ]),
  );
}

function getItemIds(role: AdminRole): string[] {
  return flattenItems(getNavigationForRole(role)).map(
    (item) => item.id,
  );
}

describe("navegação administrativa", () => {
  it("entrega módulos globais ao SUPER_ADMIN", () => {
    const itemIds = getItemIds("SUPER_ADMIN");

    expect(itemIds).toContain("design-system");
    expect(itemIds).toContain("audit");
    expect(itemIds).toContain("companies");
  });

  it("remove itens exclusivos do SUPER_ADMIN para ADMIN", () => {
    const itemIds = getItemIds("ADMIN");

    expect(itemIds).toContain("settings");
    expect(itemIds).toContain("users");
    expect(itemIds).not.toContain("audit");
    expect(itemIds).not.toContain("companies");
  });

  it("remove grupos vazios para PROFISSIONAL", () => {
    const groups = getNavigationForRole("PROFISSIONAL");
    const groupIds = groups.map((group) => group.id);

    expect(groupIds).toContain("overview");
    expect(groupIds).toContain("operation");
    expect(groupIds).toContain("engagement");
    expect(groupIds).not.toContain("finance");
    expect(groupIds).not.toContain("administration");

    expect(
      groups.every((group) => group.items.length > 0),
    ).toBe(true);
  });

  it("disponibiliza o Design System para todas as roles administrativas", () => {
    for (const role of ADMIN_ROLES) {
      const designSystem = flattenItems(
        getNavigationForRole(role),
      ).find((item) => item.id === "design-system");

      expect(designSystem?.href).toBe("/design-system");
      expect(designSystem?.state).toBe("available");
    }
  });

  it("disponibiliza Clientes somente às roles do controller", () => {
    for (
      const role
      of [
        "ADMIN",
        "GERENTE",
        "RECEPCAO",
        "PROFISSIONAL",
      ] as const
    ) {
      const clientsItem = flattenItems(
        getNavigationForRole(role),
      ).find(
        (item) =>
          item.id === "clients",
      );

      expect(clientsItem?.href).toBe(
        "/clientes",
      );
      expect(clientsItem?.state).toBe(
        "available",
      );
    }

    const superAdminClients =
      flattenItems(
        getNavigationForRole(
          "SUPER_ADMIN",
        ),
      ).find(
        (item) =>
          item.id === "clients",
      );

    expect(
      superAdminClients,
    ).toBeUndefined();
  });

  it("não inclui CLIENTE nas regras administrativas", () => {
    const configuredRoles = ADMIN_NAVIGATION.flatMap(
      (group) => group.items.flatMap((item) => item.roles),
    );

    expect(configuredRoles).not.toContain("CLIENTE");
  });

  it("mantém módulos futuros explicitamente em desenvolvimento", () => {
    const items = flattenItems(ADMIN_NAVIGATION);
    const availableItems = items.filter(
      (item) => item.state === "available",
    );
    const developmentItems = items.filter(
      (item) => item.state === "development",
    );

    expect(availableItems.map((item) => item.id)).toEqual([
      "dashboard",
      "design-system",
      "clients",
    ]);
    expect(developmentItems.length).toBeGreaterThan(0);
    expect(
      developmentItems.every(
        (item) =>
          item.id !== "dashboard" &&
          item.id !== "design-system" &&
          item.id !== "clients",
      ),
    ).toBe(true);
  });
});
