# Beauty Core 1.0 — Chat 62
## BLOCO 03/15 — Validação dos Contratos por Domínio

- Data: 2026-09-05 23:06:35 -03:00
- Branch: chat32-bullmq-enterprise
- HEAD: b9913a7c007e03929ac893ef01e1a849f04394fe
- Backend alterado: NÃO

## 1. Objetivo

Validar se o frontend possui contratos reais e reutilizáveis para:

- agendamentos;
- fidelidade;
- benefícios;
- pacotes;
- consumo e saldo.

Este bloco não implementa funcionalidades e não cria endpoints fictícios.

## 2. Regra de classificação

Cada domínio deverá ser classificado como:

- SUPORTADO: existem tipos, schemas, adapters e superfície compatível;
- PARCIAL: existe parte do contrato, mas falta suporte suficiente;
- NÃO SUPORTADO: não existe contrato aplicável;
- DEPENDENTE DO BACKEND: a implementação exigiria alteração fora do escopo.

## 3. Agendamentos

Quantidade de ocorrências: 57

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:6:  appointments: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:8:      src: "/images/portal/appointments/portal-appointments.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:122:  | (typeof portalAssets)["appointments"]["illustration"]
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:11:    queryClient.setQueryData(["portal", "agendamentos"], [{ id: "agenda-1" }]);
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts:20:      queryClient.getQueryData(["portal", "agendamentos"]),
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:62:  agendamentos: {
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:201:      agendamentos: {
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
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts:17:  agendamentos: {
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
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:44:    quantidadeAgendamentos: 2,
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:52:function appointmentResponse() {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:54:    id: "agendamento-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:113:        agendamentos: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:114:          proximos: [appointmentResponse()],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:145:      agendamentos: {
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:168:          tipo: "AGENDAMENTO",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:174:            id: "agendamento-secreto",
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:198:        tipo: "AGENDAMENTO",
``

Classificação final deverá ser definida após leitura manual dos arquivos encontrados.

## 4. Fidelidade

Quantidade de ocorrências: 40

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:27:  benefits: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:60:  loyalty: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:62:      src: "/images/portal/loyalty/portal-loyalty.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:125:  | (typeof portalAssets)["benefits"]["illustration"]
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
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:124:        beneficios: [{ empresaId: "empresa-secreta" }],
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

Classificação final deverá ser definida após leitura manual dos arquivos encontrados.

## 5. Benefícios

Quantidade de ocorrências: 4

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:27:  benefits: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:29:      src: "/images/portal/benefits/portal-benefits.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:125:  | (typeof portalAssets)["benefits"]["illustration"]
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:124:        beneficios: [{ empresaId: "empresa-secreta" }],
``

Classificação final deverá ser definida após leitura manual dos arquivos encontrados.

## 6. Pacotes e consumo

Quantidade de ocorrências: 17

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:80:  packages: {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:82:      src: "/images/portal/packages/portal-packages.webp",
beauty-core-ui/src/features/portal/assets/portal-assets.ts:135:  | (typeof portalAssets)["packages"]["illustration"]
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:39:  logoutAllPortalSessions,
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts:174:    await logoutAllPortalSessions();
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts:307:export async function logoutAllPortalSessions(): Promise<
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx:217:    expect(screen.queryByText(/pontos|saldo|total/i)).not.toBeInTheDocument();
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts:16:  "PACOTE",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:89:    message: "Todas as sess├Áes foram encerradas com sucesso.",
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:125:  it("logs out all client sessions and cleans private state", async () => {
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx:133:      screen.getByRole("button", { name: "Encerrar todas as sess├Áes" }),
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:43:          ? "N├úo foi poss├¡vel confirmar o encerramento das sess├Áes."
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:109:              ? "Encerrando sess├Áes..."
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx:110:              : "Encerrar todas as sess├Áes"}
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:43:    pacotesAtivos: [],
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:119:          saldoPontos: 999,
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts:121:        pacotes: {
``

Classificação final deverá ser definida após leitura manual dos arquivos encontrados.

## 7. Contratos, schemas e adapters

Quantidade de ocorrências: 132

``text
beauty-core-ui/src/features/portal/assets/portal-assets.ts:1:export type PortalAssetDefinition = {
beauty-core-ui/src/features/portal/assets/portal-assets.ts:119:export type PortalAssetKey = keyof typeof portalAssets;
beauty-core-ui/src/features/portal/assets/portal-assets.ts:121:export type PortalAsset =
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:23:  portalAuthQueryKeys,
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:203:    expect(portalAuthQueryKeys.me()).toEqual([
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts:210:      JSON.stringify(portalAuthQueryKeys.me()),
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
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:85:export const portalAuthQueryKeys = {
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts:88:  me: () => [...portalAuthQueryKeys.all, "me"] as const,
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
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:39:    status: z.enum(PORTAL_APPOINTMENT_STATUS_VALUES),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:40:    servico: namedRelationSchema.nullable().optional(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:41:    profissional: professionalRelationSchema.nullable().optional(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:42:    unidade: namedRelationSchema.nullable().optional(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:46:export const portalDashboardTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:48:    perfil: portalProfileTransportSchema,
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:51:        proximos: z.array(portalAppointmentTransportSchema),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:52:        ultimo: portalAppointmentTransportSchema.nullable(),
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:58:export const portalHistoryItemTransportSchema = z
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts:60:    tipo: z.enum(PORTAL_HISTORY_TYPE_VALUES),
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
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:24:  portalQueryKeys,
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx:123:    const privateKey = portalQueryKeys.privateResource("profile");
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
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:6:export type PortalDashboardAppointmentViewModel =
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts:17:export type PortalDashboardViewModel = Readonly<{
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:4:import { portalClientQueryKeys } from "./portal-client-query-keys";
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts:12:    queryKey: portalClientQueryKeys.dashboard(),
beauty-core-ui/src/features/portal/query/portal-query.test.ts:9:  portalQueryKeys,
beauty-core-ui/src/features/portal/query/portal-query.test.ts:15:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:16:    const privateKey = portalQueryKeys.privateResource("profile", "current");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:47:    const privateKey = portalQueryKeys.privateResource("profile");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:48:    const publicKey = portalQueryKeys.publicResource("tenant");
beauty-core-ui/src/features/portal/query/portal-query.test.ts:67:    const privateKey = portalQueryKeys.privateResource("history");
beauty-core-ui/src/features/portal/query/portal-query.ts:5:export const portalQueryKeys = {
beauty-core-ui/src/features/portal/query/portal-query.ts:8:  public: () => [...portalQueryKeys.all, "public"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:10:  private: () => [...portalQueryKeys.all, "private"] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:15:  ) => [...portalQueryKeys.public(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:20:  ) => [...portalQueryKeys.private(), resource, ...parts] as const,
beauty-core-ui/src/features/portal/query/portal-query.ts:42:    queryKey: portalQueryKeys.private(),
beauty-core-ui/src/features/portal/query/portal-query.ts:46:    queryKey: portalQueryKeys.private(),
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

## 8. Chamadas HTTP

Quantidade de ocorrências: 8

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

## 9. Matriz de decisão

| Domínio | Evidência encontrada | Situação neste bloco | Ação permitida |
|---|---:|---|---|
| Agendamentos | 57 ocorrência(s) | Em validação | Reutilizar somente contrato confirmado |
| Fidelidade | 40 ocorrência(s) | Em validação | Reutilizar somente contrato confirmado |
| Benefícios | 4 ocorrência(s) | Em validação | Reutilizar somente contrato confirmado |
| Pacotes/consumo | 17 ocorrência(s) | Em validação | Reutilizar somente contrato confirmado |

## 10. Restrições

- Nenhum tipo novo de domínio foi criado.
- Nenhum endpoint novo foi criado.
- Nenhuma resposta fictícia foi criada.
- Nenhuma alteração foi feita no backend.
- Nenhuma funcionalidade dos Chats 63 e 64 foi antecipada.
- Nenhum commit, push, tag ou deploy foi executado.

## 11. Próximo bloco

O BLOCO 04/15 deverá auditar especificamente os serviços HTTP, adapters, query keys, query options e regras de cache que poderão ser reutilizados com segurança.
