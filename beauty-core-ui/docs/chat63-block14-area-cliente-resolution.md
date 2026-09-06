# CHAT 63 — BLOCO 14/15

## Resolução dos módulos de área do cliente

## beauty-core-backend/src/modules/area-cliente/area-cliente.module.ts

``text
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';
import { AreaClienteController } from './area-cliente.controller';
import { AreaClienteService } from './area-cliente.service';
@Module({
PrismaModule,
TenantModule,
controllers: [
AreaClienteController,
AreaClienteService,
AreaClienteService,
export class AreaClienteModule {}
``

## beauty-core-backend/src/modules/area-cliente/area-cliente.controller.ts

``text
Controller,
import { AreaClienteService } from './area-cliente.service';
import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
@UseGuards(ClienteAuthGuard)
@Controller('area-cliente')
export class AreaClienteController {
private readonly areaClienteService: AreaClienteService,
@Get('me/perfil')
summary: 'Buscar meu perfil',
'Retorna o perfil do cliente final autenticado pelo JWT Cliente. O clienteId é obtido diretamente do token, sem exposição na URL.',
description: 'Perfil do cliente autenticado retornado com sucesso.',
perfil(@Req() req: ClienteRequest) {
return this.areaClienteService.perfil(empresaId, clienteId);
@Patch('me/perfil')
summary: 'Atualizar meu perfil',
'Atualiza parcialmente o perfil do cliente final autenticado. Não permite alterar telefone nem observações internas.',
type: UpdatePerfilClienteDto,
description: 'Perfil atualizado com sucesso.',
updatePerfil(
@Body() dto: UpdatePerfilClienteDto,
return this.areaClienteService.updatePerfil(
@Get('me/agendamentos')
return this.areaClienteService.agendamentos(
@Get('me/proximos-agendamentos')
return this.areaClienteService.proximosAgendamentos(
@Get('me/ultimo-agendamento')
return this.areaClienteService.ultimoAgendamento(
@Get('me/fidelidade')
return this.areaClienteService.fidelidade(empresaId, clienteId);
@Get('me/pontos')
return this.areaClienteService.pontos(
@Get('me/beneficios')
return this.areaClienteService.beneficios(empresaId, clienteId);
@Get('me/pacotes')
return this.areaClienteService.pacotes(empresaId, clienteId);
@Get('me/pacotes/:pacoteId')
return this.areaClienteService.pacoteDetalhes(
@Get('me/notificacoes')
notificacoes(
return this.areaClienteService.notificacoes(
@Get('me/notificacoes/nao-lidas')
notificacoesNaoLidas(@Req() req: ClienteRequest) {
return this.areaClienteService.notificacoesNaoLidas(
@Patch('me/notificacoes/:id/lida')
return this.areaClienteService.marcarNotificacaoComoLida(
@Get('me/mensagens-whatsapp')
summary: 'Listar minhas mensagens de WhatsApp',
'Lista as mensagens de WhatsApp vinculadas ao cliente autenticado, com paginação.',
description: 'Mensagens de WhatsApp retornadas com sucesso.',
mensagensWhatsapp(
return this.areaClienteService.mensagensWhatsapp(
@Get('me/dashboard')
summary: 'Meu dashboard',
'Retorna dados consolidados do cliente autenticado para dashboard do portal/app.',
description: 'Dashboard retornado com sucesso.',
dashboard(@Req() req: ClienteRequest) {
return this.areaClienteService.dashboard(empresaId, clienteId);
@Get('me/historico')
historico(@Req() req: ClienteRequest) {
return this.areaClienteService.historico(empresaId, clienteId);
``

## beauty-core-backend/src/modules/area-cliente/area-cliente.service.ts

``text
import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';
import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
export class AreaClienteService {
private readonly prisma: PrismaService,
private readonly tenantValidator: TenantValidatorService,
async perfil(empresaId: string, clienteId: string) {
async updatePerfil(
dto: UpdatePerfilClienteDto,
async notificacoes(
async notificacoesNaoLidas(empresaId: string, clienteId: string) {
async mensagensWhatsapp(
async dashboard(empresaId: string, clienteId: string) {
perfil,
notificacoesNaoLidas,
this.perfil(empresaId, clienteId),
this.notificacoesNaoLidas(empresaId, clienteId),
perfil,
notificacoes: {
naoLidas: notificacoesNaoLidas.data,
totalNaoLidas: notificacoesNaoLidas.total,
async historico(empresaId: string, clienteId: string) {
notificacoes,
mensagensWhatsapp,
const historico = [
...notificacoes.map((item) => ({
...mensagensWhatsapp.map((item) => ({
return historico
``

## beauty-core-backend/src/modules/cliente-area/cliente-area.module.ts

``text
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { ClienteAreaController } from './cliente-area.controller';
import { ClienteAreaService } from './cliente-area.service';
@Module({
imports: [PrismaModule],
controllers: [ClienteAreaController],
providers: [ClienteAreaService],
exports: [ClienteAreaService],
export class ClienteAreaModule {}
``

## beauty-core-backend/src/modules/cliente-area/cliente-area.controller.ts

``text
Controller,
import { ClienteAreaService } from './cliente-area.service';
import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';
@UseGuards(ClienteAuthGuard)
@Controller('cliente-area')
export class ClienteAreaController {
constructor(private readonly clienteAreaService: ClienteAreaService) {}
@Get('me')
@ApiOperation({ summary: 'Retorna o perfil público do cliente logado.' })
return this.clienteAreaService.me(this.getAuth(req));
@Get('me/dashboard')
@ApiOperation({ summary: 'Retorna o dashboard mobile do cliente logado.' })
dashboard(@Req() req: ClienteRequest) {
return this.clienteAreaService.dashboard(this.getAuth(req));
@Get('me/agendamentos')
return this.clienteAreaService.agendamentos(this.getAuth(req), query);
@Get('me/proximos-agendamentos')
return this.clienteAreaService.proximosAgendamentos(
@Get('me/ultimo-agendamento')
return this.clienteAreaService.ultimoAgendamento(this.getAuth(req));
@Get('me/fidelidade')
return this.clienteAreaService.fidelidade(this.getAuth(req));
@Get('me/pontos')
return this.clienteAreaService.pontos(this.getAuth(req), query);
@Get('me/beneficios')
return this.clienteAreaService.beneficios(this.getAuth(req));
@Get('me/pacotes')
return this.clienteAreaService.pacotes(this.getAuth(req));
@Get('me/pacotes/:pacoteId')
return this.clienteAreaService.pacoteDetalhes(
@Get('me/notificacoes')
notificacoes(
return this.clienteAreaService.notificacoes(this.getAuth(req), query);
@Get('me/notificacoes/nao-lidas')
notificacoesNaoLidas(@Req() req: ClienteRequest) {
return this.clienteAreaService.notificacoesNaoLidas(this.getAuth(req));
@Patch('me/notificacoes/:id/lida')
return this.clienteAreaService.marcarNotificacaoComoLida(
@Get('me/mensagens-whatsapp')
@ApiOperation({ summary: 'Lista o histórico de mensagens WhatsApp do cliente.' })
mensagensWhatsapp(
return this.clienteAreaService.mensagensWhatsapp(this.getAuth(req), query);
@Get('me/historico')
historico(
return this.clienteAreaService.historico(this.getAuth(req), query);
``

## beauty-core-backend/src/modules/cliente-area/cliente-area.service.ts

``text
import { PrismaService } from '../../database/prisma/prisma.service';
import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';
export class ClienteAreaService {
constructor(private readonly prisma: PrismaService) {}
async dashboard(auth: ClienteAreaAuth) {
perfil,
notificacoesNaoLidas,
this.buscarNotificacoesNaoLidasInterno(auth),
perfil,
notificacoes: {
naoLidas: notificacoesNaoLidas,
totalNaoLidas: notificacoesNaoLidas.length,
async notificacoes(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
async notificacoesNaoLidas(auth: ClienteAreaAuth) {
const notificacoes = await this.buscarNotificacoesNaoLidasInterno(auth);
data: notificacoes,
total: notificacoes.length,
async mensagensWhatsapp(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
async historico(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
notificacoes,
mensagensWhatsapp,
const historico = [
...notificacoes.map((item) => ({
...mensagensWhatsapp.map((item) => ({
const paginated = historico.slice(start, end);
total: historico.length,
const [fidelidade, beneficiosDisponiveis, historico] =
historico,
private async buscarNotificacoesNaoLidasInterno(auth: ClienteAreaAuth) {
``

## beauty-core-backend/src/app.module.ts

``text
import { LgpdModule } from './lgpd/lgpd.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ServicosModule } from './modules/servicos/servicos.module';
import { UnidadesModule } from './modules/unidades/unidades.module';
import { AgendamentosModule } from './modules/agendamentos/agendamentos.module';
import { FidelidadeModule } from './modules/fidelidade/fidelidade.module';
import { CuponsModule } from './modules/cupons/cupons.module';
import { BeneficiosModule } from './modules/beneficios/beneficios.module';
import { NiveisFidelidadeModule } from './modules/niveis-fidelidade/niveis-fidelidade.module';
import { ConfiguracaoFidelidadeModule } from './modules/configuracao-fidelidade/configuracao-fidelidade.module';
import { PacotesModule } from './modules/pacotes/pacotes.module';
import { ClientesPacotesModule } from './modules/clientes-pacotes/clientes-pacotes.module';
import { CategoriasFinanceirasModule } from './modules/categorias-financeiras/categorias-financeiras.module';
import { FinanceiroModule } from './modules/financeiro/financeiro.module';
import { ComissoesModule } from './modules/comissoes/comissoes.module';
import { NotificacoesModule } from './modules/notificacoes/notificacoes.module';
import { ConfiguracoesNotificacaoModule } from './modules/configuracoes-notificacao/configuracoes-notificacao.module';
import { AutomacoesModule } from './modules/automacoes/automacoes.module';
import { ConfiguracaoWhatsappModule } from './modules/configuracao-whatsapp/configuracao-whatsapp.module';
import { TemplatesWhatsappModule } from './modules/templates-whatsapp/templates-whatsapp.module';
import { MensagensWhatsappModule } from './modules/mensagens-whatsapp/mensagens-whatsapp.module';
import { CampanhasWhatsappModule } from './modules/campanhas-whatsapp/campanhas-whatsapp.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ArquivosModule } from './modules/arquivos/arquivos.module';
import { AreaClienteModule } from './modules/area-cliente/area-cliente.module';
import { ClienteAreaModule } from './modules/cliente-area/cliente-area.module';
import { AuthClienteModule } from './modules/auth-cliente/auth-cliente.module';
import { AuditoriaModule } from './modules/auditoria/auditoria.module';
import { HealthModule } from './modules/health/health.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { TenantPublicoModule } from './modules/tenant-publico/tenant-publico.module';
import { QueuesModule } from './queues/queues.module';
import { RequestContextModule } from './common/context/request-context.module';
import { StructuredLoggerModule } from './common/logger/structured-logger.module';
import { MetricsModule } from './common/metrics/metrics.module';
import { BackupModule } from './backup/backup.module';
@Module({
LgpdModule,
ConfigModule.forRoot({
ThrottlerModule.forRoot([
ScheduleModule.forRoot(),
RequestContextModule,
StructuredLoggerModule,
MetricsModule,
PrismaModule,
AuthModule,
EmpresasModule,
UsuariosModule,
ClientesModule,
ServicosModule,
UnidadesModule,
AgendamentosModule,
FidelidadeModule,
CuponsModule,
BeneficiosModule,
NiveisFidelidadeModule,
ConfiguracaoFidelidadeModule,
PacotesModule,
ClientesPacotesModule,
CategoriasFinanceirasModule,
FinanceiroModule,
ComissoesModule,
NotificacoesModule,
ConfiguracoesNotificacaoModule,
AutomacoesModule,
ConfiguracaoWhatsappModule,
TemplatesWhatsappModule,
MensagensWhatsappModule,
CampanhasWhatsappModule,
AnalyticsModule,
ArquivosModule,
AreaClienteModule,
ClienteAreaModule,
AuthClienteModule,
TenantPublicoModule,
QueuesModule,
HealthModule,
AuditoriaModule,
SchedulerModule,
BackupModule,
export class AppModule implements NestModule {
``

## Regra de decisão

A implementação frontend usará somente o módulo efetivamente registrado e compatível com os endpoints já testados pela foundation existente.
Nenhuma rota será renomeada ou substituída sem evidência do controller ativo.
