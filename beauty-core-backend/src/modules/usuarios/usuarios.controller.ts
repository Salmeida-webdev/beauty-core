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

import { Role } from '@prisma/client';

import { Roles } from '../../shared/decorators/roles.decorator';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosService } from './usuarios.service';

type AuthenticatedAdminRequest = {
  user: {
    id: string;
    email: string;
    role: Role;
    empresaId?: string | null;
  };
};

@ApiTags('Usuarios')
@ApiBearerAuth('JWT')
@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
  @ApiOperation({
    summary: 'Criar usuário',
    description:
      'Cria um usuário administrativo ou operacional. SUPER_ADMIN pode criar usuários globais ou vinculados a empresas. ADMIN e GERENTE só podem criar usuários permitidos dentro da própria empresa.',
  })
  @ApiBody({
    type: CreateUsuarioDto,
    description: 'Dados necessários para criação de um usuário.',
  })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Maria Silva',
        email: 'maria@beautycore.com',
        telefone: '83999999999',
        role: 'GERENTE',
        ativo: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Dados inválidos, e-mail já cadastrado ou campos obrigatórios ausentes.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão, tentativa de escalação de privilégios ou vínculo inválido de empresa.',
  })
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Request() req: AuthenticatedAdminRequest,
  ) {
    return this.usuariosService.create(createUsuarioDto, req.user);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
  @ApiOperation({
    summary: 'Listar usuários',
    description:
      'Lista usuários com suporte a paginação. SUPER_ADMIN pode ter visão global. ADMIN e GERENTE visualizam apenas usuários permitidos dentro da própria empresa.',
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
    name: 'search',
    required: false,
    example: 'maria',
    description: 'Busca por nome ou e-mail.',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    example: 'createdAt',
    description:
      'Campo de ordenação permitido: nome, email, role, createdAt, updatedAt ou ultimoLogin.',
  })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    example: 'desc',
    description: 'Direção da ordenação: asc ou desc.',
  })
  @ApiOkResponse({
    description: 'Usuários retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            empresaId: '550e8400-e29b-41d4-a716-446655440000',
            nome: 'Maria Silva',
            email: 'maria@beautycore.com',
            telefone: '83999999999',
            role: 'GERENTE',
            ativo: true,
            createdAt: '2026-06-14T10:00:00.000Z',
            updatedAt: '2026-06-14T10:00:00.000Z',
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
    description: 'Usuário sem permissão.',
  })
  findAll(
    @Request() req: AuthenticatedAdminRequest,
    @Query() query: PaginationDto,
  ) {
    return this.usuariosService.findAll(req.user, query);
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
  @ApiOperation({
    summary: 'Buscar usuário por ID',
    description:
      'Busca um usuário específico pelo ID. SUPER_ADMIN pode consultar usuários globais ou de empresas. ADMIN e GERENTE só podem consultar usuários permitidos dentro da própria empresa.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Usuário encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Maria Silva',
        email: 'maria@beautycore.com',
        telefone: '83999999999',
        role: 'GERENTE',
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
    description: 'Usuário sem permissão para consultar este usuário.',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedAdminRequest,
  ) {
    return this.usuariosService.findOne(id, req.user);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
  @ApiOperation({
    summary: 'Atualizar usuário',
    description:
      'Atualiza parcialmente um usuário. Aplica política central de roles para impedir escalação de privilégios, alteração indevida da própria role e edição de usuários superiores.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário que será atualizado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateUsuarioDto,
    description: 'Dados permitidos para atualização parcial do usuário.',
  })
  @ApiOkResponse({
    description: 'Usuário atualizado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Maria Silva Atualizada',
        email: 'maria.atualizada@beautycore.com',
        telefone: '83999999999',
        role: 'GERENTE',
        ativo: true,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'ID inválido, payload inválido ou dados fora das regras permitidas.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão, tentativa de escalação de privilégios ou alteração indevida de role.',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Request() req: AuthenticatedAdminRequest,
  ) {
    return this.usuariosService.update(id, updateUsuarioDto, req.user);
  }

  @Patch(':id/inativar')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.GERENTE)
  @ApiOperation({
    summary: 'Inativar usuário',
    description:
      'Inativa um usuário sem remover fisicamente o registro. Aplica política central de roles para impedir que usuários inativem a própria conta, perfis superiores ou usuários fora do próprio tenant.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário que será inativado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Usuário inativado com sucesso.',
    schema: {
      example: {
        message: 'Usuário inativado com sucesso',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou usuário sem permissão de inativação.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão para inativar este usuário.',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  inativar(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthenticatedAdminRequest,
  ) {
    return this.usuariosService.inativar(id, req.user);
  }
}