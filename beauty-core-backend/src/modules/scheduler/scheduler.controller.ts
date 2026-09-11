import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SchedulerService } from './scheduler.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';

@ApiTags('Scheduler')
@ApiBearerAuth('JWT')
@Controller('scheduler')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'GERENTE', 'SUPER_ADMIN')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get('status')
  @ApiOperation({
    summary: 'Consultar status do Scheduler',
    description:
      'Retorna o status operacional do Scheduler Corporativo, incluindo informações de ambiente, timezone, ativação e configuração das rotinas automáticas.',
  })
  @ApiOkResponse({
    description: 'Status do Scheduler retornado com sucesso.',
    schema: {
      example: {
        enabled: true,
        timezone: 'America/Sao_Paulo',
        empresaId: '550e8400-e29b-41d4-a716-446655440000',
        jobs: {
          aniversarios: true,
          lembretesAgendamento: true,
          pacotesVencidos: true,
          campanhasAgendadas: true,
          relatoriosDiarios: true,
        },
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
  status() {
    return this.schedulerService.getStatus();
  }

  @Post('teste/aniversarios')
  @ApiOperation({
    summary: 'Testar rotina de aniversariantes diários',
    description:
      'Executa manualmente a rotina de aniversariantes diários. Endpoint administrativo usado para testar o Scheduler, enfileiramento BullMQ e processamento de notificações/aniversários.',
  })
  @ApiCreatedResponse({
    description:
      'Rotina de aniversariantes executada ou enfileirada com sucesso.',
    schema: {
      example: {
        success: true,
        message: 'Processamento de aniversariantes diários iniciado.',
        job: 'aniversarios-diarios',
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
  testarAniversarios() {
    return this.schedulerService.processarAniversariantesDiarios();
  }

  @Post('teste/lembretes')
  @ApiOperation({
    summary: 'Testar rotina de lembretes de agendamento',
    description:
      'Executa manualmente a rotina de lembretes de agendamento. Endpoint administrativo usado para validar o fluxo Scheduler → BullMQ → Worker → WhatsApp/Notificações.',
  })
  @ApiCreatedResponse({
    description: 'Rotina de lembretes executada ou enfileirada com sucesso.',
    schema: {
      example: {
        success: true,
        message: 'Processamento de lembretes de agendamento iniciado.',
        job: 'lembretes-agendamento',
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
  testarLembretes() {
    return this.schedulerService.processarLembretesAgendamento();
  }

  @Post('teste/pacotes-vencidos')
  @ApiOperation({
    summary: 'Testar rotina de pacotes vencidos',
    description:
      'Executa manualmente a rotina de verificação de pacotes vencidos. Endpoint administrativo usado para testar notificações, filas e processamento assíncrono relacionado a pacotes de clientes.',
  })
  @ApiCreatedResponse({
    description:
      'Rotina de pacotes vencidos executada ou enfileirada com sucesso.',
    schema: {
      example: {
        success: true,
        message: 'Processamento de pacotes vencidos iniciado.',
        job: 'pacotes-vencidos',
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
  testarPacotesVencidos() {
    return this.schedulerService.processarPacotesVencidos();
  }

  @Post('teste/campanhas')
  @ApiOperation({
    summary: 'Testar rotina de campanhas agendadas',
    description:
      'Executa manualmente a rotina de campanhas WhatsApp agendadas. Endpoint administrativo usado para validar o processamento de campanhas, filas BullMQ e workers de comunicação.',
  })
  @ApiCreatedResponse({
    description:
      'Rotina de campanhas agendadas executada ou enfileirada com sucesso.',
    schema: {
      example: {
        success: true,
        message: 'Processamento de campanhas agendadas iniciado.',
        job: 'campanhas-agendadas',
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
  testarCampanhas() {
    return this.schedulerService.processarCampanhasAgendadas();
  }

  @Post('teste/relatorios')
  @ApiOperation({
    summary: 'Testar rotina de relatórios diários',
    description:
      'Executa manualmente a rotina de relatórios diários. Endpoint administrativo usado para testar geração, enfileiramento e processamento de relatórios automáticos da empresa.',
  })
  @ApiCreatedResponse({
    description:
      'Rotina de relatórios diários executada ou enfileirada com sucesso.',
    schema: {
      example: {
        success: true,
        message: 'Processamento de relatórios diários iniciado.',
        job: 'relatorios-diarios',
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
  testarRelatorios() {
    return this.schedulerService.processarRelatoriosDiarios();
  }
  @Post('teste/limpeza-sessoes')
  @ApiOperation({
    summary: 'Testar rotina de limpeza de sessões',
    description:
      'Executa manualmente a rotina de limpeza de sessões expiradas ou revogadas antigas. Endpoint administrativo usado para validar manutenção operacional de sessões Admin e Cliente.',
  })
  @ApiCreatedResponse({
    description: 'Rotina de limpeza de sessões executada com sucesso.',
    schema: {
      example: {
        success: true,
        rotina: 'limpeza_sessoes',
        result: {
          limpezaExecutada: true,
          removidas: 3,
        },
        tempoMs: 42,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido, expirado ou sessão revogada.',
  })
  @ApiForbiddenResponse({
    description:
      'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  testarLimpezaSessoes() {
    return this.schedulerService.processarLimpezaSessoes();
  }
}
