import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const statePath = resolve(
  process.cwd(),
  "src/features/portal/states/portal-state-views.tsx",
);

const stateSource = readFileSync(statePath, "utf8");

describe("Portal image performance contract", () => {
  it("uses explicit proportional dimensions for state assets", () => {
    expect(stateSource).toContain("width={320}");
    expect(stateSource).toContain("height={320}");
    expect(stateSource).toContain("sizes=");
  });

  it("does not rely on unrestricted image fill for state assets", () => {
    expect(stateSource).not.toContain("fill");
  });

  it("keeps the state image priority opt-in", () => {
    expect(stateSource).not.toContain("priority");
  });
});
