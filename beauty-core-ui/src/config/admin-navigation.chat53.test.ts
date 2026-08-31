import {
  describe,
  expect,
  it,
} from "vitest";

import {
  ADMIN_NAVIGATION,
  getNavigationForRole,
} from "./admin-navigation";

function findNavigationItem(
  id: string,
) {
  for (
    const group of
    ADMIN_NAVIGATION
  ) {
    for (
      const item of
      group.items
    ) {
      if (item.id === id) {
        return item;
      }
    }
  }

  return undefined;
}

function roleItemIds(
  role:
    | "SUPER_ADMIN"
    | "ADMIN"
    | "GERENTE"
    | "RECEPCAO"
    | "PROFISSIONAL",
): string[] {
  const ids: string[] = [];

  for (
    const group of
    getNavigationForRole(role)
  ) {
    for (
      const item of
      group.items
    ) {
      ids.push(
        item.id,
      );
    }
  }

  return ids;
}

describe("Chat53 navigation", () => {
  it("libera Fidelidade e Pacotes", () => {
    expect(
      findNavigationItem(
        "loyalty",
      )?.state,
    ).toBe("available");

    expect(
      findNavigationItem(
        "packages",
      )?.state,
    ).toBe("available");

  });

  it.each([
    "ADMIN",
    "GERENTE",
    "RECEPCAO",
    "PROFISSIONAL",
  ] as const)(
    "%s recebe os módulos tenant do Chat53",
    (role) => {
      const ids =
        roleItemIds(role);

      expect(ids).toContain(
        "loyalty",
      );

      expect(ids).toContain(
        "packages",
      );
    },
  );

  it("SUPER_ADMIN não recebe os módulos tenant do Chat53", () => {
    const ids =
      roleItemIds(
        "SUPER_ADMIN",
      );

    expect(ids).not.toContain(
      "loyalty",
    );

    expect(ids).not.toContain(
      "packages",
    );
  });
});
