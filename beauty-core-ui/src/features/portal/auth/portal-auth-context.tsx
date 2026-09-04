"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

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
  markAnonymous: () => void;
  markAuthenticated: (identity: PortalClientIdentity) => void;
  markDenied: () => void;
  clearSession: () => void;
};

const PortalAuthContext = createContext<PortalAuthContextValue | null>(null);

type PortalAuthProviderProps = {
  children: ReactNode;
  initialState?: PortalAuthState;
};

export function PortalAuthProvider({
  children,
  initialState = PORTAL_AUTH_INITIAL_STATE,
}: PortalAuthProviderProps) {
  const [state, dispatch] = useReducer(portalAuthReducer, initialState);

  const beginRestore = useCallback(() => {
    dispatch({ type: "restore" });
  }, []);

  const markAnonymous = useCallback(() => {
    dispatch({ type: "anonymous" });
  }, []);

  const markAuthenticated = useCallback(
    (identity: PortalClientIdentity) => {
      dispatch({ type: "authenticated", identity });
    },
    [],
  );

  const markDenied = useCallback(() => {
    dispatch({ type: "denied" });
  }, []);

  const clearSession = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const value = useMemo<PortalAuthContextValue>(
    () => ({
      ...state,
      canUsePrivateQueries: canUsePortalPrivateQueries(state),
      beginRestore,
      markAnonymous,
      markAuthenticated,
      markDenied,
      clearSession,
    }),
    [
      beginRestore,
      clearSession,
      markAnonymous,
      markAuthenticated,
      markDenied,
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
    throw new Error("usePortalAuth deve ser utilizado dentro de PortalAuthProvider.");
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
