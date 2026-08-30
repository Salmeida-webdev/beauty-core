import { describe, expect, it } from "vitest";

import { comissaoFormSchema } from "@/features/financeiro/forms/comissao-form.schema";

const valid = {
  profissionalId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
  valorServico: "1.000,50",
  percentual: "10,5",
};

describe("comissao form schema", () => {
  it("aceita contrato real", () => {
    expect(comissaoFormSchema.safeParse(valid).success).toBe(true);
  });

  it("aceita extremos reais do percentual", () => {
    expect(
      comissaoFormSchema.safeParse({
        ...valid,
        percentual: "0",
      }).success,
    ).toBe(true);

    expect(
      comissaoFormSchema.safeParse({
        ...valid,
        percentual: "100",
      }).success,
    ).toBe(true);
  });

  it("rejeita percentual acima de 100", () => {
    expect(
      comissaoFormSchema.safeParse({
        ...valid,
        percentual: "100,01",
      }).success,
    ).toBe(false);
  });

  it("rejeita campos calculados ou tenant", () => {
    expect(
      comissaoFormSchema.safeParse({
        ...valid,
        valorComissao: 100,
      }).success,
    ).toBe(false);

    expect(
      comissaoFormSchema.safeParse({
        ...valid,
        empresaId: "empresa",
      }).success,
    ).toBe(false);

    expect(
      comissaoFormSchema.safeParse({
        ...valid,
        status: "PAGO",
      }).success,
    ).toBe(false);
  });
});
