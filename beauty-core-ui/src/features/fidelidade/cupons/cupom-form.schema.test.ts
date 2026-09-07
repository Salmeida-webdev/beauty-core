import { describe, expect, it } from "vitest";

import {
  cupomFormSchema,
  cupomValidacaoSchema,
  emptyCupomFormValues,
  toCupomPayload,
} from "./cupom-form.schema";
import { cupomTipoValues } from "./cupom-tipos";

describe("cupomFormSchema", () => {
  it("não inventa tipo padrão no cadastro", () => {
    const values = emptyCupomFormValues();

    expect(values.tipo).toBe("");

    expect(
      cupomFormSchema.safeParse(values).success,
    ).toBe(false);
  });

  it("gera somente campos contratuais", () => {
    const tipo = cupomTipoValues[0];

    const parsed = cupomFormSchema.parse({
      codigo: " CUPOM10 ",
      nome: " Cupom real ",
      descricao: "",
      tipo,
      valor: "10",
      dataInicio: "",
      dataFim: "",
      quantidadeMaxima: "",
      ativo: false,
      quantidadeUtilizada: 99,
      empresaId: "nao-enviar",
    });

    expect(
      toCupomPayload(parsed),
    ).toEqual({
      codigo: "CUPOM10",
      nome: "Cupom real",
      tipo,
      valor: 10,
    });
  });

  it("aceita datas e limite opcionais", () => {
    const tipo = cupomTipoValues[0];

    const parsed = cupomFormSchema.parse({
      codigo: "CUPOM20",
      nome: "Cupom válido",
      descricao: "Descrição",
      tipo,
      valor: "20",
      dataInicio: "2026-08-30T10:00",
      dataFim: "2026-09-30T10:00",
      quantidadeMaxima: "15",
    });

    const payload = toCupomPayload(parsed);

    expect(payload.tipo).toBe(tipo);
    expect(payload.quantidadeMaxima).toBe(15);
    expect(payload.dataInicio).toContain(
      "2026-08-30",
    );
    expect(payload.dataFim).toContain(
      "2026-09-30",
    );
  });

  it("validação aceita somente codigo", () => {
    const parsed = cupomValidacaoSchema.parse({
      codigo: " CUPOM10 ",
      empresaId: "nao-enviar",
      clienteId: "nao-enviar",
    });

    expect(parsed).toEqual({
      codigo: "CUPOM10",
    });
  });
});
