# Beauty Core 1.0 — Chat 62
## BLOCO 06/15 — Auditoria de Estados, Boundaries e UX Resiliente

- Data: 2026-09-05 23:09:19 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Definir a arquitetura de estados necessária para as superfícies do Chat 62 sem criar inconsistência visual, vazamento de dados ou telas sem tratamento de falha.

Cada recurso deverá tratar explicitamente:

- carregamento inicial;
- carregamento incremental;
- erro;
- vazio;
- offline;
- acesso negado;
- sucesso;
- retry controlado.

## 2. Arquivos relacionados

- `src\app\(auth)\login\page.tsx`
- `src\app\(dashboard)\acesso-negado\page.tsx`
- `src\app\(dashboard)\agenda\page.tsx`
- `src\app\(dashboard)\arquivos\page.tsx`
- `src\app\(dashboard)\automacoes\page.tsx`
- `src\app\(dashboard)\clientes\[id]\page.tsx`
- `src\app\(dashboard)\clientes\page.tsx`
- `src\app\(dashboard)\configuracoes\branding\page.tsx`
- `src\app\(dashboard)\configuracoes\page.tsx`
- `src\app\(dashboard)\dashboard\page.tsx`
- `src\app\(dashboard)\design-system\page.tsx`
- `src\app\(dashboard)\fidelidade\page.tsx`
- `src\app\(dashboard)\financeiro\page.tsx`
- `src\app\(dashboard)\notificacoes\page.tsx`
- `src\app\(dashboard)\pacotes\page.tsx`
- `src\app\(dashboard)\profissionais\page.tsx`
- `src\app\(dashboard)\servicos\page.tsx`
- `src\app\(dashboard)\sessoes\page.tsx`
- `src\app\(dashboard)\unidades\page.tsx`
- `src\app\(dashboard)\usuarios\page.tsx`
- `src\app\(dashboard)\whatsapp\page.tsx`
- `src\app\page.tsx`
- `src\app\portal\historico\page.tsx`
- `src\app\portal\page.tsx`
- `src\app\portal\perfil\page.tsx`
- `src\app\portal\primeiro-acesso\page.tsx`
- `src\components\layout\admin-shell-boundary.test.tsx`
- `src\components\layout\admin-shell-boundary.tsx`
- `src\components\layout\page-container.tsx`
- `src\components\layout\page-header.test.tsx`
- `src\components\layout\page-header.tsx`
- `src\components\layout\page-section.tsx`
- `src\components\states\feedback-states.test.tsx`
- `src\components\states\feedback-states.tsx`
- `src\components\ui\skeleton.tsx`
- `src\features\agendamentos\components\agenda-calendar-empty.tsx`
- `src\features\agendamentos\hooks\use-agenda-url-state.ts`
- `src\features\arquivos\utils\arquivos-action-error.test.ts`
- `src\features\arquivos\utils\arquivos-action-error.ts`
- `src\features\arquivos\utils\arquivos-api-error.test.ts`
- `src\features\arquivos\utils\arquivos-api-error.ts`
- `src\features\auth\components\admin-login-boundary.test.tsx`
- `src\features\auth\components\admin-login-boundary.tsx`
- `src\features\auth\hooks\use-admin-private-state-cleanup.ts`
- `src\features\auth\navigation\admin-login-navigation-state.test.ts`
- `src\features\auth\navigation\admin-login-navigation-state.ts`
- `src\features\clientes\forms\cliente-form-error.test.ts`
- `src\features\clientes\forms\cliente-form-error.ts`
- `src\features\dashboard\components\charts\dashboard-chart-loading.tsx`
- `src\features\dashboard\components\dashboard-section-states.test.tsx`
- `src\features\dashboard\components\dashboard-section-states.tsx`
- `src\features\dashboard\components\dashboard-summary-states.test.tsx`
- `src\features\dashboard\components\dashboard-summary-states.tsx`
- `src\features\dashboard\utils\dashboard-error-reference.test.ts`
- `src\features\dashboard\utils\dashboard-error-reference.ts`
- `src\features\financeiro\hooks\use-movimentacoes-list-url-state.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-url-state.test.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-url-state.ts`
- `src\features\portal\auth\portal-auth-errors.test.ts`
- `src\features\portal\auth\portal-auth-errors.ts`
- `src\features\portal\components\portal-asset-image.test.tsx`
- `src\features\portal\components\portal-asset-image.tsx`
- `src\features\portal\components\portal-branding.test.tsx`
- `src\features\portal\components\portal-branding.tsx`
- `src\features\portal\components\portal-dashboard-data-boundary.test.tsx`
- `src\features\portal\components\portal-dashboard-data-boundary.tsx`
- `src\features\portal\components\portal-navigation.test.tsx`
- `src\features\portal\components\portal-navigation.tsx`
- `src\features\portal\components\portal-page-container.test.tsx`
- `src\features\portal\components\portal-page-container.tsx`
- `src\features\portal\components\portal-responsive-a11y.test.tsx`
- `src\features\portal\components\portal-shell.test.tsx`
- `src\features\portal\components\portal-shell.tsx`
- `src\features\portal\errors\portal-resource-errors.test.ts`
- `src\features\portal\errors\portal-resource-errors.ts`
- `src\features\portal\pages\portal-authenticated-surface.test.tsx`
- `src\features\portal\pages\portal-authenticated-surface.tsx`
- `src\features\portal\pages\portal-auth-ux.test.tsx`
- `src\features\portal\pages\portal-first-access-experience.test.tsx`
- `src\features\portal\pages\portal-first-access-experience.tsx`
- `src\features\portal\pages\portal-first-access-page.test.tsx`
- `src\features\portal\pages\portal-first-access-page.tsx`
- `src\features\portal\pages\portal-foundation-page.tsx`
- `src\features\portal\pages\portal-otp-request-page.tsx`
- `src\features\portal\pages\portal-private-route-page.tsx`
- `src\features\portal\pages\portal-terms-consent.test.tsx`
- `src\features\portal\pages\portal-terms-consent.tsx`
- `src\features\portal\states\portal-state-views.test.tsx`
- `src\features\portal\states\portal-state-views.tsx`
- `src\features\servicos\forms\servico-form-error.ts`
- `src\features\unidades\forms\unidade-form-error.ts`
- `src\features\usuarios\forms\usuario-form-error.ts`
- `src\services\api\normalize-api-error.ts`

## 3. Estados de dados encontrados

Quantidade de ocorrências: 573

``text
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:7:    <div data-testid="private-boundary">{children}</div>
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:20:  it("keeps Perfil and Historico under the shared private route boundary", () => {
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:30:    expect(screen.getAllByTestId("private-boundary")).toHaveLength(2);
beauty-core-ui/src/app/portal/portal-routing.test.tsx:24:            status: "anonymous",
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:1:import { Suspense } from "react";
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:7:    <Suspense
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:8:      fallback={
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:12:          role="status"
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:19:    </Suspense>
beauty-core-ui/src/features/portal/assets/portal-assets.ts:104:    empty: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:105:      src: "/images/portal/states/portal-empty-state.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:107:    error: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:108:      src: "/images/portal/states/portal-error-state.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:110:    offline: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:111:      src: "/images/portal/states/portal-offline.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:113:    success: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:114:      src: "/images/portal/states/portal-success.webp",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:33:      data: {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:67:      data: {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:109:      data: {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:129:      data: {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:148:      data: {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:162:      data: {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:175:      data: {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:27:  it("is safe when the Portal cache is already empty", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:43:      <output data-testid="status">{auth.status}</output>
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:84:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:108:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:122:          status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:135:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:152:    expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:170:      expect(screen.getByTestId("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:5:  PortalAuthBoundary,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:26:      <output data-testid="status">{auth.status}</output>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:65:    expect(screen.getByTestId("status")).toHaveTextContent("unknown");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:67:    expect(screen.getByTestId("identity")).toBeEmptyDOMElement();
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:78:    expect(screen.getByTestId("status")).toHaveTextContent("restoring");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:81:    expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:88:    expect(screen.getByTestId("status")).toHaveTextContent("denied");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:90:    expect(screen.getByTestId("identity")).toBeEmptyDOMElement();
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:93:    expect(screen.getByTestId("status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:97:describe("PortalAuthBoundary", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:100:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:106:        <PortalAuthBoundary
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:107:          anonymousFallback={<p>superficie anonima</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:108:          deniedFallback={<p>superficie negada</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:109:          restoringFallback={<p>restaurando</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:112:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:123:        initialState={{ status: "authenticated", identity: CLIENT_IDENTITY }}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:125:        <PortalAuthBoundary
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:126:          anonymousFallback={<p>superficie anonima</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:127:          deniedFallback={<p>superficie negada</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:128:          restoringFallback={<p>restaurando</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:131:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:18:  normalizePortalAuthError,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:19:} from "./portal-auth-errors";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:106:    } catch (error) {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:107:      const normalized = normalizePortalAuthError(error);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:115:      throw error;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:136:      initialState.status !== "unknown"
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:150:    initialState.status,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:191:    throw new Error(
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:199:type PortalAuthBoundaryProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:201:  restoringFallback?: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:202:  anonymousFallback?: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:203:  deniedFallback?: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:206:export function PortalAuthBoundary({
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:208:  restoringFallback = null,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:209:  anonymousFallback = null,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:210:  deniedFallback = null,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:211:}: PortalAuthBoundaryProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:212:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:214:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:215:    return restoringFallback;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:218:  if (status === "anonymous") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:219:    return anonymousFallback;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:222:  if (status === "denied") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:223:    return deniedFallback;
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:4:  normalizePortalAuthError,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:5:} from "./portal-auth-errors";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:7:describe("normalizePortalAuthError", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:16:    "classifica status %s como %s",
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:17:    (status, expectedKind) => {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:18:      const error = {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:19:        isAxiosError: true,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:21:          status,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:26:        normalizePortalAuthError(error),
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:29:        status,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:35:    const error = {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:36:      isAxiosError: true,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:37:      message: "Network Error",
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:41:      normalizePortalAuthError(error),
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:44:      status: null,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:49:    const error = {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:50:      isAxiosError: true,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:52:        status: 401,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:53:        data: {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:61:    const result = normalizePortalAuthError(error);
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:1:import { isAxiosError } from "axios";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:3:export type PortalAuthErrorKind =
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:13:export type PortalAuthError = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:14:  kind: PortalAuthErrorKind;
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:15:  status: number | null;
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:19:function getKindFromStatus(status: number | null): PortalAuthErrorKind {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:20:  if (status === 400) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:24:  if (status === 401) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:28:  if (status === 403) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:32:  if (status === 404) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:36:  if (status === 429) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:40:  if (status !== null && status >= 500) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:47:function getSafeMessage(kind: PortalAuthErrorKind): string {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:68:export function normalizePortalAuthError(
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:69:  error: unknown,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:70:): PortalAuthError {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:71:  if (!isAxiosError(error)) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:74:      status: null,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:79:  const status = error.response?.status ?? null;
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:80:  const kind = status === null
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:82:    : getKindFromStatus(status);
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:86:    status,
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:87:    status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:138:    meMock.mockRejectedValue(new Error("network"));
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:28:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:31:    (status === "unknown" || status === "restoring") &&
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:38:        role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:45:  if (status !== "authenticated") {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:72:  const [error, setError] = useState<string | null>(null);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:107:        setError(null);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:119:          setError(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:140:        role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:147:  if (error) {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:153:        {error}
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:160:    mocks.logout.mockRejectedValue(new Error("Servidor indispon├¡vel"));
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:1:import { isAxiosError } from "axios";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:47:    throw new Error("Token Cliente inv├ílido.");
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:57:    throw new Error("Payload do Token Cliente inv├ílido.");
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:61:    throw new Error("Payload do Token Cliente inv├ílido.");
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:72:    throw new Error(`Claim obrigat├│ria ausente: ${field}.`);
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:85:    throw new Error(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:93:    throw new Error(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:124:    throw new Error(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:130:    throw new Error(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:184:function isAccessRejected(error: unknown): boolean {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:186:    isAxiosError(error) &&
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:187:    (error.response?.status === 401 ||
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:188:      error.response?.status === 403)
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:192:function isUnauthorized(error: unknown): boolean {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:194:    isAxiosError(error) &&
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:195:    error.response?.status === 401
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:253:    } catch (error) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:255:        !isUnauthorized(error) ||
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:259:        throw error;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:276:  } catch (error) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:277:    if (isAccessRejected(error)) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:281:    throw error;
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
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:13:const phoneErrorId = "portal-otp-phone-error";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:37:function getHttpStatus(error: unknown): number | undefined {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:38:  if (typeof error !== "object" || error === null) {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:42:  const response = (error as { response?: unknown }).response;
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:48:  const status = (response as { status?: unknown }).status;
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:50:  return typeof status === "number" ? status : undefined;
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:53:export function getPortalOtpRequestErrorMessage(error: unknown): string {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:54:  switch (getHttpStatus(error)) {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:74:  const [error, setError] = useState<string | null>(null);
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:75:  const [success, setSuccess] = useState<string | null>(null);
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:85:    const validationError = validatePortalPhone(phone);
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:87:    if (validationError) {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:88:      setError(validationError);
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:89:      setSuccess(null);
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:97:    setError(null);
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:98:    setSuccess(null);
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:106:      setSuccess(
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:112:    } catch (requestError) {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:113:      setError(getPortalOtpRequestErrorMessage(requestError));
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:120:  const describedBy = error
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:121:    ? `${phoneHintId} ${phoneErrorId}`
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:159:            aria-invalid={Boolean(error)}
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:172:              setError(null);
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:173:              setSuccess(null);
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:184:          {error ? (
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:187:              id={phoneErrorId}
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:190:              {error}
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:203:        {success ? (
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:207:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:209:            {success}
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:200:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:236:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:245:        status: 401,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:287:      screen.getByRole("status"),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:300:        status: 429,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:323:        status: 403,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:15:const codeErrorId = "portal-otp-code-error";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:40:function getHttpStatus(error: unknown): number | undefined {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:41:  if (typeof error !== "object" || error === null) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:45:  const response = (error as { response?: unknown }).response;
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:51:  const status = (response as { status?: unknown }).status;
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:53:  return typeof status === "number" ? status : undefined;
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:56:export function getPortalOtpVerificationErrorMessage(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:57:  error: unknown,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:59:  switch (getHttpStatus(error)) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:74:function getPortalOtpResendErrorMessage(error: unknown): string {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:75:  switch (getHttpStatus(error)) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:99:  const [error, setError] = useState<string | null>(null);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:101:  const [success, setSuccess] = useState<string | null>(null);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:113:    const validationError = validatePortalOtpCode(code);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:115:    if (validationError) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:116:      setError(validationError);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:118:      setSuccess(null);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:126:    setError(null);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:128:    setSuccess(null);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:140:      setSuccess("Acesso confirmado.");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:141:    } catch (verificationError) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:142:      setError(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:143:        getPortalOtpVerificationErrorMessage(verificationError),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:158:    setError(null);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:160:    setSuccess(null);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:173:    } catch (resendError) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:174:      setError(getPortalOtpResendErrorMessage(resendError));
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:182:  const describedBy = error
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:183:    ? `${codeHintId} ${codeErrorId}`
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:221:            aria-invalid={Boolean(error)}
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:234:              setError(null);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:236:              setSuccess(null);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:247:          {error ? (
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:250:              id={codeErrorId}
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:253:              {error}
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:279:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:285:        {success ? (
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:289:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:291:            {success}
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:46:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:66:      status: "restoring",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:76:    expect(screen.getByRole("status")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:83:      status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:104:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:14:  PortalLoadingState,
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:26:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:32:    if (status !== "anonymous" && status !== "denied") {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:39:  }, [router, safeReturnTo, status]);
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:41:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:43:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:44:        <PortalLoadingState
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:52:  if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:29:  it("renders decorative assets with an empty alternative", () => {
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:45:  it("uses the real TenantProvider fallback branding", () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:21:import { PortalDashboardDataBoundary } from "./portal-dashboard-data-boundary";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:41:  status: "authenticated",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:50:  status: "anonymous",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:67:        status: "CONFIRMADO",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:80:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:84:      {status}|{query.status}|{query.fetchStatus}|{query.data?.perfil.nome ?? ""}
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:96:        retry: false,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:110:function renderBoundary(state: PortalAuthState) {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:113:    <PortalDashboardDataBoundary>
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:119:    </PortalDashboardDataBoundary>,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:152:        "authenticated|success|idle|Maria",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:164:    "converts dashboard access status %s into the safe auth state",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:165:    async (status, expectedAuthStatus) => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:167:        isAxiosError: true,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:168:        response: { status },
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:175:          expectedAuthStatus,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:186:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:198:  it("renders an honest empty state without inventing KPIs", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:207:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:220:  it("renders a safe server error state with retry", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:222:      isAxiosError: true,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:223:      response: { status: 500 },
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:226:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:244:    renderBoundary(ANONYMOUS_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:6:import { normalizePortalResourceError } from "../errors/portal-resource-errors";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:8:  isPortalDashboardEmpty,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:15:  PortalEmptyState,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:16:  PortalErrorState,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:17:  PortalLoadingState,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:18:  PortalOfflineState,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:21:type PortalDashboardDataBoundaryProps = {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:25:export function PortalDashboardDataBoundary({
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:27:}: PortalDashboardDataBoundaryProps) {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:28:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:31:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:33:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:34:        <PortalLoadingState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:42:  if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:53:  if (query.isPending) {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:55:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:56:        <PortalLoadingState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:64:  if (query.isError) {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:65:    const error = normalizePortalResourceError(query.error);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:68:      error.kind === "unauthorized" ||
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:69:      error.kind === "forbidden"
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:81:    if (error.kind === "network") {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:84:          <PortalOfflineState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:100:        <PortalErrorState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:107:          description={error.message}
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:116:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:117:        <PortalLoadingState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:127:  if (isPortalDashboardEmpty(dashboard)) {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:130:        <PortalEmptyState
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:7:import { PortalErrorState, PortalEmptyState } from "../states/portal-state-views";
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:62:      <PortalErrorState
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:84:      <PortalEmptyState
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:29:    throw new TypeError("Data de nascimento fora do formato ISO.");
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:53:    status: value.status,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:99:      data: item.data,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:101:      status: item.status ?? null,
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:1:export const PORTAL_APPOINTMENT_STATUS_VALUES = [
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:10:export type PortalAppointmentStatus =
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:11:  (typeof PORTAL_APPOINTMENT_STATUS_VALUES)[number];
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:41:  status: PortalAppointmentStatus;
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:58:  data: string;
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:60:  status: string | null;
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:4:  PORTAL_APPOINTMENT_STATUS_VALUES,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:39:    status: z.enum(PORTAL_APPOINTMENT_STATUS_VALUES),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:61:    data: dateTimeSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:63:    status: z.string().nullable().optional(),
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:8:  getPortalResourceErrorStatus,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:9:  isPortalResourceAccessError,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:10:  normalizePortalResourceError,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:11:} from "./portal-resource-errors";
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:13:describe("portal resource errors", () => {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:22:    "reutiliza a classificacao segura para status %s",
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:23:    (status, expectedKind) => {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:24:      const result = normalizePortalResourceError({
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:25:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:27:          status,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:33:        status,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:40:      isPortalResourceAccessError({
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:41:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:42:        response: { status: 401 },
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:46:      isPortalResourceAccessError({
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:47:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:48:        response: { status: 403 },
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:52:      isPortalResourceAccessError({
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:53:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:54:        response: { status: 404 },
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:58:      getPortalResourceErrorStatus({
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:59:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:60:        response: { status: 404 },
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:66:    const result = normalizePortalResourceError({
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:67:      isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:69:        status: 401,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:70:        data: {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:2:  normalizePortalAuthError,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:3:  type PortalAuthError,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:4:} from "../auth/portal-auth-errors";
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:6:export type PortalResourceError = PortalAuthError;
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:8:export function normalizePortalResourceError(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:9:  error: unknown,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:10:): PortalResourceError {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:11:  return normalizePortalAuthError(error);
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:14:export function getPortalResourceErrorStatus(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:15:  error: unknown,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:17:  return normalizePortalResourceError(error).status;
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:20:export function isPortalResourceAccessError(
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:21:  error: unknown,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:23:  const status = getPortalResourceErrorStatus(error);
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:25:  return status === 401 || status === 403;
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:18:  status: "anonymous",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:84:  it("renders tenant-aware copy while preserving the real fallback provider", () => {
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
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:174:    api.logout.mockRejectedValue(new Error("resposta interna da API"));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:185:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:23:  const [error, setError] = useState<string | null>(null);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:32:    setError(null);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:41:      setError(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:80:        {error ? (
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:86:            {error}
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:50:  it("protects the operation against double submit and shows success", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:74:        screen.getByRole("status"),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:79:  it("exposes a safe error without leaking the backend response", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:81:      throw new Error("detalhe interno da API");
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.tsx:12:  return <PortalTermsConsent onAccept={onComplete} submitLabel="Concluir primeiro acesso" errorMessage="N├úo foi poss├¡vel concluir o primeiro acesso. Tente novamente." />;
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:72:    status: "authenticated",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:121:      status: "anonymous",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:140:  it("shows a safe error when the profile cannot be loaded", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:141:    meMock.mockRejectedValue(new Error("network"));
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:17:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:23:  const [error, setError] = useState<string | null>(null);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:28:    if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:43:    if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:69:      setError(null);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:92:        setError(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:101:  }, [returnTo, router, status]);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:110:      <p aria-live="polite" className="py-10 text-center text-sm text-muted-foreground" role="status">
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:116:  if (error) {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:119:        {error}
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:11:  PortalLoadingState,
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:77:      role="status"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:79:      <PortalLoadingState
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:103:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:105:  if (status === "anonymous") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:109:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:113:  if (status === "denied") {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:53:  it("persists acceptance once and exposes success feedback", async () => {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:77:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:83:  it("shows a safe error without exposing the backend response", async () => {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:85:      throw new Error("detalhe interno do backend");
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:13:  errorMessage?: string;
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:19:  errorMessage = "N├úo foi poss├¡vel registrar o aceite dos termos. Tente novamente.",
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:27:  const [success, setSuccess] = useState(false);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:28:  const [error, setError] = useState<string | null>(null);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:33:    if (submittingRef.current || success) {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:38:      setError("Aceite os termos de uso para continuar.");
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:44:    setError(null);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:48:      setSuccess(true);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:52:      setError(errorMessage);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:56:  if (success) {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:62:          role="status"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:168:                    setError(null);
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:177:            {error ? (
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:183:                {error}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:15:  PortalAuthBoundary,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:19:import { PortalEmptyState, PortalSuccessState } from "@/features/portal/states/portal-state-views";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:21:import { usePortalQueryGate, usePortalAccessErrorHandler } from "@/features/portal/query/portal-query-gate";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:23:  handlePortalAccessError,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:40:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:45:      {status}:{String(privateQueriesEnabled)}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:50:function PrivateBoundaryProbe() {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:52:    <PortalAuthBoundary
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:53:      anonymousFallback={<p>superficie anonima</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:54:      deniedFallback={<p>superficie indisponivel</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:55:      restoringFallback={<p>restaurando acesso</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:58:    </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:62:function AccessErrorProbe({ status }: { status: number }) {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:63:  const handleAccessError = usePortalAccessErrorHandler();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:66:    handleAccessError(status);
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:67:  }, [handleAccessError, status]);
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:99:          status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:104:        <PrivateBoundaryProbe />
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:133:            status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:138:          <AccessErrorProbe status={401} />
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:154:      <PortalSuccessState
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:164:    expect(source).toContain(portalAssets.states.success.src);
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:182:            status: "anonymous",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:186:          <PortalAuthBoundary
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:187:            anonymousFallback={<p>acesso do cliente futuro</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:190:          </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:206:      handlePortalAccessError(queryClient, 401, (transition) => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:212:      handlePortalAccessError(queryClient, 403, (transition) => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:220:  it("keeps the empty state available for future resource integrations", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:222:      <PortalEmptyState
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:235:    ).toHaveAttribute("data-portal-state", "empty");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:5:  isPortalDashboardEmpty,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:22:        status: "CONFIRMADO",
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:44:          status: "CONFIRMADO",
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:60:    const empty = mapPortalDashboardToViewModel({
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:68:    expect(isPortalDashboardEmpty(empty)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:69:    expect(isPortalDashboardEmpty(mapPortalDashboardToViewModel(dashboard))).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:10:    status: PortalAppointmentSummary["status"];
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:30:    status: value.status,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:51:export function isPortalDashboardEmpty(
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:18:    expect(options.retry).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:19:    expect(options.refetchOnWindowFocus).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:9:  enabled: boolean,
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:16:    retry: false,
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:17:    refetchOnWindowFocus: false,
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:6:import { getPortalResourceErrorStatus } from "../errors/portal-resource-errors";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:8:  usePortalAccessErrorHandler,
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:15:  const handleAccessError = usePortalAccessErrorHandler();
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:19:    if (!query.error) {
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:23:    const status = getPortalResourceErrorStatus(query.error);
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:25:    if (status === null) {
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:29:    handleAccessError(status);
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:30:  }, [handleAccessError, query.error]);
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:27:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:31:      {status}:{String(enabled)}
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:39:      status: "anonymous",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:58:          status: "authenticated",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:74:        initialState={{ status: "anonymous", identity: null }}
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:8:  handlePortalAccessError,
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:15:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:17:  return portalQueryEnabled(status, requiresAuthentication);
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:20:export function usePortalAccessErrorHandler() {
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:25:    (status: number): boolean =>
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:26:      handlePortalAccessError(queryClient, status, (transition) => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:6:  handlePortalAccessError,
beauty-core-ui/src/features/portal/query/portal-query.test.ts:7:  portalAccessTransitionFromStatus,
beauty-core-ui/src/features/portal/query/portal-query.test.ts:60:    expect(portalAccessTransitionFromStatus(401)).toBe("anonymous");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:61:    expect(portalAccessTransitionFromStatus(403)).toBe("denied");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:62:    expect(portalAccessTransitionFromStatus(500)).toBeNull();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:72:    const handled = handlePortalAccessError(
beauty-core-ui/src/features/portal/query/portal-query.test.ts:83:  it("does not intercept unrelated server errors", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:88:      handlePortalAccessError(queryClient, 500, onTransition),
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
beauty-core-ui/src/features/portal/query/portal-query.ts:66:export function handlePortalAccessError(
beauty-core-ui/src/features/portal/query/portal-query.ts:68:  status: number,
beauty-core-ui/src/features/portal/query/portal-query.ts:71:  const transition = portalAccessTransitionFromStatus(status);
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:47:  it("supports a safe internal fallback", () => {
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:65:  fallback = DEFAULT_PORTAL_RETURN_TO,
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:69:    resolveSafePortalPath(fallback) ??
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:62:    status: "CONFIRMADO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:90:      data: profileResponse(),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:111:      data: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:150:            status: "CONFIRMADO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:166:      data: [
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:169:          data: "2026-09-04T14:00:00.000Z",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:172:          status: "CONCLUIDO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:180:          data: "2026-09-03T10:00:00.000Z",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:183:          status: "NAO_LIDA",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:199:        data: "2026-09-04T14:00:00.000Z",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:201:        status: "CONCLUIDO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:205:        data: "2026-09-03T10:00:00.000Z",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:207:        status: "NAO_LIDA",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:216:      data: profileResponse(),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:255:      data: {
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:11:  PortalEmptyState,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:12:  PortalErrorState,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:13:  PortalLoadingState,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:14:  PortalOfflineState,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:15:  PortalSuccessState,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:26:        <PortalLoadingState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:31:        <PortalEmptyState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:36:        <PortalErrorState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:41:        <PortalOfflineState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:46:        <PortalSuccessState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:91:      <PortalErrorState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:108:  it("uses an empty alternative when the illustration is decorative", () => {
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:110:      <PortalEmptyState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:121:      <PortalSuccessState
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:9:  | "loading"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:10:  | "empty"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:11:  | "error"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:12:  | "offline"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:13:  | "success"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:95:export function PortalLoadingState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:99:      asset={portalAssets.states.empty}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:100:      kind="loading"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:105:export function PortalEmptyState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:109:      asset={portalAssets.states.empty}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:110:      kind="empty"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:115:export function PortalErrorState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:119:      asset={portalAssets.states.error}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:120:      kind="error"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:125:export function PortalOfflineState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:129:      asset={portalAssets.states.offline}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:130:      kind="offline"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:135:export function PortalSuccessState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:139:      asset={portalAssets.states.success}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:140:      kind="success"
``

## 4. Componentes visuais encontrados

Quantidade de ocorrências: 118

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:110:    offline: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:111:      src: "/images/portal/states/portal-offline.webp",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:5:  PortalAuthBoundary,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:97:describe("PortalAuthBoundary", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:106:        <PortalAuthBoundary
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:112:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:125:        <PortalAuthBoundary
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:131:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:199:type PortalAuthBoundaryProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:206:export function PortalAuthBoundary({
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:211:}: PortalAuthBoundaryProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:54:      return "O acesso ao Portal do cliente est├í indispon├¡vel.";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:58:      return "Muitas tentativas. Aguarde antes de tentar novamente.";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:143:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:151:        role="alert"
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:160:    mocks.logout.mockRejectedValue(new Error("Servidor indispon├¡vel"));
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:163:      "Servidor indispon├¡vel",
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:97:      screen.getByRole("alert"),
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:188:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:189:        "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.",
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:58:      return "O acesso ao portal est├í indispon├¡vel para esta empresa.";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:62:      return "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:188:              role="alert"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:164:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:262:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:313:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:314:        "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:340:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:341:        "O acesso ao portal est├í indispon├¡vel para esta empresa.",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:64:      return "O acesso ao portal est├í indispon├¡vel para esta empresa.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:68:      return "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:79:      return "O acesso ao portal est├í indispon├¡vel para esta empresa.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:83:      return "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:251:              role="alert"
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:54:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:21:import { PortalDashboardDataBoundary } from "./portal-dashboard-data-boundary";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:96:        retry: false,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:113:    <PortalDashboardDataBoundary>
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:119:    </PortalDashboardDataBoundary>,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:212:          name: "Nenhum atendimento encontrado",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:220:  it("renders a safe server error state with retry", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:237:      screen.getByRole("button", { name: "Tentar novamente" }),
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:248:        name: "Acesso ao Portal indisponivel",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:15:  PortalEmptyState,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:16:  PortalErrorState,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:18:  PortalOfflineState,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:21:type PortalDashboardDataBoundaryProps = {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:25:export function PortalDashboardDataBoundary({
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:27:}: PortalDashboardDataBoundaryProps) {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:44:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:47:          title="Acesso ao Portal indisponivel"
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:72:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:75:            title="Acesso ao Portal indisponivel"
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:83:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:84:          <PortalOfflineState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:86:              label: "Tentar novamente",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:99:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:100:        <PortalErrorState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:102:            label: "Tentar novamente",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:130:        <PortalEmptyState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:132:          title="Nenhum atendimento encontrado"
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:7:import { PortalErrorState, PortalEmptyState } from "../states/portal-state-views";
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:62:      <PortalErrorState
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:64:          label: "Tentar novamente",
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:73:      name: "Tentar novamente",
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:84:      <PortalEmptyState
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:85:        description="Nenhum item disponivel."
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:121:      .getByRole("heading", { name: "Acesso indispon├¡vel" })
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:124:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:187:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:195:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:84:            role="alert"
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:46:      screen.getByRole("alert"),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:91:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:95:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:150:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:118:      <p aria-live="assertive" className="py-10 text-center text-sm text-destructive" role="alert">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:92:      role="alert"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:96:        title="Acesso indispon├¡vel"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:48:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:95:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:100:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:181:                role="alert"
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:15:  PortalAuthBoundary,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:19:import { PortalEmptyState, PortalSuccessState } from "@/features/portal/states/portal-state-views";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:52:    <PortalAuthBoundary
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:54:      deniedFallback={<p>superficie indisponivel</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:58:    </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:186:          <PortalAuthBoundary
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:190:          </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:222:      <PortalEmptyState
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:223:        description="Nenhum resultado disponivel."
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:18:    expect(options.retry).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:16:    retry: false,
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:20:      "javascript:alert(1)",
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:11:  PortalEmptyState,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:12:  PortalErrorState,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:14:  PortalOfflineState,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:31:        <PortalEmptyState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:33:          title="Nenhum item encontrado"
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:36:        <PortalErrorState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:41:        <PortalOfflineState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:43:          title="Conexao indisponivel"
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:53:          title="Acesso indisponivel"
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:63:      screen.getByRole("heading", { name: "Nenhum item encontrado" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:71:      screen.getByRole("heading", { name: "Conexao indisponivel" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:79:      screen.getByRole("heading", { name: "Acesso indisponivel" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:91:      <PortalErrorState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:93:          label: "Tentar novamente",
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:102:      screen.getByRole("button", { name: "Tentar novamente" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:110:      <PortalEmptyState
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:111:        description="Nenhum resultado foi encontrado."
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:12:  | "offline"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:105:export function PortalEmptyState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:115:export function PortalErrorState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:125:export function PortalOfflineState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:129:      asset={portalAssets.states.offline}
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:130:      kind="offline"
``

## 5. Assets disponíveis

Quantidade de assets: 18

- `public\images\portal\appointments\portal-appointments.webp`
- `public\images\portal\appointments\source\portal-appointments-source.png`
- `public\images\portal\benefits\portal-benefits.webp`
- `public\images\portal\benefits\source\portal-benefits-source.png`
- `public\images\portal\loyalty\portal-loyalty.webp`
- `public\images\portal\loyalty\source\portal-loyalty-source.png`
- `public\images\portal\packages\portal-packages.webp`
- `public\images\portal\packages\source\portal-packages-source.png`
- `public\images\portal\placeholders\portal-placeholder.webp`
- `public\images\portal\placeholders\source\portal-placeholder-source.png`
- `public\images\portal\states\portal-empty-state.webp`
- `public\images\portal\states\portal-error-state.webp`
- `public\images\portal\states\portal-offline.webp`
- `public\images\portal\states\portal-success.webp`
- `public\images\portal\states\source\portal-empty-state-source.png`
- `public\images\portal\states\source\portal-error-state-source.png`
- `public\images\portal\states\source\portal-offline-source.png`
- `public\images\portal\states\source\portal-success-source.png`

Assets somente poderão ser reutilizados quando semanticamente compatíveis com o domínio. Nenhum asset será reprocessado neste Chat.

## 6. Testes existentes

Quantidade de testes: 102

- `src\app\portal\portal-private-routing.test.tsx`
- `src\app\portal\portal-routing.test.tsx`
- `src\components\forms\form-foundation.test.tsx`
- `src\components\layout\admin-shell-boundary.test.tsx`
- `src\components\layout\admin-sidebar.test.tsx`
- `src\components\layout\page-header.test.tsx`
- `src\components\states\feedback-states.test.tsx`
- `src\components\ui\status-badge.test.tsx`
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
- `src\features\arquivos\components\arquivo-remove-dialog.test.tsx`
- `src\features\arquivos\components\arquivos-actions.test.tsx`
- `src\features\arquivos\components\arquivos-filters.test.tsx`
- `src\features\arquivos\components\arquivos-list.test.tsx`
- `src\features\arquivos\components\arquivos-view.integration.test.tsx`
- `src\features\arquivos\components\arquivo-upload-dialog.test.tsx`
- `src\features\auth\components\admin-login-boundary.test.tsx`
- `src\features\clientes\components\cliente-form-dialog.integration.test.tsx`
- `src\features\clientes\components\cliente-lgpd-actions.integration.test.tsx`
- `src\features\clientes\components\cliente-profile-extras.integration.test.tsx`
- `src\features\clientes\components\cliente-profile-view.integration.test.tsx`
- `src\features\clientes\components\clientes-view.integration.test.tsx`
- `src\features\configuracoes\components\branding-capabilities-card.test.tsx`
- `src\features\configuracoes\components\branding-logo-upload-card.test.tsx`
- `src\features\configuracoes\components\branding-preview-a11y.test.tsx`
- `src\features\configuracoes\components\branding-preview-card.test.tsx`
- `src\features\configuracoes\components\configuracoes-gerais-card.test.tsx`
- `src\features\configuracoes\components\configuracoes-navigation-card.test.tsx`
- `src\features\configuracoes\components\configuracoes-readonly-notice.test.tsx`
- `src\features\dashboard\components\clients-overview.test.tsx`
- `src\features\dashboard\components\dashboard-accessibility.test.tsx`
- `src\features\dashboard\components\dashboard-filters.test.tsx`
- `src\features\dashboard\components\dashboard-kpi-grid.test.tsx`
- `src\features\dashboard\components\dashboard-section-states.test.tsx`
- `src\features\dashboard\components\dashboard-summary-states.test.tsx`
- `src\features\dashboard\components\dashboard-view.integration.test.tsx`
- `src\features\dashboard\components\engagement-overview.test.tsx`
- `src\features\dashboard\components\rankings-overview.test.tsx`
- `src\features\fidelidade\components\fidelidade-operacional-view.test.tsx`
- `src\features\fidelidade\components\fidelidade-programa-view.test.tsx`
- `src\features\financeiro\components\cancelar-movimentacao-dialog.test.tsx`
- `src\features\financeiro\components\categoria-financeira-form.test.tsx`
- `src\features\financeiro\components\comissao-form.test.tsx`
- `src\features\financeiro\components\comissoes-list.test.tsx`
- `src\features\financeiro\components\financeiro-operacional-cards.test.tsx`
- `src\features\financeiro\components\financeiro-view.test.tsx`
- `src\features\financeiro\components\movimentacao-financeira-form.test.tsx`
- `src\features\financeiro\components\movimentacoes-financeiras-filters.test.tsx`
- `src\features\financeiro\components\movimentacoes-financeiras-list.test.tsx`
- `src\features\financeiro\components\pagamento-movimentacao-form.test.tsx`
- `src\features\notificacoes\components\notificacoes-list.test.tsx`
- `src\features\portal\assets\portal-assets.test.ts`
- `src\features\portal\auth\portal-auth-api.test.ts`
- `src\features\portal\auth\portal-auth-cache.test.ts`
- `src\features\portal\auth\portal-auth-context.test.tsx`
- `src\features\portal\auth\portal-auth-context-session.test.tsx`
- `src\features\portal\auth\portal-auth-errors.test.ts`
- `src\features\portal\auth\portal-auth-route-orchestrator.test.tsx`
- `src\features\portal\auth\portal-auth-routing.test.ts`
- `src\features\portal\auth\portal-auth-session.test.ts`
- `src\features\portal\auth\portal-otp-request.test.tsx`
- `src\features\portal\auth\portal-otp-verification.test.tsx`
- `src\features\portal\auth\portal-private-route.test.tsx`
- `src\features\portal\components\portal-asset-image.test.tsx`
- `src\features\portal\components\portal-branding.test.tsx`
- `src\features\portal\components\portal-dashboard-data-boundary.test.tsx`
- `src\features\portal\components\portal-navigation.test.tsx`
- `src\features\portal\components\portal-page-container.test.tsx`
- `src\features\portal\components\portal-responsive-a11y.test.tsx`
- `src\features\portal\components\portal-shell.test.tsx`
- `src\features\portal\errors\portal-resource-errors.test.ts`
- `src\features\portal\navigation\portal-navigation.test.ts`
- `src\features\portal\pages\portal-authenticated-surface.test.tsx`
- `src\features\portal\pages\portal-auth-ux.test.tsx`
- `src\features\portal\pages\portal-first-access-experience.test.tsx`
- `src\features\portal\pages\portal-first-access-page.test.tsx`
- `src\features\portal\pages\portal-terms-consent.test.tsx`
- `src\features\portal\portal-foundation.integration.test.tsx`
- `src\features\portal\query\portal-client-query-keys.test.ts`
- `src\features\portal\query\portal-dashboard-data.test.ts`
- `src\features\portal\query\portal-dashboard-query-options.test.ts`
- `src\features\portal\query\portal-query.test.ts`
- `src\features\portal\query\portal-query-gate.test.tsx`
- `src\features\portal\security\portal-safe-return-to.test.ts`
- `src\features\portal\services\portal-client-api.test.ts`
- `src\features\portal\states\portal-state-views.test.tsx`
- `src\features\profissionais\components\profissionais-view.integration.test.tsx`
- `src\features\profissionais\components\profissional-form-dialog.integration.test.tsx`
- `src\features\usuarios\components\usuario-form-dialog.integration.test.tsx`
- `src\features\usuarios\components\usuarios-view.integration.test.tsx`
- `src\features\whatsapp\components\campanhas-whatsapp-list.test.tsx`
- `src\features\whatsapp\components\mensagens-whatsapp-list.test.tsx`
- `src\features\whatsapp\components\templates-whatsapp-list.test.tsx`

## 7. Contrato visual obrigatório

| Estado | Comportamento obrigatório |
|---|---|
| Loading | Não mostrar conteúdo privado incompleto |
| Error | Mensagem compreensível, sem stack trace ou dados sensíveis |
| Empty | Explicar ausência de dados e oferecer ação contextual quando permitido |
| Offline | Informar indisponibilidade sem apagar dados válidos indevidamente |
| Denied | Bloquear conteúdo e ação privada |
| Success | Renderizar dados normalizados e acessíveis |
| Retry | Evitar loops automáticos e chamadas duplicadas |
| Mutation pending | Impedir duplo envio e indicar progresso |

## 8. Regras de UX e acessibilidade

- Estados devem possuir hierarquia semântica correta.
- Mensagens não podem depender somente de cor.
- Foco deve ser preservado após erro, retry ou mudança de conteúdo.
- Botões de retry devem possuir nome acessível.
- Skeletons não devem anunciar conteúdo inexistente como dado real.
- Layouts devem funcionar em viewport mobile.
- Toasts não podem ser o único meio de comunicar falhas críticas.

## 9. Restrições

- Nenhum componente funcional de domínio criado.
- Nenhum endpoint criado.
- Nenhuma alteração no backend.
- Nenhum asset novo gerado.
- Nenhum bypass de autenticação.
- Nenhuma funcionalidade dos Chats 63 e 64 antecipada.
- Nenhum commit, push, tag ou deploy executado.

## 10. Próximo bloco

O BLOCO 07/15 deverá validar a estrutura visual, tokens, assets, responsividade e acessibilidade necessários para as novas superfícies do Portal Cliente.
