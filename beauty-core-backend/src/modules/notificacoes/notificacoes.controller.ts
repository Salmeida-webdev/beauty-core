import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';

import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';

@ApiTags('Notificacoes')
@ApiBearerAuth('JWT')
@Controller('notificacoes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
export class NotificacoesController {
  constructor(
    private readonly notificacoesService: NotificacoesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar notificação',
    description:
      'Cria uma notificação para a empresa autenticada. Endpoint usado para notificações administrativas, alertas internos, avisos operacionais, lembretes e eventos do sistema.',
  })
  @ApiBody({
    type: CreateNotificacaoDto,
    description: 'Dados necessários para criação de uma notificação.',
  })
  @ApiCreatedResponse({
    description: 'Notificação criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        usuarioId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: null,
        titulo: 'Novo agendamento',
        mensagem: 'Um novo agendamento foi criado no sistema.',
        tipo: 'AGENDAMENTO',
        lida: false,
        arquivada: false,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou campos obrigatórios ausentes.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  create(
    @Req() req: any,
    @Body() dto: CreateNotificacaoDto,
  ) {
    return this.notificacoesService.create(
      getEmpresaId(req),
      dto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Listar notificações',
    description:
      'Lista as notificações do usuário autenticado dentro da empresa autenticada, com suporte a paginação. Endpoint usado pelo painel administrativo para central de notificações.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Página atual da listagem paginada.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Quantidade de registros por página.',
  })
  @ApiOkResponse({
    description: 'Notificações retornadas com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            titulo: 'Novo agendamento',
            mensagem: 'Um novo agendamento foi criado no sistema.',
            tipo: 'AGENDAMENTO',
            lida: false,
            arquivada: false,
            createdAt: '2026-06-14T10:00:00.000Z',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  findAll(
    @Req() req: any,
    @Query() query: PaginationDto,
  ) {
    return this.notificacoesService.findAll(
      getEmpresaId(req),
      req.user.sub,
      query,
    );
  }

  @Get('nao-lidas')
  @ApiOperation({
    summary: 'Listar notificações não lidas',
    description:
      'Lista apenas as notificações não lidas do usuário autenticado dentro da empresa autenticada, com suporte a paginação.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Página atual da listagem paginada.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Quantidade de registros por página.',
  })
  @ApiOkResponse({
    description: 'Notificações não lidas retornadas com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            titulo: 'Pacote vencendo',
            mensagem: 'Um pacote de cliente está próximo do vencimento.',
            tipo: 'PACOTE',
            lida: false,
            arquivada: false,
            createdAt: '2026-06-14T10:00:00.000Z',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  findNaoLidas(
    @Req() req: any,
    @Query() query: PaginationDto,
  ) {
    return this.notificacoesService.findNaoLidas(
      getEmpresaId(req),
      req.user.sub,
      query,
    );
  }

  @Get('resumo')
  @ApiOperation({
    summary: 'Resumo de notificações',
    description:
      'Retorna um resumo das notificações do usuário autenticado dentro da empresa autenticada, incluindo totais, notificações não lidas e indicadores para exibição no painel.',
  })
  @ApiOkResponse({
    description: 'Resumo de notificações retornado com sucesso.',
    schema: {
      example: {
        total: 25,
        naoLidas: 5,
        arquivadas: 3,
        recentes: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            titulo: 'Novo agendamento',
            tipo: 'AGENDAMENTO',
            lida: false,
            createdAt: '2026-06-14T10:00:00.000Z',
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  resumo(@Req() req: any) {
    return this.notificacoesService.resumo(
      getEmpresaId(req),
      req.user.sub,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar notificação por ID',
    description:
      'Busca uma notificação específica pelo ID, respeitando o usuário autenticado e o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da notificação.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Notificação encontrada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        usuarioId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: null,
        titulo: 'Novo agendamento',
        mensagem: 'Um novo agendamento foi criado no sistema.',
        tipo: 'AGENDAMENTO',
        lida: false,
        arquivada: false,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido. O parâmetro deve ser um UUID válido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description:
      'Notificação não encontrada para o usuário e empresa autenticados.',
  })
  findOne(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificacoesService.findOne(
      getEmpresaId(req),
      req.user.sub,
      id,
    );
  }

  @Patch(':id/lida')
  @ApiOperation({
    summary: 'Marcar notificação como lida',
    description:
      'Marca uma notificação como lida para o usuário autenticado dentro da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da notificação que será marcada como lida.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Notificação marcada como lida com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        lida: true,
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido. O parâmetro deve ser um UUID válido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description:
      'Notificação não encontrada para o usuário e empresa autenticados.',
  })
  marcarComoLida(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificacoesService.marcarComoLida(
      getEmpresaId(req),
      req.user.sub,
      id,
    );
  }

  @Patch(':id/arquivar')
  @ApiOperation({
    summary: 'Arquivar notificação',
    description:
      'Arquiva uma notificação do usuário autenticado dentro da empresa autenticada, preservando o registro para histórico e rastreabilidade.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da notificação que será arquivada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Notificação arquivada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        arquivada: true,
        updatedAt: '2026-06-14T11:10:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido. O parâmetro deve ser um UUID válido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description:
      'Notificação não encontrada para o usuário e empresa autenticados.',
  })
  arquivar(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificacoesService.arquivar(
      getEmpresaId(req),
      req.user.sub,
      id,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover notificação',
    description:
      'Remove uma notificação do usuário autenticado dentro da empresa autenticada, conforme a regra implementada no serviço.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da notificação que será removida.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Notificação removida com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        removida: true,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido. O parâmetro deve ser um UUID válido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description:
      'Notificação não encontrada para o usuário e empresa autenticados.',
  })
  remove(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.notificacoesService.remove(
      getEmpresaId(req),
      req.user.sub,
      id,
    );
  }
}