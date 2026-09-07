"use client";

import {
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  getAdminReturnToFromSearch,
} from "@/features/auth/navigation/admin-return-to";
import { useAuthStore } from "@/stores/auth-store";

type AdminLoginBoundaryProps = {
  children: ReactNode;
};

export function AdminLoginBoundary({
  children,
}: AdminLoginBoundaryProps) {
  const router = useRouter();

  const status = useAuthStore(
    (state) => state.status,
  );

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const search =
      typeof window !== "undefined"
        ? window.location.search
        : "";

    const returnTo =
      getAdminReturnToFromSearch(search);

    router.replace(returnTo);
    router.refresh();
  }, [router, status]);

  if (status === "authenticated") {
    return (
      <main
        className="flex min-h-dvh items-center justify-center bg-background p-6"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium text-text-muted">
          Acesso confirmado. Redirecionando para o painel.
        </p>
      </main>
    );
  }

  if (
    status === "idle" ||
    status === "restoring"
  ) {
    return (
      <main
        className="flex min-h-dvh items-center justify-center bg-background p-6"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium text-text-muted">
          Validando sua sessão administrativa.
        </p>
      </main>
    );
  }

  return children;
}
