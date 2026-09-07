export type MovimentacoesPagination = {
  page: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export function getMovimentacoesPagination({
  page,
  limit,
  total,
  totalPages,
}: {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}): MovimentacoesPagination {
  const calculatedTotalPages =
    totalPages ?? (total === 0 ? 1 : Math.ceil(total / limit));

  const safeTotalPages = Math.max(1, calculatedTotalPages);

  return {
    page,
    totalPages: safeTotalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < safeTotalPages,
  };
}
