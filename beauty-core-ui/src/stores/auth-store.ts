import { create } from "zustand";

import type { AdminSessionIdentity } from "@/features/auth/types/auth.types";

export type AuthStatus =
  | "idle"
  | "restoring"
  | "authenticated"
  | "unauthenticated";

type AuthStore = {
  status: AuthStatus;
  user: AdminSessionIdentity | null;
  beginSessionRestore: () => void;
  setAuthenticated: (user: AdminSessionIdentity) => void;
  setUnauthenticated: () => void;
  clearSession: () => void;
};

const initialState = {
  status: "idle" as AuthStatus,
  user: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  beginSessionRestore: () => {
    set({ status: "restoring" });
  },

  setAuthenticated: (user) => {
    set({
      status: "authenticated",
      user,
    });
  },

  setUnauthenticated: () => {
    set({
      status: "unauthenticated",
      user: null,
    });
  },

  clearSession: () => {
    set(initialState);
  },
}));

export function getAuthState(): AuthStore {
  return useAuthStore.getState();
}
