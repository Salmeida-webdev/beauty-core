import { Suspense } from "react";

import { PortalFirstAccessPage } from "@/features/portal/pages/portal-first-access-page";

export default function PortalFirstAccessRoute() {
  return (
    <Suspense
      fallback={
        <p
          aria-live="polite"
          className="py-10 text-center text-sm text-muted-foreground"
          role="status"
        >
          Preparando o primeiro acesso...
        </p>
      }
    >
      <PortalFirstAccessPage />
    </Suspense>
  );
}
