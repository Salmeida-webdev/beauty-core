import { describe, expect, it } from "vitest";

import {
  configuracaoFidelidadeSchema,
  cupomSchema,
  fidelidadeSchema,
  nivelFidelidadeSchema,
} from "./fidelidade.schemas";

const id = "550e8400-e29b-41d4-a716-446655440000";

describe("fidelidade schemas", () => {
  it("parseia saldo sem expor empresaId", () => {
    const parsed = fidelidadeSchema.parse({
      id,
      clienteId: id,
      empresaId: "empresa-interna",
      saldoPontos: 120,
      createdAt: "2026-08-30T12:00:00.000Z",
      updatedAt: "2026-08-30T12:00:00.000Z",
    });

    expect(parsed.saldoPontos).toBe(120);
    expect(parsed).not.toHaveProperty("empresaId");
  });

  it("parseia configuração autoritativa", () => {
    const parsed = configuracaoFidelidadeSchema.parse({
      id,
      empresaId: "empresa-interna",
      fidelidadeAtiva: true,
      pontuacaoAutomatica: false,
      pontosPorReal: 1,
      reaisPorPonto: 0.1,
      pontosParaResgate: 100,
      valorResgate: 10,
      niveisAtivos: false,
      beneficiosAutomaticos: false,
      cupomAniversarioAtivo: false,
      cupomAniversarioCodigo: null,
      cupomAniversarioValor: null,
      bonusAniversarioAtivo: false,
      bonusAniversarioPontos: 50,
      automacoesAtivas: false,
      createdAt: "2026-08-30T12:00:00.000Z",
      updatedAt: "2026-08-30T12:00:00.000Z",
    });

    expect(parsed).not.toHaveProperty("empresaId");
    expect(parsed.pontosPorReal).toBe(1);
  });

  it("não inventa campos de nível", () => {
    const parsed = nivelFidelidadeSchema.parse({
      id,
      empresaId: "empresa-interna",
      nome: "Nível configurado",
      pontosMinimos: 500,
      beneficios: "Benefícios configurados no backend",
      createdAt: "2026-08-30T12:00:00.000Z",
      updatedAt: "2026-08-30T12:00:00.000Z",
    });

    expect(parsed).not.toHaveProperty("cor");
    expect(parsed).not.toHaveProperty("icone");
    expect(parsed).not.toHaveProperty("empresaId");
  });

  it("normaliza Decimal do cupom sem empresaId", () => {
    const parsed = cupomSchema.parse({
      id,
      empresaId: "empresa-interna",
      codigo: "CUPOM",
      nome: "Cupom",
      descricao: null,
      tipo: "TIPO_BACKEND",
      valor: "10.50",
      dataInicio: null,
      dataFim: null,
      quantidadeMaxima: null,
      quantidadeUtilizada: 0,
      ativo: true,
      createdAt: "2026-08-30T12:00:00.000Z",
      updatedAt: "2026-08-30T12:00:00.000Z",
    });

    expect(parsed.valor).toBe(10.5);
    expect(parsed).not.toHaveProperty("empresaId");
  });
});
