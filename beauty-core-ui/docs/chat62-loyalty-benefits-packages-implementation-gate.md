# Beauty Core 1.0 — Chat 62

## BLOCO 13/15 — Gate de Fidelidade, Benefícios, Pacotes e Consumo

- Data: 2026-09-05 23:19:35 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Confirmar o suporte real existente no frontend para fidelidade, benefícios, pacotes e consumo/saldo, sem inventar endpoints, contratos ou operações de escrita.

## 2. Fidelidade

### Arquivos

- `src\features\fidelidade\schemas\fidelidade.schemas.test.ts`
- `src\features\fidelidade\schemas\fidelidade.schemas.ts`
- `src\features\fidelidade\services\fidelidade-api.test.ts`
- `src\features\fidelidade\services\fidelidade-api.ts`
- `src\features\fidelidade\services\fidelidade-programa-api.test.ts`
- `src\features\fidelidade\services\fidelidade-programa-api.ts`

### Ocorrências contratuais

Quantidade: 36

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:60:  loyalty: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:62:      src: "/images/portal/loyalty/portal-loyalty.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:131:  | (typeof portalAssets)["loyalty"]["illustration"]
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:160:  it("consulta me e aceita termos pelos endpoints privados reais", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:54:      return "O acesso ao Portal do cliente est├í indispon├¡vel.";
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:160:    mocks.logout.mockRejectedValue(new Error("Servidor indispon├¡vel"));
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:163:      "Servidor indispon├¡vel",
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:58:      return "O acesso ao portal est├í indispon├¡vel para esta empresa.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:341:        "O acesso ao portal est├í indispon├¡vel para esta empresa.",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:64:      return "O acesso ao portal est├í indispon├¡vel para esta empresa.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:79:      return "O acesso ao portal est├í indispon├¡vel para esta empresa.";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:217:    expect(screen.queryByText(/pontos|saldo|total/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:248:        name: "Acesso ao Portal indisponivel",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:47:          title="Acesso ao Portal indisponivel"
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:75:            title="Acesso ao Portal indisponivel"
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:85:        description="Nenhum item disponivel."
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:15:  "PONTOS",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:121:      .getByRole("heading", { name: "Acesso indispon├¡vel" })
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:96:        title="Acesso indispon├¡vel"
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:54:      deniedFallback={<p>superficie indisponivel</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:223:        description="Nenhum resultado disponivel."
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:37:    pontosAtuais: 120,
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:38:    nivelAtual: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:39:      id: "nivel-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:117:        fidelidade: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:119:          saldoPontos: 999,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:21:export const PORTAL_CLIENT_ENDPOINTS = {
beauty-core-ui/src/features/portal/services/portal-client-api.ts:29:    PORTAL_CLIENT_ENDPOINTS.dashboard,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:37:    PORTAL_CLIENT_ENDPOINTS.profile,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:48:    PORTAL_CLIENT_ENDPOINTS.profile,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:57:    PORTAL_CLIENT_ENDPOINTS.history,
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:42:          description="A conexao atual nao esta disponivel."
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:43:          title="Conexao indisponivel"
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:53:          title="Acesso indisponivel"
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:71:      screen.getByRole("heading", { name: "Conexao indisponivel" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:79:      screen.getByRole("heading", { name: "Acesso indisponivel" }),
``

### Ocorrências HTTP

Quantidade: 9

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:62:      src: "/images/portal/loyalty/portal-loyalty.webp",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:160:  it("consulta me e aceita termos pelos endpoints privados reais", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
beauty-core-ui/src/features/portal/services/portal-client-api.ts:21:export const PORTAL_CLIENT_ENDPOINTS = {
beauty-core-ui/src/features/portal/services/portal-client-api.ts:29:    PORTAL_CLIENT_ENDPOINTS.dashboard,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:37:    PORTAL_CLIENT_ENDPOINTS.profile,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:48:    PORTAL_CLIENT_ENDPOINTS.profile,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:57:    PORTAL_CLIENT_ENDPOINTS.history,
``

## 3. Benefícios

### Arquivos

Nenhum arquivo localizado.

### Ocorrências contratuais

Quantidade: 4

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:27:  benefits: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:125:  | (typeof portalAssets)["benefits"]["illustration"]
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:124:        beneficios: [{ empresaId: "empresa-secreta" }],
``

### Ocorrências HTTP

Quantidade: 3

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
``

## 4. Pacotes

### Arquivos

- `src\features\pacotes\schemas\pacotes.schemas.test.ts`
- `src\features\pacotes\schemas\pacotes.schemas.ts`
- `src\features\pacotes\services\pacotes-api.test.ts`
- `src\features\pacotes\services\pacotes-api.ts`

### Ocorrências contratuais

Quantidade: 6

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:80:  packages: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:82:      src: "/images/portal/packages/portal-packages.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:135:  | (typeof portalAssets)["packages"]["illustration"]
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:16:  "PACOTE",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:43:    pacotesAtivos: [],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:121:        pacotes: {
``

### Ocorrências HTTP

Quantidade: 3

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:82:      src: "/images/portal/packages/portal-packages.webp",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
``

## 5. Consumo e saldo

### Arquivos

- `src\features\auth\services\auth-session.test.ts`
- `src\features\auth\services\auth-session.ts`
- `src\features\portal\auth\portal-auth-context-session.test.tsx`
- `src\features\portal\auth\portal-auth-session.test.ts`
- `src\features\portal\auth\portal-auth-session.ts`

### Ocorrências contratuais

Quantidade: 19

``text
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:192:      "usePortalAuth deve ser utilizado dentro de PortalAuthProvider.",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:39:  logoutAllPortalSessions,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:174:    await logoutAllPortalSessions();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:307:export async function logoutAllPortalSessions(): Promise<
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:217:    expect(screen.queryByText(/pontos|saldo|total/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:89:    message: "Todas as sess├Áes foram encerradas com sucesso.",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:125:  it("logs out all client sessions and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:133:      screen.getByRole("button", { name: "Encerrar todas as sess├Áes" }),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:43:          ? "N├úo foi poss├¡vel confirmar o encerramento das sess├Áes."
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:109:              ? "Encerrando sess├Áes..."
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:110:              : "Encerrar todas as sess├Áes"}
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:119:          saldoPontos: 999,
beauty-core-ui/src/services/auth/token-storage.ts:13:function canUseSessionStorage(): boolean {
beauty-core-ui/src/services/auth/token-storage.ts:18:  if (!canUseSessionStorage()) {
beauty-core-ui/src/services/auth/token-storage.ts:23:    return window.sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
beauty-core-ui/src/services/auth/token-storage.ts:30:  if (!canUseSessionStorage()) {
beauty-core-ui/src/services/auth/token-storage.ts:35:    window.sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
beauty-core-ui/src/services/auth/token-storage.ts:42:  if (!canUseSessionStorage()) {
beauty-core-ui/src/services/auth/token-storage.ts:47:    window.sessionStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
``

### Ocorrências HTTP

Quantidade: 2

``text
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
``

## 6. Mutations

Quantidade de ocorrências candidatas: 77

``text
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:5:    post: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:8:    post: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:46:    mocks.publicClient.post.mockResolvedValueOnce(response);
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:53:    expect(mocks.publicClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:61:      JSON.stringify(mocks.publicClient.post.mock.calls[0][1]),
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:66:    mocks.publicClient.post.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:94:    expect(mocks.publicClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:108:    mocks.publicClient.post.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:119:    expect(mocks.publicClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:128:    mocks.apiClient.post.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:138:    expect(mocks.apiClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:147:    mocks.apiClient.post.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:155:    expect(mocks.apiClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:174:    mocks.apiClient.post.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:194:    expect(mocks.apiClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:28:    const response = await getPublicApiClient().post<PortalOtpRequestResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:41:    const response = await getPublicApiClient().post<PortalVerifyOtpResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:56:      await getPublicApiClient().post<PortalRefreshTokenResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:69:    const response = await getApiClient().post<PortalLogoutResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:80:    const response = await getApiClient().post<PortalLogoutResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:99:      await getApiClient().post<PortalTermsAcceptanceResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:59:  const [state, dispatch] = useReducer(
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:67:    dispatch({ type: "restore" });
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:71:    dispatch({ type: "anonymous" });
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:76:      dispatch({
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:85:    dispatch({ type: "denied" });
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:90:    dispatch({ type: "clear" });
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:34:  it("classifica falha sem resposta como network", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:75:    let cancelled = false;
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:78:      if (cancelled) {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:100:        cancelled = true;
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:117:        if (!cancelled) {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:126:      cancelled = true;
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:7:  PortalProfileUpdateInput,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:13:  portalProfileUpdateInputSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:106:export function normalizePortalProfileUpdate(
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:107:  value: PortalProfileUpdateInput,
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:108:): PortalProfileUpdateInput {
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts:110:    portalProfileUpdateInputSchema.parse(value);
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:6:  "CANCELADO",
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:32:export type PortalProfileUpdateInput = Readonly<{
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:73:export const portalProfileUpdateInputSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:109:export type PortalProfileUpdateInputParsed = z.infer<
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:110:  typeof portalProfileUpdateInputSchema
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:174:    api.logout.mockRejectedValue(new Error("resposta interna da API"));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:196:      "resposta interna da API",
beauty-core-ui/src/features/portal/query/portal-query.ts:41:  void queryClient.cancelQueries({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:12:    patch: vi.fn(),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:24:  updatePortalProfile,
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:215:    mocks.apiClient.patch.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:219:    await updatePortalProfile({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:224:    expect(mocks.apiClient.patch).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:232:      JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:235:      JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:241:      updatePortalProfile({}),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:245:      updatePortalProfile({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:250:    expect(mocks.apiClient.patch).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:253:  it("falha com resposta de perfil que nao atende ao contrato", async () => {
beauty-core-ui/src/features/portal/services/portal-client-api.ts:9:  PortalProfileUpdateInput,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:15:  normalizePortalProfileUpdate,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:43:export async function updatePortalProfile(
beauty-core-ui/src/features/portal/services/portal-client-api.ts:44:  input: PortalProfileUpdateInput,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:46:  const payload = normalizePortalProfileUpdate(input);
beauty-core-ui/src/features/portal/services/portal-client-api.ts:47:  const response = await getApiClient().patch<unknown>(
beauty-core-ui/src/features/portal/services/portal-client-api.ts:66:  updateProfile: updatePortalProfile,
beauty-core-ui/src/services/api/api-client.ts:9:import { dispatchAdminForbiddenEvent } from "@/services/auth/access-events";
beauty-core-ui/src/services/api/api-client.ts:64:      headers.delete("Authorization");
beauty-core-ui/src/services/api/api-client.ts:99:        dispatchAdminForbiddenEvent();
beauty-core-ui/src/services/auth/access-events.test.ts:10:  dispatchAdminForbiddenEvent,
beauty-core-ui/src/services/auth/access-events.test.ts:22:    dispatchAdminForbiddenEvent();
beauty-core-ui/src/services/auth/access-events.ts:4:export function dispatchAdminForbiddenEvent():
beauty-core-ui/src/services/auth/access-events.ts:10:  window.dispatchEvent(
beauty-core-ui/src/services/auth/refresh-coordinator.ts:13:function dispatchSessionExpiredEvent(): void {
beauty-core-ui/src/services/auth/refresh-coordinator.ts:18:  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
beauty-core-ui/src/services/auth/refresh-coordinator.ts:28:    dispatchSessionExpiredEvent();
beauty-core-ui/src/services/auth/refresh-coordinator.ts:34:    const response = await publicClient.post<RefreshTokenResponse>(
beauty-core-ui/src/services/auth/refresh-coordinator.ts:48:    dispatchSessionExpiredEvent();
``

Ocorrências textuais de mutation não comprovam suporte funcional. Cada método deverá ser confirmado manualmente antes de ser utilizado.

## 7. Critérios de suporte

Um domínio somente será considerado SUPORTADO quando possuir:

1. contrato tipado;
2. schema de validação;
3. adapter de resposta;
4. serviço HTTP real;
5. query ou mutation compatível;
6. isolamento por cliente e sessão;
7. estados de erro e vazio;
8. testes específicos.

## 8. Matriz de decisão

| Domínio | Arquivos | Contratos | HTTP | Decisão inicial |
|---|---:|---:|---:|---|
| Fidelidade | 6 | 36 | 9 | Confirmar manualmente |
| Benefícios | 0 | 4 | 3 | Confirmar manualmente |
| Pacotes | 4 | 6 | 3 | Confirmar manualmente |
| Consumo/saldo | 5 | 19 | 2 | Confirmar manualmente |

## 9. Restrições

- Nenhuma tela funcional criada.
- Nenhum endpoint criado.
- Nenhuma mutation criada.
- Nenhum contrato inventado.
- Nenhuma alteração no backend.
- Nenhum dado fictício persistente.
- Nenhuma funcionalidade dos Chats 63 e 64 antecipada.
- Nenhum commit, push, tag ou deploy executado.

## 10. Próximo bloco

O BLOCO 14/15 deverá consolidar o plano de implementação permitido, separando funcionalidades suportadas, somente leitura, bloqueadas e dependentes do backend.
