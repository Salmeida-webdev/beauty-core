import {
  describe,
  expect,
  it,
} from "vitest";

import {
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

describe("Agenda - navegacao", () => {
  it("disponibiliza Agenda para as quatro roles do controller", () => {
    for (const role of [
      "ADMIN",
      "GERENTE",
      "RECEPCAO",
      "PROFISSIONAL",
    ] as const) {
      const agenda = flattenItems(
        getNavigationForRole(role),
      ).find(
        (item) =>
          item.id === "schedule",
      );

      expect(agenda?.href).toBe(
        "/agenda",
      );

      expect(agenda?.state).toBe(
        "available",
      );
    }
  });

  it("nao expoe Agenda tenant ao SUPER_ADMIN", () => {
    const agenda = flattenItems(
      getNavigationForRole(
        "SUPER_ADMIN",
      ),
    ).find(
      (item) =>
        item.id === "schedule",
    );

    expect(agenda).toBeUndefined();
  });
});