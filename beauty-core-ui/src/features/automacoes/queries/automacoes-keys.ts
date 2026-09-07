// Chat 54 — Blocos 05/12 — Automações query keys

export const automacoesKeys = {
  all: ["automacoes"] as const,

  eventos: () =>
    [
      ...automacoesKeys.all,
      "eventos",
    ] as const,
};