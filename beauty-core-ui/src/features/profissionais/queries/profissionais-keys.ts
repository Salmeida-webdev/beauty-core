import { profissionaisListParamsSchema } from "@/features/profissionais/schemas/profissionais.schemas";
import type { ProfissionaisListParams } from "@/features/profissionais/types/profissionais.types";

function listKey(params: ProfissionaisListParams) {
  const parsed = profissionaisListParamsSchema.parse(params);

  return [
    parsed.page,
    parsed.limit,
    parsed.search ?? null,
    parsed.orderBy,
    parsed.orderDirection,
  ] as const;
}

export const profissionaisKeys = {
  all: ["profissionais"] as const,

  lists: () => [...profissionaisKeys.all, "list"] as const,

  list: (params: ProfissionaisListParams = {}) =>
    [...profissionaisKeys.lists(), ...listKey(params)] as const,

  details: () => [...profissionaisKeys.all, "detail"] as const,

  detail: (profissionalId: string) =>
    [...profissionaisKeys.details(), profissionalId] as const,
} as const;
