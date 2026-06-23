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

import { BeneficiosService } from './beneficios.service';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@ApiTags('Beneficios')
@ApiBearerAuth('JWT')
@Controller('beneficios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BeneficiosController {
  constructor(private readonly beneficiosService: BeneficiosService) {}

  @Post()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Criar benefício',
    description:
      'Cria um benefício de fidelidade para a empresa autenticada. Endpoint administrativo permitido para ADMIN e GERENTE.',
  })
  @ApiBody({
    type: CreateBeneficioDto,
    description: 'Dados necessários para criação de um benefício.',
  })
  @ApiCreatedResponse({
    description: 'Benefício criado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Desconto especial',
        descricao: 'Benefício para clientes fidelizados.',
        pontosNecessarios: 100,
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
  create(@Req() req: any, @Body() dto: CreateBeneficioDto) {
    return this.beneficiosService.create(req.user.empresaId, dto);
  }

  @Get()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Listar benefícios',
    description:
      'Lista os benefícios cadastrados para a empresa autenticada. Endpoint disponível para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiOkResponse({
    description: 'Benefícios retornados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Desconto especial',
          descricao: 'Benefício para clientes fidelizados.',
          pontosNecessarios: 100,
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
  findAll(@Req() req: any) {
    return this.beneficiosService.findAll(req.user.empresaId);
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Buscar benefício por ID',
    description:
      'Busca um benefício específico pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do benefício.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Benefício encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Desconto especial',
        descricao: 'Benefício para clientes fidelizados.',
        pontosNecessarios: 100,
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
    description: 'Benefício não encontrado para a empresa autenticada.',
  })
  findOne(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.beneficiosService.findOne(req.user.empresaId, id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Atualizar benefício',
    description:
      'Atualiza os dados de um benefício existente da empresa autenticada. Endpoint administrativo permitido para ADMIN e GERENTE.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do benefício que será atualizado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateBeneficioDto,
    description: 'Dados permitidos para atualização do benefício.',
  })
  @ApiOkResponse({
    description: 'Benefício atualizado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Desconto VIP',
        descricao: 'Benefício atualizado para clientes fidelizados.',
        pontosNecessarios: 150,
        ativo: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido, payload inválido ou dados obrigatórios ausentes.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Benefício não encontrado para a empresa autenticada.',
  })
  update(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBeneficioDto,
  ) {
    return this.beneficiosService.update(req.user.empresaId, id, dto);
  }

  @Patch(':id/inativar')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Inativar benefício',
    description:
      'Inativa um benefício da empresa autenticada sem remover o registro do banco. Endpoint administrativo permitido para ADMIN e GERENTE.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do benefício que será inativado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Benefício inativado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Desconto especial',
        descricao: 'Benefício para clientes fidelizados.',
        pontosNecessarios: 100,
        ativo: false,
        createdAt: '2026-06-14T10:00:00.000Z',
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
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Benefício não encontrado para a empresa autenticada.',
  })
  inativar(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.beneficiosService.inativar(req.user.empresaId, id);
  }
}