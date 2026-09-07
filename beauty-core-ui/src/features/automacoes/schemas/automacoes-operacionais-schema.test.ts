import {
  describe,
  expect,
  it,
} from "vitest";

import {
  automacaoEventoFormSchema,
  automacaoEventoResumoSchema,
  automacaoTesteResultadoSchema,
  automacoesEventosResumoSchema,
  processarEventoResultadoSchema,
} from "./automacoes.schemas";

describe("Chat 54 — automações operacionais schemas", () => {
  it("valida formulário mínimo real", () => {
    expect(
      automacaoEventoFormSchema.safeParse({
        tipo: "CLIENTE_CADASTRADO",
        modulo: "clientes",
      }).success,
    ).toBe(true);
  });

  it("valida resposta enfileirada de evento", () => {
    const parsed =
      processarEventoResultadoSchema.parse({
        processado: true,
        processamento: "assincrono",
        notificacaoGerada: true,
        jobId: "job-1",
        queue: "notificacoes",
      });

    expect(
      parsed.notificacaoGerada,
    ).toBe(true);
  });

  it("valida resposta sem geração de notificação", () => {
    const parsed =
      processarEventoResultadoSchema.parse({
        processado: true,
        processamento: "assincrono",
        notificacaoGerada: false,
        motivo:
          "Notificação desativada nas configurações da empresa.",
      });

    expect(parsed.motivo).toContain(
      "desativada",
    );
  });

  it("valida filas dos testes reais", () => {
    expect(
      automacaoTesteResultadoSchema.safeParse({
        processado: true,
        processamento: "assincrono",
        queue: "aniversarios",
        jobId: "job-2",
      }).success,
    ).toBe(true);

    expect(
      automacaoTesteResultadoSchema.safeParse({
        processado: true,
        processamento: "assincrono",
        queue: "relatorios",
        jobId: "job-3",
      }).success,
    ).toBe(true);
  });

  it("remove PII e metadata interna dos eventos retornados", () => {
    const parsed =
      automacaoEventoResumoSchema.parse({
        empresaId: "empresa-interna",
        tipo: "CLIENTE_CADASTRADO",
        modulo: "clientes",
        usuarioId: "usuario-interno",
        referenciaId: "recurso-interno",
        dados: {
          telefone: "83999999999",
        },
      });

    expect(parsed).toEqual({
      tipo: "CLIENTE_CADASTRADO",
      modulo: "clientes",
    });

    expect(parsed).not.toHaveProperty(
      "empresaId",
    );

    expect(parsed).not.toHaveProperty(
      "usuarioId",
    );

    expect(parsed).not.toHaveProperty(
      "referenciaId",
    );

    expect(parsed).not.toHaveProperty(
      "dados",
    );
  });

  it("valida resumo real de monitoramento", () => {
    const parsed =
      automacoesEventosResumoSchema.parse({
        total: 1,
        porTipo: {
          CLIENTE_CADASTRADO: 1,
        },
        porModulo: {
          clientes: 1,
        },
        eventos: [
          {
            empresaId: "empresa-interna",
            tipo: "CLIENTE_CADASTRADO",
            modulo: "clientes",
          },
        ],
      });

    expect(parsed.total).toBe(1);

    expect(parsed.eventos[0]).not.toHaveProperty(
      "empresaId",
    );
  });
});