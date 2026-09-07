"use client";

import { useTenant } from "@/providers/tenant-provider";
import type { ReactNode } from "react";

import { PortalBranding } from "./portal-branding";
import { PortalNavigation } from "./portal-navigation";
import { PortalOfflineIndicator } from "../pwa/portal-offline-indicator";
import { PortalServiceWorkerRegistration } from "./portal-service-worker-registration";

const skipLinkLabel = "Pular para o conte\u00fado principal";

type PortalShellProps = {
  children: ReactNode;
};

export function PortalShell({ children }: PortalShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        href="#portal-main"
      >
        {skipLinkLabel}
      </a>

      <header
        className="border-border bg-card/80 backdrop-blur"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <PortalBranding />
          <PortalNavigation />
        </div>
      </header>
      <PortalServiceWorkerRegistration />
      <PortalOfflineIndicator />

      <main
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
        id="portal-main"
      >
        {children}
      </main>

      <footer
        className="border-border text-muted-foreground"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 text-xs sm:px-6 lg:px-8">
          <span>Portal do cliente</span>
          <TenantPoweredBy />
        </div>
      </footer>
    </div>
  );
}

function TenantPoweredBy() {
  const { tenant } = useTenant();

  if (!tenant.settings.showPoweredByBeautyCore) {
    return null;
  }

  return <span>Beauty Core</span>;
}
