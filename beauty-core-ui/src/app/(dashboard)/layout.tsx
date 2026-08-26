import type { ReactNode } from "react";

import { AdminShellBoundary } from "@/components/layout/admin-shell-boundary";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <AdminShellBoundary>
      {children}
    </AdminShellBoundary>
  );
}