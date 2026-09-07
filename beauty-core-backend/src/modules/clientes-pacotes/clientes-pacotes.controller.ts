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

import { ClientesPacotesService } from './clientes-pacotes.service';
import { CreateClientePacoteDto } from './dto/create-cliente-pacote.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';

@ApiTags('Clientes Pacotes')
@ApiBearerAuth('JWT')
@Controller('clientes-pacotes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesPacotesController {
  constructor(
    private readonly clientesPacotesService: ClientesPacotesService,
  ) {}

  @Post()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Vincular pacote ao cliente',
    description:
      'Vincula um pacote a um cliente da empresa autenticada. Endpoint usado pelo painel administrativo para venda, liberação ou associação de pacotes de sessões a clientes.',
  })
  @ApiBody({
    type: CreateClientePacoteDto,
    description: 'Dados necessários para vincular um pacote a um cliente.',
  })
  @ApiCreatedResponse({
    description: 'Pacote vinculado ao cliente com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        pacoteId: '550e8400-e29b-41d4-a716-446655440000',
        sessoesTotais: 10,
        sessoesUsadas: 0,
        sessoesRestantes: 10,
        valorPago: 500,
        status: 'ATIVO',
        dataInicio: '2026-06-14T10:00:00.000Z',
        dataFim: '2026-07-14T10:00:00.000Z',
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
      'Usuário sem permissão. Permitido apenas para ADMIN, GERENTE e RECEPCAO.',
  })
  create(
    @Req() req: any,
    @Body() dto: CreateClientePacoteDto,
  ) {
    return this.clientesPacotesService.create(
      getEmpresaId(req),
      dto,
    );
  }

  @Get()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Listar pacotes de clientes',
    description:
      'Lista todos os pacotes vinculados a clientes da empresa autenticada. Endpoint usado para acompanhamento operacional, controle de sessões e gestão de pacotes ativos ou cancelados.',
  })
  @ApiOkResponse({
    description: 'Pacotes de clientes retornados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          clienteId: '550e8400-e29b-41d4-a716-446655440000',
          pacoteId: '550e8400-e29b-41d4-a716-446655440000',
          sessoesTotais: 10,
          sessoesUsadas: 2,
          sessoesRestantes: 8,
          valorPago: 500,
          status: 'ATIVO',
          dataInicio: '2026-06-14T10:00:00.000Z',
          dataFim: '2026-07-14T10:00:00.000Z',
          createdAt: '2026-06-14T10:00:00.000Z',
          updatedAt: '2026-06-14T11:00:00.000Z',
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
    return this.clientesPacotesService.findAll(
      getEmpresaId(req),
    );
  }

  @Get('cliente/:clienteId')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Listar pacotes de um cliente',
    description:
      'Lista os pacotes vinculados a um cliente específico da empresa autenticada. Endpoint útil para histórico do cliente, área administrativa, atendimento e futura área mobile do cliente.',
  })
  @ApiParam({
    name: 'clienteId',
    description: 'ID do cliente.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Pacotes do cliente retornados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          clienteId: '550e8400-e29b-41d4-a716-446655440000',
          pacoteId: '550e8400-e29b-41d4-a716-446655440000',
          sessoesTotais: 10,
          sessoesUsadas: 2,
          sessoesRestantes: 8,
          valorPago: 500,
          status: 'ATIVO',
          dataInicio: '2026-06-14T10:00:00.000Z',
          dataFim: '2026-07-14T10:00:00.000Z',
          createdAt: '2026-06-14T10:00:00.000Z',
          updatedAt: '2026-06-14T11:00:00.000Z',
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'clienteId inválido. O parâmetro deve ser um UUID válido.',
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
  findByCliente(
    @Req() req: any,
    @Param('clienteId', ParseUUIDPipe) clienteId: string,
  ) {
    return this.clientesPacotesService.findByCliente(
      getEmpresaId(req),
      clienteId,
    );
  }

  @Patch(':id/usar-sessao')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  @ApiOperation({
    summary: 'Usar sessão do pacote',
    description:
      'Registra o uso de uma sessão de um pacote vinculado a cliente. Endpoint usado no atendimento para controlar sessões utilizadas e restantes.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do pacote vinculado ao cliente.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Sessão utilizada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        pacoteId: '550e8400-e29b-41d4-a716-446655440000',
        sessoesTotais: 10,
        sessoesUsadas: 3,
        sessoesRestantes: 7,
        status: 'ATIVO',
        updatedAt: '2026-06-14T11:30:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'ID inválido, pacote sem sessões disponíveis ou pacote não elegível para uso.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL.',
  })
  @ApiNotFoundResponse({
    description: 'Pacote do cliente não encontrado para a empresa autenticada.',
  })
  usarSessao(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.clientesPacotesService.usarSessao(
      getEmpresaId(req),
      id,
    );
  }

  @Patch(':id/cancelar')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Cancelar pacote do cliente',
    description:
      'Cancela um pacote vinculado a cliente da empresa autenticada. Endpoint administrativo usado para interromper uso futuro sem remover o histórico.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do pacote vinculado ao cliente que será cancelado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Pacote do cliente cancelado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        pacoteId: '550e8400-e29b-41d4-a716-446655440000',
        sessoesTotais: 10,
        sessoesUsadas: 3,
        sessoesRestantes: 7,
        status: 'CANCELADO',
        updatedAt: '2026-06-14T12:00:00.000Z',
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
    description: 'Pacote do cliente não encontrado para a empresa autenticada.',
  })
  cancelar(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.clientesPacotesService.cancelar(
      getEmpresaId(req),
      id,
    );
  }
}