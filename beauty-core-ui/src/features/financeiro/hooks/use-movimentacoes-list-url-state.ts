"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { FinanceiroListQuery } from "@/features/financeiro/types/financeiro.types";
import {
  buildMovimentacoesListSearchParams,
  mergeMovimentacoesFilters,
  parseMovimentacoesListSearchParams,
} from "@/features/financeiro/utils/movimentacoes-list-url";

export function useMovimentacoesListUrlState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = useMemo(
    () =>
      parseMovimentacoesListSearchParams(
        new URLSearchParams(searchParams.toString()),
      ),
    [searchParams],
  );

  const replaceQuery = useCallback(
    (next: FinanceiroListQuery) => {
      const params = buildMovimentacoesListSearchParams(next);

      const suffix = params.toString();

      router.replace(suffix ? `${pathname}?${suffix}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const setFilters = useCallback(
    (patch: Partial<FinanceiroListQuery>) => {
      replaceQuery(mergeMovimentacoesFilters(query, patch));
    },
    [query, replaceQuery],
  );

  const setPage = useCallback(
    (page: number) => {
      replaceQuery({
        ...query,
        page,
      });
    },
    [query, replaceQuery],
  );

  const clearFilters = useCallback(() => {
    replaceQuery({
      page: 1,
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.orderBy ? { orderBy: query.orderBy } : {}),
      ...(query.orderDirection
        ? {
            orderDirection: query.orderDirection,
          }
        : {}),
    });
  }, [query, replaceQuery]);

  return {
    query,
    setFilters,
    setPage,
    clearFilters,
  };
}
