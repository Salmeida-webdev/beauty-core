"use client";

import Image from "next/image";

import { useTenant } from "@/providers/tenant-provider";

export function PortalBranding() {
  const { tenant } = useTenant();
  const logoUrl = tenant.branding.logoUrl;
  const tenantName = tenant.name;
  const initials = tenantName.trim().charAt(0).toUpperCase();

  return (
    <div
      aria-label={tenantName}
      className="flex min-w-0 items-center gap-3"
    >
      {logoUrl ? (
        <Image
          alt=""
          className="h-10 w-10 rounded-lg object-cover"
          height={40}
          src={logoUrl}
          unoptimized
          width={40}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-primary-foreground"
          style={{ backgroundColor: "var(--tenant-primary)" }}
        >
          {initials}
        </span>
      )}

      <span className="truncate text-sm font-semibold tracking-wide text-foreground">
        {tenantName}
      </span>
    </div>
  );
}