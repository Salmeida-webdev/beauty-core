import {
  Body,
  Controller,
  Get,
  Param,
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
import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
import { ClienteAuthUser } from './types/cliente-auth-user.type';

type ClienteRequest = {
  user: ClienteAuthUser;
};

@ApiTags('Área Cliente')
@ApiBearerAuth('JWT')
@UseGuards(ClienteAuthGuard)
@Controller('area-cliente')
export class AreaClienteController {
  constructor(
    private readonly areaClienteService: AreaClienteService,
  ) {}

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
      'Retorna o perfil do cliente final autenticado pelo JWT Cliente. O clienteId é obtido diretamente do token, sem exposição na URL.',
  })
  @ApiOkResponse({
    description: 'Perfil do cliente autenticado retornado com sucesso.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Cliente ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Portal do cliente desativado.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente não encontrado no tenant autenticado.',
  })
  perfil(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.perfil(empresaId, clienteId);
  }

  @Patch('me/perfil')
  @ApiOperation({
    summary: 'Atualizar meu perfil',
    description:
      'Atualiza parcialmente o perfil do cliente final autenticado. Não permite alterar telefone nem observações internas.',
  })
  @ApiBody({
    type: UpdatePerfilClienteDto,
    description:
      'Dados permitidos para atualização pelo cliente autenticado.',
  })
  @ApiOkResponse({
    description: 'Perfil atualizado com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'Payload inválido ou nenhum campo enviado.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Cliente ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Portal do cliente desativado.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente não encontrado no tenant autenticado.',
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
      'Lista os agendamentos do cliente autenticado, com paginação e filtro opcional por status.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    example: 'confirmados',
    description:
      'Filtro amigável opcional: pendentes, confirmados, concluidos, concluídos ou cancelados.',
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
    description: 'Token Cliente ausente, inválido ou expirado.',
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
    summary: 'Listar meus próximos agendamentos',
    description:
      'Retorna os próximos agendamentos futuros do cliente autenticado.',
  })
  @ApiOkResponse({
    description: 'Próximos agendamentos retornados com sucesso.',
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
    summary: 'Buscar meu último agendamento',
    description:
      'Retorna o último agendamento passado do cliente autenticado.',
  })
  @ApiOkResponse({
    description: 'Último agendamento retornado com sucesso.',
  })
  ultimoAgendamento(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.ultimoAgendamento(
      empresaId,
      clienteId,
    );
  }

  @Get('me/fidelidade')
  @ApiOperation({
    summary: 'Buscar minha fidelidade',
    description:
      'Retorna saldo, nível atual, próximo nível e benefícios disponíveis do cliente autenticado.',
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
    summary: 'Listar minhas movimentações de pontos',
    description:
      'Lista o histórico de pontos de fidelidade do cliente autenticado.',
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
    description: 'Histórico de pontos retornado com sucesso.',
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
    summary: 'Listar meus benefícios',
    description:
      'Retorna benefícios disponíveis e liberados para o cliente autenticado conforme seu saldo de pontos.',
  })
  @ApiOkResponse({
    description: 'Benefícios retornados com sucesso.',
  })
  beneficios(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.beneficios(empresaId, clienteId);
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

  @Get('me/pacotes/:pacoteId')
  @ApiOperation({
    summary: 'Buscar detalhes de um pacote meu',
    description:
      'Retorna os detalhes de um pacote específico pertencente ao cliente autenticado.',
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
    description: 'pacoteId inválido. O parâmetro deve ser UUID.',
  })
  @ApiNotFoundResponse({
    description: 'Pacote não encontrado para o cliente autenticado.',
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
    summary: 'Listar minhas notificações',
    description:
      'Lista as notificações vinculadas ao cliente autenticado, com paginação.',
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
    description: 'Notificações retornadas com sucesso.',
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
    summary: 'Listar minhas notificações não lidas',
    description:
      'Retorna as notificações não lidas do cliente autenticado.',
  })
  @ApiOkResponse({
    description: 'Notificações não lidas retornadas com sucesso.',
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
    summary: 'Marcar minha notificação como lida',
    description:
      'Marca uma notificação específica do cliente autenticado como lida.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da notificação.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Notificação marcada como lida com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'ID inválido. O parâmetro deve ser UUID.',
  })
  @ApiNotFoundResponse({
    description:
      'Notificação não encontrada para o cliente autenticado.',
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

  @Get('me/mensagens-whatsapp')
  @ApiOperation({
    summary: 'Listar minhas mensagens de WhatsApp',
    description:
      'Lista as mensagens de WhatsApp vinculadas ao cliente autenticado, com paginação.',
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
    summary: 'Meu histórico consolidado',
    description:
      'Retorna histórico consolidado do cliente autenticado, reunindo agendamentos, pontos, pacotes, notificações e comunicações.',
  })
  @ApiOkResponse({
    description: 'Histórico consolidado retornado com sucesso.',
  })
  historico(@Req() req: ClienteRequest) {
    const { empresaId, clienteId } = this.getClienteAutenticado(req);

    return this.areaClienteService.historico(empresaId, clienteId);
  }
}