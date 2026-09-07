# CHAT 63 — BLOCO 13/15

## Validação do contrato HTTP

## beauty-core-backend/src/main.ts

``text
``

## beauty-core-backend/src/app.module.ts

``text
import { NotificacoesModule } from './modules/notificacoes/notificacoes.module';
import { MensagensWhatsappModule } from './modules/mensagens-whatsapp/mensagens-whatsapp.module';
import { AreaClienteModule } from './modules/area-cliente/area-cliente.module';
import { ClienteAreaModule } from './modules/cliente-area/cliente-area.module';
NotificacoesModule,
MensagensWhatsappModule,
``

## beauty-core-backend/src/modules/cliente-area/cliente-area.controller.ts

``text
import { ClienteAreaService } from './cliente-area.service';
import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';
@Controller('cliente-area')
@Get('me/dashboard')
@ApiOperation({ summary: 'Retorna o dashboard mobile do cliente logado.' })
dashboard(@Req() req: ClienteRequest) {
return this.clienteAreaService.dashboard(this.getAuth(req));
@Get('me/notificacoes')
notificacoes(
return this.clienteAreaService.notificacoes(this.getAuth(req), query);
@Get('me/notificacoes/nao-lidas')
notificacoesNaoLidas(@Req() req: ClienteRequest) {
return this.clienteAreaService.notificacoesNaoLidas(this.getAuth(req));
@Patch('me/notificacoes/:id/lida')
@Get('me/mensagens-whatsapp')
@ApiOperation({ summary: 'Lista o histórico de mensagens WhatsApp do cliente.' })
mensagensWhatsapp(
return this.clienteAreaService.mensagensWhatsapp(this.getAuth(req), query);
``

## beauty-core-ui/src/features/portal/services/portal-client-api.ts

``text
PortalDashboard,
PortalHistory,
PortalProfile,
PortalProfileUpdateInput,
adaptPortalDashboard,
adaptPortalHistory,
adaptPortalProfile,
normalizePortalProfileUpdate,
portalDashboardTransportSchema,
portalHistoryTransportSchema,
portalProfileTransportSchema,
export const PORTAL_CLIENT_ENDPOINTS = {
dashboard: "/area-cliente/me/dashboard",
profile: "/area-cliente/me/perfil",
history: "/area-cliente/me/historico",
export async function getPortalDashboard(): Promise<PortalDashboard> {
PORTAL_CLIENT_ENDPOINTS.dashboard,
return adaptPortalDashboard(response.data);
export async function getPortalProfile(): Promise<PortalProfile> {
PORTAL_CLIENT_ENDPOINTS.profile,
return adaptPortalProfile(response.data);
export async function updatePortalProfile(
input: PortalProfileUpdateInput,
): Promise<PortalProfile> {
const payload = normalizePortalProfileUpdate(input);
PORTAL_CLIENT_ENDPOINTS.profile,
return adaptPortalProfile(response.data);
export async function getPortalHistory(): Promise<PortalHistory> {
PORTAL_CLIENT_ENDPOINTS.history,
return adaptPortalHistory(response.data);
dashboard: getPortalDashboard,
profile: getPortalProfile,
updateProfile: updatePortalProfile,
history: getPortalHistory,
portalDashboardTransportSchema,
portalHistoryTransportSchema,
portalProfileTransportSchema,
``

## beauty-core-ui/src/features/portal/services/portal-client-api.test.ts

``text
getPortalDashboard,
getPortalHistory,
getPortalProfile,
updatePortalProfile,
function profileResponse() {
data: profileResponse(),
const result = await getPortalProfile();
"/area-cliente/me/perfil",
it("consulta dashboard sem query e remove subobjetos fora da allowlist", async () => {
perfil: profileResponse(),
notificacoes: {
const result = await getPortalDashboard();
"/area-cliente/me/dashboard",
const result = await getPortalHistory();
"/area-cliente/me/historico",
data: profileResponse(),
await updatePortalProfile({
"/area-cliente/me/perfil",
updatePortalProfile({}),
updatePortalProfile({
getPortalProfile(),
``

## Resultado pendente

A implementação frontend só poderá usar a rota confirmada pelo backend e pelo prefixo HTTP efetivo.
Nenhuma substituição automática de /area-cliente por /cliente-area será feita neste bloco.
