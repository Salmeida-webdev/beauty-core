"use client";

import {
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  setPendingAdminLoginReason,
} from "@/features/auth/navigation/admin-login-navigation-state";
import {
  buildAdminLoginHref,
} from "@/features/auth/navigation/admin-return-to";
import {
  clearLocalAdminSession,
  restoreAdminSession,
} from "@/features/auth/services/auth-session";
import {
  ADMIN_FORBIDDEN_EVENT,
} from "@/services/auth/access-events";
import {
  SESSION_EXPIRED_EVENT,
} from "@/services/auth/refresh-coordinator";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const router = useRouter();

  useEffect(() => {
    const handleSessionExpired = () => {
      const pathname =
        window.location.pathname;

      if (pathname === "/login") {
        clearLocalAdminSession();

        router.replace(
          buildAdminLoginHref(
            "/dashboard",
            "session-expired",
          ),
        );

        return;
      }

      setPendingAdminLoginReason(
        "session-expired",
      );

      clearLocalAdminSession();
    };

    const handleForbidden = () => {
      if (
        window.location.pathname ===
        "/acesso-negado"
      ) {
        return;
      }

      router.replace(
        "/acesso-negado",
      );
    };

    window.addEventListener(
      SESSION_EXPIRED_EVENT,
      handleSessionExpired,
    );

    window.addEventListener(
      ADMIN_FORBIDDEN_EVENT,
      handleForbidden,
    );

    void restoreAdminSession();

    return () => {
      window.removeEventListener(
        SESSION_EXPIRED_EVENT,
        handleSessionExpired,
      );

      window.removeEventListener(
        ADMIN_FORBIDDEN_EVENT,
        handleForbidden,
      );
    };
  }, [router]);

  return children;
}
