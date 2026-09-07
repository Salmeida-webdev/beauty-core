import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuditoriaService } from './auditoria.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';

import { FiltrosAuditoriaDto } from './dto/filtros-auditoria.dto';

@ApiTags('Auditoria')
@ApiBearerAuth('JWT')
@Controller('auditoria')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'GERENTE')
export class AuditoriaController {
  constructor(
    private readonly auditoriaService: AuditoriaService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar registros de auditoria',
    description:
      'Lista os registros de auditoria da empresa autenticada com filtros opcionais. Endpoint usado para rastreabilidade, investigação operacional, segurança, compliance e análise de ações executadas no sistema.',
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
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional para filtrar os registros de auditoria.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional para filtrar os registros de auditoria.',
  })
  @ApiQuery({
    name: 'modulo',
    required: false,
    example: 'agendamentos',
    description: 'Módulo opcional para filtrar os registros de auditoria.',
  })
  @ApiQuery({
    name: 'acao',
    required: false,
    example: 'CRIAR_AGENDAMENTO',
    description: 'Ação opcional para filtrar os registros de auditoria.',
  })
  @ApiQuery({
    name: 'recurso',
    required: false,
    example: 'agendamento',
    description: 'Recurso opcional relacionado ao registro de auditoria.',
  })
  @ApiQuery({
    name: 'usuarioId',
    required: false,
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID opcional do usuário para filtrar registros de auditoria.',
  })
  @ApiQuery({
    name: 'clienteId',
    required: false,
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID opcional do cliente para filtrar registros de auditoria.',
  })
  @ApiOkResponse({
    description: 'Registros de auditoria retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            empresaId: '550e8400-e29b-41d4-a716-446655440000',
            usuarioId: '550e8400-e29b-41d4-a716-446655440000',
            clienteId: null,
            tipoUsuario: 'ADMIN',
            acao: 'CRIAR_AGENDAMENTO',
            modulo: 'agendamentos',
            rota: '/agendamentos',
            metodoHttp: 'POST',
            recurso: 'agendamento',
            recursoId: '550e8400-e29b-41d4-a716-446655440000',
            ip: '127.0.0.1',
            userAgent: 'Mozilla/5.0',
            status: 'SUCESSO',
            mensagem: 'Agendamento criado com sucesso.',
            dadosAntes: null,
            dadosDepois: {
              status: 'AGENDADO',
            },
            metadata: {
              origem: 'painel-admin',
            },
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
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findAll(
    @Req() req: any,
    @Query() filtros: FiltrosAuditoriaDto,
  ) {
    return this.auditoriaService.findAll(
      req.user.empresaId,
      filtros,
    );
  }

  @Get('recurso/:recurso/:recursoId')
  @ApiOperation({
    summary: 'Buscar auditoria por recurso',
    description:
      'Lista os registros de auditoria relacionados a um recurso específico da empresa autenticada. Útil para rastrear histórico de alterações de uma entidade, como agendamento, cliente, usuário, pacote ou movimentação financeira.',
  })
  @ApiParam({
    name: 'recurso',
    example: 'agendamento',
    description:
      'Nome do recurso auditado, como cliente, usuario, agendamento, financeiro, pacote ou arquivo.',
  })
  @ApiParam({
    name: 'recursoId',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID do recurso auditado.',
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
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional para filtrar os registros.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional para filtrar os registros.',
  })
  @ApiOkResponse({
    description: 'Registros de auditoria do recurso retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            acao: 'ATUALIZAR_AGENDAMENTO',
            modulo: 'agendamentos',
            recurso: 'agendamento',
            recursoId: '550e8400-e29b-41d4-a716-446655440000',
            status: 'SUCESSO',
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
  @ApiBadRequestResponse({
    description: 'Parâmetros inválidos ou filtros em formato incorreto.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findByRecurso(
    @Req() req: any,
    @Param('recurso') recurso: string,
    @Param('recursoId') recursoId: string,
    @Query() filtros: FiltrosAuditoriaDto,
  ) {
    return this.auditoriaService.findByRecurso(
      req.user.empresaId,
      recurso,
      recursoId,
      filtros,
    );
  }

  @Get('usuario/:usuarioId')
  @ApiOperation({
    summary: 'Buscar auditoria por usuário',
    description:
      'Lista os registros de auditoria relacionados a um usuário específico da empresa autenticada. Útil para rastrear ações administrativas, operacionais e alterações realizadas por um colaborador.',
  })
  @ApiParam({
    name: 'usuarioId',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID do usuário usado como filtro de auditoria.',
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
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional para filtrar os registros.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional para filtrar os registros.',
  })
  @ApiOkResponse({
    description: 'Registros de auditoria do usuário retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            usuarioId: '550e8400-e29b-41d4-a716-446655440000',
            tipoUsuario: 'ADMIN',
            acao: 'LOGIN_ADMIN',
            modulo: 'auth',
            status: 'SUCESSO',
            ip: '127.0.0.1',
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
  @ApiBadRequestResponse({
    description: 'usuarioId inválido ou filtros em formato incorreto.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findByUsuario(
    @Req() req: any,
    @Param('usuarioId') usuarioId: string,
    @Query() filtros: FiltrosAuditoriaDto,
  ) {
    return this.auditoriaService.findByUsuario(
      req.user.empresaId,
      usuarioId,
      filtros,
    );
  }

  @Get('cliente/:clienteId')
  @ApiOperation({
    summary: 'Buscar auditoria por cliente',
    description:
      'Lista os registros de auditoria relacionados a um cliente específico da empresa autenticada. Útil para rastrear alterações cadastrais, interações, notificações, pacotes, fidelidade e histórico do cliente.',
  })
  @ApiParam({
    name: 'clienteId',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID do cliente usado como filtro de auditoria.',
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
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional para filtrar os registros.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional para filtrar os registros.',
  })
  @ApiOkResponse({
    description: 'Registros de auditoria do cliente retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            clienteId: '550e8400-e29b-41d4-a716-446655440000',
            acao: 'ATUALIZAR_CLIENTE',
            modulo: 'clientes',
            recurso: 'cliente',
            status: 'SUCESSO',
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
  @ApiBadRequestResponse({
    description: 'clienteId inválido ou filtros em formato incorreto.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findByCliente(
    @Req() req: any,
    @Param('clienteId') clienteId: string,
    @Query() filtros: FiltrosAuditoriaDto,
  ) {
    return this.auditoriaService.findByCliente(
      req.user.empresaId,
      clienteId,
      filtros,
    );
  }

  @Get('modulo/:modulo')
  @ApiOperation({
    summary: 'Buscar auditoria por módulo',
    description:
      'Lista os registros de auditoria relacionados a um módulo específico da empresa autenticada, como auth, clientes, agendamentos, financeiro, whatsapp, scheduler ou arquivos.',
  })
  @ApiParam({
    name: 'modulo',
    example: 'financeiro',
    description: 'Nome do módulo usado como filtro de auditoria.',
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
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional para filtrar os registros.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional para filtrar os registros.',
  })
  @ApiOkResponse({
    description: 'Registros de auditoria do módulo retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            acao: 'REGISTRAR_PAGAMENTO',
            modulo: 'financeiro',
            recurso: 'movimentacao_financeira',
            status: 'SUCESSO',
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
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findByModulo(
    @Req() req: any,
    @Param('modulo') modulo: string,
    @Query() filtros: FiltrosAuditoriaDto,
  ) {
    return this.auditoriaService.findByModulo(
      req.user.empresaId,
      modulo,
      filtros,
    );
  }

  @Get('acao/:acao')
  @ApiOperation({
    summary: 'Buscar auditoria por ação',
    description:
      'Lista os registros de auditoria relacionados a uma ação específica da empresa autenticada. Útil para investigar eventos como login, criação, atualização, cancelamento, envio, processamento ou execução de jobs.',
  })
  @ApiParam({
    name: 'acao',
    example: 'LOGIN_ADMIN',
    description: 'Nome da ação usada como filtro de auditoria.',
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
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional para filtrar os registros.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional para filtrar os registros.',
  })
  @ApiOkResponse({
    description: 'Registros de auditoria da ação retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            usuarioId: '550e8400-e29b-41d4-a716-446655440000',
            acao: 'LOGIN_ADMIN',
            modulo: 'auth',
            status: 'SUCESSO',
            ip: '127.0.0.1',
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
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findByAcao(
    @Req() req: any,
    @Param('acao') acao: string,
    @Query() filtros: FiltrosAuditoriaDto,
  ) {
    return this.auditoriaService.findByAcao(
      req.user.empresaId,
      acao,
      filtros,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar registro de auditoria por ID',
    description:
      'Busca um registro específico de auditoria pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID do registro de auditoria.',
  })
  @ApiOkResponse({
    description: 'Registro de auditoria encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        usuarioId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: null,
        tipoUsuario: 'ADMIN',
        acao: 'LOGIN_ADMIN',
        modulo: 'auth',
        rota: '/auth/login',
        metodoHttp: 'POST',
        recurso: 'auth',
        recursoId: null,
        ip: '127.0.0.1',
        userAgent: 'Mozilla/5.0',
        status: 'SUCESSO',
        mensagem: 'Login administrativo realizado com sucesso.',
        dadosAntes: null,
        dadosDepois: null,
        metadata: {
          origem: 'painel-admin',
        },
        createdAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou em formato incorreto.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Registro de auditoria não encontrado para a empresa autenticada.',
  })
  findOne(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.auditoriaService.findOne(
      req.user.empresaId,
      id,
    );
  }
}