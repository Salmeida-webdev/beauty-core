import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  Request,
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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@ApiTags('Servicos')
@ApiBearerAuth('JWT')
@Controller('servicos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Post()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Criar serviço',
    description:
      'Cria um serviço para a empresa autenticada. Endpoint administrativo usado para cadastrar procedimentos, atendimentos, valores e duração dos serviços oferecidos.',
  })
  @ApiBody({
    type: CreateServicoDto,
    description: 'Dados necessários para criação de um serviço.',
  })
  @ApiCreatedResponse({
    description: 'Serviço criado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Limpeza de Pele',
        descricao: 'Procedimento estético facial completo.',
        preco: 150,
        duracaoMinutos: 60,
        ativo: true,
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
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  create(
    @Body() createServicoDto: CreateServicoDto,
    @Request() req: any,
  ) {
    return this.servicosService.create(
      createServicoDto,
      req.user.empresaId,
    );
  }

  @Get()
  @Roles(
    'ADMIN',
    'GERENTE',
    'RECEPCAO',
    'PROFISSIONAL',
  )
  @ApiOperation({
    summary: 'Listar serviços',
    description:
      'Lista os serviços cadastrados para a empresa autenticada. Endpoint usado pelo painel administrativo, recepção e profissionais para consulta de serviços disponíveis.',
  })
  @ApiOkResponse({
    description: 'Serviços retornados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Limpeza de Pele',
          descricao: 'Procedimento estético facial completo.',
          preco: 150,
          duracaoMinutos: 60,
          ativo: true,
          createdAt: '2026-06-14T10:00:00.000Z',
          updatedAt: '2026-06-14T10:00:00.000Z',
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  findAll(@Request() req: any) {
    return this.servicosService.findAll(
      req.user.empresaId,
    );
  }

  @Get(':id')
  @Roles(
    'ADMIN',
    'GERENTE',
    'RECEPCAO',
    'PROFISSIONAL',
  )
  @ApiOperation({
    summary: 'Buscar serviço por ID',
    description:
      'Busca um serviço específico pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do serviço.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Serviço encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Limpeza de Pele',
        descricao: 'Procedimento estético facial completo.',
        preco: 150,
        duracaoMinutos: 60,
        ativo: true,
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
    description: 'Serviço não encontrado para a empresa autenticada.',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    return this.servicosService.findOne(
      id,
      req.user.empresaId,
    );
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Atualizar serviço',
    description:
      'Atualiza parcialmente um serviço da empresa autenticada. Endpoint administrativo usado para alterar nome, descrição, preço, duração ou demais campos permitidos pelo DTO.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do serviço que será atualizado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateServicoDto,
    description: 'Dados permitidos para atualização parcial do serviço.',
  })
  @ApiOkResponse({
    description: 'Serviço atualizado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Limpeza de Pele Premium',
        descricao: 'Procedimento estético facial completo atualizado.',
        preco: 180,
        duracaoMinutos: 75,
        ativo: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido, payload inválido ou dados fora das regras permitidas.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Serviço não encontrado para a empresa autenticada.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServicoDto: UpdateServicoDto,
    @Request() req: any,
  ) {
    return this.servicosService.update(
      id,
      updateServicoDto,
      req.user.empresaId,
    );
  }

  @Patch(':id/inativar')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Inativar serviço',
    description:
      'Inativa um serviço da empresa autenticada sem remover fisicamente o registro. Usado para preservar histórico de agendamentos, relatórios e auditoria.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do serviço que será inativado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Serviço inativado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Limpeza de Pele',
        ativo: false,
        updatedAt: '2026-06-14T11:30:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou serviço sem permissão de inativação.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Serviço não encontrado para a empresa autenticada.',
  })
  inativar(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    return this.servicosService.inativar(
      id,
      req.user.empresaId,
    );
  }
}