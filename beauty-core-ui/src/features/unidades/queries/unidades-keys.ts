export const unidadesKeys = {
  all: ["unidades"] as const,

  lists: () => [...unidadesKeys.all, "list"] as const,

  list: () => [...unidadesKeys.lists()] as const,

  details: () => [...unidadesKeys.all, "detail"] as const,

  detail: (unidadeId: string) =>
    [...unidadesKeys.details(), unidadeId] as const,
} as const;
