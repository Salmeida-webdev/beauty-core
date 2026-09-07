# Beauty Core 1.0 — Chat 62
## BLOCO 05/15 — Auditoria de Auth, Autorização e Navegação Privada

- Data: 2026-09-05 23:08:27 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Auditar a fundação de autenticação, sessão, autorização, guards, rotas privadas e navegação existente antes da inclusão das superfícies autenticadas do Chat 62.

Nenhuma funcionalidade nova foi implementada neste bloco.

## 2. Arquivos auditados

- `e2e\chat47-auth-flow.spec.ts`
- `src\app\portal\historico\page.tsx`
- `src\app\portal\layout.tsx`
- `src\app\portal\page.tsx`
- `src\app\portal\perfil\page.tsx`
- `src\app\portal\portal-private-routing.test.tsx`
- `src\app\portal\portal-routing.test.tsx`
- `src\app\portal\primeiro-acesso\page.tsx`
- `src\config\admin-navigation.chat53.test.ts`
- `src\config\admin-navigation.chat55.test.ts`
- `src\config\admin-navigation.test.ts`
- `src\config\admin-navigation.ts`
- `src\features\agendamentos\agendamentos-navigation.test.ts`
- `src\features\agendamentos\agendamentos-permissions-hardening.test.ts`
- `src\features\agendamentos\permissions\agendamentos-permissions.ts`
- `src\features\arquivos\permissions\arquivos-permissions.ts`
- `src\features\auth\components\admin-sessions-panel.tsx`
- `src\features\auth\components\beauty-core-auth-logo.tsx`
- `src\features\auth\navigation\admin-login-navigation-state.test.ts`
- `src\features\auth\navigation\admin-login-navigation-state.ts`
- `src\features\auth\permissions\admin-permissions.test.ts`
- `src\features\auth\permissions\admin-permissions.ts`
- `src\features\auth\services\auth-api.ts`
- `src\features\auth\services\auth-session.test.ts`
- `src\features\auth\services\auth-session.ts`
- `src\features\auth\types\auth.types.ts`
- `src\features\automacoes\permissions\automacoes.permissions.ts`
- `src\features\chat56\admin-sessions-query-gating.test.ts`
- `src\features\clientes\permissions\clientes-permissions.test.ts`
- `src\features\clientes\permissions\clientes-permissions.ts`
- `src\features\configuracoes\components\configuracoes-navigation-card.test.tsx`
- `src\features\configuracoes\components\configuracoes-navigation-card.tsx`
- `src\features\configuracoes\permissions\configuracoes-permissions.ts`
- `src\features\dashboard\permissions\dashboard-permissions.test.ts`
- `src\features\dashboard\permissions\dashboard-permissions.ts`
- `src\features\fidelidade\permissions\fidelidade-permissions.test.ts`
- `src\features\fidelidade\permissions\fidelidade-permissions.ts`
- `src\features\financeiro\financeiro-navigation.test.ts`
- `src\features\financeiro\permissions\financeiro-permissions.test.ts`
- `src\features\financeiro\permissions\financeiro-permissions.ts`
- `src\features\notificacoes\permissions\notificacoes.permissions.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-permissions.test.ts`
- `src\features\pacotes\clientes-pacotes\clientes-pacotes-permissions.ts`
- `src\features\pacotes\permissions\pacotes-permissions.test.ts`
- `src\features\pacotes\permissions\pacotes-permissions.ts`
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
- `src\features\portal\components\portal-navigation.test.tsx`
- `src\features\portal\components\portal-navigation.tsx`
- `src\features\portal\navigation\portal-navigation.test.ts`
- `src\features\portal\navigation\portal-navigation.ts`
- `src\features\portal\navigation\portal-navigation-config.ts`
- `src\features\portal\pages\portal-authenticated-surface.test.tsx`
- `src\features\portal\pages\portal-authenticated-surface.tsx`
- `src\features\portal\pages\portal-auth-ux.test.tsx`
- `src\features\portal\pages\portal-private-route-page.tsx`
- `src\features\profissionais\permissions\profissionais-permissions.ts`
- `src\features\profissionais\profissionais-navigation.test.ts`
- `src\features\servicos\permissions\servicos-permissions.ts`
- `src\features\unidades\permissions\unidades-permissions.ts`
- `src\features\usuarios\permissions\usuarios-permissions.ts`
- `src\features\whatsapp\permissions\whatsapp.permissions.ts`
- `src\providers\auth-provider.tsx`
- `src\stores\auth-store.test.ts`
- `src\stores\auth-store.ts`

## 3. Estados de autenticação

Quantidade de ocorrências: 880

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:18:    otpIllustration: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:19:      src: "/images/portal/auth/portal-otp-illustration.webp",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:31:  it("solicita OTP pela rota p├║blica tenant-aware sem enviar empresaId", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:36:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:48:    await portalAuthApi.requestOtp({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:62:    ).not.toContain("empresaId");
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:65:  it("verifica OTP pela mesma rota p├║blica e preserva somente os campos contratuais", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:68:        access_token: "access-token",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:69:        refresh_token: "refresh-token",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:72:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:82:          empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:88:    const result = await portalAuthApi.verifyOtp({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:102:    expect(result.access_token).toBe("access-token");
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:103:    expect(result.refresh_token).toBe("refresh-token");
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:107:  it("usa o contrato real de refresh com refreshToken no body", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:110:        access_token: "new-access-token",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:111:        refresh_token: "new-refresh-token",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:116:      refreshToken: "refresh-token",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:122:        refreshToken: "refresh-token",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:127:  it("usa o contrato real de logout da sess├úo atual", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:130:        message: "Logout realizado com sucesso.",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:134:    await portalAuthApi.logout({
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:135:      refreshToken: "refresh-token",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:139:      "/auth-cliente/logout",
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:141:        refreshToken: "refresh-token",
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
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:10:  PortalOtpRequest,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:11:  PortalOtpRequestResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:12:  PortalRefreshTokenRequest,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:13:  PortalRefreshTokenResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:16:  PortalVerifyOtpRequest,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:17:  PortalVerifyOtpResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:25:  async requestOtp(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:26:    request: PortalOtpRequest,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:27:  ): Promise<PortalOtpRequestResponse> {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:28:    const response = await getPublicApiClient().post<PortalOtpRequestResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:38:  async verifyOtp(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:39:    request: PortalVerifyOtpRequest,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:40:  ): Promise<PortalVerifyOtpResponse> {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:41:    const response = await getPublicApiClient().post<PortalVerifyOtpResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:53:    request: PortalRefreshTokenRequest,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:54:  ): Promise<PortalRefreshTokenResponse> {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:56:      await getPublicApiClient().post<PortalRefreshTokenResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:59:          refreshToken: request.refreshToken,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:66:  async logout(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:67:    request: PortalLogoutRequest,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:68:  ): Promise<PortalLogoutResponse> {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:69:    const response = await getApiClient().post<PortalLogoutResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:70:      "/auth-cliente/logout",
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:72:        refreshToken: request.refreshToken,
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:79:  async logoutAll(): Promise<PortalLogoutResponse> {
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:80:    const response = await getApiClient().post<PortalLogoutResponse>(
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts:81:      "/auth-cliente/logout-all",
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:47:  it("does not depend on token values or browser storage", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:50:    queryClient.setQueryData(["portal", "session"], {
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:51:      state: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:57:      queryClient.getQueryData(["portal", "session"]),
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
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:78:    expect(screen.getByTestId("status")).toHaveTextContent("restoring");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:81:    expect(screen.getByTestId("status")).toHaveTextContent("authenticated");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:88:    expect(screen.getByTestId("status")).toHaveTextContent("denied");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:93:    expect(screen.getByTestId("status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:100:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:107:          anonymousFallback={<p>superficie anonima</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:108:          deniedFallback={<p>superficie negada</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:109:          restoringFallback={<p>restaurando</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:123:        initialState={{ status: "authenticated", identity: CLIENT_IDENTITY }}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:126:          anonymousFallback={<p>superficie anonima</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:127:          deniedFallback={<p>superficie negada</p>}
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:128:          restoringFallback={<p>restaurando</p>}
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
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:201:  restoringFallback?: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:202:  anonymousFallback?: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:203:  deniedFallback?: ReactNode;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:208:  restoringFallback = null,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:209:  anonymousFallback = null,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:210:  deniedFallback = null,
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:214:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:215:    return restoringFallback;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:218:  if (status === "anonymous") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:219:    return anonymousFallback;
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:222:  if (status === "denied") {
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:223:    return deniedFallback;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:2:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:9:export type PortalOtpRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:14:export type PortalOtpRequestResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:20:export type PortalVerifyOtpRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:31:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:36:export type PortalVerifyOtpResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:37:  access_token: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:38:  refresh_token: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:44:export type PortalRefreshTokenRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:45:  refreshToken: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:48:export type PortalRefreshTokenResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:49:  access_token: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:50:  refresh_token: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:53:export type PortalLogoutRequest = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:54:  refreshToken: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:57:export type PortalLogoutResponse = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:66:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:80:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:55:          clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:56:          access_token: "token-secreto",
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:65:    expect(result.message).not.toContain("token-secreto");
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
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:31:    (status === "unknown" || status === "restoring") &&
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:32:    hasPortalSession()
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:45:  if (status !== "authenticated") {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:50:    <PortalAuthenticatedRouteController
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:54:    </PortalAuthenticatedRouteController>
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:58:type PortalAuthenticatedRouteControllerProps = {
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:63:function PortalAuthenticatedRouteController({
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:66:}: PortalAuthenticatedRouteControllerProps) {
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:49:  it("honors a safe returnTo after anonymous login", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:4:  PortalVerifyOtpResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:8:  getAccessToken: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:9:  getRefreshToken: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:10:  setTokens: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:11:  clearTokens: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:14:  logout: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:15:  logoutAll: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:18:vi.mock("@/services/auth/token-storage", () => ({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:19:  tokenStorage: {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:20:    getAccessToken: mocks.getAccessToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:21:    getRefreshToken: mocks.getRefreshToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:22:    setTokens: mocks.setTokens,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:23:    clearTokens: mocks.clearTokens,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:31:    logout: mocks.logout,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:32:    logoutAll: mocks.logoutAll,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:37:  clearPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:38:  hasPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:39:  logoutAllPortalSessions,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:40:  logoutPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:41:  restorePortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:42:  startPortalSession,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:43:} from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:45:function createToken(payload: Record<string, unknown>): string {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:53:const accessToken = createToken({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:55:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:56:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:57:  sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:62:const refreshedAccessToken = createToken({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:64:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:65:  empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:66:  sid: "sessao-renovada",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:71:const otpResponse: PortalVerifyOtpResponse = {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:72:  access_token: accessToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:73:  refresh_token: "refresh-token",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:76:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:86:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:93:  mocks.getAccessToken.mockReturnValue(null);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:94:  mocks.getRefreshToken.mockReturnValue(null);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:97:describe("portal-auth-session", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:98:  it("n├úo restaura quando n├úo existem tokens", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:99:    expect(await restorePortalSession()).toBeNull();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:104:    const identity = startPortalSession(otpResponse);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:107:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:108:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:109:      sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:112:    expect(mocks.setTokens).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:113:      accessToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:114:      refreshToken: "refresh-token",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:119:  it("renova sess├úo quando existe somente refresh token", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:120:    mocks.getRefreshToken.mockReturnValue("refresh-antigo");
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:123:      access_token: refreshedAccessToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:124:      refresh_token: "refresh-novo",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:132:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:138:    const identity = await restorePortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:141:      refreshToken: "refresh-antigo",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:146:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:147:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:148:      sid: "sessao-renovada",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:151:    expect(mocks.setTokens).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:152:      accessToken: refreshedAccessToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:153:      refreshToken: "refresh-novo",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:158:  it("limpa a sess├úo local quando o logout atual falha", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:159:    mocks.getRefreshToken.mockReturnValue("refresh-token");
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:160:    mocks.logout.mockRejectedValue(new Error("Servidor indispon├¡vel"));
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:162:    await expect(logoutPortalSession()).rejects.toThrow(
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:166:    expect(mocks.clearTokens).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:169:  it("executa logout-all e limpa a sess├úo local", async () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:170:    mocks.logoutAll.mockResolvedValue({
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:171:      message: "Logout realizado com sucesso.",
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:174:    await logoutAllPortalSessions();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:176:    expect(mocks.logoutAll).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:177:    expect(mocks.clearTokens).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:181:    mocks.getAccessToken.mockReturnValue("access-token");
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:183:    expect(hasPortalSession()).toBe(true);
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:185:    clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:187:    expect(mocks.clearTokens).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:3:import { tokenStorage } from "@/services/auth/token-storage";
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:10:  PortalLogoutResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:12:  PortalRefreshTokenResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:13:  PortalVerifyOtpResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:18:  clienteId?: unknown;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:19:  empresaId?: unknown;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:20:  sid?: unknown;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:25:type PortalStoredTokens = Readonly<{
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:26:  accessToken: string;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:27:  refreshToken: string;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:43:function decodeAccessToken(accessToken: string): PortalJwtClaims {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:44:  const parts = accessToken.split(".");
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:47:    throw new Error("Token Cliente inv├ílido.");
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:57:    throw new Error("Payload do Token Cliente inv├ílido.");
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:61:    throw new Error("Payload do Token Cliente inv├ílido.");
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:78:function getTokenLifetimeInSeconds(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:86:      "O Token Cliente n├úo possui expira├º├úo verific├ível.",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:94:      "A expira├º├úo do Token Cliente ├® inv├ílida.",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:101:function identityFromToken(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:102:  accessToken: string,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:103:  clienteId: string,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:104:  empresaId: string,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:106:  const claims = decodeAccessToken(accessToken);
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
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:125:      "O cliente da sess├úo n├úo corresponde ao Token Cliente.",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:129:  if (tokenEmpresaId !== empresaId) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:131:      "A empresa da sess├úo n├úo corresponde ao Token Cliente.",
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:136:    clienteId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:137:    empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:138:    sid,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:142:function persistTokenPair(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:143:  tokens: PortalStoredTokens,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:145:  const claims = decodeAccessToken(tokens.accessToken);
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:146:  const expiresInSeconds = getTokenLifetimeInSeconds(claims);
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:148:  tokenStorage.setTokens({
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:149:    accessToken: tokens.accessToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:150:    refreshToken: tokens.refreshToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:155:function persistApiTokens(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:156:  response: PortalRefreshTokenResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:158:  persistTokenPair({
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:159:    accessToken: response.access_token,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:160:    refreshToken: response.refresh_token,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:163:  return response.access_token;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:167:  refreshToken: string,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:169:  accessToken: string;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:170:  refreshToken: string;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:173:    refreshToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:176:  const accessToken = persistApiTokens(response);
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:179:    accessToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:180:    refreshToken: response.refresh_token,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:199:export function hasPortalSession(): boolean {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:201:    tokenStorage.getAccessToken() ||
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:202:    tokenStorage.getRefreshToken(),
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:206:export function startPortalSession(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:207:  response: PortalVerifyOtpResponse,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:209:  const identity = identityFromToken(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:210:    response.access_token,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:212:    response.cliente.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:215:  persistTokenPair({
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:216:    accessToken: response.access_token,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:217:    refreshToken: response.refresh_token,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:223:export async function restorePortalSession(): Promise<
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:226:  let accessToken = tokenStorage.getAccessToken();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:227:  let refreshToken = tokenStorage.getRefreshToken();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:230:  if (!accessToken && !refreshToken) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:235:    if (!accessToken && refreshToken) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:236:      const refreshedTokens = await refreshPortalAccess(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:237:        refreshToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:240:      accessToken = refreshedTokens.accessToken;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:241:      refreshToken = refreshedTokens.refreshToken;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:245:    if (!accessToken) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:256:        !refreshToken ||
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:262:      const refreshedTokens = await refreshPortalAccess(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:263:        refreshToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:266:      accessToken = refreshedTokens.accessToken;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:267:      refreshToken = refreshedTokens.refreshToken;
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:271:    return identityFromToken(
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:272:      accessToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:274:      profile.empresaId,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:278:      clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:285:export function clearPortalSession(): void {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:286:  tokenStorage.clearTokens();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:289:export async function logoutPortalSession(): Promise<
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:290:  PortalLogoutResponse | null
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:292:  const refreshToken = tokenStorage.getRefreshToken();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:295:    if (!refreshToken) {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:299:    return await portalAuthApi.logout({
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:300:      refreshToken,
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:303:    clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:307:export async function logoutAllPortalSessions(): Promise<
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:308:  PortalLogoutResponse
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:311:    return await portalAuthApi.logoutAll();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:313:    clearPortalSession();
beauty-core-ui/src/features/portal/auth/portal-auth.ts:3:  "restoring",
beauty-core-ui/src/features/portal/auth/portal-auth.ts:4:  "anonymous",
beauty-core-ui/src/features/portal/auth/portal-auth.ts:5:  "authenticated",
beauty-core-ui/src/features/portal/auth/portal-auth.ts:6:  "denied",
beauty-core-ui/src/features/portal/auth/portal-auth.ts:12:  clienteId: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:13:  empresaId: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:14:  sid: string;
beauty-core-ui/src/features/portal/auth/portal-auth.ts:29:  | { type: "anonymous" }
beauty-core-ui/src/features/portal/auth/portal-auth.ts:30:  | { type: "authenticated"; identity: PortalClientIdentity }
beauty-core-ui/src/features/portal/auth/portal-auth.ts:31:  | { type: "denied" }
beauty-core-ui/src/features/portal/auth/portal-auth.ts:40:      return { status: "restoring", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:41:    case "anonymous":
beauty-core-ui/src/features/portal/auth/portal-auth.ts:42:      return { status: "anonymous", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:43:    case "authenticated":
beauty-core-ui/src/features/portal/auth/portal-auth.ts:44:      return { status: "authenticated", identity: action.identity };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:45:    case "denied":
beauty-core-ui/src/features/portal/auth/portal-auth.ts:46:      return { status: "denied", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:48:      return { status: "anonymous", identity: null };
beauty-core-ui/src/features/portal/auth/portal-auth.ts:57:  return state.status === "authenticated";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:22:  PortalOtpRequestForm,
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:25:} from "./portal-otp-request";
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:29:    requestOtp: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:33:type OtpResponse = Awaited<
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:34:  ReturnType<typeof portalAuthApi.requestOtp>
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:43:const otpResponse: OtpResponse = {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:46:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:54:const requestOtpMock = vi.mocked(portalAuthApi.requestOtp);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:59:      <PortalOtpRequestForm />
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:69:  requestOtpMock.mockReset();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:72:describe("PortalOtpRequestForm", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:100:    expect(requestOtpMock).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:104:    requestOtpMock.mockResolvedValue(otpResponse);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:119:      expect(requestOtpMock).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:125:    expect(requestOtpMock.mock.calls[0][0]).not.toHaveProperty(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:126:      "empresaId",
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:137:    let resolveRequest: (value: OtpResponse) => void = () => undefined;
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:139:    requestOtpMock.mockReturnValue(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:140:      new Promise<OtpResponse>((resolve) => {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:158:    expect(requestOtpMock).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:161:    resolveRequest(otpResponse);
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:169:    requestOtpMock.mockRejectedValue({
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:12:const phoneHintId = "portal-otp-phone-hint";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:13:const phoneErrorId = "portal-otp-phone-error";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:15:type PortalOtpRequestFormProps = {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:53:export function getPortalOtpRequestErrorMessage(error: unknown): string {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:68:export function PortalOtpRequestForm({
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:70:}: PortalOtpRequestFormProps) {
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:101:      const response = await portalAuthApi.requestOtp({
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:113:      setError(getPortalOtpRequestErrorMessage(requestError));
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:126:      aria-labelledby="portal-otp-request-heading"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:132:          id="portal-otp-request-heading"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:152:            htmlFor="portal-otp-phone"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:162:            id="portal-otp-phone"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:23:  PortalOtpVerificationForm,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:24:  normalizePortalOtpCode,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:25:  validatePortalOtpCode,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:26:} from "./portal-otp-verification";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:27:import { startPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:31:    requestOtp: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:32:    verifyOtp: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:40:vi.mock("./portal-auth-session", () => ({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:41:  startPortalSession: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:45:  ReturnType<typeof portalAuthApi.verifyOtp>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:49:  ReturnType<typeof portalAuthApi.requestOtp>
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:59:  access_token: "access-token-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:60:  refresh_token: "refresh-token-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:63:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:73:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:81:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:89:const requestOtpMock = vi.mocked(portalAuthApi.requestOtp);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:90:const verifyOtpMock = vi.mocked(portalAuthApi.verifyOtp);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:92:const startPortalSessionMock = vi.mocked(startPortalSession);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:93:const restoreSessionMock = vi.fn();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:98:      <PortalOtpVerificationForm
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:111:  requestOtpMock.mockReset();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:112:  verifyOtpMock.mockReset();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:113:  startPortalSessionMock.mockReset();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:114:  restoreSessionMock.mockReset();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:115:  restoreSessionMock.mockResolvedValue(undefined);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:118:    restoreSession: restoreSessionMock,
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:121:  startPortalSessionMock.mockReturnValue({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:122:    clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:123:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:124:    sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:128:describe("PortalOtpVerificationForm", () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:145:    expect(normalizePortalOtpCode("12a 345678")).toBe("123456");
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:146:    expect(validatePortalOtpCode("12345")).toBe(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:168:    expect(verifyOtpMock).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:171:  it("verifies the real contract and restores the authenticated session", async () => {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:172:    verifyOtpMock.mockResolvedValue(verifyResponse);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:187:      expect(verifyOtpMock).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:194:    expect(startPortalSessionMock).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:199:      expect(restoreSessionMock).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:209:    verifyOtpMock.mockReturnValue(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:228:    expect(verifyOtpMock).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:243:    verifyOtpMock.mockRejectedValue({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:269:    requestOtpMock.mockResolvedValue(requestResponse);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:280:      expect(requestOtpMock).toHaveBeenCalledWith({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:298:    requestOtpMock.mockRejectedValue({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:320:    verifyOtpMock.mockResolvedValue(verifyResponse);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:321:    restoreSessionMock.mockRejectedValue({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:12:import { startPortalSession } from "./portal-auth-session";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:14:const codeHintId = "portal-otp-code-hint";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:15:const codeErrorId = "portal-otp-code-error";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:17:type PortalOtpVerificationFormProps = {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:22:export function normalizePortalOtpCode(value: string): string {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:26:export function validatePortalOtpCode(value: string): string | null {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:27:  const normalizedCode = normalizePortalOtpCode(value);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:56:export function getPortalOtpVerificationErrorMessage(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:74:function getPortalOtpResendErrorMessage(error: unknown): string {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:89:export function PortalOtpVerificationForm({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:92:}: PortalOtpVerificationFormProps) {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:94:  const { restoreSession } = usePortalAuth();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:113:    const validationError = validatePortalOtpCode(code);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:122:    const normalizedCode = normalizePortalOtpCode(code);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:131:      const response = await portalAuthApi.verifyOtp({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:137:      await startPortalSession(response);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:138:      await restoreSession();
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:143:        getPortalOtpVerificationErrorMessage(verificationError),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:163:      const response = await portalAuthApi.requestOtp({
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:174:      setError(getPortalOtpResendErrorMessage(resendError));
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:188:      aria-labelledby="portal-otp-verification-heading"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:194:          id="portal-otp-verification-heading"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:214:            htmlFor="portal-otp-code"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:224:            id="portal-otp-code"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:233:              setCode(normalizePortalOtpCode(event.target.value));
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:44:  it("does not expose private content to an anonymous client", async () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:46:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:66:      status: "restoring",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:83:      status: "authenticated",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:85:        clienteId: "cliente-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:86:        empresaId: "empresa-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:87:        sid: "sessao-real",
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:101:  it("keeps an administrative path outside the Portal returnTo namespace", async () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:104:      status: "anonymous",
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:32:    if (status !== "anonymous" && status !== "denied") {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:41:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:52:  if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:40:const AUTHENTICATED_STATE: PortalAuthState = {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:41:  status: "authenticated",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:43:    clienteId: "cliente-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:44:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:45:    sid: "sessao-real",
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:49:const ANONYMOUS_STATE: PortalAuthState = {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:50:  status: "anonymous",
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
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:31:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:42:  if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:7:  it("renders children inside the shared Card primitive", () => {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:71:          clienteId: "cliente-secreto",
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:14:  it("accepts only routes inside the Portal namespace", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:10:import { PortalOtpRequestPage } from "@/features/portal/pages/portal-otp-request-page";
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:17:const anonymousState: PortalAuthState = {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:18:  status: "anonymous",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:23:  initialState: PortalAuthState = anonymousState,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:30:          <PortalOtpRequestPage />
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:42:  it("renders the anonymous OTP experience with the official asset", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:70:      "otp",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:80:      portalAssets.auth.otpIllustration.src,
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:95:    renderPage(anonymousState, customTenant);
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:103:  it("uses accessible official states for restoring and denied access", () => {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:105:      status: "restoring",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:116:      status: "denied",
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:120:    const deniedState = screen
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:127:    expect(deniedState).toHaveAttribute(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:132:    const deniedImage = deniedState?.querySelector("img");
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:134:    expect(deniedImage).not.toBeNull();
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:135:    expect(imageSourceFrom(deniedImage)).toContain(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:16:import { PortalAuthenticatedSurface } from "./portal-authenticated-surface";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:23:  logout: vi.fn(),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:24:  logoutAll: vi.fn(),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:35:vi.mock("../auth/portal-auth-session", async (importOriginal) => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:37:    await importOriginal<typeof import("../auth/portal-auth-session")>();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:41:    logoutPortalSession: () =>
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:42:      api.logout({
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:43:        refreshToken: "refresh-token",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:62:              status: "authenticated",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:64:                clienteId: "cliente-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:65:                empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:66:                sid: "sessao-real",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:71:            <PortalAuthenticatedSurface />
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:85:  api.logout.mockReset();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:86:  api.logoutAll.mockReset();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:87:  api.logout.mockResolvedValue({ message: "Logout realizado com sucesso." });
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:88:  api.logoutAll.mockResolvedValue({
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:93:describe("PortalAuthenticatedSurface", () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:94:  it("exposes only the neutral authenticated Portal surface", () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:104:  it("logs out the current client session and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:114:      expect(api.logout).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:116:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:122:    expect(api.logoutAll).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:125:  it("logs out all client sessions and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:137:      expect(api.logoutAll).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:139:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:145:    expect(api.logout).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:148:  it("protects logout actions against double submit", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:149:    let resolveLogout!: () => void;
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:150:    api.logout.mockReturnValue(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:152:        resolveLogout = () => resolve();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:163:    expect(api.logout).toHaveBeenCalledTimes(1);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:166:    resolveLogout();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:173:  it("cleans the local session even when the server logout fails", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:174:    api.logout.mockRejectedValue(new Error("resposta interna da API"));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:185:      expect(screen.getByTestId("auth-status")).toHaveTextContent("anonymous");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:188:        "N├úo foi poss├¡vel confirmar o logout.",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:13:type PortalLogoutAction = "current" | "all";
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:15:export function PortalAuthenticatedSurface() {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:18:  const { clearSession, logoutSession } = usePortalAuth();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:20:  const activeActionRef = useRef<PortalLogoutAction | null>(null);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:22:    useState<PortalLogoutAction | null>(null);
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:25:  async function handleLogout(action: PortalLogoutAction) {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:36:        await portalAuthApi.logoutAll();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:38:        await logoutSession();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:44:          : "N├úo foi poss├¡vel confirmar o logout.",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:48:      clearSession();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:58:        aria-labelledby="portal-authenticated-heading"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:60:        data-testid="portal-authenticated-surface"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:70:            id="portal-authenticated-heading"
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:95:            onClick={() => void handleLogout("current")}
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:105:            onClick={() => void handleLogout("all")}
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:50:    empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:72:    status: "authenticated",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:74:      clienteId: "cliente-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:75:      empresaId: "empresa-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:76:      sid: "sessao-real",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:119:  it("sends an anonymous client back to the Portal entry", async () => {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:121:      status: "anonymous",
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:28:    if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:43:    if (status === "anonymous" || status === "denied") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:4:import { PortalOtpRequestForm as OtpRequestComponent } from "@/features/portal/auth/portal-otp-request";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:13:import { PortalAuthenticatedSurface } from "@/features/portal/pages/portal-authenticated-surface";
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:15:function PortalOtpEntry() {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:20:      aria-labelledby="portal-otp-entry-heading"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:22:      data-portal-auth-surface="otp"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:32:              id="portal-otp-entry-heading"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:48:            <OtpRequestComponent />
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:52:        <aside
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:58:            asset={portalAssets.auth.otpIllustration}
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:66:        </aside>
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:72:function PortalAuthRestoringState() {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:87:function PortalAuthDeniedState() {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:102:export function PortalOtpRequestPage() {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:105:  if (status === "anonymous") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:106:    return <PortalOtpEntry />;
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:109:  if (status === "unknown" || status === "restoring") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:110:    return <PortalAuthRestoringState />;
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:113:  if (status === "denied") {
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:114:    return <PortalAuthDeniedState />;
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:119:      <PortalAuthenticatedSurface />
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:34:  clienteId: "cliente-real",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:35:  empresaId: "empresa-do-contexto",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:36:  sid: "sessao-real",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:53:      anonymousFallback={<p>superficie anonima</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:54:      deniedFallback={<p>superficie indisponivel</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:55:      restoringFallback={<p>restaurando acesso</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:95:  it("connects authenticated client state to private query gating and boundaries", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:99:          status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:109:      "authenticated:true",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:133:            status: "authenticated",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:145:        "anonymous:false",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:167:  it("keeps returnTo inside the Portal namespace", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:177:  it("does not expose private content during the anonymous route foundation", () => {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:182:            status: "anonymous",
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:187:            anonymousFallback={<p>acesso do cliente futuro</p>}
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:217:    expect(transitions).toEqual(["anonymous", "denied"]);
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
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:22:  const { markAnonymous, markDenied } = usePortalAuth();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:27:        if (transition === "anonymous") {
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:28:          markAnonymous();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:32:        markDenied();
beauty-core-ui/src/features/portal/query/portal-query-gate.ts:34:    [markAnonymous, markDenied, queryClient],
beauty-core-ui/src/features/portal/query/portal-query.test.ts:25:    expect(JSON.stringify(publicKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:26:    expect(JSON.stringify(privateKey)).not.toContain("empresaId");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:29:  it("gates private queries exclusively for authenticated clients", () => {
beauty-core-ui/src/features/portal/query/portal-query.test.ts:31:    expect(portalQueryEnabled("restoring", true)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:32:    expect(portalQueryEnabled("anonymous", true)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:33:    expect(portalQueryEnabled("denied", true)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:34:    expect(portalQueryEnabled("authenticated", true)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:39:    expect(portalQueryEnabled("restoring", false)).toBe(false);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:40:    expect(portalQueryEnabled("anonymous", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:41:    expect(portalQueryEnabled("authenticated", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:42:    expect(portalQueryEnabled("denied", false)).toBe(true);
beauty-core-ui/src/features/portal/query/portal-query.test.ts:60:    expect(portalAccessTransitionFromStatus(401)).toBe("anonymous");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:61:    expect(portalAccessTransitionFromStatus(403)).toBe("denied");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:79:    expect(transitions).toEqual(["anonymous"]);
beauty-core-ui/src/features/portal/query/portal-query.ts:28:    return status === "authenticated";
beauty-core-ui/src/features/portal/query/portal-query.ts:32:    status === "anonymous" ||
beauty-core-ui/src/features/portal/query/portal-query.ts:33:    status === "authenticated" ||
beauty-core-ui/src/features/portal/query/portal-query.ts:34:    status === "denied"
beauty-core-ui/src/features/portal/query/portal-query.ts:50:export type PortalAccessTransition = "anonymous" | "denied";
beauty-core-ui/src/features/portal/query/portal-query.ts:56:    return "anonymous";
beauty-core-ui/src/features/portal/query/portal-query.ts:60:    return "denied";
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts:22:      "/login",
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
beauty-core-ui/src/services/auth/refresh-coordinator.ts:3:import type { RefreshTokenResponse } from "@/features/auth/types/auth.types";
beauty-core-ui/src/services/auth/refresh-coordinator.ts:4:import { tokenStorage } from "@/services/auth/token-storage";
beauty-core-ui/src/services/auth/refresh-coordinator.ts:6:export const SESSION_EXPIRED_EVENT =
beauty-core-ui/src/services/auth/refresh-coordinator.ts:7:  "beauty-core:admin-session-expired";
beauty-core-ui/src/services/auth/refresh-coordinator.ts:13:function dispatchSessionExpiredEvent(): void {
beauty-core-ui/src/services/auth/refresh-coordinator.ts:18:  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
beauty-core-ui/src/services/auth/refresh-coordinator.ts:24:  const refreshToken = tokenStorage.getRefreshToken();
beauty-core-ui/src/services/auth/refresh-coordinator.ts:26:  if (!refreshToken) {
beauty-core-ui/src/services/auth/refresh-coordinator.ts:27:    tokenStorage.clearTokens();
beauty-core-ui/src/services/auth/refresh-coordinator.ts:28:    dispatchSessionExpiredEvent();
beauty-core-ui/src/services/auth/refresh-coordinator.ts:30:    throw new Error("Refresh token administrativo ausente.");
beauty-core-ui/src/services/auth/refresh-coordinator.ts:34:    const response = await publicClient.post<RefreshTokenResponse>(
beauty-core-ui/src/services/auth/refresh-coordinator.ts:36:      { refreshToken },
beauty-core-ui/src/services/auth/refresh-coordinator.ts:39:    tokenStorage.setTokens({
beauty-core-ui/src/services/auth/refresh-coordinator.ts:40:      accessToken: response.data.access_token,
beauty-core-ui/src/services/auth/refresh-coordinator.ts:41:      refreshToken: response.data.refresh_token,
beauty-core-ui/src/services/auth/refresh-coordinator.ts:45:    return response.data.access_token;
beauty-core-ui/src/services/auth/refresh-coordinator.ts:47:    tokenStorage.clearTokens();
beauty-core-ui/src/services/auth/refresh-coordinator.ts:48:    dispatchSessionExpiredEvent();
beauty-core-ui/src/services/auth/refresh-coordinator.ts:54:export function refreshAccessToken(
beauty-core-ui/src/services/auth/token-storage.ts:1:´╗┐const REFRESH_TOKEN_STORAGE_KEY = "beauty-core:admin:refresh-token";
beauty-core-ui/src/services/auth/token-storage.ts:4:let accessToken: string | null = null;
beauty-core-ui/src/services/auth/token-storage.ts:5:let accessTokenExpiresAt: number | null = null;
beauty-core-ui/src/services/auth/token-storage.ts:7:type SetTokensParams = {
beauty-core-ui/src/services/auth/token-storage.ts:8:  accessToken: string;
beauty-core-ui/src/services/auth/token-storage.ts:9:  refreshToken: string;
beauty-core-ui/src/services/auth/token-storage.ts:13:function canUseSessionStorage(): boolean {
beauty-core-ui/src/services/auth/token-storage.ts:17:function readRefreshToken(): string | null {
beauty-core-ui/src/services/auth/token-storage.ts:18:  if (!canUseSessionStorage()) {
beauty-core-ui/src/services/auth/token-storage.ts:23:    return window.sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
beauty-core-ui/src/services/auth/token-storage.ts:29:function writeRefreshToken(token: string): void {
beauty-core-ui/src/services/auth/token-storage.ts:30:  if (!canUseSessionStorage()) {
beauty-core-ui/src/services/auth/token-storage.ts:35:    window.sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
beauty-core-ui/src/services/auth/token-storage.ts:41:function removeRefreshToken(): void {
beauty-core-ui/src/services/auth/token-storage.ts:42:  if (!canUseSessionStorage()) {
beauty-core-ui/src/services/auth/token-storage.ts:47:    window.sessionStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
beauty-core-ui/src/services/auth/token-storage.ts:53:export const tokenStorage = {
beauty-core-ui/src/services/auth/token-storage.ts:54:  getAccessToken(): string | null {
beauty-core-ui/src/services/auth/token-storage.ts:55:    return accessToken;
beauty-core-ui/src/services/auth/token-storage.ts:58:  getRefreshToken(): string | null {
beauty-core-ui/src/services/auth/token-storage.ts:59:    return readRefreshToken();
beauty-core-ui/src/services/auth/token-storage.ts:62:  getAccessTokenExpiresAt(): number | null {
beauty-core-ui/src/services/auth/token-storage.ts:63:    return accessTokenExpiresAt;
beauty-core-ui/src/services/auth/token-storage.ts:66:  hasUsableAccessToken(
beauty-core-ui/src/services/auth/token-storage.ts:69:    if (!accessToken || !accessTokenExpiresAt) {
beauty-core-ui/src/services/auth/token-storage.ts:73:    return accessTokenExpiresAt - safetyWindowMs > Date.now();
beauty-core-ui/src/services/auth/token-storage.ts:76:  setAccessToken(token: string, expiresInSeconds: number): void {
beauty-core-ui/src/services/auth/token-storage.ts:77:    accessToken = token;
beauty-core-ui/src/services/auth/token-storage.ts:78:    accessTokenExpiresAt = Date.now() + expiresInSeconds * 1_000;
beauty-core-ui/src/services/auth/token-storage.ts:81:  setRefreshToken(token: string): void {
beauty-core-ui/src/services/auth/token-storage.ts:82:    writeRefreshToken(token);
beauty-core-ui/src/services/auth/token-storage.ts:85:  setTokens({
beauty-core-ui/src/services/auth/token-storage.ts:86:    accessToken: nextAccessToken,
beauty-core-ui/src/services/auth/token-storage.ts:87:    refreshToken,
beauty-core-ui/src/services/auth/token-storage.ts:89:  }: SetTokensParams): void {
beauty-core-ui/src/services/auth/token-storage.ts:90:    accessToken = nextAccessToken;
beauty-core-ui/src/services/auth/token-storage.ts:91:    accessTokenExpiresAt = Date.now() + expiresInSeconds * 1_000;
beauty-core-ui/src/services/auth/token-storage.ts:92:    writeRefreshToken(refreshToken);
beauty-core-ui/src/services/auth/token-storage.ts:95:  clearAccessToken(): void {
beauty-core-ui/src/services/auth/token-storage.ts:96:    accessToken = null;
beauty-core-ui/src/services/auth/token-storage.ts:97:    accessTokenExpiresAt = null;
beauty-core-ui/src/services/auth/token-storage.ts:100:  clearTokens(): void {
beauty-core-ui/src/services/auth/token-storage.ts:101:    accessToken = null;
beauty-core-ui/src/services/auth/token-storage.ts:102:    accessTokenExpiresAt = null;
beauty-core-ui/src/services/auth/token-storage.ts:103:    removeRefreshToken();
beauty-core-ui/src/stores/auth-store.test.ts:7:    getAuthState().clearSession();
beauty-core-ui/src/stores/auth-store.test.ts:11:    expect(getAuthState().status).toBe("idle");
beauty-core-ui/src/stores/auth-store.test.ts:16:    getAuthState().beginSessionRestore();
beauty-core-ui/src/stores/auth-store.test.ts:17:    expect(getAuthState().status).toBe("restoring");
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
beauty-core-ui/src/stores/auth-store.test.ts:53:    expect(getAuthState().status).toBe("idle");
beauty-core-ui/src/stores/auth-store.ts:3:import type { AdminSessionIdentity } from "@/features/auth/types/auth.types";
beauty-core-ui/src/stores/auth-store.ts:6:  | "idle"
beauty-core-ui/src/stores/auth-store.ts:7:  | "restoring"
beauty-core-ui/src/stores/auth-store.ts:8:  | "authenticated"
beauty-core-ui/src/stores/auth-store.ts:9:  | "unauthenticated";
beauty-core-ui/src/stores/auth-store.ts:13:  user: AdminSessionIdentity | null;
beauty-core-ui/src/stores/auth-store.ts:14:  beginSessionRestore: () => void;
beauty-core-ui/src/stores/auth-store.ts:15:  setAuthenticated: (user: AdminSessionIdentity) => void;
beauty-core-ui/src/stores/auth-store.ts:16:  setUnauthenticated: () => void;
beauty-core-ui/src/stores/auth-store.ts:17:  clearSession: () => void;
beauty-core-ui/src/stores/auth-store.ts:21:  status: "idle" as AuthStatus,
beauty-core-ui/src/stores/auth-store.ts:28:  beginSessionRestore: () => {
beauty-core-ui/src/stores/auth-store.ts:29:    set({ status: "restoring" });
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

Devem ser preservados os estados existentes:

- idle;
- restoring;
- authenticated;
- unauthenticated;
- anonymous;
- denied.

## 4. Guards e autorização

Quantidade de ocorrências: 231

``text
beauty-core-ui/src/app/portal/historico/page.tsx:1:import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
beauty-core-ui/src/app/portal/historico/page.tsx:5:    <PortalPrivateRoutePage
beauty-core-ui/src/app/portal/perfil/page.tsx:1:import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
beauty-core-ui/src/app/portal/perfil/page.tsx:5:    <PortalPrivateRoutePage
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:5:vi.mock("@/features/portal/auth/portal-private-route", () => ({
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:6:  PortalPrivateRoute: ({ children }: { children: ReactNode }) => (
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:28:    expect(screen.getByRole("heading", { name: "Perfil" })).toBeInTheDocument();
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:29:    expect(screen.getByRole("heading", { name: "Historico" })).toBeInTheDocument();
beauty-core-ui/src/app/portal/portal-routing.test.tsx:34:      screen.getByRole("heading", { name: portalHeading }),
beauty-core-ui/src/app/portal/portal-routing.test.tsx:40:      screen.getByRole("form", {
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:12:          role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:79:    screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:103:    screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx:130:    screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:77:    fireEvent.click(screen.getByRole("button", { name: "restaurar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:80:    fireEvent.click(screen.getByRole("button", { name: "autenticar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:87:    fireEvent.click(screen.getByRole("button", { name: "negar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx:92:    fireEvent.click(screen.getByRole("button", { name: "limpar" }));
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx:109:      if (normalized.kind === "forbidden") {
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:10:    [401, "unauthorized"],
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts:11:    [403, "forbidden"],
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:5:  | "unauthorized"
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:6:  | "forbidden"
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:25:    return "unauthorized";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:29:    return "forbidden";
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:51:    case "unauthorized":
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:53:    case "forbidden":
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts:58:      return "Muitas tentativas. Aguarde antes de tentar novamente.";
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:17:  replace: vi.fn(),
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:24:    replace: navigation.replace,
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:81:  navigation.replace.mockReset();
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:101:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:118:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:131:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx:143:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:38:        role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:89:        router.replace(target);
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:140:        role="status"
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx:151:        role="alert"
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts:59:  it("does not redirect a normal user from the regular Portal route", () => {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:32:    .replace(/-/g, "+")
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:33:    .replace(/_/g, "/");
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:192:function isUnauthorized(error: unknown): boolean {
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:255:        !isUnauthorized(error) ||
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:91:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:97:      screen.getByRole("alert"),
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:113:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:130:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:151:    const form = screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:159:    expect(screen.getByRole("button")).toBeDisabled();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:164:      expect(screen.getByRole("status")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:182:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:188:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx:189:        "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.",
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:20:  return value.trim().replace(/\D/g, "");
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:62:      return "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.";
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:188:              role="alert"
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx:207:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:159:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:164:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:181:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:200:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:221:    const form = screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:229:    expect(screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:236:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:256:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:262:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:274:      screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:287:      screen.getByRole("status"),
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:291:      screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:307:      screen.getByRole("button", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:313:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:314:        "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.",
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:334:      screen.getByRole("form", {
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx:340:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:23:  return value.replace(/\D/g, "").slice(0, 6);
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:68:      return "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:83:      return "Muitas solicita├º├Áes. Aguarde alguns instantes antes de tentar novamente.";
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:251:              role="alert"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:279:            role="status"
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx:289:            role="status"
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:12:  router: { replace: vi.fn() },
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:31:import { PortalPrivateRoute } from "./portal-private-route";
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:39:  mocks.router.replace.mockReset();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:43:describe("PortalPrivateRoute", () => {
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:51:      <PortalPrivateRoute>
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:53:      </PortalPrivateRoute>,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:58:      expect(mocks.router.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:71:      <PortalPrivateRoute>
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:73:      </PortalPrivateRoute>,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:76:    expect(screen.getByRole("status")).toBeInTheDocument();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:78:    expect(mocks.router.replace).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:92:      <PortalPrivateRoute>
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:94:      </PortalPrivateRoute>,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:98:    expect(mocks.router.replace).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:109:      <PortalPrivateRoute>
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:111:      </PortalPrivateRoute>,
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx:115:      expect(mocks.router.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:17:type PortalPrivateRouteProps = {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:23:export function PortalPrivateRoute({
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:25:}: PortalPrivateRouteProps) {
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:36:    router.replace(
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:43:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:45:          description="Aguarde enquanto confirmamos sua sessao."
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx:54:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:211:        screen.getByRole("heading", {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:230:        screen.getByRole("heading", {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:237:      screen.getByRole("button", { name: "Tentar novamente" }),
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:247:      screen.getByRole("heading", {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:33:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:35:          description="Aguarde enquanto confirmamos sua sessao."
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:44:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:55:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:57:          description="Aguarde enquanto seus dados sao carregados."
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:68:      error.kind === "unauthorized" ||
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:69:      error.kind === "forbidden"
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:72:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:83:        <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:99:      <div aria-live="assertive" className="w-full" role="alert">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:116:      <div aria-live="polite" className="w-full" role="status">
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:118:          description="Aguarde enquanto seus dados sao carregados."
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:23:    expect(screen.getAllByRole("link")).toHaveLength(6);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:24:    expect(screen.getAllByRole("link", { name: "Inicio" })).toHaveLength(2);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:25:    expect(screen.getAllByRole("link", { name: "Perfil" })).toHaveLength(2);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:26:    expect(screen.getAllByRole("link", { name: "Historico" })).toHaveLength(2);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:29:      screen.getAllByRole("link", { name: "Perfil" }).every(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:34:      screen.getAllByRole("link", { name: "Inicio" }).every(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:43:    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:44:    expect(screen.queryByRole("link")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:58:    const links = screen.getAllByRole("link", { name: "Historico" });
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:88:    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:89:    expect(screen.queryByRole("link")).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:15:      screen.getByRole("heading", { name: "Foundation do portal" }),
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:23:    expect(screen.getByRole("banner")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:24:    expect(screen.getByRole("main")).toHaveAttribute(
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:28:    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:30:    const skipLink = screen.getByRole("link", {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:48:    const main = screen.getByRole("main");
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:72:    const button = screen.getByRole("button", {
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:90:    const panel = screen.getByRole("heading", {
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:32:    expect(screen.getByRole("banner")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:33:    expect(screen.getByRole("main")).toHaveAttribute("id", "portal-main");
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:34:    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:41:      screen.getByRole("link", {
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:16:    [401, "unauthorized"],
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts:17:    [403, "forbidden"],
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:46:      screen.getByRole("heading", {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:63:      .getByRole("heading", {
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:109:    expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:121:      .getByRole("heading", { name: "Acesso indispon├¡vel" })
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx:124:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:19:  replace: vi.fn(),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:84:  navigation.replace.mockReset();
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:98:      screen.getByRole("heading", { name: "Acesso autenticado" }),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:111:    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:115:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:133:      screen.getByRole("button", { name: "Encerrar todas as sess├Áes" }),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:138:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:158:    const button = screen.getByRole("button", { name: "Sair" });
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:169:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:182:    fireEvent.click(screen.getByRole("button", { name: "Sair" }));
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:186:      expect(navigation.replace).toHaveBeenCalledWith("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:187:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:195:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:49:      router.replace("/portal");
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:84:            role="alert"
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:25:      screen.getByRole("img", { name: "Ilustra├º├úo do primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:27:    expect(screen.getByRole("checkbox")).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:29:      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:41:      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:46:      screen.getByRole("alert"),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:59:    fireEvent.click(screen.getByRole("checkbox"));
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:60:    const button = screen.getByRole("button", {
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:74:        screen.getByRole("status"),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:85:    fireEvent.click(screen.getByRole("checkbox"));
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:87:      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:91:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx:95:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:19:  replace: vi.fn(),
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:26:    replace: navigation.replace,
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:68:  navigation.replace.mockReset();
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:93:        screen.getByRole("heading", {
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:99:    expect(navigation.replace).not.toHaveBeenCalled();
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:113:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:132:      expect(navigation.replace).toHaveBeenCalledWith(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx:150:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:53:      router.replace(
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:80:          router.replace(returnTo);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:105:    router.replace(returnTo);
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:110:      <p aria-live="polite" className="py-10 text-center text-sm text-muted-foreground" role="status">
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx:118:      <p aria-live="assertive" className="py-10 text-center text-sm text-destructive" role="alert">
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:77:      role="status"
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:80:        description="Aguarde enquanto confirmamos sua sess├úo."
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx:92:      role="alert"
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:5:import { PortalPrivateRoute } from "@/features/portal/auth/portal-private-route";
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:8:type PortalPrivateRoutePageProps = {
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:14:export function PortalPrivateRoutePage({
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:18:}: PortalPrivateRoutePageProps) {
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:20:    <PortalPrivateRoute>
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:23:          aria-labelledby="portal-private-route-heading"
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:32:            id="portal-private-route-heading"
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx:42:    </PortalPrivateRoute>
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:24:    const image = screen.getByRole("img", {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:32:      screen.getByRole("heading", {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:36:    expect(screen.getByRole("checkbox")).toBeRequired();
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:37:    expect(screen.getByRole("button", { name: "Aceitar e continuar" })).toBeInTheDocument();
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:45:    fireEvent.click(screen.getByRole("button", { name: "Aceitar e continuar" }));
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:48:    expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:62:    fireEvent.click(screen.getByRole("checkbox"));
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:64:    const button = screen.getByRole("button", {
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:77:      expect(screen.getByRole("status")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:89:    fireEvent.click(screen.getByRole("checkbox"));
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:91:      screen.getByRole("button", { name: "Aceitar e continuar" }),
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:95:      expect(screen.getByRole("alert")).toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx:100:    expect(screen.getByRole("alert")).not.toHaveTextContent(
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:62:          role="status"
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx:181:                role="alert"
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:82:    expect(screen.getByRole("banner")).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:83:    expect(screen.getByRole("main")).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:84:    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:87:      screen.getByRole("heading", {
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:229:      screen.getByRole("heading", { name: "Lista vazia" }),
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:233:      screen.getByRole("heading", { name: "Lista vazia" })
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:27:          description="Aguarde enquanto os dados sao preparados."
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:59:      screen.getByRole("heading", { name: "Carregando conteudo" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:63:      screen.getByRole("heading", { name: "Nenhum item encontrado" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:67:      screen.getByRole("heading", { name: "Nao foi possivel carregar" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:71:      screen.getByRole("heading", { name: "Conexao indisponivel" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:75:      screen.getByRole("heading", { name: "Operacao concluida" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:79:      screen.getByRole("heading", { name: "Acesso indisponivel" }),
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx:102:      screen.getByRole("button", { name: "Tentar novamente" }),
``

Regras:

- toda nova tela privada deve passar pelo guard existente;
- não utilizar apenas proteção visual;
- não confiar em parâmetros de URL para identificar cliente ou tenant;
- não permitir acesso durante estados anonymous ou denied;
- não expor dados enquanto a sessão estiver sendo restaurada.

## 5. Navegação

Quantidade de ocorrências: 88

``text
beauty-core-ui/src/app/portal/historico/page.tsx:1:import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
beauty-core-ui/src/app/portal/historico/page.tsx:7:      heading="Historico"
beauty-core-ui/src/app/portal/layout.tsx:3:import { PortalAuthProvider } from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/app/portal/layout.tsx:4:import { PortalShell } from "@/features/portal/components/portal-shell";
beauty-core-ui/src/app/portal/layout.tsx:15:      <PortalShell>{children}</PortalShell>
beauty-core-ui/src/app/portal/layout.tsx:16:    </PortalAuthProvider>
beauty-core-ui/src/app/portal/page.tsx:1:import { PortalOtpRequestPage } from "@/features/portal/pages/portal-otp-request-page";
beauty-core-ui/src/app/portal/perfil/page.tsx:1:import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
beauty-core-ui/src/app/portal/perfil/page.tsx:6:      description="A apresentacao dos dados autorizados do seu perfil sera disponibilizada nesta rota."
beauty-core-ui/src/app/portal/perfil/page.tsx:7:      heading="Perfil"
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:5:vi.mock("@/features/portal/auth/portal-private-route", () => ({
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:11:import PortalHistoryRoute from "./historico/page";
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:12:import PortalProfileRoute from "./perfil/page";
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:13:import { portalNavigationItems } from "@/features/portal/navigation/portal-navigation-config";
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:19:describe("Portal private App Router routes", () => {
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:20:  it("keeps Perfil and Historico under the shared private route boundary", () => {
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:28:    expect(screen.getByRole("heading", { name: "Perfil" })).toBeInTheDocument();
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx:29:    expect(screen.getByRole("heading", { name: "Historico" })).toBeInTheDocument();
beauty-core-ui/src/app/portal/portal-routing.test.tsx:9:} from "@/features/portal/auth/portal-auth-context";
beauty-core-ui/src/app/portal/portal-routing.test.tsx:29:        </PortalAuthProvider>
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx:3:import { PortalFirstAccessPage } from "@/features/portal/pages/portal-first-access-page";
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
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:55:  perfil: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:62:  agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:84:      {status}|{query.status}|{query.fetchStatus}|{query.data?.perfil.nome ?? ""}
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:105:      </PortalAuthProvider>
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:119:    </PortalDashboardDataBoundary>,
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:201:      agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:5:import { usePortalAuth } from "../auth/portal-auth-context";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:6:import { normalizePortalResourceError } from "../errors/portal-resource-errors";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:11:} from "../query/portal-dashboard-data";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:12:import { usePortalDashboardQuery } from "../query/portal-dashboard-query";
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx:19:} from "../states/portal-state-views";
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:13:import { PortalNavigation } from "./portal-navigation";
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:21:    render(<PortalNavigation activePath="/portal/perfil" />);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:25:    expect(screen.getAllByRole("link", { name: "Perfil" })).toHaveLength(2);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:26:    expect(screen.getAllByRole("link", { name: "Historico" })).toHaveLength(2);
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:29:      screen.getAllByRole("link", { name: "Perfil" }).every(
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:50:        activePath="/portal/historico"
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:52:          { href: "/portal", label: "Inicio" },
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:53:          { href: "/portal/historico", label: "Historico" },
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx:58:    const links = screen.getAllByRole("link", { name: "Historico" });
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:4:import { usePathname } from "next/navigation";
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:6:import { portalNavigationItems } from "../navigation/portal-navigation-config";
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:11:} from "../navigation/portal-navigation";
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:24:  const pathname = usePathname();
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:25:  const resolvedActivePath = activePath ?? pathname ?? "/portal";
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:52:                  href={item.href}
beauty-core-ui/src/features/portal/components/portal-navigation.tsx:78:                  href={item.href}
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:4:import { PortalPageContainer } from "./portal-page-container";
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx:11:      </PortalPageContainer>,
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:6:import { PortalShell } from "./portal-shell";
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:7:import { PortalErrorState, PortalEmptyState } from "../states/portal-state-views";
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:19:        </PortalShell>
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx:44:        </PortalShell>
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:16:import { PortalShell } from "./portal-shell";
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx:28:        </PortalShell>
beauty-core-ui/src/features/portal/components/portal-shell.tsx:6:import { PortalBranding } from "./portal-branding";
beauty-core-ui/src/features/portal/components/portal-shell.tsx:7:import { PortalNavigation } from "./portal-navigation";
beauty-core-ui/src/features/portal/components/portal-shell.tsx:20:        href="#portal-main"
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:1:import type { PortalNavigationItem } from "./portal-navigation";
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:4:  { href: "/portal", label: "Inicio" },
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:5:  { href: "/portal/perfil", label: "Perfil" },
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts:6:  { href: "/portal/historico", label: "Historico" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:7:import { portalNavigationItems } from "./portal-navigation-config";
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:11:} from "./portal-navigation";
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:15:    expect(isSafePortalHref("/portal")).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:16:    expect(isSafePortalHref("/portal/historico")).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:24:      { href: "/portal", label: "Inicio" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:25:      { href: "/portal/perfil", label: "Perfil" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:26:      { href: "/portal/historico", label: "Historico" },
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:33:    expect(isPortalNavigationItemActive("/portal", "/portal")).toBe(true);
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:34:    expect(isPortalNavigationItemActive("/portal", "/portal/historico"))
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:38:        "/portal/historico",
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts:39:        "/portal/historico/detalhes",
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:8:  return href === "/portal" || href.startsWith("/portal/");
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:15:  if (href === "/portal") {
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts:16:    return activePath === "/portal";
``

A navegação futura deverá:

- reutilizar o componente e a configuração existentes;
- manter Admin e Portal Cliente isolados;
- apresentar apenas rotas autorizadas;
- possuir estado ativo acessível;
- funcionar em mobile;
- não criar links para funcionalidades fora do Chat 62.

## 6. Testes existentes

- `src\app\portal\portal-private-routing.test.tsx`
- `src\app\portal\portal-routing.test.tsx`
- `src\features\auth\components\admin-login-boundary.test.tsx`
- `src\features\auth\navigation\admin-login-navigation-state.test.ts`
- `src\features\auth\navigation\admin-return-to.test.ts`
- `src\features\auth\permissions\admin-permissions.test.ts`
- `src\features\auth\schemas\login.schema.test.ts`
- `src\features\auth\services\auth-session.test.ts`
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
- `src\services\auth\access-events.test.ts`

## 7. Matriz de segurança

| Área | Evidência | Critério obrigatório |
|---|---:|---|
| Autenticação | 880 ocorrência(s) | Reutilizar sessão existente |
| Guards | 231 ocorrência(s) | Proteger rota e dados |
| Navegação | 88 ocorrência(s) | Manter isolamento do Portal |
| Testes | 44 arquivo(s) | Preservar e ampliar cobertura |

## 8. Restrições preservadas

- Nenhum guard novo criado.
- Nenhuma rota funcional nova criada.
- Nenhuma alteração no backend.
- Nenhum contrato JWT alterado.
- Nenhum bypass de autorização.
- Nenhuma funcionalidade dos Chats 63 e 64 antecipada.
- Nenhum commit, push, tag ou deploy executado.

## 9. Próximo bloco

O BLOCO 06/15 deverá definir a arquitetura de dados e o modelo de estados de loading, erro, vazio, acesso negado e sucesso para os domínios autorizados do Chat 62.
