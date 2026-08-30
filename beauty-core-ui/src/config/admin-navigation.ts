import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  ChartNoAxesCombined,
  CircleDollarSign,
  FileText,
  Gift,
  LayoutDashboard,
  MessageCircle,
  Package,
  Palette,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  UserRoundCog,
  UserRoundSearch,
} from "lucide-react";

import type { AdminRole } from "@/constants/roles";
import { FINANCEIRO_MODULE_ROLES } from "@/features/financeiro/permissions/financeiro-permissions";

export type NavigationItemState = "available" | "development" | "disabled";

export type NavigationPermission = string;

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  roles: readonly AdminRole[];
  state: NavigationItemState;
  permission?: NavigationPermission;
  badge?: string;
  children?: readonly NavigationItem[];
};

export type NavigationGroup = {
  id: string;
  label: string;
  items: readonly NavigationItem[];
};

const ALL_ADMIN_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AdminRole[];

const CLIENTS_ROLES = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AdminRole[];

const TENANT_MANAGEMENT_ROLES = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly AdminRole[];

const MANAGEMENT_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "GERENTE",
] as const satisfies readonly AdminRole[];

const ADMINISTRATION_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
] as const satisfies readonly AdminRole[];

const SERVICES_ACCESS_ROLES = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AdminRole[];
export const ADMIN_NAVIGATION = [
  {
    id: "overview",
    label: "Visão geral",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ALL_ADMIN_ROLES,
        state: "available",
      },
      {
        id: "design-system",
        label: "Design System",
        href: "/design-system",
        icon: Palette,
        roles: ALL_ADMIN_ROLES,
        state: "available",
        badge: "Técnico",
      },
    ],
  },
  {
    id: "operation",
    label: "Operação",
    items: [
      {
        id: "clients",
        label: "Clientes",
        href: "/clientes",
        icon: Users,
        roles: CLIENTS_ROLES,
        state: "available",
      },
      {
        id: "schedule",
        label: "Agenda",
        href: "/agenda",
        icon: CalendarDays,
        roles: ["ADMIN", "GERENTE", "RECEPCAO", "PROFISSIONAL"],
        state: "available",
      },
      {
        id: "services",
        label: "Serviços",
        href: "/servicos",
        icon: Sparkles,
        roles: SERVICES_ACCESS_ROLES,
        state: "available",
      },
      {
        id: "units",
        label: "Unidades",
        href: "/unidades",
        icon: Store,
        roles: TENANT_MANAGEMENT_ROLES,
        state: "available",
      },
      {
        id: "professionals",
        label: "Profissionais",
        href: "/profissionais",
        icon: UserRoundSearch,
        roles: MANAGEMENT_ROLES,
        state: "available",
      },
    ],
  },
  {
    id: "finance",
    label: "Financeiro",
    items: [
      {
        id: "financial",
        label: "Financeiro",
        href: "/financeiro",
        icon: CircleDollarSign,
        roles: FINANCEIRO_MODULE_ROLES,
        state: "available",
      },
    ],
  },
  {
    id: "engagement",
    label: "Engajamento",
    items: [
      {
        id: "loyalty",
        label: "Fidelidade",
        href: "/fidelidade",
        icon: Gift,
        roles: ["ADMIN", "GERENTE", "RECEPCAO", "PROFISSIONAL"],
        state: "available",
      },
      {
        id: "packages",
        label: "Pacotes",
        href: "/pacotes",
        icon: Package,
        roles: ["ADMIN", "GERENTE", "RECEPCAO", "PROFISSIONAL"],
        state: "available",
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        href: "/whatsapp",
        icon: MessageCircle,
        roles: MANAGEMENT_ROLES,
        state: "development",
      },
      {
        id: "files",
        label: "Arquivos",
        href: "/arquivos",
        icon: FileText,
        roles: ALL_ADMIN_ROLES,
        state: "development",
      },
    ],
  },
  {
    id: "administration",
    label: "Administração",
    items: [
      {
        id: "settings",
        label: "Configurações",
        href: "/configuracoes",
        icon: Settings,
        roles: ADMINISTRATION_ROLES,
        state: "development",
      },
      {
        id: "users",
        label: "Usuários",
        href: "/usuarios",
        icon: UserRoundCog,
        roles: MANAGEMENT_ROLES,
        state: "available",
      },
      {
        id: "audit",
        label: "Auditoria",
        href: "/auditoria",
        icon: ShieldCheck,
        roles: ["SUPER_ADMIN"],
        state: "development",
      },
      {
        id: "companies",
        label: "Empresas",
        href: "/empresas",
        icon: ChartNoAxesCombined,
        roles: ["SUPER_ADMIN"],
        state: "development",
        permission: "companies:access",
      },
    ],
  },
] as const satisfies readonly NavigationGroup[];

function isNavigationItemVisible(
  item: NavigationItem,
  role: AdminRole,
): boolean {
  return item.roles.includes(role);
}

export function getNavigationForRole(
  role: AdminRole,
): readonly NavigationGroup[] {
  return ADMIN_NAVIGATION.map((group) => ({
    ...group,
    items: group.items
      .filter((item) => isNavigationItemVisible(item, role))
      .map((item: NavigationItem) => ({
        ...item,
        children: item.children?.filter((child) =>
          isNavigationItemVisible(child, role),
        ),
      })),
  })).filter((group) => group.items.length > 0);
}
