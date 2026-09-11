import {
  Body,
  Controller,
  Get,
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
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';

import { ConfiguracaoWhatsappService } from './configuracao-whatsapp.service';

import { CreateConfiguracaoWhatsAppDto } from './dto/create-configuracao-whatsapp.dto';
import { UpdateConfiguracaoWhatsAppDto } from './dto/update-configuracao-whatsapp.dto';

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

@ApiTags('WhatsApp Configuracao')
@ApiBearerAuth('JWT')
@Controller('configuracao-whatsapp')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConfiguracaoWhatsappController {
  constructor(
    private readonly configuracaoWhatsappService: ConfiguracaoWhatsappService,
  ) {}

  @Post()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Criar ou atualizar configuração de WhatsApp',
    description:
      'Cria ou atualiza a configuração de WhatsApp da empresa autenticada. Endpoint administrativo preparado para modo demonstração, link gratuito do WhatsApp e futuras integrações com provedores oficiais.',
  })
  @ApiBody({
    type: CreateConfiguracaoWhatsAppDto,
    description:
      'Dados necessários para configurar o WhatsApp da empresa autenticada.',
  })
  @ApiCreatedResponse({
    description: 'Configuração de WhatsApp criada ou atualizada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        telefone: '83999999999',
        nomeExibicao: 'Beauty Core Clínica',
        ativo: true,
        modoDemonstracao: true,
        provedor: 'WHATSAPP_BUSINESS',
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
  createOrUpdate(
    @Req() req: CompanyAuthenticatedRequest,
    @Body() dto: CreateConfiguracaoWhatsAppDto,
  ) {
    return this.configuracaoWhatsappService.createOrUpdate(
      req.user.empresaId,
      dto,
    );
  }

  @Get()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Buscar configuração de WhatsApp',
    description:
      'Retorna a configuração de WhatsApp da empresa autenticada. Endpoint usado pelo painel administrativo para consultar telefone, status, modo de uso e dados de integração.',
  })
  @ApiOkResponse({
    description: 'Configuração de WhatsApp retornada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        telefone: '83999999999',
        nomeExibicao: 'Beauty Core Clínica',
        ativo: true,
        modoDemonstracao: true,
        provedor: 'WHATSAPP_BUSINESS',
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  findOne(@Req() req: CompanyAuthenticatedRequest) {
    return this.configuracaoWhatsappService.findOne(req.user.empresaId);
  }

  @Patch()
  @Roles('ADMIN', 'GERENTE')
  @ApiOperation({
    summary: 'Atualizar configuração de WhatsApp',
    description:
      'Atualiza parcialmente a configuração de WhatsApp da empresa autenticada. Endpoint administrativo usado para ajustar telefone, status, modo de demonstração ou dados de integração.',
  })
  @ApiBody({
    type: UpdateConfiguracaoWhatsAppDto,
    description:
      'Dados permitidos para atualização parcial da configuração de WhatsApp.',
  })
  @ApiOkResponse({
    description: 'Configuração de WhatsApp atualizada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        telefone: '83999999999',
        nomeExibicao: 'Beauty Core Clínica Premium',
        ativo: true,
        modoDemonstracao: false,
        provedor: 'WHATSAPP_BUSINESS',
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T11:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Payload inválido ou valores fora das regras permitidas.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  update(
    @Req() req: CompanyAuthenticatedRequest,
    @Body() dto: UpdateConfiguracaoWhatsAppDto,
  ) {
    return this.configuracaoWhatsappService.update(req.user.empresaId, dto);
  }

  @Get('link')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO')
  @ApiOperation({
    summary: 'Gerar link gratuito do WhatsApp',
    description:
      'Gera um link de WhatsApp no formato wa.me para a empresa autenticada. Pode receber uma mensagem opcional pré-preenchida para facilitar contato com clientes sem depender de API paga.',
  })
  @ApiQuery({
    name: 'mensagem',
    required: false,
    example: 'Olá! Gostaria de agendar um atendimento.',
    description:
      'Mensagem opcional que será pré-preenchida no link do WhatsApp.',
  })
  @ApiOkResponse({
    description: 'Link de WhatsApp gerado com sucesso.',
    schema: {
      example: {
        telefone: '83999999999',
        mensagem: 'Olá! Gostaria de agendar um atendimento.',
        link: 'https://wa.me/5583999999999?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20um%20atendimento.',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Configuração de WhatsApp ausente, telefone inválido ou mensagem inválida.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido para ADMIN, GERENTE e RECEPCAO.',
  })
  gerarLink(
    @Req() req: CompanyAuthenticatedRequest,
    @Query('mensagem') mensagem?: string,
  ) {
    return this.configuracaoWhatsappService.gerarLink(
      req.user.empresaId,
      mensagem,
    );
  }
}
