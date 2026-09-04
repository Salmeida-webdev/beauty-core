export const PORTAL_AUTH_STATUSES = [
  "unknown",
  "restoring",
  "anonymous",
  "authenticated",
  "denied",
] as const;

export type PortalAuthStatus = (typeof PORTAL_AUTH_STATUSES)[number];

export type PortalClientIdentity = Readonly<{
  clienteId: string;
  empresaId: string;
  sid: string;
}>;

export type PortalAuthState = Readonly<{
  status: PortalAuthStatus;
  identity: PortalClientIdentity | null;
}>;

export const PORTAL_AUTH_INITIAL_STATE: PortalAuthState = {
  status: "unknown",
  identity: null,
};

export type PortalAuthAction =
  | { type: "restore" }
  | { type: "anonymous" }
  | { type: "authenticated"; identity: PortalClientIdentity }
  | { type: "denied" }
  | { type: "clear" };

export function portalAuthReducer(
  state: PortalAuthState,
  action: PortalAuthAction,
): PortalAuthState {
  switch (action.type) {
    case "restore":
      return { status: "restoring", identity: null };
    case "anonymous":
      return { status: "anonymous", identity: null };
    case "authenticated":
      return { status: "authenticated", identity: action.identity };
    case "denied":
      return { status: "denied", identity: null };
    case "clear":
      return { status: "anonymous", identity: null };
    default:
      return state;
  }
}

export function canUsePortalPrivateQueries(
  state: Pick<PortalAuthState, "status">,
): boolean {
  return state.status === "authenticated";
}
