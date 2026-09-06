# CHAT 63 — BLOCO 11/15

## Alinhamento do contrato ClienteArea com o frontend

Este bloco apenas mapeia os contratos existentes e a foundation frontend. Nenhum endpoint, role ou contrato backend foi alterado.

## Backend ClienteArea encontrado

### beauty-core-backend/src/modules/cliente-area/cliente-area.controller.ts

Controller,
UseGuards,
import { ClienteAuthGuard } from '../auth-cliente/guards/cliente-auth.guard';
import { ClienteAreaService } from './cliente-area.service';
import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';
clienteId?: string;
empresaId: string;
@UseGuards(ClienteAuthGuard)
@Controller('cliente-area')
export class ClienteAreaController {
const clienteId = req.user.clienteId ?? req.user.sub;
clienteId,
empresaId: req.user.empresaId,
@Get('me')
me(@Req() req: ClienteRequest) {
@Get('me/dashboard')
dashboard(@Req() req: ClienteRequest) {
@Get('me/agendamentos')
@Req() req: ClienteRequest,
@Query() query: ClienteAreaQueryDto,
@Get('me/proximos-agendamentos')
@Req() req: ClienteRequest,
@Query() query: ClienteAreaQueryDto,
@Get('me/ultimo-agendamento')
ultimoAgendamento(@Req() req: ClienteRequest) {
@Get('me/fidelidade')
fidelidade(@Req() req: ClienteRequest) {
@Get('me/pontos')
@Req() req: ClienteRequest,
@Query() query: ClienteAreaQueryDto,
@Get('me/beneficios')
beneficios(@Req() req: ClienteRequest) {
@Get('me/pacotes')
pacotes(@Req() req: ClienteRequest) {
@Get('me/pacotes/:pacoteId')
@Req() req: ClienteRequest,
@Param('pacoteId') pacoteId: string,
@Get('me/notificacoes')
notificacoes(
@Req() req: ClienteRequest,
@Query() query: ClienteAreaQueryDto,
return this.clienteAreaService.notificacoes(this.getAuth(req), query);
@Get('me/notificacoes/nao-lidas')
notificacoesNaoLidas(@Req() req: ClienteRequest) {
return this.clienteAreaService.notificacoesNaoLidas(this.getAuth(req));
@Patch('me/notificacoes/:id/lida')
@Req() req: ClienteRequest,
@Param('id') id: string,
@Get('me/mensagens-whatsapp')
@Req() req: ClienteRequest,
@Query() query: ClienteAreaQueryDto,
@Get('me/historico')
historico(
@Req() req: ClienteRequest,
@Query() query: ClienteAreaQueryDto,
return this.clienteAreaService.historico(this.getAuth(req), query);

### beauty-core-backend/src/modules/cliente-area/cliente-area.service.ts

import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';
clienteId?: string;
empresaId: string;
if (!auth.clienteId || !auth.empresaId) {
clienteId: auth.clienteId,
empresaId: auth.empresaId,
id: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
notificacoesNaoLidas,
this.buscarNotificacoesNaoLidasInterno(auth),
notificacoes: {
naoLidas: notificacoesNaoLidas,
totalNaoLidas: notificacoesNaoLidas.length,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
async notificacoes(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
async notificacoesNaoLidas(auth: ClienteAreaAuth) {
const notificacoes = await this.buscarNotificacoesNaoLidasInterno(auth);
data: notificacoes,
total: notificacoes.length,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
async historico(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
notificacoes,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
const historico = [
...notificacoes.map((item) => ({
const paginated = historico.slice(start, end);
total: historico.length,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
const [fidelidade, beneficiosDisponiveis, historico] =
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
empresaId: safeAuth.empresaId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
historico,
empresaId: safeAuth.empresaId,
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,
private async buscarNotificacoesNaoLidasInterno(auth: ClienteAreaAuth) {
empresaId: safeAuth.empresaId,
clienteId: safeAuth.clienteId,

### beauty-core-backend/src/modules/cliente-area/dto/cliente-area-query.dto.ts


### beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts

empresaId?: string | null;
empresaId: true,
if (usuario.empresaId) {
empresaId: null,
if (!usuario.empresaId) {
empresaId: usuario.empresaId,

## Foundation frontend existente

### beauty-core-ui/src/features/portal/services/portal-client-api.ts

getApiClient,
PortalDashboard,
PortalHistory,
PortalProfile,
PortalProfileUpdateInput,
} from "../contracts/portal-client-contracts";
adaptPortalDashboard,
adaptPortalHistory,
adaptPortalProfile,
normalizePortalProfileUpdate,
portalDashboardTransportSchema,
portalHistoryTransportSchema,
portalProfileTransportSchema,
} from "../contracts/portal-client-adapters";
export const PORTAL_CLIENT_ENDPOINTS = {
dashboard: "/area-cliente/me/dashboard",
profile: "/area-cliente/me/perfil",
history: "/area-cliente/me/historico",
export async function getPortalDashboard(): Promise<PortalDashboard> {
const response = await getApiClient().get<unknown>(
PORTAL_CLIENT_ENDPOINTS.dashboard,
return adaptPortalDashboard(response.data);
export async function getPortalProfile(): Promise<PortalProfile> {
const response = await getApiClient().get<unknown>(
PORTAL_CLIENT_ENDPOINTS.profile,
return adaptPortalProfile(response.data);
export async function updatePortalProfile(
input: PortalProfileUpdateInput,
): Promise<PortalProfile> {
const payload = normalizePortalProfileUpdate(input);
const response = await getApiClient().patch<unknown>(
PORTAL_CLIENT_ENDPOINTS.profile,
return adaptPortalProfile(response.data);
export async function getPortalHistory(): Promise<PortalHistory> {
const response = await getApiClient().get<unknown>(
PORTAL_CLIENT_ENDPOINTS.history,
return adaptPortalHistory(response.data);
export const portalClientApi = {
dashboard: getPortalDashboard,
profile: getPortalProfile,
updateProfile: updatePortalProfile,
history: getPortalHistory,
portalDashboardTransportSchema,
portalHistoryTransportSchema,
portalProfileTransportSchema,

### beauty-core-ui/src/features/portal/services/portal-client-api.test.ts

apiClient: {
getApiClient: vi.fn(() => mocks.apiClient),
getPortalDashboard,
getPortalHistory,
getPortalProfile,
updatePortalProfile,
} from "./portal-client-api";
ultimoAcessoPortal: "2026-09-05T10:00:00.000Z",
ativoPortal: true,
describe("portalClientApi", () => {
it("consulta perfil pela rota canonica e retorna somente a allowlist publica", async () => {
mocks.apiClient.get.mockResolvedValueOnce({
const result = await getPortalProfile();
expect(mocks.apiClient.get).toHaveBeenCalledWith(
"/area-cliente/me/perfil",
expect(JSON.stringify(result)).not.toContain("ultimoAcessoPortal");
it("consulta dashboard sem query e remove subobjetos fora da allowlist", async () => {
mocks.apiClient.get.mockResolvedValueOnce({
perfil: profileResponse(),
const result = await getPortalDashboard();
expect(mocks.apiClient.get).toHaveBeenCalledWith(
"/area-cliente/me/dashboard",
perfil: {
it("consulta historico sem query e descarta dados crus e descricao interna", async () => {
mocks.apiClient.get.mockResolvedValueOnce({
const result = await getPortalHistory();
expect(mocks.apiClient.get).toHaveBeenCalledWith(
"/area-cliente/me/historico",
mocks.apiClient.patch.mockResolvedValueOnce({
await updatePortalProfile({
expect(mocks.apiClient.patch).toHaveBeenCalledWith(
"/area-cliente/me/perfil",
JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
JSON.stringify(mocks.apiClient.patch.mock.calls[0][1]),
updatePortalProfile({}),
updatePortalProfile({
expect(mocks.apiClient.patch).not.toHaveBeenCalled();
it("falha com resposta de perfil que nao atende ao contrato", async () => {
mocks.apiClient.get.mockResolvedValueOnce({
getPortalProfile(),

### beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts

import { portalQueryKeys } from "./portal-query";
export const portalClientQueryKeys = {
all: () => portalQueryKeys.private(),
dashboard: () =>
portalQueryKeys.privateResource("dashboard"),
portalQueryKeys.privateResource("profile"),
portalQueryKeys.privateResource("history"),

### beauty-core-ui/src/features/portal/query/portal-query.ts

import type { PortalAuthStatus } from "../auth/portal-auth";
export const portalQueryKeys = {
all: ["portal"] as const,
public: () => [...portalQueryKeys.all, "public"] as const,
private: () => [...portalQueryKeys.all, "private"] as const,
) => [...portalQueryKeys.public(), resource, ...parts] as const,
) => [...portalQueryKeys.private(), resource, ...parts] as const,
export function portalQueryEnabled(
status: PortalAuthStatus,
requiresAuthentication: boolean,
if (requiresAuthentication) {
return status === "authenticated";
status === "authenticated" ||
export function cleanupPortalPrivateQueries(
queryKey: portalQueryKeys.private(),
queryKey: portalQueryKeys.private(),
export type PortalAccessTransition = "anonymous" | "denied";
export function portalAccessTransitionFromStatus(
): PortalAccessTransition | null {
export function handlePortalAccessError(
onTransition: (transition: PortalAccessTransition) => void,
const transition = portalAccessTransitionFromStatus(status);
cleanupPortalPrivateQueries(queryClient);

### beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx

PortalLogoutResponse,
} from "./portal-auth-contracts";
normalizePortalAuthError,
} from "./portal-auth-errors";
clearPortalSession as clearStoredPortalSession,
hasPortalSession,
logoutPortalSession,
restorePortalSession,
} from "./portal-auth-session";
canUsePortalPrivateQueries,
PORTAL_AUTH_INITIAL_STATE,
portalAuthReducer,
type PortalAuthState,
type PortalClientIdentity,
} from "./portal-auth";
export type PortalAuthContextValue = PortalAuthState & {
restoreSession: () => Promise<PortalClientIdentity | null>;
markAuthenticated: (identity: PortalClientIdentity) => void;
logoutSession: () => Promise<PortalLogoutResponse | null>;
const PortalAuthContext =
createContext<PortalAuthContextValue | null>(null);
type PortalAuthProviderProps = {
initialState?: PortalAuthState;
export function PortalAuthProvider({
initialState = PORTAL_AUTH_INITIAL_STATE,
}: PortalAuthProviderProps) {
portalAuthReducer,
const markAuthenticated = useCallback(
(identity: PortalClientIdentity) => {
type: "authenticated",
clearStoredPortalSession();
const identity = await restorePortalSession();
markAuthenticated(identity);
const normalized = normalizePortalAuthError(error);
markAuthenticated,
return await logoutPortalSession();
if (!hasPortalSession()) {
const value = useMemo<PortalAuthContextValue>(
canUsePrivateQueries: canUsePortalPrivateQueries(state),
markAuthenticated,
markAuthenticated,
<PortalAuthContext.Provider value={value}>
</PortalAuthContext.Provider>
export function usePortalAuth(): PortalAuthContextValue {
const context = useContext(PortalAuthContext);
"usePortalAuth deve ser utilizado dentro de PortalAuthProvider.",
type PortalAuthBoundaryProps = {
export function PortalAuthBoundary({
}: PortalAuthBoundaryProps) {
const { status } = usePortalAuth();

### beauty-core-ui/src/features/portal/navigation/portal-navigation.ts

export type PortalNavigationItem = {
export function isSafePortalHref(href: string): boolean {
return href === "/portal" || href.startsWith("/portal/");
export function isPortalNavigationItemActive(
if (href === "/portal") {
return activePath === "/portal";

### beauty-core-ui/src/app/portal/layout.tsx

import { PortalAuthProvider } from "@/features/portal/auth/portal-auth-context";
import { PortalShell } from "@/features/portal/components/portal-shell";
type PortalLayoutProps = {
export default function PortalLayout({
}: PortalLayoutProps) {
<PortalAuthProvider restoreOnMount>
<PortalShell>{children}</PortalShell>
</PortalAuthProvider>

### beauty-core-ui/src/app/portal/page.tsx

import { PortalOtpRequestPage } from "@/features/portal/pages/portal-otp-request-page";
export default function PortalPage() {
return <PortalOtpRequestPage />;

## Contratos confirmados para integração

| Capacidade | Contrato | Implementação frontend |
|---|---|---|
| Notificações | ClienteArea autenticado | Permitida |
| Notificações não lidas | ClienteArea autenticado | Permitida |
| Marcar notificação como lida | ClienteArea autenticado | Permitida |
| Histórico WhatsApp | ClienteArea autenticado | Somente leitura |
| Envio WhatsApp | Não encontrado no ClienteArea | Bloqueado |
| Arquivos/documentos | Não encontrado no ClienteArea | Bloqueado |

## Regras

- Reutilizar o apiClient existente.
- Reutilizar a autenticação e o query gate existentes.
- Não enviar clienteId ou empresaId pelo frontend.
- Não reutilizar controllers administrativos.
- Não criar upload, download ou envio de WhatsApp.
- Não alterar o backend neste bloco.
