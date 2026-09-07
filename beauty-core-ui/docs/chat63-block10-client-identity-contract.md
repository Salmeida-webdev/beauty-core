# CHAT 63 — BLOCO 10/15

## Contrato de identidade CLIENTE

Este bloco identifica a origem segura de clienteId, usuarioId, empresaId e role antes de qualquer endpoint Portal ser criado.


### beauty-core-backend/src/lgpd/dto/lgpd-cliente-export-response.dto.ts
3: export class LgpdClienteExportResponseDto {
11: example: 'clx123clienteid',
12: description: 'ID do cliente exportado.',
14: clienteId!: string;
17: example: 'clx123empresaid',
18: description: 'ID da empresa vinculada ao cliente.',
20: empresaId!: string;
23: description: 'Dados cadastrais do cliente.',
29: description: 'Agendamentos vinculados ao cliente.',
41: description: 'Pacotes, sessões ou vínculos comerciais do cliente quando disponíveis.',
47: description: 'Notificações vinculadas ao cliente.',
53: description: 'Mensagens WhatsApp vinculadas ao cliente.',
67: example: 'clx123clienteid',
68: description: 'ID técnico preservado do cliente anonimizado.',
70: clienteId!: string;
73: example: 'clx123empresaid',
74: description: 'ID da empresa vinculada ao cliente.',
76: empresaId!: string;

### beauty-core-backend/src/modules/area-cliente/area-cliente.controller.ts
29: import { ClienteAuthGuard } from '../auth-cliente/guards/cliente-auth.guard';
31: import { AreaClienteService } from './area-cliente.service';
32: import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
33: import { ClienteAuthUser } from './types/cliente-auth-user.type';
35: type ClienteRequest = {
36: user: ClienteAuthUser;
39: @ApiTags('Área Cliente')
41: @UseGuards(ClienteAuthGuard)
42: @Controller('area-cliente')
43: export class AreaClienteController {
45: private readonly areaClienteService: AreaClienteService,
48: private getClienteAutenticado(req: ClienteRequest) {
50: clienteId: req.user.clienteId ?? req.user.sub,
51: empresaId: req.user.empresaId,
59: 'Retorna o perfil do cliente final autenticado pelo JWT Cliente. O clienteId é obtido diretamente do token, sem exposição na URL.',
62: description: 'Perfil do cliente autenticado retornado com sucesso.',
65: description: 'Token Cliente ausente, inválido ou expirado.',
68: description: 'Portal do cliente desativado.',
71: description: 'Cliente não encontrado no tenant autenticado.',
73: perfil(@Req() req: ClienteRequest) {
74: const { empresaId, clienteId } = this.getClienteAutenticado(req);
76: return this.areaClienteService.perfil(empresaId, clienteId);
83: 'Atualiza parcialmente o perfil do cliente final autenticado. Não permite alterar telefone nem observações internas.',
86: type: UpdatePerfilClienteDto,
88: 'Dados permitidos para atualização pelo cliente autenticado.',
97: description: 'Token Cliente ausente, inválido ou expirado.',
100: description: 'Portal do cliente desativado.',
103: description: 'Cliente não encontrado no tenant autenticado.',
106: @Req() req: ClienteRequest,
107: @Body() dto: UpdatePerfilClienteDto,
109: const { empresaId, clienteId } = this.getClienteAutenticado(req);
111: return this.areaClienteService.updatePerfil(
112: empresaId,
113: clienteId,
122: 'Lista os agendamentos do cliente autenticado, com paginação e filtro opcional por status.',
145: description: 'Token Cliente ausente, inválido ou expirado.',
148: @Req() req: ClienteRequest,
152: const { empresaId, clienteId } = this.getClienteAutenticado(req);
154: return this.areaClienteService.agendamentos(
155: empresaId,
156: clienteId,
166: 'Retorna os próximos agendamentos futuros do cliente autenticado.',
171: proximosAgendamentos(@Req() req: ClienteRequest) {
172: const { empresaId, clienteId } = this.getClienteAutenticado(req);
174: return this.areaClienteService.proximosAgendamentos(
175: empresaId,
176: clienteId,
184: 'Retorna o último agendamento passado do cliente autenticado.',
189: ultimoAgendamento(@Req() req: ClienteRequest) {
190: const { empresaId, clienteId } = this.getClienteAutenticado(req);
192: return this.areaClienteService.ultimoAgendamento(
193: empresaId,
194: clienteId,
202: 'Retorna saldo, nível atual, próximo nível e benefícios disponíveis do cliente autenticado.',
207: fidelidade(@Req() req: ClienteRequest) {
208: const { empresaId, clienteId } = this.getClienteAutenticado(req);
210: return this.areaClienteService.fidelidade(empresaId, clienteId);
217: 'Lista o histórico de pontos de fidelidade do cliente autenticado.',
233: @Req() req: ClienteRequest,
236: const { empresaId, clienteId } = this.getClienteAutenticado(req);
238: return this.areaClienteService.pontos(
239: empresaId,
240: clienteId,
249: 'Retorna benefícios disponíveis e liberados para o cliente autenticado conforme seu saldo de pontos.',
254: beneficios(@Req() req: ClienteRequest) {
255: const { empresaId, clienteId } = this.getClienteAutenticado(req);
257: return this.areaClienteService.beneficios(empresaId, clienteId);
264: 'Lista os pacotes vinculados ao cliente autenticado, separados por status.',
269: pacotes(@Req() req: ClienteRequest) {
270: const { empresaId, clienteId } = this.getClienteAutenticado(req);
272: return this.areaClienteService.pacotes(empresaId, clienteId);
279: 'Retorna os detalhes de um pacote específico pertencente ao cliente autenticado.',
283: description: 'ID do pacote do cliente.',
294: description: 'Pacote não encontrado para o cliente autenticado.',
297: @Req() req: ClienteRequest,
300: const { empresaId, clienteId } = this.getClienteAutenticado(req);
302: return this.areaClienteService.pacoteDetalhes(
303: empresaId,
304: clienteId,
313: 'Lista as notificações vinculadas ao cliente autenticado, com paginação.',
329: @Req() req: ClienteRequest,
332: const { empresaId, clienteId } = this.getClienteAutenticado(req);
334: return this.areaClienteService.notificacoes(
335: empresaId,
336: clienteId,
345: 'Retorna as notificações não lidas do cliente autenticado.',
350: notificacoesNaoLidas(@Req() req: ClienteRequest) {
351: const { empresaId, clienteId } = this.getClienteAutenticado(req);
353: return this.areaClienteService.notificacoesNaoLidas(
354: empresaId,
355: clienteId,
363: 'Marca uma notificação específica do cliente autenticado como lida.',
379: 'Notificação não encontrada para o cliente autenticado.',
382: @Req() req: ClienteRequest,
385: const { empresaId, clienteId } = this.getClienteAutenticado(req);
387: return this.areaClienteService.marcarNotificacaoComoLida(
388: empresaId,
389: clienteId,
398: 'Lista as mensagens de WhatsApp vinculadas ao cliente autenticado, com paginação.',
414: @Req() req: ClienteRequest,

### beauty-core-backend/src/modules/area-cliente/area-cliente.module.ts
6: import { AreaClienteController } from './area-cliente.controller';
7: import { AreaClienteService } from './area-cliente.service';
16: AreaClienteController,
20: AreaClienteService,
24: AreaClienteService,
27: export class AreaClienteModule {}

### beauty-core-backend/src/modules/area-cliente/area-cliente.service.ts
10: StatusClientePacote,
23: import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
26: export class AreaClienteService {
32: private async validarClientePortal(
33: empresaId: string,
34: clienteId: string,
36: const clienteValidado =
37: await this.tenantValidator.validarCliente(empresaId, clienteId);
39: if (!clienteValidado.ativoPortal) {
41: 'Cliente não encontrado ou portal desativado.',
45: const cliente = await this.prisma.cliente.findFirst({
47: id: clienteId,
48: empresaId,
54: if (!cliente) {
56: 'Cliente não encontrado ou portal desativado.',
60: return cliente;
63: async perfil(empresaId: string, clienteId: string) {
64: const cliente = await this.validarClientePortal(
65: empresaId,
66: clienteId,
77: clienteId_empresaId: {
78: clienteId,
79: empresaId,
83: this.buscarNivelAtual(empresaId, clienteId),
84: this.prisma.clientePacote.findMany({
86: empresaId,
87: clienteId,
88: status: StatusClientePacote.ATIVO,
100: empresaId,
101: clienteId,
107: id: cliente.id,
108: empresaId: cliente.empresaId,
109: nome: cliente.nome,
110: telefone: cliente.telefone,
111: email: cliente.email,
112: foto: cliente.foto,
113: dataNascimento: cliente.dataNascimento,
114: dataCadastro: cliente.createdAt,
119: ultimoAcessoPortal: cliente.ultimoAcessoPortal,
120: aceitouTermos: cliente.aceitouTermos,
121: dataAceiteTermos: cliente.dataAceiteTermos,
122: ativoPortal: cliente.ativoPortal,
127: empresaId: string,
128: clienteId: string,
129: dto: UpdatePerfilClienteDto,
131: await this.validarClientePortal(empresaId, clienteId);
133: const data: Prisma.ClienteUpdateManyMutationInput = {
164: const resultado = await this.prisma.cliente.updateMany({
166: id: clienteId,
167: empresaId,
176: 'Cliente não encontrado ou portal desativado.',
180: return this.prisma.cliente.findFirst({
182: id: clienteId,
183: empresaId,
189: empresaId: true,
205: empresaId: string,
206: clienteId: string,
210: await this.validarClientePortal(empresaId, clienteId);
223: empresaId,
224: clienteId,
242: role: true,
257: async proximosAgendamentos(empresaId: string, clienteId: string) {
258: await this.validarClientePortal(empresaId, clienteId);
262: empresaId,
263: clienteId,
293: async ultimoAgendamento(empresaId: string, clienteId: string) {
294: await this.validarClientePortal(empresaId, clienteId);
298: empresaId,
299: clienteId,
321: async fidelidade(empresaId: string, clienteId: string) {
322: await this.validarClientePortal(empresaId, clienteId);
334: clienteId_empresaId: {
335: clienteId,
336: empresaId,
342: empresaId,
343: clienteId,
352: empresaId,
353: clienteId,
360: this.buscarNivelAtual(empresaId, clienteId),
363: empresaId,
371: empresaId,
401: empresaId: string,
402: clienteId: string,
405: await this.validarClientePortal(empresaId, clienteId);
410: empresaId,
411: clienteId,
429: async beneficios(empresaId: string, clienteId: string) {
430: await this.validarClientePortal(empresaId, clienteId);
435: clienteId_empresaId: {
436: clienteId,
437: empresaId,
443: empresaId,
463: async pacotes(empresaId: string, clienteId: string) {
464: await this.validarClientePortal(empresaId, clienteId);
466: const pacotes = await this.prisma.clientePacote.findMany({
468: empresaId,
469: clienteId,
480: const mapPacote = (clientePacote: {
492: status: StatusClientePacote;
494: id: clientePacote.id,

### beauty-core-backend/src/modules/area-cliente/dto/update-perfil-cliente.dto.ts
12: export class UpdatePerfilClienteDto {
16: 'Nome atualizado do cliente final. Permitido para edição pelo próprio cliente no portal/app.',
32: 'E-mail atualizado do cliente final. Pode ser usado para contato, relatórios e futuras integrações.',
47: 'Data de nascimento do cliente final em formato ISO. Usada para aniversários, campanhas e fidelidade.',
56: example: '/uploads/clientes/maria-clara.png',
58: 'Caminho ou URL atualizada da foto do cliente. Normalmente preenchido após upload de arquivo.',

### beauty-core-backend/src/modules/area-cliente/types/cliente-auth-user.type.ts
1: export type ClienteAuthUser = {
3: clienteId?: string;
4: empresaId: string;
6: role: 'CLIENTE';

### beauty-core-backend/src/modules/arquivos/guards/jwt-or-cliente-auth.guard.ts
5: export class JwtOrClienteAuthGuard extends AuthGuard(['jwt', 'cliente-jwt']) {}

### beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts
28: import { AuthClienteService } from './auth-cliente.service';
32: @ApiTags('Auth Cliente Público')
33: @Controller('public/:slug/auth-cliente')
34: export class AuthClientePublicoController {
36: private readonly authClienteService: AuthClienteService,
47: summary: 'Solicitar código OTP do cliente por tenant público',
49: 'Endpoint público tenant-aware para portal web, PWA e mobile. O tenant é resolvido pelo slug da URL. O frontend nunca envia empresaId.',
57: description: 'Telefone do cliente. O slug vem pela URL.',
65: 'Telefone do cliente com DDD, usado para autenticação via OTP.',
77: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
92: 'Empresa inativa/inexistente ou cliente não cadastrado no tenant resolvido.',
96: description: 'Acesso ao portal do cliente está desativado.',
108: return this.authClienteService.solicitarCodigo(
131: summary: 'Verificar código OTP do cliente por tenant público',
133: 'Valida o código OTP usando o slug público da URL e retorna JWT Cliente. O frontend nunca envia empresaId.',
148: description: 'Telefone do cliente com DDD.',
153: description: 'Código OTP temporário do cliente.',
160: description: 'Código validado com sucesso. JWT Cliente gerado.',
163: access_token: 'jwt.cliente.token.exemplo',
166: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
172: cliente: {
176: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
190: 'Empresa inativa/inexistente ou cliente não encontrado no tenant resolvido.',
194: description: 'Acesso ao portal do cliente está desativado.',
206: return this.authClienteService.verificarCodigo(

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts
1: import { LogoutClienteDto } from './dto/logout-cliente.dto';
2: import { RefreshClienteTokenDto } from './dto/refresh-cliente-token.dto';
34: import { AuthClienteService } from './auth-cliente.service';
38: import { ClienteAuthGuard } from './guards/cliente-auth.guard';
40: @ApiTags('Auth Cliente')
41: @Controller('auth-cliente')
42: export class AuthClienteController {
44: private readonly authClienteService: AuthClienteService,
55: summary: 'Solicitar cÃ³digo OTP do cliente',
57: 'Endpoint pÃºblico para gerar cÃ³digo de acesso temporÃ¡rio do cliente final. A empresa Ã© resolvida por slug ou domÃ­nio antes da geraÃ§Ã£o do OTP, sem expor empresaId ao cliente.',
61: 'Telefone do cliente e identificaÃ§Ã£o pÃºblica da empresa por slug ou domÃ­nio.',
69: 'Telefone do cliente com DDD, usado para autenticaÃ§Ã£o via OTP.',
93: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
109: 'Empresa inativa/inexistente ou cliente nÃ£o cadastrado no tenant resolvido.',
113: description: 'Acesso ao portal do cliente estÃ¡ desativado.',
124: return this.authClienteService.solicitarCodigo(dto, {
140: summary: 'Verificar cÃ³digo OTP do cliente',
142: 'Endpoint pÃºblico para validar o cÃ³digo OTP do cliente final e retornar um JWT Cliente. A empresa Ã© resolvida por slug ou domÃ­nio antes da validaÃ§Ã£o do cÃ³digo.',
153: description: 'Telefone do cliente com DDD.',
159: 'CÃ³digo OTP temporÃ¡rio enviado ou gerado para o cliente.',
178: description: 'CÃ³digo validado com sucesso. JWT Cliente gerado.',
181: access_token: 'jwt.cliente.token.exemplo',
184: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
190: cliente: {
194: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
209: 'Empresa inativa/inexistente ou cliente nÃ£o encontrado no tenant resolvido.',
213: description: 'Acesso ao portal do cliente estÃ¡ desativado.',
224: return this.authClienteService.verificarCodigo(dto, {
241: summary: 'Renovar token do cliente',
243: 'Valida o refresh token Cliente, rotaciona a sessÃ£o e retorna novo access token e novo refresh token.',
246: type: RefreshClienteTokenDto,
249: description: 'Token do cliente renovado com sucesso.',
254: refresh(@Body() dto: RefreshClienteTokenDto) {
255: return this.authClienteService.refreshCliente(dto);
258: @UseGuards(ClienteAuthGuard)
262: summary: 'Logout da sessÃ£o atual do cliente',
265: type: LogoutClienteDto,
269: @Body() dto: LogoutClienteDto,
271: return this.authClienteService.logoutCliente(req.user, dto);
274: @UseGuards(ClienteAuthGuard)
278: summary: 'Encerrar todas as sessÃµes do cliente',
281: return this.authClienteService.logoutAllCliente(req.user);
284: @UseGuards(ClienteAuthGuard)
288: summary: 'Listar sessÃµes ativas do cliente',
291: return this.authClienteService.listarSessoesCliente(req.user);
294: @UseGuards(ClienteAuthGuard)
298: summary: 'Cliente autenticado',
300: 'Retorna os dados do cliente final autenticado pelo JWT Cliente. Endpoint preparado para portal web e aplicativo mobile.',
303: description: 'Cliente autenticado retornado com sucesso.',
310: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
318: description: 'Token Cliente ausente, invÃ¡lido ou expirado.',
321: description: 'Cliente autenticado nÃ£o encontrado.',
324: return this.authClienteService.me(
325: req.user.clienteId ?? req.user.sub,
326: req.user.empresaId,
330: @UseGuards(ClienteAuthGuard)
334: summary: 'Aceitar termos de uso do cliente',
336: 'Registra o aceite dos termos pelo cliente final autenticado. ApÃ³s este processo, o cliente deixa de estar em primeiro acesso e pode acessar normalmente o portal/app.',
347: 'Confirma se o cliente aceitou os termos de uso.',
360: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
370: description: 'Token Cliente ausente, invÃ¡lido ou expirado.',
373: description: 'Cliente autenticado nÃ£o encontrado.',
379: return this.authClienteService.aceitarTermos(
380: req.user.clienteId ?? req.user.sub,
381: req.user.empresaId,

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts
12: import { AuthClienteController } from './auth-cliente.controller';
13: import { AuthClientePublicoController } from './auth-cliente-publico.controller';
14: import { AuthClienteService } from './auth-cliente.service';
15: import { ClienteJwtStrategy } from './strategies/cliente-jwt.strategy';
37: AuthClienteController,
38: AuthClientePublicoController,
42: AuthClienteService,
43: ClienteJwtStrategy,
47: AuthClienteService,
50: export class AuthClienteModule {}

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts
1: import { LogoutClienteDto } from './dto/logout-cliente.dto';
2: import { RefreshClienteTokenDto } from './dto/refresh-cliente-token.dto';
47: export class AuthClienteService {
48: private readonly logger = new Logger(AuthClienteService.name);
59: private async registrarAuditoriaSessaoCliente(params: {
63: clienteId?: string;
64: empresaId?: string;
69: empresaId: params.empresaId,
70: clienteId: params.clienteId,
71: tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
74: modulo: 'AUTH_CLIENTE',
79: origem: 'auth_cliente',
87: private async gerarAccessTokenCliente(
88: cliente: {
91: empresaId: string;
99: sub: cliente.id,
100: clienteId: cliente.id,
101: telefone: cliente.telefone,
102: role: 'CLIENTE',
103: empresaId: cliente.empresaId,
105: tipo: 'CLIENTE',
119: private async gerarRefreshTokenCliente(
120: cliente: {
122: empresaId: string;
130: sub: cliente.id,
131: empresaId: cliente.empresaId,
133: tipo: 'cliente_refresh',
169: empresaId: string,
173: .update([empresaId, telefone, codigo].join(':'))
180: empresaId: string,
184: this.gerarCodigoHash(codigoInformado, empresaId, telefone),
228: const empresaId = tenant.empresaId;
231: const cliente = await this.prisma.cliente.findFirst({
233: empresaId,
239: empresaId: true,
246: if (!cliente) {
250: `[AUTH_CLIENTE] solicitar codigo cliente nao cadastrado empresaId=${empresaId} clienteId=- status=FALHA tempoMs=${tempoMs}`,
254: empresaId,
255: tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
257: modulo: 'AUTH_CLIENTE',
263: 'Tentativa de solicitar cÃ³digo para cliente nÃ£o cadastrado.',
275: 'Cliente ainda nÃ£o estÃ¡ cadastrado.',
279: if (!cliente.ativoPortal) {
283: `[AUTH_CLIENTE] solicitar codigo portal desativado empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,
287: empresaId,
288: clienteId: cliente.id,
289: tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
291: modulo: 'AUTH_CLIENTE',
299: telefone: cliente.telefone,
309: 'Acesso ao portal do cliente estÃ¡ desativado.',
313: await this.prisma.codigoAcessoCliente.updateMany({
315: empresaId,
316: clienteId: cliente.id,
317: telefone: cliente.telefone,
328: empresaId,
329: cliente.telefone,
337: await this.prisma.codigoAcessoCliente.create({
339: empresaId,
340: clienteId: cliente.id,
341: telefone: cliente.telefone,
351: `[AUTH_CLIENTE] solicitar codigo sucesso empresaId=${empresaId} clienteId=${cliente.id} status=SUCESSO tempoMs=${tempoMs}`,
355: empresaId,
356: clienteId: cliente.id,
357: tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
359: modulo: 'AUTH_CLIENTE',
364: mensagem: 'CÃ³digo de acesso do cliente solicitado com sucesso.',
366: telefone: cliente.telefone,
379: empresaId: tenant.empresaId,
397: const empresaId = tenant.empresaId;
400: const cliente = await this.prisma.cliente.findFirst({
402: empresaId,
408: if (!cliente) {
412: `[AUTH_CLIENTE] verificar codigo cliente nao encontrado empresaId=${empresaId} clienteId=- status=FALHA tempoMs=${tempoMs}`,
416: empresaId,
417: tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
419: modulo: 'AUTH_CLIENTE',
425: 'Tentativa de verificar cÃ³digo para cliente nÃ£o encontrado.',
436: throw new NotFoundException('Cliente nÃ£o encontrado.');
439: if (!cliente.ativoPortal) {
443: `[AUTH_CLIENTE] verificar codigo portal desativado empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,
447: empresaId,
448: clienteId: cliente.id,
449: tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
451: modulo: 'AUTH_CLIENTE',
459: telefone: cliente.telefone,
469: 'Acesso ao portal do cliente estÃ¡ desativado.',
473: const codigo = await this.prisma.codigoAcessoCliente.findFirst({
475: empresaId,
476: clienteId: cliente.id,
493: empresaId,
501: `[AUTH_CLIENTE] codigo invalido ou expirado empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,
505: empresaId,
506: clienteId: cliente.id,
507: tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
509: modulo: 'AUTH_CLIENTE',
516: telefone: cliente.telefone,
529: await this.prisma.codigoAcessoCliente.updateMany({
532: empresaId,
533: clienteId: cliente.id,
545: `[AUTH_CLIENTE] codigo ja utilizado empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,

### beauty-core-backend/src/modules/auth-cliente/dto/aceitar-termos.dto.ts
8: 'Confirmação de aceite dos termos de uso pelo cliente final. Deve ser true para concluir o primeiro acesso.',

### beauty-core-backend/src/modules/auth-cliente/dto/logout-cliente.dto.ts
4: export class LogoutClienteDto {
7: description: 'Refresh token da sessão Cliente atual.',

### beauty-core-backend/src/modules/auth-cliente/dto/refresh-cliente-token.dto.ts
4: export class RefreshClienteTokenDto {
7: description: 'Refresh token Cliente recebido no login ou no refresh anterior.',

### beauty-core-backend/src/modules/auth-cliente/dto/solicitar-codigo.dto.ts
16: 'Telefone do cliente com DDD. Usado para localizar o cliente e gerar o código OTP de acesso dentro da empresa resolvida por slug ou domínio.',
31: 'Slug público da empresa. Usado para resolver o tenant antes do login do cliente.',
51: 'Domínio público da empresa. Alternativa ao slug para resolver o tenant antes do login do cliente.',

### beauty-core-backend/src/modules/auth-cliente/dto/verificar-codigo.dto.ts
16: 'Telefone do cliente com DDD. Usado para localizar o cliente dentro da empresa resolvida por slug ou domÃ­nio.',
31: 'CÃ³digo OTP de 6 dÃ­gitos gerado para autenticaÃ§Ã£o do cliente final.',

### beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts
5: export class ClienteAuthGuard extends AuthGuard('cliente-jwt') {}

### beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts
4: import { Role } from '@prisma/client';
10: type ClienteJwtPayload = {
12: clienteId?: string;
14: role?: Role | 'CLIENTE';
15: empresaId?: string;
23: export class ClienteJwtStrategy extends PassportStrategy(
25: 'cliente-jwt',
41: async validate(payload: ClienteJwtPayload) {
43: throw new UnauthorizedException('Token de cliente inválido.');
46: if (payload.tipo !== 'CLIENTE') {
47: throw new UnauthorizedException('Token inválido para área do cliente.');
51: throw new UnauthorizedException('Sessão do cliente não identificada.');
54: if (!payload.empresaId) {
56: 'Token de cliente sem empresa vinculada.',
60: const cliente = await this.prisma.cliente.findUnique({
66: empresaId: true,
87: if (!cliente) {
88: throw new UnauthorizedException('Cliente não encontrado.');
91: if (!cliente.ativo) {
92: throw new UnauthorizedException('Cliente inativo.');
95: if (!cliente.ativoPortal) {
97: 'Portal do cliente está desativado para este cliente.',
101: if (cliente.empresaId !== payload.empresaId) {
103: 'Cliente não pertence à empresa informada no token.',
107: if (!cliente.empresa) {
108: throw new UnauthorizedException('Empresa do cliente não encontrada.');
111: if (!cliente.empresa.ativo) {
112: throw new UnauthorizedException('Empresa do cliente está inativa.');
115: await this.sessoesService.validarSessaoClienteAtiva(
117: cliente.id,
121: id: cliente.id,
122: clienteId: cliente.id,
123: nome: cliente.nome,
124: telefone: cliente.telefone,
125: email: cliente.email,
126: role: Role.CLIENTE,
127: empresaId: cliente.empresaId,
129: ativoPortal: cliente.ativoPortal,
130: aceitouTermos: cliente.aceitouTermos,
131: dataAceiteTermos: cliente.dataAceiteTermos,
132: ultimoAcessoPortal: cliente.ultimoAcessoPortal,
134: id: cliente.empresa.id,
135: nome: cliente.empresa.nome,
136: slug: cliente.empresa.slug,
137: plano: cliente.empresa.plano,
138: ativo: cliente.empresa.ativo,

### beauty-core-backend/src/modules/auth/auth.controller.ts
31: import { JwtAuthGuard } from './guards/jwt-auth.guard';
90: role: 'ADMIN',
91: empresaId: '550e8400-e29b-41d4-a716-446655440000',
151: @UseGuards(JwtAuthGuard)
173: return this.authService.logout(req.user, dto);
177: @UseGuards(JwtAuthGuard)
194: return this.authService.logoutAll(req.user);
198: @UseGuards(JwtAuthGuard)
223: return this.authService.listarSessoes(req.user);
227: @UseGuards(JwtAuthGuard)
250: return this.authService.revogarSessaoEspecifica(req.user, sessaoId);
254: @UseGuards(JwtAuthGuard)
267: role: 'ADMIN',
268: empresaId: '550e8400-e29b-41d4-a716-446655440000',
277: return req.user;

### beauty-core-backend/src/modules/auth/auth.module.ts
12: import { RolesGuard } from './guards/roles.guard';
13: import { JwtStrategy } from './strategies/jwt.strategy';
34: JwtStrategy,
35: RolesGuard,

### beauty-core-backend/src/modules/auth/auth.service.ts
21: import { mapRole } from '../../shared/enums/role-mapper';
55: usuarioId?: string;
56: empresaId?: string | null;
57: role?: unknown;
62: empresaId: params.empresaId ?? undefined,
63: usuarioId: params.usuarioId,
64: tipoUsuario: (params.role ?? 'SISTEMA') as TipoUsuarioAuditoria,
83: role: any;
84: empresaId: string | null;
91: role: mapRole(usuario.role),
92: empresaId: usuario.empresaId,
110: empresaId: string | null;
117: empresaId: usuario.empresaId,
141: `[AUTH] login admin falhou empresaId=- usuarioId=- status=FALHA tempoMs=${tempoMs}`,
165: `[AUTH] login admin usuário inativo empresaId=${usuario.empresaId} usuarioId=${usuario.id} status=FALHA tempoMs=${tempoMs}`,
169: empresaId: usuario.empresaId,
170: usuarioId: usuario.id,
171: tipoUsuario: usuario.role as TipoUsuarioAuditoria,
194: `[AUTH] login admin senha inválida empresaId=${usuario.empresaId} usuarioId=${usuario.id} status=FALHA tempoMs=${tempoMs}`,
198: empresaId: usuario.empresaId,
199: usuarioId: usuario.id,
200: tipoUsuario: usuario.role as TipoUsuarioAuditoria,
228: empresaId: usuario.empresaId,
229: usuarioId: usuario.id,
230: clienteId: null,
254: `[AUTH] login admin sucesso empresaId=${usuario.empresaId} usuarioId=${usuario.id} sessaoId=${sessaoId} status=SUCESSO tempoMs=${tempoMs}`,
258: empresaId: usuario.empresaId,
259: usuarioId: usuario.id,
260: tipoUsuario: usuario.role as TipoUsuarioAuditoria,
270: role: mapRole(usuario.role),
287: role: mapRole(usuario.role),
314: usuarioId: payload.sub,
315: clienteId: null,
339: usuarioId: sessao.usuarioId,
340: clienteId: null,
356: if (usuario.empresaId && (!usuario.empresa || !usuario.empresa.ativo)) {
377: empresaId: usuario.empresaId,
378: usuarioId: usuario.id,
379: role: usuario.role,
398: const usuarioId = usuarioLogado?.id || usuarioLogado?.sub;
400: if (!sessaoId || !usuarioId) {
407: usuarioId,
408: clienteId: null,
429: await this.sessoesService.revogarSessaoAdmin(sessao.id, usuarioId);
432: empresaId: usuarioLogado?.empresaId,
433: usuarioId,
434: role: usuarioLogado?.role,
447: const usuarioId = usuarioLogado?.id || usuarioLogado?.sub;
449: if (!usuarioId) {
453: const result = await this.sessoesService.revogarTodasSessoesAdmin(usuarioId);
456: empresaId: usuarioLogado?.empresaId,
457: usuarioId,
458: role: usuarioLogado?.role,
474: const usuarioId = usuarioLogado?.id || usuarioLogado?.sub;
476: if (!usuarioId) {
480: return this.sessoesService.listarSessoesAdmin(usuarioId);
484: const usuarioId = usuarioLogado?.id || usuarioLogado?.sub;
486: if (!usuarioId) {
493: usuarioId,
494: clienteId: null,
502: await this.sessoesService.revogarSessaoAdmin(sessaoId, usuarioId);
505: empresaId: usuarioLogado?.empresaId,
506: usuarioId,
507: role: usuarioLogado?.role,

### beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts
5: export class JwtAuthGuard extends AuthGuard('jwt') {}

### beauty-core-backend/src/modules/auth/guards/roles.guard.ts
8: import { ROLES_KEY } from '../../../shared/decorators/roles.decorator';
11: export class RolesGuard implements CanActivate {
15: const rolesPermitidas = this.reflector.getAllAndOverride<string[]>(
16: ROLES_KEY,
20: if (!rolesPermitidas) {
27: return rolesPermitidas.includes(usuario.role);

### beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts
4: import { Role } from '@prisma/client';
13: role?: Role;
14: empresaId?: string | null;
22: export class JwtStrategy extends PassportStrategy(Strategy) {
56: role: true,
57: empresaId: true,
79: if (usuario.role === Role.CLIENTE) {
90: if (usuario.role === Role.SUPER_ADMIN) {
91: if (usuario.empresaId) {
101: role: usuario.role,
102: empresaId: null,
107: const rolesAdministrativasComEmpresa: Role[] = [
108: Role.ADMIN,
109: Role.GERENTE,
110: Role.RECEPCAO,
111: Role.PROFISSIONAL,
114: if (!rolesAdministrativasComEmpresa.includes(usuario.role)) {
115: throw new UnauthorizedException('Role administrativa inválida.');
118: if (!usuario.empresaId) {
136: role: usuario.role,
137: empresaId: usuario.empresaId,

### beauty-core-backend/src/modules/cliente-area/cliente-area.controller.ts
13: import { ClienteAuthGuard } from '../auth-cliente/guards/cliente-auth.guard';
14: import { ClienteAreaService } from './cliente-area.service';
15: import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';
17: type ClienteAuthUser = {
19: clienteId?: string;
20: empresaId: string;
22: role?: 'CLIENTE';
25: type ClienteRequest = Request & {
26: user: ClienteAuthUser;
29: @ApiTags('Cliente Area')
30: @ApiBearerAuth('JWT Cliente')
31: @UseGuards(ClienteAuthGuard)
32: @Controller('cliente-area')
33: export class ClienteAreaController {
34: constructor(private readonly clienteAreaService: ClienteAreaService) {}
36: private getAuth(req: ClienteRequest) {
37: const clienteId = req.user.clienteId ?? req.user.sub;
40: clienteId,
41: empresaId: req.user.empresaId,
46: @ApiOperation({ summary: 'Retorna o perfil público do cliente logado.' })
47: me(@Req() req: ClienteRequest) {
48: return this.clienteAreaService.me(this.getAuth(req));
52: @ApiOperation({ summary: 'Retorna o dashboard mobile do cliente logado.' })
53: dashboard(@Req() req: ClienteRequest) {
54: return this.clienteAreaService.dashboard(this.getAuth(req));
58: @ApiOperation({ summary: 'Lista os agendamentos do cliente logado.' })
60: @Req() req: ClienteRequest,
61: @Query() query: ClienteAreaQueryDto,
63: return this.clienteAreaService.agendamentos(this.getAuth(req), query);
67: @ApiOperation({ summary: 'Lista os próximos agendamentos do cliente logado.' })
69: @Req() req: ClienteRequest,
70: @Query() query: ClienteAreaQueryDto,
72: return this.clienteAreaService.proximosAgendamentos(
79: @ApiOperation({ summary: 'Retorna o último agendamento do cliente logado.' })
80: ultimoAgendamento(@Req() req: ClienteRequest) {
81: return this.clienteAreaService.ultimoAgendamento(this.getAuth(req));
85: @ApiOperation({ summary: 'Retorna o resumo de fidelidade do cliente logado.' })
86: fidelidade(@Req() req: ClienteRequest) {
87: return this.clienteAreaService.fidelidade(this.getAuth(req));
91: @ApiOperation({ summary: 'Lista o histórico de pontos do cliente logado.' })
93: @Req() req: ClienteRequest,
94: @Query() query: ClienteAreaQueryDto,
96: return this.clienteAreaService.pontos(this.getAuth(req), query);
100: @ApiOperation({ summary: 'Lista os benefícios disponíveis para o cliente.' })
101: beneficios(@Req() req: ClienteRequest) {
102: return this.clienteAreaService.beneficios(this.getAuth(req));
106: @ApiOperation({ summary: 'Lista os pacotes do cliente separados por status.' })
107: pacotes(@Req() req: ClienteRequest) {
108: return this.clienteAreaService.pacotes(this.getAuth(req));
112: @ApiOperation({ summary: 'Retorna os detalhes de um pacote do cliente.' })
114: @Req() req: ClienteRequest,
117: return this.clienteAreaService.pacoteDetalhes(
124: @ApiOperation({ summary: 'Lista as notificações do cliente logado.' })
126: @Req() req: ClienteRequest,
127: @Query() query: ClienteAreaQueryDto,
129: return this.clienteAreaService.notificacoes(this.getAuth(req), query);
133: @ApiOperation({ summary: 'Lista as notificações não lidas do cliente.' })
134: notificacoesNaoLidas(@Req() req: ClienteRequest) {
135: return this.clienteAreaService.notificacoesNaoLidas(this.getAuth(req));
139: @ApiOperation({ summary: 'Marca uma notificação do cliente como lida.' })
141: @Req() req: ClienteRequest,
144: return this.clienteAreaService.marcarNotificacaoComoLida(
151: @ApiOperation({ summary: 'Lista o histórico de mensagens WhatsApp do cliente.' })
153: @Req() req: ClienteRequest,
154: @Query() query: ClienteAreaQueryDto,
156: return this.clienteAreaService.mensagensWhatsapp(this.getAuth(req), query);
160: @ApiOperation({ summary: 'Retorna o histórico consolidado do cliente.' })
162: @Req() req: ClienteRequest,
163: @Query() query: ClienteAreaQueryDto,
165: return this.clienteAreaService.historico(this.getAuth(req), query);

### beauty-core-backend/src/modules/cliente-area/cliente-area.module.ts
4: import { ClienteAreaController } from './cliente-area.controller';
5: import { ClienteAreaService } from './cliente-area.service';
9: controllers: [ClienteAreaController],
10: providers: [ClienteAreaService],
11: exports: [ClienteAreaService],
13: export class ClienteAreaModule {}

### beauty-core-backend/src/modules/cliente-area/cliente-area.service.ts
9: import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';
11: type ClienteAreaAuth = {
12: clienteId?: string;
13: empresaId: string;
17: export class ClienteAreaService {
20: private validarAuth(auth: ClienteAreaAuth) {
21: if (!auth.clienteId || !auth.empresaId) {
22: throw new UnauthorizedException('Token de cliente inválido.');
26: clienteId: auth.clienteId,
27: empresaId: auth.empresaId,
31: private getPagination(query: ClienteAreaQueryDto) {
61: private async buscarClienteSeguro(auth: ClienteAreaAuth) {
64: const cliente = await this.prisma.cliente.findFirst({
66: id: safeAuth.clienteId,
67: empresaId: safeAuth.empresaId,
83: if (!cliente) {
85: 'Cliente não encontrado, inativo ou sem acesso ao portal.',
89: return cliente;
92: async me(auth: ClienteAreaAuth) {
93: const cliente = await this.buscarClienteSeguro(auth);
96: data: cliente,
101: async dashboard(auth: ClienteAreaAuth) {
111: this.buscarClienteSeguro(auth),
139: async agendamentos(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
140: await this.buscarClienteSeguro(auth);
148: empresaId: safeAuth.empresaId,
149: clienteId: safeAuth.clienteId,
164: empresaId: safeAuth.empresaId,
165: clienteId: safeAuth.clienteId,
182: async proximosAgendamentos(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
183: await this.buscarClienteSeguro(auth);
192: empresaId: safeAuth.empresaId,
193: clienteId: safeAuth.clienteId,
211: empresaId: safeAuth.empresaId,
212: clienteId: safeAuth.clienteId,
232: async ultimoAgendamento(auth: ClienteAreaAuth) {
233: await this.buscarClienteSeguro(auth);
243: async fidelidade(auth: ClienteAreaAuth) {
244: await this.buscarClienteSeguro(auth);
254: async pontos(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
255: await this.buscarClienteSeguro(auth);
263: empresaId: safeAuth.empresaId,
264: clienteId: safeAuth.clienteId,
274: empresaId: safeAuth.empresaId,
275: clienteId: safeAuth.clienteId,
292: async beneficios(auth: ClienteAreaAuth) {
293: await this.buscarClienteSeguro(auth);
305: async pacotes(auth: ClienteAreaAuth) {
306: await this.buscarClienteSeguro(auth);
321: async pacoteDetalhes(auth: ClienteAreaAuth, pacoteId: string) {
322: await this.buscarClienteSeguro(auth);
326: const pacote = await this.prisma.clientePacote.findFirst({
329: empresaId: safeAuth.empresaId,
330: clienteId: safeAuth.clienteId,
338: throw new NotFoundException('Pacote não encontrado para este cliente.');
347: async notificacoes(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
348: await this.buscarClienteSeguro(auth);
356: empresaId: safeAuth.empresaId,
357: clienteId: safeAuth.clienteId,
367: empresaId: safeAuth.empresaId,
368: clienteId: safeAuth.clienteId,
385: async notificacoesNaoLidas(auth: ClienteAreaAuth) {
386: await this.buscarClienteSeguro(auth);
398: async marcarNotificacaoComoLida(auth: ClienteAreaAuth, id: string) {
399: await this.buscarClienteSeguro(auth);
406: empresaId: safeAuth.empresaId,
407: clienteId: safeAuth.clienteId,
413: 'Notificação não encontrada para este cliente.',
432: async mensagensWhatsapp(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
433: await this.buscarClienteSeguro(auth);
441: empresaId: safeAuth.empresaId,
442: clienteId: safeAuth.clienteId,
452: empresaId: safeAuth.empresaId,
453: clienteId: safeAuth.clienteId,
470: async historico(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
471: await this.buscarClienteSeguro(auth);
486: empresaId: safeAuth.empresaId,
487: clienteId: safeAuth.clienteId,
496: empresaId: safeAuth.empresaId,
497: clienteId: safeAuth.clienteId,
504: this.prisma.clientePacote.findMany({
506: empresaId: safeAuth.empresaId,
507: clienteId: safeAuth.clienteId,
519: empresaId: safeAuth.empresaId,
520: clienteId: safeAuth.clienteId,
529: empresaId: safeAuth.empresaId,
530: clienteId: safeAuth.clienteId,
599: auth: ClienteAreaAuth,
606: empresaId: safeAuth.empresaId,
607: clienteId: safeAuth.clienteId,
624: private async buscarUltimoAgendamentoInterno(auth: ClienteAreaAuth) {
629: empresaId: safeAuth.empresaId,
630: clienteId: safeAuth.clienteId,
643: private async buscarFidelidadeInterno(auth: ClienteAreaAuth) {
650: empresaId: safeAuth.empresaId,
651: clienteId: safeAuth.clienteId,
656: empresaId: safeAuth.empresaId,
665: empresaId: safeAuth.empresaId,
666: clienteId: safeAuth.clienteId,
687: private async buscarBeneficiosInterno(auth: ClienteAreaAuth) {

### beauty-core-backend/src/modules/cliente-area/dto/cliente-area-query.dto.ts
5: export class ClienteAreaQueryDto {

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.spec.ts
2: import { ClientesPacotesController } from './clientes-pacotes.controller';
4: describe('ClientesPacotesController', () => {
5: let controller: ClientesPacotesController;
9: controllers: [ClientesPacotesController],
12: controller = module.get<ClientesPacotesController>(ClientesPacotesController);

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.ts
27: import { ClientesPacotesService } from './clientes-pacotes.service';
28: import { CreateClientePacoteDto } from './dto/create-cliente-pacote.dto';
30: import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
31: import { RolesGuard } from '../auth/guards/roles.guard';
32: import { Roles } from '../../shared/decorators/roles.decorator';
33: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
35: @ApiTags('Clientes Pacotes')
37: @Controller('clientes-pacotes')
38: @UseGuards(JwtAuthGuard, RolesGuard)
39: export class ClientesPacotesController {
41: private readonly clientesPacotesService: ClientesPacotesService,
45: @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
47: summary: 'Vincular pacote ao cliente',
49: 'Vincula um pacote a um cliente da empresa autenticada. Endpoint usado pelo painel administrativo para venda, liberação ou associação de pacotes de sessões a clientes.',
52: type: CreateClientePacoteDto,
53: description: 'Dados necessários para vincular um pacote a um cliente.',
56: description: 'Pacote vinculado ao cliente com sucesso.',
60: empresaId: '550e8400-e29b-41d4-a716-446655440000',
61: clienteId: '550e8400-e29b-41d4-a716-446655440000',
87: @Body() dto: CreateClientePacoteDto,
89: return this.clientesPacotesService.create(
90: getEmpresaId(req),
96: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
98: summary: 'Listar pacotes de clientes',
100: 'Lista todos os pacotes vinculados a clientes da empresa autenticada. Endpoint usado para acompanhamento operacional, controle de sessões e gestão de pacotes ativos ou cancelados.',
103: description: 'Pacotes de clientes retornados com sucesso.',
108: empresaId: '550e8400-e29b-41d4-a716-446655440000',
109: clienteId: '550e8400-e29b-41d4-a716-446655440000',
132: return this.clientesPacotesService.findAll(
133: getEmpresaId(req),
137: @Get('cliente/:clienteId')
138: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
140: summary: 'Listar pacotes de um cliente',
142: 'Lista os pacotes vinculados a um cliente específico da empresa autenticada. Endpoint útil para histórico do cliente, área administrativa, atendimento e futura área mobile do cliente.',
145: name: 'clienteId',
146: description: 'ID do cliente.',
151: description: 'Pacotes do cliente retornados com sucesso.',
156: empresaId: '550e8400-e29b-41d4-a716-446655440000',
157: clienteId: '550e8400-e29b-41d4-a716-446655440000',
173: description: 'clienteId inválido. O parâmetro deve ser um UUID válido.',
183: description: 'Cliente não encontrado para a empresa autenticada.',
185: findByCliente(
187: @Param('clienteId', ParseUUIDPipe) clienteId: string,
189: return this.clientesPacotesService.findByCliente(
190: getEmpresaId(req),
191: clienteId,
196: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
200: 'Registra o uso de uma sessão de um pacote vinculado a cliente. Endpoint usado no atendimento para controlar sessões utilizadas e restantes.',
204: description: 'ID do pacote vinculado ao cliente.',
213: empresaId: '550e8400-e29b-41d4-a716-446655440000',
214: clienteId: '550e8400-e29b-41d4-a716-446655440000',
236: description: 'Pacote do cliente não encontrado para a empresa autenticada.',
242: return this.clientesPacotesService.usarSessao(
243: getEmpresaId(req),
249: @Roles('ADMIN', 'GERENTE')
251: summary: 'Cancelar pacote do cliente',
253: 'Cancela um pacote vinculado a cliente da empresa autenticada. Endpoint administrativo usado para interromper uso futuro sem remover o histórico.',
257: description: 'ID do pacote vinculado ao cliente que será cancelado.',
262: description: 'Pacote do cliente cancelado com sucesso.',
266: empresaId: '550e8400-e29b-41d4-a716-446655440000',
267: clienteId: '550e8400-e29b-41d4-a716-446655440000',
287: description: 'Pacote do cliente não encontrado para a empresa autenticada.',
293: return this.clientesPacotesService.cancelar(
294: getEmpresaId(req),

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.module.ts
9: import { ClientesPacotesController } from './clientes-pacotes.controller';
10: import { ClientesPacotesService } from './clientes-pacotes.service';
20: controllers: [ClientesPacotesController],
22: providers: [ClientesPacotesService],
24: exports: [ClientesPacotesService],
26: export class ClientesPacotesModule {}

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.spec.ts
2: import { ClientesPacotesService } from './clientes-pacotes.service';
4: describe('ClientesPacotesService', () => {
5: let service: ClientesPacotesService;
9: providers: [ClientesPacotesService],
12: service = module.get<ClientesPacotesService>(ClientesPacotesService);

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.ts
9: StatusClientePacote,
16: import { CreateClientePacoteDto } from './dto/create-cliente-pacote.dto';
23: export class ClientesPacotesService {
24: private readonly logger = new Logger(ClientesPacotesService.name);
33: async create(empresaId: string, dto: CreateClientePacoteDto) {
36: await this.tenantValidator.validarEmpresaAtiva(empresaId);
38: await this.tenantValidator.validarCliente(
39: empresaId,
40: dto.clienteId,
46: empresaId,
51: empresaId: true,
72: const clientePacote = await this.prisma.clientePacote.create({
74: empresaId,
75: clienteId: dto.clienteId,
81: status: StatusClientePacote.ATIVO,
84: cliente: true,
90: empresaId,
92: modulo: 'CLIENTES_PACOTES',
93: titulo: 'Cliente comprou um pacote',
94: mensagem: `Cliente adquiriu o pacote ${pacote.nome} com ${pacote.quantidadeSessoes} sessões.`,
95: referenciaId: clientePacote.id,
97: clientePacoteId: clientePacote.id,
98: clienteId: clientePacote.clienteId,
99: pacoteId: clientePacote.pacoteId,
101: sessoesTotal: clientePacote.sessoesTotal,
102: sessoesUsadas: clientePacote.sessoesUsadas,
103: sessoesRestantes: clientePacote.sessoesRestantes,
104: dataValidade: clientePacote.dataValidade,
105: status: clientePacote.status,
112: `[CLIENTES_PACOTES] pacote vendido empresaId=${empresaId} clientePacoteId=${clientePacote.id} clienteId=${clientePacote.clienteId} status=SUCESSO tempoMs=${tempoMs}`,
116: empresaId,
117: clienteId: clientePacote.clienteId,
119: modulo: 'CLIENTES_PACOTES',
120: recurso: 'ClientePacote',
121: recursoId: clientePacote.id,
123: id: clientePacote.id,
124: clienteId: clientePacote.clienteId,
125: clienteNome: clientePacote.cliente?.nome,
126: pacoteId: clientePacote.pacoteId,
127: pacoteNome: clientePacote.pacote?.nome,
128: sessoesTotal: clientePacote.sessoesTotal,
129: sessoesUsadas: clientePacote.sessoesUsadas,
130: sessoesRestantes: clientePacote.sessoesRestantes,
131: dataValidade: clientePacote.dataValidade,
132: status: clientePacote.status,
137: mensagem: 'Pacote do cliente criado com sucesso.',
140: return clientePacote;
143: async findAll(empresaId: string) {
144: await this.tenantValidator.validarEmpresaAtiva(empresaId);
146: return this.prisma.clientePacote.findMany({
148: empresaId,
151: cliente: true,
160: async findByCliente(empresaId: string, clienteId: string) {
161: await this.tenantValidator.validarEmpresaAtiva(empresaId);
163: await this.tenantValidator.validarCliente(
164: empresaId,
165: clienteId,
168: return this.prisma.clientePacote.findMany({
170: empresaId,
171: clienteId,
174: cliente: true,
183: async usarSessao(empresaId: string, id: string) {
186: await this.tenantValidator.validarEmpresaAtiva(empresaId);
188: const clientePacote = await this.buscarClientePacoteOuFalhar(
189: empresaId,
193: await this.tenantValidator.validarCliente(
194: empresaId,
195: clientePacote.clienteId,
198: if (clientePacote.status !== StatusClientePacote.ATIVO) {
203: clientePacote.dataValidade &&
204: clientePacote.dataValidade < new Date()
206: const result = await this.prisma.clientePacote.updateMany({
209: empresaId,
212: status: StatusClientePacote.VENCIDO,
217: throw new NotFoundException('Pacote do cliente não encontrado');
220: const pacoteVencido = await this.buscarClientePacoteOuFalhar(
221: empresaId,
226: empresaId,
228: modulo: 'CLIENTES_PACOTES',
230: mensagem: `O pacote ${pacoteVencido.pacote.nome} do cliente venceu.`,
233: clientePacoteId: pacoteVencido.id,
234: clienteId: pacoteVencido.clienteId,
245: `[CLIENTES_PACOTES] pacote vencido empresaId=${empresaId} clientePacoteId=${pacoteVencido.id} clienteId=${pacoteVencido.clienteId} status=SUCESSO tempoMs=${tempoMs}`,
249: empresaId,
250: clienteId: pacoteVencido.clienteId,
252: modulo: 'CLIENTES_PACOTES',
253: recurso: 'ClientePacote',
256: id: clientePacote.id,
257: clienteId: clientePacote.clienteId,
258: clienteNome: clientePacote.cliente?.nome,
259: pacoteId: clientePacote.pacoteId,
260: pacoteNome: clientePacote.pacote?.nome,
261: sessoesTotal: clientePacote.sessoesTotal,
262: sessoesUsadas: clientePacote.sessoesUsadas,
263: sessoesRestantes: clientePacote.sessoesRestantes,
264: dataValidade: clientePacote.dataValidade,
265: status: clientePacote.status,
269: clienteId: pacoteVencido.clienteId,
270: clienteNome: pacoteVencido.cliente?.nome,
281: statusAnterior: clientePacote.status,

### beauty-core-backend/src/modules/clientes-pacotes/dto/create-cliente-pacote.dto.ts
5: export class CreateClientePacoteDto {
10: 'ID do cliente que receberá o pacote. Deve pertencer à empresa autenticada.',
13: message: 'O clienteId deve ser um UUID válido.',
15: clienteId: string;
21: 'ID do pacote que será vinculado ao cliente. Deve pertencer à empresa autenticada.',

### beauty-core-backend/src/modules/clientes/clientes.controller.ts
29: import { Roles } from '../../shared/decorators/roles.decorator';
31: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
32: import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
33: import { RolesGuard } from '../auth/guards/roles.guard';
35: import { ClientesService } from './clientes.service';
36: import { CreateClienteDto } from './dto/create-cliente.dto';
37: import { UpdateClienteDto } from './dto/update-cliente.dto';
39: @ApiTags('Clientes')
41: @Controller('clientes')
42: @UseGuards(JwtAuthGuard, RolesGuard)
43: export class ClientesController {
44: constructor(private readonly clientesService: ClientesService) {}
47: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
49: summary: 'Criar cliente',
51: 'Cria um cliente para a empresa autenticada. Endpoint usado pelo painel administrativo para cadastrar clientes vinculados ao contexto multiempresa do usuário logado.',
54: type: CreateClienteDto,
55: description: 'Dados necessários para criação de um cliente.',
58: description: 'Cliente criado com sucesso.',
62: empresaId: '550e8400-e29b-41d4-a716-446655440000',
67: fotoUrl: '/uploads/clientes/maria-silva.png',
68: observacoes: 'Cliente prefere atendimento no período da tarde.',
90: @Body() createClienteDto: CreateClienteDto,
93: return this.clientesService.create(
94: createClienteDto,
95: getEmpresaId(req),
100: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
102: summary: 'Listar clientes',
104: 'Lista os clientes da empresa autenticada com suporte a paginação. Endpoint preparado para painel administrativo, dashboard, busca mobile e integrações internas.',
119: description: 'Clientes retornados com sucesso.',
125: empresaId: '550e8400-e29b-41d4-a716-446655440000',
130: fotoUrl: '/uploads/clientes/maria-silva.png',
131: observacoes: 'Cliente prefere atendimento no período da tarde.',
161: return this.clientesService.findAll(
162: getEmpresaId(req),
168: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
170: summary: 'Buscar cliente por ID',
172: 'Busca um cliente específico pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
176: description: 'ID do cliente.',
181: description: 'Cliente encontrado com sucesso.',
185: empresaId: '550e8400-e29b-41d4-a716-446655440000',
190: fotoUrl: '/uploads/clientes/maria-silva.png',
191: observacoes: 'Cliente prefere atendimento no período da tarde.',
213: description: 'Cliente não encontrado para a empresa autenticada.',
219: return this.clientesService.findOne(
221: getEmpresaId(req),
226: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
228: summary: 'Atualizar cliente',
230: 'Atualiza os dados de um cliente existente da empresa autenticada. Endpoint usado pelo painel administrativo para manutenção cadastral.',
234: description: 'ID do cliente que será atualizado.',
239: type: UpdateClienteDto,
240: description: 'Dados permitidos para atualização do cliente.',
243: description: 'Cliente atualizado com sucesso.',
247: empresaId: '550e8400-e29b-41d4-a716-446655440000',
252: fotoUrl: '/uploads/clientes/maria-silva.png',
253: observacoes: 'Cliente atualizada pelo painel administrativo.',
275: description: 'Cliente não encontrado para a empresa autenticada.',
279: @Body() updateClienteDto: UpdateClienteDto,
282: return this.clientesService.update(
284: updateClienteDto,
285: getEmpresaId(req),
290: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
292: summary: 'Inativar cliente',
294: 'Inativa um cliente da empresa autenticada sem remover o registro do banco. Usado para preservar histórico de agendamentos, financeiro, fidelidade e auditoria.',
298: description: 'ID do cliente que será inativado.',
303: description: 'Cliente inativado com sucesso.',
307: empresaId: '550e8400-e29b-41d4-a716-446655440000',
327: description: 'Cliente não encontrado para a empresa autenticada.',
333: return this.clientesService.inativar(
335: getEmpresaId(req),

### beauty-core-backend/src/modules/clientes/clientes.module.ts
3: import { ClientesService } from './clientes.service';
4: import { ClientesController } from './clientes.controller';
20: controllers: [ClientesController],
22: providers: [ClientesService],
24: exports: [ClientesService],
26: export class ClientesModule {}

### beauty-core-backend/src/modules/clientes/clientes.service.ts
19: import { CreateClienteDto } from './dto/create-cliente.dto';
20: import { UpdateClienteDto } from './dto/update-cliente.dto';
27: export class ClientesService {
28: private readonly logger = new Logger(ClientesService.name);
37: async create(createClienteDto: CreateClienteDto, empresaId: string) {
40: await this.tenantValidator.validarEmpresaAtiva(empresaId);
42: const cliente = await this.prisma.cliente.create({
44: empresaId,
45: nome: createClienteDto.nome,
46: telefone: createClienteDto.telefone,
47: email: createClienteDto.email,
48: foto: createClienteDto.foto,
49: dataNascimento: createClienteDto.dataNascimento
50: ? new Date(createClienteDto.dataNascimento)
52: observacoes: createClienteDto.observacoes,
59: `[CLIENTES] cliente criado empresaId=${empresaId} clienteId=${cliente.id} status=SUCESSO tempoMs=${tempoMs}`,
63: empresaId,
65: modulo: 'CLIENTES',
66: recurso: 'Cliente',
67: recursoId: cliente.id,
69: id: cliente.id,
70: nome: cliente.nome,
71: telefone: cliente.telefone,
72: email: cliente.email,
73: dataNascimento: cliente.dataNascimento,
74: ativo: cliente.ativo,
79: mensagem: 'Cliente criado com sucesso.',
83: await this.buscarUsuarioResponsavel(cliente.empresaId);
86: empresaId: cliente.empresaId,
87: usuarioId: usuarioResponsavel?.id,
88: tipo: TipoEventoSistema.CLIENTE_CADASTRADO,
89: modulo: 'CLIENTES',
90: titulo: 'Novo cliente cadastrado',
91: mensagem: `Cliente ${cliente.nome} foi cadastrado no sistema.`,
92: referenciaId: cliente.id,
94: usuarioId: usuarioResponsavel?.id,
95: clienteId: cliente.id,
96: nome: cliente.nome,
97: telefone: cliente.telefone,
98: email: cliente.email,
99: dataNascimento: cliente.dataNascimento,
100: ativo: cliente.ativo,
105: cliente.dataNascimento &&
106: this.ehAniversarianteHoje(cliente.dataNascimento)
108: await this.prepararEventoClienteAniversariante(
109: cliente.empresaId,
110: cliente,
115: return cliente;
118: async findAll(empresaId: string, query: PaginationDto) {
119: await this.tenantValidator.validarEmpresaAtiva(empresaId);
132: const orderBy: keyof Prisma.ClienteOrderByWithRelationInput =
134: ? (query.orderBy as keyof Prisma.ClienteOrderByWithRelationInput)
139: const where: Prisma.ClienteWhereInput = {
140: empresaId,
169: this.prisma.cliente.findMany({
177: this.prisma.cliente.count({
185: async findOne(id: string, empresaId: string) {
186: return this.tenantValidator.validarCliente(empresaId, id);
191: updateClienteDto: UpdateClienteDto,
192: empresaId: string,
196: const clienteAntes = await this.tenantValidator.validarCliente(
197: empresaId,
201: const result = await this.prisma.cliente.updateMany({
204: empresaId,
208: nome: updateClienteDto.nome,
209: telefone: updateClienteDto.telefone,
210: email: updateClienteDto.email,
211: foto: updateClienteDto.foto,
212: dataNascimento: updateClienteDto.dataNascimento
213: ? new Date(updateClienteDto.dataNascimento)
215: observacoes: updateClienteDto.observacoes,
220: throw new NotFoundException('Cliente não encontrado');
223: const clienteDepois = await this.findOne(id, empresaId);
228: `[CLIENTES] cliente atualizado empresaId=${empresaId} clienteId=${id} status=SUCESSO tempoMs=${tempoMs}`,
232: empresaId,
234: modulo: 'CLIENTES',
235: recurso: 'Cliente',
238: nome: clienteAntes.nome,
239: telefone: clienteAntes.telefone,
240: email: clienteAntes.email,
241: foto: clienteAntes['foto'],
242: dataNascimento: clienteAntes['dataNascimento'],
243: observacoes: clienteAntes['observacoes'],
244: ativo: clienteAntes.ativo,
247: nome: clienteDepois.nome,
248: telefone: clienteDepois.telefone,
249: email: clienteDepois.email,
250: foto: clienteDepois['foto'],
251: dataNascimento: clienteDepois['dataNascimento'],
252: observacoes: clienteDepois['observacoes'],
253: ativo: clienteDepois.ativo,
258: mensagem: 'Cliente atualizado com sucesso.',
261: return clienteDepois;
264: async inativar(id: string, empresaId: string) {
267: const clienteAntes = await this.tenantValidator.validarCliente(
268: empresaId,
272: const result = await this.prisma.cliente.updateMany({
275: empresaId,
284: throw new NotFoundException('Cliente não encontrado');
290: `[CLIENTES] cliente inativado empresaId=${empresaId} clienteId=${id} status=SUCESSO tempoMs=${tempoMs}`,

### beauty-core-backend/src/modules/clientes/dto/create-cliente.dto.ts
16: export class CreateClienteDto {
20: 'Nome completo do cliente. Usado no cadastro, agendamentos, fidelidade, histórico e área do cliente.',
38: 'Telefone do cliente com DDD. Usado para contato, WhatsApp, autenticação OTP e identificação do cliente.',
53: 'E-mail opcional do cliente. Pode ser usado para contato, relatórios e futuras integrações.',
66: example: '/uploads/clientes/maria-silva.png',
68: 'Caminho ou URL opcional da foto do cliente. Normalmente preenchido após upload de arquivo.',
83: 'Data de nascimento do cliente em formato ISO. Usada para aniversários, campanhas, fidelidade e automações.',
92: example: 'Cliente prefere atendimento no período da tarde.',
94: 'Observações internas opcionais sobre o cliente, visíveis no painel administrativo.',

### beauty-core-backend/src/modules/clientes/dto/update-cliente.dto.ts
15: export class UpdateClienteDto {
19: 'Nome completo atualizado do cliente. Campo opcional para atualização parcial.',
38: 'Telefone atualizado do cliente com DDD. Usado para contato, WhatsApp, autenticação OTP e identificação do cliente.',
54: 'E-mail atualizado do cliente. Campo opcional para contato, relatórios e futuras integrações.',
67: example: '/uploads/clientes/maria-silva-atualizada.png',
69: 'Caminho ou URL atualizada da foto do cliente. Normalmente preenchido após upload de arquivo.',
84: 'Data de nascimento atualizada do cliente em formato ISO. Usada para aniversários, campanhas, fidelidade e automações.',
93: example: 'Cliente atualizada pelo painel administrativo.',
95: 'Observações internas atualizadas sobre o cliente, visíveis no painel administrativo.',

### beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts
20: summary: 'Resolver tenant público para portal do cliente',
22: 'Retorna apenas dados públicos e seguros do tenant para uso em portal web, PWA, app Android, app iOS e white-label mobile. Não expõe empresaId, plano, status interno, tokens ou dados administrativos.',
41: portalClienteAtivo: true,
65: portalClienteAtivo:
66: dados?.portalClienteAtivo ??

### beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts
22: 'Retorna os dados públicos de uma empresa ativa a partir do slug. Usado por frontend, PWA, app mobile e portal do cliente antes do login.',

### beauty-core-backend/src/modules/usuarios/dto/create-usuario.dto.ts
2: import { Role } from '@prisma/client';
15: const ADMINISTRATIVE_ROLES = [
16: Role.SUPER_ADMIN,
17: Role.ADMIN,
18: Role.GERENTE,
19: Role.RECEPCAO,
20: Role.PROFISSIONAL,
31: empresaId?: string;
75: enum: ADMINISTRATIVE_ROLES,
76: example: Role.GERENTE,
78: 'Role administrativa do usuário. CLIENTE não deve ser criado pelo módulo Usuarios.',
80: @IsIn(ADMINISTRATIVE_ROLES, {
82: 'Role inválida para usuário administrativo. Use SUPER_ADMIN, ADMIN, GERENTE, RECEPCAO ou PROFISSIONAL.',
84: role: Role;

### beauty-core-backend/src/modules/usuarios/dto/list-usuarios-query.dto.ts
2: import { Role } from '@prisma/client';
7: const ADMINISTRATIVE_USER_ROLES = [
8: Role.SUPER_ADMIN,
9: Role.ADMIN,
10: Role.GERENTE,
11: Role.RECEPCAO,
12: Role.PROFISSIONAL,
17: enum: ADMINISTRATIVE_USER_ROLES,
18: example: Role.PROFISSIONAL,
20: 'Filtra usuários administrativos por role. CLIENTE não pertence a este módulo.',
23: @IsIn(ADMINISTRATIVE_USER_ROLES, {
25: 'Role inválida. Use SUPER_ADMIN, ADMIN, GERENTE, RECEPCAO ou PROFISSIONAL.',
27: role?: Role;

### beauty-core-backend/src/modules/usuarios/dto/update-usuario.dto.ts
2: import { Role } from '@prisma/client';
15: const ADMINISTRATIVE_ROLES = [
16: Role.SUPER_ADMIN,
17: Role.ADMIN,
18: Role.GERENTE,
19: Role.RECEPCAO,
20: Role.PROFISSIONAL,
31: empresaId?: string;
77: enum: ADMINISTRATIVE_ROLES,
78: example: Role.GERENTE,
80: 'Role administrativa do usuário. Alteração protegida pela política central de roles.',
83: @IsIn(ADMINISTRATIVE_ROLES, {
85: 'Role inválida para usuário administrativo. Use SUPER_ADMIN, ADMIN, GERENTE, RECEPCAO ou PROFISSIONAL.',
87: role?: Role;

### beauty-core-backend/src/modules/usuarios/policies/usuario-role.policy.ts
2: import { Role } from '@prisma/client';
4: export class UsuarioRolePolicy {
5: private static readonly ROLES_CRIAVEIS_POR_SUPER_ADMIN: Role[] = [
6: Role.SUPER_ADMIN,
7: Role.ADMIN,
8: Role.GERENTE,
9: Role.RECEPCAO,
10: Role.PROFISSIONAL,
13: private static readonly ROLES_CRIAVEIS_POR_ADMIN: Role[] = [
14: Role.GERENTE,
15: Role.RECEPCAO,
16: Role.PROFISSIONAL,
19: private static readonly ROLES_CRIAVEIS_POR_GERENTE: Role[] = [
20: Role.RECEPCAO,
21: Role.PROFISSIONAL,
24: private static readonly ROLES_GERENCIAVEIS_POR_SUPER_ADMIN: Role[] = [
25: Role.SUPER_ADMIN,
26: Role.ADMIN,
27: Role.GERENTE,
28: Role.RECEPCAO,
29: Role.PROFISSIONAL,
32: private static readonly ROLES_GERENCIAVEIS_POR_ADMIN: Role[] = [
33: Role.GERENTE,
34: Role.RECEPCAO,
35: Role.PROFISSIONAL,
38: private static readonly ROLES_GERENCIAVEIS_POR_GERENTE: Role[] = [
39: Role.RECEPCAO,
40: Role.PROFISSIONAL,
43: static canCreateUser(actorRole: Role, targetRole: Role): boolean {
44: if (actorRole === Role.SUPER_ADMIN) {
45: return this.ROLES_CRIAVEIS_POR_SUPER_ADMIN.includes(targetRole);
48: if (actorRole === Role.ADMIN) {
49: return this.ROLES_CRIAVEIS_POR_ADMIN.includes(targetRole);
52: if (actorRole === Role.GERENTE) {
53: return this.ROLES_CRIAVEIS_POR_GERENTE.includes(targetRole);
59: static assertCanCreateUser(actorRole: Role, targetRole: Role): void {
60: if (!this.canCreateUser(actorRole, targetRole)) {
62: `A role ${actorRole} não tem permissão para criar usuário com role ${targetRole}.`,
67: static canManageUser(actorRole: Role, targetRole: Role): boolean {
68: if (actorRole === Role.SUPER_ADMIN) {
69: return this.ROLES_GERENCIAVEIS_POR_SUPER_ADMIN.includes(targetRole);
72: if (actorRole === Role.ADMIN) {
73: return this.ROLES_GERENCIAVEIS_POR_ADMIN.includes(targetRole);
76: if (actorRole === Role.GERENTE) {
77: return this.ROLES_GERENCIAVEIS_POR_GERENTE.includes(targetRole);
83: static assertCanManageUser(actorRole: Role, targetRole: Role): void {
84: if (!this.canManageUser(actorRole, targetRole)) {
86: `A role ${actorRole} não tem permissão para gerenciar usuário com role ${targetRole}.`,
91: static canUpdateUserRole(
92: actorRole: Role,
93: currentTargetRole: Role,
94: newTargetRole: Role,
96: if (!this.canManageUser(actorRole, currentTargetRole)) {
100: if (!this.canCreateUser(actorRole, newTargetRole)) {
107: static assertCanUpdateUserRole(
108: actorRole: Role,
109: currentTargetRole: Role,
110: newTargetRole: Role,
112: if (!this.canUpdateUserRole(actorRole, currentTargetRole, newTargetRole)) {
114: `A role ${actorRole} não tem permissão para alterar usuário de ${currentTargetRole} para ${newTargetRole}.`,
119: static assertCannotChangeOwnRole(
122: currentTargetRole: Role,
123: newTargetRole?: Role,
125: if (!newTargetRole) {
130: const isChangingRole = currentTargetRole !== newTargetRole;
132: if (isSameUser && isChangingRole) {
134: 'Usuário não pode alterar a própria role.',
139: static canManageEmpresa(actorRole: Role): boolean {
140: return actorRole === Role.SUPER_ADMIN;
143: static assertCanManageEmpresa(actorRole: Role): void {
144: if (!this.canManageEmpresa(actorRole)) {
151: static canAccessEmpresasModule(actorRole: Role): boolean {
152: return actorRole === Role.SUPER_ADMIN;
155: static assertCanAccessEmpresasModule(actorRole: Role): void {
156: if (!this.canAccessEmpresasModule(actorRole)) {
163: static assertAdminUserHasEmpresa(actorRole: Role, empresaId?: string | null) {
164: const rolesQuePrecisamDeEmpresa: Role[] = [
165: Role.ADMIN,
166: Role.GERENTE,
167: Role.RECEPCAO,
168: Role.PROFISSIONAL,
171: if (rolesQuePrecisamDeEmpresa.includes(actorRole) && !empresaId) {
173: `Usuário com role ${actorRole} precisa estar vinculado a uma empresa.`,
178: static assertTargetRoleHasValidEmpresa(
179: targetRole: Role,
180: empresaId?: string | null,
182: if (targetRole === Role.SUPER_ADMIN) {
186: if (targetRole === Role.CLIENTE) {
188: 'CLIENTE não deve ser criado como usuário administrativo.',
192: if (!empresaId) {
194: `Usuário com role ${targetRole} precisa estar vinculado a uma empresa.`,
200: targetRole: Role,
201: empresaId?: string | null,
203: if (targetRole === Role.SUPER_ADMIN && empresaId) {

### beauty-core-backend/src/modules/usuarios/usuarios.controller.ts
29: import { Role } from '@prisma/client';
31: import { Roles } from '../../shared/decorators/roles.decorator';
33: import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
34: import { RolesGuard } from '../auth/guards/roles.guard';
45: role: Role;
46: empresaId?: string | null;
53: @UseGuards(JwtAuthGuard, RolesGuard)
58: @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
73: empresaId: '550e8400-e29b-41d4-a716-446655440000',
77: role: 'GERENTE',
99: return this.usuariosService.create(createUsuarioDto, req.user);
103: @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
132: 'Campo de ordenação permitido: nome, email, role, createdAt, updatedAt ou ultimoLogin.',
141: name: 'role',
144: Role.SUPER_ADMIN,
145: Role.ADMIN,
146: Role.GERENTE,
147: Role.RECEPCAO,
148: Role.PROFISSIONAL,
150: example: Role.PROFISSIONAL,
152: 'Filtra usuários administrativos pela role solicitada. CLIENTE não é aceito.',
161: empresaId: '550e8400-e29b-41d4-a716-446655440000',
165: role: 'GERENTE',
190: return this.usuariosService.findAll(req.user, query);
194: @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
211: empresaId: '550e8400-e29b-41d4-a716-446655440000',
215: role: 'GERENTE',
238: return this.usuariosService.findOne(id, req.user);
242: @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
246: 'Atualiza parcialmente um usuário. Aplica política central de roles para impedir escalação de privilégios, alteração indevida da própria role e edição de usuários superiores.',
263: empresaId: '550e8400-e29b-41d4-a716-446655440000',
267: role: 'GERENTE',
283: 'Usuário sem permissão, tentativa de escalação de privilégios ou alteração indevida de role.',
293: return this.usuariosService.update(id, updateUsuarioDto, req.user);
297: @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
301: 'Inativa um usuário sem remover fisicamente o registro. Aplica política central de roles para impedir que usuários inativem a própria conta, perfis superiores ou usuários fora do próprio tenant.',
333: return this.usuariosService.inativar(id, req.user);

### beauty-core-backend/src/modules/usuarios/usuarios.service.ts
8: import { Prisma, Role, TipoUsuarioAuditoria } from '@prisma/client';
23: import { UsuarioRolePolicy } from './policies/usuario-role.policy';
28: role: Role;
29: empresaId?: string | null;
33: empresaId?: string | null;
39: empresaId?: string | null;
51: role: true,
56: empresaId: true,
72: UsuarioRolePolicy.assertAdminUserHasEmpresa(actor.role, actor.empresaId);
74: UsuarioRolePolicy.assertCanCreateUser(actor.role, payload.role);
76: const empresaIdFinal = this.resolverEmpresaIdParaCriacao(actor, payload);
78: UsuarioRolePolicy.assertSuperAdminHasNoEmpresa(
79: payload.role,
80: empresaIdFinal,
83: UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(
84: payload.role,
85: empresaIdFinal,
88: if (empresaIdFinal) {
89: await this.validarEmpresaAtiva(empresaIdFinal);
103: role: payload.role,
104: empresaId: empresaIdFinal,
112: `[USUARIOS] usuario criado actorId=${actor.id} actorRole=${actor.role} empresaId=${empresaIdFinal ?? 'GLOBAL'} usuarioId=${usuario.id} targetRole=${usuario.role} status=SUCESSO tempoMs=${tempoMs}`,
116: empresaId: empresaIdFinal,
117: usuarioId: actor.id,
118: tipoUsuario: this.mapRoleToTipoUsuario(actor.role),
127: role: usuario.role,
129: empresaId: usuario.empresaId,
133: actorRole: actor.role,
134: targetRole: usuario.role,
144: UsuarioRolePolicy.assertAdminUserHasEmpresa(actor.role, actor.empresaId);
151: 'role',
185: if (query.role) {
187: role: query.role,
191: if (actor.role === Role.ADMIN) {
196: role: {
197: in: [Role.GERENTE, Role.RECEPCAO, Role.PROFISSIONAL],
204: if (actor.role === Role.GERENTE) {
209: role: {
210: in: [Role.RECEPCAO, Role.PROFISSIONAL],
218: actor.role === Role.SUPER_ADMIN
221: role: {
222: not: Role.CLIENTE,
227: empresaId: actor.empresaId,
270: const novaRole = payload.role ?? usuarioAntes.role;
272: UsuarioRolePolicy.assertCannotChangeOwnRole(
275: usuarioAntes.role,
276: payload.role,
279: if (payload.role && payload.role !== usuarioAntes.role) {
280: UsuarioRolePolicy.assertCanUpdateUserRole(
281: actor.role,
282: usuarioAntes.role,
283: payload.role,
286: UsuarioRolePolicy.assertCanManageUser(actor.role, usuarioAntes.role);
289: const empresaIdFinal = this.resolverEmpresaIdParaAtualizacao(
291: usuarioAntes.empresaId,
292: novaRole,
296: UsuarioRolePolicy.assertSuperAdminHasNoEmpresa(novaRole, empresaIdFinal);
298: UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(novaRole, empresaIdFinal);
300: if (empresaIdFinal) {
301: await this.validarEmpresaAtiva(empresaIdFinal);
322: role: novaRole,
323: empresaId: empresaIdFinal,
332: `[USUARIOS] usuario atualizado actorId=${actor.id} actorRole=${actor.role} empresaId=${usuarioDepois.empresaId ?? 'GLOBAL'} usuarioId=${id} roleAntes=${usuarioAntes.role} roleDepois=${usuarioDepois.role} status=SUCESSO tempoMs=${tempoMs}`,
336: empresaId: usuarioDepois.empresaId,
337: usuarioId: actor.id,
338: tipoUsuario: this.mapRoleToTipoUsuario(actor.role),
347: role: usuarioAntes.role,
349: empresaId: usuarioAntes.empresaId,
356: role: usuarioDepois.role,
358: empresaId: usuarioDepois.empresaId,
362: actorRole: actor.role,
364: roleAlterada: usuarioAntes.role !== usuarioDepois.role,
365: empresaAlterada: usuarioAntes.empresaId !== usuarioDepois.empresaId,
389: UsuarioRolePolicy.assertCanManageUser(actor.role, usuarioAntes.role);
404: `[USUARIOS] usuario inativado actorId=${actor.id} actorRole=${actor.role} empresaId=${usuarioAntes.empresaId ?? 'GLOBAL'} usuarioId=${id} targetRole=${usuarioAntes.role} status=SUCESSO tempoMs=${tempoMs}`,
408: empresaId: usuarioAntes.empresaId,
409: usuarioId: actor.id,
410: tipoUsuario: this.mapRoleToTipoUsuario(actor.role),
418: role: usuarioAntes.role,
420: empresaId: usuarioAntes.empresaId,
426: role: usuarioDepois.role,
428: empresaId: usuarioDepois.empresaId,
432: actorRole: actor.role,
433: targetRole: usuarioAntes.role,
449: UsuarioRolePolicy.assertAdminUserHasEmpresa(actor.role, actor.empresaId);
452: actor.role === Role.SUPER_ADMIN
456: role: {
457: not: Role.CLIENTE,
465: empresaId: actor.empresaId,
466: role: {
467: not: Role.CLIENTE,
484: UsuarioRolePolicy.assertCanManageUser(actor.role, usuario.role);
494: private resolverEmpresaIdParaCriacao(
498: if (actor.role === Role.SUPER_ADMIN) {
499: if (payload.role === Role.SUPER_ADMIN) {
503: return payload.empresaId ?? null;
506: if (payload.empresaId && payload.empresaId !== actor.empresaId) {
512: return actor.empresaId ?? null;
515: private resolverEmpresaIdParaAtualizacao(
517: empresaIdAtual: string | null,

### beauty-core-backend/src/shared/decorators/roles.decorator.ts
3: export const ROLES_KEY = 'roles';
5: export const Roles = (...roles: string[]) =>
6: SetMetadata(ROLES_KEY, roles);

### beauty-core-backend/src/shared/enums/role-mapper.ts
1: export function mapRole(role: string): string {
2: const roles: Record<string, string> = {
12: CLIENTE: 'CLIENTE',
15: return roles[role] || role;

### beauty-core-backend/src/shared/enums/role.enum.ts
1: export enum RoleSistema {
6: CLIENTE = 'CLIENTE',

### beauty-core-backend/src/shared/tenant/tenant-public.service.ts
134: empresaId: empresa.id,

### beauty-core-backend/src/shared/tenant/tenant-validator.service.ts
6: import { Role, StatusArquivo } from '@prisma/client';
14: async validarEmpresaAtiva(empresaId: string) {
15: this.validarIdObrigatorio(empresaId, 'empresaId');
19: id: empresaId,
38: async validarCliente(empresaId: string, clienteId: string) {
39: this.validarIdObrigatorio(empresaId, 'empresaId');
40: this.validarIdObrigatorio(clienteId, 'clienteId');
42: const cliente = await this.prisma.cliente.findFirst({
44: id: clienteId,
45: empresaId,
50: empresaId: true,
59: if (!cliente) {
61: 'Cliente não encontrado, inativo ou não pertence à empresa informada.',
65: return cliente;
68: async validarServico(empresaId: string, servicoId: string) {
69: this.validarIdObrigatorio(empresaId, 'empresaId');
75: empresaId,
80: empresaId: true,
95: async validarUnidade(empresaId: string, unidadeId: string) {
96: this.validarIdObrigatorio(empresaId, 'empresaId');
102: empresaId,
106: empresaId: true,
120: async validarUsuario(empresaId: string, usuarioId: string) {
121: this.validarIdObrigatorio(empresaId, 'empresaId');
122: this.validarIdObrigatorio(usuarioId, 'usuarioId');
126: id: usuarioId,
127: empresaId,
129: role: {
130: not: Role.CLIENTE,
135: empresaId: true,
139: role: true,
153: async validarProfissional(empresaId: string, profissionalId: string) {
154: this.validarIdObrigatorio(empresaId, 'empresaId');
160: empresaId,
162: role: Role.PROFISSIONAL,
166: empresaId: true,
170: role: true,
184: async validarAgendamento(empresaId: string, agendamentoId: string) {
185: this.validarIdObrigatorio(empresaId, 'empresaId');
191: empresaId,
195: empresaId: true,
196: clienteId: true,
215: async validarPacote(empresaId: string, pacoteId: string) {
216: this.validarIdObrigatorio(empresaId, 'empresaId');
222: empresaId,
227: empresaId: true,
242: async validarCupom(empresaId: string, cupomId: string) {
243: this.validarIdObrigatorio(empresaId, 'empresaId');
249: empresaId,
254: empresaId: true,
271: async validarArquivo(empresaId: string, arquivoId: string) {
272: this.validarIdObrigatorio(empresaId, 'empresaId');
278: empresaId,
285: empresaId: true,
286: clienteId: true,
287: usuarioId: true,
308: empresaId: string,
311: this.validarIdObrigatorio(empresaId, 'empresaId');
321: empresaId,
326: empresaId: true,

## Regra de implementação
Os próximos endpoints deverão derivar a identidade do token/sessão autenticada. O frontend não poderá escolher livremente clienteId, usuarioId ou empresaId.
