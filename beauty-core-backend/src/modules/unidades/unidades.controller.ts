import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { UnidadesService } from './unidades.service';

@ApiTags('Unidades')
@ApiBearerAuth('JWT')
@Controller('unidades')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Post()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Criar unidade',
    description:
      'Cria uma unidade da empresa autenticada. Endpoint administrativo usado para cadastrar filiais, locais de atendimento, endereços e estruturas físicas da operação.',
  })
  @ApiBody({
    type: CreateUnidadeDto,
    description: 'Dados necessários para criação de uma unidade.',
  })
  @ApiCreatedResponse({
    description: 'Unidade criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Unidade Centro',
        endereco: 'Rua Principal, 123',
        cidade: 'João Pessoa',
        estado: 'PB',
        telefone: '83999999999',
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
    @Body() createUnidadeDto: CreateUnidadeDto,
    @Request() req: any,
  ) {
    return this.unidadesService.create(
      createUnidadeDto,
      req.user.empresaId,
    );
  }

  @Get()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Listar unidades',
    description:
      'Lista as unidades cadastradas para a empresa autenticada. Endpoint usado pelo painel administrativo para consultar filiais, locais de atendimento e unidades ativas.',
  })
  @ApiOkResponse({
    description: 'Unidades retornadas com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Unidade Centro',
          endereco: 'Rua Principal, 123',
          cidade: 'João Pessoa',
          estado: 'PB',
          telefone: '83999999999',
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
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findAll(@Request() req: any) {
    return this.unidadesService.findAll(
      req.user.empresaId,
    );
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Buscar unidade por ID',
    description:
      'Busca uma unidade específica pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da unidade.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Unidade encontrada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Unidade Centro',
        endereco: 'Rua Principal, 123',
        cidade: 'João Pessoa',
        estado: 'PB',
        telefone: '83999999999',
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
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Unidade não encontrada para a empresa autenticada.',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    return this.unidadesService.findOne(
      id,
      req.user.empresaId,
    );
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Atualizar unidade',
    description:
      'Atualiza parcialmente uma unidade da empresa autenticada. Endpoint administrativo usado para alterar nome, endereço, telefone, cidade, estado ou demais campos permitidos pelo DTO.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da unidade que será atualizada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateUnidadeDto,
    description: 'Dados permitidos para atualização parcial da unidade.',
  })
  @ApiOkResponse({
    description: 'Unidade atualizada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Unidade Centro Premium',
        endereco: 'Rua Principal, 456',
        cidade: 'João Pessoa',
        estado: 'PB',
        telefone: '83999999999',
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
    description: 'Unidade não encontrada para a empresa autenticada.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUnidadeDto: UpdateUnidadeDto,
    @Request() req: any,
  ) {
    return this.unidadesService.update(
      id,
      updateUnidadeDto,
      req.user.empresaId,
    );
  }

  @Patch(':id/inativar')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Inativar unidade',
    description:
      'Inativa uma unidade da empresa autenticada sem remover fisicamente o registro. Usado para preservar histórico de agendamentos, relatórios e auditoria.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da unidade que será inativada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Unidade inativada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Unidade Centro',
        ativo: false,
        updatedAt: '2026-06-14T11:30:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou unidade sem permissão de inativação.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Unidade não encontrada para a empresa autenticada.',
  })
  inativar(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    return this.unidadesService.inativar(
      id,
      req.user.empresaId,
    );
  }
}