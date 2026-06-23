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

import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@ApiTags('Clientes')
@ApiBearerAuth('JWT')
@Controller('clientes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Criar cliente',
    description:
      'Cria um cliente para a empresa autenticada. Endpoint usado pelo painel administrativo para cadastrar clientes vinculados ao contexto multiempresa do usuário logado.',
  })
  @ApiBody({
    type: CreateClienteDto,
    description: 'Dados necessários para criação de um cliente.',
  })
  @ApiCreatedResponse({
    description: 'Cliente criado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Maria Silva',
        telefone: '83999999999',
        email: 'maria@email.com',
        dataNascimento: '1995-05-20T00:00:00.000Z',
        fotoUrl: '/uploads/clientes/maria-silva.png',
        observacoes: 'Cliente prefere atendimento no período da tarde.',
        ativo: true,
        ativoPortal: true,
        aceitouTermos: false,
        dataAceiteTermos: null,
        ultimoAcessoPortal: null,
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
    @Body() createClienteDto: CreateClienteDto,
    @Request() req: any,
  ) {
    return this.clientesService.create(
      createClienteDto,
      getEmpresaId(req),
    );
  }

  @Get()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Listar clientes',
    description:
      'Lista os clientes da empresa autenticada com suporte a paginação. Endpoint preparado para painel administrativo, dashboard, busca mobile e integrações internas.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Número da página da listagem.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 20,
    description: 'Quantidade de registros por página.',
  })
  @ApiOkResponse({
    description: 'Clientes retornados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            empresaId: '550e8400-e29b-41d4-a716-446655440000',
            nome: 'Maria Silva',
            telefone: '83999999999',
            email: 'maria@email.com',
            dataNascimento: '1995-05-20T00:00:00.000Z',
            fotoUrl: '/uploads/clientes/maria-silva.png',
            observacoes: 'Cliente prefere atendimento no período da tarde.',
            ativo: true,
            ativoPortal: true,
            aceitouTermos: false,
            dataAceiteTermos: null,
            ultimoAcessoPortal: null,
            createdAt: '2026-06-14T10:00:00.000Z',
            updatedAt: '2026-06-14T10:00:00.000Z',
          },
        ],
        meta: {
          page: 1,
          limit: 20,
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
    return this.clientesService.findAll(
      getEmpresaId(req),
      query,
    );
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Buscar cliente por ID',
    description:
      'Busca um cliente específico pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Cliente encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Maria Silva',
        telefone: '83999999999',
        email: 'maria@email.com',
        dataNascimento: '1995-05-20T00:00:00.000Z',
        fotoUrl: '/uploads/clientes/maria-silva.png',
        observacoes: 'Cliente prefere atendimento no período da tarde.',
        ativo: true,
        ativoPortal: true,
        aceitouTermos: false,
        dataAceiteTermos: null,
        ultimoAcessoPortal: null,
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
    description: 'Cliente não encontrado para a empresa autenticada.',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    return this.clientesService.findOne(
      id,
      getEmpresaId(req),
    );
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Atualizar cliente',
    description:
      'Atualiza os dados de um cliente existente da empresa autenticada. Endpoint usado pelo painel administrativo para manutenção cadastral.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente que será atualizado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateClienteDto,
    description: 'Dados permitidos para atualização do cliente.',
  })
  @ApiOkResponse({
    description: 'Cliente atualizado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Maria Silva Atualizada',
        telefone: '83999999999',
        email: 'maria.atualizada@email.com',
        dataNascimento: '1995-05-20T00:00:00.000Z',
        fotoUrl: '/uploads/clientes/maria-silva.png',
        observacoes: 'Cliente atualizada pelo painel administrativo.',
        ativo: true,
        ativoPortal: true,
        aceitouTermos: false,
        dataAceiteTermos: null,
        ultimoAcessoPortal: null,
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
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente não encontrado para a empresa autenticada.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClienteDto: UpdateClienteDto,
    @Request() req: any,
  ) {
    return this.clientesService.update(
      id,
      updateClienteDto,
      getEmpresaId(req),
    );
  }

  @Patch(':id/inativar')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Inativar cliente',
    description:
      'Inativa um cliente da empresa autenticada sem remover o registro do banco. Usado para preservar histórico de agendamentos, financeiro, fidelidade e auditoria.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente que será inativado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Cliente inativado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Maria Silva',
        telefone: '83999999999',
        email: 'maria@email.com',
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
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description: 'Cliente não encontrado para a empresa autenticada.',
  })
  inativar(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    return this.clientesService.inativar(
      id,
      getEmpresaId(req),
    );
  }
}