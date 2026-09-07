export function getArquivosTotalPages(input: {
  total: number;
  limit: number;
  totalPages?: number;
}): number {
  if (
    Number.isInteger(input.totalPages) &&
    input.totalPages !== undefined &&
    input.totalPages >= 0
  ) {
    return Math.max(input.totalPages, 1);
  }

  if (!Number.isFinite(input.total) || input.total <= 0) {
    return 1;
  }

  if (!Number.isFinite(input.limit) || input.limit <= 0) {
    return 1;
  }

  return Math.max(Math.ceil(input.total / input.limit), 1);
}

export function clampArquivosPage(page: number, totalPages: number): number {
  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  if (!Number.isFinite(totalPages) || totalPages < 1) {
    return 1;
  }

  return Math.min(Math.floor(page), Math.floor(totalPages));
}
