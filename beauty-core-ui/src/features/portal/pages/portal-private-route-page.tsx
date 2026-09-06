"use client";

import type { ReactNode } from "react";

import { PortalPrivateRoute } from "@/features/portal/auth/portal-private-route";
import { PortalPageContainer } from "../components/portal-page-container";

type PortalPrivateRoutePageProps = {
  heading: string;
  description: string;
  children?: ReactNode;
};

export function PortalPrivateRoutePage({
  heading,
  description,
  children,
}: PortalPrivateRoutePageProps) {
  return (
    <PortalPrivateRoute>
      <PortalPageContainer>
        <section
          aria-labelledby="portal-private-route-heading"
          className="space-y-4"
          data-portal-route="private"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Portal protegido
          </p>
          <h1
            className="text-3xl font-semibold tracking-tight text-foreground"
            id="portal-private-route-heading"
          >
            {heading}
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            {description}
          </p>
          {children}
        </section>
      </PortalPageContainer>
    </PortalPrivateRoute>
  );
}