import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
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
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';

import { MensagensWhatsappService } from './mensagens-whatsapp.service';
import { QueuesService } from '../../queues/services/queues.service';

import { CreateMensagemWhatsAppDto } from './dto/create-mensagem-whatsapp.dto';
import { EnviarMensagemWhatsAppDto } from './dto/enviar-mensagem-whatsapp.dto';

@ApiTags('WhatsApp Mensagens')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('mensagens-whatsapp')
export class MensagensWhatsappController {
  constructor(
    private readonly mensagensWhatsappService: MensagensWhatsappService,
    private readonly queuesService: QueuesService,
  ) {}

  @Post()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Criar mensagem de WhatsApp',
    description:
      'Cria uma mensagem de WhatsApp no contexto da empresa autenticada. Endpoint usado para registrar mensagens manuais, histórico de comunicação e preparação para envio.',
  })
  @ApiBody({
    type: CreateMensagemWhatsAppDto,
    description: 'Dados necessários para criação de uma mensagem de WhatsApp.',
  })
  @ApiCreatedResponse({
    description: 'Mensagem de WhatsApp criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        destinatario: '83999999999',
        mensagem: 'Olá! Seu agendamento está confirmado.',
        tipo: 'AGENDAMENTO',
        status: 'PENDENTE',
        canal: 'WHATSAPP',
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
  create(@Req() req: any, @Body() dto: CreateMensagemWhatsAppDto) {
    return this.mensagensWhatsappService.create(getEmpresaId(req), dto);
  }

  @Post('enviar')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Enviar mensagem de WhatsApp',
    description:
      'Registra uma mensagem de WhatsApp e adiciona o envio na fila assíncrona do BullMQ. Endpoint preparado para processamento em background via fila whatsapp.',
  })
  @ApiBody({
    type: EnviarMensagemWhatsAppDto,
    description:
      'Dados necessários para registrar e enfileirar o envio da mensagem de WhatsApp.',
  })
  @ApiCreatedResponse({
    description:
      'Mensagem registrada e job de envio adicionado à fila com sucesso.',
    schema: {
      example: {
        processado: true,
        processamento: 'assincrono',
        whatsappGerado: true,
        mensagemId: '550e8400-e29b-41d4-a716-446655440000',
        jobId: '123',
        queue: 'whatsapp',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Payload inválido ou dados obrigatórios ausentes.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN, GERENTE e RECEPCAO.',
  })
  async enviar(@Req() req: any, @Body() dto: EnviarMensagemWhatsAppDto) {
    const empresaId = getEmpresaId(req);

    const mensagem = await this.mensagensWhatsappService.enviar(empresaId, dto);

    const job = await this.queuesService.adicionarWhatsapp({
      empresaId,
      telefone: dto.destinatario,
      mensagem: dto.mensagem,
      metadata: {
        mensagemId: mensagem.id,
        origem: 'MENSAGENS_WHATSAPP_CONTROLLER',
      },
    });

    return {
      processado: true,
      processamento: 'assincrono',
      whatsappGerado: true,
      mensagemId: mensagem.id,
      jobId: job.id,
      queue: 'whatsapp',
    };
  }

  @Get()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Listar mensagens de WhatsApp',
    description:
      'Lista as mensagens de WhatsApp da empresa autenticada com suporte a paginação. Endpoint usado para histórico de comunicações, acompanhamento de status e auditoria operacional.',
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
  @ApiOkResponse({
    description: 'Mensagens de WhatsApp retornadas com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            destinatario: '83999999999',
            mensagem: 'Olá! Seu agendamento está confirmado.',
            tipo: 'AGENDAMENTO',
            status: 'ENVIADA',
            canal: 'WHATSAPP',
            createdAt: '2026-06-14T10:00:00.000Z',
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
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN, GERENTE e RECEPCAO.',
  })
  findAll(@Req() req: any, @Query() query: PaginationDto) {
    return this.mensagensWhatsappService.findAll(getEmpresaId(req), query);
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Buscar mensagem de WhatsApp por ID',
    description:
      'Busca uma mensagem de WhatsApp específica pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da mensagem de WhatsApp.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Mensagem de WhatsApp encontrada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        clienteId: '550e8400-e29b-41d4-a716-446655440000',
        destinatario: '83999999999',
        mensagem: 'Olá! Seu agendamento está confirmado.',
        tipo: 'AGENDAMENTO',
        status: 'ENVIADA',
        canal: 'WHATSAPP',
        metadata: {
          origem: 'MENSAGENS_WHATSAPP_CONTROLLER',
        },
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:01:00.000Z',
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
      'Usuário sem permissão. Permitido apenas para ADMIN, GERENTE e RECEPCAO.',
  })
  @ApiNotFoundResponse({
    description:
      'Mensagem de WhatsApp não encontrada para a empresa autenticada.',
  })
  findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.mensagensWhatsappService.findOne(getEmpresaId(req), id);
  }

  @Patch(':id/cancelar')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Cancelar mensagem de WhatsApp',
    description:
      'Cancela uma mensagem de WhatsApp da empresa autenticada, preservando o registro para histórico, rastreabilidade e auditoria.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da mensagem de WhatsApp que será cancelada.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Mensagem de WhatsApp cancelada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        status: 'CANCELADA',
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou mensagem sem permissão de cancelamento.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN, GERENTE e RECEPCAO.',
  })
  @ApiNotFoundResponse({
    description:
      'Mensagem de WhatsApp não encontrada para a empresa autenticada.',
  })
  cancelar(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.mensagensWhatsappService.cancelar(getEmpresaId(req), id);
  }
}
