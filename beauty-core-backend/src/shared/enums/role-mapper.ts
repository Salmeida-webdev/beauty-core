export function mapRole(role: string): string {
  const roles: Record<string, string> = {
    OWNER: 'ADMIN',
    MANAGER: 'GERENTE',
    RECEPTIONIST: 'RECEPCAO',
    PROFESSIONAL: 'PROFISSIONAL',

    ADMIN: 'ADMIN',
    GERENTE: 'GERENTE',
    RECEPCAO: 'RECEPCAO',
    PROFISSIONAL: 'PROFISSIONAL',
    CLIENTE: 'CLIENTE',
  };

  return roles[role] || role;
}