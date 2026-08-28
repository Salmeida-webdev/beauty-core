import {
  describe,
  expect,
  it,
} from "vitest";

import {
  clientePacoteSchema,
  fidelidadeBeneficioSchema,
  fidelidadeHistoricoSchema,
  fidelidadeNivelAtualSchema,
  fidelidadeSaldoSchema,
} from "@/features/clientes/schemas/cliente-profile-extras.schemas";

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

describe(
  "cliente profile extras schemas",
  () => {
    it(
      "valida saldo real por saldoPontos",
      () => {
        expect(
          fidelidadeSaldoSchema.parse({
            id:
              "550e8400-e29b-41d4-a716-446655440001",
            empresaId:
              "550e8400-e29b-41d4-a716-446655440002",
            clienteId,
            saldoPontos: 250,
            createdAt:
              "2026-01-01T10:00:00.000Z",
            updatedAt:
              "2026-08-01T10:00:00.000Z",
          }),
        ).toEqual({
          clienteId,
          saldoPontos: 250,
        });
      },
    );

    it(
      "valida historico usando os campos comprovados",
      () => {
        expect(
          fidelidadeHistoricoSchema.parse([
            {
              id:
                "550e8400-e29b-41d4-a716-446655440003",
              empresaId:
                "550e8400-e29b-41d4-a716-446655440002",
              clienteId,
              tipo: "ADICAO",
              pontos: 100,
              descricao:
                "Compra de serviço.",
              createdAt:
                "2026-08-20T10:00:00.000Z",
            },
          ]),
        ).toHaveLength(1);
      },
    );

    it(
      "valida beneficio pelo retorno real do service",
      () => {
        expect(
          fidelidadeBeneficioSchema.parse({
            clienteId,
            saldoPontos: 250,
            pontosParaResgate:
              100,
            valorPorResgate: 10,
            quantidadeResgates: 2,
            valorDisponivel: 20,
          }),
        ).toEqual({
          clienteId,
          saldoPontos: 250,
          pontosParaResgate:
            100,
          valorPorResgate: 10,
          quantidadeResgates: 2,
          valorDisponivel: 20,
        });
      },
    );

    it(
      "aceita nivel atual nulo",
      () => {
        expect(
          fidelidadeNivelAtualSchema.parse({
            clienteId,
            saldoPontos: 20,
            nivelAtual: null,
          }).nivelAtual,
        ).toBeNull();
      },
    );

    it(
      "mantem beneficios do nivel como string",
      () => {
        const parsed =
          fidelidadeNivelAtualSchema.parse({
            clienteId,
            saldoPontos: 850,
            nivelAtual: {
              id:
                "550e8400-e29b-41d4-a716-446655440004",
              empresaId:
                "550e8400-e29b-41d4-a716-446655440002",
              nome: "Prata",
              pontosMinimos:
                500,
              beneficios:
                "Prioridade no atendimento",
              createdAt:
                "2026-01-01T10:00:00.000Z",
              updatedAt:
                "2026-08-01T10:00:00.000Z",
            },
          });

        expect(
          parsed.nivelAtual
            ?.beneficios,
        ).toBe(
          "Prioridade no atendimento",
        );
      },
    );

    it(
      "valida pacote real com relacao pacote",
      () => {
        const parsed =
          clientePacoteSchema.parse({
            id:
              "550e8400-e29b-41d4-a716-446655440005",
            empresaId:
              "550e8400-e29b-41d4-a716-446655440002",
            clienteId,
            pacoteId:
              "550e8400-e29b-41d4-a716-446655440006",
            sessoesTotal: 10,
            sessoesUsadas: 2,
            sessoesRestantes:
              8,
            dataCompra:
              "2026-08-01T10:00:00.000Z",
            dataValidade:
              "2026-09-01T10:00:00.000Z",
            status: "ATIVO",
            createdAt:
              "2026-08-01T10:00:00.000Z",
            updatedAt:
              "2026-08-20T10:00:00.000Z",
            cliente: {
              id: clienteId,
              nome:
                "Maria Silva",
            },
            pacote: {
              id:
                "550e8400-e29b-41d4-a716-446655440006",
              empresaId:
                "550e8400-e29b-41d4-a716-446655440002",
              nome:
                "Pacote Facial",
              descricao:
                "10 sessões",
              valor: "500",
              quantidadeSessoes:
                10,
              validadeDias: 30,
              ativo: true,
              createdAt:
                "2026-01-01T10:00:00.000Z",
              updatedAt:
                "2026-08-01T10:00:00.000Z",
            },
          });

        expect(
          parsed.sessoesRestantes,
        ).toBe(8);

        expect(
          parsed.pacote.nome,
        ).toBe(
          "Pacote Facial",
        );
      },
    );
  },
);
