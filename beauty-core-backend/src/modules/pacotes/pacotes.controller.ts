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

import { PacotesService } from './pacotes.service';
import { CreatePacoteDto } from './dto/create-pacote.dto';
import { UpdatePacoteDto } from './dto/update-pacote.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';

type Group15AuthenticatedRequest = {
  user: {
    empresaId: string;
    empresa_id: string;
    sub: string;
    id: string;
    usuarioId: string;
    clienteId: string;
    role: string;
    tipoUsuario: string;
    email: string;
    nome: string;
    [key: string]: string | undefined;
  };
};

@ApiTags('Pacotes')
@ApiBearerAuth('JWT')
@Controller('pacotes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PacotesController {
  constructor(private readonly pacotesService: PacotesService) {}

  @Post()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Criar pacote',
    description:
      'Cria um pacote de serviços para a empresa autenticada. Endpoint administrativo usado para cadastrar pacotes com sessões, valores, validade e regras comerciais.',
  })
  @ApiBody({
    type: CreatePacoteDto,
    description: 'Dados necessários para criação de um pacote.',
  })
  @ApiCreatedResponse({
    description: 'Pacote criado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Pacote Limpeza de Pele',
        descricao: 'Pacote com 5 sessões de limpeza de pele.',
        quantidadeSessoes: 5,
        valor: 500,
        validadeDias: 90,
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
    @Req() req: Group15AuthenticatedRequest,
    @Body() dto: CreatePacoteDto,
  ) {
    return this.pacotesService.create(getEmpresaId(req), dto);
  }

  @Get()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Listar pacotes',
    description:
      'Lista os pacotes cadastrados para a empresa autenticada. Endpoint usado pelo painel administrativo para gestão comercial de pacotes de serviços.',
  })
  @ApiOkResponse({
    description: 'Pacotes retornados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Pacote Limpeza de Pele',
          descricao: 'Pacote com 5 sessões de limpeza de pele.',
          quantidadeSessoes: 5,
          valor: 500,
          validadeDias: 90,
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
  findAll(@Req() req: Group15AuthenticatedRequest) {
    return this.pacotesService.findAll(getEmpresaId(req));
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Buscar pacote por ID',
    description:
      'Busca um pacote específico pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do pacote.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Pacote encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Pacote Limpeza de Pele',
        descricao: 'Pacote com 5 sessões de limpeza de pele.',
        quantidadeSessoes: 5,
        valor: 500,
        validadeDias: 90,
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
    description: 'Pacote não encontrado para a empresa autenticada.',
  })
  findOne(
    @Req() req: Group15AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.pacotesService.findOne(getEmpresaId(req), id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Atualizar pacote',
    description:
      'Atualiza parcialmente um pacote da empresa autenticada. Endpoint administrativo usado para alterar nome, descrição, quantidade de sessões, valor, validade ou demais campos permitidos pelo DTO.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do pacote que será atualizado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdatePacoteDto,
    description: 'Dados permitidos para atualização parcial do pacote.',
  })
  @ApiOkResponse({
    description: 'Pacote atualizado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Pacote Limpeza de Pele Premium',
        descricao: 'Pacote atualizado com 6 sessões de limpeza de pele.',
        quantidadeSessoes: 6,
        valor: 600,
        validadeDias: 120,
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
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Pacote não encontrado para a empresa autenticada.',
  })
  update(
    @Req() req: Group15AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePacoteDto,
  ) {
    return this.pacotesService.update(getEmpresaId(req), id, dto);
  }

  @Patch(':id/inativar')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Inativar pacote',
    description:
      'Inativa um pacote da empresa autenticada sem remover fisicamente o registro. Usado para preservar histórico comercial, vínculos com clientes e auditoria.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do pacote que será inativado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Pacote inativado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Pacote Limpeza de Pele',
        ativo: false,
        updatedAt: '2026-06-14T11:30:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou pacote sem permissão de inativação.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Pacote não encontrado para a empresa autenticada.',
  })
  inativar(
    @Req() req: Group15AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.pacotesService.inativar(getEmpresaId(req), id);
  }
}
