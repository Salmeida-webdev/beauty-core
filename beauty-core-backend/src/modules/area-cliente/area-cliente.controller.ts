import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { PaginationDto } from '../../shared/dto/pagination.dto';

import { ClienteAuthGuard } from '../auth-cliente/guards/cliente-auth.guard';

import { AreaClienteService } from './area-cliente.service';
import { EnviarPortalMensagemWhatsAppDto } from "./dto/enviar-portal-mensagem-whatsapp.dto";
import { ArquivosDownloadService } from "../arquivos/arquivos-download.service";
import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
import { CreatePortalAgendamentoDto } from './dto/create-portal-agendamento.dto';
import { ReschedulePortalAgendamentoDto } from './dto/reschedule-portal-agendamento.dto';
import { ClienteAuthUser } from './types/cliente-auth-user.type';

type ClienteRequest = {
  user: ClienteAuthUser;
};

@ApiTags('Ãrea Cliente')
@ApiBearerAuth('JWT')
@UseGuards(ClienteAuthGuard)
@Controller('area-cliente')
export class AreaClienteController {
  constructor(
    private readonly areaClienteService: AreaClienteService,

    private readonly arquivosDownloadService: ArquivosDownloadService,) {}

  private getClienteAutenticado(req: ClienteRequest) {
    return {
      clienteId: req.user.clienteId ?? req.user.sub,
      empresaId: req.user.empresaId,
    };
  }

  @Get('me/perfil')
  @ApiOperation({
    summary: 'Buscar meu perfil',
    description:
      'Retorna o perfil do cliente final autenticado pelo JWT Cliente. O clienteId Ã© obtido diretamente do token, sem exposiÃ§Ã£o na URL.',
  })
  @ApiOkResponse({
    description: 'Perfil do cliente autenticado retornado com sucesso.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Cliente ausente, invÃ¡lido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Portal do cliente desativado.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente nÃ£o encontrado no tenant autenticado.',
  })
  perfil(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.perfil(empresaId, clienteId);
  }

  @Patch('me/perfil')
  @ApiOperation({
    summary: 'Atualizar meu perfil',
    description:
      'Atualiza parcialmente o perfil do cliente final autenticado. NÃ£o permite alterar telefone nem observaÃ§Ãµes internas.',
  })
  @ApiBody({
    type: UpdatePerfilClienteDto,
    description:
      'Dados permitidos para atualizaÃ§Ã£o pelo cliente autenticado.',
  })
  @ApiOkResponse({
    description: 'Perfil atualizado com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'Payload invÃ¡lido ou nenhum campo enviado.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Cliente ausente, invÃ¡lido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Portal do cliente desativado.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente nÃ£o encontrado no tenant autenticado.',
  })
  updatePerfil(
    @Req() req: ClienteRequest,
    @Body() dto: UpdatePerfilClienteDto,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.updatePerfil(
      empresaId,
      clienteId,
      dto,
    );
  }

  @Get('me/agendamentos')
  @ApiOperation({
    summary: 'Listar meus agendamentos',
    description:
      'Lista os agendamentos do cliente autenticado, com paginaÃ§Ã£o e filtro opcional por status.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    example: 'confirmados',
    description:
      'Filtro amigÃ¡vel opcional: pendentes, confirmados, concluidos, concluÃ­dos ou cancelados.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiOkResponse({
    description: 'Agendamentos retornados com sucesso.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Cliente ausente, invÃ¡lido ou expirado.',
  })
  agendamentos(
    @Req() req: ClienteRequest,
    @Query() query: PaginationDto,
    @Query('status') status?: string,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.agendamentos(
      empresaId,
      clienteId,
      status,
      query,
    );
  }

  @Get('me/proximos-agendamentos')
  @ApiOperation({
    summary: 'Listar meus prÃ³ximos agendamentos',
    description:
      'Retorna os prÃ³ximos agendamentos futuros do cliente autenticado.',
  })
  @ApiOkResponse({
    description: 'PrÃ³ximos agendamentos retornados com sucesso.',
  })
  proximosAgendamentos(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.proximosAgendamentos(
      empresaId,
      clienteId,
    );
  }

  @Get('me/ultimo-agendamento')
  @ApiOperation({
    summary: 'Buscar meu Ãºltimo agendamento',
    description:
      'Retorna o Ãºltimo agendamento passado do cliente autenticado.',
  })
  @ApiOkResponse({
    description: 'Ãšltimo agendamento retornado com sucesso.',
  })
  ultimoAgendamento(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.ultimoAgendamento(
      empresaId,
      clienteId,
    );
  }

  @Post('me/agendamentos')
  @ApiOperation({
    summary: 'Criar meu agendamento',
    description:
      'Cria um agendamento para o cliente autenticado. O clienteId é derivado exclusivamente do JWT.',
  })
  @ApiBody({ type: CreatePortalAgendamentoDto })
  criarAgendamento(
    @Req() req: ClienteRequest,
    @Body() dto: CreatePortalAgendamentoDto,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.criarAgendamento(
      empresaId,
      clienteId,
      dto,
    );
  }

  @Patch('me/agendamentos/:id/reagendar')
  @ApiOperation({
    summary: 'Reagendar meu agendamento',
    description:
      'Reagenda somente um agendamento pertencente ao cliente autenticado.',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @ApiBody({ type: ReschedulePortalAgendamentoDto })
  reagendarAgendamento(
    @Req() req: ClienteRequest,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReschedulePortalAgendamentoDto,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.reagendarAgendamento(
      empresaId,
      clienteId,
      id,
      dto,
    );
  }

  @Patch('me/agendamentos/:id/cancelar')
  @ApiOperation({
    summary: 'Cancelar meu agendamento',
    description:
      'Cancela somente um agendamento pertencente ao cliente autenticado.',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  cancelarAgendamento(
    @Req() req: ClienteRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.cancelarAgendamento(
      empresaId,
      clienteId,
      id,
    );
  }
  @Get('me/fidelidade')
  @ApiOperation({
    summary: 'Buscar minha fidelidade',
    description:
      'Retorna saldo, nÃ­vel atual, prÃ³ximo nÃ­vel e benefÃ­cios disponÃ­veis do cliente autenticado.',
  })
  @ApiOkResponse({
    description: 'Dados de fidelidade retornados com sucesso.',
  })
  fidelidade(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.fidelidade(empresaId, clienteId);
  }

  @Get('me/pontos')
  @ApiOperation({
    summary: 'Listar minhas movimentaÃ§Ãµes de pontos',
    description:
      'Lista o histÃ³rico de pontos de fidelidade do cliente autenticado.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiOkResponse({
    description: 'HistÃ³rico de pontos retornado com sucesso.',
  })
  pontos(
    @Req() req: ClienteRequest,
    @Query() query: PaginationDto,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.pontos(
      empresaId,
      clienteId,
      query,
    );
  }

  @Get('me/beneficios')
  @ApiOperation({
    summary: 'Listar meus benefÃ­cios',
    description:
      'Retorna benefÃ­cios disponÃ­veis e liberados para o cliente autenticado conforme seu saldo de pontos.',
  })
  @ApiOkResponse({
    description: 'BenefÃ­cios retornados com sucesso.',
  })
  beneficios(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.beneficios(empresaId, clienteId);
  }

  @Get('me/documentos/:id/signed-url')
  async documentoSignedUrl(
    @Param('id') id: string,
    @Req() req: ClienteRequest,
  ) {
    this.getClienteAutenticado(req);

    return this.arquivosDownloadService.gerarSignedUrl(
      id,
      req.user as any,
    );
  }
  @Get('me/documentos')
  async documentos(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } =
      this.getClienteAutenticado(req);

    return this.areaClienteService.documentos(
      empresaId,
      clienteId,
    );
  }

  @Get('me/pacotes')
  @ApiOperation({
    summary: 'Listar meus pacotes',
    description:
      'Lista os pacotes vinculados ao cliente autenticado, separados por status.',
  })
  @ApiOkResponse({
    description: 'Pacotes retornados com sucesso.',
  })
  pacotes(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.pacotes(empresaId, clienteId);
  }
  @Patch('me/pacotes/:pacoteId/usar-sessao')
  async usarSessaoPacote(
    @Param('pacoteId') pacoteId: string,
    @Req() req: any,
  ) {
    return this.areaClienteService.usarSessaoPacote(
      req.user.empresaId,
      req.user.clienteId,
      pacoteId,
    );
  }

  @Get('me/pacotes/:pacoteId')
  @ApiOperation({
    summary: 'Buscar detalhes de um pacote meu',
    description:
      'Retorna os detalhes de um pacote especÃ­fico pertencente ao cliente autenticado.',
  })
  @ApiParam({
    name: 'pacoteId',
    description: 'ID do pacote do cliente.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Detalhes do pacote retornados com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'pacoteId invÃ¡lido. O parÃ¢metro deve ser UUID.',
  })
  @ApiNotFoundResponse({
    description: 'Pacote nÃ£o encontrado para o cliente autenticado.',
  })
  pacoteDetalhes(
    @Req() req: ClienteRequest,
    @Param('pacoteId', ParseUUIDPipe) pacoteId: string,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.pacoteDetalhes(
      empresaId,
      clienteId,
      pacoteId,
    );
  }

  @Get('me/notificacoes')
  @ApiOperation({
    summary: 'Listar minhas notificaÃ§Ãµes',
    description:
      'Lista as notificaÃ§Ãµes vinculadas ao cliente autenticado, com paginaÃ§Ã£o.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiOkResponse({
    description: 'NotificaÃ§Ãµes retornadas com sucesso.',
  })
  notificacoes(
    @Req() req: ClienteRequest,
    @Query() query: PaginationDto,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.notificacoes(
      empresaId,
      clienteId,
      query,
    );
  }

  @Get('me/notificacoes/nao-lidas')
  @ApiOperation({
    summary: 'Listar minhas notificaÃ§Ãµes nÃ£o lidas',
    description:
      'Retorna as notificaÃ§Ãµes nÃ£o lidas do cliente autenticado.',
  })
  @ApiOkResponse({
    description: 'NotificaÃ§Ãµes nÃ£o lidas retornadas com sucesso.',
  })
  notificacoesNaoLidas(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.notificacoesNaoLidas(
      empresaId,
      clienteId,
    );
  }

  @Patch('me/notificacoes/:id/lida')
  @ApiOperation({
    summary: 'Marcar minha notificaÃ§Ã£o como lida',
    description:
      'Marca uma notificaÃ§Ã£o especÃ­fica do cliente autenticado como lida.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da notificaÃ§Ã£o.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'NotificaÃ§Ã£o marcada como lida com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'ID invÃ¡lido. O parÃ¢metro deve ser UUID.',
  })
  @ApiNotFoundResponse({
    description:
      'NotificaÃ§Ã£o nÃ£o encontrada para o cliente autenticado.',
  })
  marcarNotificacaoComoLida(
    @Req() req: ClienteRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.marcarNotificacaoComoLida(
      empresaId,
      clienteId,
      id,
    );
  }


  @Post('me/mensagens-whatsapp/enviar')
  async enviarMensagemWhatsapp(
    @Req() req: ClienteRequest,
    @Body() dto: EnviarPortalMensagemWhatsAppDto,
  ) {
    const { empresaId, clienteId } =
      this.getClienteAutenticado(req);

    return this.areaClienteService.enviarMensagemWhatsappPortal(
      empresaId,
      clienteId,
      dto.tipo,
      dto.mensagem,
    );
  }
  @Get('me/mensagens-whatsapp')
  @ApiOperation({
    summary: 'Listar minhas mensagens de WhatsApp',
    description:
      'Lista as mensagens de WhatsApp vinculadas ao cliente autenticado, com paginaÃ§Ã£o.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiOkResponse({
    description: 'Mensagens de WhatsApp retornadas com sucesso.',
  })
  mensagensWhatsapp(
    @Req() req: ClienteRequest,
    @Query() query: PaginationDto,
  ) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.mensagensWhatsapp(
      empresaId,
      clienteId,
      query,
    );
  }

  @Get('me/dashboard')
  @ApiOperation({
    summary: 'Meu dashboard',
    description:
      'Retorna dados consolidados do cliente autenticado para dashboard do portal/app.',
  })
  @ApiOkResponse({
    description: 'Dashboard retornado com sucesso.',
  })
  dashboard(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.dashboard(empresaId, clienteId);
  }

  @Get('me/historico')
  @ApiOperation({
    summary: 'Meu histÃ³rico consolidado',
    description:
      'Retorna histÃ³rico consolidado do cliente autenticado, reunindo agendamentos, pontos, pacotes, notificaÃ§Ãµes e comunicaÃ§Ãµes.',
  })
  @ApiOkResponse({
    description: 'HistÃ³rico consolidado retornado com sucesso.',
  })
  historico(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.historico(empresaId, clienteId);
  }
}
