"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
import { parseTenantPublicConfig } from "@/features/tenant/schemas/tenant.schema";
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";

type TenantContextValue = {
  tenant: TenantPublicConfig;
  setTenant: (value: unknown) => void;
  resetTenant: () => void;
};

type TenantProviderProps = {
  children: ReactNode;
  initialTenant?: TenantPublicConfig;
};

const TenantContext = createContext<TenantContextValue | null>(null);

function applyTenantVisualTokens(
  tenant: TenantPublicConfig,
): void {
  const root = document.documentElement;

  root.dataset.tenant = tenant.slug;
  root.style.setProperty(
    "--tenant-primary",
    tenant.branding.primaryColor,
  );
  root.style.setProperty(
    "--tenant-secondary",
    tenant.branding.secondaryColor,
  );
  root.style.setProperty(
    "--tenant-accent",
    tenant.branding.accentColor,
  );
}

function applyTenantFavicon(
  faviconUrl: string | null,
): void {
  const selector = 'link[data-tenant-favicon="true"]';
  const currentLink = document.head.querySelector<HTMLLinkElement>(
    selector,
  );

  if (!faviconUrl) {
    currentLink?.remove();
    return;
  }

  const faviconLink = currentLink ?? document.createElement("link");

  faviconLink.rel = "icon";
  faviconLink.href = faviconUrl;
  faviconLink.dataset.tenantFavicon = "true";

  if (!currentLink) {
    document.head.appendChild(faviconLink);
  }
}

export function TenantProvider({
  children,
  initialTenant = DEFAULT_TENANT,
}: TenantProviderProps) {
  const [tenant, setTenantState] = useState<TenantPublicConfig>(() =>
    parseTenantPublicConfig(initialTenant),
  );

  const setTenant = useCallback((value: unknown) => {
    setTenantState(parseTenantPublicConfig(value));
  }, []);

  const resetTenant = useCallback(() => {
    setTenantState(DEFAULT_TENANT);
  }, []);

  useEffect(() => {
    applyTenantVisualTokens(tenant);
    applyTenantFavicon(tenant.branding.faviconUrl);
  }, [tenant]);

  const contextValue = useMemo<TenantContextValue>(
    () => ({
      tenant,
      setTenant,
      resetTenant,
    }),
    [resetTenant, setTenant, tenant],
  );

  return (
    <TenantContext.Provider value={contextValue}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextValue {
  const context = useContext(TenantContext);

  if (!context) {
    throw new Error(
      "useTenant deve ser utilizado dentro de TenantProvider.",
    );
  }

  return context;
}
