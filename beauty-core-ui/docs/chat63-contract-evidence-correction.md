## BACKEND — ARQUIVOS RELEVANTES

### beauty-core-backend/src/modules/analytics/dto/clientes-analytics.dto.ts
[NO_MATCHES]

### beauty-core-backend/src/modules/analytics/dto/notificacoes-analytics.dto.ts
[NO_MATCHES]

### beauty-core-backend/src/modules/analytics/dto/whatsapp-analytics.dto.ts
[NO_MATCHES]

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
55: @Get('me/perfil')
59: 'Retorna o perfil do cliente final autenticado pelo JWT Cliente. O clienteId é obtido diretamente do token, sem exposição na URL.',
62: description: 'Perfil do cliente autenticado retornado com sucesso.',
65: description: 'Token Cliente ausente, inválido ou expirado.',
68: description: 'Portal do cliente desativado.',
71: description: 'Cliente não encontrado no tenant autenticado.',
73: perfil(@Req() req: ClienteRequest) {
74: const { empresaId, clienteId } = this.getClienteAutenticado(req);
76: return this.areaClienteService.perfil(empresaId, clienteId);
79: @Patch('me/perfil')
83: 'Atualiza parcialmente o perfil do cliente final autenticado. Não permite alterar telefone nem observações internas.',
86: type: UpdatePerfilClienteDto,
88: 'Dados permitidos para atualização pelo cliente autenticado.',
97: description: 'Token Cliente ausente, inválido ou expirado.',
100: description: 'Portal do cliente desativado.',
103: description: 'Cliente não encontrado no tenant autenticado.',
105: updatePerfil(
106: @Req() req: ClienteRequest,
107: @Body() dto: UpdatePerfilClienteDto,
109: const { empresaId, clienteId } = this.getClienteAutenticado(req);
111: return this.areaClienteService.updatePerfil(
112: empresaId,
113: clienteId,
118: @Get('me/agendamentos')
120: summary: 'Listar meus agendamentos',
122: 'Lista os agendamentos do cliente autenticado, com paginação e filtro opcional por status.',
145: description: 'Token Cliente ausente, inválido ou expirado.',
148: @Req() req: ClienteRequest,
149: @Query() query: PaginationDto,
150: @Query('status') status?: string,
152: const { empresaId, clienteId } = this.getClienteAutenticado(req);
154: return this.areaClienteService.agendamentos(
155: empresaId,
156: clienteId,
162: @Get('me/proximos-agendamentos')
164: summary: 'Listar meus próximos agendamentos',
166: 'Retorna os próximos agendamentos futuros do cliente autenticado.',
171: proximosAgendamentos(@Req() req: ClienteRequest) {
172: const { empresaId, clienteId } = this.getClienteAutenticado(req);
174: return this.areaClienteService.proximosAgendamentos(
175: empresaId,
176: clienteId,
180: @Get('me/ultimo-agendamento')
184: 'Retorna o último agendamento passado do cliente autenticado.',
189: ultimoAgendamento(@Req() req: ClienteRequest) {
190: const { empresaId, clienteId } = this.getClienteAutenticado(req);
192: return this.areaClienteService.ultimoAgendamento(
193: empresaId,
194: clienteId,
198: @Get('me/fidelidade')
202: 'Retorna saldo, nível atual, próximo nível e benefícios disponíveis do cliente autenticado.',
207: fidelidade(@Req() req: ClienteRequest) {
208: const { empresaId, clienteId } = this.getClienteAutenticado(req);
210: return this.areaClienteService.fidelidade(empresaId, clienteId);
213: @Get('me/pontos')
215: summary: 'Listar minhas movimentações de pontos',
217: 'Lista o histórico de pontos de fidelidade do cliente autenticado.',
233: @Req() req: ClienteRequest,
234: @Query() query: PaginationDto,
236: const { empresaId, clienteId } = this.getClienteAutenticado(req);
238: return this.areaClienteService.pontos(
239: empresaId,
240: clienteId,
245: @Get('me/beneficios')
247: summary: 'Listar meus benefícios',
249: 'Retorna benefícios disponíveis e liberados para o cliente autenticado conforme seu saldo de pontos.',

### beauty-core-backend/src/modules/area-cliente/area-cliente.module.ts
4: import { TenantModule } from '../../shared/tenant';
6: import { AreaClienteController } from './area-cliente.controller';
7: import { AreaClienteService } from './area-cliente.service';
12: TenantModule,
16: AreaClienteController,
20: AreaClienteService,
24: AreaClienteService,
27: export class AreaClienteModule {}

### beauty-core-backend/src/modules/area-cliente/area-cliente.service.ts
10: StatusClientePacote,
17: import { TenantValidatorService } from '../../shared/tenant';
23: import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
26: export class AreaClienteService {
28: private readonly prisma: PrismaService,
29: private readonly tenantValidator: TenantValidatorService,
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
94: createdAt: 'desc',
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
126: async updatePerfil(
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
199: updatedAt: true,
205: empresaId: string,
206: clienteId: string,
210: await this.validarClientePortal(empresaId, clienteId);
223: empresaId,
224: clienteId,
231: this.prisma.agendamento.findMany({
257: async proximosAgendamentos(empresaId: string, clienteId: string) {
258: await this.validarClientePortal(empresaId, clienteId);
260: return this.prisma.agendamento.findMany({
262: empresaId,
263: clienteId,
293: async ultimoAgendamento(empresaId: string, clienteId: string) {
294: await this.validarClientePortal(empresaId, clienteId);
296: return this.prisma.agendamento.findFirst({
298: empresaId,
299: clienteId,
321: async fidelidade(empresaId: string, clienteId: string) {
322: await this.validarClientePortal(empresaId, clienteId);
334: clienteId_empresaId: {

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

### beauty-core-backend/src/modules/arquivos/arquivo-access-policy.service.ts
8: clienteId?: string;
9: empresaId?: string;
20: if (!user.empresaId) {
24: if (user.empresaId !== arquivo.empresaId) {
48: if (user.role === 'CLIENTE') {
49: const clienteId = user.clienteId || user.sub || user.id;
51: if (arquivo.clienteId && arquivo.clienteId === clienteId) {
56: 'Cliente não tem permissão para acessar este arquivo.',

### beauty-core-backend/src/modules/arquivos/arquivos-cleanup.service.ts
3: import { readdir, stat, unlink } from 'fs/promises';
12: updatedAt: string;
17: private readonly logger = new Logger(ArquivosCleanupService.name);
18: private readonly baseDir = resolve(
20: process.env.UPLOADS_DIR || 'uploads',
24: private readonly prisma: PrismaService,
25: private readonly localStorage: LocalStorageService,
28: async gerarRelatorioArquivosOrfaos(empresaId?: string) {
29: const arquivosBanco = await this.prisma.arquivo.findMany({
31: ...(empresaId ? { empresaId } : {}),
38: empresaId: true,
46: createdAt: true,
80: ...(await this.listarArquivosFisicos('public')),
81: ...(await this.listarArquivosFisicos('private')),
89: empresaId: empresaId ?? null,
104: const arquivosTemp = await this.listarArquivosFisicos('temp');
120: const idadeMs = agora - new Date(arquivo.updatedAt).getTime();
144: private async listarArquivosFisicos(
157: const entries = await readdir(dir, { withFileTypes: true });
177: updatedAt: info.mtime.toISOString(),

### beauty-core-backend/src/modules/arquivos/arquivos-download.controller.ts
18: import { JwtOrClienteAuthGuard } from './guards/jwt-or-cliente-auth.guard';
19: import { ArquivosDownloadService } from './arquivos-download.service';
22: @Controller('arquivos')
23: export class ArquivosDownloadController {
25: private readonly arquivosDownloadService: ArquivosDownloadService,
28: @Get('signed/:token')
30: summary: 'Download por URL assinada',
32: 'Realiza download por URL temporária assinada. Não exige JWT, mas exige token assinado válido e não expirado.',
41: async downloadPorSignedToken(@Param('token') token: string) {
43: await this.arquivosDownloadService.downloadPorSignedToken(token);
53: @Get(':id/download')
54: @UseGuards(JwtOrClienteAuthGuard)
57: summary: 'Download protegido de arquivo',
59: 'Realiza download após validar autenticação, empresa e permissão do usuário ou cliente.',
69: async downloadProtegido(
70: @Param('id', ParseUUIDPipe) id: string,
74: await this.arquivosDownloadService.downloadProtegido(id, req.user);
84: @Get(':id/signed-url')
85: @UseGuards(JwtOrClienteAuthGuard)
90: 'Gera uma URL temporária assinada para download. Validade padrão: 5 minutos.',
106: gerarSignedUrl(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
107: return this.arquivosDownloadService.gerarSignedUrl(id, req.user);

### beauty-core-backend/src/modules/arquivos/arquivos-download.service.ts
7: import { ReadStream } from 'fs';
19: clienteId?: string;
20: empresaId?: string;
24: interface DownloadResult {
26: stream: ReadStream;
30: export class ArquivosDownloadService {
32: private readonly prisma: PrismaService,
33: private readonly storageFactory: StorageFactory,
34: private readonly localStorage: LocalStorageService,
35: private readonly accessPolicy: ArquivoAccessPolicyService,
36: private readonly auditoriaService: AuditoriaService,
39: async downloadProtegido(
42: ): Promise<DownloadResult> {
43: if (!user?.empresaId) {
47: const arquivo = await this.prisma.arquivo.findFirst({
50: empresaId: user.empresaId,
63: await this.incrementarDownload(arquivo.id, arquivo.empresaId);
68: acao: 'DOWNLOAD_ARQUIVO' as AcaoAuditoria,
69: origem: 'download_protegido',
70: mensagem: 'Download protegido de arquivo realizado com sucesso.',
80: if (!user?.empresaId) {
84: const arquivo = await this.prisma.arquivo.findFirst({
87: empresaId: user.empresaId,
104: arquivo.empresaId,
119: async downloadPorSignedToken(token: string): Promise<DownloadResult> {
122: const arquivo = await this.prisma.arquivo.findFirst({
125: empresaId: payload.empresaId,
136: await this.incrementarDownload(arquivo.id, arquivo.empresaId);
140: acao: 'DOWNLOAD_ARQUIVO' as AcaoAuditoria,
141: origem: 'download_signed_url',
142: mensagem: 'Download por URL assinada realizado com sucesso.',
151: private async criarStreamComValidacao(arquivo: Arquivo): Promise<ReadStream> {
164: return storage.download(arquivo.caminho);
167: private async incrementarDownload(id: string, empresaId: string) {
168: await this.prisma.arquivo.updateMany({
171: empresaId,
174: downloadCount: {
177: ultimoDownloadEm: new Date(),
191: empresaId: params.arquivo.empresaId,
193: params.user?.role === 'CLIENTE'
196: clienteId:
197: params.user?.role === 'CLIENTE'
198: ? params.user?.clienteId || params.user?.sub || params.user?.id

### beauty-core-backend/src/modules/arquivos/arquivos.controller.ts
4: Delete,
11: UploadedFile,
12: UploadedFiles,
25: ApiCreatedResponse,
41: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
45: getUploadLimitBytes,
49: import { UploadDocumentoPrivadoDto } from './dto/upload-documento-privado.dto';
53: @Controller('arquivos')
54: @UseGuards(JwtAuthGuard, RolesGuard)
56: constructor(private readonly arquivosService: ArquivosService) {}
58: @Post('logo')
59: @Roles(Role.ADMIN, Role.GERENTE)
64: summary: 'Fazer upload da logo da empresa',
66: 'Realiza o upload da logo da empresa autenticada. Endpoint usado para personalização white-label, identidade visual e exibição da marca no painel, site ou aplicativo.',
83: @ApiCreatedResponse({
88: empresaId: '550e8400-e29b-41d4-a716-446655440000',
94: url: '/uploads/logos/logo-uuid.png',
95: createdAt: '2026-06-14T10:00:00.000Z',
109: uploadLogo(
111: @UploadedFile() file: Express.Multer.File,
113: return this.arquivosService.uploadLogo(
114: getEmpresaId(req),
119: @Post('clientes/:clienteId/foto')
120: @Roles(Role.ADMIN, Role.GERENTE, Role.RECEPCAO)
122: FileInterceptor('file', multerStorageOptions('clientes')),
125: summary: 'Fazer upload da foto do cliente',
127: 'Realiza o upload da foto de um cliente específico da empresa autenticada. Endpoint usado para perfil do cliente, painel administrativo e futura área/app do cliente.',
130: name: 'clienteId',
131: description: 'ID do cliente que receberá a foto.',
145: description: 'Imagem de perfil do cliente.',
150: @ApiCreatedResponse({
151: description: 'Foto do cliente enviada com sucesso.',
155: clienteId: '550e8400-e29b-41d4-a716-446655440000',
156: tipo: 'FOTO_CLIENTE',
157: url: '/uploads/clientes/cliente-uuid.png',
158: nomeOriginal: 'cliente.png',
165: description: 'clienteId inválido, arquivo inválido ou tipo não permitido.',
175: description: 'Cliente não encontrado para a empresa autenticada.',
177: uploadFotoCliente(
179: @Param('clienteId', ParseUUIDPipe) clienteId: string,
180: @UploadedFile() file: Express.Multer.File,
182: return this.arquivosService.uploadFotoCliente(
183: getEmpresaId(req),
184: clienteId,
189: @Post('usuarios/:usuarioId/foto')
190: @Roles(Role.ADMIN, Role.GERENTE, Role.PROFISSIONAL)
195: summary: 'Fazer upload da foto do usuário',
197: 'Realiza o upload da foto de um usuário da empresa autenticada. Endpoint usado para perfil de usuários administrativos, gerenciais ou profissionais.',
220: @ApiCreatedResponse({
227: url: '/uploads/usuarios/usuario-uuid.png',
247: uploadFotoUsuario(
249: @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
250: @UploadedFile() file: Express.Multer.File,
252: return this.arquivosService.uploadFotoUsuario(
253: getEmpresaId(req),
260: @Post('profissionais/:usuarioId/foto')
261: @Roles(Role.ADMIN, Role.GERENTE, Role.PROFISSIONAL)
266: summary: 'Fazer upload da foto do profissional',
268: 'Realiza o upload da foto de um profissional da empresa autenticada. Usa a mesma lógica de foto de usuário, com armazenamento separado para profissionais.',
291: @ApiCreatedResponse({
298: url: '/uploads/profissionais/profissional-uuid.png',
318: uploadFotoProfissional(
320: @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
321: @UploadedFile() file: Express.Multer.File,
323: return this.arquivosService.uploadFotoUsuario(
324: getEmpresaId(req),
331: @Post('servicos/:servicoId/imagem')
332: @Roles(Role.ADMIN, Role.GERENTE)
337: summary: 'Fazer upload da imagem do serviço',
339: 'Realiza o upload da imagem de um serviço da empresa autenticada. Endpoint usado para catálogo de serviços, site, landing page, painel e futura aplicação mobile.',
362: @ApiCreatedResponse({
369: url: '/uploads/servicos/servico-uuid.png',
388: uploadImagemServico(
390: @Param('servicoId', ParseUUIDPipe) servicoId: string,
391: @UploadedFile() file: Express.Multer.File,
393: return this.arquivosService.uploadImagemServico(
394: getEmpresaId(req),
400: @Post('galeria')
401: @Roles(Role.ADMIN, Role.GERENTE)
406: summary: 'Fazer upload de arquivos para a galeria',

### beauty-core-backend/src/modules/arquivos/arquivos.module.ts
4: import { TenantModule } from '../../shared/tenant';
13: import { ArquivosDownloadController } from './arquivos-download.controller';
14: import { ArquivosDownloadService } from './arquivos-download.service';
21: TenantModule,
27: ArquivosDownloadController,
34: ArquivosDownloadService,

### beauty-core-backend/src/modules/arquivos/arquivos.service.ts
12: import { TenantValidatorService } from '../../shared/tenant';
21: import { UploadDocumentoPrivadoDto } from './dto/upload-documento-privado.dto';
25: private readonly logger = new Logger(ArquivosService.name);
28: private readonly prisma: PrismaService,
29: private readonly storage: LocalStorageService,
30: private readonly auditoriaService: AuditoriaService,
31: private readonly tenantValidator: TenantValidatorService,
32: private readonly storageFactory: StorageFactory,
42: empresaId: string;
45: clienteId?: string;
52: empresaId: params.empresaId,
53: clienteId: params.clienteId,
69: empresaId: arquivo.empresaId,
70: clienteId: arquivo.clienteId,
79: createdAt: arquivo.createdAt,
80: updatedAt: arquivo.updatedAt,
84: private async registrarUploadArquivo(
89: await this.auditoriaService.registrarUpload({
90: empresaId: arquivo.empresaId,
92: clienteId: arquivo.clienteId ?? undefined,
105: async uploadLogo(empresaId: string, file: Express.Multer.File) {
108: await this.tenantValidator.validarEmpresaAtiva(empresaId);
112: const arquivo = await this.prisma.arquivo.create({
114: empresaId,
120: await this.prisma.empresa.update({
121: where: { id: empresaId },
128: `[ARQUIVOS] upload logo empresaId=${empresaId} arquivoId=${arquivo.id} status=SUCESSO tempoMs=${tempoMs}`,
131: await this.registrarUploadArquivo(
142: async uploadFotoCliente(
143: empresaId: string,
144: clienteId: string,
149: await this.tenantValidator.validarEmpresaAtiva(empresaId);
153: await this.tenantValidator.validarCliente(empresaId, clienteId);
155: const arquivo = await this.prisma.arquivo.create({
157: empresaId,
158: clienteId,
160: tipo: TipoArquivo.FOTO_CLIENTE,
164: await this.prisma.cliente.updateMany({
166: id: clienteId,
167: empresaId,
177: `[ARQUIVOS] upload foto cliente empresaId=${empresaId} arquivoId=${arquivo.id} clienteId=${clienteId} status=SUCESSO tempoMs=${tempoMs}`,
180: await this.registrarUploadArquivo(
182: 'Foto do cliente enviada com sucesso.',
189: async uploadFotoUsuario(
190: empresaId: string,
193: usuarioLogado: { sub?: string; id?: string; role: Role; empresaId: string },
197: await this.tenantValidator.validarEmpresaAtiva(empresaId);
201: const usuario = await this.tenantValidator.validarUsuario(
202: empresaId,
222: const arquivo = await this.prisma.arquivo.create({
224: empresaId,
231: await this.prisma.usuario.updateMany({
234: empresaId,
244: `[ARQUIVOS] upload foto usuario empresaId=${empresaId} arquivoId=${arquivo.id} usuarioId=${usuarioId} status=SUCESSO tempoMs=${tempoMs}`,
247: await this.auditoriaService.registrarUpload({
248: empresaId,
272: async uploadImagemServico(
273: empresaId: string,
279: await this.tenantValidator.validarEmpresaAtiva(empresaId);
283: const servico = await this.tenantValidator.validarServico(
284: empresaId,
288: const arquivo = await this.prisma.arquivo.create({
290: empresaId,
297: await this.prisma.servico.updateMany({
300: empresaId,
310: `[ARQUIVOS] upload imagem servico empresaId=${empresaId} arquivoId=${arquivo.id} servicoId=${servicoId} status=SUCESSO tempoMs=${tempoMs}`,
313: await this.auditoriaService.registrarUpload({
314: empresaId,
333: async uploadGaleria(empresaId: string, files: Express.Multer.File[]) {
336: await this.tenantValidator.validarEmpresaAtiva(empresaId);
344: this.prisma.arquivo.create({
346: empresaId,
357: `[ARQUIVOS] upload galeria empresaId=${empresaId} quantidade=${arquivos.length} status=SUCESSO tempoMs=${tempoMs}`,
360: await this.auditoriaService.registrarUpload({
361: empresaId,
382: async listarGaleria(
383: empresaId: string,
386: await this.tenantValidator.validarEmpresaAtiva(empresaId);
388: return this.buscarArquivosPaginados(empresaId, {
395: async uploadDocumento(empresaId: string, file: Express.Multer.File) {

### beauty-core-backend/src/modules/arquivos/dto/upload-documento-privado.dto.ts
4: export class UploadDocumentoPrivadoDto {
7: description: 'ID do cliente vinculado ao documento, quando aplicável.',
11: clienteId?: string;
14: example: 'Contrato assinado pelo cliente.',

### beauty-core-backend/src/modules/arquivos/guards/jwt-or-cliente-auth.guard.ts
5: export class JwtOrClienteAuthGuard extends AuthGuard(['jwt', 'cliente-jwt']) {}

### beauty-core-backend/src/modules/arquivos/storage/local-storage.service.ts
9: import { createHash, createHmac, randomUUID } from 'crypto';
10: import { createReadStream, ReadStream } from 'fs';
22: StorageUploadInput,
23: StorageUploadResult,
28: empresaId: string;
34: private readonly baseDir: string;
36: constructor(private readonly config: ConfigService) {
37: const uploadsDir = this.config.get<string>('UPLOADS_DIR') || 'uploads';
38: this.baseDir = resolve(process.cwd(), uploadsDir);
41: async upload(input: StorageUploadInput): Promise<StorageUploadResult> {
52: const checksum = this.createChecksum(input.file.buffer);
68: input.empresaId,
80: ? `/uploads/public/${input.empresaId}/${subdiretorioSeguro}/${nomeArquivo}`
94: async download(caminhoRelativo: string): Promise<ReadStream> {
103: return createReadStream(caminhoAbsoluto);
106: async delete(caminhoRelativo: string): Promise<void> {
116: 'deleted',
137: empresaId: string,
145: empresaId,
168: if (normalized.startsWith('uploads/public/')) {
173: return `/uploads/${normalized}`;
176: if (normalized.startsWith('uploads/')) {
180: return `/uploads/public/${normalized}`;
204: if (!data.arquivoId || !data.empresaId || !data.exp) {
215: private createChecksum(buffer: Buffer): string {
216: return createHash('sha256').update(buffer).digest('hex');
286: return createHmac('sha256', secret).update(payload).digest('base64url');

### beauty-core-backend/src/modules/arquivos/storage/multer.config.ts
39: function isDocumentUpload(pasta: string) {
44: if (isDocumentUpload(pasta)) {
70: if (isDocumentUpload(pasta)) {
94: const destino = join(process.cwd(), 'uploads', pasta);
178: export function getUploadLimitBytes(type: 'image' | 'document' = 'document') {
180: process.env.UPLOAD_MAX_IMAGE_MB || process.env.MAX_IMAGE_UPLOAD_MB || 5,
184: process.env.UPLOAD_MAX_DOCUMENT_MB || process.env.MAX_PDF_UPLOAD_MB || 10,

### beauty-core-backend/src/modules/arquivos/storage/providers/.gitkeep
[NO_MATCHES]

### beauty-core-backend/src/modules/arquivos/storage/storage.factory.ts
10: private readonly config: ConfigService,
11: private readonly localStorage: LocalStorageService,

### beauty-core-backend/src/modules/arquivos/storage/storage.interface.ts
1: import { ReadStream } from 'fs';
4: export interface StorageUploadInput {
6: empresaId: string;
12: export interface StorageUploadResult {
28: upload(input: StorageUploadInput): Promise<StorageUploadResult>;
30: download(caminhoRelativo: string): Promise<ReadStream>;
32: delete(caminhoRelativo: string): Promise<void>;
38: empresaId: string,

### beauty-core-backend/src/modules/auth-cliente/auth-cliente-publico.controller.ts
12: ApiCreatedResponse,
28: import { AuthClienteService } from './auth-cliente.service';
32: @ApiTags('Auth Cliente Público')
33: @Controller('public/:slug/auth-cliente')
34: export class AuthClientePublicoController {
36: private readonly authClienteService: AuthClienteService,
39: @Post('solicitar-codigo')
47: summary: 'Solicitar código OTP do cliente por tenant público',
49: 'Endpoint público tenant-aware para portal web, PWA e mobile. O tenant é resolvido pelo slug da URL. O frontend nunca envia empresaId.',
54: description: 'Slug público da empresa/tenant.',
57: description: 'Telefone do cliente. O slug vem pela URL.',
65: 'Telefone do cliente com DDD, usado para autenticação via OTP.',
71: @ApiCreatedResponse({
77: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
88: description: 'Telefone inválido ou tenant inválido.',
92: 'Empresa inativa/inexistente ou cliente não cadastrado no tenant resolvido.',
96: description: 'Acesso ao portal do cliente está desativado.',
105: @Param('slug') slug: string,
106: @Body() dto: SolicitarCodigoDto,
108: return this.authClienteService.solicitarCodigo(
123: @Post('verificar-codigo')
131: summary: 'Verificar código OTP do cliente por tenant público',
133: 'Valida o código OTP usando o slug público da URL e retorna JWT Cliente. O frontend nunca envia empresaId.',
138: description: 'Slug público da empresa/tenant.',
148: description: 'Telefone do cliente com DDD.',
153: description: 'Código OTP temporário do cliente.',
159: @ApiCreatedResponse({
160: description: 'Código validado com sucesso. JWT Cliente gerado.',
163: access_token: 'jwt.cliente.token.exemplo',
166: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
172: cliente: {
176: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
183: description: 'Telefone, código ou tenant inválido.',
190: 'Empresa inativa/inexistente ou cliente não encontrado no tenant resolvido.',
194: description: 'Acesso ao portal do cliente está desativado.',
203: @Param('slug') slug: string,
204: @Body() dto: VerificarCodigoDto,
206: return this.authClienteService.verificarCodigo(

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.controller.ts
1: import { LogoutClienteDto } from './dto/logout-cliente.dto';
2: import { RefreshClienteTokenDto } from './dto/refresh-cliente-token.dto';
18: ApiCreatedResponse,
34: import { AuthClienteService } from './auth-cliente.service';
38: import { ClienteAuthGuard } from './guards/cliente-auth.guard';
40: @ApiTags('Auth Cliente')
41: @Controller('auth-cliente')
42: export class AuthClienteController {
44: private readonly authClienteService: AuthClienteService,
47: @Post('solicitar-codigo')
55: summary: 'Solicitar cÃ³digo OTP do cliente',
57: 'Endpoint pÃºblico para gerar cÃ³digo de acesso temporÃ¡rio do cliente final. A empresa Ã© resolvida por slug ou domÃ­nio antes da geraÃ§Ã£o do OTP, sem expor empresaId ao cliente.',
61: 'Telefone do cliente e identificaÃ§Ã£o pÃºblica da empresa por slug ou domÃ­nio.',
69: 'Telefone do cliente com DDD, usado para autenticaÃ§Ã£o via OTP.',
87: @ApiCreatedResponse({
93: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
109: 'Empresa inativa/inexistente ou cliente nÃ£o cadastrado no tenant resolvido.',
113: description: 'Acesso ao portal do cliente estÃ¡ desativado.',
122: @Body() dto: SolicitarCodigoDto,
124: return this.authClienteService.solicitarCodigo(dto, {
132: @Post('verificar-codigo')
140: summary: 'Verificar cÃ³digo OTP do cliente',
142: 'Endpoint pÃºblico para validar o cÃ³digo OTP do cliente final e retornar um JWT Cliente. A empresa Ã© resolvida por slug ou domÃ­nio antes da validaÃ§Ã£o do cÃ³digo.',
153: description: 'Telefone do cliente com DDD.',
159: 'CÃ³digo OTP temporÃ¡rio enviado ou gerado para o cliente.',
177: @ApiCreatedResponse({
178: description: 'CÃ³digo validado com sucesso. JWT Cliente gerado.',
181: access_token: 'jwt.cliente.token.exemplo',
184: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
190: cliente: {
194: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
209: 'Empresa inativa/inexistente ou cliente nÃ£o encontrado no tenant resolvido.',
213: description: 'Acesso ao portal do cliente estÃ¡ desativado.',
222: @Body() dto: VerificarCodigoDto,
224: return this.authClienteService.verificarCodigo(dto, {
239: @Post('refresh')
241: summary: 'Renovar token do cliente',
243: 'Valida o refresh token Cliente, rotaciona a sessÃ£o e retorna novo access token e novo refresh token.',
246: type: RefreshClienteTokenDto,
249: description: 'Token do cliente renovado com sucesso.',
254: refresh(@Body() dto: RefreshClienteTokenDto) {
255: return this.authClienteService.refreshCliente(dto);
258: @UseGuards(ClienteAuthGuard)
259: @Post('logout')
262: summary: 'Logout da sessÃ£o atual do cliente',
265: type: LogoutClienteDto,
269: @Body() dto: LogoutClienteDto,
271: return this.authClienteService.logoutCliente(req.user, dto);
274: @UseGuards(ClienteAuthGuard)
275: @Post('logout-all')
278: summary: 'Encerrar todas as sessÃµes do cliente',
281: return this.authClienteService.logoutAllCliente(req.user);
284: @UseGuards(ClienteAuthGuard)
285: @Get('sessoes')
288: summary: 'Listar sessÃµes ativas do cliente',
291: return this.authClienteService.listarSessoesCliente(req.user);
294: @UseGuards(ClienteAuthGuard)
295: @Get('me')
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
331: @Post('aceitar-termos')
334: summary: 'Aceitar termos de uso do cliente',
336: 'Registra o aceite dos termos pelo cliente final autenticado. ApÃ³s este processo, o cliente deixa de estar em primeiro acesso e pode acessar normalmente o portal/app.',
347: 'Confirma se o cliente aceitou os termos de uso.',
360: empresaId: '112edaa6-4b46-416e-b090-c0c3e8be98f6',
370: description: 'Token Cliente ausente, invÃ¡lido ou expirado.',
373: description: 'Cliente autenticado nÃ£o encontrado.',
377: @Body() dto: AceitarTermosDto,
379: return this.authClienteService.aceitarTermos(
380: req.user.clienteId ?? req.user.sub,
381: req.user.empresaId,

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.module.ts
8: import { TenantModule } from '../../shared/tenant';
12: import { AuthClienteController } from './auth-cliente.controller';
13: import { AuthClientePublicoController } from './auth-cliente-publico.controller';
14: import { AuthClienteService } from './auth-cliente.service';
15: import { ClienteJwtStrategy } from './strategies/cliente-jwt.strategy';
21: TenantModule,
37: AuthClienteController,
38: AuthClientePublicoController,
42: AuthClienteService,
43: ClienteJwtStrategy,
47: AuthClienteService,
50: export class AuthClienteModule {}

### beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts
1: import { LogoutClienteDto } from './dto/logout-cliente.dto';
2: import { RefreshClienteTokenDto } from './dto/refresh-cliente-token.dto';
6: import { createHmac, randomInt, randomUUID, timingSafeEqual } from 'crypto';
26: import { TenantPublicService } from '../../shared/tenant';
41: type TenantPublicoInput = {
47: export class AuthClienteService {
48: private readonly logger = new Logger(AuthClienteService.name);
51: private readonly prisma: PrismaService,
52: private readonly jwtService: JwtService,
53: private readonly auditoriaService: AuditoriaService,
54: private readonly tenantPublicService: TenantPublicService,
55: private readonly configService: ConfigService,
56: private readonly sessoesService: SessoesService,
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
172: return createHmac('sha256', this.obterOtpSecret())
173: .update([empresaId, telefone, codigo].join(':'))
180: empresaId: string,
184: this.gerarCodigoHash(codigoInformado, empresaId, telefone),
199: private async resolverTenantPublico(dto: TenantPublicoInput) {
215: return this.tenantPublicService.resolverTenantPublico({
227: const tenant = await this.resolverTenantPublico(dto);
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
266: tenant: {
275: 'Cliente ainda nÃ£o estÃ¡ cadastrado.',
279: if (!cliente.ativoPortal) {
283: `[AUTH_CLIENTE] solicitar codigo portal desativado empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,
287: empresaId,
288: clienteId: cliente.id,
289: tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
291: modulo: 'AUTH_CLIENTE',
299: telefone: cliente.telefone,
300: tenant: {
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
49: 'Slug pÃºblico da empresa. Usado para resolver o tenant antes de validar o cÃ³digo OTP.',
69: 'DomÃ­nio pÃºblico da empresa. Alternativa ao slug para resolver o tenant antes de validar o cÃ³digo OTP.',

### beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts
5: export class ClienteAuthGuard extends AuthGuard('cliente-jwt') {}

### beauty-core-backend/src/modules/auth-cliente/strategies/cliente-jwt.strategy.ts
10: type ClienteJwtPayload = {
12: clienteId?: string;
14: role?: Role | 'CLIENTE';
15: empresaId?: string;
23: export class ClienteJwtStrategy extends PassportStrategy(
25: 'cliente-jwt',
28: private readonly configService: ConfigService,
29: private readonly prisma: PrismaService,
30: private readonly sessoesService: SessoesService,
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
4: Delete,
18: ApiCreatedResponse,
41: @Controller('auth')
44: private readonly authService: AuthService,
47: @Post('login')
79: @ApiCreatedResponse({
91: empresaId: '550e8400-e29b-41d4-a716-446655440000',
107: @Body() loginDto: LoginDto,
124: @Post('refresh')
146: refresh(@Body() dto: RefreshTokenDto) {
150: @Post('logout')
151: @UseGuards(JwtAuthGuard)
171: @Body() dto: LogoutDto,
176: @Post('logout-all')
177: @UseGuards(JwtAuthGuard)
197: @Get('sessoes')
198: @UseGuards(JwtAuthGuard)
201: summary: 'Listar sessões administrativas ativas',
203: 'Lista os dispositivos/sessões ativas do usuário administrativo autenticado sem expor hashes ou tokens.',
217: createdAt: '2026-06-18T18:00:00.000Z',
223: return this.authService.listarSessoes(req.user);
226: @Delete('sessoes/:sessaoId')
227: @UseGuards(JwtAuthGuard)
248: @Param('sessaoId') sessaoId: string,
253: @Get('me')
254: @UseGuards(JwtAuthGuard)
268: empresaId: '550e8400-e29b-41d4-a716-446655440000',

### beauty-core-backend/src/modules/auth/auth.module.ts
[NO_MATCHES]

### beauty-core-backend/src/modules/auth/auth.service.ts
41: private readonly logger = new Logger(AuthService.name);
44: private readonly prisma: PrismaService,
45: private readonly jwtService: JwtService,
46: private readonly configService: ConfigService,
47: private readonly auditoriaService: AuditoriaService,
48: private readonly sessoesService: SessoesService,
56: empresaId?: string | null;
62: empresaId: params.empresaId ?? undefined,
84: empresaId: string | null;
92: empresaId: usuario.empresaId,
110: empresaId: string | null;
117: empresaId: usuario.empresaId,
141: `[AUTH] login admin falhou empresaId=- usuarioId=- status=FALHA tempoMs=${tempoMs}`,
165: `[AUTH] login admin usuário inativo empresaId=${usuario.empresaId} usuarioId=${usuario.id} status=FALHA tempoMs=${tempoMs}`,
169: empresaId: usuario.empresaId,
194: `[AUTH] login admin senha inválida empresaId=${usuario.empresaId} usuarioId=${usuario.id} status=FALHA tempoMs=${tempoMs}`,
198: empresaId: usuario.empresaId,
228: empresaId: usuario.empresaId,
230: clienteId: null,
242: await this.prisma.usuario.update({
254: `[AUTH] login admin sucesso empresaId=${usuario.empresaId} usuarioId=${usuario.id} sessaoId=${sessaoId} status=SUCESSO tempoMs=${tempoMs}`,
258: empresaId: usuario.empresaId,
311: const sessao = await this.prisma.sessao.findFirst({
315: clienteId: null,
336: await this.prisma.sessao.updateMany({
340: clienteId: null,
356: if (usuario.empresaId && (!usuario.empresa || !usuario.empresa.ativo)) {
377: empresaId: usuario.empresaId,
404: const sessao = await this.prisma.sessao.findFirst({
408: clienteId: null,
432: empresaId: usuarioLogado?.empresaId,
456: empresaId: usuarioLogado?.empresaId,
473: async listarSessoes(usuarioLogado: any) {
480: return this.sessoesService.listarSessoesAdmin(usuarioId);
490: const sessao = await this.prisma.sessao.findFirst({
494: clienteId: null,
505: empresaId: usuarioLogado?.empresaId,

### beauty-core-backend/src/modules/auth/dto/login.dto.ts
[NO_MATCHES]

### beauty-core-backend/src/modules/auth/dto/logout.dto.ts
[NO_MATCHES]

### beauty-core-backend/src/modules/auth/dto/refresh-token.dto.ts
[NO_MATCHES]

### beauty-core-backend/src/modules/auth/guards/jwt-auth.guard.ts
[NO_MATCHES]

### beauty-core-backend/src/modules/auth/guards/roles.guard.ts
12: constructor(private readonly reflector: Reflector) {}

### beauty-core-backend/src/modules/auth/strategies/jwt.strategy.ts
14: empresaId?: string | null;
24: private readonly configService: ConfigService,
25: private readonly prisma: PrismaService,
26: private readonly sessoesService: SessoesService,
57: empresaId: true,
79: if (usuario.role === Role.CLIENTE) {
91: if (usuario.empresaId) {
102: empresaId: null,
118: if (!usuario.empresaId) {
137: empresaId: usuario.empresaId,

### beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.controller.ts
17: ApiCreatedResponse,
31: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
35: import { CreateCampanhaWhatsAppDto } from './dto/create-campanha-whatsapp.dto';
36: import { UpdateCampanhaWhatsAppDto } from './dto/update-campanha-whatsapp.dto';
40: @Controller('campanhas-whatsapp')
41: @UseGuards(JwtAuthGuard, RolesGuard)
44: private readonly campanhasWhatsappService: CampanhasWhatsappService,
47: @Post()
48: @Roles('ADMIN', 'GERENTE')
55: type: CreateCampanhaWhatsAppDto,
58: @ApiCreatedResponse({
63: empresaId: '550e8400-e29b-41d4-a716-446655440000',
65: descricao: 'Campanha para clientes que não agendam há mais de 30 dias.',
70: createdAt: '2026-06-14T09:00:00.000Z',
71: updatedAt: '2026-06-14T09:00:00.000Z',
84: create(
86: @Body() dto: CreateCampanhaWhatsAppDto,
88: return this.campanhasWhatsappService.create(
89: getEmpresaId(req),
94: @Get()
95: @Roles('ADMIN', 'GERENTE')
97: summary: 'Listar campanhas de WhatsApp',
99: 'Lista as campanhas de WhatsApp cadastradas para a empresa autenticada. Endpoint administrativo para acompanhamento de campanhas, status e histórico de criação.',
107: empresaId: '550e8400-e29b-41d4-a716-446655440000',
109: descricao: 'Campanha para clientes que não agendam há mais de 30 dias.',
114: createdAt: '2026-06-14T09:00:00.000Z',
115: updatedAt: '2026-06-14T09:00:00.000Z',
128: getEmpresaId(req),
132: @Get(':id')
133: @Roles('ADMIN', 'GERENTE')
150: empresaId: '550e8400-e29b-41d4-a716-446655440000',
152: descricao: 'Campanha para clientes que não agendam há mais de 30 dias.',
157: createdAt: '2026-06-14T09:00:00.000Z',
158: updatedAt: '2026-06-14T09:00:00.000Z',
176: @Param('id', ParseUUIDPipe) id: string,
179: getEmpresaId(req),
184: @Patch(':id')
185: @Roles('ADMIN', 'GERENTE')
198: type: UpdateCampanhaWhatsAppDto,
206: empresaId: '550e8400-e29b-41d4-a716-446655440000',
208: descricao: 'Campanha atualizada para clientes inativos.',
213: createdAt: '2026-06-14T09:00:00.000Z',
214: updatedAt: '2026-06-14T11:00:00.000Z',
230: update(
232: @Param('id', ParseUUIDPipe) id: string,
233: @Body() dto: UpdateCampanhaWhatsAppDto,
235: return this.campanhasWhatsappService.update(
236: getEmpresaId(req),
242: @Patch(':id/cancelar')
243: @Roles('ADMIN', 'GERENTE')
260: empresaId: '550e8400-e29b-41d4-a716-446655440000',
263: updatedAt: '2026-06-14T11:30:00.000Z',
281: @Param('id', ParseUUIDPipe) id: string,
284: getEmpresaId(req),

### beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.module.ts
4: import { TenantModule } from '../../shared/tenant';
16: TenantModule,

### beauty-core-backend/src/modules/campanhas-whatsapp/campanhas-whatsapp.service.ts
13: import { TenantValidatorService } from '../../shared/tenant';
17: import { CreateCampanhaWhatsAppDto } from './dto/create-campanha-whatsapp.dto';
18: import { UpdateCampanhaWhatsAppDto } from './dto/update-campanha-whatsapp.dto';
24: private readonly logger = new Logger(CampanhasWhatsappService.name);
27: private readonly prisma: PrismaService,
28: private readonly queuesService: QueuesService,
29: private readonly auditoriaService: AuditoriaService,
30: private readonly tenantValidator: TenantValidatorService,
33: async create(
34: empresaId: string,
35: dto: CreateCampanhaWhatsAppDto,
39: await this.tenantValidator.validarEmpresaAtiva(empresaId);
45: await this.prisma.campanhaWhatsApp.create({
47: empresaId,
62: empresaId,
70: `[CAMPANHAS_WHATSAPP] campanha criada empresaId=${empresaId} campanhaId=${campanha.id} status=SUCESSO tempoMs=${tempoMs}`,
74: empresaId,
97: async findAll(empresaId: string) {
98: await this.tenantValidator.validarEmpresaAtiva(empresaId);
100: return this.prisma.campanhaWhatsApp.findMany({
102: empresaId,
105: createdAt: 'desc',
111: empresaId: string,
114: await this.tenantValidator.validarEmpresaAtiva(empresaId);
116: return this.buscarCampanhaOuFalhar(empresaId, id);
119: async update(
120: empresaId: string,
122: dto: UpdateCampanhaWhatsAppDto,
126: await this.tenantValidator.validarEmpresaAtiva(empresaId);
129: empresaId,
134: await this.prisma.campanhaWhatsApp.updateMany({
137: empresaId,
149: empresaId,
156: `[CAMPANHAS_WHATSAPP] campanha atualizada empresaId=${empresaId} campanhaId=${id} status=SUCESSO tempoMs=${tempoMs}`,
160: empresaId,
177: empresaId: string,
182: await this.tenantValidator.validarEmpresaAtiva(empresaId);
185: empresaId,
190: await this.prisma.campanhaWhatsApp.updateMany({
193: empresaId,
207: empresaId,
214: `[CAMPANHAS_WHATSAPP] campanha cancelada empresaId=${empresaId} campanhaId=${id} status=SUCESSO tempoMs=${tempoMs}`,
218: empresaId,
237: empresaId: string,
241: await this.prisma.campanhaWhatsApp.findFirst({
244: empresaId,
260: empresaId: campanha.empresaId,
268: createdAt: campanha.createdAt,
269: updatedAt: campanha.updatedAt,

### beauty-core-backend/src/modules/campanhas-whatsapp/dto/create-campanha-whatsapp.dto.ts
16: export class CreateCampanhaWhatsAppDto {
31: example: 'Campanha para clientes que não agendam há mais de 30 dias.',

### beauty-core-backend/src/modules/campanhas-whatsapp/dto/update-campanha-whatsapp.dto.ts
3: import { CreateCampanhaWhatsAppDto } from './create-campanha-whatsapp.dto';
5: export class UpdateCampanhaWhatsAppDto extends PartialType(
6: CreateCampanhaWhatsAppDto,

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
45: @Get('me')
46: @ApiOperation({ summary: 'Retorna o perfil público do cliente logado.' })
47: me(@Req() req: ClienteRequest) {
48: return this.clienteAreaService.me(this.getAuth(req));
51: @Get('me/dashboard')
52: @ApiOperation({ summary: 'Retorna o dashboard mobile do cliente logado.' })
53: dashboard(@Req() req: ClienteRequest) {
54: return this.clienteAreaService.dashboard(this.getAuth(req));
57: @Get('me/agendamentos')
58: @ApiOperation({ summary: 'Lista os agendamentos do cliente logado.' })
60: @Req() req: ClienteRequest,
61: @Query() query: ClienteAreaQueryDto,
63: return this.clienteAreaService.agendamentos(this.getAuth(req), query);
66: @Get('me/proximos-agendamentos')
67: @ApiOperation({ summary: 'Lista os próximos agendamentos do cliente logado.' })
69: @Req() req: ClienteRequest,
70: @Query() query: ClienteAreaQueryDto,
72: return this.clienteAreaService.proximosAgendamentos(
78: @Get('me/ultimo-agendamento')
79: @ApiOperation({ summary: 'Retorna o último agendamento do cliente logado.' })
80: ultimoAgendamento(@Req() req: ClienteRequest) {
81: return this.clienteAreaService.ultimoAgendamento(this.getAuth(req));
84: @Get('me/fidelidade')
85: @ApiOperation({ summary: 'Retorna o resumo de fidelidade do cliente logado.' })
86: fidelidade(@Req() req: ClienteRequest) {
87: return this.clienteAreaService.fidelidade(this.getAuth(req));
90: @Get('me/pontos')
91: @ApiOperation({ summary: 'Lista o histórico de pontos do cliente logado.' })
93: @Req() req: ClienteRequest,
94: @Query() query: ClienteAreaQueryDto,
96: return this.clienteAreaService.pontos(this.getAuth(req), query);
99: @Get('me/beneficios')
100: @ApiOperation({ summary: 'Lista os benefícios disponíveis para o cliente.' })
101: beneficios(@Req() req: ClienteRequest) {
102: return this.clienteAreaService.beneficios(this.getAuth(req));
105: @Get('me/pacotes')
106: @ApiOperation({ summary: 'Lista os pacotes do cliente separados por status.' })
107: pacotes(@Req() req: ClienteRequest) {
108: return this.clienteAreaService.pacotes(this.getAuth(req));
111: @Get('me/pacotes/:pacoteId')
112: @ApiOperation({ summary: 'Retorna os detalhes de um pacote do cliente.' })
114: @Req() req: ClienteRequest,
115: @Param('pacoteId') pacoteId: string,
117: return this.clienteAreaService.pacoteDetalhes(
123: @Get('me/notificacoes')
124: @ApiOperation({ summary: 'Lista as notificações do cliente logado.' })
126: @Req() req: ClienteRequest,
127: @Query() query: ClienteAreaQueryDto,
129: return this.clienteAreaService.notificacoes(this.getAuth(req), query);
132: @Get('me/notificacoes/nao-lidas')
133: @ApiOperation({ summary: 'Lista as notificações não lidas do cliente.' })
134: notificacoesNaoLidas(@Req() req: ClienteRequest) {
135: return this.clienteAreaService.notificacoesNaoLidas(this.getAuth(req));
138: @Patch('me/notificacoes/:id/lida')
139: @ApiOperation({ summary: 'Marca uma notificação do cliente como lida.' })
141: @Req() req: ClienteRequest,
142: @Param('id') id: string,
144: return this.clienteAreaService.marcarNotificacaoComoLida(
150: @Get('me/mensagens-whatsapp')
151: @ApiOperation({ summary: 'Lista o histórico de mensagens WhatsApp do cliente.' })
153: @Req() req: ClienteRequest,

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
18: constructor(private readonly prisma: PrismaService) {}
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
146: this.prisma.agendamento.findMany({
148: empresaId: safeAuth.empresaId,
149: clienteId: safeAuth.clienteId,
164: empresaId: safeAuth.empresaId,
165: clienteId: safeAuth.clienteId,
182: async proximosAgendamentos(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
183: await this.buscarClienteSeguro(auth);
190: this.prisma.agendamento.findMany({
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
261: this.prisma.movimentacaoPontos.findMany({
263: empresaId: safeAuth.empresaId,
264: clienteId: safeAuth.clienteId,
267: createdAt: 'desc',
274: empresaId: safeAuth.empresaId,
275: clienteId: safeAuth.clienteId,
286: orderBy: 'createdAt',
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
354: this.prisma.notificacao.findMany({
356: empresaId: safeAuth.empresaId,
357: clienteId: safeAuth.clienteId,
360: createdAt: 'desc',
367: empresaId: safeAuth.empresaId,
368: clienteId: safeAuth.clienteId,
379: orderBy: 'createdAt',
385: async notificacoesNaoLidas(auth: ClienteAreaAuth) {
386: await this.buscarClienteSeguro(auth);
398: async marcarNotificacaoComoLida(auth: ClienteAreaAuth, id: string) {
399: await this.buscarClienteSeguro(auth);
403: const notificacao = await this.prisma.notificacao.findFirst({
406: empresaId: safeAuth.empresaId,
407: clienteId: safeAuth.clienteId,
413: 'Notificação não encontrada para este cliente.',
417: const atualizada = await this.prisma.notificacao.update({
432: async mensagensWhatsapp(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {

### beauty-core-backend/src/modules/cliente-area/dto/cliente-area-query.dto.ts
5: export class ClienteAreaQueryDto {
8: description: 'Página atual da listagem.',
28: example: 'createdAt',
33: orderBy?: string = 'createdAt';

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.spec.ts
2: import { ClientesPacotesController } from './clientes-pacotes.controller';
4: describe('ClientesPacotesController', () => {
5: let controller: ClientesPacotesController;
8: const module: TestingModule = await Test.createTestingModule({
9: controllers: [ClientesPacotesController],
12: controller = module.get<ClientesPacotesController>(ClientesPacotesController);

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.controller.ts
17: ApiCreatedResponse,
27: import { ClientesPacotesService } from './clientes-pacotes.service';
28: import { CreateClientePacoteDto } from './dto/create-cliente-pacote.dto';
33: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
35: @ApiTags('Clientes Pacotes')
37: @Controller('clientes-pacotes')
38: @UseGuards(JwtAuthGuard, RolesGuard)
39: export class ClientesPacotesController {
41: private readonly clientesPacotesService: ClientesPacotesService,
44: @Post()
45: @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
47: summary: 'Vincular pacote ao cliente',
49: 'Vincula um pacote a um cliente da empresa autenticada. Endpoint usado pelo painel administrativo para venda, liberação ou associação de pacotes de sessões a clientes.',
52: type: CreateClientePacoteDto,
53: description: 'Dados necessários para vincular um pacote a um cliente.',
55: @ApiCreatedResponse({
56: description: 'Pacote vinculado ao cliente com sucesso.',
60: empresaId: '550e8400-e29b-41d4-a716-446655440000',
61: clienteId: '550e8400-e29b-41d4-a716-446655440000',
70: createdAt: '2026-06-14T10:00:00.000Z',
71: updatedAt: '2026-06-14T10:00:00.000Z',
85: create(
87: @Body() dto: CreateClientePacoteDto,
89: return this.clientesPacotesService.create(
90: getEmpresaId(req),
95: @Get()
96: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
98: summary: 'Listar pacotes de clientes',
100: 'Lista todos os pacotes vinculados a clientes da empresa autenticada. Endpoint usado para acompanhamento operacional, controle de sessões e gestão de pacotes ativos ou cancelados.',
103: description: 'Pacotes de clientes retornados com sucesso.',
108: empresaId: '550e8400-e29b-41d4-a716-446655440000',
109: clienteId: '550e8400-e29b-41d4-a716-446655440000',
118: createdAt: '2026-06-14T10:00:00.000Z',
119: updatedAt: '2026-06-14T11:00:00.000Z',
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
166: createdAt: '2026-06-14T10:00:00.000Z',
167: updatedAt: '2026-06-14T11:00:00.000Z',
173: description: 'clienteId inválido. O parâmetro deve ser um UUID válido.',
183: description: 'Cliente não encontrado para a empresa autenticada.',
185: findByCliente(
187: @Param('clienteId', ParseUUIDPipe) clienteId: string,
189: return this.clientesPacotesService.findByCliente(
190: getEmpresaId(req),
191: clienteId,
195: @Patch(':id/usar-sessao')
196: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
200: 'Registra o uso de uma sessão de um pacote vinculado a cliente. Endpoint usado no atendimento para controlar sessões utilizadas e restantes.',
204: description: 'ID do pacote vinculado ao cliente.',
213: empresaId: '550e8400-e29b-41d4-a716-446655440000',
214: clienteId: '550e8400-e29b-41d4-a716-446655440000',
220: updatedAt: '2026-06-14T11:30:00.000Z',
236: description: 'Pacote do cliente não encontrado para a empresa autenticada.',
240: @Param('id', ParseUUIDPipe) id: string,
242: return this.clientesPacotesService.usarSessao(
243: getEmpresaId(req),
248: @Patch(':id/cancelar')
249: @Roles('ADMIN', 'GERENTE')
251: summary: 'Cancelar pacote do cliente',
253: 'Cancela um pacote vinculado a cliente da empresa autenticada. Endpoint administrativo usado para interromper uso futuro sem remover o histórico.',
257: description: 'ID do pacote vinculado ao cliente que será cancelado.',
262: description: 'Pacote do cliente cancelado com sucesso.',
266: empresaId: '550e8400-e29b-41d4-a716-446655440000',
267: clienteId: '550e8400-e29b-41d4-a716-446655440000',
273: updatedAt: '2026-06-14T12:00:00.000Z',
287: description: 'Pacote do cliente não encontrado para a empresa autenticada.',
291: @Param('id', ParseUUIDPipe) id: string,
293: return this.clientesPacotesService.cancelar(
294: getEmpresaId(req),

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.module.ts
4: import { TenantModule } from '../../shared/tenant';
9: import { ClientesPacotesController } from './clientes-pacotes.controller';
10: import { ClientesPacotesService } from './clientes-pacotes.service';
15: TenantModule,
20: controllers: [ClientesPacotesController],
22: providers: [ClientesPacotesService],
24: exports: [ClientesPacotesService],
26: export class ClientesPacotesModule {}

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.spec.ts
2: import { ClientesPacotesService } from './clientes-pacotes.service';
4: describe('ClientesPacotesService', () => {
5: let service: ClientesPacotesService;
8: const module: TestingModule = await Test.createTestingModule({
9: providers: [ClientesPacotesService],
12: service = module.get<ClientesPacotesService>(ClientesPacotesService);

### beauty-core-backend/src/modules/clientes-pacotes/clientes-pacotes.service.ts
9: StatusClientePacote,
14: import { TenantValidatorService } from '../../shared/tenant';
16: import { CreateClientePacoteDto } from './dto/create-cliente-pacote.dto';
23: export class ClientesPacotesService {
24: private readonly logger = new Logger(ClientesPacotesService.name);
27: private readonly prisma: PrismaService,
28: private readonly automacoesService: AutomacoesService,
29: private readonly auditoriaService: AuditoriaService,
30: private readonly tenantValidator: TenantValidatorService,
33: async create(empresaId: string, dto: CreateClientePacoteDto) {
36: await this.tenantValidator.validarEmpresaAtiva(empresaId);
38: await this.tenantValidator.validarCliente(
39: empresaId,
40: dto.clienteId,
43: const pacote = await this.prisma.pacote.findFirst({
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
155: createdAt: 'desc',
160: async findByCliente(empresaId: string, clienteId: string) {
161: await this.tenantValidator.validarEmpresaAtiva(empresaId);
163: await this.tenantValidator.validarCliente(
164: empresaId,
165: clienteId,
168: return this.prisma.clientePacote.findMany({
170: empresaId,
171: clienteId,
174: cliente: true,
178: createdAt: 'desc',
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

### beauty-core-backend/src/modules/clientes-pacotes/dto/create-cliente-pacote.dto.ts
5: export class CreateClientePacoteDto {
10: 'ID do cliente que receberá o pacote. Deve pertencer à empresa autenticada.',
13: message: 'O clienteId deve ser um UUID válido.',
15: clienteId: string;
21: 'ID do pacote que será vinculado ao cliente. Deve pertencer à empresa autenticada.',

### beauty-core-backend/src/modules/clientes-pacotes/dto/usar-sessao.dto.ts
[NO_MATCHES]

### beauty-core-backend/src/modules/clientes/clientes.controller.ts
18: ApiCreatedResponse,
31: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
35: import { ClientesService } from './clientes.service';
36: import { CreateClienteDto } from './dto/create-cliente.dto';
37: import { UpdateClienteDto } from './dto/update-cliente.dto';
39: @ApiTags('Clientes')
41: @Controller('clientes')
42: @UseGuards(JwtAuthGuard, RolesGuard)
43: export class ClientesController {
44: constructor(private readonly clientesService: ClientesService) {}
46: @Post()
47: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
49: summary: 'Criar cliente',
51: 'Cria um cliente para a empresa autenticada. Endpoint usado pelo painel administrativo para cadastrar clientes vinculados ao contexto multiempresa do usuário logado.',
54: type: CreateClienteDto,
55: description: 'Dados necessários para criação de um cliente.',
57: @ApiCreatedResponse({
58: description: 'Cliente criado com sucesso.',
62: empresaId: '550e8400-e29b-41d4-a716-446655440000',
67: fotoUrl: '/uploads/clientes/maria-silva.png',
68: observacoes: 'Cliente prefere atendimento no período da tarde.',
74: createdAt: '2026-06-14T10:00:00.000Z',
75: updatedAt: '2026-06-14T10:00:00.000Z',
89: create(
90: @Body() createClienteDto: CreateClienteDto,
93: return this.clientesService.create(
94: createClienteDto,
95: getEmpresaId(req),
99: @Get()
100: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
102: summary: 'Listar clientes',
104: 'Lista os clientes da empresa autenticada com suporte a paginação. Endpoint preparado para painel administrativo, dashboard, busca mobile e integrações internas.',
110: description: 'Número da página da listagem.',
119: description: 'Clientes retornados com sucesso.',
125: empresaId: '550e8400-e29b-41d4-a716-446655440000',
130: fotoUrl: '/uploads/clientes/maria-silva.png',
131: observacoes: 'Cliente prefere atendimento no período da tarde.',
137: createdAt: '2026-06-14T10:00:00.000Z',
138: updatedAt: '2026-06-14T10:00:00.000Z',
159: @Query() query: PaginationDto,
161: return this.clientesService.findAll(
162: getEmpresaId(req),
167: @Get(':id')
168: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
170: summary: 'Buscar cliente por ID',
172: 'Busca um cliente específico pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
176: description: 'ID do cliente.',
181: description: 'Cliente encontrado com sucesso.',
185: empresaId: '550e8400-e29b-41d4-a716-446655440000',
190: fotoUrl: '/uploads/clientes/maria-silva.png',
191: observacoes: 'Cliente prefere atendimento no período da tarde.',
197: createdAt: '2026-06-14T10:00:00.000Z',
198: updatedAt: '2026-06-14T10:00:00.000Z',
213: description: 'Cliente não encontrado para a empresa autenticada.',
216: @Param('id', ParseUUIDPipe) id: string,
219: return this.clientesService.findOne(
221: getEmpresaId(req),
225: @Patch(':id')
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
259: createdAt: '2026-06-14T10:00:00.000Z',
260: updatedAt: '2026-06-14T11:00:00.000Z',
275: description: 'Cliente não encontrado para a empresa autenticada.',
277: update(
278: @Param('id', ParseUUIDPipe) id: string,
279: @Body() updateClienteDto: UpdateClienteDto,
282: return this.clientesService.update(
284: updateClienteDto,
285: getEmpresaId(req),
289: @Patch(':id/inativar')
290: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
292: summary: 'Inativar cliente',

### beauty-core-backend/src/modules/clientes/clientes.module.ts
3: import { ClientesService } from './clientes.service';
4: import { ClientesController } from './clientes.controller';
7: import { TenantModule } from '../../shared/tenant';
15: TenantModule,
20: controllers: [ClientesController],
22: providers: [ClientesService],
24: exports: [ClientesService],
26: export class ClientesModule {}

### beauty-core-backend/src/modules/clientes/clientes.service.ts
13: import { TenantValidatorService } from '../../shared/tenant';
19: import { CreateClienteDto } from './dto/create-cliente.dto';
20: import { UpdateClienteDto } from './dto/update-cliente.dto';
27: export class ClientesService {
28: private readonly logger = new Logger(ClientesService.name);
31: private readonly prisma: PrismaService,
32: private readonly automacoesService: AutomacoesService,
33: private readonly auditoriaService: AuditoriaService,
34: private readonly tenantValidator: TenantValidatorService,
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
88: tipo: TipoEventoSistema.CLIENTE_CADASTRADO,
89: modulo: 'CLIENTES',
90: titulo: 'Novo cliente cadastrado',
91: mensagem: `Cliente ${cliente.nome} foi cadastrado no sistema.`,
92: referenciaId: cliente.id,
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
127: 'createdAt',
128: 'updatedAt',
132: const orderBy: keyof Prisma.ClienteOrderByWithRelationInput =
134: ? (query.orderBy as keyof Prisma.ClienteOrderByWithRelationInput)
135: : 'createdAt';
139: const where: Prisma.ClienteWhereInput = {
140: empresaId,
169: this.prisma.cliente.findMany({
177: this.prisma.cliente.count({
185: async findOne(id: string, empresaId: string) {
186: return this.tenantValidator.validarCliente(empresaId, id);
189: async update(
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

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.controller.ts
16: ApiCreatedResponse,
32: import { CreateConfiguracaoWhatsAppDto } from './dto/create-configuracao-whatsapp.dto';
33: import { UpdateConfiguracaoWhatsAppDto } from './dto/update-configuracao-whatsapp.dto';
37: @Controller('configuracao-whatsapp')
38: @UseGuards(JwtAuthGuard, RolesGuard)
41: private readonly configuracaoWhatsappService: ConfiguracaoWhatsappService,
44: @Post()
45: @Roles('ADMIN', 'GERENTE')
52: type: CreateConfiguracaoWhatsAppDto,
56: @ApiCreatedResponse({
61: empresaId: '550e8400-e29b-41d4-a716-446655440000',
67: createdAt: '2026-06-14T10:00:00.000Z',
68: updatedAt: '2026-06-14T10:00:00.000Z',
82: createOrUpdate(
84: @Body() dto: CreateConfiguracaoWhatsAppDto,
86: return this.configuracaoWhatsappService.createOrUpdate(
87: req.user.empresaId,
92: @Get()
93: @Roles('ADMIN', 'GERENTE')
104: empresaId: '550e8400-e29b-41d4-a716-446655440000',
110: createdAt: '2026-06-14T10:00:00.000Z',
111: updatedAt: '2026-06-14T10:00:00.000Z',
124: req.user.empresaId,
128: @Patch()
129: @Roles('ADMIN', 'GERENTE')
136: type: UpdateConfiguracaoWhatsAppDto,
145: empresaId: '550e8400-e29b-41d4-a716-446655440000',
151: createdAt: '2026-06-14T10:00:00.000Z',
152: updatedAt: '2026-06-14T11:00:00.000Z',
166: update(
168: @Body() dto: UpdateConfiguracaoWhatsAppDto,
170: return this.configuracaoWhatsappService.update(
171: req.user.empresaId,
176: @Get('link')
177: @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
181: 'Gera um link de WhatsApp no formato wa.me para a empresa autenticada. Pode receber uma mensagem opcional pré-preenchida para facilitar contato com clientes sem depender de API paga.',
213: @Query('mensagem') mensagem?: string,
216: req.user.empresaId,

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.module.ts
4: import { TenantModule } from '../../shared/tenant';
12: TenantModule,

### beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
5: import { TenantValidatorService } from '../../shared/tenant';
7: import { CreateConfiguracaoWhatsAppDto } from './dto/create-configuracao-whatsapp.dto';
8: import { UpdateConfiguracaoWhatsAppDto } from './dto/update-configuracao-whatsapp.dto';
13: private readonly prisma: PrismaService,
14: private readonly tenantValidator: TenantValidatorService,
17: async createOrUpdate(
18: empresaId: string,
19: dto: CreateConfiguracaoWhatsAppDto,
21: await this.tenantValidator.validarEmpresaAtiva(empresaId);
28: empresaId,
33: return this.prisma.configuracaoWhatsApp.update({
35: empresaId,
43: return this.prisma.configuracaoWhatsApp.create({
45: empresaId,
56: async findOne(empresaId: string) {
57: await this.tenantValidator.validarEmpresaAtiva(empresaId);
62: empresaId,
75: async update(
76: empresaId: string,
77: dto: UpdateConfiguracaoWhatsAppDto,
79: await this.tenantValidator.validarEmpresaAtiva(empresaId);
81: await this.findOne(empresaId);
85: return this.prisma.configuracaoWhatsApp.update({
87: empresaId,
95: async gerarLink(empresaId: string, mensagem?: string) {
96: await this.tenantValidator.validarEmpresaAtiva(empresaId);
98: const configuracao = await this.findOne(empresaId);
125: delete dados.id;
126: delete dados.empresaId;
127: delete dados.createdAt;
128: delete dados.updatedAt;

### beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
14: export class CreateConfiguracaoWhatsAppDto {

### beauty-core-backend/src/modules/configuracao-whatsapp/dto/update-configuracao-whatsapp.dto.ts
3: import { CreateConfiguracaoWhatsAppDto } from './create-configuracao-whatsapp.dto';
5: export class UpdateConfiguracaoWhatsAppDto extends PartialType(
6: CreateConfiguracaoWhatsAppDto,

### beauty-core-backend/src/modules/configuracoes-notificacao/configuracoes-notificacao.controller.ts
15: ApiCreatedResponse,
29: import { CreateConfiguracaoNotificacaoDto } from './dto/create-configuracao-notificacao.dto';
30: import { UpdateConfiguracaoNotificacaoDto } from './dto/update-configuracao-notificacao.dto';
34: @Controller('configuracoes-notificacao')
35: @UseGuards(JwtAuthGuard, RolesGuard)
36: @Roles('ADMIN', 'GERENTE')
39: private readonly configuracoesNotificacaoService: ConfiguracoesNotificacaoService,
42: @Post()
49: type: CreateConfiguracaoNotificacaoDto,
53: @ApiCreatedResponse({
58: empresaId: '550e8400-e29b-41d4-a716-446655440000',
65: createdAt: '2026-06-14T10:00:00.000Z',
66: updatedAt: '2026-06-14T10:00:00.000Z',
80: create(
82: @Body() dto: CreateConfiguracaoNotificacaoDto,
84: return this.configuracoesNotificacaoService.create(
85: req.user.empresaId,
90: @Get()
101: empresaId: '550e8400-e29b-41d4-a716-446655440000',
108: createdAt: '2026-06-14T10:00:00.000Z',
109: updatedAt: '2026-06-14T10:00:00.000Z',
125: req.user.empresaId,
129: @Patch()
136: type: UpdateConfiguracaoNotificacaoDto,
145: empresaId: '550e8400-e29b-41d4-a716-446655440000',
152: createdAt: '2026-06-14T10:00:00.000Z',
153: updatedAt: '2026-06-14T11:00:00.000Z',
170: update(
172: @Body() dto: UpdateConfiguracaoNotificacaoDto,
174: return this.configuracoesNotificacaoService.update(
175: req.user.empresaId,

### beauty-core-backend/src/modules/configuracoes-notificacao/configuracoes-notificacao.module.ts
4: import { TenantModule } from '../../shared/tenant';
12: TenantModule,

### beauty-core-backend/src/modules/configuracoes-notificacao/configuracoes-notificacao.service.ts
4: import { TenantValidatorService } from '../../shared/tenant';
6: import { CreateConfiguracaoNotificacaoDto } from './dto/create-configuracao-notificacao.dto';
7: import { UpdateConfiguracaoNotificacaoDto } from './dto/update-configuracao-notificacao.dto';
12: private readonly prisma: PrismaService,
13: private readonly tenantValidator: TenantValidatorService,
16: async create(
17: empresaId: string,
18: dto: CreateConfiguracaoNotificacaoDto,
20: await this.tenantValidator.validarEmpresaAtiva(empresaId);
25: empresaId,
37: return this.prisma.configuracaoNotificacao.create({
39: empresaId,
45: async findOne(empresaId: string) {
46: await this.tenantValidator.validarEmpresaAtiva(empresaId);
51: empresaId,
57: await this.prisma.configuracaoNotificacao.create({
59: empresaId,
67: async update(
68: empresaId: string,
69: dto: UpdateConfiguracaoNotificacaoDto,
71: await this.tenantValidator.validarEmpresaAtiva(empresaId);
73: await this.findOne(empresaId);
77: return this.prisma.configuracaoNotificacao.update({
79: empresaId,
92: delete dados.id;
93: delete dados.empresaId;
94: delete dados.createdAt;
95: delete dados.updatedAt;

### beauty-core-backend/src/modules/configuracoes-notificacao/dto/create-configuracao-notificacao.dto.ts
8: export class CreateConfiguracaoNotificacaoDto {
45: 'Define se notificações relacionadas a pacotes de clientes estarão ativas para a empresa.',
56: 'Define se notificações relacionadas a clientes estarão ativas para a empresa.',
60: message: 'O campo notificarClientes deve ser verdadeiro ou falso.',
62: notificarClientes?: boolean;

### beauty-core-backend/src/modules/configuracoes-notificacao/dto/update-configuracao-notificacao.dto.ts
8: export class UpdateConfiguracaoNotificacaoDto {
45: 'Atualiza se notificações relacionadas a pacotes de clientes estarão ativas para a empresa.',
56: 'Atualiza se notificações relacionadas a clientes estarão ativas para a empresa.',
60: message: 'O campo notificarClientes deve ser verdadeiro ou falso.',
62: notificarClientes?: boolean;

### beauty-core-backend/src/modules/mensagens-whatsapp/dto/create-mensagem-whatsapp.dto.ts
18: export class CreateMensagemWhatsAppDto {
23: 'ID opcional do cliente relacionado à mensagem de WhatsApp. Deve pertencer à empresa autenticada quando informado.',
27: message: 'O clienteId deve ser um UUID válido.',
29: clienteId?: string;

### beauty-core-backend/src/modules/mensagens-whatsapp/dto/enviar-mensagem-whatsapp.dto.ts
3: import { CreateMensagemWhatsAppDto } from './create-mensagem-whatsapp.dto';
5: @ApiExtraModels(CreateMensagemWhatsAppDto)
6: export class EnviarMensagemWhatsAppDto extends CreateMensagemWhatsAppDto {}

### beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.controller.ts
18: ApiCreatedResponse,
34: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
39: import { CreateMensagemWhatsAppDto } from './dto/create-mensagem-whatsapp.dto';
44: @UseGuards(JwtAuthGuard, RolesGuard)
45: @Controller('mensagens-whatsapp')
48: private readonly mensagensWhatsappService: MensagensWhatsappService,
49: private readonly queuesService: QueuesService,
52: @Post()
53: @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
60: type: CreateMensagemWhatsAppDto,
63: @ApiCreatedResponse({
68: empresaId: '550e8400-e29b-41d4-a716-446655440000',
69: clienteId: '550e8400-e29b-41d4-a716-446655440000',
75: createdAt: '2026-06-14T10:00:00.000Z',
76: updatedAt: '2026-06-14T10:00:00.000Z',
90: create(
92: @Body() dto: CreateMensagemWhatsAppDto,
94: return this.mensagensWhatsappService.create(
95: getEmpresaId(req),
100: @Post('enviar')
101: @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
112: @ApiCreatedResponse({
138: @Body() dto: EnviarMensagemWhatsAppDto,
140: const empresaId = getEmpresaId(req);
143: empresaId,
148: empresaId,
167: @Get()
168: @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
170: summary: 'Listar mensagens de WhatsApp',
172: 'Lista as mensagens de WhatsApp da empresa autenticada com suporte a paginação. Endpoint usado para histórico de comunicações, acompanhamento de status e auditoria operacional.',
178: description: 'Página atual da listagem paginada.',
198: createdAt: '2026-06-14T10:00:00.000Z',
219: @Query() query: PaginationDto,
222: getEmpresaId(req),
227: @Get(':id')
228: @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
245: empresaId: '550e8400-e29b-41d4-a716-446655440000',
246: clienteId: '550e8400-e29b-41d4-a716-446655440000',
255: createdAt: '2026-06-14T10:00:00.000Z',
256: updatedAt: '2026-06-14T10:01:00.000Z',
276: @Param('id', ParseUUIDPipe) id: string,
279: getEmpresaId(req),
284: @Patch(':id/cancelar')
285: @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
303: updatedAt: '2026-06-14T11:00:00.000Z',
323: @Param('id', ParseUUIDPipe) id: string,
326: getEmpresaId(req),

### beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.module.ts
4: import { TenantModule } from '../../shared/tenant';
14: TenantModule,

### beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
16: import { TenantValidatorService } from '../../shared/tenant';
24: import { CreateMensagemWhatsAppDto } from './dto/create-mensagem-whatsapp.dto';
28: clienteId?: string;
35: private readonly logger = new Logger(MensagensWhatsappService.name);
38: private readonly prisma: PrismaService,
39: private readonly auditoriaService: AuditoriaService,
40: private readonly tenantValidator: TenantValidatorService,
43: async create(
44: empresaId: string,
45: dto: CreateMensagemWhatsAppDto,
49: await this.tenantValidator.validarEmpresaAtiva(empresaId);
50: await this.validarRelacionamentos(empresaId, dto);
52: const mensagem = await this.prisma.mensagemWhatsApp.create({
54: empresaId,
55: clienteId: dto.clienteId,
69: `[WHATSAPP] mensagem criada empresaId=${empresaId} mensagemId=${mensagem.id} status=SUCESSO tempoMs=${tempoMs}`,
73: empresaId,
74: clienteId: mensagem.clienteId ?? undefined,
91: empresaId: string,
96: await this.tenantValidator.validarEmpresaAtiva(empresaId);
100: where: { empresaId },
115: await this.validarRelacionamentos(empresaId, dto);
121: const mensagem = await this.prisma.mensagemWhatsApp.create({
123: empresaId,
124: clienteId: dto.clienteId,
142: `[WHATSAPP] mensagem enviada empresaId=${empresaId} mensagemId=${mensagem.id} status=${mensagem.status} tempoMs=${tempoMs}`,
146: empresaId,
147: clienteId: mensagem.clienteId ?? undefined,
169: empresaId: string,
172: await this.tenantValidator.validarEmpresaAtiva(empresaId);
174: await this.validarFiltrosRelacionados(empresaId, {
175: clienteId: query['clienteId'],
184: 'createdAt',
185: 'updatedAt',
195: : 'createdAt';
200: empresaId,
205: this.prisma.mensagemWhatsApp.findMany({
212: include: this.getIncludeListagem(),
227: async findOne(empresaId: string, id: string) {
228: await this.tenantValidator.validarEmpresaAtiva(empresaId);
230: return this.buscarMensagemOuFalhar(empresaId, id);
233: async cancelar(empresaId: string, id: string) {
236: await this.tenantValidator.validarEmpresaAtiva(empresaId);
239: empresaId,
244: await this.prisma.mensagemWhatsApp.updateMany({
247: empresaId,
261: empresaId,
268: `[WHATSAPP] mensagem cancelada empresaId=${empresaId} mensagemId=${mensagemCancelada.id} status=SUCESSO tempoMs=${tempoMs}`,
272: empresaId,
273: clienteId: mensagemCancelada.clienteId ?? undefined,
293: empresaId: string,
298: empresaId,
306: empresaId: string,
311: empresaId,
319: empresaId: string,
324: empresaId,
332: empresaId: string,
337: empresaId,
345: empresaId: string,
350: empresaId,
358: empresaId: string,
363: empresaId,
371: empresaId: string,
378: await this.tenantValidator.validarEmpresaAtiva(empresaId);
382: where: { empresaId },
393: await this.prisma.mensagemWhatsApp.create({
395: empresaId,
415: `[WHATSAPP] mensagem automática criada empresaId=${empresaId} mensagemId=${mensagemCriada.id} tipo=${tipo} status=${mensagemCriada.status} tempoMs=${tempoMs}`,
419: empresaId,
441: empresaId: string,
443: | CreateMensagemWhatsAppDto
446: await this.validarFiltrosRelacionados(empresaId, {
447: clienteId: dto.clienteId,
454: empresaId: string,
459: if (filtros.clienteId) {
461: this.tenantValidator.validarCliente(
462: empresaId,
463: filtros.clienteId,
470: this.tenantValidator.validarUsuario(
471: empresaId,

### beauty-core-backend/src/modules/notificacoes/dto/create-notificacao.dto.ts
14: export class CreateNotificacaoDto {

### beauty-core-backend/src/modules/notificacoes/dto/update-notificacao.dto.ts
14: export class UpdateNotificacaoDto {

### beauty-core-backend/src/modules/notificacoes/notificacoes.controller.ts
4: Delete,
19: ApiCreatedResponse,
34: import { getEmpresaId } from '../../shared/utils/get-empresa-id';
37: import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
41: @Controller('notificacoes')
42: @UseGuards(JwtAuthGuard, RolesGuard)
43: @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
46: private readonly notificacoesService: NotificacoesService,
49: @Post()
56: type: CreateNotificacaoDto,
59: @ApiCreatedResponse({
64: empresaId: '550e8400-e29b-41d4-a716-446655440000',
66: clienteId: null,
72: createdAt: '2026-06-14T10:00:00.000Z',
73: updatedAt: '2026-06-14T10:00:00.000Z',
87: create(
89: @Body() dto: CreateNotificacaoDto,
91: return this.notificacoesService.create(
92: getEmpresaId(req),
97: @Get()
99: summary: 'Listar notificações',
101: 'Lista as notificações do usuário autenticado dentro da empresa autenticada, com suporte a paginação. Endpoint usado pelo painel administrativo para central de notificações.',
107: description: 'Página atual da listagem paginada.',
127: createdAt: '2026-06-14T10:00:00.000Z',
148: @Query() query: PaginationDto,
151: getEmpresaId(req),
157: @Get('nao-lidas')
159: summary: 'Listar notificações não lidas',
161: 'Lista apenas as notificações não lidas do usuário autenticado dentro da empresa autenticada, com suporte a paginação.',
167: description: 'Página atual da listagem paginada.',
183: mensagem: 'Um pacote de cliente está próximo do vencimento.',
187: createdAt: '2026-06-14T10:00:00.000Z',
208: @Query() query: PaginationDto,
211: getEmpresaId(req),
217: @Get('resumo')
236: createdAt: '2026-06-14T10:00:00.000Z',
251: getEmpresaId(req),
256: @Get(':id')
273: empresaId: '550e8400-e29b-41d4-a716-446655440000',
275: clienteId: null,
281: createdAt: '2026-06-14T10:00:00.000Z',
282: updatedAt: '2026-06-14T10:00:00.000Z',
302: @Param('id', ParseUUIDPipe) id: string,
305: getEmpresaId(req),
311: @Patch(':id/lida')
329: updatedAt: '2026-06-14T11:00:00.000Z',
349: @Param('id', ParseUUIDPipe) id: string,
352: getEmpresaId(req),
358: @Patch(':id/arquivar')
376: updatedAt: '2026-06-14T11:10:00.000Z',
396: @Param('id', ParseUUIDPipe) id: string,
399: getEmpresaId(req),
405: @Delete(':id')
442: @Param('id', ParseUUIDPipe) id: string,
445: getEmpresaId(req),

### beauty-core-backend/src/modules/notificacoes/notificacoes.module.ts
4: import { TenantModule } from '../../shared/tenant';
12: TenantModule,

### beauty-core-backend/src/modules/notificacoes/notificacoes.service.ts
6: import { TenantValidatorService } from '../../shared/tenant';
12: import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
13: import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';
18: private readonly prisma: PrismaService,
19: private readonly tenantValidator: TenantValidatorService,
22: async create(empresaId: string, dto: CreateNotificacaoDto) {
23: await this.tenantValidator.validarEmpresaAtiva(empresaId);
25: await this.tenantValidator.validarUsuario(
26: empresaId,
30: return this.prisma.notificacao.create({
32: empresaId,
42: empresaId: string;
44: tipo: CreateNotificacaoDto['tipo'];
48: await this.tenantValidator.validarEmpresaAtiva(params.empresaId);
50: const usuario = await this.prisma.usuario.findFirst({
53: empresaId: params.empresaId,
62: return this.prisma.notificacao.create({
64: empresaId: params.empresaId,
74: empresaId: string,
78: await this.tenantValidator.validarEmpresaAtiva(empresaId);
80: await this.tenantValidator.validarUsuario(
81: empresaId,
89: 'createdAt',
90: 'updatedAt',
100: : 'createdAt';
105: empresaId,
111: this.prisma.notificacao.findMany({
133: empresaId: string,
137: await this.tenantValidator.validarEmpresaAtiva(empresaId);
139: await this.tenantValidator.validarUsuario(
140: empresaId,
147: empresaId,
158: return this.findAll(empresaId, usuarioId, {
164: async resumo(empresaId: string, usuarioId: string) {
165: await this.tenantValidator.validarEmpresaAtiva(empresaId);
167: await this.tenantValidator.validarUsuario(
168: empresaId,
176: empresaId,
182: empresaId,
189: empresaId,
196: empresaId,
212: empresaId: string,
217: empresaId,
223: async update(
224: empresaId: string,
227: dto: UpdateNotificacaoDto,
230: empresaId,
236: await this.prisma.notificacao.updateMany({
239: empresaId,
252: empresaId,
259: empresaId: string,
264: empresaId,
270: await this.prisma.notificacao.updateMany({
273: empresaId,
289: empresaId,
296: empresaId: string,
301: empresaId,
307: await this.prisma.notificacao.updateMany({
310: empresaId,
325: empresaId,
332: empresaId: string,
337: empresaId,
343: await this.prisma.notificacao.deleteMany({
346: empresaId,
363: empresaId: string,
367: await this.tenantValidator.validarEmpresaAtiva(empresaId);
369: await this.tenantValidator.validarUsuario(
370: empresaId,
375: await this.prisma.notificacao.findFirst({
378: empresaId,
393: empresaId: string,
410: empresaId,
416: createdAt: {

### beauty-core-backend/src/modules/templates-whatsapp/dto/create-template-whatsapp.dto.ts
12: export class CreateTemplateWhatsAppDto {
62: 'Olá, {{clienteNome}}! Seu agendamento está confirmado para {{data}} às {{hora}}.',
64: 'Conteúdo do template de WhatsApp. Pode conter variáveis textuais para substituição futura, como nome do cliente, data, horário ou serviço.',

### beauty-core-backend/src/modules/templates-whatsapp/dto/update-template-whatsapp.dto.ts
3: import { CreateTemplateWhatsAppDto } from './create-template-whatsapp.dto';
5: export class UpdateTemplateWhatsAppDto extends PartialType(
6: CreateTemplateWhatsAppDto,

### beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.controller.ts
17: ApiCreatedResponse,
34: import { CreateTemplateWhatsAppDto } from './dto/create-template-whatsapp.dto';
35: import { UpdateTemplateWhatsAppDto } from './dto/update-template-whatsapp.dto';
39: @UseGuards(JwtAuthGuard, RolesGuard)
40: @Controller('templates-whatsapp')
43: private readonly templatesWhatsappService: TemplatesWhatsappService,
46: @Post()
47: @Roles('ADMIN', 'GERENTE')
54: type: CreateTemplateWhatsAppDto,
57: @ApiCreatedResponse({
62: empresaId: '550e8400-e29b-41d4-a716-446655440000',
66: 'Olá, {{clienteNome}}! Seu agendamento está confirmado para {{data}} às {{hora}}.',
68: createdAt: '2026-06-14T10:00:00.000Z',
69: updatedAt: '2026-06-14T10:00:00.000Z',
82: create(
84: @Body() dto: CreateTemplateWhatsAppDto,
86: return this.templatesWhatsappService.create(
87: req.user.empresaId,
92: @Get()
93: @Roles('ADMIN', 'GERENTE')
95: summary: 'Listar templates de WhatsApp',
97: 'Lista os templates de WhatsApp cadastrados para a empresa autenticada. Endpoint usado pelo painel administrativo para gerenciar modelos de mensagens e automações.',
105: empresaId: '550e8400-e29b-41d4-a716-446655440000',
109: 'Olá, {{clienteNome}}! Seu agendamento está confirmado para {{data}} às {{hora}}.',
111: createdAt: '2026-06-14T10:00:00.000Z',
112: updatedAt: '2026-06-14T10:00:00.000Z',
125: req.user.empresaId,
129: @Get(':id')
130: @Roles('ADMIN', 'GERENTE')
147: empresaId: '550e8400-e29b-41d4-a716-446655440000',
151: 'Olá, {{clienteNome}}! Seu agendamento está confirmado para {{data}} às {{hora}}.',
153: createdAt: '2026-06-14T10:00:00.000Z',
154: updatedAt: '2026-06-14T10:00:00.000Z',
173: @Param('id', ParseUUIDPipe) id: string,
176: req.user.empresaId,
181: @Patch(':id')
182: @Roles('ADMIN', 'GERENTE')
195: type: UpdateTemplateWhatsAppDto,
204: empresaId: '550e8400-e29b-41d4-a716-446655440000',
208: 'Olá, {{clienteNome}}! Estamos lembrando que seu atendimento será em {{data}} às {{hora}}.',
210: createdAt: '2026-06-14T10:00:00.000Z',
211: updatedAt: '2026-06-14T11:00:00.000Z',
228: update(
230: @Param('id', ParseUUIDPipe) id: string,
231: @Body() dto: UpdateTemplateWhatsAppDto,
233: return this.templatesWhatsappService.update(
234: req.user.empresaId,
240: @Patch(':id/inativar')
241: @Roles('ADMIN', 'GERENTE')
260: updatedAt: '2026-06-14T11:30:00.000Z',
279: @Param('id', ParseUUIDPipe) id: string,
282: req.user.empresaId,

### beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.module.ts
4: import { TenantModule } from '../../shared/tenant';
12: TenantModule,

### beauty-core-backend/src/modules/templates-whatsapp/templates-whatsapp.service.ts
8: import { TenantValidatorService } from '../../shared/tenant';
10: import { CreateTemplateWhatsAppDto } from './dto/create-template-whatsapp.dto';
11: import { UpdateTemplateWhatsAppDto } from './dto/update-template-whatsapp.dto';
16: private readonly prisma: PrismaService,
17: private readonly tenantValidator: TenantValidatorService,
20: async create(empresaId: string, dto: CreateTemplateWhatsAppDto) {
21: await this.tenantValidator.validarEmpresaAtiva(empresaId);
24: await this.prisma.templateWhatsApp.findFirst({
26: empresaId,
38: return this.prisma.templateWhatsApp.create({
40: empresaId,
49: async findAll(empresaId: string) {
50: await this.tenantValidator.validarEmpresaAtiva(empresaId);
52: return this.prisma.templateWhatsApp.findMany({
54: empresaId,
58: createdAt: 'desc',
63: async findOne(empresaId: string, id: string) {
64: return this.buscarTemplateOuFalhar(empresaId, id);
67: async update(
68: empresaId: string,
70: dto: UpdateTemplateWhatsAppDto,
72: await this.tenantValidator.validarEmpresaAtiva(empresaId);
75: empresaId,
81: await this.prisma.templateWhatsApp.findFirst({
83: empresaId,
99: const result = await this.prisma.templateWhatsApp.updateMany({
102: empresaId,
117: return this.buscarTemplateOuFalhar(empresaId, id);
120: async inativar(empresaId: string, id: string) {
121: await this.tenantValidator.validarEmpresaAtiva(empresaId);
123: await this.buscarTemplateOuFalhar(empresaId, id);
125: const result = await this.prisma.templateWhatsApp.updateMany({
128: empresaId,
141: empresaId,
147: empresaId: string,
150: await this.tenantValidator.validarEmpresaAtiva(empresaId);
152: const template = await this.prisma.templateWhatsApp.findFirst({
155: empresaId,
168: empresaId: string,
171: const template = await this.prisma.templateWhatsApp.findFirst({
174: empresaId,

### beauty-core-backend/src/modules/tenant-publico/public-tenant.controller.ts
9: import { TenantPublicService } from '../../shared/tenant';
11: @ApiTags('Tenant Público')
12: @Controller('public/tenant')
13: export class PublicTenantController {
15: private readonly tenantPublicService: TenantPublicService,
18: @Get(':slug')
20: summary: 'Resolver tenant público para portal do cliente',
22: 'Retorna apenas dados públicos e seguros do tenant para uso em portal web, PWA, app Android, app iOS e white-label mobile. Não expõe empresaId, plano, status interno, tokens ou dados administrativos.',
27: description: 'Slug público da empresa/tenant.',
30: description: 'Tenant público resolvido com sucesso.',
41: portalClienteAtivo: true,
47: async resolverTenantPorSlug(@Param('slug') slug: string) {
48: const tenant = await this.tenantPublicService.resolverPorSlug(slug);
50: const dados = tenant as any;
65: portalClienteAtivo:
66: dados?.portalClienteAtivo ??

### beauty-core-backend/src/modules/tenant-publico/tenant-publico.controller.ts
9: import { TenantPublicService } from '../../shared/tenant';
11: @ApiTags('Tenant Público')
12: @Controller('tenant-publico')
13: export class TenantPublicoController {
15: private readonly tenantPublicService: TenantPublicService,
18: @Get('slug/:slug')
22: 'Retorna os dados públicos de uma empresa ativa a partir do slug. Usado por frontend, PWA, app mobile e portal do cliente antes do login.',
29: resolverPorSlug(@Param('slug') slug: string) {
30: return this.tenantPublicService.resolverPorSlug(slug);
33: @Get('dominio')
44: resolverPorDominio(@Query('dominio') dominio: string) {
45: return this.tenantPublicService.resolverPorDominio(dominio);
48: @Get('resolver')
52: 'Endpoint flexível para resolver tenant público usando slug ou domínio.',
64: resolverTenantPublico(
65: @Query('slug') slug?: string,
66: @Query('dominio') dominio?: string,
68: return this.tenantPublicService.resolverTenantPublico({

### beauty-core-backend/src/modules/tenant-publico/tenant-publico.module.ts
3: import { TenantModule } from '../../shared/tenant';
5: import { PublicTenantController } from './public-tenant.controller';
6: import { TenantPublicoController } from './tenant-publico.controller';
10: TenantModule,
14: TenantPublicoController,
15: PublicTenantController,
18: export class TenantPublicoModule {}

## FRONTEND — PORTAL
beauty-core-ui/src/app/portal/historico/page.tsx
beauty-core-ui/src/app/portal/layout.tsx
beauty-core-ui/src/app/portal/page.tsx
beauty-core-ui/src/app/portal/perfil/page.tsx
beauty-core-ui/src/app/portal/portal-private-routing.test.tsx
beauty-core-ui/src/app/portal/portal-routing.test.tsx
beauty-core-ui/src/app/portal/primeiro-acesso/page.tsx
beauty-core-ui/src/features/portal/assets/portal-assets.test.ts
beauty-core-ui/src/features/portal/assets/portal-assets.ts
beauty-core-ui/src/features/portal/auth/portal-auth-api.test.ts
beauty-core-ui/src/features/portal/auth/portal-auth-api.ts
beauty-core-ui/src/features/portal/auth/portal-auth-cache.test.ts
beauty-core-ui/src/features/portal/auth/portal-auth-cache.ts
beauty-core-ui/src/features/portal/auth/portal-auth-context-session.test.tsx
beauty-core-ui/src/features/portal/auth/portal-auth-context.test.tsx
beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx
beauty-core-ui/src/features/portal/auth/portal-auth-contracts.ts
beauty-core-ui/src/features/portal/auth/portal-auth-errors.test.ts
beauty-core-ui/src/features/portal/auth/portal-auth-errors.ts
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.test.tsx
beauty-core-ui/src/features/portal/auth/portal-auth-route-orchestrator.tsx
beauty-core-ui/src/features/portal/auth/portal-auth-routing.test.ts
beauty-core-ui/src/features/portal/auth/portal-auth-routing.ts
beauty-core-ui/src/features/portal/auth/portal-auth-session.test.ts
beauty-core-ui/src/features/portal/auth/portal-auth-session.ts
beauty-core-ui/src/features/portal/auth/portal-auth.ts
beauty-core-ui/src/features/portal/auth/portal-otp-request.test.tsx
beauty-core-ui/src/features/portal/auth/portal-otp-request.tsx
beauty-core-ui/src/features/portal/auth/portal-otp-verification.test.tsx
beauty-core-ui/src/features/portal/auth/portal-otp-verification.tsx
beauty-core-ui/src/features/portal/auth/portal-private-route.test.tsx
beauty-core-ui/src/features/portal/auth/portal-private-route.tsx
beauty-core-ui/src/features/portal/components/portal-asset-image.test.tsx
beauty-core-ui/src/features/portal/components/portal-asset-image.tsx
beauty-core-ui/src/features/portal/components/portal-branding.test.tsx
beauty-core-ui/src/features/portal/components/portal-branding.tsx
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.test.tsx
beauty-core-ui/src/features/portal/components/portal-dashboard-data-boundary.tsx
beauty-core-ui/src/features/portal/components/portal-navigation.test.tsx
beauty-core-ui/src/features/portal/components/portal-navigation.tsx
beauty-core-ui/src/features/portal/components/portal-page-container.test.tsx
beauty-core-ui/src/features/portal/components/portal-page-container.tsx
beauty-core-ui/src/features/portal/components/portal-responsive-a11y.test.tsx
beauty-core-ui/src/features/portal/components/portal-shell.test.tsx
beauty-core-ui/src/features/portal/components/portal-shell.tsx
beauty-core-ui/src/features/portal/contracts/portal-client-adapters.ts
beauty-core-ui/src/features/portal/contracts/portal-client-contracts.ts
beauty-core-ui/src/features/portal/contracts/portal-client-schemas.ts
beauty-core-ui/src/features/portal/errors/portal-resource-errors.test.ts
beauty-core-ui/src/features/portal/errors/portal-resource-errors.ts
beauty-core-ui/src/features/portal/navigation/portal-navigation-config.ts
beauty-core-ui/src/features/portal/navigation/portal-navigation.test.ts
beauty-core-ui/src/features/portal/navigation/portal-navigation.ts
beauty-core-ui/src/features/portal/pages/portal-auth-ux.test.tsx
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.test.tsx
beauty-core-ui/src/features/portal/pages/portal-authenticated-surface.tsx
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.test.tsx
beauty-core-ui/src/features/portal/pages/portal-first-access-experience.tsx
beauty-core-ui/src/features/portal/pages/portal-first-access-page.test.tsx
beauty-core-ui/src/features/portal/pages/portal-first-access-page.tsx
beauty-core-ui/src/features/portal/pages/portal-foundation-page.tsx
beauty-core-ui/src/features/portal/pages/portal-otp-request-page.tsx
beauty-core-ui/src/features/portal/pages/portal-private-route-page.tsx
beauty-core-ui/src/features/portal/pages/portal-terms-consent.test.tsx
beauty-core-ui/src/features/portal/pages/portal-terms-consent.tsx
beauty-core-ui/src/features/portal/portal-foundation.integration.test.tsx
beauty-core-ui/src/features/portal/query/portal-client-query-keys.test.ts
beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts
beauty-core-ui/src/features/portal/query/portal-dashboard-data.test.ts
beauty-core-ui/src/features/portal/query/portal-dashboard-data.ts
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.test.ts
beauty-core-ui/src/features/portal/query/portal-dashboard-query-options.ts
beauty-core-ui/src/features/portal/query/portal-dashboard-query.ts
beauty-core-ui/src/features/portal/query/portal-query-gate.test.tsx
beauty-core-ui/src/features/portal/query/portal-query-gate.ts
beauty-core-ui/src/features/portal/query/portal-query.test.ts
beauty-core-ui/src/features/portal/query/portal-query.ts
beauty-core-ui/src/features/portal/security/portal-safe-return-to.test.ts
beauty-core-ui/src/features/portal/security/portal-safe-return-to.ts
beauty-core-ui/src/features/portal/services/portal-client-api.test.ts
beauty-core-ui/src/features/portal/services/portal-client-api.ts
beauty-core-ui/src/features/portal/states/portal-state-views.test.tsx
beauty-core-ui/src/features/portal/states/portal-state-views.tsx

## DECISÃO PENDENTE

Nenhuma capacidade será marcada como BLOCKED ou SUPPORTED antes da leitura dos controllers e guards acima.
