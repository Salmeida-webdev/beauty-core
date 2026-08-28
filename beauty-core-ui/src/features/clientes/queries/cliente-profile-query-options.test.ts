import {
  describe,
  expect,
  it,
} from "vitest";

import {
  clienteFidelidadeBeneficioQueryOptions,
  clienteFidelidadeHistoricoQueryOptions,
  clienteFidelidadeNivelQueryOptions,
  clienteFidelidadeSaldoQueryOptions,
  clientePacotesQueryOptions,
} from "@/features/clientes/queries/cliente-profile-query-options";

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

describe(
  "cliente profile query options",
  () => {
    it(
      "desabilita retry em todas as leituras",
      () => {
        const options = [
          clienteFidelidadeSaldoQueryOptions(
            clienteId,
          ),
          clienteFidelidadeHistoricoQueryOptions(
            clienteId,
          ),
          clienteFidelidadeBeneficioQueryOptions(
            clienteId,
          ),
          clienteFidelidadeNivelQueryOptions(
            clienteId,
          ),
          clientePacotesQueryOptions(
            clienteId,
          ),
        ];

        for (
          const option
          of options
        ) {
          expect(
            option.retry,
          ).toBe(false);
        }
      },
    );

    it(
      "respeita enabled=false",
      () => {
        expect(
          clientePacotesQueryOptions(
            clienteId,
            false,
          ).enabled,
        ).toBe(false);
      },
    );
  },
);
