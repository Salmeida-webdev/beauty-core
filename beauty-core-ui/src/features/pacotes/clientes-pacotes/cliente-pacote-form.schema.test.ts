import {
  describe,
  expect,
  it,
} from "vitest";

import {
  clientePacoteFormSchema,
  toCreateClientePacotePayload,
} from "./cliente-pacote-form.schema";

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

const pacoteId =
  "550e8400-e29b-41d4-a716-446655440001";

describe("clientePacoteFormSchema", () => {
  it("exige os dois UUIDs reais", () => {
    expect(
      clientePacoteFormSchema.safeParse({
        clienteId,
        pacoteId,
      }).success,
    ).toBe(true);

    expect(
      clientePacoteFormSchema.safeParse({
        clienteId: "",
        pacoteId,
      }).success,
    ).toBe(false);
  });

  it("gera somente clienteId + pacoteId", () => {
    const parsed =
      clientePacoteFormSchema.parse({
        clienteId,
        pacoteId,
        valorPago: 500,
        origem: "BALCAO",
        sessoesTotal: 10,
        empresaId: "nao-enviar",
      });

    expect(
      toCreateClientePacotePayload(
        parsed,
      ),
    ).toEqual({
      clienteId,
      pacoteId,
    });
  });
});
