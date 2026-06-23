import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AnalyticsService } from './analytics.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';

@ApiTags('Analytics')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'GERENTE')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({
    summary: 'Dashboard analítico geral',
    description:
      'Retorna indicadores consolidados da empresa autenticada para o dashboard principal, incluindo visão geral de clientes, agendamentos, financeiro, serviços e operação.',
  })
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional do filtro em formato ISO.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional do filtro em formato ISO.',
  })
  @ApiOkResponse({
    description: 'Dashboard analítico retornado com sucesso.',
    schema: {
      example: {
        periodo: {
          dataInicio: '2026-06-01',
          dataFim: '2026-06-30',
        },
        clientes: {
          total: 120,
          novos: 18,
          ativos: 95,
        },
        agendamentos: {
          total: 80,
          confirmados: 60,
          cancelados: 8,
          concluidos: 45,
        },
        financeiro: {
          receitas: 15000,
          despesas: 4200,
          saldo: 10800,
        },
        servicos: {
          total: 12,
          maisAgendado: 'Limpeza de Pele',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  dashboard(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.analyticsService.dashboard(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('clientes')
  @ApiOperation({
    summary: 'Analytics de clientes',
    description:
      'Retorna indicadores analíticos de clientes da empresa autenticada, como total de clientes, novos clientes, clientes ativos e dados de crescimento.',
  })
  @ApiOkResponse({
    description: 'Analytics de clientes retornado com sucesso.',
    schema: {
      example: {
        totalClientes: 120,
        clientesAtivos: 95,
        novosClientesMes: 18,
        clientesComAniversarioMes: 6,
        clientesComPortalAtivo: 80,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  clientes(@Req() req: any) {
    return this.analyticsService.clientes(getEmpresaId(req));
  }

  @Get('agendamentos')
  @ApiOperation({
    summary: 'Analytics de agendamentos',
    description:
      'Retorna indicadores de agendamentos da empresa autenticada por período, incluindo totais, status, cancelamentos, confirmações e conclusão de atendimentos.',
  })
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional do filtro em formato ISO.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional do filtro em formato ISO.',
  })
  @ApiOkResponse({
    description: 'Analytics de agendamentos retornado com sucesso.',
    schema: {
      example: {
        totalAgendamentos: 80,
        agendados: 20,
        confirmados: 35,
        concluidos: 18,
        cancelados: 7,
        taxaCancelamento: 8.75,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  agendamentos(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.analyticsService.agendamentos(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('financeiro')
  @ApiOperation({
    summary: 'Analytics financeiro',
    description:
      'Retorna indicadores financeiros da empresa autenticada por período, incluindo receitas, despesas, saldo, ticket médio e visão gerencial.',
  })
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional do filtro em formato ISO.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional do filtro em formato ISO.',
  })
  @ApiOkResponse({
    description: 'Analytics financeiro retornado com sucesso.',
    schema: {
      example: {
        receitas: 15000,
        despesas: 4200,
        saldo: 10800,
        ticketMedio: 187.5,
        movimentacoes: 80,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  financeiro(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.analyticsService.financeiro(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('servicos')
  @ApiOperation({
    summary: 'Analytics de serviços',
    description:
      'Retorna indicadores de serviços da empresa autenticada por período, incluindo serviços mais agendados, receita por serviço e desempenho comercial.',
  })
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional do filtro em formato ISO.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional do filtro em formato ISO.',
  })
  @ApiOkResponse({
    description: 'Analytics de serviços retornado com sucesso.',
    schema: {
      example: {
        totalServicos: 12,
        servicoMaisAgendado: 'Limpeza de Pele',
        ranking: [
          {
            servicoId: '550e8400-e29b-41d4-a716-446655440000',
            nome: 'Limpeza de Pele',
            totalAgendamentos: 25,
            receita: 3750,
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  servicos(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.analyticsService.servicos(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('profissionais')
  @ApiOperation({
    summary: 'Analytics de profissionais',
    description:
      'Retorna indicadores de desempenho dos profissionais da empresa autenticada por período, incluindo atendimentos, receita gerada e ranking operacional.',
  })
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional do filtro em formato ISO.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional do filtro em formato ISO.',
  })
  @ApiOkResponse({
    description: 'Analytics de profissionais retornado com sucesso.',
    schema: {
      example: {
        totalProfissionais: 8,
        ranking: [
          {
            profissionalId: '550e8400-e29b-41d4-a716-446655440000',
            nome: 'Ana Profissional',
            totalAtendimentos: 30,
            receitaGerada: 4500,
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  profissionais(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.analyticsService.profissionais(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('unidades')
  @ApiOperation({
    summary: 'Analytics de unidades',
    description:
      'Retorna indicadores de desempenho das unidades da empresa autenticada por período, incluindo agendamentos, receita e distribuição operacional por unidade.',
  })
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional do filtro em formato ISO.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional do filtro em formato ISO.',
  })
  @ApiOkResponse({
    description: 'Analytics de unidades retornado com sucesso.',
    schema: {
      example: {
        totalUnidades: 2,
        ranking: [
          {
            unidadeId: '550e8400-e29b-41d4-a716-446655440000',
            nome: 'Unidade Centro',
            totalAgendamentos: 50,
            receitaGerada: 9000,
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  unidades(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.analyticsService.unidades(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('fidelidade')
  @ApiOperation({
    summary: 'Analytics de fidelidade',
    description:
      'Retorna indicadores do programa de fidelidade da empresa autenticada, incluindo pontos distribuídos, pontos resgatados, clientes fidelizados e benefícios disponíveis.',
  })
  @ApiOkResponse({
    description: 'Analytics de fidelidade retornado com sucesso.',
    schema: {
      example: {
        clientesComFidelidade: 80,
        pontosDistribuidos: 12500,
        pontosResgatados: 4200,
        beneficiosAtivos: 5,
        niveisAtivos: 3,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  fidelidade(@Req() req: any) {
    return this.analyticsService.fidelidade(getEmpresaId(req));
  }

  @Get('pacotes')
  @ApiOperation({
    summary: 'Analytics de pacotes',
    description:
      'Retorna indicadores de pacotes da empresa autenticada, incluindo pacotes vendidos, sessões utilizadas, sessões restantes, vencimentos e desempenho comercial.',
  })
  @ApiOkResponse({
    description: 'Analytics de pacotes retornado com sucesso.',
    schema: {
      example: {
        pacotesAtivos: 10,
        pacotesVendidos: 35,
        sessoesContratadas: 175,
        sessoesUtilizadas: 90,
        pacotesVencendo: 4,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  pacotes(@Req() req: any) {
    return this.analyticsService.pacotes(getEmpresaId(req));
  }

  @Get('whatsapp')
  @ApiOperation({
    summary: 'Analytics de WhatsApp',
    description:
      'Retorna indicadores de mensagens de WhatsApp da empresa autenticada por período, incluindo mensagens criadas, enviadas, canceladas, campanhas e status de comunicação.',
  })
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional do filtro em formato ISO.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional do filtro em formato ISO.',
  })
  @ApiOkResponse({
    description: 'Analytics de WhatsApp retornado com sucesso.',
    schema: {
      example: {
        mensagensCriadas: 300,
        mensagensEnviadas: 280,
        mensagensCanceladas: 5,
        campanhasAtivas: 3,
        templatesAtivos: 8,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  whatsapp(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.analyticsService.whatsapp(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('notificacoes')
  @ApiOperation({
    summary: 'Analytics de notificações',
    description:
      'Retorna indicadores de notificações da empresa autenticada por período, incluindo notificações criadas, lidas, não lidas e arquivadas.',
  })
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional do filtro em formato ISO.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional do filtro em formato ISO.',
  })
  @ApiOkResponse({
    description: 'Analytics de notificações retornado com sucesso.',
    schema: {
      example: {
        total: 120,
        lidas: 80,
        naoLidas: 40,
        arquivadas: 15,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  notificacoes(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.analyticsService.notificacoes(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('eventos')
  @ApiOperation({
    summary: 'Analytics de eventos do sistema',
    description:
      'Retorna indicadores de eventos do sistema da empresa autenticada por período, incluindo eventos registrados, módulos mais acionados e origem das automações.',
  })
  @ApiQuery({
    name: 'dataInicio',
    required: false,
    example: '2026-06-01',
    description: 'Data inicial opcional do filtro em formato ISO.',
  })
  @ApiQuery({
    name: 'dataFim',
    required: false,
    example: '2026-06-30',
    description: 'Data final opcional do filtro em formato ISO.',
  })
  @ApiOkResponse({
    description: 'Analytics de eventos retornado com sucesso.',
    schema: {
      example: {
        totalEventos: 250,
        modulosMaisAcionados: [
          {
            modulo: 'agendamentos',
            total: 80,
          },
          {
            modulo: 'financeiro',
            total: 45,
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token Admin ausente, inválido ou expirado.',
  })
  @ApiForbiddenResponse({
    description: 'Usuário sem permissão. Permitido apenas para ADMIN e GERENTE.',
  })
  eventos(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.analyticsService.eventos(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }
}