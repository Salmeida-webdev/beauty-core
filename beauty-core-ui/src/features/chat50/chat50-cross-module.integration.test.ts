import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import type { AdminRole } from "@/constants/roles";
import { getNavigationForRole } from "@/config/admin-navigation";
import { canAccessServicos } from "@/features/servicos/permissions/servicos-permissions";
import { servicosKeys } from "@/features/servicos/queries/servicos-keys";
import { canAccessUnidades } from "@/features/unidades/permissions/unidades-permissions";
import { unidadesKeys } from "@/features/unidades/queries/unidades-keys";
import { canAccessUsuarios } from "@/features/usuarios/permissions/usuarios-permissions";
import { usuariosKeys } from "@/features/usuarios/queries/usuarios-keys";
import {
  PROFISSIONAIS_LIST_DEFAULTS,
  toProfissionaisListParams,
} from "@/features/profissionais/utils/profissionais-list-url";

const ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AdminRole[];

function flattenNavigation(role: AdminRole) {
  return getNavigationForRole(role).flatMap((group) => group.items);
}

function getNavigationItem(role: AdminRole, id: string) {
  return flattenNavigation(role).find((item) => item.id === id);
}

function collectProductionSources(directory: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directory, {
    withFileTypes: true,
  })) {
    const absolute = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectProductionSources(absolute));

      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!/\.(ts|tsx)$/.test(entry.name)) {
      continue;
    }

    if (/\.(test|spec)\.(ts|tsx)$/.test(entry.name)) {
      continue;
    }

    files.push(absolute);
  }

  return files;
}

describe("Chat 50 — integração cruzada", () => {
  it("mantém as quatro rotas administrativas implementadas", () => {
    for (const route of ["servicos", "unidades", "usuarios", "profissionais"]) {
      expect(
        existsSync(
          join(process.cwd(), "src", "app", "(dashboard)", route, "page.tsx"),
        ),
      ).toBe(true);
    }
  });

  it.each(ROLES)("alinha Serviços da role %s com a permission real", (role) => {
    const item = getNavigationItem(role, "services");

    const expectedAccess = canAccessServicos(role);

    expect(Boolean(item)).toBe(expectedAccess);

    if (expectedAccess) {
      expect(item?.href).toBe("/servicos");

      expect(item?.state).toBe("available");
    }
  });

  it.each(ROLES)("alinha Unidades da role %s com a permission real", (role) => {
    const item = getNavigationItem(role, "units");

    const expectedAccess = canAccessUnidades(role);

    expect(Boolean(item)).toBe(expectedAccess);

    if (expectedAccess) {
      expect(item?.href).toBe("/unidades");

      expect(item?.state).toBe("available");
    }
  });

  it.each(ROLES)("alinha Usuários da role %s com a permission real", (role) => {
    const item = getNavigationItem(role, "users");

    const expectedAccess = canAccessUsuarios(role);

    expect(Boolean(item)).toBe(expectedAccess);

    if (expectedAccess) {
      expect(item?.href).toBe("/usuarios");

      expect(item?.state).toBe("available");
    }
  });

  it.each(ROLES)(
    "alinha Profissionais da role %s com a matriz administrativa",
    (role) => {
      const item = getNavigationItem(role, "professionals");

      const expectedAccess = canAccessUsuarios(role);

      expect(Boolean(item)).toBe(expectedAccess);

      if (expectedAccess) {
        expect(item?.href).toBe("/profissionais");

        expect(item?.state).toBe("available");
      }
    },
  );

  it("mantém Profissionais como visão fixa de PROFISSIONAL", () => {
    expect(
      toProfissionaisListParams({
        ...PROFISSIONAIS_LIST_DEFAULTS,
      }),
    ).toEqual({
      page: 1,
      limit: 20,
      orderBy: "createdAt",
      orderDirection: "desc",
      role: "PROFISSIONAL",
    });
  });

  it("isola cache de usuários e profissionais", () => {
    const usersKey = usuariosKeys.list({
      page: 1,
      limit: 20,
      orderBy: "createdAt",
      orderDirection: "desc",
    });

    const professionalsKey = usuariosKeys.list({
      page: 1,
      limit: 20,
      orderBy: "createdAt",
      orderDirection: "desc",
      role: "PROFISSIONAL",
    });

    expect(professionalsKey).not.toEqual(usersKey);
  });

  it("mantém namespaces de cache distintos", () => {
    expect(servicosKeys.all).toEqual(["servicos"]);

    expect(unidadesKeys.all).toEqual(["unidades"]);

    expect(usuariosKeys.all).toEqual(["usuarios"]);

    expect(
      new Set([servicosKeys.all[0], unidadesKeys.all[0], usuariosKeys.all[0]])
        .size,
    ).toBe(3);
  });

  it("não cria QueryClient paralelo", () => {
    for (const feature of [
      "servicos",
      "unidades",
      "usuarios",
      "profissionais",
    ]) {
      const directory = join(process.cwd(), "src", "features", feature);

      for (const source of collectProductionSources(directory)) {
        const content = readFileSync(source, "utf8");

        expect(content, source).not.toMatch(/\bnew\s+QueryClient\s*\(/);
      }
    }
  });

  it("não cria cliente HTTP paralelo", () => {
    for (const feature of [
      "servicos",
      "unidades",
      "usuarios",
      "profissionais",
    ]) {
      const directory = join(process.cwd(), "src", "features", feature);

      for (const source of collectProductionSources(directory)) {
        const content = readFileSync(source, "utf8");

        expect(content, source).not.toMatch(/\baxios\.create\s*\(/);
      }
    }
  });
});
