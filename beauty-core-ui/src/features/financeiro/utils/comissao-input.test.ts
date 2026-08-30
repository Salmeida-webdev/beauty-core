import { describe, expect, it } from "vitest";

import { parsePtBrDecimalInput } from "@/features/financeiro/utils/comissao-input";

describe("parsePtBrDecimalInput", () => {
  it.each([
    ["0", 0],
    ["0,01", 0.01],
    ["1", 1],
    ["99,99", 99.99],
    ["1.000", 1000],
    ["1.000,00", 1000],
    ["1.000,50", 1000.5],
    ["1000.50", 1000.5],
  ])("converte %s para %s", (input, expected) => {
    expect(parsePtBrDecimalInput(input)).toBe(expected);
  });

  it.each(["", "abc", "1,2,3", "1.00.0", "-1"])(
    "rejeita entrada inválida %s",
    (input) => {
      expect(parsePtBrDecimalInput(input)).toBeNull();
    },
  );
});
