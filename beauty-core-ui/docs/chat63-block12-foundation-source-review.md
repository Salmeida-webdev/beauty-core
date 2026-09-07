# CHAT 63 — BLOCO 12/15

## Revisão dos contratos existentes antes da implementação

Nenhum arquivo funcional foi alterado neste bloco.

## beauty-core-backend/src/modules/auth-cliente/guards/cliente-auth.guard.ts

``text
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ClienteAuthGuard extends AuthGuard('cliente-jwt') {}
``

## beauty-core-backend/src/modules/cliente-area/cliente-area.controller.ts

``text
import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ClienteAuthGuard } from '../auth-cliente/guards/cliente-auth.guard';
import { ClienteAreaService } from './cliente-area.service';
import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';

type ClienteAuthUser = {
  sub?: string;
  clienteId?: string;
  empresaId: string;
  telefone?: string;
  role?: 'CLIENTE';
};

type ClienteRequest = Request & {
  user: ClienteAuthUser;
};

@ApiTags('Cliente Area')
@ApiBearerAuth('JWT Cliente')
@UseGuards(ClienteAuthGuard)
@Controller('cliente-area')
export class ClienteAreaController {
  constructor(private readonly clienteAreaService: ClienteAreaService) {}

  private getAuth(req: ClienteRequest) {
    const clienteId = req.user.clienteId ?? req.user.sub;

    return {
      clienteId,
      empresaId: req.user.empresaId,
    };
  }

  @Get('me')
  @ApiOperation({ summary: 'Retorna o perfil público do cliente logado.' })
  me(@Req() req: ClienteRequest) {
    return this.clienteAreaService.me(this.getAuth(req));
  }

  @Get('me/dashboard')
  @ApiOperation({ summary: 'Retorna o dashboard mobile do cliente logado.' })
  dashboard(@Req() req: ClienteRequest) {
    return this.clienteAreaService.dashboard(this.getAuth(req));
  }

  @Get('me/agendamentos')
  @ApiOperation({ summary: 'Lista os agendamentos do cliente logado.' })
  agendamentos(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.agendamentos(this.getAuth(req), query);
  }

  @Get('me/proximos-agendamentos')
  @ApiOperation({ summary: 'Lista os próximos agendamentos do cliente logado.' })
  proximosAgendamentos(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.proximosAgendamentos(
      this.getAuth(req),
      query,
    );
  }

  @Get('me/ultimo-agendamento')
  @ApiOperation({ summary: 'Retorna o último agendamento do cliente logado.' })
  ultimoAgendamento(@Req() req: ClienteRequest) {
    return this.clienteAreaService.ultimoAgendamento(this.getAuth(req));
  }

  @Get('me/fidelidade')
  @ApiOperation({ summary: 'Retorna o resumo de fidelidade do cliente logado.' })
  fidelidade(@Req() req: ClienteRequest) {
    return this.clienteAreaService.fidelidade(this.getAuth(req));
  }

  @Get('me/pontos')
  @ApiOperation({ summary: 'Lista o histórico de pontos do cliente logado.' })
  pontos(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.pontos(this.getAuth(req), query);
  }

  @Get('me/beneficios')
  @ApiOperation({ summary: 'Lista os benefícios disponíveis para o cliente.' })
  beneficios(@Req() req: ClienteRequest) {
    return this.clienteAreaService.beneficios(this.getAuth(req));
  }

  @Get('me/pacotes')
  @ApiOperation({ summary: 'Lista os pacotes do cliente separados por status.' })
  pacotes(@Req() req: ClienteRequest) {
    return this.clienteAreaService.pacotes(this.getAuth(req));
  }

  @Get('me/pacotes/:pacoteId')
  @ApiOperation({ summary: 'Retorna os detalhes de um pacote do cliente.' })
  pacoteDetalhes(
    @Req() req: ClienteRequest,
    @Param('pacoteId') pacoteId: string,
  ) {
    return this.clienteAreaService.pacoteDetalhes(
      this.getAuth(req),
      pacoteId,
    );
  }

  @Get('me/notificacoes')
  @ApiOperation({ summary: 'Lista as notificações do cliente logado.' })
  notificacoes(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.notificacoes(this.getAuth(req), query);
  }

  @Get('me/notificacoes/nao-lidas')
  @ApiOperation({ summary: 'Lista as notificações não lidas do cliente.' })
  notificacoesNaoLidas(@Req() req: ClienteRequest) {
    return this.clienteAreaService.notificacoesNaoLidas(this.getAuth(req));
  }

  @Patch('me/notificacoes/:id/lida')
  @ApiOperation({ summary: 'Marca uma notificação do cliente como lida.' })
  marcarNotificacaoComoLida(
    @Req() req: ClienteRequest,
    @Param('id') id: string,
  ) {
    return this.clienteAreaService.marcarNotificacaoComoLida(
      this.getAuth(req),
      id,
    );
  }

  @Get('me/mensagens-whatsapp')
  @ApiOperation({ summary: 'Lista o histórico de mensagens WhatsApp do cliente.' })
  mensagensWhatsapp(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.mensagensWhatsapp(this.getAuth(req), query);
  }

  @Get('me/historico')
  @ApiOperation({ summary: 'Retorna o histórico consolidado do cliente.' })
  historico(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.historico(this.getAuth(req), query);
  }
}
``

## beauty-core-backend/src/modules/cliente-area/cliente-area.service.ts

``text
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';

type ClienteAreaAuth = {
  clienteId?: string;
  empresaId: string;
};

@Injectable()
export class ClienteAreaService {
  constructor(private readonly prisma: PrismaService) {}

  private validarAuth(auth: ClienteAreaAuth) {
    if (!auth.clienteId || !auth.empresaId) {
      throw new UnauthorizedException('Token de cliente inválido.');
    }

    return {
      clienteId: auth.clienteId,
      empresaId: auth.empresaId,
    };
  }

  private getPagination(query: ClienteAreaQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    return {
      page,
      limit,
      skip,
      take: limit,
    };
  }

  private buildMeta(params: {
    page: number;
    limit: number;
    total: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
  }) {
    return {
      page: params.page,
      limit: params.limit,
      total: params.total,
      totalPages: Math.ceil(params.total / params.limit),
      orderBy: params.orderBy,
      orderDirection: params.orderDirection,
    };
  }

  private async buscarClienteSeguro(auth: ClienteAreaAuth) {
    const safeAuth = this.validarAuth(auth);

    const cliente = await this.prisma.cliente.findFirst({
      where: {
        id: safeAuth.clienteId,
        empresaId: safeAuth.empresaId,
        ativo: true,
        ativoPortal: true,
      },
      select: {
        id: true,
        nome: true,
        telefone: true,
        email: true,
        foto: true,
        dataNascimento: true,
        ultimoAcessoPortal: true,
        aceitouTermos: true,
      },
    });

    if (!cliente) {
      throw new ForbiddenException(
        'Cliente não encontrado, inativo ou sem acesso ao portal.',
      );
    }

    return cliente;
  }

  async me(auth: ClienteAreaAuth) {
    const cliente = await this.buscarClienteSeguro(auth);

    return {
      data: cliente,
      meta: {},
    };
  }

  async dashboard(auth: ClienteAreaAuth) {
    const [
      perfil,
      proximosAgendamentos,
      ultimoAgendamento,
      fidelidade,
      pacotes,
      beneficios,
      notificacoesNaoLidas,
    ] = await Promise.all([
      this.buscarClienteSeguro(auth),
      this.buscarProximosAgendamentosInterno(auth, 5),
      this.buscarUltimoAgendamentoInterno(auth),
      this.buscarFidelidadeInterno(auth),
      this.buscarPacotesInterno(auth),
      this.buscarBeneficiosInterno(auth),
      this.buscarNotificacoesNaoLidasInterno(auth),
    ]);

    return {
      data: {
        perfil,
        agendamentos: {
          proximos: proximosAgendamentos,
          ultimo: ultimoAgendamento,
        },
        fidelidade,
        pacotes,
        beneficios,
        notificacoes: {
          naoLidas: notificacoesNaoLidas,
          totalNaoLidas: notificacoesNaoLidas.length,
        },
      },
      meta: {},
    };
  }

  async agendamentos(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    await this.buscarClienteSeguro(auth);

    const safeAuth = this.validarAuth(auth);
    const { page, limit, skip, take } = this.getPagination(query);

    const [items, total] = await Promise.all([
      this.prisma.agendamento.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
        orderBy: {
          dataHoraInicio: 'desc',
        },
        skip,
        take,
        include: {
          servico: true,
          profissional: true,
          unidade: true,
        },
      }),
      this.prisma.agendamento.count({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
      }),
    ]);

    return {
      data: items,
      meta: this.buildMeta({
        page,
        limit,
        total,
        orderBy: 'dataHoraInicio',
        orderDirection: 'desc',
      }),
    };
  }

  async proximosAgendamentos(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    await this.buscarClienteSeguro(auth);

    const safeAuth = this.validarAuth(auth);
    const { page, limit, skip, take } = this.getPagination(query);
    const now = new Date();

    const [items, total] = await Promise.all([
      this.prisma.agendamento.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
          dataHoraInicio: {
            gte: now,
          },
        },
        orderBy: {
          dataHoraInicio: 'asc',
        },
        skip,
        take,
        include: {
          servico: true,
          profissional: true,
          unidade: true,
        },
      }),
      this.prisma.agendamento.count({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
          dataHoraInicio: {
            gte: now,
          },
        },
      }),
    ]);

    return {
      data: items,
      meta: this.buildMeta({
        page,
        limit,
        total,
        orderBy: 'dataHoraInicio',
        orderDirection: 'asc',
      }),
    };
  }

  async ultimoAgendamento(auth: ClienteAreaAuth) {
    await this.buscarClienteSeguro(auth);

    const agendamento = await this.buscarUltimoAgendamentoInterno(auth);

    return {
      data: agendamento,
      meta: {},
    };
  }

  async fidelidade(auth: ClienteAreaAuth) {
    await this.buscarClienteSeguro(auth);

    const fidelidade = await this.buscarFidelidadeInterno(auth);

    return {
      data: fidelidade,
      meta: {},
    };
  }

  async pontos(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    await this.buscarClienteSeguro(auth);

    const safeAuth = this.validarAuth(auth);
    const { page, limit, skip, take } = this.getPagination(query);

    const [items, total] = await Promise.all([
      this.prisma.movimentacaoPontos.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
      this.prisma.movimentacaoPontos.count({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
      }),
    ]);

    return {
      data: items,
      meta: this.buildMeta({
        page,
        limit,
        total,
        orderBy: 'createdAt',
        orderDirection: 'desc',
      }),
    };
  }

  async beneficios(auth: ClienteAreaAuth) {
    await this.buscarClienteSeguro(auth);

    const beneficios = await this.buscarBeneficiosInterno(auth);

    return {
      data: beneficios,
      meta: {
        total: beneficios.length,
      },
    };
  }

  async pacotes(auth: ClienteAreaAuth) {
    await this.buscarClienteSeguro(auth);

    const pacotes = await this.buscarPacotesInterno(auth);

    return {
      data: pacotes,
      meta: {
        totalAtivos: pacotes.ativos.length,
        totalFinalizados: pacotes.finalizados.length,
        totalVencidos: pacotes.vencidos.length,
        totalCancelados: pacotes.cancelados.length,
      },
    };
  }

  async pacoteDetalhes(auth: ClienteAreaAuth, pacoteId: string) {
    await this.buscarClienteSeguro(auth);

    const safeAuth = this.validarAuth(auth);

    const pacote = await this.prisma.clientePacote.findFirst({
      where: {
        id: pacoteId,
        empresaId: safeAuth.empresaId,
        clienteId: safeAuth.clienteId,
      },
      include: {
        pacote: true,
      },
    });

    if (!pacote) {
      throw new NotFoundException('Pacote não encontrado para este cliente.');
    }

    return {
      data: pacote,
      meta: {},
    };
  }

  async notificacoes(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    await this.buscarClienteSeguro(auth);

    const safeAuth = this.validarAuth(auth);
    const { page, limit, skip, take } = this.getPagination(query);

    const [items, total] = await Promise.all([
      this.prisma.notificacao.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
      this.prisma.notificacao.count({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
      }),
    ]);

    return {
      data: items,
      meta: this.buildMeta({
        page,
        limit,
        total,
        orderBy: 'createdAt',
        orderDirection: 'desc',
      }),
    };
  }

  async notificacoesNaoLidas(auth: ClienteAreaAuth) {
    await this.buscarClienteSeguro(auth);

    const notificacoes = await this.buscarNotificacoesNaoLidasInterno(auth);

    return {
      data: notificacoes,
      meta: {
        total: notificacoes.length,
      },
    };
  }

  async marcarNotificacaoComoLida(auth: ClienteAreaAuth, id: string) {
    await this.buscarClienteSeguro(auth);

    const safeAuth = this.validarAuth(auth);

    const notificacao = await this.prisma.notificacao.findFirst({
      where: {
        id,
        empresaId: safeAuth.empresaId,
        clienteId: safeAuth.clienteId,
      },
    });

    if (!notificacao) {
      throw new NotFoundException(
        'Notificação não encontrada para este cliente.',
      );
    }

    const atualizada = await this.prisma.notificacao.update({
      where: {
        id: notificacao.id,
      },
      data: {
        status: 'LIDA',
      },
    });

    return {
      data: atualizada,
      meta: {},
    };
  }

  async mensagensWhatsapp(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    await this.buscarClienteSeguro(auth);

    const safeAuth = this.validarAuth(auth);
    const { page, limit, skip, take } = this.getPagination(query);

    const [items, total] = await Promise.all([
      this.prisma.mensagemWhatsApp.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
      this.prisma.mensagemWhatsApp.count({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
      }),
    ]);

    return {
      data: items,
      meta: this.buildMeta({
        page,
        limit,
        total,
        orderBy: 'createdAt',
        orderDirection: 'desc',
      }),
    };
  }

  async historico(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    await this.buscarClienteSeguro(auth);

    const safeAuth = this.validarAuth(auth);
    const { page, limit } = this.getPagination(query);
    const take = Math.min(limit * 3, 100);

    const [
      agendamentos,
      pontos,
      pacotes,
      notificacoes,
      mensagensWhatsapp,
    ] = await Promise.all([
      this.prisma.agendamento.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
        orderBy: {
          dataHoraInicio: 'desc',
        },
        take,
      }),
      this.prisma.movimentacaoPontos.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take,
      }),
      this.prisma.clientePacote.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take,
        include: {
          pacote: true,
        },
      }),
      this.prisma.notificacao.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take,
      }),
      this.prisma.mensagemWhatsApp.findMany({
        where: {
          empresaId: safeAuth.empresaId,
          clienteId: safeAuth.clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take,
      }),
    ]);

    const historico = [
      ...agendamentos.map((item) => ({
        id: item.id,
        tipo: 'AGENDAMENTO',
        titulo: 'Agendamento',
        descricao: item.status,
        data: item.dataHoraInicio,
        metadata: item,
      })),
      ...pontos.map((item) => ({
        id: item.id,
        tipo: 'PONTOS',
        titulo: 'Movimentação de pontos',
        descricao: item.tipo,
        data: item.createdAt,
        metadata: item,
      })),
      ...pacotes.map((item) => ({
        id: item.id,
        tipo: 'PACOTE',
        titulo: item.pacote?.nome ?? 'Pacote',
        descricao: item.status,
        data: item.createdAt,
        metadata: item,
      })),
      ...notificacoes.map((item) => ({
        id: item.id,
        tipo: 'NOTIFICACAO',
        titulo: item.titulo,
        descricao: item.mensagem,
        data: item.createdAt,
        metadata: item,
      })),
      ...mensagensWhatsapp.map((item) => ({
        id: item.id,
        tipo: 'WHATSAPP',
        titulo: 'Mensagem WhatsApp',
        descricao: item.status,
        data: item.createdAt,
        metadata: item,
      })),
    ].sort((a, b) => b.data.getTime() - a.data.getTime());

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = historico.slice(start, end);

    return {
      data: paginated,
      meta: this.buildMeta({
        page,
        limit,
        total: historico.length,
        orderBy: 'data',
        orderDirection: 'desc',
      }),
    };
  }

  private async buscarProximosAgendamentosInterno(
    auth: ClienteAreaAuth,
    take = 5,
  ) {
    const safeAuth = this.validarAuth(auth);

    return this.prisma.agendamento.findMany({
      where: {
        empresaId: safeAuth.empresaId,
        clienteId: safeAuth.clienteId,
        dataHoraInicio: {
          gte: new Date(),
        },
      },
      orderBy: {
        dataHoraInicio: 'asc',
      },
      take,
      include: {
        servico: true,
        profissional: true,
        unidade: true,
      },
    });
  }

  private async buscarUltimoAgendamentoInterno(auth: ClienteAreaAuth) {
    const safeAuth = this.validarAuth(auth);

    return this.prisma.agendamento.findFirst({
      where: {
        empresaId: safeAuth.empresaId,
        clienteId: safeAuth.clienteId,
      },
      orderBy: {
        dataHoraInicio: 'desc',
      },
      include: {
        servico: true,
        profissional: true,
        unidade: true,
      },
    });
  }

  private async buscarFidelidadeInterno(auth: ClienteAreaAuth) {
    const safeAuth = this.validarAuth(auth);

    const [fidelidade, beneficiosDisponiveis, historico] =
      await Promise.all([
        this.prisma.fidelidade.findFirst({
          where: {
            empresaId: safeAuth.empresaId,
            clienteId: safeAuth.clienteId,
          },
        }),
        this.prisma.beneficio.findMany({
          where: {
            empresaId: safeAuth.empresaId,
            ativo: true,
          },
          orderBy: {
            pontosNecessarios: 'asc',
          },
        }),
        this.prisma.movimentacaoPontos.findMany({
          where: {
            empresaId: safeAuth.empresaId,
            clienteId: safeAuth.clienteId,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        }),
      ]);

    const saldoAtual = fidelidade?.saldoPontos ?? 0;

    return {
      saldoAtual,
      nivelAtual: null,
      proximoNivel: null,
      pontosRestantes: null,
      beneficiosDisponiveis,
      historico,
    };
  }

  private async buscarBeneficiosInterno(auth: ClienteAreaAuth) {
    const safeAuth = this.validarAuth(auth);

    return this.prisma.beneficio.findMany({
      where: {
        empresaId: safeAuth.empresaId,
        ativo: true,
      },
      orderBy: {
        pontosNecessarios: 'asc',
      },
    });
  }

  private async buscarPacotesInterno(auth: ClienteAreaAuth) {
    const safeAuth = this.validarAuth(auth);

    const pacotes = await this.prisma.clientePacote.findMany({
      where: {
        empresaId: safeAuth.empresaId,
        clienteId: safeAuth.clienteId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        pacote: true,
      },
    });

    return {
      ativos: pacotes.filter((item) => item.status === 'ATIVO'),
      finalizados: pacotes.filter((item) => item.status === 'FINALIZADO'),
      vencidos: pacotes.filter((item) => item.status === 'VENCIDO'),
      cancelados: pacotes.filter((item) => item.status === 'CANCELADO'),
    };
  }

  private async buscarNotificacoesNaoLidasInterno(auth: ClienteAreaAuth) {
    const safeAuth = this.validarAuth(auth);

    return this.prisma.notificacao.findMany({
      where: {
        empresaId: safeAuth.empresaId,
        clienteId: safeAuth.clienteId,
        status: 'NAO_LIDA',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });
  }
}



``

## beauty-core-ui/src/features/portal/services/portal-client-api.ts

``text
import {
  getApiClient,
} from "@/services/api/api-client";

import type {
  PortalDashboard,
  PortalHistory,
  PortalProfile,
  PortalProfileUpdateInput,
} from "../contracts/portal-client-contracts";
import {
  adaptPortalDashboard,
  adaptPortalHistory,
  adaptPortalProfile,
  normalizePortalProfileUpdate,
  portalDashboardTransportSchema,
  portalHistoryTransportSchema,
  portalProfileTransportSchema,
} from "../contracts/portal-client-adapters";

export const PORTAL_CLIENT_ENDPOINTS = {
  dashboard: "/area-cliente/me/dashboard",
  profile: "/area-cliente/me/perfil",
  history: "/area-cliente/me/historico",
} as const;

export async function getPortalDashboard(): Promise<PortalDashboard> {
  const response = await getApiClient().get<unknown>(
    PORTAL_CLIENT_ENDPOINTS.dashboard,
  );

  return adaptPortalDashboard(response.data);
}

export async function getPortalProfile(): Promise<PortalProfile> {
  const response = await getApiClient().get<unknown>(
    PORTAL_CLIENT_ENDPOINTS.profile,
  );

  return adaptPortalProfile(response.data);
}

export async function updatePortalProfile(
  input: PortalProfileUpdateInput,
): Promise<PortalProfile> {
  const payload = normalizePortalProfileUpdate(input);
  const response = await getApiClient().patch<unknown>(
    PORTAL_CLIENT_ENDPOINTS.profile,
    payload,
  );

  return adaptPortalProfile(response.data);
}

export async function getPortalHistory(): Promise<PortalHistory> {
  const response = await getApiClient().get<unknown>(
    PORTAL_CLIENT_ENDPOINTS.history,
  );

  return adaptPortalHistory(response.data);
}

export const portalClientApi = {
  dashboard: getPortalDashboard,
  profile: getPortalProfile,
  updateProfile: updatePortalProfile,
  history: getPortalHistory,
} as const;

export {
  portalDashboardTransportSchema,
  portalHistoryTransportSchema,
  portalProfileTransportSchema,
};
``

## beauty-core-ui/src/features/portal/query/portal-client-query-keys.ts

``text
import { portalQueryKeys } from "./portal-query";

export const portalClientQueryKeys = {
  all: () => portalQueryKeys.private(),
  dashboard: () =>
    portalQueryKeys.privateResource("dashboard"),
  profile: () =>
    portalQueryKeys.privateResource("profile"),
  history: () =>
    portalQueryKeys.privateResource("history"),
} as const;
``

## beauty-core-ui/src/features/portal/query/portal-query.ts

``text
import type { QueryClient } from "@tanstack/react-query";

import type { PortalAuthStatus } from "../auth/portal-auth";

export const portalQueryKeys = {
  all: ["portal"] as const,

  public: () => [...portalQueryKeys.all, "public"] as const,

  private: () => [...portalQueryKeys.all, "private"] as const,

  publicResource: (
    resource: string,
    ...parts: readonly unknown[]
  ) => [...portalQueryKeys.public(), resource, ...parts] as const,

  privateResource: (
    resource: string,
    ...parts: readonly unknown[]
  ) => [...portalQueryKeys.private(), resource, ...parts] as const,
};

export function portalQueryEnabled(
  status: PortalAuthStatus,
  requiresAuthentication: boolean,
): boolean {
  if (requiresAuthentication) {
    return status === "authenticated";
  }

  return (
    status === "anonymous" ||
    status === "authenticated" ||
    status === "denied"
  );
}

export function cleanupPortalPrivateQueries(
  queryClient: QueryClient,
): void {
  void queryClient.cancelQueries({
    queryKey: portalQueryKeys.private(),
  });

  queryClient.removeQueries({
    queryKey: portalQueryKeys.private(),
  });
}

export type PortalAccessTransition = "anonymous" | "denied";

export function portalAccessTransitionFromStatus(
  status: number,
): PortalAccessTransition | null {
  if (status === 401) {
    return "anonymous";
  }

  if (status === 403) {
    return "denied";
  }

  return null;
}

export function handlePortalAccessError(
  queryClient: QueryClient,
  status: number,
  onTransition: (transition: PortalAccessTransition) => void,
): boolean {
  const transition = portalAccessTransitionFromStatus(status);

  if (!transition) {
    return false;
  }

  cleanupPortalPrivateQueries(queryClient);
  onTransition(transition);

  return true;
}
``

## beauty-core-ui/src/features/portal/auth/portal-auth-context.tsx

``text
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";

import type {
  PortalLogoutResponse,
} from "./portal-auth-contracts";
import {
  normalizePortalAuthError,
} from "./portal-auth-errors";
import {
  clearPortalSession as clearStoredPortalSession,
  hasPortalSession,
  logoutPortalSession,
  restorePortalSession,
} from "./portal-auth-session";
import {
  canUsePortalPrivateQueries,
  PORTAL_AUTH_INITIAL_STATE,
  portalAuthReducer,
  type PortalAuthState,
  type PortalClientIdentity,
} from "./portal-auth";

export type PortalAuthContextValue = PortalAuthState & {
  canUsePrivateQueries: boolean;
  beginRestore: () => void;
  restoreSession: () => Promise<PortalClientIdentity | null>;
  markAnonymous: () => void;
  markAuthenticated: (identity: PortalClientIdentity) => void;
  markDenied: () => void;
  clearSession: () => void;
  logoutSession: () => Promise<PortalLogoutResponse | null>;
};

const PortalAuthContext =
  createContext<PortalAuthContextValue | null>(null);

type PortalAuthProviderProps = {
  children: ReactNode;
  initialState?: PortalAuthState;
  restoreOnMount?: boolean;
};

export function PortalAuthProvider({
  children,
  initialState = PORTAL_AUTH_INITIAL_STATE,
  restoreOnMount = false,
}: PortalAuthProviderProps) {
  const [state, dispatch] = useReducer(
    portalAuthReducer,
    initialState,
  );

  const restoreStartedRef = useRef(false);

  const beginRestore = useCallback(() => {
    dispatch({ type: "restore" });
  }, []);

  const markAnonymous = useCallback(() => {
    dispatch({ type: "anonymous" });
  }, []);

  const markAuthenticated = useCallback(
    (identity: PortalClientIdentity) => {
      dispatch({
        type: "authenticated",
        identity,
      });
    },
    [],
  );

  const markDenied = useCallback(() => {
    dispatch({ type: "denied" });
  }, []);

  const clearSession = useCallback(() => {
    clearStoredPortalSession();
    dispatch({ type: "clear" });
  }, []);

  const restoreSession = useCallback(async () => {
    beginRestore();

    try {
      const identity = await restorePortalSession();

      if (!identity) {
        markAnonymous();
        return null;
      }

      markAuthenticated(identity);
      return identity;
    } catch (error) {
      const normalized = normalizePortalAuthError(error);

      if (normalized.kind === "forbidden") {
        markDenied();
      } else {
        markAnonymous();
      }

      throw error;
    }
  }, [
    beginRestore,
    markAnonymous,
    markAuthenticated,
    markDenied,
  ]);

  const logoutSession = useCallback(async () => {
    try {
      return await logoutPortalSession();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  useEffect(() => {
    if (
      !restoreOnMount ||
      restoreStartedRef.current ||
      initialState.status !== "unknown"
    ) {
      return;
    }

    restoreStartedRef.current = true;

    if (!hasPortalSession()) {
      markAnonymous();
      return;
    }

    void restoreSession().catch(() => undefined);
  }, [
    initialState.status,
    markAnonymous,
    restoreOnMount,
    restoreSession,
  ]);

  const value = useMemo<PortalAuthContextValue>(
    () => ({
      ...state,
      canUsePrivateQueries: canUsePortalPrivateQueries(state),
      beginRestore,
      restoreSession,
      markAnonymous,
      markAuthenticated,
      markDenied,
      clearSession,
      logoutSession,
    }),
    [
      beginRestore,
      clearSession,
      logoutSession,
      markAnonymous,
      markAuthenticated,
      markDenied,
      restoreSession,
      state,
    ],
  );

  return (
    <PortalAuthContext.Provider value={value}>
      {children}
    </PortalAuthContext.Provider>
  );
}

export function usePortalAuth(): PortalAuthContextValue {
  const context = useContext(PortalAuthContext);

  if (!context) {
    throw new Error(
      "usePortalAuth deve ser utilizado dentro de PortalAuthProvider.",
    );
  }

  return context;
}

type PortalAuthBoundaryProps = {
  children: ReactNode;
  restoringFallback?: ReactNode;
  anonymousFallback?: ReactNode;
  deniedFallback?: ReactNode;
};

export function PortalAuthBoundary({
  children,
  restoringFallback = null,
  anonymousFallback = null,
  deniedFallback = null,
}: PortalAuthBoundaryProps) {
  const { status } = usePortalAuth();

  if (status === "unknown" || status === "restoring") {
    return restoringFallback;
  }

  if (status === "anonymous") {
    return anonymousFallback;
  }

  if (status === "denied") {
    return deniedFallback;
  }

  return children;
}
``

## beauty-core-ui/src/features/portal/navigation/portal-navigation.ts

``text
export type PortalNavigationItem = {
  href: string;
  label: string;
  enabled?: boolean;
};

export function isSafePortalHref(href: string): boolean {
  return href === "/portal" || href.startsWith("/portal/");
}

export function isPortalNavigationItemActive(
  href: string,
  activePath: string,
): boolean {
  if (href === "/portal") {
    return activePath === "/portal";
  }

  return activePath === href || activePath.startsWith(`${href}/`);
}
``

## beauty-core-ui/src/app/portal/layout.tsx

``text
import type { ReactNode } from "react";

import { PortalAuthProvider } from "@/features/portal/auth/portal-auth-context";
import { PortalShell } from "@/features/portal/components/portal-shell";

type PortalLayoutProps = {
  children: ReactNode;
};

export default function PortalLayout({
  children,
}: PortalLayoutProps) {
  return (
    <PortalAuthProvider restoreOnMount>
      <PortalShell>{children}</PortalShell>
    </PortalAuthProvider>
  );
}
``

## Contratos ClienteArea confirmados

- GET /cliente-area/notificacoes
- GET /cliente-area/notificacoes/nao-lidas
- PATCH /cliente-area/notificacoes/:id/lida
- GET /cliente-area/mensagens-whatsapp
- GET /cliente-area/historico

## Próxima ação

Implementar somente services, tipos, query keys e queries frontend compatíveis com a foundation encontrada.
