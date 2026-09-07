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

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';

import { CampanhasWhatsappService } from './campanhas-whatsapp.service';

import { CreateCampanhaWhatsAppDto } from './dto/create-campanha-whatsapp.dto';
import { UpdateCampanhaWhatsAppDto } from './dto/update-campanha-whatsapp.dto';

@ApiTags('WhatsApp Campanhas')
@ApiBearerAuth('JWT')
@Controller('campanhas-whatsapp')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CampanhasWhatsappController {
  constructor(
    private readonly campanhasWhatsappService: CampanhasWhatsappService,
  ) {}

  @Post()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Criar campanha de WhatsApp',
    description:
      'Cria uma campanha de WhatsApp para a empresa autenticada. Endpoint administrativo preparado para disparos simulados, campanhas agendadas e futuras integrações com provedores oficiais de WhatsApp.',
  })
  @ApiBody({
    type: CreateCampanhaWhatsAppDto,
    description: 'Dados necessários para criação da campanha de WhatsApp.',
  })
  @ApiCreatedResponse({
    description: 'Campanha de WhatsApp criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Campanha de Retorno',
        descricao: 'Campanha para clientes que não agendam há mais de 30 dias.',
        mensagem: 'Olá, Maria! Temos uma condição especial para você voltar.',
        status: 'RASCUNHO',
        canal: 'WHATSAPP',
        agendadaPara: '2026-06-14T10:00:00.000Z',
        createdAt: '2026-06-14T09:00:00.000Z',
        updatedAt: '2026-06-14T09:00:00.000Z',
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
    @Body() dto: CreateCampanhaWhatsAppDto,
  ) {
    return this.campanhasWhatsappService.create(
      getEmpresaId(req),
      dto,
    );
  }

  @Get()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Listar campanhas de WhatsApp',
    description:
      'Lista as campanhas de WhatsApp cadastradas para a empresa autenticada. Endpoint administrativo para acompanhamento de campanhas, status e histórico de criação.',
  })
  @ApiOkResponse({
    description: 'Campanhas de WhatsApp retornadas com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Campanha de Retorno',
          descricao: 'Campanha para clientes que não agendam há mais de 30 dias.',
          mensagem: 'Olá, Maria! Temos uma condição especial para você voltar.',
          status: 'RASCUNHO',
          canal: 'WHATSAPP',
          agendadaPara: '2026-06-14T10:00:00.000Z',
          createdAt: '2026-06-14T09:00:00.000Z',
          updatedAt: '2026-06-14T09:00:00.000Z',
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
    return this.campanhasWhatsappService.findAll(
      getEmpresaId(req),
    );
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Buscar campanha de WhatsApp por ID',
    description:
      'Busca uma campanha de WhatsApp específica pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da campanha de WhatsApp.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Campanha de WhatsApp encontrada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Campanha de Retorno',
        descricao: 'Campanha para clientes que não agendam há mais de 30 dias.',
        mensagem: 'Olá, Maria! Temos uma condição especial para você voltar.',
        status: 'RASCUNHO',
        canal: 'WHATSAPP',
        agendadaPara: '2026-06-14T10:00:00.000Z',
        createdAt: '2026-06-14T09:00:00.000Z',
        updatedAt: '2026-06-14T09:00:00.000Z',
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
    description: 'Campanha de WhatsApp não encontrada para a empresa autenticada.',
  })
  findOne(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.campanhasWhatsappService.findOne(
      getEmpresaId(req),
      id,
    );
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Atualizar campanha de WhatsApp',
    description:
      'Atualiza os dados de uma campanha de WhatsApp existente da empresa autenticada. Endpoint administrativo permitido para ADMIN e GERENTE.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da campanha de WhatsApp que será atualizada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateCampanhaWhatsAppDto,
    description: 'Dados permitidos para atualização da campanha de WhatsApp.',
  })
  @ApiOkResponse({
    description: 'Campanha de WhatsApp atualizada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Campanha de Reativação VIP',
        descricao: 'Campanha atualizada para clientes inativos.',
        mensagem: 'Olá! Temos uma oferta exclusiva esperando por você.',
        status: 'RASCUNHO',
        canal: 'WHATSAPP',
        agendadaPara: '2026-06-15T10:00:00.000Z',
        createdAt: '2026-06-14T09:00:00.000Z',
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
    description: 'Campanha de WhatsApp não encontrada para a empresa autenticada.',
  })
  update(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCampanhaWhatsAppDto,
  ) {
    return this.campanhasWhatsappService.update(
      getEmpresaId(req),
      id,
      dto,
    );
  }

  @Patch(':id/cancelar')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Cancelar campanha de WhatsApp',
    description:
      'Cancela uma campanha de WhatsApp da empresa autenticada. Endpoint administrativo usado para interromper campanhas que ainda não devem ser executadas ou enviadas.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da campanha de WhatsApp que será cancelada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Campanha de WhatsApp cancelada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Campanha de Retorno',
        status: 'CANCELADA',
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
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  @ApiNotFoundResponse({
    description: 'Campanha de WhatsApp não encontrada para a empresa autenticada.',
  })
  cancelar(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.campanhasWhatsappService.cancelar(
      getEmpresaId(req),
      id,
    );
  }
}