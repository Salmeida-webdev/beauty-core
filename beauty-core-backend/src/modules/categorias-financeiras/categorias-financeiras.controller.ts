import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CategoriasFinanceirasService } from './categorias-financeiras.service';
import { CreateCategoriaFinanceiraDto } from './dto/create-categoria-financeira.dto';
import { UpdateCategoriaFinanceiraDto } from './dto/update-categoria-financeira.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

type CompanyAuthenticatedRequest = {
  user: {
    empresaId: string;
    sub?: string;
    id?: string;
    usuarioId?: string;
    clienteId?: string;
    role?: import('@prisma/client').Role;
  };
};

@ApiTags('Categorias Financeiras')
@ApiBearerAuth('JWT')
@Controller('categorias-financeiras')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'GERENTE')
export class CategoriasFinanceirasController {
  constructor(
    private readonly categoriasFinanceirasService: CategoriasFinanceirasService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar categoria financeira',
    description:
      'Cria uma categoria financeira para a empresa autenticada. Endpoint administrativo usado para organizar receitas, despesas e movimentações financeiras.',
  })
  @ApiBody({
    type: CreateCategoriaFinanceiraDto,
    description: 'Dados necessários para criação da categoria financeira.',
  })
  @ApiCreatedResponse({
    description: 'Categoria financeira criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Procedimentos Estéticos',
        descricao: 'Categoria usada para receitas de serviços estéticos.',
        tipo: 'RECEITA',
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
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  create(
    @Req() req: CompanyAuthenticatedRequest,
    @Body() dto: CreateCategoriaFinanceiraDto,
  ) {
    return this.categoriasFinanceirasService.create(req.user.empresaId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar categorias financeiras',
    description:
      'Lista as categorias financeiras cadastradas para a empresa autenticada. Usado pelo módulo financeiro para classificar receitas, despesas e relatórios.',
  })
  @ApiOkResponse({
    description: 'Categorias financeiras retornadas com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Procedimentos Estéticos',
          descricao: 'Categoria usada para receitas de serviços estéticos.',
          tipo: 'RECEITA',
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
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findAll(@Req() req: CompanyAuthenticatedRequest) {
    return this.categoriasFinanceirasService.findAll(req.user.empresaId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar categoria financeira por ID',
    description:
      'Busca uma categoria financeira específica pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria financeira.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Categoria financeira encontrada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Procedimentos Estéticos',
        descricao: 'Categoria usada para receitas de serviços estéticos.',
        tipo: 'RECEITA',
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
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description:
      'Categoria financeira não encontrada para a empresa autenticada.',
  })
  findOne(
    @Req() req: CompanyAuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.categoriasFinanceirasService.findOne(req.user.empresaId, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar categoria financeira',
    description:
      'Atualiza os dados de uma categoria financeira existente da empresa autenticada. Endpoint administrativo permitido para ADMIN e GERENTE.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria financeira que será atualizada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateCategoriaFinanceiraDto,
    description: 'Dados permitidos para atualização da categoria financeira.',
  })
  @ApiOkResponse({
    description: 'Categoria financeira atualizada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Serviços Estéticos Premium',
        descricao: 'Categoria atualizada para receitas de serviços premium.',
        tipo: 'RECEITA',
        ativo: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'ID inválido, payload inválido ou dados obrigatórios ausentes.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description:
      'Categoria financeira não encontrada para a empresa autenticada.',
  })
  update(
    @Req() req: CompanyAuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoriaFinanceiraDto,
  ) {
    return this.categoriasFinanceirasService.update(
      req.user.empresaId,
      id,
      dto,
    );
  }

  @Patch(':id/inativar')
  @ApiOperation({
    summary: 'Inativar categoria financeira',
    description:
      'Inativa uma categoria financeira da empresa autenticada sem remover o registro do banco. Usado para preservar histórico financeiro e relatórios.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria financeira que será inativada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Categoria financeira inativada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Procedimentos Estéticos',
        descricao: 'Categoria usada para receitas de serviços estéticos.',
        tipo: 'RECEITA',
        ativo: false,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T11:30:00.000Z',
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
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description:
      'Categoria financeira não encontrada para a empresa autenticada.',
  })
  inativar(
    @Req() req: CompanyAuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.categoriasFinanceirasService.inativar(req.user.empresaId, id);
  }
}
