import {
  describe,
  expect,
  it,
} from "vitest";
import fs from "node:fs";
import path from "node:path";

const files = [
  "agenda-calendar.tsx",
  "agenda-calendar-event.tsx",
  "agenda-calendar-toolbar.tsx",
  "agenda-filters.tsx",
  "agenda-list.tsx",
  "agenda-status-badge.tsx",
  "agendamento-detail-dialog.tsx",
  "agendamento-status-actions.tsx",
];

function source(
  file: string,
) {
  return fs.readFileSync(
    path.join(
      process.cwd(),
      "src",
      "features",
      "agendamentos",
      "components",
      file,
    ),
    "utf8",
  );
}

describe("Agenda visual audit", () => {
  it("nao usa cores hex/rgb hardcoded", () => {
    for (const file of files) {
      const content =
        source(file);

      expect(
        content,
        file,
      ).not.toMatch(
        /#[0-9a-f]{3,8}\b/iu,
      );

      expect(
        content,
        file,
      ).not.toMatch(
        /\brgba?\(/iu,
      );
    }
  });

  it("usa tokens semanticos do Design System", () => {
    const combined =
      files
        .map(source)
        .join("\n");

    expect(combined).toContain(
      "border-border-subtle",
    );

    expect(combined).toContain(
      "bg-surface-elevated",
    );

    expect(combined).toContain(
      "text-text-primary",
    );
  });

  it("preserva reduced motion nas transicoes novas", () => {
    expect(
      source(
        "agenda-calendar-event.tsx",
      ),
    ).toContain(
      "motion-reduce:transition-none",
    );
  });

  it("usa StatusBadge oficial", () => {
    expect(
      source(
        "agenda-status-badge.tsx",
      ),
    ).toContain(
      'from "@/components/ui/status-badge"',
    );
  });
});