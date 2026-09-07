import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const sessionsPanelSource = readFileSync(
  resolve(
    process.cwd(),
    "src/features/auth/components/admin-sessions-panel.tsx",
  ),
  "utf8",
);

describe("Chat56 admin sessions query gating", () => {
  it("so habilita a listagem depois da autenticacao confirmada", () => {
    expect(sessionsPanelSource).toMatch(
      /const\s+status\s*=\s*useAuthStore[\s\S]*?\(state\)\s*=>\s*state\.status/,
    );

    expect(sessionsPanelSource).toMatch(
      /enabled\s*:\s*status\s*===\s*"authenticated"\s*&&\s*user\s*!==\s*null/,
    );
  });
});
