import {
  describe,
  expect,
  it,
} from "vitest";

import {
  CLIENTES_STALE_TIME,
  clientesQueryOptions,
} from "@/features/clientes/queries/clientes-query-options";
import {
  clientesKeys,
} from "@/features/clientes/queries/clientes-keys";

describe("clientes query options", () => {
  it("configura listagem com chave server-side", () => {
    const params = {
      page: 2,
      limit: 20,
      search: "Maria",
      orderBy: "nome" as const,
      orderDirection: "asc" as const,
    };

    const options =
      clientesQueryOptions.list(
        params,
        true,
      );

    expect(options.queryKey).toEqual(
      clientesKeys.list(params),
    );

    expect(options.enabled).toBe(true);
    expect(options.retry).toBe(false);
    expect(options.staleTime).toBe(
      CLIENTES_STALE_TIME.list,
    );
  });

  it("desabilita listagem sem permissão", () => {
    const options =
      clientesQueryOptions.list(
        {},
        false,
      );

    expect(options.enabled).toBe(false);
  });

  it("isola detalhe por cliente", () => {
    const options =
      clientesQueryOptions.detail(
        "cliente-123",
        true,
      );

    expect(options.queryKey).toEqual(
      clientesKeys.detail(
        "cliente-123",
      ),
    );

    expect(options.enabled).toBe(true);
    expect(options.retry).toBe(false);
    expect(options.staleTime).toBe(
      CLIENTES_STALE_TIME.detail,
    );
  });

  it("não executa detalhe sem id", () => {
    const options =
      clientesQueryOptions.detail(
        "",
        true,
      );

    expect(options.enabled).toBe(false);
  });
});
