import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

const LISTS = [
  "src/features/servicos/components/servicos-list.tsx",
  "src/features/unidades/components/unidades-list.tsx",
  "src/features/usuarios/components/usuarios-list.tsx",
  "src/features/profissionais/components/profissionais-list.tsx",
] as const;

const VIEWS = [
  "src/features/servicos/components/servicos-view.tsx",
  "src/features/unidades/components/unidades-view.tsx",
  "src/features/usuarios/components/usuarios-view.tsx",
  "src/features/profissionais/components/profissionais-view.tsx",
] as const;

const FORM_DIALOGS = [
  "src/features/servicos/components/servico-form-dialog.tsx",
  "src/features/unidades/components/unidade-form-dialog.tsx",
  "src/features/usuarios/components/usuario-form-dialog.tsx",
  "src/features/profissionais/components/profissional-form-dialog.tsx",
] as const;

const DESTRUCTIVE_DIALOGS = [
  "src/features/servicos/components/servico-deactivate-dialog.tsx",
  "src/features/unidades/components/unidade-deactivate-dialog.tsx",
  "src/features/usuarios/components/usuario-deactivate-dialog.tsx",
] as const;

describe("Chat 50 — UI hardening", () => {
  it.each(LISTS)(
    "%s possui apresentação mobile e desktop independentes",
    (file) => {
      const source = readSource(file);

      expect(source, file).toMatch(/className="md:hidden"/);

      expect(source, file).toMatch(/className="hidden md:block"/);

      expect(source, file).toContain("<article");

      expect(source, file).toContain("<table");
    },
  );

  it.each(LISTS)("%s mantém tabela semanticamente estruturada", (file) => {
    const source = readSource(file);

    expect(source, file).toContain("ResponsiveTableRegion");

    expect(source, file).toMatch(/ResponsiveTableRegion[\s\S]*?label=/);

    expect(source, file).toContain("<thead");

    expect(source, file).toContain("<tbody");

    expect(source, file).toMatch(/scope="col"/);
  });

  it.each(LISTS)("%s anuncia atualização e paginação/contagem", (file) => {
    const source = readSource(file);

    expect(source, file).toContain("TableFooter");

    expect(source, file).toContain('aria-live="polite"');
  });

  it.each(VIEWS)("%s preserva estados operacionais acessíveis", (file) => {
    const source = readSource(file);

    expect(source, file).toContain("PageContainer");

    expect(source, file).toContain("PageHeader");

    expect(source, file).toContain("LoadingState");

    expect(source, file).toContain("ErrorState");

    expect(source, file).toContain("PermissionState");

    expect(source, file).toContain("DataTableFrame");
  });

  it("Usuários possui nomes acessíveis reais nos controles", () => {
    const source = readSource(
      "src/features/usuarios/components/usuarios-view.tsx",
    );

    expect(source).toMatch(/aria-label="Buscar usuários"/);

    expect(source).toMatch(/aria-label="Filtrar por perfil"/);

    expect(source).toMatch(/aria-label="Ordenar usuários por"/);

    expect(source).toMatch(/aria-label="Direção da ordenação"/);

    expect(source).toMatch(/aria-label="Usuários por página"/);
  });

  it("Profissionais possui nomes acessíveis nos controles", () => {
    const source = readSource(
      "src/features/profissionais/components/profissionais-view.tsx",
    );

    expect(source).toMatch(/aria-label="Buscar profissionais"/);

    expect(source).toMatch(/aria-label="Ordenar profissionais por"/);

    expect(source).toMatch(
      /aria-label="Direção da ordenação dos profissionais"/,
    );

    expect(source).toMatch(/aria-label="Profissionais por página"/);
  });

  it.each(FORM_DIALOGS)("%s associa título e descrição ao diálogo", (file) => {
    const source = readSource(file);

    expect(source, file).toContain("DialogContent");

    expect(source, file).toContain("DialogHeader");

    expect(source, file).toContain("DialogTitle");

    expect(source, file).toContain("DialogDescription");
  });

  it.each(DESTRUCTIVE_DIALOGS)(
    "%s identifica semanticamente confirmação destrutiva",
    (file) => {
      const source = readSource(file);

      expect(source, file).toContain("AlertDialog");

      expect(source, file).toContain("AlertDialogTitle");

      expect(source, file).toContain("AlertDialogDescription");
    },
  );

  it("listas não dependem de largura fixa absoluta para mobile", () => {
    for (const file of LISTS) {
      const source = readSource(file);

      const mobileSection = source.split('className="hidden md:block"')[0];

      expect(mobileSection, file).not.toMatch(/\bmin-w-\[[0-9]+px\]/);
    }
  });

  it("ícones decorativos das ações são ocultados da árvore assistiva", () => {
    for (const file of LISTS) {
      const source = readSource(file);

      if (source.includes("<Pencil")) {
        expect(source, file).toMatch(/<Pencil[\s\S]{0,120}aria-hidden="true"/);
      }

      if (source.includes("<Trash2")) {
        expect(source, file).toMatch(/<Trash2[\s\S]{0,120}aria-hidden="true"/);
      }
    }
  });
});
