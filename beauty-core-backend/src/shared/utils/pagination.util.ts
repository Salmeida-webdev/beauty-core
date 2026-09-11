import { PaginationDto } from '../dto/pagination.dto';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export function getPaginationParams(query: PaginationDto) {
  const rawPage = Number(query.page ?? DEFAULT_PAGE);
  const rawLimit = Number(query.limit ?? DEFAULT_PAGE_SIZE);

  const page =
    Number.isFinite(rawPage) && rawPage > 0
      ? Math.floor(rawPage)
      : DEFAULT_PAGE;

  const limit =
    Number.isFinite(rawLimit) && rawLimit > 0
      ? Math.min(Math.floor(rawLimit), MAX_PAGE_SIZE)
      : DEFAULT_PAGE_SIZE;

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    take: limit,
  };
}

export function buildPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  const safeLimit = Math.max(limit, 1);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
}
