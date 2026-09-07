# Beauty Core 1.0 — Chat 62

## Portal Cliente — Agendamentos, Fidelidade, Benefícios e Pacotes

> Fonte de verdade técnica dos Blocos 02–15.

## 1. Identificação

- Data da auditoria: 2026-09-05 23:04:16 -03:00
- Repositório: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Frontend: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-ui
- Branch: chat32-bullmq-enterprise
- HEAD completo: b9913a7c007e03929ac893ef01e1a849f04394fe
- Parent completo: cbb4285c8d3434e7a6bdd1615e4df24b03ace9a1
- Subject: feat(portal): add client dashboard profile and history foundation

## 2. Resultado da baseline

| Item | Resultado |
|---|---|
| Branch chat32-bullmq-enterprise | PASS |
| HEAD iniciado por b9913a7 | PASS |
| Subject esperado | PASS |
| Working tree limpa | ATENÇÃO |
| Stage vazio | PASS |
| Nenhum untracked | ATENÇÃO |
| Backend inalterado | PASS |

## 3. Escopo autorizado

- Agendamentos do cliente.
- Fidelidade.
- Benefícios.
- Pacotes.
- Consumo e saldo de pacotes, somente se suportado pelos contratos existentes.
- Navegação autenticada relacionada.
- Integração com auth, sessão, tenant e TanStack Query.
- Segurança, privacidade, A11y, responsividade e performance.

## 4. Exclusões obrigatórias

- Não antecipar funcionalidades dos Chats 63 e 64.
- Não alterar o backend.
- Não alterar o Admin.
- Não reprocessar assets.
- Não inventar empresaId.
- Não modificar o contrato JWT.
- Não criar bypass de autenticação, autorização ou tenant.
- Não executar push, tag ou deploy.

## 5. Regras de segurança

- O cliente acessa somente os próprios dados.
- O tenant deve vir do contexto já existente.
- O JWT utiliza clienteId, empresaId e sid.
- Queries privadas devem ser bloqueadas em estados anônimos ou negados.
- Dados de outros clientes não podem aparecer em cache, URL ou estado global.
- Logout deve invalidar ou remover dados privados.
- Loading, erro, vazio e acesso negado devem ser tratados explicitamente.

## 6. Inventário do Portal

- `public\images\portal\appointments\portal-appointments.webp`
- `public\images\portal\appointments\source\portal-appointments-source.png`
- `public\images\portal\auth\portal-access-unavailable.webp`
- `public\images\portal\auth\portal-first-access.webp`
- `public\images\portal\auth\portal-otp-illustration.webp`
- `public\images\portal\auth\source\portal-access-unavailable-source.png`
- `public\images\portal\auth\source\portal-first-access-source.png`
- `public\images\portal\auth\source\portal-otp-illustration-source.png`
- `public\images\portal\backgrounds\portal-background.webp`
- `public\images\portal\backgrounds\source\portal-background-source.png`
- `public\images\portal\benefits\portal-benefits.webp`
- `public\images\portal\benefits\source\portal-benefits-source.png`
- `public\images\portal\dashboard\portal-dashboard.webp`
- `public\images\portal\dashboard\source\portal-dashboard-source.png`
- `public\images\portal\hero\portal-hero.webp`
- `public\images\portal\hero\source\portal-hero-source.png`
- `public\images\portal\history\portal-history.webp`
- `public\images\portal\history\source\portal-history-source.png`
- `public\images\portal\identity\portal-key-visual.webp`
- `public\images\portal\identity\source\portal-key-visual-source.png`
- `public\images\portal\legal\portal-privacy.webp`
- `public\images\portal\legal\portal-terms.webp`
- `public\images\portal\legal\source\portal-privacy-source.png`
- `public\images\portal\legal\source\portal-terms-source.png`
- `public\images\portal\loyalty\portal-loyalty.webp`
- `public\images\portal\loyalty\source\portal-loyalty-source.png`
- `public\images\portal\messages\portal-messages.webp`
- `public\images\portal\messages\source\portal-messages-source.png`
- `public\images\portal\notifications\portal-notifications.webp`
- `public\images\portal\notifications\source\portal-notifications-source.png`
- `public\images\portal\onboarding\portal-onboarding.webp`
- `public\images\portal\onboarding\source\portal-onboarding-source.png`
- `public\images\portal\packages\portal-packages.webp`
- `public\images\portal\packages\source\portal-packages-source.png`
- `public\images\portal\placeholders\portal-placeholder.webp`
- `public\images\portal\placeholders\source\portal-placeholder-source.png`
- `public\images\portal\profile\portal-profile.webp`
- `public\images\portal\profile\source\portal-profile-source.png`
- `public\images\portal\pwa\portal-app-icon.png`
- `public\images\portal\pwa\portal-pwa-splash.webp`
- `public\images\portal\pwa\source\portal-app-icon-source.png`
- `public\images\portal\pwa\source\portal-pwa-splash-source.png`
- `public\images\portal\states\portal-empty-state.webp`
- `public\images\portal\states\portal-error-state.webp`
- `public\images\portal\states\portal-offline.webp`
- `public\images\portal\states\portal-success.webp`
- `public\images\portal\states\source\portal-empty-state-source.png`
- `public\images\portal\states\source\portal-error-state-source.png`
- `public\images\portal\states\source\portal-offline-source.png`
- `public\images\portal\states\source\portal-success-source.png`
- `src\app\portal\historico\page.tsx`
- `src\app\portal\layout.tsx`
- `src\app\portal\page.tsx`
- `src\app\portal\perfil\page.tsx`
- `src\app\portal\portal-private-routing.test.tsx`
- `src\app\portal\portal-routing.test.tsx`
- `src\app\portal\primeiro-acesso\page.tsx`
- `src\features\portal\assets\portal-assets.test.ts`
- `src\features\portal\assets\portal-assets.ts`
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
- `src\features\portal\contracts\portal-client-adapters.ts`
- `src\features\portal\contracts\portal-client-contracts.ts`
- `src\features\portal\contracts\portal-client-schemas.ts`
- `src\features\portal\errors\portal-resource-errors.test.ts`
- `src\features\portal\errors\portal-resource-errors.ts`
- `src\features\portal\navigation\portal-navigation.test.ts`
- `src\features\portal\navigation\portal-navigation.ts`
- `src\features\portal\navigation\portal-navigation-config.ts`
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
- `src\features\portal\portal-foundation.integration.test.tsx`
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
- `src\features\portal\security\portal-safe-return-to.test.ts`
- `src\features\portal\security\portal-safe-return-to.ts`
- `src\features\portal\services\portal-client-api.test.ts`
- `src\features\portal\services\portal-client-api.ts`
- `src\features\portal\states\portal-state-views.test.tsx`
- `src\features\portal\states\portal-state-views.tsx`

## 7. Busca focada no código do Portal

Quantidade de ocorrências relevantes encontradas: 871

``text
beauty-core-ui/src/app/portal/layout.tsx:3:import { PortalAuthProvider } from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/app/portal/layout.tsx:14:    <PortalAuthProvider restoreOnMount>
beauty-core-ui/src/app/portal/layout.tsx:16:    </PortalAuthProvider>
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:5:vi.mock("@/features/portal/auth/portal-private-route", () => ({
beauty-core-ui/src/app/portal/portal-routing.test.tsx:4:import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
beauty-core-ui/src/app/portal/portal-routing.test.tsx:5:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/app/portal/portal-routing.test.tsx:8:  PortalAuthProvider,
beauty-core-ui/src/app/portal/portal-routing.test.tsx:9:} from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/app/portal/portal-routing.test.tsx:19:  it("renders the OTP request route inside the anonymous Portal auth state", () => {
beauty-core-ui/src/app/portal/portal-routing.test.tsx:21:      <TenantProvider initialTenant={DEFAULT_TENANT}>
beauty-core-ui/src/app/portal/portal-routing.test.tsx:22:        <PortalAuthProvider
beauty-core-ui/src/app/portal/portal-routing.test.tsx:29:        </PortalAuthProvider>
beauty-core-ui/src/app/portal/portal-routing.test.tsx:30:      </TenantProvider>,
beauty-core-ui/src/features/portal/assets/portal-assets.ts:6:  appointments: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:8:      src: "/images/portal/appointments/portal-appointments.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:11:  auth: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:13:      src: "/images/portal/auth/portal-access-unavailable.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:16:      src: "/images/portal/auth/portal-first-access.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:19:      src: "/images/portal/auth/portal-otp-illustration.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:27:  benefits: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:60:  loyalty: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:62:      src: "/images/portal/loyalty/portal-loyalty.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:80:  packages: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:82:      src: "/images/portal/packages/portal-packages.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:122:  | (typeof portalAssets)["appointments"]["illustration"]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:123:  | (typeof portalAssets)["auth"][keyof (typeof portalAssets)["auth"]]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:125:  | (typeof portalAssets)["benefits"]["illustration"]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:131:  | (typeof portalAssets)["loyalty"]["illustration"]
beauty-core-ui/src/features/portal/assets/portal-assets.ts:135:  | (typeof portalAssets)["packages"]["illustration"]
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:19:  portalAuthApi,
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:20:} from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:23:  portalAuthQueryKeys,
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:24:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:30:describe("portalAuthApi", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:31:  it("solicita OTP pela rota p├║blica tenant-aware sem enviar empresaId", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:36:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:48:    await portalAuthApi.requestOtp({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:54:      "/public/beauty-demo/auth-cliente/solicitar-codigo",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:62:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:72:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:82:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:88:    const result = await portalAuthApi.verifyOtp({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:95:      "/public/beauty-demo/auth-cliente/verificar-codigo",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:115:    await portalAuthApi.refresh({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:120:      "/auth-cliente/refresh",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:134:    await portalAuthApi.logout({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:139:      "/auth-cliente/logout",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:153:    await portalAuthApi.logoutAll();
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:156:      "/auth-cliente/logout-all",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:167:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:179:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:185:    await portalAuthApi.me();
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:186:    await portalAuthApi.acceptTerms({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:191:      "/auth-cliente/me",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:195:      "/auth-cliente/aceitar-termos",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:202:  it("mant├®m a chave de auth sem empresaId arbitr├írio", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:203:    expect(portalAuthQueryKeys.me()).toEqual([
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:205:      "auth",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:210:      JSON.stringify(portalAuthQueryKeys.me()),
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:211:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:18:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:20:function getPublicAuthClientePath(slug: string): string {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:21:  return `/public/${encodeURIComponent(slug)}/auth-cliente`;
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:24:export const portalAuthApi = {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:29:      `${getPublicAuthClientePath(request.slug)}/solicitar-codigo`,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:42:      `${getPublicAuthClientePath(request.slug)}/verificar-codigo`,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:57:        "/auth-cliente/refresh",
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:70:      "/auth-cliente/logout",
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:81:      "/auth-cliente/logout-all",
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:89:      "/auth-cliente/me",
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:100:        "/auth-cliente/aceitar-termos",
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:4:import { clearPortalPrivateQueries } from "./portal-auth-cache";
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:11:    queryClient.setQueryData(["portal", "agendamentos"], [{ id: "agenda-1" }]);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:20:      queryClient.getQueryData(["portal", "agendamentos"]),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:50:    queryClient.setQueryData(["portal", "session"], {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:51:      state: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:57:      queryClient.getQueryData(["portal", "session"]),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:5:    predicate: ({ queryKey }) => queryKey[0] === "portal",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:10:  restorePortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:11:  logoutPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:12:  clearPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:13:  hasPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:16:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:17:  restorePortalSession: mocks.restorePortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:18:  logoutPortalSession: mocks.logoutPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:19:  clearPortalSession: mocks.clearPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:20:  hasPortalSession: mocks.hasPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:24:  PortalAuthProvider,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:25:  usePortalAuth,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:26:} from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:33:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:34:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:39:  const auth = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:43:      <output data-testid="status">{auth.status}</output>
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:45:        {auth.identity
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:46:          ? `${auth.identity.clienteId}|${auth.identity.empresaId}|${auth.identity.sid}`
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:52:          void auth.restoreSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:60:          void auth.logoutSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:69:describe("PortalAuthProvider ÔÇö ciclo real de sess├úo", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:71:    mocks.restorePortalSession.mockResolvedValue(identity);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:74:      <PortalAuthProvider>
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:76:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:85:        "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:95:    mocks.restorePortalSession.mockResolvedValue(null);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:98:      <PortalAuthProvider>
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:100:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:115:    mocks.logoutPortalSession.mockResolvedValue({
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:120:      <PortalAuthProvider
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:122:          status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:127:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:140:    expect(mocks.clearPortalSession).toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:144:    mocks.hasPortalSession.mockReturnValue(true);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:147:      <PortalAuthProvider>
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:149:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:156:    expect(mocks.restorePortalSession).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:160:    mocks.hasPortalSession.mockReturnValue(true);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:161:    mocks.restorePortalSession.mockResolvedValue(identity);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:164:      <PortalAuthProvider restoreOnMount>
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:166:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:171:        "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:175:    expect(mocks.restorePortalSession).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:5:  PortalAuthBoundary,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:6:  PortalAuthProvider,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:7:  usePortalAuth,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:8:} from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:9:import type { PortalAuthState } from "./portal-auth";
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:16:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:17:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:21:function AuthProbe() {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:22:  const auth = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:26:      <output data-testid="status">{auth.status}</output>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:28:        {String(auth.canUsePrivateQueries)}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:31:        {auth.identity
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:32:          ? `${auth.identity.clienteId}|${auth.identity.empresaId}|${auth.identity.sid}`
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:35:      <button type="button" onClick={auth.beginRestore}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:38:      <button type="button" onClick={auth.markAnonymous}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:43:        onClick={() => auth.markAuthenticated(CLIENT_IDENTITY)}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:47:      <button type="button" onClick={auth.markDenied}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:50:      <button type="button" onClick={auth.clearSession}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:57:describe("PortalAuthProvider", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:58:  it("starts without assuming a client session", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:60:      <PortalAuthProvider>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:61:        <AuthProbe />
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:62:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:70:  it("supports the client authentication state transitions", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:72:      <PortalAuthProvider>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:73:        <AuthProbe />
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:74:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:81:    expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:97:describe("PortalAuthBoundary", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:99:    const initialState: PortalAuthState = {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:105:      <PortalAuthProvider initialState={initialState}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:106:        <PortalAuthBoundary
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:112:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:113:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:122:      <PortalAuthProvider
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:123:        initialState={{ status: "authenticated", identity: CLIENT_IDENTITY }}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:125:        <PortalAuthBoundary
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:131:        </PortalAuthBoundary>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:132:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:16:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:18:  normalizePortalAuthError,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:19:} from "./portal-auth-errors";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:21:  clearPortalSession as clearStoredPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:22:  hasPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:23:  logoutPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:24:  restorePortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:25:} from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:28:  PORTAL_AUTH_INITIAL_STATE,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:29:  portalAuthReducer,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:30:  type PortalAuthState,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:32:} from "./portal-auth";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:34:export type PortalAuthContextValue = PortalAuthState & {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:37:  restoreSession: () => Promise<PortalClientIdentity | null>;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:39:  markAuthenticated: (identity: PortalClientIdentity) => void;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:41:  clearSession: () => void;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:42:  logoutSession: () => Promise<PortalLogoutResponse | null>;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:45:const PortalAuthContext =
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:46:  createContext<PortalAuthContextValue | null>(null);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:48:type PortalAuthProviderProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:50:  initialState?: PortalAuthState;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:54:export function PortalAuthProvider({
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:56:  initialState = PORTAL_AUTH_INITIAL_STATE,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:58:}: PortalAuthProviderProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:60:    portalAuthReducer,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:74:  const markAuthenticated = useCallback(
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:77:        type: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:88:  const clearSession = useCallback(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:89:    clearStoredPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:93:  const restoreSession = useCallback(async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:97:      const identity = await restorePortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:104:      markAuthenticated(identity);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:107:      const normalized = normalizePortalAuthError(error);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:120:    markAuthenticated,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:124:  const logoutSession = useCallback(async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:126:      return await logoutPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:128:      clearSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:130:  }, [clearSession]);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:143:    if (!hasPortalSession()) {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:148:    void restoreSession().catch(() => undefined);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:153:    restoreSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:156:  const value = useMemo<PortalAuthContextValue>(
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:161:      restoreSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:163:      markAuthenticated,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:165:      clearSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:166:      logoutSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:170:      clearSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:171:      logoutSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:173:      markAuthenticated,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:175:      restoreSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:181:    <PortalAuthContext.Provider value={value}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:183:    </PortalAuthContext.Provider>
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:187:export function usePortalAuth(): PortalAuthContextValue {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:188:  const context = useContext(PortalAuthContext);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:192:      "usePortalAuth deve ser utilizado dentro de PortalAuthProvider.",
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:199:type PortalAuthBoundaryProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:206:export function PortalAuthBoundary({
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:211:}: PortalAuthBoundaryProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:212:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:1:export type PortalTenantSummary = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:2:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:16:  empresa: PortalTenantSummary;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:31:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:40:  empresa: PortalTenantSummary;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:66:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:80:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:85:export const portalAuthQueryKeys = {
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:86:  all: ["portal", "auth"] as const,
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:88:  me: () => [...portalAuthQueryKeys.all, "me"] as const,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:4:  normalizePortalAuthError,
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:5:} from "./portal-auth-errors";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:7:describe("normalizePortalAuthError", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:10:    [401, "unauthorized"],
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:26:        normalizePortalAuthError(error),
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:41:      normalizePortalAuthError(error),
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:55:          clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:61:    const result = normalizePortalAuthError(error);
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:3:export type PortalAuthErrorKind =
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:5:  | "unauthorized"
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:13:export type PortalAuthError = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:14:  kind: PortalAuthErrorKind;
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:19:function getKindFromStatus(status: number | null): PortalAuthErrorKind {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:25:    return "unauthorized";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:47:function getSafeMessage(kind: PortalAuthErrorKind): string {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:51:    case "unauthorized":
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:56:      return "N├úo foi poss├¡vel localizar o cliente ou o tenant.";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:68:export function normalizePortalAuthError(
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:70:): PortalAuthError {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:9:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:10:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:11:import { PortalAuthRouteOrchestrator } from "./portal-auth-route-orchestrator";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:12:import { hasPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:28:vi.mock("./portal-auth-context", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:29:  usePortalAuth: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:32:vi.mock("./portal-auth-api", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:33:  portalAuthApi: {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:38:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:39:  hasPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:43:  ReturnType<typeof portalAuthApi.me>
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:52:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:58:const usePortalAuthMock = vi.mocked(usePortalAuth);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:59:const meMock = vi.mocked(portalAuthApi.me);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:60:const hasPortalSessionMock = vi.mocked(hasPortalSession);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:66:    <PortalAuthRouteOrchestrator
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:70:    </PortalAuthRouteOrchestrator>,
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:83:  hasPortalSessionMock.mockReturnValue(false);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:86:  usePortalAuthMock.mockReturnValue({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:87:    status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:89:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:90:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:93:  } as ReturnType<typeof usePortalAuth>);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:96:describe("PortalAuthRouteOrchestrator", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:137:  it("does not expose content when the auth profile cannot be verified", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:12:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:13:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:14:import { hasPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:16:  resolvePortalAuthRoute,
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:17:} from "./portal-auth-routing";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:19:type PortalAuthRouteOrchestratorProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:24:export function PortalAuthRouteOrchestrator({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:27:}: PortalAuthRouteOrchestratorProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:28:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:32:    hasPortalSession()
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:45:  if (status !== "authenticated") {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:50:    <PortalAuthenticatedRouteController
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:54:    </PortalAuthenticatedRouteController>
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:58:type PortalAuthenticatedRouteControllerProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:63:function PortalAuthenticatedRouteController({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:66:}: PortalAuthenticatedRouteControllerProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:82:      const target = resolvePortalAuthRoute({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:111:    void portalAuthApi
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:6:  resolvePortalAuthRoute,
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:8:} from "./portal-auth-routing";
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:29:      resolvePortalAuthRoute({
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:41:      resolvePortalAuthRoute({
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:51:      resolvePortalAuthRoute({
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:61:      resolvePortalAuthRoute({
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:27:type ResolvePortalAuthRouteInput = {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:33:export function resolvePortalAuthRoute({
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts:37:}: ResolvePortalAuthRouteInput): string | null {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:5:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:18:vi.mock("@/services/auth/token-storage", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:27:vi.mock("./portal-auth-api", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:28:  portalAuthApi: {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:37:  clearPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:38:  hasPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:39:  logoutAllPortalSessions,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:40:  logoutPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:41:  restorePortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:42:  startPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:43:} from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:55:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:56:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:64:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:65:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:76:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:86:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:97:describe("portal-auth-session", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:99:    expect(await restorePortalSession()).toBeNull();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:104:    const identity = startPortalSession(otpResponse);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:107:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:108:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:132:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:138:    const identity = await restorePortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:146:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:147:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:162:    await expect(logoutPortalSession()).rejects.toThrow(
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:174:    await logoutAllPortalSessions();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:183:    expect(hasPortalSession()).toBe(true);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:185:    clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:3:import { tokenStorage } from "@/services/auth/token-storage";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:5:import type { PortalClientIdentity } from "./portal-auth";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:7:  portalAuthApi,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:8:} from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:14:} from "./portal-auth-contracts";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:18:  clienteId?: unknown;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:19:  empresaId?: unknown;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:103:  clienteId: string,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:104:  empresaId: string,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:108:  const tokenClienteId = getRequiredString(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:109:    claims.clienteId ?? claims.sub,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:110:    "clienteId",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:113:  const tokenEmpresaId = getRequiredString(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:114:    claims.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:115:    "empresaId",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:123:  if (tokenClienteId !== clienteId) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:129:  if (tokenEmpresaId !== empresaId) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:136:    clienteId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:137:    empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:172:  const response = await portalAuthApi.refresh({
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:192:function isUnauthorized(error: unknown): boolean {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:199:export function hasPortalSession(): boolean {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:206:export function startPortalSession(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:212:    response.cliente.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:223:export async function restorePortalSession(): Promise<
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:252:      profile = await portalAuthApi.me();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:255:        !isUnauthorized(error) ||
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:268:      profile = await portalAuthApi.me();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:274:      profile.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:278:      clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:285:export function clearPortalSession(): void {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:289:export async function logoutPortalSession(): Promise<
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:299:    return await portalAuthApi.logout({
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:303:    clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:307:export async function logoutAllPortalSessions(): Promise<
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:311:    return await portalAuthApi.logoutAll();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:313:    clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth.ts:1:´╗┐export const PORTAL_AUTH_STATUSES = [
beauty-core-ui/src/features/portal/auth/portal-auth.ts:5:  "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth.ts:9:export type PortalAuthStatus = (typeof PORTAL_AUTH_STATUSES)[number];
beauty-core-ui/src/features/portal/auth/portal-auth.ts:12:  clienteId: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:13:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:17:export type PortalAuthState = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth.ts:18:  status: PortalAuthStatus;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:22:export const PORTAL_AUTH_INITIAL_STATE: PortalAuthState = {
beauty-core-ui/src/features/portal/auth/portal-auth.ts:27:export type PortalAuthAction =
beauty-core-ui/src/features/portal/auth/portal-auth.ts:30:  | { type: "authenticated"; identity: PortalClientIdentity }
beauty-core-ui/src/features/portal/auth/portal-auth.ts:34:export function portalAuthReducer(
beauty-core-ui/src/features/portal/auth/portal-auth.ts:35:  state: PortalAuthState,
beauty-core-ui/src/features/portal/auth/portal-auth.ts:36:  action: PortalAuthAction,
beauty-core-ui/src/features/portal/auth/portal-auth.ts:37:): PortalAuthState {
beauty-core-ui/src/features/portal/auth/portal-auth.ts:43:    case "authenticated":
beauty-core-ui/src/features/portal/auth/portal-auth.ts:44:      return { status: "authenticated", identity: action.identity };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:55:  state: Pick<PortalAuthState, "status">,
beauty-core-ui/src/features/portal/auth/portal-auth.ts:57:  return state.status === "authenticated";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:17:import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:18:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:20:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:27:vi.mock("./portal-auth-api", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:28:  portalAuthApi: {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:34:  ReturnType<typeof portalAuthApi.requestOtp>
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:37:const tenant = {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:38:  ...DEFAULT_TENANT,
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:46:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:54:const requestOtpMock = vi.mocked(portalAuthApi.requestOtp);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:58:    <TenantProvider initialTenant={tenant}>
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:60:    </TenantProvider>,
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:103:  it("sends only the tenant slug and normalized phone to the public adapter", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:126:      "empresaId",
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:8:import { useTenant } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:10:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:71:  const { tenant } = useTenant();
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:101:      const response = await portalAuthApi.requestOtp({
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:102:        slug: tenant.slug,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:17:import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:18:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:20:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:21:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:27:import { startPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:29:vi.mock("./portal-auth-api", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:30:  portalAuthApi: {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:36:vi.mock("./portal-auth-context", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:37:  usePortalAuth: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:40:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:41:  startPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:45:  ReturnType<typeof portalAuthApi.verifyOtp>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:49:  ReturnType<typeof portalAuthApi.requestOtp>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:52:const tenant = {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:53:  ...DEFAULT_TENANT,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:63:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:73:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:81:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:89:const requestOtpMock = vi.mocked(portalAuthApi.requestOtp);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:90:const verifyOtpMock = vi.mocked(portalAuthApi.verifyOtp);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:91:const usePortalAuthMock = vi.mocked(usePortalAuth);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:92:const startPortalSessionMock = vi.mocked(startPortalSession);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:93:const restoreSessionMock = vi.fn();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:97:    <TenantProvider initialTenant={tenant}>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:102:    </TenantProvider>,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:113:  startPortalSessionMock.mockReset();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:114:  restoreSessionMock.mockReset();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:115:  restoreSessionMock.mockResolvedValue(undefined);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:117:  usePortalAuthMock.mockReturnValue({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:118:    restoreSession: restoreSessionMock,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:119:  } as unknown as ReturnType<typeof usePortalAuth>);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:121:  startPortalSessionMock.mockReturnValue({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:122:    clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:123:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:171:  it("verifies the real contract and restores the authenticated session", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:194:    expect(startPortalSessionMock).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:199:      expect(restoreSessionMock).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:268:  it("resends through the public tenant-aware endpoint without cooldown invention", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:321:    restoreSessionMock.mockRejectedValue({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:8:import { useTenant } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:10:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:11:import { portalAuthApi } from "./portal-auth-api";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:12:import { startPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:93:  const { tenant } = useTenant();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:94:  const { restoreSession } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:131:      const response = await portalAuthApi.verifyOtp({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:132:        slug: tenant.slug,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:137:      await startPortalSession(response);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:138:      await restoreSession();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:163:      const response = await portalAuthApi.requestOtp({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:164:        slug: tenant.slug,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:13:  usePortalAuth: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:21:vi.mock("./portal-auth-context", () => ({
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:22:  usePortalAuth: mocks.usePortalAuth,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:25:vi.mock("./portal-auth-route-orchestrator", () => ({
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:26:  PortalAuthRouteOrchestrator: ({ children }: { children: ReactNode }) => (
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:40:  mocks.usePortalAuth.mockReset();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:45:    mocks.usePortalAuth.mockReturnValue({
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:64:  it("waits for auth restoration without fetching a private resource", () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:65:    mocks.usePortalAuth.mockReturnValue({
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:81:  it("exposes the children only after authentication", () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:82:    mocks.usePortalAuth.mockReturnValue({
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:83:      status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:85:        clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:86:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:103:    mocks.usePortalAuth.mockReturnValue({
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:8:  PortalAuthRouteOrchestrator,
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:9:} from "./portal-auth-route-orchestrator";
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:10:import { usePortalAuth } from "./portal-auth-context";
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:26:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:64:    <PortalAuthRouteOrchestrator>
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:66:    </PortalAuthRouteOrchestrator>
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:13:import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:14:import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:16:  TenantProvider,
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:17:} from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:25:const customTenant: TenantPublicConfig = {
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:26:  ...DEFAULT_TENANT,
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:30:    ...DEFAULT_TENANT.branding,
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:36:const customTenantWithLogo: TenantPublicConfig = {
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:37:  ...customTenant,
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:39:    ...customTenant.branding,
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:40:    logoUrl: "/uploads/public/tenant/logo.png",
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:45:  it("uses the real TenantProvider fallback branding", () => {
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:47:      <TenantProvider initialTenant={customTenant}>
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:49:      </TenantProvider>,
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:56:  it("renders the tenant logo when the real logoUrl exists", () => {
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:58:      <TenantProvider initialTenant={customTenantWithLogo}>
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:60:      </TenantProvider>,
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx:65:      expect.stringContaining("/uploads/public/tenant/logo.png"),
beauty-core-ui/src/features/portal/components/portal-branding.tsx:5:import { useTenant } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/components/portal-branding.tsx:8:  const { tenant } = useTenant();
beauty-core-ui/src/features/portal/components/portal-branding.tsx:9:  const logoUrl = tenant.branding.logoUrl;
beauty-core-ui/src/features/portal/components/portal-branding.tsx:10:  const tenantName = tenant.name;
beauty-core-ui/src/features/portal/components/portal-branding.tsx:11:  const initials = tenantName.trim().charAt(0).toUpperCase();
beauty-core-ui/src/features/portal/components/portal-branding.tsx:15:      aria-label={tenantName}
beauty-core-ui/src/features/portal/components/portal-branding.tsx:31:          style={{ backgroundColor: "var(--tenant-primary)" }}
beauty-core-ui/src/features/portal/components/portal-branding.tsx:38:        {tenantName}
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:15:import type { PortalAuthState } from "../auth/portal-auth";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:17:  PortalAuthProvider,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:18:  usePortalAuth,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:19:} from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:40:const AUTHENTICATED_STATE: PortalAuthState = {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:41:  status: "authenticated",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:43:    clienteId: "cliente-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:44:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:49:const ANONYMOUS_STATE: PortalAuthState = {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:62:  agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:80:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:89:function renderWithAuth(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:90:  state: PortalAuthState,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:103:      <PortalAuthProvider initialState={state}>
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:105:      </PortalAuthProvider>
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:110:function renderBoundary(state: PortalAuthState) {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:111:  return renderWithAuth(
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:124:  it("shows an authenticated query in its initial fetching state", () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:127:    renderWithAuth(AUTHENTICATED_STATE, <HookProbe />);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:130:      "authenticated|pending|fetching|",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:137:    renderWithAuth(ANONYMOUS_STATE, <HookProbe />);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:145:  it("loads the mapped dashboard once for an authenticated client", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:148:    renderWithAuth(AUTHENTICATED_STATE, <HookProbe />);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:152:        "authenticated|success|idle|Maria",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:164:    "converts dashboard access status %s into the safe auth state",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:165:    async (status, expectedAuthStatus) => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:171:      renderWithAuth(AUTHENTICATED_STATE, <HookProbe />);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:175:          expectedAuthStatus,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:186:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:201:      agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:207:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:217:    expect(screen.queryByText(/pontos|saldo|total/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:226:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:5:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:28:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:68:      error.kind === "unauthorized" ||
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:4:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:16:      <TenantProvider>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:20:      </TenantProvider>,
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:41:      <TenantProvider>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:45:      </TenantProvider>,
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:13:import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:14:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:23:  it("renders shell landmarks with real tenant branding", () => {
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:25:      <TenantProvider initialTenant={DEFAULT_TENANT}>
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:29:      </TenantProvider>,
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:37:      screen.getByLabelText(DEFAULT_TENANT.name),
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:38:    ).toHaveTextContent(DEFAULT_TENANT.name);
beauty-core-ui/src/features/portal/components/portal-shell.tsx:3:import { useTenant } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/components/portal-shell.tsx:48:          <TenantPoweredBy />
beauty-core-ui/src/features/portal/components/portal-shell.tsx:55:function TenantPoweredBy() {
beauty-core-ui/src/features/portal/components/portal-shell.tsx:56:  const { tenant } = useTenant();
beauty-core-ui/src/features/portal/components/portal-shell.tsx:58:  if (!tenant.settings.showPoweredByBeautyCore) {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:2:  PortalAppointmentSummary,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:14:  type PortalAppointmentTransport,
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
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:38:export type PortalAppointmentSummary = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:41:  status: PortalAppointmentStatus;
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:50:  agendamentos: Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:51:    proximos: readonly PortalAppointmentSummary[];
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:52:    ultimo: PortalAppointmentSummary | null;
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:4:  PORTAL_APPOINTMENT_STATUS_VALUES,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:35:export const portalAppointmentTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:39:    status: z.enum(PORTAL_APPOINTMENT_STATUS_VALUES),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:49:    agendamentos: z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:51:        proximos: z.array(portalAppointmentTransportSchema),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:52:        ultimo: portalAppointmentTransportSchema.nullable(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:97:export type PortalAppointmentTransport = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:98:  typeof portalAppointmentTransportSchema
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:16:    [401, "unauthorized"],
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:71:          clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:2:  normalizePortalAuthError,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:3:  type PortalAuthError,
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:4:} from "../auth/portal-auth-errors";
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:6:export type PortalResourceError = PortalAuthError;
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts:11:  return normalizePortalAuthError(error);
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:4:import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:5:import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:6:import type { PortalAuthState } from "@/features/portal/auth/portal-auth";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:7:import { PortalAuthProvider } from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:11:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:17:const anonymousState: PortalAuthState = {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:23:  initialState: PortalAuthState = anonymousState,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:24:  tenant: TenantPublicConfig = DEFAULT_TENANT,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:27:    <TenantProvider initialTenant={tenant}>
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:28:      <PortalAuthProvider initialState={initialState}>
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:32:      </PortalAuthProvider>
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:33:    </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:41:describe("Portal authentication UX", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:69:      "data-portal-auth-surface",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:80:      portalAssets.auth.otpIllustration.src,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:84:  it("renders tenant-aware copy while preserving the real fallback provider", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:85:    const customTenant: TenantPublicConfig = {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:86:      ...DEFAULT_TENANT,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:90:        ...DEFAULT_TENANT.branding,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:95:    renderPage(anonymousState, customTenant);
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:136:      portalAssets.auth.accessUnavailable.src,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:11:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:13:  PortalAuthProvider,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:14:  usePortalAuth,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:15:} from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:16:import { PortalAuthenticatedSurface } from "./portal-authenticated-surface";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:31:vi.mock("../auth/portal-auth-api", () => ({
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:32:  portalAuthApi: api,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:35:vi.mock("../auth/portal-auth-session", async (importOriginal) => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:37:    await importOriginal<typeof import("../auth/portal-auth-session")>();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:41:    logoutPortalSession: () =>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:49:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:51:  return <output data-testid="auth-status">{status}</output>;
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:58:      <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:60:          <PortalAuthProvider
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:62:              status: "authenticated",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:64:                clienteId: "cliente-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:65:                empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:71:            <PortalAuthenticatedSurface />
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:72:          </PortalAuthProvider>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:74:      </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:93:describe("PortalAuthenticatedSurface", () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:94:  it("exposes only the neutral authenticated Portal surface", () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:104:  it("logs out the current client session and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:116:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:125:  it("logs out all client sessions and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:139:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:173:  it("cleans the local session even when the server logout fails", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:185:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:7:import { portalAuthApi } from "../auth/portal-auth-api";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:8:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:9:import { clearPortalPrivateQueries } from "../auth/portal-auth-cache";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:15:export function PortalAuthenticatedSurface() {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:18:  const { clearSession, logoutSession } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:36:        await portalAuthApi.logoutAll();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:38:        await logoutSession();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:48:      clearSession();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:58:        aria-labelledby="portal-authenticated-heading"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:60:        data-testid="portal-authenticated-surface"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:70:            id="portal-authenticated-heading"
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:4:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:14:    <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:16:    </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:9:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:10:import { portalAuthApi } from "../auth/portal-auth-api";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:11:import { PORTAL_FIRST_ACCESS_PATH } from "../auth/portal-auth-routing";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:12:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:30:vi.mock("../auth/portal-auth-context", () => ({
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:31:  usePortalAuth: vi.fn(),
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:34:vi.mock("../auth/portal-auth-api", () => ({
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:35:  portalAuthApi: {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:41:  ReturnType<typeof portalAuthApi.me>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:50:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:58:const usePortalAuthMock = vi.mocked(usePortalAuth);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:59:const meMock = vi.mocked(portalAuthApi.me);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:71:  usePortalAuthMock.mockReturnValue({
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:72:    status: "authenticated",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:74:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:75:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:78:  } as ReturnType<typeof usePortalAuth>);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:86:  <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:88:  </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:107:  <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:109:  </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:120:    usePortalAuthMock.mockReturnValue({
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:123:    } as ReturnType<typeof usePortalAuth>);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:126:  <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:128:  </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:144:  <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:146:  </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:6:import { portalAuthApi } from "../auth/portal-auth-api";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:7:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:11:} from "../auth/portal-auth-routing";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:17:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:72:    void portalAuthApi
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:104:    await portalAuthApi.acceptTerms({ aceitouTermos: true });
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:3:import { useTenant } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:4:import { PortalOtpRequestForm as OtpRequestComponent } from "@/features/portal/auth/portal-otp-request";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:5:import { usePortalAuth } from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:6:import { PortalAuthRouteOrchestrator } from "@/features/portal/auth/portal-auth-route-orchestrator";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:13:import { PortalAuthenticatedSurface } from "@/features/portal/pages/portal-authenticated-surface";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:16:  const { tenant } = useTenant();
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:22:      data-portal-auth-surface="otp"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:43:              Acesso seguro ├á ├írea de {tenant.name}.
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:58:            asset={portalAssets.auth.otpIllustration}
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:72:function PortalAuthRestoringState() {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:87:function PortalAuthDeniedState() {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:103:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:110:    return <PortalAuthRestoringState />;
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:114:    return <PortalAuthDeniedState />;
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:118:    <PortalAuthRouteOrchestrator>
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:119:      <PortalAuthenticatedSurface />
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:120:    </PortalAuthRouteOrchestrator>
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:5:import { PortalPrivateRoute } from "@/features/portal/auth/portal-private-route";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:4:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:14:    <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:16:    </TenantProvider>,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:13:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:15:  PortalAuthBoundary,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:16:  PortalAuthProvider,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:17:  usePortalAuth,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:18:} from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:24:  portalQueryKeys,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:34:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:35:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:39:function AuthQueryProbe() {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:40:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:44:    <output data-testid="auth-query-state">
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:52:    <PortalAuthBoundary
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:58:    </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:73:  it("composes the real route with PortalAuthProvider, PortalShell and Tenant", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:75:      <TenantProvider>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:79:      </TenantProvider>,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:95:  it("connects authenticated client state to private query gating and boundaries", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:97:      <PortalAuthProvider
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:99:          status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:103:        <AuthQueryProbe />
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:105:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:108:    expect(screen.getByTestId("auth-query-state")).toHaveTextContent(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:109:      "authenticated:true",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:121:  it("connects an API access rejection to auth cleanup and cache removal", async () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:123:    const privateKey = portalQueryKeys.privateResource("profile");
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:131:        <PortalAuthProvider
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:133:            status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:137:          <AuthQueryProbe />
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:139:        </PortalAuthProvider>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:144:      expect(screen.getByTestId("auth-query-state")).toHaveTextContent(
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:179:      <TenantProvider>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:180:        <PortalAuthProvider
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:186:          <PortalAuthBoundary
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:190:          </PortalAuthBoundary>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:191:        </PortalAuthProvider>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:192:      </TenantProvider>,
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:8:  portalClientQueryKeys,
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:11:describe("portalClientQueryKeys", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:13:    expect(portalClientQueryKeys.all()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:17:    expect(portalClientQueryKeys.dashboard()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:22:    expect(portalClientQueryKeys.profile()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:27:    expect(portalClientQueryKeys.history()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:34:  it("nao inclui identidade ou tenant arbitrario nas keys", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:36:      portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:37:      portalClientQueryKeys.profile(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:38:      portalClientQueryKeys.history(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:41:    expect(serialized).not.toContain("clienteId");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:42:    expect(serialized).not.toContain("empresaId");
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
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:17:  agendamentos: {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:54:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:62:      agendamentos: {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:2:  PortalAppointmentSummary,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:6:export type PortalDashboardAppointmentViewModel =
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:10:    status: PortalAppointmentSummary["status"];
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:20:  proximos: readonly PortalDashboardAppointmentViewModel[];
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:21:  ultimo: PortalDashboardAppointmentViewModel | null;
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:24:function mapAppointment(
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:25:  value: PortalAppointmentSummary,
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:26:): PortalDashboardAppointmentViewModel {
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:44:    proximos: value.agendamentos.proximos.map(mapAppointment),
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:45:    ultimo: value.agendamentos.ultimo
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:46:      ? mapAppointment(value.agendamentos.ultimo)
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:12:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:21:    expect(JSON.stringify(options.queryKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:28:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:4:import { portalClientQueryKeys } from "./portal-client-query-keys";
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:12:    queryKey: portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:13:    queryFn: () => getPortalDashboard(),
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:4:import type { PortalAuthState } from "../auth/portal-auth";
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:6:  PortalAuthProvider,
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:7:  usePortalAuth,
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:8:} from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:16:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:17:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:22:  requiresAuthentication,
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:24:  requiresAuthentication: boolean;
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:26:  const enabled = usePortalQueryGate(requiresAuthentication);
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:27:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:37:  it("blocks private queries until the client is authenticated", () => {
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:38:    const anonymousState: PortalAuthState = {
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:44:      <PortalAuthProvider initialState={anonymousState}>
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:45:        <QueryGateProbe requiresAuthentication />
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:46:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:56:      <PortalAuthProvider
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:58:          status: "authenticated",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:62:        <QueryGateProbe requiresAuthentication />
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:63:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:67:      "authenticated:true",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:71:  it("allows public queries after the auth surface settles", () => {
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:73:      <PortalAuthProvider
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:76:        <QueryGateProbe requiresAuthentication={false} />
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:77:      </PortalAuthProvider>,
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:6:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:13:  requiresAuthentication = true,
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:15:  const { status } = usePortalAuth();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:17:  return portalQueryEnabled(status, requiresAuthentication);
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:22:  const { markAnonymous, markDenied } = usePortalAuth();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:9:  portalQueryKeys,
beauty-core-ui/src/features/portal/query/portal-query.test.ts:14:  it("creates stable public and private namespaces without tenant selection", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:15:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:16:    const privateKey = portalQueryKeys.privateResource("profile", "current");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:18:    expect(publicKey).toEqual(["portal", "public", "tenant"]);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:25:    expect(JSON.stringify(publicKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:26:    expect(JSON.stringify(privateKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:29:  it("gates private queries exclusively for authenticated clients", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:34:    expect(portalQueryEnabled("authenticated", true)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:41:    expect(portalQueryEnabled("authenticated", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:47:    const privateKey = portalQueryKeys.privateResource("profile");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:48:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:59:  it("maps 401 and 403 to safe auth transitions", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:67:    const privateKey = portalQueryKeys.privateResource("history");
beauty-core-ui/src/features/portal/query/portal-query.ts:3:import type { PortalAuthStatus } from "../auth/portal-auth";
beauty-core-ui/src/features/portal/query/portal-query.ts:5:export const portalQueryKeys = {
beauty-core-ui/src/features/portal/query/portal-query.ts:8:  public: () => [...portalQueryKeys.all, "public"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:10:  private: () => [...portalQueryKeys.all, "private"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:15:  ) => [...portalQueryKeys.public(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:20:  ) => [...portalQueryKeys.private(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:24:  status: PortalAuthStatus,
beauty-core-ui/src/features/portal/query/portal-query.ts:25:  requiresAuthentication: boolean,
beauty-core-ui/src/features/portal/query/portal-query.ts:27:  if (requiresAuthentication) {
beauty-core-ui/src/features/portal/query/portal-query.ts:28:    return status === "authenticated";
beauty-core-ui/src/features/portal/query/portal-query.ts:33:    status === "authenticated" ||
beauty-core-ui/src/features/portal/query/portal-query.ts:42:    queryKey: portalQueryKeys.private(),
beauty-core-ui/src/features/portal/query/portal-query.ts:46:    queryKey: portalQueryKeys.private(),
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:59:      "https://evil.example/?token=secret&clienteId=private";
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:66:    expect(result).not.toContain("clienteId");
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
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:151:      asset={portalAssets.auth.accessUnavailable}
``

## 8. Auditorias obrigatórias dos próximos blocos

1. Contratos e tipos de agendamentos.
2. Serviços HTTP e adapters.
3. Schemas e normalização.
4. Query keys e query options.
5. Auth, sessão e autorização.
6. Isolamento por cliente e tenant.
7. Suporte real a fidelidade.
8. Suporte real a benefícios.
9. Suporte real a pacotes e consumo.
10. Rotas autenticadas.
11. Componentes, tokens e assets existentes.
12. Testes unitários, integração e E2E.
13. Acessibilidade e mobile-first.
14. Cache, invalidação e performance.
15. Documentação e release gate.

## 9. Decisão

Esta auditoria não altera o backend e não executa commit, push, tag ou deploy.

O Chat 62 será executado em exatamente 15 blocos:

- 01/15
- 02/15
- 03/15
- 04/15
- 05/15
- 06/15
- 07/15
- 08/15
- 09/15
- 10/15
- 11/15
- 12/15
- 13/15
- 14/15
- 15/15

Não serão utilizados sub-blocos, microblocos ou blocos corretivos adicionais.
