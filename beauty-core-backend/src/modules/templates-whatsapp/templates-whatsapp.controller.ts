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

import { TemplatesWhatsappService } from './templates-whatsapp.service';

import { CreateTemplateWhatsAppDto } from './dto/create-template-whatsapp.dto';
import { UpdateTemplateWhatsAppDto } from './dto/update-template-whatsapp.dto';

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

@ApiTags('WhatsApp Templates')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('templates-whatsapp')
export class TemplatesWhatsappController {
  constructor(
    private readonly templatesWhatsappService: TemplatesWhatsappService,
  ) {}

  @Post()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Criar template de WhatsApp',
    description:
      'Cria um template de mensagem de WhatsApp para a empresa autenticada. Endpoint administrativo usado para padronizar mensagens de agendamento, aniversário, fidelidade, pacotes, campanhas e comunicações automáticas.',
  })
  @ApiBody({
    type: CreateTemplateWhatsAppDto,
    description: 'Dados necessários para criação de um template de WhatsApp.',
  })
  @ApiCreatedResponse({
    description: 'Template de WhatsApp criado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Lembrete de Agendamento',
        tipo: 'AGENDAMENTO',
        mensagem:
          'Olá, {{clienteNome}}! Seu agendamento está confirmado para {{data}} às {{hora}}.',
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
    @Body() dto: CreateTemplateWhatsAppDto,
  ) {
    return this.templatesWhatsappService.create(req.user.empresaId, dto);
  }

  @Get()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Listar templates de WhatsApp',
    description:
      'Lista os templates de WhatsApp cadastrados para a empresa autenticada. Endpoint usado pelo painel administrativo para gerenciar modelos de mensagens e automações.',
  })
  @ApiOkResponse({
    description: 'Templates de WhatsApp retornados com sucesso.',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresaId: '550e8400-e29b-41d4-a716-446655440000',
          nome: 'Lembrete de Agendamento',
          tipo: 'AGENDAMENTO',
          mensagem:
            'Olá, {{clienteNome}}! Seu agendamento está confirmado para {{data}} às {{hora}}.',
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
    return this.templatesWhatsappService.findAll(req.user.empresaId);
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Buscar template de WhatsApp por ID',
    description:
      'Busca um template de WhatsApp específico pelo ID, respeitando o isolamento multiempresa da empresa autenticada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do template de WhatsApp.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Template de WhatsApp encontrado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Lembrete de Agendamento',
        tipo: 'AGENDAMENTO',
        mensagem:
          'Olá, {{clienteNome}}! Seu agendamento está confirmado para {{data}} às {{hora}}.',
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
      'Template de WhatsApp não encontrado para a empresa autenticada.',
  })
  findOne(
    @Req() req: CompanyAuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.templatesWhatsappService.findOne(req.user.empresaId, id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Atualizar template de WhatsApp',
    description:
      'Atualiza parcialmente um template de WhatsApp da empresa autenticada. Endpoint administrativo usado para alterar nome, tipo, mensagem e configurações do template conforme regras do serviço.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do template de WhatsApp que será atualizado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateTemplateWhatsAppDto,
    description:
      'Dados permitidos para atualização parcial do template de WhatsApp.',
  })
  @ApiOkResponse({
    description: 'Template de WhatsApp atualizado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Lembrete de Agendamento Atualizado',
        tipo: 'AGENDAMENTO',
        mensagem:
          'Olá, {{clienteNome}}! Estamos lembrando que seu atendimento será em {{data}} às {{hora}}.',
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
    description:
      'Template de WhatsApp não encontrado para a empresa autenticada.',
  })
  update(
    @Req() req: CompanyAuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTemplateWhatsAppDto,
  ) {
    return this.templatesWhatsappService.update(req.user.empresaId, id, dto);
  }

  @Patch(':id/inativar')
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Inativar template de WhatsApp',
    description:
      'Inativa um template de WhatsApp da empresa autenticada sem remover fisicamente o registro. Usado para preservar histórico, auditoria e evitar uso futuro em mensagens automáticas.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do template de WhatsApp que será inativado.',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'Template de WhatsApp inativado com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        nome: 'Lembrete de Agendamento',
        ativo: false,
        updatedAt: '2026-06-14T11:30:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido ou template sem permissão de inativação.',
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
      'Template de WhatsApp não encontrado para a empresa autenticada.',
  })
  inativar(
    @Req() req: CompanyAuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.templatesWhatsappService.inativar(req.user.empresaId, id);
  }
}
