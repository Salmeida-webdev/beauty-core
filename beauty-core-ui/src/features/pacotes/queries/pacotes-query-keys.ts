export const pacotesQueryKeys = {
  all: ["pacotes"] as const,

  list: () =>
    [...pacotesQueryKeys.all, "list"] as const,

  detail: (id: string) =>
    [...pacotesQueryKeys.all, "detail", id] as const,

  clientesPacotes: () =>
    [...pacotesQueryKeys.all, "clientes-pacotes"] as const,

  clientePacotes: (clienteId: string) =>
    [
      ...pacotesQueryKeys.all,
      "clientes-pacotes",
      "cliente",
      clienteId,
    ] as const,
};
