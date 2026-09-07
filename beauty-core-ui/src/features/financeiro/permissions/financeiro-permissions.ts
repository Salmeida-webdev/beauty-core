import type { FinanceiroAdminRole } from "@/features/financeiro/types/financeiro.types";

export const financeiroControllerObservedRoles = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly FinanceiroAdminRole[];

export const categoriasFinanceirasControllerObservedRoles = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly FinanceiroAdminRole[];

export const comissoesControllerObservedRoles = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly FinanceiroAdminRole[];

export function hasObservedFinanceiroRole(
  role: FinanceiroAdminRole | null | undefined,
  allowedRoles: readonly FinanceiroAdminRole[],
) {
  return Boolean(role && allowedRoles.includes(role));
}

export const FINANCEIRO_MODULE_ROLES = ["ADMIN", "GERENTE"] as const;

export function canAccessFinanceiroModule(role: string): boolean {
  return FINANCEIRO_MODULE_ROLES.some((allowedRole) => allowedRole === role);
}
