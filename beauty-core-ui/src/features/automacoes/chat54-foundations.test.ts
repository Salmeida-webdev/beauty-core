import {
  describe,
  expect,
  it,
} from "vitest";

import {
  automationAccessRoles,
  automationCrudSupported,
  automationEventsSupported,
  automationManualOperationsSupported,
  canAccessAutomations,
  canManageAutomations,
  canOperateAutomations,
  canViewAutomationEvents,
} from "./permissions/automacoes.permissions";
import {
  automacoesKeys,
} from "./queries/automacoes-keys";
import {
  automacoesQueryOptions,
} from "./queries/automacoes-query-options";
import {
  processarEventoInputSchema,
} from "./schemas/automacoes.schemas";
import {
  automacoesApiPaths,
  automacoesCapabilities,
} from "./services/automacoes-api";
import {
  tipoEventoSistemaValues,
} from "./types/automacoes.types";

const expectedEvents = [
  "AGENDAMENTO_CRIADO",
  "AGENDAMENTO_CONFIRMADO",
  "AGENDAMENTO_CANCELADO",
  "AGENDAMENTO_CONCLUIDO",
  "PONTOS_ADICIONADOS",
  "PONTOS_RESGATADOS",
  "BENEFICIO_LIBERADO",
  "NIVEL_ALTERADO",
  "PACOTE_CRIADO",
  "PACOTE_FINALIZADO",
  "PACOTE_VENCIDO",
  "MOVIMENTACAO_FINANCEIRA",
  "COMISSAO_GERADA",
  "COMISSAO_PAGA",
  "CLIENTE_ANIVERSARIANTE",
  "CLIENTE_CADASTRADO",
  "SERVICO_CADASTRADO",
] as const;

describe("Chat 54 — foundations Automações", () => {
  it("mantém exatamente os eventos reais do backend", () => {
    expect(
      tipoEventoSistemaValues,
    ).toEqual(expectedEvents);
  });

  it("usa modulo como string pública de até 80 caracteres", () => {
    expect(
      processarEventoInputSchema.safeParse({
        tipo: "CLIENTE_CADASTRADO",
        modulo: "clientes",
      }).success,
    ).toBe(true);

    expect(
      processarEventoInputSchema.safeParse({
        tipo: "CLIENTE_CADASTRADO",
        modulo: "x".repeat(81),
      }).success,
    ).toBe(false);
  });

  it("usa referenciaId e dados conforme DTO real", () => {
    const result =
      processarEventoInputSchema.safeParse({
        tipo: "AGENDAMENTO_CRIADO",
        modulo: "agendamentos",
        referenciaId:
          "550e8400-e29b-41d4-a716-446655440000",
        dados: {
          origem: "teste-manual",
        },
      });

    expect(result.success).toBe(true);
  });

  it("rejeita nomes antigos da foundation", () => {
    expect(
      processarEventoInputSchema.safeParse({
        tipo: "AGENDAMENTO_CRIADO",
        modulo: "agendamentos",
        recursoReferenciaId:
          "550e8400-e29b-41d4-a716-446655440000",
      }).success,
    ).toBe(false);

    expect(
      processarEventoInputSchema.safeParse({
        tipo: "AGENDAMENTO_CRIADO",
        modulo: "agendamentos",
        dadosAdicionais: {
          origem: "antiga",
        },
      }).success,
    ).toBe(false);
  });

  it("não permite empresaId arbitrário no input frontend", () => {
    expect(
      processarEventoInputSchema.safeParse({
        tipo: "AGENDAMENTO_CRIADO",
        modulo: "agendamentos",
        empresaId:
          "550e8400-e29b-41d4-a716-446655440000",
      }).success,
    ).toBe(false);
  });

  it("reflete RBAC e ausência de CRUD", () => {
    expect(
      automationCrudSupported,
    ).toBe(false);

    for (const role of automationAccessRoles) {
      expect(
        canAccessAutomations(role),
      ).toBe(true);

      expect(
        canManageAutomations(role),
      ).toBe(false);

      expect(
        canOperateAutomations(role),
      ).toBe(true);

      expect(
        canViewAutomationEvents(role),
      ).toBe(true);
    }

    expect(
      canAccessAutomations("RECEPCAO"),
    ).toBe(false);
  });

  it("expõe somente capabilities comprovadas", () => {
    expect(
      automacoesCapabilities,
    ).toEqual({
      crud: false,
      eventos: true,
      processarEvento: true,
      testeAniversario: true,
      testeRelatorio: true,
    });

    expect(
      automationEventsSupported,
    ).toBe(true);

    expect(
      automationManualOperationsSupported,
    ).toBe(true);
  });

  it("mantém somente rotas operacionais reais", () => {
    expect(
      automacoesApiPaths,
    ).toEqual({
      root: "/automacoes",
      eventos: "/automacoes/eventos",
      testeAniversario:
        "/automacoes/teste-aniversario",
      testeRelatorio:
        "/automacoes/teste-relatorio",
    });
  });

  it("mantém cache somente para eventos suportados", () => {
    expect(
      automacoesKeys.eventos(),
    ).toEqual([
      "automacoes",
      "eventos",
    ]);

    const options =
      automacoesQueryOptions.eventos(
        async () => [],
        true,
      );

    expect(
      options.queryKey,
    ).toEqual([
      "automacoes",
      "eventos",
    ]);

    expect(options.retry).toBe(false);
  });
});