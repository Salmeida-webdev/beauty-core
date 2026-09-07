const CLIENTES_PACOTES_READ_ROLES = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const;

export function canReadClientPackages(
  role: string | null | undefined,
): boolean {
  return CLIENTES_PACOTES_READ_ROLES.some(
    (allowedRole) => allowedRole === role,
  );
}
