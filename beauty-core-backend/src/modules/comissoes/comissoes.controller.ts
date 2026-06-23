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

import { ComissoesService } from './comissoes.service';

import { CreateComissaoDto } from './dto/create-comissao.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';

@ApiTags('Comissoes')
@ApiBearerAuth('JWT')
@Controller('comissoes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'GERENTE')
export class ComissoesController {
  constructor(
    private readonly comissoesService: ComissoesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar comissão',
    description:
      'Cria uma comissão para a empresa autenticada. Endpoint administrativo usado para registrar comissão de profissional vinculada a serviços, atendimentos ou movimentações financeiras.',
  })
  @ApiBody({
    type: CreateComissaoDto,
    description: 'Dados necessários para criação da comissão.',
  })
  @ApiCreatedResponse({
    description: 'Comissão criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        profissionalId: '550e8400-e29b-41d4-a716-446655440000',
        agendamentoId: '550e8400-e29b-41d4-a716-446655440000',
        valorBase: 200,
        percentual: 10,
        valorComissao: 20,
        status: 'PENDENTE',
        dataPagamento: null,
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
    @Req() req: any,
    @Body() dto: CreateComissaoDto,
  ) {
    return this.comissoesService.create(
      getEmpresaId(req),
      dto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Listar comissões',
    description:
      'Lista as comissões cadastradas para a empresa autenticada. Endpoint administrativo para acompanhamento de comissões pendentes, pagas e histórico financeiro de profissionais.',
  })
  @ApiOkResponse({
    description: 'Comissões retornadas com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          profissionalId: '550e8400-e29b-41d4-a716-446655440000',
          agendamentoId: '550e8400-e29b-41d4-a716-446655440000',
          valorBase: 200,
          percentual: 10,
          valorComissao: 20,
          status: 'PENDENTE',
          dataPagamento: null,
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
  findAll(@Req() req: any) {
    return this.comissoesService.findAll(
      getEmpresaId(req),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar comissão por ID',
    description:
      'Busca uma comissão específica pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da comissão.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Comissão encontrada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        profissionalId: '550e8400-e29b-41d4-a716-446655440000',
        agendamentoId: '550e8400-e29b-41d4-a716-446655440000',
        valorBase: 200,
        percentual: 10,
        valorComissao: 20,
        status: 'PENDENTE',
        dataPagamento: null,
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
    description: 'Comissão não encontrada para a empresa autenticada.',
  })
  findOne(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.comissoesService.findOne(
      getEmpresaId(req),
      id,
    );
  }

  @Patch(':id/pagar')
  @ApiOperation({
    summary: 'Marcar comissão como paga',
    description:
      'Marca uma comissão como paga dentro da empresa autenticada. Endpoint administrativo para controle financeiro e baixa de comissões pendentes.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da comissão que será marcada como paga.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Comissão marcada como paga com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        profissionalId: '550e8400-e29b-41d4-a716-446655440000',
        agendamentoId: '550e8400-e29b-41d4-a716-446655440000',
        valorBase: 200,
        percentual: 10,
        valorComissao: 20,
        status: 'PAGO',
        dataPagamento: '2026-06-14T12:00:00.000Z',
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T12:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou comissão não elegível para pagamento.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Comissão não encontrada para a empresa autenticada.',
  })
  pagar(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.comissoesService.pagar(
      getEmpresaId(req),
      id,
    );
  }
}