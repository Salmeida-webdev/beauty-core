import { describe, expect, it } from "vitest";

import { toCreateComissaoPayload } from "@/features/financeiro/forms/comissao-payload";

describe("comissao payload", () => {
  it("envia somente os quatro campos do DTO", () => {
    const payload = toCreateComissaoPayload({
      profissionalId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
      valorServico: "1.000,50",
      percentual: "10,5",
    });

    expect(payload).toEqual({
      profissionalId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
      valorServico: 1000.5,
      percentual: 10.5,
    });

    expect(payload).not.toHaveProperty("valorComissao");

    expect(payload).not.toHaveProperty("status");

    expect(payload).not.toHaveProperty("empresaId");
  });

  it("não calcula valor da comissão", () => {
    const payload = toCreateComissaoPayload({
      profissionalId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
      valorServico: "200",
      percentual: "10",
    });

    expect(payload).toEqual({
      profissionalId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
      valorServico: 200,
      percentual: 10,
    });
  });
});
