export const fidelidadeQueryKeys = {
  all: ["fidelidade"] as const,

  saldo(clienteId: string) {
    return [
      ...fidelidadeQueryKeys.all,
      "saldo",
      clienteId,
    ] as const;
  },

  historico(clienteId: string) {
    return [
      ...fidelidadeQueryKeys.all,
      "historico",
      clienteId,
    ] as const;
  },

  configuracao() {
    return [
      ...fidelidadeQueryKeys.all,
      "configuracao",
    ] as const;
  },

  niveis() {
    return [
      ...fidelidadeQueryKeys.all,
      "niveis",
    ] as const;
  },

  beneficios() {
    return [
      ...fidelidadeQueryKeys.all,
      "beneficios",
    ] as const;
  },

  cupons() {
    return [
      ...fidelidadeQueryKeys.all,
      "cupons",
    ] as const;
  },
};
