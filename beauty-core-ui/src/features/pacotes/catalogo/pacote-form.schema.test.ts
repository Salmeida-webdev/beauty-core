import {
  describe,
  expect,
  it,
} from "vitest";

import { PACOTE_FORM_LIMITS } from "./pacote-form-limits";
import {
  emptyPacoteFormValues,
  pacoteFormSchema,
  toPacotePayload,
} from "./pacote-form.schema";

describe("pacoteFormSchema", () => {
  it("não cria defaults comerciais", () => {
    const values =
      emptyPacoteFormValues();

    expect(values).toEqual({
      nome: "",
      descricao: "",
      valor: "",
      quantidadeSessoes: "",
      validadeDias: "",
    });

    expect(
      pacoteFormSchema.safeParse(
        values,
      ).success,
    ).toBe(false);
  });

  it("gera somente campos contratuais", () => {
    const parsed =
      pacoteFormSchema.parse({
        nome: " Pacote real ",
        descricao: "",
        valor: String(
          PACOTE_FORM_LIMITS.valorMin,
        ),
        quantidadeSessoes: String(
          PACOTE_FORM_LIMITS
            .quantidadeSessoesMin,
        ),
        validadeDias: "",
        ativo: false,
        servicos: ["nao-enviar"],
        empresaId: "nao-enviar",
      });

    expect(
      toPacotePayload(parsed),
    ).toEqual({
      nome: "Pacote real",
      valor:
        PACOTE_FORM_LIMITS.valorMin,
      quantidadeSessoes:
        PACOTE_FORM_LIMITS
          .quantidadeSessoesMin,
    });
  });

  it("aceita validade explícita", () => {
    const parsed =
      pacoteFormSchema.parse({
        nome: "Pacote válido",
        descricao: "Descrição",
        valor: "100",
        quantidadeSessoes: "5",
        validadeDias: String(
          PACOTE_FORM_LIMITS
            .validadeDiasMin,
        ),
      });

    expect(
      toPacotePayload(parsed),
    ).toEqual({
      nome: "Pacote válido",
      descricao: "Descrição",
      valor: 100,
      quantidadeSessoes: 5,
      validadeDias:
        PACOTE_FORM_LIMITS
          .validadeDiasMin,
    });
  });

  it("rejeita valores abaixo do contrato", () => {
    expect(
      pacoteFormSchema.safeParse({
        nome: "Pacote válido",
        descricao: "",
        valor: String(
          PACOTE_FORM_LIMITS.valorMin,
        ),
        quantidadeSessoes: String(
          PACOTE_FORM_LIMITS
            .quantidadeSessoesMin - 1,
        ),
        validadeDias: "",
      }).success,
    ).toBe(false);

    expect(
      pacoteFormSchema.safeParse({
        nome: "Pacote válido",
        descricao: "",
        valor: String(
          PACOTE_FORM_LIMITS.valorMin,
        ),
        quantidadeSessoes: String(
          PACOTE_FORM_LIMITS
            .quantidadeSessoesMin,
        ),
        validadeDias: String(
          PACOTE_FORM_LIMITS
            .validadeDiasMin - 1,
        ),
      }).success,
    ).toBe(false);
  });
});
