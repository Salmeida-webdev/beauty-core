import type { AdminRole } from "@/constants/roles";

const ROLE_LABELS: Record<AdminRole, string> = {
  SUPER_ADMIN: "Super administrador",
  ADMIN: "Administrador",
  GERENTE: "Gerente",
  RECEPCAO: "Recepção",
  PROFISSIONAL: "Profissional",
};

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export function formatUsuarioRole(role: AdminRole): string {
  return ROLE_LABELS[role];
}

export function formatUsuarioUltimoLogin(value: string | null): string {
  if (!value) {
    return "Nunca";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "\u2014";
  }

  return DATE_TIME_FORMATTER.format(date);
}
