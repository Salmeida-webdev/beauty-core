"use client";

import { useEffect, type ReactNode } from "react";

import {
  clearLocalAdminSession,
  restoreAdminSession,
} from "@/features/auth/services/auth-session";
import { SESSION_EXPIRED_EVENT } from "@/services/auth/refresh-coordinator";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    const handleSessionExpired = () => {
      clearLocalAdminSession();
    };

    window.addEventListener(
      SESSION_EXPIRED_EVENT,
      handleSessionExpired,
    );

    void restoreAdminSession();

    return () => {
      window.removeEventListener(
        SESSION_EXPIRED_EVENT,
        handleSessionExpired,
      );
    };
  }, []);

  return children;
}
