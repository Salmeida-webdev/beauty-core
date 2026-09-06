import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { portalPointMovementSchema } from "./portal-loyalty-contracts";

describe("portal loyalty contracts", () => {
  it("validates a real point movement contract", () => {
    const result = portalPointMovementSchema.parse({
      id: "movement-1",
      pontos: 25,
      tipo: "CREDITO",
      descricao: "Agendamento concluído",
      createdAt: "2026-09-06T12:00:00.000Z",
    });

    expect(result.pontos).toBe(25);
    expect(result.tipo).toBe("CREDITO");
  });

  it("keeps the points response schema connected to the portal query", () => {
    const querySource = readFileSync(
      resolve(
        process.cwd(),
        "src/features/portal/query/portal-loyalty-query.ts",
      ),
      "utf8",
    );

    const apiSource = readFileSync(
      resolve(
        process.cwd(),
        "src/features/portal/services/portal-loyalty-api.ts",
      ),
      "utf8",
    );

    expect(querySource).toMatch(/portalPointsResponseSchema|portal-loyalty-api/);
    expect(apiSource).toContain("/area-cliente/me/pontos");
  });
});
