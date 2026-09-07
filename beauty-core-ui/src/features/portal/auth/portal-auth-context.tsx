"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";

import type {
  PortalLogoutResponse,
} from "./portal-auth-contracts";
import {
  normalizePortalAuthError,
} from "./portal-auth-errors";
import {
  clearPortalSession as clearStoredPortalSession,
  hasPortalSession,
  logoutPortalSession,
  restorePortalSession,
} from "./portal-auth-session";
import {
  canUsePortalPrivateQueries,
  PORTAL_AUTH_INITIAL_STATE,
  portalAuthReducer,
  type PortalAuthState,
  type PortalClientIdentity,
} from "./portal-auth";

export type PortalAuthContextValue = PortalAuthState & {
  canUsePrivateQueries: boolean;
  beginRestore: () => void;
  restoreSession: () => Promise<PortalClientIdentity | null>;
  markAnonymous: () => void;
  markAuthenticated: (identity: PortalClientIdentity) => void;
  markDenied: () => void;
  clearSession: () => void;
  logoutSession: () => Promise<PortalLogoutResponse | null>;
};

const PortalAuthContext =
  createContext<PortalAuthContextValue | null>(null);

type PortalAuthProviderProps = {
  children: ReactNode;
  initialState?: PortalAuthState;
  restoreOnMount?: boolean;
};

export function PortalAuthProvider({
  children,
  initialState = PORTAL_AUTH_INITIAL_STATE,
  restoreOnMount = false,
}: PortalAuthProviderProps) {
  const [state, dispatch] = useReducer(
    portalAuthReducer,
    initialState,
  );

  const restoreStartedRef = useRef(false);

  const beginRestore = useCallback(() => {
    dispatch({ type: "restore" });
  }, []);

  const markAnonymous = useCallback(() => {
    dispatch({ type: "anonymous" });
  }, []);

  const markAuthenticated = useCallback(
    (identity: PortalClientIdentity) => {
      dispatch({
        type: "authenticated",
        identity,
      });
    },
    [],
  );

  const markDenied = useCallback(() => {
    dispatch({ type: "denied" });
  }, []);

  const clearSession = useCallback(() => {
    clearStoredPortalSession();
    dispatch({ type: "clear" });
  }, []);

  const restoreSession = useCallback(async () => {
    beginRestore();

    try {
      const identity = await restorePortalSession();

      if (!identity) {
        markAnonymous();
        return null;
      }

      markAuthenticated(identity);
      return identity;
    } catch (error) {
      const normalized = normalizePortalAuthError(error);

      if (normalized.kind === "forbidden") {
        markDenied();
      } else {
        markAnonymous();
      }

      throw error;
    }
  }, [
    beginRestore,
    markAnonymous,
    markAuthenticated,
    markDenied,
  ]);

  const logoutSession = useCallback(async () => {
    try {
      return await logoutPortalSession();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    if (
      !restoreOnMount ||
      restoreStartedRef.current ||
      initialState.status !== "unknown"
    ) {
      return;
    }

    restoreStartedRef.current = true;

    if (!hasPortalSession()) {
      markAnonymous();
      return;
    }

    void restoreSession().catch(() => undefined);
  }, [
    initialState.status,
    markAnonymous,
    restoreOnMount,
    restoreSession,
  ]);

  const value = useMemo<PortalAuthContextValue>(
    () => ({
      ...state,
      canUsePrivateQueries: canUsePortalPrivateQueries(state),
      beginRestore,
      restoreSession,
      markAnonymous,
      markAuthenticated,
      markDenied,
      clearSession,
      logoutSession,
    }),
    [
      beginRestore,
      clearSession,
      logoutSession,
      markAnonymous,
      markAuthenticated,
      markDenied,
      restoreSession,
      state,
    ],
  );

  return (
    <PortalAuthContext.Provider value={value}>
      {children}
    </PortalAuthContext.Provider>
  );
}

export function usePortalAuth(): PortalAuthContextValue {
  const context = useContext(PortalAuthContext);

  if (!context) {
    throw new Error(
      "usePortalAuth deve ser utilizado dentro de PortalAuthProvider.",
    );
  }

  return context;
}

type PortalAuthBoundaryProps = {
  children: ReactNode;
  restoringFallback?: ReactNode;
  anonymousFallback?: ReactNode;
  deniedFallback?: ReactNode;
};

export function PortalAuthBoundary({
  children,
  restoringFallback = null,
  anonymousFallback = null,
  deniedFallback = null,
}: PortalAuthBoundaryProps) {
  const { status } = usePortalAuth();

  if (status === "unknown" || status === "restoring") {
    return restoringFallback;
  }

  if (status === "anonymous") {
    return anonymousFallback;
  }

  if (status === "denied") {
    return deniedFallback;
  }

  return children;
}