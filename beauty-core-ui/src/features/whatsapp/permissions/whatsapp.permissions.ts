// Chat 54 — Bloco 05/20 — Foundations frontend

export const whatsappAccessRoles = ["ADMIN", "GERENTE", "RECEPCAO"] as const;
export const whatsappConfigurationRoles = ["ADMIN", "GERENTE", "RECEPCAO"] as const;
export const whatsappTemplateRoles = ["ADMIN", "GERENTE"] as const;
export const whatsappMessageRoles = ["ADMIN", "GERENTE", "RECEPCAO"] as const;
export const whatsappCampaignRoles = ["ADMIN", "GERENTE"] as const;

function hasRole(
  roles: readonly string[],
  role: string | null | undefined,
): boolean {
  return typeof role === "string" &&
    roles.some((allowedRole) => allowedRole === role);
}

export function canAccessWhatsApp(
  role: string | null | undefined,
): boolean {
  return hasRole(whatsappAccessRoles, role);
}

export function canManageWhatsAppConfiguration(
  role: string | null | undefined,
): boolean {
  return hasRole(whatsappConfigurationRoles, role);
}

export function canManageWhatsAppTemplates(
  role: string | null | undefined,
): boolean {
  return hasRole(whatsappTemplateRoles, role);
}

export function canSendWhatsAppMessage(
  role: string | null | undefined,
): boolean {
  return hasRole(whatsappMessageRoles, role);
}

export function canManageCampaigns(
  role: string | null | undefined,
): boolean {
  return hasRole(whatsappCampaignRoles, role);
}