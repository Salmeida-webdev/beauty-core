import {
  describe,
  expect,
  it,
} from "vitest";

import {
  clienteProfileKeys,
} from "@/features/clientes/queries/cliente-profile-keys";

const clienteId =
  "550e8400-e29b-41d4-a716-446655440000";

describe(
  "cliente profile keys",
  () => {
    it(
      "isola fidelidade por cliente",
      () => {
        expect(
          clienteProfileKeys.saldo(
            clienteId,
          ),
        ).toEqual([
          "clientes",
          "profile",
          clienteId,
          "fidelidade",
          "saldo",
        ]);
      },
    );

    it(
      "isola pacotes por cliente",
      () => {
        expect(
          clienteProfileKeys.pacotes(
            clienteId,
          ),
        ).toEqual([
          "clientes",
          "profile",
          clienteId,
          "pacotes",
        ]);
      },
    );
  },
);
