# Beauty Core 1.0 — Chat 62
## BLOCO 12/15 — Gate Técnico de Agendamentos

- Data: 2026-09-05 23:18:33 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Confirmar se o frontend possui contrato, schema, serviço HTTP e suporte de mutation suficientes para implementar agendamentos do cliente sem inventar endpoints ou dados.

## 2. Arquivos candidatos

- `src\features\agendamentos\schemas\agendamentos-api.schemas.ts`
- `src\features\agendamentos\schemas\agendamentos-options.schemas.ts`
- `src\features\agendamentos\schemas\agendamentos-schemas.ts`
- `src\features\agendamentos\services\agendamentos-api.test.ts`
- `src\features\agendamentos\services\agendamentos-api.ts`
- `src\features\agendamentos\services\agendamentos-create-api.test.ts`
- `src\features\agendamentos\services\agendamentos-options-api.test.ts`
- `src\features\agendamentos\services\agendamentos-options-api.ts`
- `src\features\agendamentos\services\agendamentos-status-api.test.ts`
- `src\features\agendamentos\services\agendamentos-update-api.test.ts`
- `src\features\clientes\schemas\cliente-profile-extras.schemas.test.ts`
- `src\features\clientes\schemas\cliente-profile-extras.schemas.ts`
- `src\features\clientes\schemas\clientes.schemas.test.ts`
- `src\features\clientes\schemas\clientes.schemas.ts`
- `src\features\clientes\schemas\clientes-lgpd.schemas.ts`
- `src\features\clientes\services\cliente-profile-actions-api.test.ts`
- `src\features\clientes\services\cliente-profile-extras-api.test.ts`
- `src\features\clientes\services\cliente-profile-extras-api.ts`
- `src\features\clientes\services\clientes-api.test.ts`
- `src\features\clientes\services\clientes-api.ts`
- `src\features\clientes\services\clientes-lgpd-api.test.ts`
- `src\features\clientes\services\clientes-lgpd-api.ts`
- `src\features\portal\contracts\portal-client-adapters.ts`
- `src\features\portal\contracts\portal-client-contracts.ts`
- `src\features\portal\contracts\portal-client-schemas.ts`
- `src\features\portal\query\portal-client-query-keys.test.ts`
- `src\features\portal\query\portal-client-query-keys.ts`
- `src\features\portal\services\portal-client-api.test.ts`
- `src\features\portal\services\portal-client-api.ts`
- `src\services\api\api-client.ts`

## 3. Endpoints e serviços HTTP

Quantidade de ocorrências: 3

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:8:      src: "/images/portal/appointments/portal-appointments.webp",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
``

## 4. Contratos e schemas

Quantidade de ocorrências: 268

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:6:  appointments: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:8:      src: "/images/portal/appointments/portal-appointments.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:122:  | (typeof portalAssets)["appointments"]["illustration"]
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:11:    queryClient.setQueryData(["portal", "agendamentos"], [{ id: "agenda-1" }]);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:20:      queryClient.getQueryData(["portal", "agendamentos"]),
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:43:      <output data-testid="status">{auth.status}</output>
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:84:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:108:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:122:          status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:135:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:152:    expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:170:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:26:      <output data-testid="status">{auth.status}</output>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:65:    expect(screen.getByTestId("status")).toHaveTextContent("unknown");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:78:    expect(screen.getByTestId("status")).toHaveTextContent("restoring");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:81:    expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:88:    expect(screen.getByTestId("status")).toHaveTextContent("denied");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:93:    expect(screen.getByTestId("status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:100:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:123:        initialState={{ status: "authenticated", identity: CLIENT_IDENTITY }}
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:136:      initialState.status !== "unknown"
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:150:    initialState.status,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:212:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:214:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:218:  if (status === "anonymous") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:222:  if (status === "denied") {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:16:    "classifica status %s como %s",
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:17:    (status, expectedKind) => {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:21:          status,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:29:        status,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:44:      status: null,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:52:        status: 401,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:15:  status: number | null;
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:19:function getKindFromStatus(status: number | null): PortalAuthErrorKind {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:20:  if (status === 400) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:24:  if (status === 401) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:28:  if (status === 403) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:32:  if (status === 404) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:36:  if (status === 429) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:40:  if (status !== null && status >= 500) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:74:      status: null,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:79:  const status = error.response?.status ?? null;
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:80:  const kind = status === null
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:82:    : getKindFromStatus(status);
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:86:    status,
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:87:    status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:28:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:31:    (status === "unknown" || status === "restoring") &&
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:38:        role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:45:  if (status !== "authenticated") {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:140:        role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:187:    (error.response?.status === 401 ||
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:188:      error.response?.status === 403)
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:195:    error.response?.status === 401
beauty-core-ui/src/features/portal/auth/portal-auth.ts:1:´╗┐export const PORTAL_AUTH_STATUSES = [
beauty-core-ui/src/features/portal/auth/portal-auth.ts:9:export type PortalAuthStatus = (typeof PORTAL_AUTH_STATUSES)[number];
beauty-core-ui/src/features/portal/auth/portal-auth.ts:18:  status: PortalAuthStatus;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:23:  status: "unknown",
beauty-core-ui/src/features/portal/auth/portal-auth.ts:40:      return { status: "restoring", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:42:      return { status: "anonymous", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:44:      return { status: "authenticated", identity: action.identity };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:46:      return { status: "denied", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:48:      return { status: "anonymous", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:55:  state: Pick<PortalAuthState, "status">,
beauty-core-ui/src/features/portal/auth/portal-auth.ts:57:  return state.status === "authenticated";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:130:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:164:      expect(screen.getByRole("status")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:171:        status: 429,
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:37:function getHttpStatus(error: unknown): number | undefined {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:48:  const status = (response as { status?: unknown }).status;
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:50:  return typeof status === "number" ? status : undefined;
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:54:  switch (getHttpStatus(error)) {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:207:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:200:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:236:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:245:        status: 401,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:287:      screen.getByRole("status"),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:300:        status: 429,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:323:        status: 403,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:40:function getHttpStatus(error: unknown): number | undefined {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:51:  const status = (response as { status?: unknown }).status;
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:53:  return typeof status === "number" ? status : undefined;
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:59:  switch (getHttpStatus(error)) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:75:  switch (getHttpStatus(error)) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:279:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:289:            role="status"
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:46:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:66:      status: "restoring",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:76:    expect(screen.getByRole("status")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:83:      status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:104:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:26:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:32:    if (status !== "anonymous" && status !== "denied") {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:39:  }, [router, safeReturnTo, status]);
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:41:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:43:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:52:  if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:41:  status: "authenticated",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:50:  status: "anonymous",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:62:  agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:67:        status: "CONFIRMADO",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:80:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:84:      {status}|{query.status}|{query.fetchStatus}|{query.data?.perfil.nome ?? ""}
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:164:    "converts dashboard access status %s into the safe auth state",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:165:    async (status, expectedAuthStatus) => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:168:        response: { status },
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:175:          expectedAuthStatus,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:201:      agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:223:      response: { status: 500 },
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:28:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:31:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:33:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:42:  if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:55:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:116:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:2:  PortalAppointmentSummary,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:14:  type PortalAppointmentTransport,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:47:function toPortalAppointmentSummary(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:48:  value: PortalAppointmentTransport,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:49:): PortalAppointmentSummary {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:53:    status: value.status,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:77:    agendamentos: {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:78:      proximos: parsed.agendamentos.proximos.map(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:79:        toPortalAppointmentSummary,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:81:      ultimo: parsed.agendamentos.ultimo
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:82:        ? toPortalAppointmentSummary(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:83:            parsed.agendamentos.ultimo,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:101:      status: item.status ?? null,
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:1:export const PORTAL_APPOINTMENT_STATUS_VALUES = [
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:10:export type PortalAppointmentStatus =
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:11:  (typeof PORTAL_APPOINTMENT_STATUS_VALUES)[number];
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:14:  "AGENDAMENTO",
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:38:export type PortalAppointmentSummary = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:41:  status: PortalAppointmentStatus;
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:50:  agendamentos: Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:51:    proximos: readonly PortalAppointmentSummary[];
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:52:    ultimo: PortalAppointmentSummary | null;
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:60:  status: string | null;
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:4:  PORTAL_APPOINTMENT_STATUS_VALUES,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:35:export const portalAppointmentTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:39:    status: z.enum(PORTAL_APPOINTMENT_STATUS_VALUES),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:49:    agendamentos: z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:51:        proximos: z.array(portalAppointmentTransportSchema),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:52:        ultimo: portalAppointmentTransportSchema.nullable(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:63:    status: z.string().nullable().optional(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:97:export type PortalAppointmentTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:98:  typeof portalAppointmentTransportSchema
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:8:  getPortalResourceErrorStatus,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:22:    "reutiliza a classificacao segura para status %s",
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:23:    (status, expectedKind) => {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:27:          status,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:33:        status,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:42:        response: { status: 401 },
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:48:        response: { status: 403 },
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:54:        response: { status: 404 },
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:58:      getPortalResourceErrorStatus({
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:60:        response: { status: 404 },
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:69:        status: 401,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:14:export function getPortalResourceErrorStatus(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:17:  return normalizePortalResourceError(error).status;
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:23:  const status = getPortalResourceErrorStatus(error);
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:25:  return status === 401 || status === 403;
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:18:  status: "anonymous",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:105:      status: "restoring",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:109:    expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:116:      status: "denied",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:48:function StatusProbe() {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:49:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:51:  return <output data-testid="auth-status">{status}</output>;
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:62:              status: "authenticated",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:70:            <StatusProbe />
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:116:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:139:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:185:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:74:        screen.getByRole("status"),
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:72:    status: "authenticated",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:121:      status: "anonymous",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:17:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:28:    if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:43:    if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:101:  }, [returnTo, router, status]);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:110:      <p aria-live="polite" className="py-10 text-center text-sm text-muted-foreground" role="status">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:77:      role="status"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:103:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:105:  if (status === "anonymous") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:109:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:113:  if (status === "denied") {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:77:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:62:          role="status"
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:40:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:45:      {status}:{String(privateQueriesEnabled)}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:62:function AccessErrorProbe({ status }: { status: number }) {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:66:    handleAccessError(status);
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:67:  }, [handleAccessError, status]);
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:99:          status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:133:            status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:138:          <AccessErrorProbe status={401} />
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:182:            status: "anonymous",
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:17:  agendamentos: {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:22:        status: "CONFIRMADO",
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:44:          status: "CONFIRMADO",
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:62:      agendamentos: {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:2:  PortalAppointmentSummary,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:6:export type PortalDashboardAppointmentViewModel =
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:10:    status: PortalAppointmentSummary["status"];
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:20:  proximos: readonly PortalDashboardAppointmentViewModel[];
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:21:  ultimo: PortalDashboardAppointmentViewModel | null;
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:24:function mapAppointment(
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:25:  value: PortalAppointmentSummary,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:26:): PortalDashboardAppointmentViewModel {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:30:    status: value.status,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:44:    proximos: value.agendamentos.proximos.map(mapAppointment),
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:45:    ultimo: value.agendamentos.ultimo
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:46:      ? mapAppointment(value.agendamentos.ultimo)
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:6:import { getPortalResourceErrorStatus } from "../errors/portal-resource-errors";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:23:    const status = getPortalResourceErrorStatus(query.error);
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:25:    if (status === null) {
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:29:    handleAccessError(status);
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:27:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:31:      {status}:{String(enabled)}
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:39:      status: "anonymous",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:58:          status: "authenticated",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:74:        initialState={{ status: "anonymous", identity: null }}
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:15:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:17:  return portalQueryEnabled(status, requiresAuthentication);
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:25:    (status: number): boolean =>
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:26:      handlePortalAccessError(queryClient, status, (transition) => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:7:  portalAccessTransitionFromStatus,
beauty-core-ui/src/features/portal/query/portal-query.test.ts:60:    expect(portalAccessTransitionFromStatus(401)).toBe("anonymous");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:61:    expect(portalAccessTransitionFromStatus(403)).toBe("denied");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:62:    expect(portalAccessTransitionFromStatus(500)).toBeNull();
beauty-core-ui/src/features/portal/query/portal-query.ts:3:import type { PortalAuthStatus } from "../auth/portal-auth";
beauty-core-ui/src/features/portal/query/portal-query.ts:24:  status: PortalAuthStatus,
beauty-core-ui/src/features/portal/query/portal-query.ts:28:    return status === "authenticated";
beauty-core-ui/src/features/portal/query/portal-query.ts:32:    status === "anonymous" ||
beauty-core-ui/src/features/portal/query/portal-query.ts:33:    status === "authenticated" ||
beauty-core-ui/src/features/portal/query/portal-query.ts:34:    status === "denied"
beauty-core-ui/src/features/portal/query/portal-query.ts:52:export function portalAccessTransitionFromStatus(
beauty-core-ui/src/features/portal/query/portal-query.ts:53:  status: number,
beauty-core-ui/src/features/portal/query/portal-query.ts:55:  if (status === 401) {
beauty-core-ui/src/features/portal/query/portal-query.ts:59:  if (status === 403) {
beauty-core-ui/src/features/portal/query/portal-query.ts:68:  status: number,
beauty-core-ui/src/features/portal/query/portal-query.ts:71:  const transition = portalAccessTransitionFromStatus(status);
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:44:    quantidadeAgendamentos: 2,
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:52:function appointmentResponse() {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:54:    id: "agendamento-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:62:    status: "CONFIRMADO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:113:        agendamentos: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:114:          proximos: [appointmentResponse()],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:145:      agendamentos: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:150:            status: "CONFIRMADO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:168:          tipo: "AGENDAMENTO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:172:          status: "CONCLUIDO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:174:            id: "agendamento-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:183:          status: "NAO_LIDA",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:198:        tipo: "AGENDAMENTO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:201:        status: "CONCLUIDO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:207:        status: "NAO_LIDA",
beauty-core-ui/src/services/api/api-client.ts:94:        error.response?.status === 403 &&
beauty-core-ui/src/services/api/api-client.ts:104:        error.response?.status !== 401 ||
beauty-core-ui/src/services/api/api-client.ts:131:          status: response.status,
beauty-core-ui/src/services/api/api-client.ts:148:          status: error.response?.status ?? null,
beauty-core-ui/src/services/api/api.types.ts:2:  statusCode: number;
beauty-core-ui/src/services/api/api.types.ts:12:  statusCode: number | null;
beauty-core-ui/src/services/api/normalize-api-error.ts:23:    typeof value.statusCode === "number" &&
beauty-core-ui/src/services/api/normalize-api-error.ts:51:      statusCode: null,
beauty-core-ui/src/services/api/normalize-api-error.ts:66:      statusCode: null,
beauty-core-ui/src/services/api/normalize-api-error.ts:89:    statusCode: payload?.statusCode ?? error.response.status,
``

## 5. Mutations

Quantidade de ocorrências: 0

Nenhum item localizado.

## 6. Testes específicos

- `e2e\chat51-agenda.spec.ts`
- `src\features\agendamentos\agendamentos-cache-hardening.test.ts`
- `src\features\agendamentos\agendamentos-contract-hardening.test.ts`
- `src\features\agendamentos\agendamentos-foundation.test.ts`
- `src\features\agendamentos\agendamentos-navigation.test.ts`
- `src\features\agendamentos\agendamentos-permissions-hardening.test.ts`
- `src\features\agendamentos\agendamentos-url-hardening.test.ts`
- `src\features\agendamentos\chat51-agenda-flow.integration.test.ts`
- `src\features\agendamentos\components\agenda-calendar.test.tsx`
- `src\features\agendamentos\components\agenda-calendar-accessibility.test.tsx`
- `src\features\agendamentos\components\agenda-calendar-toolbar.test.tsx`
- `src\features\agendamentos\components\agenda-detail-openers.test.tsx`
- `src\features\agendamentos\components\agenda-list.test.tsx`
- `src\features\agendamentos\components\agendamento-create-dialog.integration.test.tsx`
- `src\features\agendamentos\components\agendamento-detail-dialog.integration.test.tsx`
- `src\features\agendamentos\components\agendamento-status-actions.test.tsx`
- `src\features\agendamentos\components\agenda-option-picker.test.tsx`
- `src\features\agendamentos\components\agenda-status-badge.test.tsx`
- `src\features\agendamentos\components\agenda-visual-audit.test.ts`
- `src\features\agendamentos\forms\agendamento-create-form.schema.test.ts`
- `src\features\agendamentos\forms\agendamento-create-form.test.tsx`
- `src\features\agendamentos\forms\agendamento-create-payload.test.ts`
- `src\features\agendamentos\forms\agendamento-edit-payload.test.ts`
- `src\features\agendamentos\queries\agendamentos-query-options.test.ts`
- `src\features\agendamentos\services\agendamentos-api.test.ts`
- `src\features\agendamentos\services\agendamentos-create-api.test.ts`
- `src\features\agendamentos\services\agendamentos-options-api.test.ts`
- `src\features\agendamentos\services\agendamentos-status-api.test.ts`
- `src\features\agendamentos\services\agendamentos-update-api.test.ts`
- `src\features\agendamentos\utils\agenda-calendar.test.ts`
- `src\features\agendamentos\utils\agenda-filters.test.ts`

## 7. Resultado do gate

- Endpoint candidato localizado: SIM
- Contrato candidato localizado: SIM
- Mutation candidata localizada: NÃO
- Resultado: CONTRATO CANDIDATO LOCALIZADO — requer validação manual dos arquivos

## 8. Critério de implementação

A implementação funcional somente poderá ocorrer se houver:

1. endpoint real confirmado;
2. método HTTP confirmado;
3. formato de resposta conhecido;
4. schema ou contrato compatível;
5. identificação segura do cliente pela sessão;
6. query key compatível;
7. tratamento de erro e vazio;
8. testes correspondentes.

Se qualquer item estiver ausente, o frontend não deverá fabricar agendamentos nem simular persistência.

## 9. Restrições

- Nenhuma tela funcional criada.
- Nenhum endpoint criado.
- Nenhum contrato inventado.
- Nenhuma mutation criada.
- Nenhuma alteração no backend.
- Nenhum dado fictício persistente.
- Nenhuma funcionalidade dos Chats 63 e 64 antecipada.
- Nenhum commit, push, tag ou deploy executado.

## 10. Próximo bloco

O BLOCO 13/15 deverá executar a mesma validação de suporte real para fidelidade, benefícios, pacotes e consumo, classificando cada domínio como suportado, parcial ou bloqueado.
