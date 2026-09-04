import type { ReactNode } from "react";

import { PortalAuthProvider } from "@/features/portal/auth/portal-auth-context";
import { PortalShell } from "@/features/portal/components/portal-shell";

type PortalLayoutProps = {
  children: ReactNode;
};

export default function PortalLayout({
  children,
}: PortalLayoutProps) {
  return (
    <PortalAuthProvider>
      <PortalShell>{children}</PortalShell>
    </PortalAuthProvider>
  );
}
