import {
  describe,
  expect,
  it,
} from "vitest";

import { FIDELIDADE_OPERACAO_LIMITS } from "./fidelidade-operacao-limits";
import {
  adicionarPontosFormSchema,
  pontuarPorValorFormSchema,
  resgatarPontosFormSchema,
  toAdicionarPontosPayload,
  toPontuarPorValorPayload,
  toResgatarPontosPayload,
} from "./fidelidade-operacoes.schema";

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

describe("fidelidade operações schema", () => {
  it("exige descrição no ajuste positivo", () => {
    expect(
      adicionarPontosFormSchema.safeParse({
        pontos: String(
          FIDELIDADE_OPERACAO_LIMITS
            .adicionarPontosMin,
        ),
        descricao: "",
      }).success,
    ).toBe(false);

    const parsed =
      adicionarPontosFormSchema.parse({
        pontos: String(
          FIDELIDADE_OPERACAO_LIMITS
            .adicionarPontosMin,
        ),
        descricao: " Ajuste administrativo ",
      });

    expect(
      toAdicionarPontosPayload(
        clienteId,
        parsed,
      ),
    ).toEqual({
      clienteId,
      pontos:
        FIDELIDADE_OPERACAO_LIMITS
          .adicionarPontosMin,
      descricao: "Ajuste administrativo",
    });
  });

  it("exige descrição no resgate", () => {
    expect(
      resgatarPontosFormSchema.safeParse({
        pontos: String(
          FIDELIDADE_OPERACAO_LIMITS
            .resgatarPontosMin,
        ),
        descricao: "",
      }).success,
    ).toBe(false);

    const parsed =
      resgatarPontosFormSchema.parse({
        pontos: String(
          FIDELIDADE_OPERACAO_LIMITS
            .resgatarPontosMin,
        ),
        descricao: " Resgate autorizado ",
      });

    const payload =
      toResgatarPontosPayload(
        clienteId,
        parsed,
      );

    expect(payload).toEqual({
      clienteId,
      pontos:
        FIDELIDADE_OPERACAO_LIMITS
          .resgatarPontosMin,
      descricao: "Resgate autorizado",
    });

    expect(payload).not.toHaveProperty(
      "beneficioId",
    );

    expect(payload).not.toHaveProperty(
      "referenciaId",
    );
  });

  it("pontuação por valor exige descrição e não calcula pontos", () => {
    expect(
      pontuarPorValorFormSchema.safeParse({
        valorGasto: String(
          FIDELIDADE_OPERACAO_LIMITS
            .pontuarValorMin,
        ),
        descricao: "",
      }).success,
    ).toBe(false);

    const parsed =
      pontuarPorValorFormSchema.parse({
        valorGasto: String(
          FIDELIDADE_OPERACAO_LIMITS
            .pontuarValorMin,
        ),
        descricao: " Atendimento realizado ",
      });

    const payload =
      toPontuarPorValorPayload(
        clienteId,
        parsed,
      );

    expect(payload).toEqual({
      clienteId,
      valorGasto:
        FIDELIDADE_OPERACAO_LIMITS
          .pontuarValorMin,
      descricao: "Atendimento realizado",
    });

    expect(payload).not.toHaveProperty(
      "pontos",
    );

    expect(payload).not.toHaveProperty(
      "pontosPorReal",
    );
  });

  it("rejeita valores abaixo dos mínimos reais", () => {
    expect(
      adicionarPontosFormSchema.safeParse({
        pontos: String(
          FIDELIDADE_OPERACAO_LIMITS
            .adicionarPontosMin - 1,
        ),
        descricao: "Motivo",
      }).success,
    ).toBe(false);

    expect(
      resgatarPontosFormSchema.safeParse({
        pontos: String(
          FIDELIDADE_OPERACAO_LIMITS
            .resgatarPontosMin - 1,
        ),
        descricao: "Motivo",
      }).success,
    ).toBe(false);

    expect(
      pontuarPorValorFormSchema.safeParse({
        valorGasto: String(
          FIDELIDADE_OPERACAO_LIMITS
            .pontuarValorMin - 1,
        ),
        descricao: "Motivo",
      }).success,
    ).toBe(false);
  });
});
