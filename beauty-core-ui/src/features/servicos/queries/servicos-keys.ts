export const servicosKeys = {
  all: ["servicos"] as const,

  lists: () => [...servicosKeys.all, "list"] as const,

  list: () => [...servicosKeys.lists()] as const,

  details: () => [...servicosKeys.all, "detail"] as const,

  detail: (servicoId: string) =>
    [...servicosKeys.details(), servicoId] as const,
} as const;
