# Beauty Core 1.0 — Chat 62

## BLOCO 08/15 — Auditoria de Performance, Bundle e Assets

- Data: 2026-09-05 23:13:27 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Auditar carregamento, imagens, cache, requisições, dependências e riscos de performance antes da implementação das telas do Chat 62.

Nenhuma otimização ou alteração de código foi realizada neste bloco.

## 2. Carregamento e code splitting

Quantidade de ocorrências: 100

``text
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:1:import { Suspense } from "react";
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:7:    <Suspense
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:19:    </Suspense>
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:34:      expect(asset.src).toMatch(/^\/images\/portal\//);
beauty-core-ui/src/features/portal/assets/portal-assets.ts:8:      src: "/images/portal/appointments/portal-appointments.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:13:      src: "/images/portal/auth/portal-access-unavailable.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:16:      src: "/images/portal/auth/portal-first-access.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:19:      src: "/images/portal/auth/portal-otp-illustration.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:24:      src: "/images/portal/backgrounds/portal-background.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:34:      src: "/images/portal/dashboard/portal-dashboard.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:39:      src: "/images/portal/hero/portal-hero.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:44:      src: "/images/portal/history/portal-history.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:49:      src: "/images/portal/identity/portal-key-visual.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:54:      src: "/images/portal/legal/portal-privacy.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:57:      src: "/images/portal/legal/portal-terms.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:62:      src: "/images/portal/loyalty/portal-loyalty.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:67:      src: "/images/portal/messages/portal-messages.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:72:      src: "/images/portal/notifications/portal-notifications.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:77:      src: "/images/portal/onboarding/portal-onboarding.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:82:      src: "/images/portal/packages/portal-packages.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:87:      src: "/images/portal/placeholders/portal-placeholder.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:92:      src: "/images/portal/profile/portal-profile.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:97:      src: "/images/portal/pwa/portal-app-icon.png",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:100:      src: "/images/portal/pwa/portal-pwa-splash.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:105:      src: "/images/portal/states/portal-empty-state.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:108:      src: "/images/portal/states/portal-error-state.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:111:      src: "/images/portal/states/portal-offline.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:114:      src: "/images/portal/states/portal-success.webp",
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:132:  useEffect(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:74:  useEffect(() => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:166:            placeholder="(83) 99999-9999"
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:14:  PortalLoadingState,
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:31:  useEffect(() => {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:44:        <PortalLoadingState
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:6:import { PortalAssetImage } from "./portal-asset-image";
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:8:describe("PortalAssetImage", () => {
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:11:      <PortalAssetImage
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:15:        sizes="(max-width: 768px) 100vw, 768px"
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:20:    const image = screen.getByAltText("Visual principal do Portal");
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:21:    const src = image.getAttribute("src");
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:25:      "/images/portal/identity/portal-key-visual.webp",
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:31:      <PortalAssetImage
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx:36:        sizes="100vw"
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:1:import Image from "next/image";
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:5:type PortalAssetImageProps = {
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:12:  priority?: boolean;
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:16:export function PortalAssetImage({
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:23:  priority = false,
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:25:}: PortalAssetImageProps) {
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:27:    <Image
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:31:      priority={priority}
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx:32:      sizes={sizes}
beauty-core-ui/src/features/portal/components/portal-branding.tsx:3:import Image from "next/image";
beauty-core-ui/src/features/portal/components/portal-branding.tsx:19:        <Image
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:17:  PortalLoadingState,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:34:        <PortalLoadingState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:56:        <PortalLoadingState
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:117:        <PortalLoadingState
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:37:function imageSourceFrom(element: Element | null | undefined): string {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:76:    const image = surface?.querySelector("img");
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:78:    expect(image).not.toBeNull();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:79:    expect(imageSourceFrom(image)).toContain(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:132:    const deniedImage = deniedState?.querySelector("img");
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:134:    expect(deniedImage).not.toBeNull();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:135:    expect(imageSourceFrom(deniedImage)).toContain(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:25:  useEffect(() => {
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:2:import { PortalAssetImage } from "../components/portal-asset-image";
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:15:        <PortalAssetImage
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:20:          priority
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx:21:          sizes="(max-width: 768px) 100vw, 768px"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:7:import { PortalAssetImage } from "@/features/portal/components/portal-asset-image";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:11:  PortalLoadingState,
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:56:          <PortalAssetImage
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:62:            priority
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:63:            sizes="(max-width: 1024px) 100vw, 50vw"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:79:      <PortalLoadingState
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:24:    const image = screen.getByRole("img", {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:28:    expect(decodeURIComponent(image.getAttribute("src") ?? "")).toContain(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:29:      "/images/portal/legal/portal-terms.webp",
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:6:import { PortalAssetImage } from "../components/portal-asset-image";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:65:            <PortalAssetImage
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:70:              priority
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:71:              sizes="(max-width: 1024px) 100vw, 45vw"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:100:          <PortalAssetImage
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:105:            priority
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:106:            sizes="(max-width: 1024px) 100vw, 45vw"
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:65:  useEffect(() => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:161:    const image = screen.getByAltText("Ilustracao de sucesso");
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:162:    const source = decodeURIComponent(image.getAttribute("src") ?? "");
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:18:  useEffect(() => {
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:13:  PortalLoadingState,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:26:        <PortalLoadingState
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:6:import { PortalAssetImage } from "../components/portal-asset-image";
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:9:  | "loading"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:16:type PortalAsset = ComponentProps<typeof PortalAssetImage>["asset"];
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:55:      <PortalAssetImage
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:60:        sizes="(max-width: 640px) 80vw, 320px"
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:95:export function PortalLoadingState(props: PortalStateContentProps) {
beauty-core-ui/src/features/portal/states/portal-state-views.tsx:100:      kind="loading"
``

## 3. Cache e requisições

Quantidade de ocorrências: 20

``text
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:4:  queryClient.removeQueries({
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:96:        retry: false,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:220:  it("renders a safe server error state with retry", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:5:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:17:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:18:    expect(options.retry).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:19:    expect(options.refetchOnWindowFocus).toBe(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:20:    expect(options.staleTime).toBe(PORTAL_DASHBOARD_STALE_TIME);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:9:  enabled: boolean,
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:15:    staleTime: PORTAL_DASHBOARD_STALE_TIME,
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:16:    retry: false,
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:17:    refetchOnWindowFocus: false,
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:4:import { useQuery } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:16:  const query = useQuery(portalDashboardQueryOptions(enabled));
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:4:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:21:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/query/portal-query.ts:41:  void queryClient.cancelQueries({
beauty-core-ui/src/features/portal/query/portal-query.ts:45:  queryClient.removeQueries({
``

## 4. Assets

Quantidade total de assets: 50

Tamanho total: 37.62 MB

Maiores assets:

- `public\images\portal\identity\source\portal-key-visual-source.png` — 1736.37 KB — .png
- `public\images\portal\messages\source\portal-messages-source.png` — 1666.15 KB — .png
- `public\images\portal\benefits\source\portal-benefits-source.png` — 1605.25 KB — .png
- `public\images\portal\loyalty\source\portal-loyalty-source.png` — 1604.4 KB — .png
- `public\images\portal\auth\source\portal-otp-illustration-source.png` — 1585.44 KB — .png
- `public\images\portal\profile\source\portal-profile-source.png` — 1565.42 KB — .png
- `public\images\portal\dashboard\source\portal-dashboard-source.png` — 1559.61 KB — .png
- `public\images\portal\pwa\source\portal-app-icon-source.png` — 1550.67 KB — .png
- `public\images\portal\packages\source\portal-packages-source.png` — 1530.76 KB — .png
- `public\images\portal\auth\source\portal-first-access-source.png` — 1521.82 KB — .png
- `public\images\portal\auth\source\portal-access-unavailable-source.png` — 1502.39 KB — .png
- `public\images\portal\legal\source\portal-terms-source.png` — 1498.31 KB — .png
- `public\images\portal\appointments\source\portal-appointments-source.png` — 1486.88 KB — .png
- `public\images\portal\notifications\source\portal-notifications-source.png` — 1460.61 KB — .png
- `public\images\portal\history\source\portal-history-source.png` — 1438.75 KB — .png
- `public\images\portal\legal\source\portal-privacy-source.png` — 1414.7 KB — .png
- `public\images\portal\states\source\portal-offline-source.png` — 1412.25 KB — .png
- `public\images\portal\states\source\portal-success-source.png` — 1378.15 KB — .png
- `public\images\portal\backgrounds\source\portal-background-source.png` — 1317.93 KB — .png
- `public\images\portal\hero\source\portal-hero-source.png` — 1313.17 KB — .png

Nenhum asset foi reprocessado neste Chat 62.

## 5. Scripts e dependências

Quantidade de dependências declaradas: 35

- `dev: next dev`
- `build: next build`
- `start: next start`
- `lint: eslint --max-warnings=0`
- `test: vitest run`
- `test:watch: vitest`
- `test:coverage: vitest run --coverage`
- `test:e2e: playwright test`
- `test:e2e:ui: playwright test --ui`
- `typecheck: tsc --noEmit`
- `validate: npm run test:coverage && npm run lint && npm run typecheck && npm run build && npm run test:e2e && npm audit`

## 6. Riscos de performance para revisão

Quantidade de ocorrências: 29

``text
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:19:  return Object.values(value).flatMap(flattenAssets);
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts:27:    expect(new Set(assets.map((asset) => asset.src)).size).toBe(25);
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:61:      JSON.stringify(mocks.publicClient.post.mock.calls[0][1]),
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:210:      JSON.stringify(portalAuthQueryKeys.me()),
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:47:    JSON.stringify(payload),
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:53:    parsed = JSON.parse(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:119:  } as unknown as ReturnType<typeof usePortalAuth>);
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:26:  const safeItems = items.filter(
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:41:          {safeItems.map((item) => {
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:67:          {safeItems.map((item) => {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:78:      proximos: parsed.agendamentos.proximos.map(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:96:  return parsed.map(
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:35:    const serialized = JSON.stringify([
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:54:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:55:    expect(JSON.stringify(result)).not.toContain("preco");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:56:    expect(JSON.stringify(result)).not.toContain("observacoes");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:44:    proximos: value.agendamentos.proximos.map(mapAppointment),
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:21:    expect(JSON.stringify(options.queryKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:25:    expect(JSON.stringify(publicKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:26:    expect(JSON.stringify(privateKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:105:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:106:    expect(JSON.stringify(result)).not.toContain("ultimoAcessoPortal");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:160:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:161:    expect(JSON.stringify(result)).not.toContain("preco");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:210:    expect(JSON.stringify(result)).not.toContain("cliente-secreto");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:211:    expect(JSON.stringify(result)).not.toContain("mensagem privada");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:232:      JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:235:      JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:83:      document.querySelectorAll("[data-portal-state]"),
``

As ocorrências acima são pontos de revisão e não representam automaticamente falhas.

## 7. Critérios obrigatórios

| Área | Critério |
|---|---|
| Renderização | Evitar trabalho síncrono desnecessário |
| Rede | Evitar chamadas duplicadas |
| Imagens | Usar dimensões, sizes e lazy loading adequados |
| Cache | Isolar dados privados |
| Bundle | Evitar dependências desnecessárias |
| Queries | Usar enabled, retry e invalidação corretamente |
| Mobile | Priorizar conteúdo essencial |
| Erros | Evitar loops de retry |

## 8. Restrições

- Nenhuma otimização de produção aplicada.
- Nenhum asset alterado.
- Nenhum endpoint criado.
- Nenhuma alteração no backend.
- Nenhum cache privado exposto.
- Nenhuma funcionalidade dos Chats 63 e 64 antecipada.
- Nenhum commit, push, tag ou deploy executado.

## 9. Próximo bloco

O BLOCO 09/15 deverá auditar a estrutura de componentes e definir a composição das superfícies de agendamentos, fidelidade, benefícios e pacotes.
