# Beauty Core 1.0 — Chat 62
## BLOCO 04/15 — Auditoria de Serviços, Queries e Cache

- Data: 2026-09-05 23:07:32 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Mapear os serviços HTTP e a fundação TanStack Query existente para determinar como os domínios do Chat 62 poderão ser integrados sem quebrar autenticação, tenant, sessão ou cache privado.

Este bloco não implementa novas funcionalidades.

## 2. Arquivos candidatos

- `e2e\chat49-clientes.spec.ts`
- `e2e\fixtures\chat49-clientes.fixture.ts`
- `public\images\empty-states\beauty-core-clientes-empty.webp`
- `public\images\empty-states\beauty-core-clientes-empty-source.png`
- `src\features\agendamentos\agendamentos-cache-hardening.test.ts`
- `src\features\agendamentos\queries\agendamentos-keys.ts`
- `src\features\agendamentos\queries\agendamentos-options-query-options.ts`
- `src\features\agendamentos\queries\agendamentos-query-options.test.ts`
- `src\features\agendamentos\queries\agendamentos-query-options.ts`
- `src\features\agendamentos\schemas\agendamentos-api.schemas.ts`
- `src\features\agendamentos\services\agendamentos-api.test.ts`
- `src\features\agendamentos\services\agendamentos-api.ts`
- `src\features\agendamentos\services\agendamentos-create-api.test.ts`
- `src\features\agendamentos\services\agendamentos-options-api.test.ts`
- `src\features\agendamentos\services\agendamentos-options-api.ts`
- `src\features\agendamentos\services\agendamentos-status-api.test.ts`
- `src\features\agendamentos\services\agendamentos-update-api.test.ts`
- `src\features\agendamentos\types\agendamentos-api.types.ts`
- `src\features\arquivos\queries\arquivos-keys.ts`
- `src\features\arquivos\queries\arquivos-query-options.test.ts`
- `src\features\arquivos\queries\arquivos-query-options.ts`
- `src\features\arquivos\services\arquivos-api.test.ts`
- `src\features\arquivos\services\arquivos-api.ts`
- `src\features\arquivos\utils\arquivos-api-error.test.ts`
- `src\features\arquivos\utils\arquivos-api-error.ts`
- `src\features\arquivos\utils\arquivos-query-access.test.ts`
- `src\features\arquivos\utils\arquivos-query-access.ts`
- `src\features\auth\services\auth-api.ts`
- `src\features\automacoes\queries\automacoes-keys.ts`
- `src\features\automacoes\queries\automacoes-query-options.ts`
- `src\features\automacoes\services\automacoes-api.ts`
- `src\features\automacoes\services\automacoes-operacionais-api.test.ts`
- `src\features\chat56\admin-sessions-query-gating.test.ts`
- `src\features\clientes\components\cliente-form-dialog.integration.test.tsx`
- `src\features\clientes\components\cliente-form-dialog.tsx`
- `src\features\clientes\components\cliente-lgpd-actions.integration.test.tsx`
- `src\features\clientes\components\cliente-lgpd-actions.tsx`
- `src\features\clientes\components\cliente-profile-extras.integration.test.tsx`
- `src\features\clientes\components\cliente-profile-extras.tsx`
- `src\features\clientes\components\cliente-profile-view.integration.test.tsx`
- `src\features\clientes\components\cliente-profile-view.tsx`
- `src\features\clientes\components\clientes-list.tsx`
- `src\features\clientes\components\clientes-view.integration.test.tsx`
- `src\features\clientes\components\clientes-view.tsx`
- `src\features\clientes\forms\cliente-form.schema.test.ts`
- `src\features\clientes\forms\cliente-form.schema.ts`
- `src\features\clientes\forms\cliente-form.test.tsx`
- `src\features\clientes\forms\cliente-form.tsx`
- `src\features\clientes\forms\cliente-form-error.test.ts`
- `src\features\clientes\forms\cliente-form-error.ts`
- `src\features\clientes\forms\cliente-payload.test.ts`
- `src\features\clientes\forms\cliente-payload.ts`
- `src\features\clientes\permissions\clientes-permissions.test.ts`
- `src\features\clientes\permissions\clientes-permissions.ts`
- `src\features\clientes\queries\cliente-profile-keys.test.ts`
- `src\features\clientes\queries\cliente-profile-keys.ts`
- `src\features\clientes\queries\cliente-profile-query-options.test.ts`
- `src\features\clientes\queries\cliente-profile-query-options.ts`
- `src\features\clientes\queries\clientes-keys.test.ts`
- `src\features\clientes\queries\clientes-keys.ts`
- `src\features\clientes\queries\clientes-query-options.test.ts`
- `src\features\clientes\queries\clientes-query-options.ts`
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
- `src\features\clientes\types\cliente-profile-extras.types.ts`
- `src\features\clientes\types\clientes.types.ts`
- `src\features\clientes\utils\clientes-lgpd-download.ts`
- `src\features\clientes\utils\clientes-list-url.test.ts`
- `src\features\clientes\utils\clientes-list-url.ts`
- `src\features\configuracoes\queries\configuracoes-keys.ts`
- `src\features\configuracoes\services\configuracoes-api.test.ts`
- `src\features\configuracoes\services\configuracoes-api.ts`
- `src\features\dashboard\components\clients-overview.test.tsx`
- `src\features\dashboard\components\clients-overview.tsx`
- `src\features\dashboard\queries\dashboard-keys.test.ts`
- `src\features\dashboard\queries\dashboard-keys.ts`
- `src\features\dashboard\queries\dashboard-query-options.test.ts`
- `src\features\dashboard\queries\dashboard-query-options.ts`
- `src\features\dashboard\queries\dashboard-query-policy.test.ts`
- `src\features\dashboard\queries\dashboard-query-policy.ts`
- `src\features\dashboard\services\dashboard-api.test.ts`
- `src\features\dashboard\services\dashboard-api.ts`
- `src\features\dashboard\testing\dashboard-api-fixtures.ts`
- `src\features\fidelidade\beneficios\beneficios-api.test.ts`
- `src\features\fidelidade\beneficios\beneficios-api.ts`
- `src\features\fidelidade\cupons\cupons-api.test.ts`
- `src\features\fidelidade\cupons\cupons-api.ts`
- `src\features\fidelidade\hooks\use-fidelidade-cliente.ts`
- `src\features\fidelidade\operacoes\fidelidade-operacoes-api.test.ts`
- `src\features\fidelidade\operacoes\fidelidade-operacoes-api.ts`
- `src\features\fidelidade\queries\fidelidade-query-keys.test.ts`
- `src\features\fidelidade\queries\fidelidade-query-keys.ts`
- `src\features\fidelidade\queries\fidelidade-query-options.ts`
- `src\features\fidelidade\services\fidelidade-api.test.ts`
- `src\features\fidelidade\services\fidelidade-api.ts`
- `src\features\fidelidade\services\fidelidade-programa-api.test.ts`
- `src\features\fidelidade\services\fidelidade-programa-api.ts`
- `src\features\financeiro\queries\categorias-financeiras-query-options.test.ts`
- `src\features\financeiro\queries\categorias-financeiras-query-options.ts`
- `src\features\financeiro\queries\comissoes-query-options.test.ts`
- `src\features\financeiro\queries\comissoes-query-options.ts`
- `src\features\financeiro\queries\financeiro-keys.test.ts`
- `src\features\financeiro\queries\financeiro-keys.ts`
- `src\features\financeiro\queries\financeiro-query-options.test.ts`
- `src\features\financeiro\queries\financeiro-query-options.ts`
- `src\features\financeiro\queries\movimentacoes-financeiras-query-options.test.ts`
- `src\features\financeiro\queries\movimentacoes-financeiras-query-options.ts`
- `src\features\financeiro\queries\relatorios-financeiros-keys.ts`
- `src\features\financeiro\queries\relatorios-financeiros-query-options.test.ts`
- `src\features\financeiro\queries\relatorios-financeiros-query-options.ts`
- `src\features\financeiro\services\categorias-financeiras-api.test.ts`
- `src\features\financeiro\services\categorias-financeiras-api.ts`
- `src\features\financeiro\services\comissoes-api.test.ts`
- `src\features\financeiro\services\comissoes-api.ts`
- `src\features\financeiro\services\financeiro-api.test.ts`
- `src\features\financeiro\services\financeiro-api.ts`
- `src\features\financeiro\services\movimentacoes-financeiras-api.test.ts`
- `src\features\financeiro\services\movimentacoes-financeiras-api.ts`
- `src\features\financeiro\services\relatorios-financeiros-api.test.ts`
- `src\features\financeiro\services\relatorios-financeiros-api.ts`
- `src\features\financeiro\utils\financeiro-query.test.ts`
- `src\features\financeiro\utils\financeiro-query.ts`
- `src\features\notificacoes\queries\notificacoes-keys.ts`
- `src\features\notificacoes\queries\notificacoes-query-options.ts`
- `src\features\notificacoes\services\notificacoes-api.ts`
- `src\features\notificacoes\services\notificacoes-history-api.test.ts`
- `src\features\notificacoes\services\notificacoes-settings-api.test.ts`
- `src\features\pacotes\catalogo\pacotes-catalogo-api.test.ts`
- `src\features\pacotes\catalogo\pacotes-catalogo-api.ts`
- `src\features\pacotes\clientes-pacotes\cliente-pacote-form.schema.test.ts`
- `src\features\pacotes\clientes-pacotes\cliente-pacote-form.schema.ts`
- `src\features\pacotes\clientes-pacotes\cliente-pacote-form.tsx`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-api.test.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-api.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-permissions.test.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-permissions.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-url-state.test.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-url-state.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-view.test.tsx`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-view.tsx`
- `src\features\pacotes\clientes-pacotes\use-clientes-pacotes.ts`
- `src\features\pacotes\clientes-pacotes\use-clientes-pacotes-options.ts`
- `src\features\pacotes\queries\pacotes-query-keys.test.ts`
- `src\features\pacotes\queries\pacotes-query-keys.ts`
- `src\features\pacotes\queries\pacotes-query-options.ts`
- `src\features\pacotes\services\pacotes-api.test.ts`
- `src\features\pacotes\services\pacotes-api.ts`
- `src\features\portal\auth\portal-auth-api.test.ts`
- `src\features\portal\auth\portal-auth-api.ts`
- `src\features\portal\auth\portal-auth-cache.test.ts`
- `src\features\portal\auth\portal-auth-cache.ts`
- `src\features\portal\contracts\portal-client-adapters.ts`
- `src\features\portal\contracts\portal-client-contracts.ts`
- `src\features\portal\contracts\portal-client-schemas.ts`
- `src\features\portal\query\portal-client-query-keys.test.ts`
- `src\features\portal\query\portal-client-query-keys.ts`
- `src\features\portal\query\portal-dashboard-query.ts`
- `src\features\portal\query\portal-dashboard-query-options.test.ts`
- `src\features\portal\query\portal-dashboard-query-options.ts`
- `src\features\portal\query\portal-query.test.ts`
- `src\features\portal\query\portal-query.ts`
- `src\features\portal\query\portal-query-gate.test.tsx`
- `src\features\portal\query\portal-query-gate.ts`
- `src\features\portal\services\portal-client-api.test.ts`
- `src\features\portal\services\portal-client-api.ts`
- `src\features\profissionais\queries\profissionais-keys.ts`
- `src\features\profissionais\queries\profissionais-query-options.ts`
- `src\features\profissionais\services\profissionais-api.ts`
- `src\features\servicos\queries\servicos-keys.ts`
- `src\features\servicos\queries\servicos-query-options.ts`
- `src\features\servicos\services\servicos-api.ts`
- `src\features\unidades\queries\unidades-keys.ts`
- `src\features\unidades\queries\unidades-query-options.ts`
- `src\features\unidades\services\unidades-api.ts`
- `src\features\usuarios\queries\usuarios-keys.ts`
- `src\features\usuarios\queries\usuarios-query-options.ts`
- `src\features\usuarios\services\usuarios-api.ts`
- `src\features\whatsapp\queries\whatsapp-keys.ts`
- `src\features\whatsapp\queries\whatsapp-query-options.ts`
- `src\features\whatsapp\services\whatsapp-api.ts`
- `src\features\whatsapp\services\whatsapp-campaigns-api.test.ts`
- `src\features\whatsapp\services\whatsapp-messages-api.test.ts`
- `src\features\whatsapp\services\whatsapp-templates-api.test.ts`
- `src\providers\query-provider.tsx`
- `src\services\api\api.types.ts`
- `src\services\api\api-client.ts`
- `src\services\api\normalize-api-error.ts`

## 3. Serviços HTTP

Quantidade de ocorrências: 83

``text
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:7:  apiClient: {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:13:vi.mock("@/services/api/api-client", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:14:  getPublicApiClient: vi.fn(() => mocks.publicClient),
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:15:  getApiClient: vi.fn(() => mocks.apiClient),
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:128:    mocks.apiClient.post.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:138:    expect(mocks.apiClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:147:    mocks.apiClient.post.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:155:    expect(mocks.apiClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:161:    mocks.apiClient.get.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:174:    mocks.apiClient.post.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:190:    expect(mocks.apiClient.get).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:194:    expect(mocks.apiClient.post).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:2:  getApiClient,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:3:  getPublicApiClient,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:4:} from "@/services/api/api-client";
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:28:    const response = await getPublicApiClient().post<PortalOtpRequestResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:35:    return response.data;
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:41:    const response = await getPublicApiClient().post<PortalVerifyOtpResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:49:    return response.data;
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:56:      await getPublicApiClient().post<PortalRefreshTokenResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:63:    return response.data;
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:69:    const response = await getApiClient().post<PortalLogoutResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:76:    return response.data;
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:80:    const response = await getApiClient().post<PortalLogoutResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:84:    return response.data;
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:88:    const response = await getApiClient().get<PortalMeResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:92:    return response.data;
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:99:      await getApiClient().post<PortalTermsAcceptanceResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:106:    return response.data;
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:161:    resolveRequest(otpResponse);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:88:                void query.refetch();
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:104:              void query.refetch();
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:10:  apiClient: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:16:vi.mock("@/services/api/api-client", () => ({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:17:  getApiClient: vi.fn(() => mocks.apiClient),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:89:    mocks.apiClient.get.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:95:    expect(mocks.apiClient.get).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:110:    mocks.apiClient.get.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:134:    expect(mocks.apiClient.get).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:165:    mocks.apiClient.get.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:193:    expect(mocks.apiClient.get).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:215:    mocks.apiClient.patch.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:224:    expect(mocks.apiClient.patch).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:232:      JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:235:      JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:250:    expect(mocks.apiClient.patch).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:254:    mocks.apiClient.get.mockResolvedValueOnce({
beauty-core-ui/src/features/portal/services/portal-client-api.ts:2:  getApiClient,
beauty-core-ui/src/features/portal/services/portal-client-api.ts:3:} from "@/services/api/api-client";
beauty-core-ui/src/features/portal/services/portal-client-api.ts:28:  const response = await getApiClient().get<unknown>(
beauty-core-ui/src/features/portal/services/portal-client-api.ts:32:  return adaptPortalDashboard(response.data);
beauty-core-ui/src/features/portal/services/portal-client-api.ts:36:  const response = await getApiClient().get<unknown>(
beauty-core-ui/src/features/portal/services/portal-client-api.ts:40:  return adaptPortalProfile(response.data);
beauty-core-ui/src/features/portal/services/portal-client-api.ts:47:  const response = await getApiClient().patch<unknown>(
beauty-core-ui/src/features/portal/services/portal-client-api.ts:52:  return adaptPortalProfile(response.data);
beauty-core-ui/src/features/portal/services/portal-client-api.ts:56:  const response = await getApiClient().get<unknown>(
beauty-core-ui/src/features/portal/services/portal-client-api.ts:60:  return adaptPortalHistory(response.data);
beauty-core-ui/src/services/api/api-client.ts:15:type CreateApiClientOptions = {
beauty-core-ui/src/services/api/api-client.ts:23:let publicApiClient: AxiosInstance | undefined;
beauty-core-ui/src/services/api/api-client.ts:24:let authenticatedApiClient: AxiosInstance | undefined;
beauty-core-ui/src/services/api/api-client.ts:62:      headers.set("Authorization", `Bearer ${accessToken}`);
beauty-core-ui/src/services/api/api-client.ts:64:      headers.delete("Authorization");
beauty-core-ui/src/services/api/api-client.ts:76:  client.interceptors.response.use(
beauty-core-ui/src/services/api/api-client.ts:114:        await refreshAccessToken(getPublicApiClient());
beauty-core-ui/src/services/api/api-client.ts:116:        return client.request(originalRequest);
beauty-core-ui/src/services/api/api-client.ts:125:  client.interceptors.response.use(
beauty-core-ui/src/services/api/api-client.ts:161:export function createApiClient({
beauty-core-ui/src/services/api/api-client.ts:163:}: CreateApiClientOptions = {}): AxiosInstance {
beauty-core-ui/src/services/api/api-client.ts:167:    baseURL: env.NEXT_PUBLIC_API_URL,
beauty-core-ui/src/services/api/api-client.ts:175:  client.interceptors.request.use((config) =>
beauty-core-ui/src/services/api/api-client.ts:188:export function getPublicApiClient(): AxiosInstance {
beauty-core-ui/src/services/api/api-client.ts:189:  publicApiClient ??= createApiClient();
beauty-core-ui/src/services/api/api-client.ts:191:  return publicApiClient;
beauty-core-ui/src/services/api/api-client.ts:194:export function getApiClient(): AxiosInstance {
beauty-core-ui/src/services/api/api-client.ts:195:  authenticatedApiClient ??= createApiClient({
beauty-core-ui/src/services/api/api-client.ts:199:  return authenticatedApiClient;
beauty-core-ui/src/services/api/normalize-api-error.ts:6:} from "@/services/api/api.types";
beauty-core-ui/src/services/api/normalize-api-error.ts:76:  const payload = isApiErrorPayload(error.response.data)
beauty-core-ui/src/services/api/normalize-api-error.ts:77:    ? error.response.data
beauty-core-ui/src/services/auth/refresh-coordinator.ts:40:      accessToken: response.data.access_token,
beauty-core-ui/src/services/auth/refresh-coordinator.ts:41:      refreshToken: response.data.refresh_token,
beauty-core-ui/src/services/auth/refresh-coordinator.ts:42:      expiresInSeconds: response.data.expires_in,
beauty-core-ui/src/services/auth/refresh-coordinator.ts:45:    return response.data.access_token;
``

Verificações obrigatórias:

- cliente HTTP utilizado;
- baseURL;
- autenticação Bearer;
- interceptors;
- tratamento de respostas;
- tratamento de erros;
- ausência de endpoints inventados;
- ausência de envio manual indevido de empresaId.

## 4. Query keys e query options

Quantidade de ocorrências: 80

``text
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:23:  portalAuthQueryKeys,
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:203:    expect(portalAuthQueryKeys.me()).toEqual([
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:210:      JSON.stringify(portalAuthQueryKeys.me()),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:10:    queryClient.setQueryData(["portal", "perfil"], { nome: "Cliente" });
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:11:    queryClient.setQueryData(["portal", "agendamentos"], [{ id: "agenda-1" }]);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:12:    queryClient.setQueryData(["other-module", "public"], { ready: true });
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:38:    queryClient.setQueryData(["admin", "dashboard"], { total: 1 });
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:50:    queryClient.setQueryData(["portal", "session"], {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:4:  queryClient.removeQueries({
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:5:    predicate: ({ queryKey }) => queryKey[0] === "portal",
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:85:export const portalAuthQueryKeys = {
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:88:  me: () => [...portalAuthQueryKeys.all, "me"] as const,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:96:        retry: false,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:107:    queryClient.setQueryData(["portal", "private"], {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:128:    queryClient.setQueryData(["portal", "private"], {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:178:    queryClient.setQueryData(["portal", "private"], {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:5:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:17:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:24:  portalQueryKeys,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:123:    const privateKey = portalQueryKeys.privateResource("profile");
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:125:    queryClient.setQueryData(privateKey, {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:8:  portalClientQueryKeys,
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:11:describe("portalClientQueryKeys", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:13:    expect(portalClientQueryKeys.all()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:17:    expect(portalClientQueryKeys.dashboard()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:22:    expect(portalClientQueryKeys.profile()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:27:    expect(portalClientQueryKeys.history()).toEqual([
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:36:      portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:37:      portalClientQueryKeys.profile(),
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:38:      portalClientQueryKeys.history(),
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
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:5:  portalDashboardQueryOptions,
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:8:describe("portalDashboardQueryOptions", () => {
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:10:    const options = portalDashboardQueryOptions(false);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:12:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:20:    expect(options.staleTime).toBe(PORTAL_DASHBOARD_STALE_TIME);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:21:    expect(JSON.stringify(options.queryKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:25:    const options = portalDashboardQueryOptions(true);
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:28:    expect(options.queryKey).toEqual([
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:1:import { queryOptions } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:4:import { portalClientQueryKeys } from "./portal-client-query-keys";
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:8:export function portalDashboardQueryOptions(
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:9:  enabled: boolean,
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:11:  return queryOptions({
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:12:    queryKey: portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:13:    queryFn: () => getPortalDashboard(),
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:15:    staleTime: PORTAL_DASHBOARD_STALE_TIME,
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:16:    retry: false,
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:4:import { useQuery } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:11:import { portalDashboardQueryOptions } from "./portal-dashboard-query-options";
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts:16:  const query = useQuery(portalDashboardQueryOptions(enabled));
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:4:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:21:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:9:  portalQueryKeys,
beauty-core-ui/src/features/portal/query/portal-query.test.ts:15:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:16:    const privateKey = portalQueryKeys.privateResource("profile", "current");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:47:    const privateKey = portalQueryKeys.privateResource("profile");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:48:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:50:    queryClient.setQueryData(privateKey, { private: true });
beauty-core-ui/src/features/portal/query/portal-query.test.ts:51:    queryClient.setQueryData(publicKey, { public: true });
beauty-core-ui/src/features/portal/query/portal-query.test.ts:67:    const privateKey = portalQueryKeys.privateResource("history");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:70:    queryClient.setQueryData(privateKey, { private: true });
beauty-core-ui/src/features/portal/query/portal-query.ts:5:export const portalQueryKeys = {
beauty-core-ui/src/features/portal/query/portal-query.ts:8:  public: () => [...portalQueryKeys.all, "public"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:10:  private: () => [...portalQueryKeys.all, "private"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:15:  ) => [...portalQueryKeys.public(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:20:  ) => [...portalQueryKeys.private(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:41:  void queryClient.cancelQueries({
beauty-core-ui/src/features/portal/query/portal-query.ts:42:    queryKey: portalQueryKeys.private(),
beauty-core-ui/src/features/portal/query/portal-query.ts:45:  queryClient.removeQueries({
beauty-core-ui/src/features/portal/query/portal-query.ts:46:    queryKey: portalQueryKeys.private(),
``

Verificações obrigatórias:

- query keys determinísticas;
- separação por domínio;
- separação por cliente/sessão quando necessária;
- uso correto de enabled;
- bloqueio para estados anonymous e denied;
- staleTime e gcTime coerentes;
- invalidação após mutações;
- remoção de dados no logout;
- ausência de vazamento entre sessões.

## 5. Isolamento de sessão e tenant

Quantidade de ocorrências: 746

``text
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:31:  it("solicita OTP pela rota p├║blica tenant-aware sem enviar empresaId", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:36:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:62:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:72:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:82:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:127:  it("usa o contrato real de logout da sess├úo atual", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:130:        message: "Logout realizado com sucesso.",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:134:    await portalAuthApi.logout({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:139:      "/auth-cliente/logout",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:146:  it("usa logout-all sem inventar payload", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:149:        message: "Logout realizado com sucesso.",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:153:    await portalAuthApi.logoutAll();
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:156:      "/auth-cliente/logout-all",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:167:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:179:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:202:  it("mant├®m a chave de auth sem empresaId arbitr├írio", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:211:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:7:  PortalLogoutRequest,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:8:  PortalLogoutResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:66:  async logout(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:67:    request: PortalLogoutRequest,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:68:  ): Promise<PortalLogoutResponse> {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:69:    const response = await getApiClient().post<PortalLogoutResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:70:      "/auth-cliente/logout",
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:79:  async logoutAll(): Promise<PortalLogoutResponse> {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:80:    const response = await getApiClient().post<PortalLogoutResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:81:      "/auth-cliente/logout-all",
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:1:import { QueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:8:    const queryClient = new QueryClient();
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:10:    queryClient.setQueryData(["portal", "perfil"], { nome: "Cliente" });
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:11:    queryClient.setQueryData(["portal", "agendamentos"], [{ id: "agenda-1" }]);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:12:    queryClient.setQueryData(["other-module", "public"], { ready: true });
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:14:    clearPortalPrivateQueries(queryClient);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:17:      queryClient.getQueryData(["portal", "perfil"]),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:20:      queryClient.getQueryData(["portal", "agendamentos"]),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:23:      queryClient.getQueryData(["other-module", "public"]),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:28:    const queryClient = new QueryClient();
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:31:      clearPortalPrivateQueries(queryClient);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:36:    const queryClient = new QueryClient();
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:38:    queryClient.setQueryData(["admin", "dashboard"], { total: 1 });
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:40:    clearPortalPrivateQueries(queryClient);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:43:      queryClient.getQueryData(["admin", "dashboard"]),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:48:    const queryClient = new QueryClient();
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:50:    queryClient.setQueryData(["portal", "session"], {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:51:      state: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:54:    clearPortalPrivateQueries(queryClient);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:57:      queryClient.getQueryData(["portal", "session"]),
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:1:import type { QueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:3:export function clearPortalPrivateQueries(queryClient: QueryClient) {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts:4:  queryClient.removeQueries({
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:10:  restorePortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:11:  logoutPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:12:  clearPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:13:  hasPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:16:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:17:  restorePortalSession: mocks.restorePortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:18:  logoutPortalSession: mocks.logoutPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:19:  clearPortalSession: mocks.clearPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:20:  hasPortalSession: mocks.hasPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:33:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:34:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:35:  sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:46:          ? `${auth.identity.clienteId}|${auth.identity.empresaId}|${auth.identity.sid}`
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:52:          void auth.restoreSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:60:          void auth.logoutSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:71:    mocks.restorePortalSession.mockResolvedValue(identity);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:85:        "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:94:  it("marca anonymous quando n├úo existe sess├úo restaur├ível", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:95:    mocks.restorePortalSession.mockResolvedValue(null);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:109:        "anonymous",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:114:  it("executa logout e limpa o estado do provider", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:115:    mocks.logoutPortalSession.mockResolvedValue({
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:116:      message: "Logout realizado com sucesso.",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:122:          status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:136:        "anonymous",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:140:    expect(mocks.clearPortalSession).toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:144:    mocks.hasPortalSession.mockReturnValue(true);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:156:    expect(mocks.restorePortalSession).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:160:    mocks.hasPortalSession.mockReturnValue(true);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:161:    mocks.restorePortalSession.mockResolvedValue(identity);
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:171:        "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:175:    expect(mocks.restorePortalSession).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:16:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:17:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:18:  sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:32:          ? `${auth.identity.clienteId}|${auth.identity.empresaId}|${auth.identity.sid}`
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:38:      <button type="button" onClick={auth.markAnonymous}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:43:        onClick={() => auth.markAuthenticated(CLIENT_IDENTITY)}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:47:      <button type="button" onClick={auth.markDenied}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:50:      <button type="button" onClick={auth.clearSession}>
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:58:  it("starts without assuming a client session", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:81:    expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:88:    expect(screen.getByTestId("status")).toHaveTextContent("denied");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:93:    expect(screen.getByTestId("status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:100:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:107:          anonymousFallback={<p>superficie anonima</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:108:          deniedFallback={<p>superficie negada</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:123:        initialState={{ status: "authenticated", identity: CLIENT_IDENTITY }}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:126:          anonymousFallback={<p>superficie anonima</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:127:          deniedFallback={<p>superficie negada</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:15:  PortalLogoutResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:21:  clearPortalSession as clearStoredPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:22:  hasPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:23:  logoutPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:24:  restorePortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:25:} from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:37:  restoreSession: () => Promise<PortalClientIdentity | null>;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:38:  markAnonymous: () => void;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:39:  markAuthenticated: (identity: PortalClientIdentity) => void;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:40:  markDenied: () => void;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:41:  clearSession: () => void;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:42:  logoutSession: () => Promise<PortalLogoutResponse | null>;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:70:  const markAnonymous = useCallback(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:71:    dispatch({ type: "anonymous" });
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:74:  const markAuthenticated = useCallback(
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:77:        type: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:84:  const markDenied = useCallback(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:85:    dispatch({ type: "denied" });
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:88:  const clearSession = useCallback(() => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:89:    clearStoredPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:93:  const restoreSession = useCallback(async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:97:      const identity = await restorePortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:100:        markAnonymous();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:104:      markAuthenticated(identity);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:110:        markDenied();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:112:        markAnonymous();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:119:    markAnonymous,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:120:    markAuthenticated,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:121:    markDenied,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:124:  const logoutSession = useCallback(async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:126:      return await logoutPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:128:      clearSession();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:130:  }, [clearSession]);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:143:    if (!hasPortalSession()) {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:144:      markAnonymous();
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:148:    void restoreSession().catch(() => undefined);
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:151:    markAnonymous,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:153:    restoreSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:161:      restoreSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:162:      markAnonymous,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:163:      markAuthenticated,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:164:      markDenied,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:165:      clearSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:166:      logoutSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:170:      clearSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:171:      logoutSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:172:      markAnonymous,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:173:      markAuthenticated,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:174:      markDenied,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:175:      restoreSession,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:202:  anonymousFallback?: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:203:  deniedFallback?: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:209:  anonymousFallback = null,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:210:  deniedFallback = null,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:218:  if (status === "anonymous") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:219:    return anonymousFallback;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:222:  if (status === "denied") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:223:    return deniedFallback;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:1:export type PortalTenantSummary = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:2:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:16:  empresa: PortalTenantSummary;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:31:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:40:  empresa: PortalTenantSummary;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:53:export type PortalLogoutRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:57:export type PortalLogoutResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:66:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:80:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:55:          clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:56:      return "N├úo foi poss├¡vel localizar o cliente ou o tenant.";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:12:import { hasPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:38:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:39:  hasPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:52:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:60:const hasPortalSessionMock = vi.mocked(hasPortalSession);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:83:  hasPortalSessionMock.mockReturnValue(false);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:87:    status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:89:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:90:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:91:      sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:111:  it("keeps a normal client outside the first-access route", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:14:import { hasPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:32:    hasPortalSession()
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:45:  if (status !== "authenticated") {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:50:    <PortalAuthenticatedRouteController
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:54:    </PortalAuthenticatedRouteController>
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:58:type PortalAuthenticatedRouteControllerProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:63:function PortalAuthenticatedRouteController({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:66:}: PortalAuthenticatedRouteControllerProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:49:  it("honors a safe returnTo after anonymous login", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:14:  logout: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:15:  logoutAll: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:31:    logout: mocks.logout,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:32:    logoutAll: mocks.logoutAll,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:37:  clearPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:38:  hasPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:39:  logoutAllPortalSessions,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:40:  logoutPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:41:  restorePortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:42:  startPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:43:} from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:55:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:56:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:57:  sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:64:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:65:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:66:  sid: "sessao-renovada",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:76:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:86:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:97:describe("portal-auth-session", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:99:    expect(await restorePortalSession()).toBeNull();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:104:    const identity = startPortalSession(otpResponse);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:107:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:108:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:109:      sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:132:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:138:    const identity = await restorePortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:146:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:147:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:148:      sid: "sessao-renovada",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:158:  it("limpa a sess├úo local quando o logout atual falha", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:160:    mocks.logout.mockRejectedValue(new Error("Servidor indispon├¡vel"));
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:162:    await expect(logoutPortalSession()).rejects.toThrow(
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:169:  it("executa logout-all e limpa a sess├úo local", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:170:    mocks.logoutAll.mockResolvedValue({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:171:      message: "Logout realizado com sucesso.",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:174:    await logoutAllPortalSessions();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:176:    expect(mocks.logoutAll).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:183:    expect(hasPortalSession()).toBe(true);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:185:    clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:10:  PortalLogoutResponse,
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
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:199:export function hasPortalSession(): boolean {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:206:export function startPortalSession(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:212:    response.cliente.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:223:export async function restorePortalSession(): Promise<
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:274:      profile.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:278:      clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:285:export function clearPortalSession(): void {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:289:export async function logoutPortalSession(): Promise<
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:290:  PortalLogoutResponse | null
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:299:    return await portalAuthApi.logout({
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:303:    clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:307:export async function logoutAllPortalSessions(): Promise<
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:308:  PortalLogoutResponse
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:311:    return await portalAuthApi.logoutAll();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:313:    clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth.ts:4:  "anonymous",
beauty-core-ui/src/features/portal/auth/portal-auth.ts:5:  "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth.ts:6:  "denied",
beauty-core-ui/src/features/portal/auth/portal-auth.ts:12:  clienteId: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:13:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:14:  sid: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:29:  | { type: "anonymous" }
beauty-core-ui/src/features/portal/auth/portal-auth.ts:30:  | { type: "authenticated"; identity: PortalClientIdentity }
beauty-core-ui/src/features/portal/auth/portal-auth.ts:31:  | { type: "denied" }
beauty-core-ui/src/features/portal/auth/portal-auth.ts:41:    case "anonymous":
beauty-core-ui/src/features/portal/auth/portal-auth.ts:42:      return { status: "anonymous", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:43:    case "authenticated":
beauty-core-ui/src/features/portal/auth/portal-auth.ts:44:      return { status: "authenticated", identity: action.identity };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:45:    case "denied":
beauty-core-ui/src/features/portal/auth/portal-auth.ts:46:      return { status: "denied", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:48:      return { status: "anonymous", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:57:  return state.status === "authenticated";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:17:import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:18:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:37:const tenant = {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:38:  ...DEFAULT_TENANT,
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:46:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:58:    <TenantProvider initialTenant={tenant}>
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:60:    </TenantProvider>,
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:103:  it("sends only the tenant slug and normalized phone to the public adapter", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:126:      "empresaId",
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:8:import { useTenant } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:71:  const { tenant } = useTenant();
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:102:        slug: tenant.slug,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:17:import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:18:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:27:import { startPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:40:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:41:  startPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:52:const tenant = {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:53:  ...DEFAULT_TENANT,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:63:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:73:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:81:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:92:const startPortalSessionMock = vi.mocked(startPortalSession);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:93:const restoreSessionMock = vi.fn();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:97:    <TenantProvider initialTenant={tenant}>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:102:    </TenantProvider>,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:113:  startPortalSessionMock.mockReset();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:114:  restoreSessionMock.mockReset();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:115:  restoreSessionMock.mockResolvedValue(undefined);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:118:    restoreSession: restoreSessionMock,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:121:  startPortalSessionMock.mockReturnValue({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:122:    clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:123:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:124:    sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:171:  it("verifies the real contract and restores the authenticated session", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:194:    expect(startPortalSessionMock).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:199:      expect(restoreSessionMock).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:268:  it("resends through the public tenant-aware endpoint without cooldown invention", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:321:    restoreSessionMock.mockRejectedValue({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:8:import { useTenant } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:12:import { startPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:93:  const { tenant } = useTenant();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:94:  const { restoreSession } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:132:        slug: tenant.slug,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:137:      await startPortalSession(response);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:138:      await restoreSession();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:164:        slug: tenant.slug,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:44:  it("does not expose private content to an anonymous client", async () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:46:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:83:      status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:85:        clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:86:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:87:        sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:101:  it("keeps an administrative path outside the Portal returnTo namespace", async () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:104:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:32:    if (status !== "anonymous" && status !== "denied") {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:52:  if (status === "anonymous" || status === "denied") {
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
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:10:  QueryClient,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:11:  QueryClientProvider,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:40:const AUTHENTICATED_STATE: PortalAuthState = {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:41:  status: "authenticated",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:43:    clienteId: "cliente-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:44:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:45:    sid: "sessao-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:49:const ANONYMOUS_STATE: PortalAuthState = {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:50:  status: "anonymous",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:93:  const queryClient = new QueryClient({
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:102:    <QueryClientProvider client={queryClient}>
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:106:    </QueryClientProvider>,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:124:  it("shows an authenticated query in its initial fetching state", () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:127:    renderWithAuth(AUTHENTICATED_STATE, <HookProbe />);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:130:      "authenticated|pending|fetching|",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:134:  it("does not fetch the private dashboard for an anonymous client", () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:137:    renderWithAuth(ANONYMOUS_STATE, <HookProbe />);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:140:      "anonymous|pending|idle|",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:145:  it("loads the mapped dashboard once for an authenticated client", async () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:148:    renderWithAuth(AUTHENTICATED_STATE, <HookProbe />);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:152:        "authenticated|success|idle|Maria",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:161:    [401, "anonymous"],
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:162:    [403, "denied"],
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:171:      renderWithAuth(AUTHENTICATED_STATE, <HookProbe />);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:186:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:207:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:226:    renderBoundary(AUTHENTICATED_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:241:  it("keeps the anonymous surface out of the private dashboard", () => {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:244:    renderBoundary(ANONYMOUS_STATE);
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:42:  if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:7:  it("renders children inside the shared Card primitive", () => {
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
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:71:          clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:14:  it("accepts only routes inside the Portal namespace", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:4:import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:5:import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:11:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:17:const anonymousState: PortalAuthState = {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:18:  status: "anonymous",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:23:  initialState: PortalAuthState = anonymousState,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:24:  tenant: TenantPublicConfig = DEFAULT_TENANT,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:27:    <TenantProvider initialTenant={tenant}>
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:33:    </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:42:  it("renders the anonymous OTP experience with the official asset", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:84:  it("renders tenant-aware copy while preserving the real fallback provider", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:85:    const customTenant: TenantPublicConfig = {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:86:      ...DEFAULT_TENANT,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:90:        ...DEFAULT_TENANT.branding,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:95:    renderPage(anonymousState, customTenant);
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:103:  it("uses accessible official states for restoring and denied access", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:116:      status: "denied",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:120:    const deniedState = screen
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:127:    expect(deniedState).toHaveAttribute(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:132:    const deniedImage = deniedState?.querySelector("img");
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:134:    expect(deniedImage).not.toBeNull();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:135:    expect(imageSourceFrom(deniedImage)).toContain(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:9:import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:11:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:16:import { PortalAuthenticatedSurface } from "./portal-authenticated-surface";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:23:  logout: vi.fn(),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:24:  logoutAll: vi.fn(),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:35:vi.mock("../auth/portal-auth-session", async (importOriginal) => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:37:    await importOriginal<typeof import("../auth/portal-auth-session")>();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:41:    logoutPortalSession: () =>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:42:      api.logout({
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:54:function renderSurface(queryClient = new QueryClient()) {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:56:    queryClient,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:58:      <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:59:        <QueryClientProvider client={queryClient}>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:62:              status: "authenticated",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:64:                clienteId: "cliente-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:65:                empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:66:                sid: "sessao-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:71:            <PortalAuthenticatedSurface />
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:73:        </QueryClientProvider>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:74:      </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:85:  api.logout.mockReset();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:86:  api.logoutAll.mockReset();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:87:  api.logout.mockResolvedValue({ message: "Logout realizado com sucesso." });
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:88:  api.logoutAll.mockResolvedValue({
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:93:describe("PortalAuthenticatedSurface", () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:94:  it("exposes only the neutral authenticated Portal surface", () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:104:  it("logs out the current client session and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:105:    const { queryClient } = renderSurface();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:107:    queryClient.setQueryData(["portal", "private"], {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:114:      expect(api.logout).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:116:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:120:      queryClient.getQueryData(["portal", "private"]),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:122:    expect(api.logoutAll).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:125:  it("logs out all client sessions and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:126:    const { queryClient } = renderSurface();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:128:    queryClient.setQueryData(["portal", "private"], {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:137:      expect(api.logoutAll).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:139:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:143:      queryClient.getQueryData(["portal", "private"]),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:145:    expect(api.logout).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:148:  it("protects logout actions against double submit", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:149:    let resolveLogout!: () => void;
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:150:    api.logout.mockReturnValue(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:152:        resolveLogout = () => resolve();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:163:    expect(api.logout).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:166:    resolveLogout();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:173:  it("cleans the local session even when the server logout fails", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:174:    api.logout.mockRejectedValue(new Error("resposta interna da API"));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:176:    const { queryClient } = renderSurface();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:178:    queryClient.setQueryData(["portal", "private"], {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:185:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:188:        "N├úo foi poss├¡vel confirmar o logout.",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:193:      queryClient.getQueryData(["portal", "private"]),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:5:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:13:type PortalLogoutAction = "current" | "all";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:15:export function PortalAuthenticatedSurface() {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:17:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:18:  const { clearSession, logoutSession } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:20:  const activeActionRef = useRef<PortalLogoutAction | null>(null);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:22:    useState<PortalLogoutAction | null>(null);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:25:  async function handleLogout(action: PortalLogoutAction) {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:36:        await portalAuthApi.logoutAll();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:38:        await logoutSession();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:44:          : "N├úo foi poss├¡vel confirmar o logout.",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:47:      clearPortalPrivateQueries(queryClient);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:48:      clearSession();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:58:        aria-labelledby="portal-authenticated-heading"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:60:        data-testid="portal-authenticated-surface"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:70:            id="portal-authenticated-heading"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:95:            onClick={() => void handleLogout("current")}
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:105:            onClick={() => void handleLogout("all")}
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:4:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:14:    <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:16:    </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:12:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:50:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:72:    status: "authenticated",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:74:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:75:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:76:      sid: "sessao-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:86:  <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:88:  </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:107:  <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:109:  </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:119:  it("sends an anonymous client back to the Portal entry", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:121:      status: "anonymous",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:126:  <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:128:  </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:144:  <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:146:  </TenantProvider>,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:43:    if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:3:import { useTenant } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:13:import { PortalAuthenticatedSurface } from "@/features/portal/pages/portal-authenticated-surface";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:16:  const { tenant } = useTenant();
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:43:              Acesso seguro ├á ├írea de {tenant.name}.
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:52:        <aside
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:66:        </aside>
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:87:function PortalAuthDeniedState() {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:105:  if (status === "anonymous") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:113:  if (status === "denied") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:114:    return <PortalAuthDeniedState />;
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:119:      <PortalAuthenticatedSurface />
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:4:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:14:    <TenantProvider>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:16:    </TenantProvider>,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:7:import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:13:import { TenantProvider } from "@/providers/tenant-provider";
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:34:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:35:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:36:  sid: "sessao-real",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:53:      anonymousFallback={<p>superficie anonima</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:54:      deniedFallback={<p>superficie indisponivel</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:73:  it("composes the real route with PortalAuthProvider, PortalShell and Tenant", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:75:      <TenantProvider>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:79:      </TenantProvider>,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:95:  it("connects authenticated client state to private query gating and boundaries", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:99:          status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:109:      "authenticated:true",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:122:    const queryClient = new QueryClient();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:125:    queryClient.setQueryData(privateKey, {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:130:      <QueryClientProvider client={queryClient}>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:133:            status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:140:      </QueryClientProvider>,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:145:        "anonymous:false",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:149:    expect(queryClient.getQueryData(privateKey)).toBeUndefined();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:167:  it("keeps returnTo inside the Portal namespace", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:177:  it("does not expose private content during the anonymous route foundation", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:179:      <TenantProvider>
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:182:            status: "anonymous",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:187:            anonymousFallback={<p>acesso do cliente futuro</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:192:      </TenantProvider>,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:202:    const queryClient = new QueryClient();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:206:      handlePortalAccessError(queryClient, 401, (transition) => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:212:      handlePortalAccessError(queryClient, 403, (transition) => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:217:    expect(transitions).toEqual(["anonymous", "denied"]);
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:34:  it("nao inclui identidade ou tenant arbitrario nas keys", () => {
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:41:    expect(serialized).not.toContain("clienteId");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:42:    expect(serialized).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts:43:    expect(serialized).not.toContain("sid");
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:54:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts:21:    expect(JSON.stringify(options.queryKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:16:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:17:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:18:  sid: "sessao-real",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:37:  it("blocks private queries until the client is authenticated", () => {
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:38:    const anonymousState: PortalAuthState = {
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:39:      status: "anonymous",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:44:      <PortalAuthProvider initialState={anonymousState}>
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:50:      "anonymous:false",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:58:          status: "authenticated",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:67:      "authenticated:true",
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:74:        initialState={{ status: "anonymous", identity: null }}
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx:81:      "anonymous:true",
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:4:import { useQueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:21:  const queryClient = useQueryClient();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:22:  const { markAnonymous, markDenied } = usePortalAuth();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:26:      handlePortalAccessError(queryClient, status, (transition) => {
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:27:        if (transition === "anonymous") {
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:28:          markAnonymous();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:32:        markDenied();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:34:    [markAnonymous, markDenied, queryClient],
beauty-core-ui/src/features/portal/query/portal-query.test.ts:1:´╗┐import { QueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-query.test.ts:14:  it("creates stable public and private namespaces without tenant selection", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:15:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:18:    expect(publicKey).toEqual(["portal", "public", "tenant"]);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:25:    expect(JSON.stringify(publicKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:26:    expect(JSON.stringify(privateKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:29:  it("gates private queries exclusively for authenticated clients", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:32:    expect(portalQueryEnabled("anonymous", true)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:33:    expect(portalQueryEnabled("denied", true)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:34:    expect(portalQueryEnabled("authenticated", true)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:40:    expect(portalQueryEnabled("anonymous", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:41:    expect(portalQueryEnabled("authenticated", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:42:    expect(portalQueryEnabled("denied", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:46:    const queryClient = new QueryClient();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:48:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:50:    queryClient.setQueryData(privateKey, { private: true });
beauty-core-ui/src/features/portal/query/portal-query.test.ts:51:    queryClient.setQueryData(publicKey, { public: true });
beauty-core-ui/src/features/portal/query/portal-query.test.ts:53:    cleanupPortalPrivateQueries(queryClient);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:55:    expect(queryClient.getQueryData(privateKey)).toBeUndefined();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:56:    expect(queryClient.getQueryData(publicKey)).toEqual({ public: true });
beauty-core-ui/src/features/portal/query/portal-query.test.ts:60:    expect(portalAccessTransitionFromStatus(401)).toBe("anonymous");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:61:    expect(portalAccessTransitionFromStatus(403)).toBe("denied");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:66:    const queryClient = new QueryClient();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:70:    queryClient.setQueryData(privateKey, { private: true });
beauty-core-ui/src/features/portal/query/portal-query.test.ts:73:      queryClient,
beauty-core-ui/src/features/portal/query/portal-query.test.ts:79:    expect(transitions).toEqual(["anonymous"]);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:80:    expect(queryClient.getQueryData(privateKey)).toBeUndefined();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:84:    const queryClient = new QueryClient();
beauty-core-ui/src/features/portal/query/portal-query.test.ts:88:      handlePortalAccessError(queryClient, 500, onTransition),
beauty-core-ui/src/features/portal/query/portal-query.ts:1:´╗┐import type { QueryClient } from "@tanstack/react-query";
beauty-core-ui/src/features/portal/query/portal-query.ts:28:    return status === "authenticated";
beauty-core-ui/src/features/portal/query/portal-query.ts:32:    status === "anonymous" ||
beauty-core-ui/src/features/portal/query/portal-query.ts:33:    status === "authenticated" ||
beauty-core-ui/src/features/portal/query/portal-query.ts:34:    status === "denied"
beauty-core-ui/src/features/portal/query/portal-query.ts:39:  queryClient: QueryClient,
beauty-core-ui/src/features/portal/query/portal-query.ts:41:  void queryClient.cancelQueries({
beauty-core-ui/src/features/portal/query/portal-query.ts:45:  queryClient.removeQueries({
beauty-core-ui/src/features/portal/query/portal-query.ts:50:export type PortalAccessTransition = "anonymous" | "denied";
beauty-core-ui/src/features/portal/query/portal-query.ts:56:    return "anonymous";
beauty-core-ui/src/features/portal/query/portal-query.ts:60:    return "denied";
beauty-core-ui/src/features/portal/query/portal-query.ts:67:  queryClient: QueryClient,
beauty-core-ui/src/features/portal/query/portal-query.ts:77:  cleanupPortalPrivateQueries(queryClient);
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:59:      "https://evil.example/?token=secret&clienteId=private";
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:66:    expect(result).not.toContain("clienteId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:30:    empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:40:      empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:55:    empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:56:    clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:105:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:118:          empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:122:          ativos: [{ empresaId: "empresa-secreta" }],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:124:        beneficios: [{ empresaId: "empresa-secreta" }],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:160:    expect(JSON.stringify(result)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:175:            clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:185:            empresaId: "empresa-secreta",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:236:    ).not.toContain("empresaId");
beauty-core-ui/src/services/api/api-client.ts:16:  authenticated?: boolean;
beauty-core-ui/src/services/api/api-client.ts:24:let authenticatedApiClient: AxiosInstance | undefined;
beauty-core-ui/src/services/api/api-client.ts:39:  authenticated: boolean,
beauty-core-ui/src/services/api/api-client.ts:58:  if (authenticated) {
beauty-core-ui/src/services/api/api-client.ts:89:          "/auth/logout",
beauty-core-ui/src/services/api/api-client.ts:90:          "/auth/logout-all",
beauty-core-ui/src/services/api/api-client.ts:162:  authenticated = false,
beauty-core-ui/src/services/api/api-client.ts:176:    prepareRequestHeaders(config, authenticated),
beauty-core-ui/src/services/api/api-client.ts:179:  if (authenticated) {
beauty-core-ui/src/services/api/api-client.ts:195:  authenticatedApiClient ??= createApiClient({
beauty-core-ui/src/services/api/api-client.ts:196:    authenticated: true,
beauty-core-ui/src/services/api/api-client.ts:199:  return authenticatedApiClient;
beauty-core-ui/src/services/auth/refresh-coordinator.ts:6:export const SESSION_EXPIRED_EVENT =
beauty-core-ui/src/services/auth/refresh-coordinator.ts:7:  "beauty-core:admin-session-expired";
beauty-core-ui/src/services/auth/refresh-coordinator.ts:13:function dispatchSessionExpiredEvent(): void {
beauty-core-ui/src/services/auth/refresh-coordinator.ts:18:  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
beauty-core-ui/src/services/auth/refresh-coordinator.ts:28:    dispatchSessionExpiredEvent();
beauty-core-ui/src/services/auth/refresh-coordinator.ts:48:    dispatchSessionExpiredEvent();
beauty-core-ui/src/services/auth/token-storage.ts:13:function canUseSessionStorage(): boolean {
beauty-core-ui/src/services/auth/token-storage.ts:18:  if (!canUseSessionStorage()) {
beauty-core-ui/src/services/auth/token-storage.ts:23:    return window.sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
beauty-core-ui/src/services/auth/token-storage.ts:30:  if (!canUseSessionStorage()) {
beauty-core-ui/src/services/auth/token-storage.ts:35:    window.sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
beauty-core-ui/src/services/auth/token-storage.ts:42:  if (!canUseSessionStorage()) {
beauty-core-ui/src/services/auth/token-storage.ts:47:    window.sessionStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
beauty-core-ui/src/stores/auth-store.test.ts:7:    getAuthState().clearSession();
beauty-core-ui/src/stores/auth-store.test.ts:16:    getAuthState().beginSessionRestore();
beauty-core-ui/src/stores/auth-store.test.ts:21:    getAuthState().setAuthenticated({
beauty-core-ui/src/stores/auth-store.test.ts:26:      empresaId: "empresa-1",
beauty-core-ui/src/stores/auth-store.test.ts:30:    expect(getAuthState().status).toBe("authenticated");
beauty-core-ui/src/stores/auth-store.test.ts:32:    expect(getAuthState().user?.empresaId).toBe("empresa-1");
beauty-core-ui/src/stores/auth-store.test.ts:36:    getAuthState().setAuthenticated({
beauty-core-ui/src/stores/auth-store.test.ts:40:      empresaId: "empresa-1",
beauty-core-ui/src/stores/auth-store.test.ts:43:    getAuthState().setUnauthenticated();
beauty-core-ui/src/stores/auth-store.test.ts:45:    expect(getAuthState().status).toBe("unauthenticated");
beauty-core-ui/src/stores/auth-store.test.ts:50:    getAuthState().setUnauthenticated();
beauty-core-ui/src/stores/auth-store.test.ts:51:    getAuthState().clearSession();
beauty-core-ui/src/stores/auth-store.ts:3:import type { AdminSessionIdentity } from "@/features/auth/types/auth.types";
beauty-core-ui/src/stores/auth-store.ts:8:  | "authenticated"
beauty-core-ui/src/stores/auth-store.ts:9:  | "unauthenticated";
beauty-core-ui/src/stores/auth-store.ts:13:  user: AdminSessionIdentity | null;
beauty-core-ui/src/stores/auth-store.ts:14:  beginSessionRestore: () => void;
beauty-core-ui/src/stores/auth-store.ts:15:  setAuthenticated: (user: AdminSessionIdentity) => void;
beauty-core-ui/src/stores/auth-store.ts:16:  setUnauthenticated: () => void;
beauty-core-ui/src/stores/auth-store.ts:17:  clearSession: () => void;
beauty-core-ui/src/stores/auth-store.ts:28:  beginSessionRestore: () => {
beauty-core-ui/src/stores/auth-store.ts:32:  setAuthenticated: (user) => {
beauty-core-ui/src/stores/auth-store.ts:34:      status: "authenticated",
beauty-core-ui/src/stores/auth-store.ts:39:  setUnauthenticated: () => {
beauty-core-ui/src/stores/auth-store.ts:41:      status: "unauthenticated",
beauty-core-ui/src/stores/auth-store.ts:46:  clearSession: () => {
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

Nenhuma implementação poderá contornar a fundação de autenticação do Chat 61.

## 6. Testes relacionados

- `src\app\portal\portal-private-routing.test.tsx`
- `src\app\portal\portal-routing.test.tsx`
- `src\features\agendamentos\services\agendamentos-api.test.ts`
- `src\features\agendamentos\services\agendamentos-create-api.test.ts`
- `src\features\agendamentos\services\agendamentos-options-api.test.ts`
- `src\features\agendamentos\services\agendamentos-status-api.test.ts`
- `src\features\agendamentos\services\agendamentos-update-api.test.ts`
- `src\features\arquivos\services\arquivos-api.test.ts`
- `src\features\auth\components\admin-login-boundary.test.tsx`
- `src\features\auth\navigation\admin-login-navigation-state.test.ts`
- `src\features\auth\navigation\admin-return-to.test.ts`
- `src\features\auth\permissions\admin-permissions.test.ts`
- `src\features\auth\schemas\login.schema.test.ts`
- `src\features\auth\services\auth-session.test.ts`
- `src\features\automacoes\services\automacoes-operacionais-api.test.ts`
- `src\features\clientes\services\cliente-profile-actions-api.test.ts`
- `src\features\clientes\services\cliente-profile-extras-api.test.ts`
- `src\features\clientes\services\clientes-api.test.ts`
- `src\features\clientes\services\clientes-lgpd-api.test.ts`
- `src\features\configuracoes\services\configuracoes-api.test.ts`
- `src\features\dashboard\services\dashboard-api.test.ts`
- `src\features\fidelidade\services\fidelidade-api.test.ts`
- `src\features\fidelidade\services\fidelidade-programa-api.test.ts`
- `src\features\financeiro\services\categorias-financeiras-api.test.ts`
- `src\features\financeiro\services\comissoes-api.test.ts`
- `src\features\financeiro\services\financeiro-api.test.ts`
- `src\features\financeiro\services\movimentacoes-financeiras-api.test.ts`
- `src\features\financeiro\services\relatorios-financeiros-api.test.ts`
- `src\features\notificacoes\services\notificacoes-history-api.test.ts`
- `src\features\notificacoes\services\notificacoes-settings-api.test.ts`
- `src\features\pacotes\services\pacotes-api.test.ts`
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
- `src\features\tenant\schemas\tenant.schema.test.ts`
- `src\features\whatsapp\services\whatsapp-campaigns-api.test.ts`
- `src\features\whatsapp\services\whatsapp-messages-api.test.ts`
- `src\features\whatsapp\services\whatsapp-templates-api.test.ts`
- `src\services\auth\access-events.test.ts`
- `src\stores\auth-store.test.ts`
- `src\stores\ui-store.test.ts`

## 7. Matriz de integração

| Área | Evidência encontrada | Decisão |
|---|---:|---|
| Cliente HTTP | 83 ocorrência(s) | Reutilizar somente abstrações existentes |
| TanStack Query | 80 ocorrência(s) | Seguir query foundation do Chat 61 |
| Sessão/tenant | 746 ocorrência(s) | Não duplicar nem substituir auth existente |
| Testes | 73 arquivo(s) | Expandir cobertura somente nos próximos blocos |

## 8. Restrições

- Nenhum serviço novo criado.
- Nenhum endpoint novo criado.
- Nenhum contrato backend alterado.
- Nenhum cache privado exposto.
- Nenhum empresaId inventado.
- Nenhuma funcionalidade dos Chats 63 e 64 antecipada.
- Nenhum commit, push, tag ou deploy executado.

## 9. Próximo bloco

O BLOCO 05/15 deverá auditar autenticação, autorização, roteamento privado e navegação específica que será necessária para as telas do Chat 62.
