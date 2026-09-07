import {
  readFileSync,
  readdirSync,
} from "node:fs";
import { join } from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

const root = process.cwd();

const featureRoots = [
  join(
    root,
    "src",
    "features",
    "fidelidade",
  ),
  join(
    root,
    "src",
    "features",
    "pacotes",
  ),
];

function productionTsxFiles(
  directory: string,
): string[] {
  const result: string[] = [];

  for (
    const entry of
    readdirSync(
      directory,
      {
        withFileTypes: true,
      },
    )
  ) {
    const fullPath =
      join(
        directory,
        entry.name,
      );

    if (entry.isDirectory()) {
      result.push(
        ...productionTsxFiles(
          fullPath,
        ),
      );

      continue;
    }

    if (
      !entry.isFile() ||
      !entry.name.endsWith(
        ".tsx",
      ) ||
      entry.name.includes(
        ".test.",
      ) ||
      entry.name.includes(
        ".spec.",
      )
    ) {
      continue;
    }

    result.push(
      fullPath,
    );
  }

  return result;
}

const productionFiles =
  featureRoots.flatMap(
    productionTsxFiles,
  );

const sourceByFile =
  new Map(
    productionFiles.map(
      (path) => [
        path,
        readFileSync(
          path,
          "utf8",
        ),
      ],
    ),
  );

const combinedSource =
  [...sourceByFile.values()].join(
    "\n",
  );

function source(
  relativePath: string,
): string {
  return readFileSync(
    join(
      root,
      relativePath,
    ),
    "utf8",
  );
}

describe(
  "Chat53 UX hardening",
  () => {
    it(
      "usa tokens semânticos compatíveis com light, dark e white-label",
      () => {
        expect(
          combinedSource,
        ).toMatch(
          /\bbg-(?:card|background|muted|primary)\b/,
        );

        expect(
          combinedSource,
        ).toMatch(
          /\btext-muted-foreground\b/,
        );

        expect(
          combinedSource,
        ).toMatch(
          /\bborder(?:\s|")/,
        );

        expect(
          combinedSource,
        ).not.toMatch(
          /#[0-9a-f]{3,8}\b/i,
        );

        expect(
          combinedSource,
        ).not.toMatch(
          /\b(?:rgb|rgba|hsl|hsla)\s*\(/i,
        );

        expect(
          combinedSource,
        ).not.toMatch(
          /\b(?:bg|text|border)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/,
        );
      },
    );

    it(
      "possui breakpoints para mobile-first e telas maiores",
      () => {
        const breakpoints =
          new Set(
            Array.from(
              combinedSource.matchAll(
                /\b(sm|md|lg|xl|2xl):/g,
              ),
              (match) =>
                match[1],
            ),
          );

        expect(
          breakpoints.has(
            "sm",
          ),
        ).toBe(true);

        expect(
          [
            "lg",
            "xl",
            "2xl",
          ].some(
            (breakpoint) =>
              breakpoints.has(
                breakpoint,
              ),
          ),
        ).toBe(true);

        expect(
          breakpoints.size,
        ).toBeGreaterThanOrEqual(
          2,
        );
      },
    );

    it(
      "não depende de largura fixa em pixels nas views Chat53",
      () => {
        expect(
          combinedSource,
        ).not.toMatch(
          /\bw-\[\d+px\]/,
        );

        expect(
          combinedSource,
        ).not.toMatch(
          /\bmin-w-\[\d+px\]/,
        );
      },
    );

    it(
      "mantém ações em controles nativos de teclado",
      () => {
        expect(
          combinedSource,
        ).not.toMatch(
          /<(?:div|span|li|section|article|p)\b[^>]*\bonClick\s*=/,
        );

        expect(
          combinedSource,
        ).not.toMatch(
          /tabIndex=\{?[1-9]\d*\}?/,
        );
      },
    );

    it(
      "declara type em todos os buttons nativos",
      () => {
        const buttonTags =
          Array.from(
            combinedSource.matchAll(
              /<button\b[\s\S]*?>/g,
            ),
            (match) =>
              match[0],
          );

        expect(
          buttonTags.length,
        ).toBeGreaterThan(0);

        for (
          const buttonTag of
          buttonTags
        ) {
          expect(
            buttonTag,
          ).toMatch(
            /\btype=/,
          );
        }
      },
    );

    it(
      "não remove foco sem fornecer indicação alternativa",
      () => {
        expect(
          combinedSource,
        ).not.toMatch(
          /(?<!focus-visible:)\boutline-none\b/,
        );
      },
    );

    it(
      "possui estados acessíveis de loading e erro",
      () => {
        expect(
          combinedSource,
        ).toMatch(
          /aria-busy=/,
        );

        expect(
          combinedSource,
        ).toMatch(
          /role="alert"/,
        );

        expect(
          combinedSource,
        ).toMatch(
          /Tentar novamente/,
        );
      },
    );

    it(
      "possui estados vazios explícitos",
      () => {
        expect(
          combinedSource,
        ).toMatch(
          /Nenhum|Nenhuma|sem pacotes|sem pacotes vinculados|sem histórico/i,
        );
      },
    );

    it(
      "protege operações críticas com confirmação explícita",
      () => {
        const catalogo =
          source(
            "src/features/pacotes/catalogo/pacotes-catalogo-view.tsx",
          );

        const clientesPacotes =
          source(
            "src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx",
          );

        const fidelidadeOperacoes =
          source(
            "src/features/fidelidade/operacoes/fidelidade-operacoes-view.tsx",
          );

        expect(
          catalogo,
        ).toContain(
          "Confirmar inativação",
        );

        expect(
          clientesPacotes,
        ).toContain(
          "Confirmar cancelamento",
        );

        expect(
          clientesPacotes,
        ).toContain(
          "Confirmar uso de 1 sessão",
        );

        expect(
          fidelidadeOperacoes,
        ).toMatch(
          /type="checkbox"/,
        );

        expect(
          fidelidadeOperacoes,
        ).toMatch(
          /resgat/i,
        );
      },
    );

    it(
      "usa listas/cards semanticamente identificáveis",
      () => {
        const catalogo =
          source(
            "src/features/pacotes/catalogo/pacotes-catalogo-view.tsx",
          );

        const clientesPacotes =
          source(
            "src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx",
          );

        expect(
          catalogo,
        ).toContain(
          'aria-label="Catálogo de pacotes"',
        );

        expect(
          clientesPacotes,
        ).toContain(
          'aria-label="Pacotes vinculados ao cliente"',
        );
      },
    );

    it(
      "mantém proteção contra double-submit",
      () => {
        expect(
          combinedSource,
        ).toMatch(
          /disabled=\{[^}]*isSubmitting[^}]*\}/,
        );

        expect(
          combinedSource,
        ).toMatch(
          /disabled=\{[\s\S]*?isPending[\s\S]*?\}/,
        );
      },
    );

    it(
      "não introduz fake dialog para confirmações inline",
      () => {
        const criticalViews =
          [
            source(
              "src/features/pacotes/catalogo/pacotes-catalogo-view.tsx",
            ),
            source(
              "src/features/pacotes/clientes-pacotes/clientes-pacotes-view.tsx",
            ),
          ].join(
            "\n",
          );

        expect(
          criticalViews,
        ).not.toContain(
          'role="dialog"',
        );
      },
    );
  },
);
