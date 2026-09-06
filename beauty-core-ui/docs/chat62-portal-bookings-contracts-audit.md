# Beauty Core 1.0 — Chat 62
## BLOCO 02/15 — Auditoria de Contratos e Superfícies Existentes

- Data: 2026-09-05 23:05:31 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Mapear os contratos, schemas, adapters, serviços, query options, query keys, autenticação e superfícies HTTP já existentes antes de implementar funcionalidades do Portal Cliente.

Este bloco não implementa agendamentos, fidelidade, benefícios ou pacotes.

## 2. Regra de decisão

Nenhum contrato será inventado neste bloco.

Cada funcionalidade do Chat 62 deverá ser classificada como:

- suportada por contrato existente;
- parcialmente suportada;
- não suportada no frontend;
- dependente de backend, permanecendo fora desta implementação.

## 3. Arquivos candidatos

- `src\features\portal\auth\portal-auth.ts`
- `src\features\portal\auth\portal-auth-api.test.ts`
- `src\features\portal\auth\portal-auth-api.ts`
- `src\features\portal\auth\portal-auth-cache.test.ts`
- `src\features\portal\auth\portal-auth-cache.ts`
- `src\features\portal\auth\portal-auth-context.test.tsx`
- `src\features\portal\auth\portal-auth-context.tsx`
- `src\features\portal\auth\portal-auth-context-session.test.tsx`
- `src\features\portal\auth\portal-auth-contracts.ts`
- `src\features\portal\auth\portal-auth-errors.test.ts`
- `src\features\portal\auth\portal-auth-errors.ts`
- `src\features\portal\auth\portal-auth-route-orchestrator.test.tsx`
- `src\features\portal\auth\portal-auth-route-orchestrator.tsx`
- `src\features\portal\auth\portal-auth-routing.test.ts`
- `src\features\portal\auth\portal-auth-routing.ts`
- `src\features\portal\auth\portal-auth-session.test.ts`
- `src\features\portal\auth\portal-auth-session.ts`
- `src\features\portal\auth\portal-otp-request.test.tsx`
- `src\features\portal\auth\portal-otp-request.tsx`
- `src\features\portal\auth\portal-otp-verification.test.tsx`
- `src\features\portal\auth\portal-otp-verification.tsx`
- `src\features\portal\auth\portal-private-route.test.tsx`
- `src\features\portal\auth\portal-private-route.tsx`
- `src\features\portal\contracts\portal-client-adapters.ts`
- `src\features\portal\contracts\portal-client-contracts.ts`
- `src\features\portal\contracts\portal-client-schemas.ts`
- `src\features\portal\pages\portal-authenticated-surface.test.tsx`
- `src\features\portal\pages\portal-authenticated-surface.tsx`
- `src\features\portal\pages\portal-auth-ux.test.tsx`
- `src\features\portal\query\portal-client-query-keys.test.ts`
- `src\features\portal\query\portal-client-query-keys.ts`
- `src\features\portal\query\portal-dashboard-data.test.ts`
- `src\features\portal\query\portal-dashboard-data.ts`
- `src\features\portal\query\portal-dashboard-query.ts`
- `src\features\portal\query\portal-dashboard-query-options.test.ts`
- `src\features\portal\query\portal-dashboard-query-options.ts`
- `src\features\portal\query\portal-query.test.ts`
- `src\features\portal\query\portal-query.ts`
- `src\features\portal\query\portal-query-gate.test.tsx`
- `src\features\portal\query\portal-query-gate.ts`
- `src\features\portal\services\portal-client-api.test.ts`
- `src\features\portal\services\portal-client-api.ts`
- `src\services\api\api.types.ts`
- `src\services\api\api-client.ts`
- `src\services\api\normalize-api-error.ts`
- `src\services\auth\access-events.test.ts`
- `src\services\auth\access-events.ts`
- `src\services\auth\refresh-coordinator.ts`
- `src\services\auth\token-storage.ts`
- `src\stores\auth-store.test.ts`
- `src\stores\auth-store.ts`

## 4. Superfícies encontradas

``text
beauty-core-ui/src/app/portal/historico/page.tsx:1:import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
beauty-core-ui/src/app/portal/layout.tsx:3:import { PortalAuthProvider } from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/app/portal/layout.tsx:4:import { PortalShell } from "@/features/portal/components/portal-shell";
beauty-core-ui/src/app/portal/layout.tsx:15:      <PortalShell>{children}</PortalShell>
beauty-core-ui/src/app/portal/layout.tsx:16:    </PortalAuthProvider>
beauty-core-ui/src/app/portal/page.tsx:1:import { PortalOtpRequestPage } from "@/features/portal/pages/portal-otp-request-page";
beauty-core-ui/src/app/portal/perfil/page.tsx:1:import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:5:vi.mock("@/features/portal/auth/portal-private-route", () => ({
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:13:import { portalNavigationItems } from "@/features/portal/navigation/portal-navigation-config";
beauty-core-ui/src/app/portal/portal-routing.test.tsx:9:} from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/app/portal/portal-routing.test.tsx:19:  it("renders the OTP request route inside the anonymous Portal auth state", () => {
beauty-core-ui/src/app/portal/portal-routing.test.tsx:29:        </PortalAuthProvider>
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:3:import { PortalFirstAccessPage } from "@/features/portal/pages/portal-first-access-page";
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:3:import { portalAssets } from "./portal-assets";
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:34:      expect(asset.src).toMatch(/^\/images\/portal\//);
beauty-core-ui/src/features/portal/assets/portal-assets.ts:1:export type PortalAssetDefinition = {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:6:  appointments: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:8:      src: "/images/portal/appointments/portal-appointments.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:13:      src: "/images/portal/auth/portal-access-unavailable.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:16:      src: "/images/portal/auth/portal-first-access.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:19:      src: "/images/portal/auth/portal-otp-illustration.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:24:      src: "/images/portal/backgrounds/portal-background.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:27:  benefits: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:34:      src: "/images/portal/dashboard/portal-dashboard.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:39:      src: "/images/portal/hero/portal-hero.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:44:      src: "/images/portal/history/portal-history.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:49:      src: "/images/portal/identity/portal-key-visual.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:54:      src: "/images/portal/legal/portal-privacy.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:57:      src: "/images/portal/legal/portal-terms.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:60:  loyalty: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:62:      src: "/images/portal/loyalty/portal-loyalty.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:67:      src: "/images/portal/messages/portal-messages.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:72:      src: "/images/portal/notifications/portal-notifications.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:77:      src: "/images/portal/onboarding/portal-onboarding.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:80:  packages: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:82:      src: "/images/portal/packages/portal-packages.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:87:      src: "/images/portal/placeholders/portal-placeholder.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:92:      src: "/images/portal/profile/portal-profile.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:97:      src: "/images/portal/pwa/portal-app-icon.png",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:100:      src: "/images/portal/pwa/portal-pwa-splash.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:105:      src: "/images/portal/states/portal-empty-state.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:108:      src: "/images/portal/states/portal-error-state.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:111:      src: "/images/portal/states/portal-offline.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:114:      src: "/images/portal/states/portal-success.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:119:export type PortalAssetKey = keyof typeof portalAssets;
beauty-core-ui/src/features/portal/assets/portal-assets.ts:121:export type PortalAsset =
beauty-core-ui/src/features/portal/assets/portal-assets.ts:122:  | (typeof portalAssets)["appointments"]["illustration"]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:125:  | (typeof portalAssets)["benefits"]["illustration"]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:131:  | (typeof portalAssets)["loyalty"]["illustration"]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:135:  | (typeof portalAssets)["packages"]["illustration"]
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:20:} from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:23:  portalAuthQueryKeys,
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:24:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:31:  it("solicita OTP pela rota p├║blica tenant-aware sem enviar empresaId", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:36:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:62:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:72:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:82:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:160:  it("consulta me e aceita termos pelos endpoints privados reais", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:167:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:179:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:202:  it("mant├®m a chave de auth sem empresaId arbitr├írio", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:203:    expect(portalAuthQueryKeys.me()).toEqual([
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:210:      JSON.stringify(portalAuthQueryKeys.me()),
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:211:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:18:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:4:import { clearPortalPrivateQueries } from "./portal-auth-cache";
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:11:    queryClient.setQueryData(["portal", "agendamentos"], [{ id: "agenda-1" }]);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:20:      queryClient.getQueryData(["portal", "agendamentos"]),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:5:    predicate: ({ queryKey }) => queryKey[0] === "portal",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:16:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:26:} from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:33:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:34:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:35:  sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:46:          ? `${auth.identity.clienteId}|${auth.identity.empresaId}|${auth.identity.sid}`
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:76:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:100:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:127:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:149:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:166:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:8:} from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:9:import type { PortalAuthState } from "./portal-auth";
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:16:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:17:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:18:  sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:32:          ? `${auth.identity.clienteId}|${auth.identity.empresaId}|${auth.identity.sid}`
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:62:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:74:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:112:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:113:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:131:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:132:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:16:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:19:} from "./portal-auth-errors";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:25:} from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:32:} from "./portal-auth";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:34:export type PortalAuthContextValue = PortalAuthState & {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:183:    </PortalAuthContext.Provider>
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:1:export type PortalTenantSummary = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:2:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:9:export type PortalOtpRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:14:export type PortalOtpRequestResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:20:export type PortalVerifyOtpRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:26:export type PortalClientSummary = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:31:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:36:export type PortalVerifyOtpResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:44:export type PortalRefreshTokenRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:48:export type PortalRefreshTokenResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:53:export type PortalLogoutRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:57:export type PortalLogoutResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:61:export type PortalMeResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:66:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:72:export type PortalTermsAcceptanceRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:76:export type PortalTermsAcceptanceResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:80:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:85:export const portalAuthQueryKeys = {
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:88:  me: () => [...portalAuthQueryKeys.all, "me"] as const,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:5:} from "./portal-auth-errors";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:19:        isAxiosError: true,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:36:      isAxiosError: true,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:50:      isAxiosError: true,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:55:          clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:1:import { isAxiosError } from "axios";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:3:export type PortalAuthErrorKind =
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:13:export type PortalAuthError = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:71:  if (!isAxiosError(error)) {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:9:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:10:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:11:import { PortalAuthRouteOrchestrator } from "./portal-auth-route-orchestrator";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:12:import { hasPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:15:  currentPath: "/portal",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:28:vi.mock("./portal-auth-context", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:32:vi.mock("./portal-auth-api", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:38:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:52:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:70:    </PortalAuthRouteOrchestrator>,
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:79:  navigation.currentPath = "/portal";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:89:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:90:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:91:      sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:102:        "/portal/primeiro-acesso?returnTo=%2Fportal",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:111:  it("keeps a normal client outside the first-access route", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:112:    navigation.currentPath = "/portal/primeiro-acesso";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:119:        "/portal/historico",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:132:        "/portal/primeiro-acesso?returnTo=%2Fportal",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:12:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:13:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:14:import { hasPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:17:} from "./portal-auth-routing";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:54:    </PortalAuthenticatedRouteController>
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:8:} from "./portal-auth-routing";
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:13:      getPortalFirstAccessHref("/portal/historico"),
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:15:      "/portal/primeiro-acesso?returnTo=%2Fportal%2Fhistorico",
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:23:      "/portal/primeiro-acesso?returnTo=%2Fportal",
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:30:        currentPath: "/portal",
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:32:        returnTo: "/portal/historico",
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:35:      "/portal/primeiro-acesso?returnTo=%2Fportal%2Fhistorico",
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:44:        returnTo: "/portal/historico",
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:46:    ).toBe("/portal/historico");
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:52:        currentPath: "/portal",
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:54:        returnTo: "/portal/perfil",
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:56:    ).toBe("/portal/perfil");
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:62:        currentPath: "/portal",
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:72:    ).toBe("/portal");
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:3:} from "@/features/portal/security/portal-safe-return-to";
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:6:  "/portal/primeiro-acesso";
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:14:    ? "/portal"
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:50:  if (currentPath === "/portal") {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:53:    return safeReturnTo === "/portal" ? null : safeReturnTo;
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:5:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:27:vi.mock("./portal-auth-api", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:43:} from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:55:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:56:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:57:  sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:64:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:65:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:66:  sid: "sessao-renovada",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:76:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:86:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:107:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:108:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:109:      sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:132:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:146:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:147:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:148:      sid: "sessao-renovada",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:1:import { isAxiosError } from "axios";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:5:import type { PortalClientIdentity } from "./portal-auth";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:8:} from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:14:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:18:  clienteId?: unknown;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:19:  empresaId?: unknown;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:20:  sid?: unknown;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:103:  clienteId: string,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:104:  empresaId: string,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:108:  const tokenClienteId = getRequiredString(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:109:    claims.clienteId ?? claims.sub,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:110:    "clienteId",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:113:  const tokenEmpresaId = getRequiredString(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:114:    claims.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:115:    "empresaId",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:118:  const sid = getRequiredString(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:119:    claims.sid,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:120:    "sid",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:123:  if (tokenClienteId !== clienteId) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:129:  if (tokenEmpresaId !== empresaId) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:136:    clienteId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:137:    empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:138:    sid,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:186:    isAxiosError(error) &&
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:194:    isAxiosError(error) &&
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:212:    response.cliente.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:274:      profile.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth.ts:9:export type PortalAuthStatus = (typeof PORTAL_AUTH_STATUSES)[number];
beauty-core-ui/src/features/portal/auth/portal-auth.ts:11:export type PortalClientIdentity = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth.ts:12:  clienteId: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:13:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:14:  sid: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:17:export type PortalAuthState = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth.ts:27:export type PortalAuthAction =
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:20:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:25:} from "./portal-otp-request";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:27:vi.mock("./portal-auth-api", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:46:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:126:      "empresaId",
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:10:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:20:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:21:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:26:} from "./portal-otp-verification";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:27:import { startPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:29:vi.mock("./portal-auth-api", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:36:vi.mock("./portal-auth-context", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:40:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:63:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:73:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:81:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:122:    clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:123:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:124:    sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:268:  it("resends through the public tenant-aware endpoint without cooldown invention", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:10:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:11:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:12:import { startPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:11:  currentPath: "/portal/perfil",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:21:vi.mock("./portal-auth-context", () => ({
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:25:vi.mock("./portal-auth-route-orchestrator", () => ({
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:31:import { PortalPrivateRoute } from "./portal-private-route";
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:38:  mocks.currentPath = "/portal/perfil";
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:53:      </PortalPrivateRoute>,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:59:        "/portal?returnTo=%2Fportal%2Fperfil",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:73:      </PortalPrivateRoute>,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:85:        clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:86:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:87:        sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:94:      </PortalPrivateRoute>,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:101:  it("keeps an administrative path outside the Portal returnTo namespace", async () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:111:      </PortalPrivateRoute>,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:116:        "/portal?returnTo=%2Fportal",
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:9:} from "./portal-auth-route-orchestrator";
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:10:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:11:import { sanitizePortalReturnTo } from "../security/portal-safe-return-to";
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:15:} from "../states/portal-state-views";
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:21:const PRIVATE_ROUTE_RETURN_PREFIX = "/portal?returnTo=";
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:27:  const pathname = usePathname() ?? "/portal";
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:66:    </PortalAuthRouteOrchestrator>
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:4:import { portalAssets } from "../assets/portal-assets";
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:6:import { PortalAssetImage } from "./portal-asset-image";
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:25:      "/images/portal/identity/portal-key-visual.webp",
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:3:import type { PortalAssetDefinition } from "../assets/portal-assets";
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:19:import { PortalBranding } from "./portal-branding";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:15:import type { PortalAuthState } from "../auth/portal-auth";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:19:} from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:20:import type { PortalDashboard } from "../contracts/portal-client-contracts";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:21:import { PortalDashboardDataBoundary } from "./portal-dashboard-data-boundary";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:22:import { usePortalDashboardQuery } from "../query/portal-dashboard-query";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:28:vi.mock("../services/portal-client-api", () => ({
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:43:    clienteId: "cliente-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:44:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:45:    sid: "sessao-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:62:  agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:105:      </PortalAuthProvider>
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:119:    </PortalDashboardDataBoundary>,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:167:        isAxiosError: true,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:201:      agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:217:    expect(screen.queryByText(/pontos|saldo|total/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:222:      isAxiosError: true,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:5:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:6:import { normalizePortalResourceError } from "../errors/portal-resource-errors";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:11:} from "../query/portal-dashboard-data";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:12:import { usePortalDashboardQuery } from "../query/portal-dashboard-query";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:19:} from "../states/portal-state-views";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:13:import { PortalNavigation } from "./portal-navigation";
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:21:    render(<PortalNavigation activePath="/portal/perfil" />);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:50:        activePath="/portal/historico"
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:52:          { href: "/portal", label: "Inicio" },
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:53:          { href: "/portal/historico", label: "Historico" },
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:6:import { portalNavigationItems } from "../navigation/portal-navigation-config";
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:11:} from "../navigation/portal-navigation";
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:25:  const resolvedActivePath = activePath ?? pathname ?? "/portal";
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:4:import { PortalPageContainer } from "./portal-page-container";
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:7:  it("renders children inside the shared Card primitive", () => {
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:11:      </PortalPageContainer>,
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:6:import { PortalShell } from "./portal-shell";
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:7:import { PortalErrorState, PortalEmptyState } from "../states/portal-state-views";
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:19:        </PortalShell>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:44:        </PortalShell>
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:16:import { PortalShell } from "./portal-shell";
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:28:        </PortalShell>
beauty-core-ui/src/features/portal/components/portal-shell.tsx:6:import { PortalBranding } from "./portal-branding";
beauty-core-ui/src/features/portal/components/portal-shell.tsx:7:import { PortalNavigation } from "./portal-navigation";
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:2:  PortalAppointmentSummary,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:8:} from "./portal-client-contracts";
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:14:  type PortalAppointmentTransport,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:17:} from "./portal-client-schemas";
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:47:function toPortalAppointmentSummary(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:48:  value: PortalAppointmentTransport,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:49:): PortalAppointmentSummary {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:77:    agendamentos: {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:78:      proximos: parsed.agendamentos.proximos.map(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:79:        toPortalAppointmentSummary,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:81:      ultimo: parsed.agendamentos.ultimo
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:82:        ? toPortalAppointmentSummary(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:83:            parsed.agendamentos.ultimo,
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:1:export const PORTAL_APPOINTMENT_STATUS_VALUES = [
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:10:export type PortalAppointmentStatus =
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:11:  (typeof PORTAL_APPOINTMENT_STATUS_VALUES)[number];
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:14:  "AGENDAMENTO",
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:16:  "PACOTE",
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:21:export type PortalHistoryType =
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:24:export type PortalProfile = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:32:export type PortalProfileUpdateInput = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:38:export type PortalAppointmentSummary = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:41:  status: PortalAppointmentStatus;
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:48:export type PortalDashboard = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:50:  agendamentos: Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:51:    proximos: readonly PortalAppointmentSummary[];
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:52:    ultimo: PortalAppointmentSummary | null;
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:56:export type PortalHistoryItem = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:63:export type PortalHistory = readonly PortalHistoryItem[];
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:4:  PORTAL_APPOINTMENT_STATUS_VALUES,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:6:} from "./portal-client-contracts";
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:35:export const portalAppointmentTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:39:    status: z.enum(PORTAL_APPOINTMENT_STATUS_VALUES),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:49:    agendamentos: z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:51:        proximos: z.array(portalAppointmentTransportSchema),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:52:        ultimo: portalAppointmentTransportSchema.nullable(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:69:export const portalHistoryTransportSchema = z.array(
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:93:export type PortalProfileTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:97:export type PortalAppointmentTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:98:  typeof portalAppointmentTransportSchema
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:101:export type PortalDashboardTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:105:export type PortalHistoryItemTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:109:export type PortalProfileUpdateInputParsed = z.infer<
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:11:} from "./portal-resource-errors";
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:25:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:41:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:47:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:53:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:59:        isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:67:      isAxiosError: true,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:71:          clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:4:} from "../auth/portal-auth-errors";
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:6:export type PortalResourceError = PortalAuthError;
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:1:import type { PortalNavigationItem } from "./portal-navigation";
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:4:  { href: "/portal", label: "Inicio" },
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:5:  { href: "/portal/perfil", label: "Perfil" },
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:6:  { href: "/portal/historico", label: "Historico" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:7:import { portalNavigationItems } from "./portal-navigation-config";
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:11:} from "./portal-navigation";
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:14:  it("accepts only routes inside the Portal namespace", () => {
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:15:    expect(isSafePortalHref("/portal")).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:16:    expect(isSafePortalHref("/portal/historico")).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:24:      { href: "/portal", label: "Inicio" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:25:      { href: "/portal/perfil", label: "Perfil" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:26:      { href: "/portal/historico", label: "Historico" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:33:    expect(isPortalNavigationItemActive("/portal", "/portal")).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:34:    expect(isPortalNavigationItemActive("/portal", "/portal/historico"))
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:38:        "/portal/historico",
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:39:        "/portal/historico/detalhes",
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:1:export type PortalNavigationItem = {
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:8:  return href === "/portal" || href.startsWith("/portal/");
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:15:  if (href === "/portal") {
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:16:    return activePath === "/portal";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:6:import type { PortalAuthState } from "@/features/portal/auth/portal-auth";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:7:import { PortalAuthProvider } from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:8:import { portalAssets } from "@/features/portal/assets/portal-assets";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:9:import { PortalShell } from "@/features/portal/components/portal-shell";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:10:import { PortalOtpRequestPage } from "@/features/portal/pages/portal-otp-request-page";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:31:        </PortalShell>
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:32:      </PortalAuthProvider>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:15:} from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:16:import { PortalAuthenticatedSurface } from "./portal-authenticated-surface";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:31:vi.mock("../auth/portal-auth-api", () => ({
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:35:vi.mock("../auth/portal-auth-session", async (importOriginal) => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:37:    await importOriginal<typeof import("../auth/portal-auth-session")>();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:64:                clienteId: "cliente-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:65:                empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:66:                sid: "sessao-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:72:          </PortalAuthProvider>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:115:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:138:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:169:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:186:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:5:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:7:import { portalAuthApi } from "../auth/portal-auth-api";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:8:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:9:import { clearPortalPrivateQueries } from "../auth/portal-auth-cache";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:10:import { PortalBranding } from "../components/portal-branding";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:11:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:17:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:49:      router.replace("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:114:    </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:6:import { PortalFirstAccessExperience } from "./portal-first-access-experience";
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.tsx:3:import { PortalTermsConsent } from "./portal-terms-consent";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:9:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:10:import { portalAuthApi } from "../auth/portal-auth-api";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:11:import { PORTAL_FIRST_ACCESS_PATH } from "../auth/portal-auth-routing";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:14:import { PortalFirstAccessPage } from "./portal-first-access-page";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:17:  currentPath: "/portal/primeiro-acesso",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:30:vi.mock("../auth/portal-auth-context", () => ({
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:34:vi.mock("../auth/portal-auth-api", () => ({
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:50:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:74:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:75:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:76:      sid: "sessao-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:114:        "/portal/historico",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:133:        "/portal?returnTo=%2Fportal%2Fprimeiro-acesso",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:6:import { portalAuthApi } from "../auth/portal-auth-api";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:7:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:11:} from "../auth/portal-auth-routing";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:12:import { PortalFirstAccessExperience } from "./portal-first-access-experience";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:54:        `/portal?returnTo=${encodeURIComponent(PORTAL_FIRST_ACCESS_PATH)}`,
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:1:import { portalAssets } from "../assets/portal-assets";
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:2:import { PortalAssetImage } from "../components/portal-asset-image";
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:3:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:40:    </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:4:import { PortalOtpRequestForm as OtpRequestComponent } from "@/features/portal/auth/portal-otp-request";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:5:import { usePortalAuth } from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:6:import { PortalAuthRouteOrchestrator } from "@/features/portal/auth/portal-auth-route-orchestrator";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:7:import { PortalAssetImage } from "@/features/portal/components/portal-asset-image";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:8:import { portalAssets } from "@/features/portal/assets/portal-assets";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:12:} from "@/features/portal/states/portal-state-views";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:13:import { PortalAuthenticatedSurface } from "@/features/portal/pages/portal-authenticated-surface";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:52:        <aside
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:66:        </aside>
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:120:    </PortalAuthRouteOrchestrator>
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:5:import { PortalPrivateRoute } from "@/features/portal/auth/portal-private-route";
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:6:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:41:      </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:42:    </PortalPrivateRoute>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:6:import { PortalTermsConsent } from "./portal-terms-consent";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:29:      "/images/portal/legal/portal-terms.webp",
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:5:import { portalAssets } from "../assets/portal-assets";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:6:import { PortalAssetImage } from "../components/portal-asset-image";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:7:import { PortalBranding } from "../components/portal-branding";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:8:import { PortalPageContainer } from "../components/portal-page-container";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:89:      </PortalPageContainer>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:198:    </PortalPageContainer>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:11:import PortalLayout from "@/app/portal/layout";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:12:import PortalPage from "@/app/portal/page";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:18:} from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:19:import { PortalEmptyState, PortalSuccessState } from "@/features/portal/states/portal-state-views";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:20:import { portalAssets } from "@/features/portal/assets/portal-assets";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:21:import { usePortalQueryGate, usePortalAccessErrorHandler } from "@/features/portal/query/portal-query-gate";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:24:  portalQueryKeys,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:25:} from "@/features/portal/query/portal-query";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:27:import { sanitizePortalReturnTo } from "@/features/portal/security/portal-safe-return-to";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:34:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:35:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:36:  sid: "sessao-real",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:58:    </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:78:        </PortalLayout>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:105:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:123:    const privateKey = portalQueryKeys.privateResource("profile");
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:139:        </PortalAuthProvider>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:167:  it("keeps returnTo inside the Portal namespace", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:169:      sanitizePortalReturnTo("/portal/historico"),
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:170:    ).toBe("/portal/historico");
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:174:    ).toBe("/portal");
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:190:          </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:191:        </PortalAuthProvider>
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:8:  portalClientQueryKeys,
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:9:} from "./portal-client-query-keys";
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:11:describe("portalClientQueryKeys", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:13:    expect(portalClientQueryKeys.all()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:17:    expect(portalClientQueryKeys.dashboard()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:22:    expect(portalClientQueryKeys.profile()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:27:    expect(portalClientQueryKeys.history()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:36:      portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:37:      portalClientQueryKeys.profile(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:38:      portalClientQueryKeys.history(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:41:    expect(serialized).not.toContain("clienteId");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:42:    expect(serialized).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:43:    expect(serialized).not.toContain("sid");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:48:      portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:49:    ).not.toEqual(portalClientQueryKeys.profile());
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:51:      portalClientQueryKeys.profile(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:52:    ).not.toEqual(portalClientQueryKeys.history());
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:1:import { portalQueryKeys } from "./portal-query";
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:3:export const portalClientQueryKeys = {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:4:  all: () => portalQueryKeys.private(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:6:    portalQueryKeys.privateResource("dashboard"),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:8:    portalQueryKeys.privateResource("profile"),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts:10:    portalQueryKeys.privateResource("history"),
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:3:import type { PortalDashboard } from "../contracts/portal-client-contracts";
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:7:} from "./portal-dashboard-data";
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:17:  agendamentos: {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:54:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:62:      agendamentos: {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:2:  PortalAppointmentSummary,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:4:} from "../contracts/portal-client-contracts";
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:6:export type PortalDashboardAppointmentViewModel =
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:10:    status: PortalAppointmentSummary["status"];
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:17:export type PortalDashboardViewModel = Readonly<{
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:20:  proximos: readonly PortalDashboardAppointmentViewModel[];
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:21:  ultimo: PortalDashboardAppointmentViewModel | null;
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:24:function mapAppointment(
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:25:  value: PortalAppointmentSummary,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:26:): PortalDashboardAppointmentViewModel {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:44:    proximos: value.agendamentos.proximos.map(mapAppointment),
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:45:    ultimo: value.agendamentos.ultimo
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:46:      ? mapAppointment(value.agendamentos.ultimo)
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:6:} from "./portal-dashboard-query-options";
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:12:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:21:    expect(JSON.stringify(options.queryKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:28:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:3:import { getPortalDashboard } from "../services/portal-client-api";
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:4:import { portalClientQueryKeys } from "./portal-client-query-keys";
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:12:    queryKey: portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:13:    queryFn: () => getPortalDashboard(),
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:4:import { useQuery } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:6:import { getPortalResourceErrorStatus } from "../errors/portal-resource-errors";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:10:} from "./portal-query-gate";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:11:import { portalDashboardQueryOptions } from "./portal-dashboard-query-options";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:16:  const query = useQuery(portalDashboardQueryOptions(enabled));
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:4:import type { PortalAuthState } from "../auth/portal-auth";
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:8:} from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:9:import { usePortalQueryGate } from "./portal-query-gate";
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:16:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:17:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:18:  sid: "sessao-real",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:46:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:63:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:77:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:4:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:6:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:10:} from "./portal-query";
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:21:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:9:  portalQueryKeys,
beauty-core-ui/src/features/portal/query/portal-query.test.ts:11:} from "./portal-query";
beauty-core-ui/src/features/portal/query/portal-query.test.ts:15:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:16:    const privateKey = portalQueryKeys.privateResource("profile", "current");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:25:    expect(JSON.stringify(publicKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:26:    expect(JSON.stringify(privateKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:47:    const privateKey = portalQueryKeys.privateResource("profile");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:48:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:67:    const privateKey = portalQueryKeys.privateResource("history");
beauty-core-ui/src/features/portal/query/portal-query.ts:3:import type { PortalAuthStatus } from "../auth/portal-auth";
beauty-core-ui/src/features/portal/query/portal-query.ts:5:export const portalQueryKeys = {
beauty-core-ui/src/features/portal/query/portal-query.ts:8:  public: () => [...portalQueryKeys.all, "public"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:10:  private: () => [...portalQueryKeys.all, "private"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:15:  ) => [...portalQueryKeys.public(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:20:  ) => [...portalQueryKeys.private(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:42:    queryKey: portalQueryKeys.private(),
beauty-core-ui/src/features/portal/query/portal-query.ts:46:    queryKey: portalQueryKeys.private(),
beauty-core-ui/src/features/portal/query/portal-query.ts:50:export type PortalAccessTransition = "anonymous" | "denied";
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:6:} from "./portal-safe-return-to";
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:10:    expect(isSafePortalReturnTo("/portal")).toBe(true);
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:11:    expect(isSafePortalReturnTo("/portal/historico")).toBe(true);
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:12:    expect(isSafePortalReturnTo("/portal/perfil")).toBe(true);
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:24:      "/portal\\evil.example",
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:29:      expect(sanitizePortalReturnTo(value)).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:35:      sanitizePortalReturnTo("/portal/historico?email=cliente@example.com"),
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:36:    ).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:39:      sanitizePortalReturnTo("/portal/historico#dados-privados"),
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:40:    ).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:43:      sanitizePortalReturnTo("/portal/%2f%2fevil.example"),
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:44:    ).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:49:      sanitizePortalReturnTo("https://evil.example", "/portal/historico"),
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:50:    ).toBe("/portal/historico");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:54:    ).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:59:      "https://evil.example/?token=secret&clienteId=private";
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:63:    expect(result).toBe("/portal");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:66:    expect(result).not.toContain("clienteId");
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:1:const PORTAL_ORIGIN = "https://portal.invalid";
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:2:const DEFAULT_PORTAL_RETURN_TO = "/portal";
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:50:    parsed.pathname !== "/portal" &&
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts:51:    !parsed.pathname.startsWith("/portal/")
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:25:} from "./portal-client-api";
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:30:    empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:40:      empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:43:    pacotesAtivos: [],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:44:    quantidadeAgendamentos: 2,
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:52:function appointmentResponse() {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:54:    id: "agendamento-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:55:    empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:56:    clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:105:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:113:        agendamentos: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:114:          proximos: [appointmentResponse()],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:117:        fidelidade: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:118:          empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:119:          saldoPontos: 999,
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:121:        pacotes: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:122:          ativos: [{ empresaId: "empresa-secreta" }],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:124:        beneficios: [{ empresaId: "empresa-secreta" }],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:145:      agendamentos: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:160:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:168:          tipo: "AGENDAMENTO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:174:            id: "agendamento-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:175:            clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:185:            empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:198:        tipo: "AGENDAMENTO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:236:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.ts:10:} from "../contracts/portal-client-contracts";
beauty-core-ui/src/features/portal/services/portal-client-api.ts:19:} from "../contracts/portal-client-adapters";
beauty-core-ui/src/features/portal/services/portal-client-api.ts:21:export const PORTAL_CLIENT_ENDPOINTS = {
beauty-core-ui/src/features/portal/services/portal-client-api.ts:29:    PORTAL_CLIENT_ENDPOINTS.dashboard,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:37:    PORTAL_CLIENT_ENDPOINTS.profile,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:48:    PORTAL_CLIENT_ENDPOINTS.profile,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:57:    PORTAL_CLIENT_ENDPOINTS.history,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:16:} from "./portal-state-views";
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:5:import { portalAssets } from "../assets/portal-assets";
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:6:import { PortalAssetImage } from "../components/portal-asset-image";
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:8:export type PortalStateKind =
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:18:export type PortalStatePanelProps = {
beauty-core-ui/src/services/api/api-client.ts:1:import axios, {
beauty-core-ui/src/services/api/api-client.ts:2:  AxiosHeaders,
beauty-core-ui/src/services/api/api-client.ts:3:  type AxiosError,
beauty-core-ui/src/services/api/api-client.ts:4:  type AxiosInstance,
beauty-core-ui/src/services/api/api-client.ts:5:  type InternalAxiosRequestConfig,
beauty-core-ui/src/services/api/api-client.ts:6:} from "axios";
beauty-core-ui/src/services/api/api-client.ts:19:type RetryableRequestConfig = InternalAxiosRequestConfig & {
beauty-core-ui/src/services/api/api-client.ts:23:let publicApiClient: AxiosInstance | undefined;
beauty-core-ui/src/services/api/api-client.ts:24:let authenticatedApiClient: AxiosInstance | undefined;
beauty-core-ui/src/services/api/api-client.ts:38:  config: InternalAxiosRequestConfig,
beauty-core-ui/src/services/api/api-client.ts:40:): InternalAxiosRequestConfig {
beauty-core-ui/src/services/api/api-client.ts:41:  const headers = AxiosHeaders.from(config.headers);
beauty-core-ui/src/services/api/api-client.ts:74:  client: AxiosInstance,
beauty-core-ui/src/services/api/api-client.ts:78:    async (error: AxiosError) => {
beauty-core-ui/src/services/api/api-client.ts:124:function installDevelopmentLogging(client: AxiosInstance): void {
beauty-core-ui/src/services/api/api-client.ts:143:        axios.isAxiosError(error)
beauty-core-ui/src/services/api/api-client.ts:163:}: CreateApiClientOptions = {}): AxiosInstance {
beauty-core-ui/src/services/api/api-client.ts:166:  const client = axios.create({
beauty-core-ui/src/services/api/api-client.ts:188:export function getPublicApiClient(): AxiosInstance {
beauty-core-ui/src/services/api/api-client.ts:194:export function getApiClient(): AxiosInstance {
beauty-core-ui/src/services/api/api.types.ts:1:´╗┐export type ApiErrorPayload = {
beauty-core-ui/src/services/api/api.types.ts:11:export type NormalizedApiError = {
beauty-core-ui/src/services/api/normalize-api-error.ts:1:´╗┐import axios from "axios";
beauty-core-ui/src/services/api/normalize-api-error.ts:49:  if (!axios.isAxiosError(error)) {
beauty-core-ui/src/services/auth/refresh-coordinator.ts:1:´╗┐import type { AxiosInstance } from "axios";
beauty-core-ui/src/services/auth/refresh-coordinator.ts:22:  publicClient: AxiosInstance,
beauty-core-ui/src/services/auth/refresh-coordinator.ts:55:  publicClient: AxiosInstance,
beauty-core-ui/src/stores/auth-store.test.ts:26:      empresaId: "empresa-1",
beauty-core-ui/src/stores/auth-store.test.ts:32:    expect(getAuthState().user?.empresaId).toBe("empresa-1");
beauty-core-ui/src/stores/auth-store.test.ts:40:      empresaId: "empresa-1",
beauty-core-ui/src/stores/auth-store.ts:5:export type AuthStatus =
beauty-core-ui/src/stores/ui-store.test.ts:14:  it("inicia com sidebar desktop aberta e mobile fechada", () => {
beauty-core-ui/src/stores/ui-store.test.ts:15:    expect(getUiState().sidebarOpen).toBe(true);
beauty-core-ui/src/stores/ui-store.test.ts:16:    expect(getUiState().mobileSidebarOpen).toBe(false);
beauty-core-ui/src/stores/ui-store.test.ts:19:  it("altera explicitamente o estado da sidebar desktop", () => {
beauty-core-ui/src/stores/ui-store.test.ts:20:    getUiState().setSidebarOpen(false);
beauty-core-ui/src/stores/ui-store.test.ts:22:    expect(getUiState().sidebarOpen).toBe(false);
beauty-core-ui/src/stores/ui-store.test.ts:24:    getUiState().setSidebarOpen(true);
beauty-core-ui/src/stores/ui-store.test.ts:26:    expect(getUiState().sidebarOpen).toBe(true);
beauty-core-ui/src/stores/ui-store.test.ts:29:  it("alterna a sidebar desktop", () => {
beauty-core-ui/src/stores/ui-store.test.ts:30:    getUiState().toggleSidebar();
beauty-core-ui/src/stores/ui-store.test.ts:31:    expect(getUiState().sidebarOpen).toBe(false);
beauty-core-ui/src/stores/ui-store.test.ts:33:    getUiState().toggleSidebar();
beauty-core-ui/src/stores/ui-store.test.ts:34:    expect(getUiState().sidebarOpen).toBe(true);
beauty-core-ui/src/stores/ui-store.test.ts:37:  it("controla a sidebar mobile", () => {
beauty-core-ui/src/stores/ui-store.test.ts:38:    getUiState().setMobileSidebarOpen(true);
beauty-core-ui/src/stores/ui-store.test.ts:40:    expect(getUiState().mobileSidebarOpen).toBe(true);
beauty-core-ui/src/stores/ui-store.test.ts:42:    getUiState().setMobileSidebarOpen(false);
beauty-core-ui/src/stores/ui-store.test.ts:44:    expect(getUiState().mobileSidebarOpen).toBe(false);
beauty-core-ui/src/stores/ui-store.test.ts:47:  it("fecha a sidebar mobile pela a├º├úo dedicada", () => {
beauty-core-ui/src/stores/ui-store.test.ts:48:    getUiState().setMobileSidebarOpen(true);
beauty-core-ui/src/stores/ui-store.test.ts:49:    getUiState().closeMobileSidebar();
beauty-core-ui/src/stores/ui-store.test.ts:51:    expect(getUiState().mobileSidebarOpen).toBe(false);
beauty-core-ui/src/stores/ui-store.test.ts:55:    getUiState().setSidebarOpen(false);
beauty-core-ui/src/stores/ui-store.test.ts:56:    getUiState().setMobileSidebarOpen(true);
beauty-core-ui/src/stores/ui-store.test.ts:60:    expect(getUiState().sidebarOpen).toBe(true);
beauty-core-ui/src/stores/ui-store.test.ts:61:    expect(getUiState().mobileSidebarOpen).toBe(false);
beauty-core-ui/src/stores/ui-store.ts:4:  sidebarOpen: boolean;
beauty-core-ui/src/stores/ui-store.ts:5:  mobileSidebarOpen: boolean;
beauty-core-ui/src/stores/ui-store.ts:6:  setSidebarOpen: (open: boolean) => void;
beauty-core-ui/src/stores/ui-store.ts:7:  toggleSidebar: () => void;
beauty-core-ui/src/stores/ui-store.ts:8:  setMobileSidebarOpen: (open: boolean) => void;
beauty-core-ui/src/stores/ui-store.ts:9:  closeMobileSidebar: () => void;
beauty-core-ui/src/stores/ui-store.ts:14:  sidebarOpen: true,
beauty-core-ui/src/stores/ui-store.ts:15:  mobileSidebarOpen: false,
beauty-core-ui/src/stores/ui-store.ts:21:  setSidebarOpen: (sidebarOpen) => {
beauty-core-ui/src/stores/ui-store.ts:22:    set({ sidebarOpen });
beauty-core-ui/src/stores/ui-store.ts:25:  toggleSidebar: () => {
beauty-core-ui/src/stores/ui-store.ts:27:      sidebarOpen: !state.sidebarOpen,
beauty-core-ui/src/stores/ui-store.ts:31:  setMobileSidebarOpen: (mobileSidebarOpen) => {
beauty-core-ui/src/stores/ui-store.ts:32:    set({ mobileSidebarOpen });
beauty-core-ui/src/stores/ui-store.ts:35:  closeMobileSidebar: () => {
beauty-core-ui/src/stores/ui-store.ts:36:    set({ mobileSidebarOpen: false });
``

## 5. Chamadas HTTP e endpoints

``text
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:13:vi.mock("@/services/api/api-client", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:4:} from "@/services/api/api-client";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:18:      "http://evil.example",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:16:vi.mock("@/services/api/api-client", () => ({
beauty-core-ui/src/features/portal/services/portal-client-api.ts:3:} from "@/services/api/api-client";
beauty-core-ui/src/services/api/normalize-api-error.ts:6:} from "@/services/api/api.types";
``

## 6. Tipos, schemas e adapters

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:1:export type PortalAssetDefinition = {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:119:export type PortalAssetKey = keyof typeof portalAssets;
beauty-core-ui/src/features/portal/assets/portal-assets.ts:121:export type PortalAsset =
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:34:export type PortalAuthContextValue = PortalAuthState & {
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:1:export type PortalTenantSummary = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:9:export type PortalOtpRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:14:export type PortalOtpRequestResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:20:export type PortalVerifyOtpRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:26:export type PortalClientSummary = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:36:export type PortalVerifyOtpResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:44:export type PortalRefreshTokenRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:48:export type PortalRefreshTokenResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:53:export type PortalLogoutRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:57:export type PortalLogoutResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:61:export type PortalMeResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:72:export type PortalTermsAcceptanceRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:76:export type PortalTermsAcceptanceResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:3:export type PortalAuthErrorKind =
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:13:export type PortalAuthError = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth.ts:9:export type PortalAuthStatus = (typeof PORTAL_AUTH_STATUSES)[number];
beauty-core-ui/src/features/portal/auth/portal-auth.ts:11:export type PortalClientIdentity = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth.ts:17:export type PortalAuthState = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth.ts:27:export type PortalAuthAction =
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:10:  portalDashboardTransportSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:11:  portalHistoryTransportSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:12:  portalProfileTransportSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:13:  portalProfileUpdateInputSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:65:    portalProfileTransportSchema.parse(value),
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:73:    portalDashboardTransportSchema.parse(value);
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:94:    portalHistoryTransportSchema.parse(value);
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:110:    portalProfileUpdateInputSchema.parse(value);
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:126:  portalDashboardTransportSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:127:  portalHistoryTransportSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:128:  portalProfileTransportSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:10:export type PortalAppointmentStatus =
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:21:export type PortalHistoryType =
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:24:export type PortalProfile = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:32:export type PortalProfileUpdateInput = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:38:export type PortalAppointmentSummary = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:48:export type PortalDashboard = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:56:export type PortalHistoryItem = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:63:export type PortalHistory = readonly PortalHistoryItem[];
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:8:const dateTimeSchema = z.string().datetime();
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:9:const nullableDateTimeSchema = dateTimeSchema.nullable();
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:10:const nullableStringSchema = z.string().nullable();
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:12:const namedRelationSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:18:const professionalRelationSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:25:export const portalProfileTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:29:    email: nullableStringSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:30:    foto: nullableStringSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:31:    dataNascimento: nullableDateTimeSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:35:export const portalAppointmentTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:37:    dataHoraInicio: dateTimeSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:38:    dataHoraFim: dateTimeSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:40:    servico: namedRelationSchema.nullable().optional(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:41:    profissional: professionalRelationSchema.nullable().optional(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:42:    unidade: namedRelationSchema.nullable().optional(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:46:export const portalDashboardTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:48:    perfil: portalProfileTransportSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:51:        proximos: z.array(portalAppointmentTransportSchema),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:52:        ultimo: portalAppointmentTransportSchema.nullable(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:58:export const portalHistoryItemTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:61:    data: dateTimeSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:69:export const portalHistoryTransportSchema = z.array(
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:70:  portalHistoryItemTransportSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:73:export const portalProfileUpdateInputSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:93:export type PortalProfileTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:94:  typeof portalProfileTransportSchema
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:97:export type PortalAppointmentTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:98:  typeof portalAppointmentTransportSchema
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:101:export type PortalDashboardTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:102:  typeof portalDashboardTransportSchema
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:105:export type PortalHistoryItemTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:106:  typeof portalHistoryItemTransportSchema
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:109:export type PortalProfileUpdateInputParsed = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:110:  typeof portalProfileUpdateInputSchema
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:6:export type PortalResourceError = PortalAuthError;
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:1:export type PortalNavigationItem = {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:6:export type PortalDashboardAppointmentViewModel =
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:17:export type PortalDashboardViewModel = Readonly<{
beauty-core-ui/src/features/portal/query/portal-query.ts:50:export type PortalAccessTransition = "anonymous" | "denied";
beauty-core-ui/src/features/portal/services/portal-client-api.ts:16:  portalDashboardTransportSchema,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:17:  portalHistoryTransportSchema,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:18:  portalProfileTransportSchema,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:71:  portalDashboardTransportSchema,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:72:  portalHistoryTransportSchema,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:73:  portalProfileTransportSchema,
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:8:export type PortalStateKind =
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:18:export type PortalStatePanelProps = {
``

## 7. Matriz preliminar de capacidade

| Domínio | Contrato frontend localizado | Endpoint localizado | Implementável sem backend |
|---|---|---|---|
| Agendamentos | A confirmar no Bloco 03 | A confirmar no Bloco 03 | Somente se contrato real existir |
| Fidelidade | A confirmar no Bloco 03 | A confirmar no Bloco 03 | Somente se contrato real existir |
| Benefícios | A confirmar no Bloco 03 | A confirmar no Bloco 03 | Somente se contrato real existir |
| Pacotes | A confirmar no Bloco 03 | A confirmar no Bloco 03 | Somente se contrato real existir |
| Consumo/saldo | A confirmar no Bloco 03 | A confirmar no Bloco 03 | Somente se contrato real existir |

## 8. Restrições preservadas

- Backend permanece inalterado.
- JWT permanece inalterado.
- Nenhum empresaId será inventado.
- Nenhuma chamada será criada contra endpoint não confirmado.
- Nenhum dado será fabricado para simular suporte funcional.
- Admin e Chats 63/64 permanecem fora do escopo.
- Nenhum commit, push, tag ou deploy será executado.

## 9. Próximo bloco

O BLOCO 03/15 deverá validar detalhadamente os contratos candidatos, schemas, adapters e respostas esperadas, separando o que é reutilizável do que não possui suporte real.
