import { describe, expect, it } from "vitest";

import { getMovimentacoesPagination } from "@/features/financeiro/utils/movimentacoes-pagination";

describe("movimentações pagination", () => {
  it("usa totalPages retornado quando disponível", () => {
    expect(
      getMovimentacoesPagination({
        page: 2,
        limit: 20,
        total: 100,
        totalPages: 5,
      }),
    ).toEqual({
      page: 2,
      totalPages: 5,
      hasPreviousPage: true,
      hasNextPage: true,
    });
  });

  it("deriva somente metadata de paginação quando backend omite totalPages", () => {
    expect(
      getMovimentacoesPagination({
        page: 1,
        limit: 20,
        total: 41,
      }),
    ).toEqual({
      page: 1,
      totalPages: 3,
      hasPreviousPage: false,
      hasNextPage: true,
    });
  });

  it("mantém uma página visual para resultado vazio", () => {
    expect(
      getMovimentacoesPagination({
        page: 1,
        limit: 20,
        total: 0,
      }).totalPages,
    ).toBe(1);
  });
});
