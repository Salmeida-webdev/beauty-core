import {
  Body,
  Controller,
  Get,
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
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

import { ConfiguracoesNotificacaoService } from './configuracoes-notificacao.service';
import { CreateConfiguracaoNotificacaoDto } from './dto/create-configuracao-notificacao.dto';
import { UpdateConfiguracaoNotificacaoDto } from './dto/update-configuracao-notificacao.dto';

type ConfiguracoesNotificacaoRequest = {
  user: {
    empresaId: string;
  };
};

@ApiTags('Configuracoes Notificacao')
@ApiBearerAuth('JWT')
@Controller('configuracoes-notificacao')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'GERENTE')
export class ConfiguracoesNotificacaoController {
  constructor(
    private readonly configuracoesNotificacaoService: ConfiguracoesNotificacaoService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar configuração de notificação',
    description:
      'Cria a configuração de notificações da empresa autenticada. Endpoint administrativo usado para definir preferências globais de envio, canais e automações de notificações.',
  })
  @ApiBody({
    type: CreateConfiguracaoNotificacaoDto,
    description:
      'Dados necessários para criação da configuração de notificações.',
  })
  @ApiCreatedResponse({
    description: 'Configuração de notificação criada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        notificacoesAtivas: true,
        lembreteAgendamentoAtivo: true,
        horasAntesLembrete: 24,
        aniversarioAtivo: true,
        pacoteVencendoAtivo: true,
        diasAntesPacoteVencer: 7,
        createdAt: '2026-06-14T10:00:00.000Z',
        updatedAt: '2026-06-14T10:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Dados inválidos, campos obrigatórios ausentes ou configuração já existente.',
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  create(
    @Req() req: ConfiguracoesNotificacaoRequest,
    @Body() dto: CreateConfiguracaoNotificacaoDto,
  ) {
    return this.configuracoesNotificacaoService.create(req.user.empresaId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar configuração de notificação',
    description:
      'Retorna a configuração de notificações da empresa autenticada. Endpoint usado pelo painel administrativo para consultar regras atuais de notificações, lembretes e automações.',
  })
  @ApiOkResponse({
    description: 'Configuração de notificação retornada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        notificacoesAtivas: true,
        lembreteAgendamentoAtivo: true,
        horasAntesLembrete: 24,
        aniversarioAtivo: true,
        pacoteVencendoAtivo: true,
        diasAntesPacoteVencer: 7,
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
  @ApiNotFoundResponse({
    description:
      'Configuração de notificação não encontrada para a empresa autenticada.',
  })
  findOne(@Req() req: ConfiguracoesNotificacaoRequest) {
    return this.configuracoesNotificacaoService.findOne(req.user.empresaId);
  }

  @Patch()
  @ApiOperation({
    summary: 'Atualizar configuração de notificação',
    description:
      'Atualiza parcialmente a configuração de notificações da empresa autenticada. Endpoint administrativo usado para ajustar regras de lembretes, aniversário, pacotes e status geral das notificações.',
  })
  @ApiBody({
    type: UpdateConfiguracaoNotificacaoDto,
    description:
      'Dados permitidos para atualização parcial da configuração de notificações.',
  })
  @ApiOkResponse({
    description: 'Configuração de notificação atualizada com sucesso.',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        notificacoesAtivas: true,
        lembreteAgendamentoAtivo: true,
        horasAntesLembrete: 12,
        aniversarioAtivo: true,
        pacoteVencendoAtivo: true,
        diasAntesPacoteVencer: 5,
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
  @ApiNotFoundResponse({
    description:
      'Configuração de notificação não encontrada para a empresa autenticada.',
  })
  update(
    @Req() req: ConfiguracoesNotificacaoRequest,
    @Body() dto: UpdateConfiguracaoNotificacaoDto,
  ) {
    return this.configuracoesNotificacaoService.update(req.user.empresaId, dto);
  }
}
