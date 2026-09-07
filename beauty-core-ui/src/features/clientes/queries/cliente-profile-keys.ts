export const clienteProfileKeys = {
  all: [
    "clientes",
    "profile",
  ] as const,

  cliente: (
    clienteId: string,
  ) =>
    [
      ...clienteProfileKeys.all,
      clienteId,
    ] as const,

  fidelidade: (
    clienteId: string,
  ) =>
    [
      ...clienteProfileKeys.cliente(
        clienteId,
      ),
      "fidelidade",
    ] as const,

  saldo: (
    clienteId: string,
  ) =>
    [
      ...clienteProfileKeys.fidelidade(
        clienteId,
      ),
      "saldo",
    ] as const,

  historico: (
    clienteId: string,
  ) =>
    [
      ...clienteProfileKeys.fidelidade(
        clienteId,
      ),
      "historico",
    ] as const,

  beneficio: (
    clienteId: string,
  ) =>
    [
      ...clienteProfileKeys.fidelidade(
        clienteId,
      ),
      "beneficio",
    ] as const,

  nivel: (
    clienteId: string,
  ) =>
    [
      ...clienteProfileKeys.fidelidade(
        clienteId,
      ),
      "nivel",
    ] as const,

  pacotes: (
    clienteId: string,
  ) =>
    [
      ...clienteProfileKeys.cliente(
        clienteId,
      ),
      "pacotes",
    ] as const,
} as const;
