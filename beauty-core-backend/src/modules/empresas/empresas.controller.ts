import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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

import { Role } from '@prisma/client';

import { Roles } from '../../shared/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresasService } from './empresas.service';

@ApiTags('Empresas')
@ApiBearerAuth('JWT')
@Controller('empresas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Criar empresa',
    description:
      'Cria uma nova empresa no Beauty Core. Endpoint exclusivo do SUPER_ADMIN para cadastro de empresas dentro da estrutura white-label/multiempresa.',
  })
  @ApiBody({
    type: CreateEmpresaDto,
    description: 'Dados necessários para criação da empresa.',
  })
  @ApiCreatedResponse({
    description: 'Empresa criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Clínica Beauty Core',
        slug: 'clinica-beauty-core',
        email: 'contato@beautycore.com',
        telefone: '83999999999',
        logo: null,
        corPrimaria: '#111827',
        dominio: null,
        plano: 'PREMIUM',
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
    description: 'Usuário sem permissão. Permitido apenas para SUPER_ADMIN.',
  })
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Listar empresas',
    description:
      'Lista todas as empresas cadastradas no sistema. Endpoint exclusivo do SUPER_ADMIN para gestão global da plataforma multiempresa.',
  })
  @ApiOkResponse({
    description: 'Empresas retornadas com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Clínica Beauty Core',
          slug: 'clinica-beauty-core',
          email: 'contato@beautycore.com',
          telefone: '83999999999',
          logo: null,
          corPrimaria: '#111827',
          dominio: null,
          plano: 'PREMIUM',
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
    description: 'Usuário sem permissão. Permitido apenas para SUPER_ADMIN.',
  })
  findAll() {
    return this.empresasService.findAll();
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Buscar empresa por ID',
    description:
      'Busca uma empresa específica pelo ID. Endpoint exclusivo do SUPER_ADMIN para consulta detalhada de empresas cadastradas na plataforma.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da empresa.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Empresa encontrada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Clínica Beauty Core',
        slug: 'clinica-beauty-core',
        email: 'contato@beautycore.com',
        telefone: '83999999999',
        logo: null,
        corPrimaria: '#111827',
        dominio: null,
        plano: 'PREMIUM',
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
    description: 'Usuário sem permissão. Permitido apenas para SUPER_ADMIN.',
  })
  @ApiNotFoundResponse({
    description: 'Empresa não encontrada.',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.empresasService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Atualizar empresa',
    description:
      'Atualiza os dados de uma empresa existente. Endpoint exclusivo do SUPER_ADMIN para manutenção cadastral, plano, domínio e configurações globais da estrutura multiempresa.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da empresa que será atualizada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateEmpresaDto,
    description: 'Dados permitidos para atualização parcial da empresa.',
  })
  @ApiOkResponse({
    description: 'Empresa atualizada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Clínica Beauty Core Premium',
        slug: 'clinica-beauty-core',
        email: 'contato@beautycore.com',
        telefone: '83999999999',
        logo: null,
        corPrimaria: '#111827',
        dominio: 'clinica.com.br',
        plano: 'PREMIUM',
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
    description: 'Usuário sem permissão. Permitido apenas para SUPER_ADMIN.',
  })
  @ApiNotFoundResponse({
    description: 'Empresa não encontrada.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    return this.empresasService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Inativar empresa',
    description:
      'Inativa uma empresa sem remover fisicamente o registro do banco. Endpoint exclusivo do SUPER_ADMIN para preservar histórico, auditoria e integridade dos relacionamentos.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da empresa que será inativada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Empresa inativada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Clínica Beauty Core',
        slug: 'clinica-beauty-core',
        plano: 'PREMIUM',
        ativo: false,
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
    description: 'Usuário sem permissão. Permitido apenas para SUPER_ADMIN.',
  })
  @ApiNotFoundResponse({
    description: 'Empresa não encontrada.',
  })
  inativar(@Param('id', ParseUUIDPipe) id: string) {
    return this.empresasService.inativar(id);
  }
}
