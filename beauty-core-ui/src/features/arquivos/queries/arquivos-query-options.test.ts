import { describe, expect, it } from "vitest";

import {
  arquivoDetailQueryOptions,
  arquivosByTypeQueryOptions,
  arquivosListQueryOptions,
} from "@/features/arquivos/queries/arquivos-query-options";

describe("Arquivos query options", () => {
  it("usa namespace real da listagem", () => {
    const options = arquivosListQueryOptions({
      page: 2,
      limit: 20,
    });

    expect(options.queryKey).toEqual([
      "arquivos",
      "list",
      {
        page: 2,
        limit: 20,
      },
    ]);

    expect(options.retry).toBe(false);
    expect(options.staleTime).toBe(30_000);
  });

  it("separa cache por tipo", () => {
    const options = arquivosByTypeQueryOptions("DOCUMENTO", {
      page: 1,
      limit: 10,
    });

    expect(options.queryKey).toEqual([
      "arquivos",
      "list",
      "tipo",
      "DOCUMENTO",
      {
        page: 1,
        limit: 10,
      },
    ]);
  });

  it("separa detalhe por id", () => {
    const options = arquivoDetailQueryOptions(
      "550e8400-e29b-41d4-a716-446655440000",
    );

    expect(options.queryKey).toEqual([
      "arquivos",
      "detail",
      "550e8400-e29b-41d4-a716-446655440000",
    ]);

    expect(options.staleTime).toBe(60_000);
  });
});
