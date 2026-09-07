import fs from "node:fs";
import path from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

function read(
  relativePath: string,
) {
  return fs.readFileSync(
    path.join(
      process.cwd(),
      relativePath,
    ),
    "utf8",
  );
}

const keysSource = read(
  "src/features/agendamentos/queries/agendamentos-keys.ts",
);

const queryOptionsSource = read(
  "src/features/agendamentos/queries/agendamentos-query-options.ts",
);

const createDialogSource = read(
  "src/features/agendamentos/components/agendamento-create-dialog.tsx",
);

const detailDialogSource = read(
  "src/features/agendamentos/components/agendamento-detail-dialog.tsx",
);

const statusActionsSource = read(
  "src/features/agendamentos/components/agendamento-status-actions.tsx",
);

describe("Agendamentos cache hardening", () => {
  it("mantem namespaces de list/calendar/detail", () => {
    expect(
      keysSource,
    ).toContain(
      'all: ["agendamentos"]',
    );

    expect(
      keysSource,
    ).toContain(
      '"list"',
    );

    expect(
      keysSource,
    ).toContain(
      '"calendar"',
    );

    expect(
      keysSource,
    ).toContain(
      '"detail"',
    );
  });

  it("mantem retry false nas queries", () => {
    expect(
      queryOptionsSource,
    ).toContain(
      "retry: false",
    );

    expect(
      queryOptionsSource,
    ).toContain(
      "staleTime",
    );

    expect(
      queryOptionsSource,
    ).toContain(
      "keepPreviousData",
    );
  });

  it("create invalida raiz de Agendamentos", () => {
    expect(
      createDialogSource,
    ).toContain(
      "invalidateQueries",
    );

    expect(
      createDialogSource,
    ).toContain(
      "agendamentosKeys.all",
    );

    expect(
      createDialogSource,
    ).toContain(
      "retry: false",
    );
  });

  it("edit atualiza detail e invalida raiz", () => {
    expect(
      detailDialogSource,
    ).toContain(
      "setQueryData",
    );

    expect(
      detailDialogSource,
    ).toContain(
      "invalidateQueries",
    );

    expect(
      detailDialogSource,
    ).toContain(
      "agendamentosKeys.all",
    );

    expect(
      detailDialogSource,
    ).toContain(
      "retry: false",
    );
  });

  it("status e cancelamento atualizam detail e invalidam raiz", () => {
    expect(
      statusActionsSource,
    ).toContain(
      "setQueryData",
    );

    expect(
      statusActionsSource,
    ).toContain(
      "invalidateQueries",
    );

    expect(
      statusActionsSource,
    ).toContain(
      "agendamentosKeys.all",
    );

    expect(
      statusActionsSource.match(
        /retry:\s*false/g,
      )?.length,
    ).toBeGreaterThanOrEqual(
      2,
    );
  });

  it("mutations criticas nao usam optimistic update", () => {
    const mutationSources = [
      createDialogSource,
      detailDialogSource,
      statusActionsSource,
    ].join("\n");

    expect(
      mutationSources,
    ).not.toContain(
      "onMutate",
    );

    expect(
      mutationSources,
    ).not.toContain(
      "cancelQueries",
    );
  });

  it("frontend funcional nao referencia empresaId", () => {
    const mutationSources = [
      createDialogSource,
      detailDialogSource,
      statusActionsSource,
    ].join("\n");

    expect(
      mutationSources,
    ).not.toContain(
      "empresaId",
    );
  });
});