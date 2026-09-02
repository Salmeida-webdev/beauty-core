export const configuracoesKeys = {
  all: ["configuracoes"] as const,

  branding: () => [...configuracoesKeys.all, "branding"] as const,
};
