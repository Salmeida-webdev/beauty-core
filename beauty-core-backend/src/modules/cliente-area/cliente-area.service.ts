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



