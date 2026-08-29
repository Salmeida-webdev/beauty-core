import { describe, expect, it } from "vitest";

import {
  formatUnidadeOptionalText,
  formatUnidadeTelefone,
} from "@/features/unidades/utils/unidades-formatters";

describe("unidades formatters", () => {
  it("formata telefones brasileiros", () => {
    expect(formatUnidadeTelefone("83999999999")).toBe("(83) 99999-9999");

    expect(formatUnidadeTelefone("8333334444")).toBe("(83) 3333-4444");

    expect(formatUnidadeTelefone("+55 83 99999-9999")).toBe("(83) 99999-9999");
  });

  it("preserva formato não reconhecido", () => {
    expect(formatUnidadeTelefone("+1 347 536-2108")).toBe("+1 347 536-2108");

    expect(formatUnidadeTelefone("ramal 123")).toBe("ramal 123");
  });

  it("usa marcador para opcionais ausentes", () => {
    expect(formatUnidadeTelefone(null)).toBe("\u2014");

    expect(formatUnidadeOptionalText("   ")).toBe("\u2014");

    expect(formatUnidadeOptionalText(" Centro ")).toBe("Centro");
  });
});
