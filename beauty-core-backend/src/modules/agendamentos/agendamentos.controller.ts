import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Request,
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

import { Roles } from '../../shared/decorators/roles.decorator';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';

@ApiTags('Agendamentos')
@ApiBearerAuth('JWT')
@Controller('agendamentos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AgendamentosController {
  constructor(
    private readonly agendamentosService: AgendamentosService,
  ) {}

  @Post()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Criar agendamento',
    description:
      'Cria um agendamento para a empresa autenticada. Endpoint usado pelo painel administrativo, recepção e profissionais para registrar atendimentos vinculados a cliente, serviço, profissional, unidade e data/hora.',
  })
  @ApiBody({
    type: CreateAgendamentoDto,
    description: 'Dados necessários para criação de um agendamento.',
  })
  @ApiCreatedResponse({
    description: 'Agendamento criado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        profissionalId: '550e8400-e29b-41d4-a716-446655440000',
        servicoId: '550e8400-e29b-41d4-a716-446655440000',
        unidadeId: '550e8400-e29b-41d4-a716-446655440000',
        dataHoraInicio: '2026-06-14T14:00:00.000Z',
        dataHoraFim: '2026-06-14T15:00:00.000Z',
        status: 'AGENDADO',
        observacoes: 'Cliente prefere atendimento no período da tarde.',
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Dados inválidos, conflito de horário ou campos obrigatórios ausentes.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  create(
    @Body() createAgendamentoDto: CreateAgendamentoDto,
    @Request() req: any,
  ) {
    return this.agendamentosService.create(
      createAgendamentoDto,
      getEmpresaId(req),
    );
  }

  @Get()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Listar agendamentos',
    description:
      'Lista os agendamentos da empresa autenticada com suporte a paginação. Endpoint usado para agenda administrativa, recepção, profissionais, relatórios e visão operacional dos atendimentos.',
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
    description: 'Agendamentos retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            clienteId: '550e8400-e29b-41d4-a716-446655440000',
            profissionalId: '550e8400-e29b-41d4-a716-446655440000',
            servicoId: '550e8400-e29b-41d4-a716-446655440000',
            unidadeId: '550e8400-e29b-41d4-a716-446655440000',
            dataHoraInicio: '2026-06-14T14:00:00.000Z',
            dataHoraFim: '2026-06-14T15:00:00.000Z',
            status: 'AGENDADO',
            observacoes: 'Cliente prefere atendimento no período da tarde.',
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
    @Request() req: any,
    @Query() query: PaginationDto,
  ) {
    return this.agendamentosService.findAll(
      getEmpresaId(req),
      query,
    );
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Buscar agendamento por ID',
    description:
      'Busca um agendamento específico pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do agendamento.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Agendamento encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        profissionalId: '550e8400-e29b-41d4-a716-446655440000',
        servicoId: '550e8400-e29b-41d4-a716-446655440000',
        unidadeId: '550e8400-e29b-41d4-a716-446655440000',
        dataHoraInicio: '2026-06-14T14:00:00.000Z',
        dataHoraFim: '2026-06-14T15:00:00.000Z',
        status: 'AGENDADO',
        observacoes: 'Cliente prefere atendimento no período da tarde.',
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
    description: 'Agendamento não encontrado para a empresa autenticada.',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    return this.agendamentosService.findOne(
      id,
      getEmpresaId(req),
    );
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Atualizar agendamento',
    description:
      'Atualiza parcialmente um agendamento da empresa autenticada. Endpoint usado para alterar data, horário, cliente, profissional, serviço, unidade, status ou observações conforme os campos permitidos pelo DTO.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do agendamento que será atualizado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateAgendamentoDto,
    description: 'Dados permitidos para atualização parcial do agendamento.',
  })
  @ApiOkResponse({
    description: 'Agendamento atualizado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        profissionalId: '550e8400-e29b-41d4-a716-446655440000',
        servicoId: '550e8400-e29b-41d4-a716-446655440000',
        unidadeId: '550e8400-e29b-41d4-a716-446655440000',
        dataHoraInicio: '2026-06-14T15:00:00.000Z',
        dataHoraFim: '2026-06-14T16:00:00.000Z',
        status: 'CONFIRMADO',
        observacoes: 'Horário reagendado pelo painel administrativo.',
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'ID inválido, payload inválido, conflito de horário ou dados fora das regras permitidas.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description: 'Agendamento não encontrado para a empresa autenticada.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAgendamentoDto: UpdateAgendamentoDto,
    @Request() req: any,
  ) {
    return this.agendamentosService.update(
      id,
      updateAgendamentoDto,
      getEmpresaId(req),
    );
  }

  @Patch(':id/cancelar')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Cancelar agendamento',
    description:
      'Cancela um agendamento da empresa autenticada sem remover fisicamente o registro. Usado para preservar histórico, relatórios, auditoria e rastreabilidade operacional.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do agendamento que será cancelado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Agendamento cancelado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        status: 'CANCELADO',
        updatedAt: '2026-06-14T11:30:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou agendamento sem permissão de cancelamento.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description: 'Agendamento não encontrado para a empresa autenticada.',
  })
  cancelar(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    return this.agendamentosService.cancelar(
      id,
      getEmpresaId(req),
    );
  }
}