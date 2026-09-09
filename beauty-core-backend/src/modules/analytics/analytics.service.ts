import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  private db(): PrismaService {
    return this.prisma;
  }

  private inicioDoMes(): Date {
    const hoje = new Date();

    return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  }

  private trintaDiasAtras(): Date {
    const data = new Date();

    data.setDate(data.getDate() - 30);

    return data;
  }

  private percentual(atual: number, anterior: number): number {
    if (anterior === 0 && atual > 0) {
      return 100;
    }

    if (anterior === 0) {
      return 0;
    }

    return Number((((atual - anterior) / anterior) * 100).toFixed(2));
  }

  private numero(valor: any): number {
    return Number(valor ?? 0);
  }

  private analyticsTopLimit(defaultValue = 10): number {
    const value = Number(process.env.ANALYTICS_TOP_LIMIT ?? defaultValue);

    if (!Number.isFinite(value) || value <= 0) {
      return defaultValue;
    }

    return Math.min(Math.floor(value), 50);
  }

  private analyticsScanLimit(defaultValue = 5000): number {
    const value = Number(process.env.ANALYTICS_SCAN_LIMIT ?? defaultValue);

    if (!Number.isFinite(value) || value <= 0) {
      return defaultValue;
    }

    return Math.min(Math.floor(value), 10000);
  }

  private filtroData(
    dataInicio?: string,
    dataFim?: string,
    campo = 'createdAt',
  ) {
    if (!dataInicio && !dataFim) {
      return {};
    }

    return {
      [campo]: {
        ...(dataInicio ? { gte: new Date(dataInicio) } : {}),
        ...(dataFim ? { lte: new Date(dataFim) } : {}),
      },
    };
  }

  async dashboard(empresaId: string, dataInicio?: string, dataFim?: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const [clientes, agendamentos, financeiro, fidelidade, pacotes, whatsapp] =
      await Promise.all([
        this.clientes(empresaId),
        this.agendamentos(empresaId, dataInicio, dataFim),
        this.financeiro(empresaId, dataInicio, dataFim),
        this.fidelidade(empresaId),
        this.pacotes(empresaId),
        this.whatsapp(empresaId, dataInicio, dataFim),
      ]);

    return {
      clientes: {
        totalClientes: clientes.totalClientes,
        clientesAtivos: clientes.ativos,
        clientesInativos: clientes.inativos,
        clientesAniversariantesMes: clientes.aniversariantesMes,
      },
      agendamentos: {
        totalAgendamentos: agendamentos.total,
        confirmados: agendamentos.confirmados,
        cancelados: agendamentos.cancelados,
        concluidos: agendamentos.concluidos,
        pendentes: agendamentos.pendentes,
      },
      financeiro: {
        receitas: financeiro.receitas,
        despesas: financeiro.despesas,
        saldo: financeiro.saldo,
        ticketMedio: financeiro.ticketMedio,
      },
      fidelidade: {
        clientesComPontos: fidelidade.clientesComPontos,
        pontosDistribuidos: fidelidade.pontosDistribuidos,
        beneficiosLiberados: fidelidade.beneficiosLiberados,
      },
      pacotes: {
        pacotesAtivos: pacotes.pacotesAtivos,
        pacotesFinalizados: pacotes.pacotesFinalizados,
        pacotesVencidos: pacotes.pacotesVencidos,
      },
      whatsapp: {
        mensagensCriadas: whatsapp.mensagensCriadas,
        mensagensEnviadas: whatsapp.mensagensEnviadas,
        campanhasCriadas: whatsapp.campanhasCriadas,
      },
    };
  }

  async clientes(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const ultimos30 = this.trintaDiasAtras();
    const mesAtual = new Date().getMonth();

    const [
      totalClientes,
      ativos,
      inativos,
      novosUltimos30Dias,
      clientesAntes30Dias,
      clientesComNascimento,
    ] = await Promise.all([
      this.db().cliente.count({
        where: {
          empresaId,
        },
      }),

      this.db().cliente.count({
        where: {
          empresaId,
          ativo: true,
        },
      }),

      this.db().cliente.count({
        where: {
          empresaId,
          ativo: false,
        },
      }),

      this.db().cliente.count({
        where: {
          empresaId,
          createdAt: {
            gte: ultimos30,
          },
        },
      }),

      this.db().cliente.count({
        where: {
          empresaId,
          createdAt: {
            lt: ultimos30,
          },
        },
      }),

      this.db().cliente.findMany({
        where: {
          empresaId,
          ativo: true,
          dataNascimento: {
            not: null,
          },
        },
        select: {
          dataNascimento: true,
        },
        take: this.analyticsScanLimit(),
      }),
    ]);

    const aniversariantesMes = clientesComNascimento.reduce(
      (total: number, cliente) =>
        cliente.dataNascimento?.getMonth() === mesAtual ? total + 1 : total,
      0,
    );

    return {
      totalClientes,
      ativos,
      inativos,
      novosUltimos30Dias,
      aniversariantesMes,
      crescimentoPercentual: this.percentual(
        novosUltimos30Dias,
        clientesAntes30Dias,
      ),
    };
  }

  async agendamentos(empresaId: string, dataInicio?: string, dataFim?: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const filtroPeriodo = this.filtroData(
      dataInicio,
      dataFim,
      'dataHoraInicio',
    );

    const whereBase = {
      empresaId,
      ...filtroPeriodo,
    };

    const [total, confirmados, cancelados, concluidos, pendentes] =
      await Promise.all([
        this.db().agendamento.count({
          where: whereBase,
        }),

        this.db().agendamento.count({
          where: {
            ...whereBase,
            status: 'CONFIRMADO',
          },
        }),

        this.db().agendamento.count({
          where: {
            ...whereBase,
            status: 'CANCELADO',
          },
        }),

        this.db().agendamento.count({
          where: {
            ...whereBase,
            status: 'CONCLUIDO',
          },
        }),

        this.db().agendamento.count({
          where: {
            ...whereBase,
            status: 'PENDENTE',
          },
        }),
      ]);

    return {
      total,
      confirmados,
      cancelados,
      concluidos,
      pendentes,
      taxaCancelamento: total
        ? Number(((cancelados / total) * 100).toFixed(2))
        : 0,
      taxaConclusao: total
        ? Number(((concluidos / total) * 100).toFixed(2))
        : 0,
    };
  }

  async financeiro(empresaId: string, dataInicio?: string, dataFim?: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const inicioMes = this.inicioDoMes();

    const filtroPeriodo = this.filtroData(
      dataInicio,
      dataFim,
      'dataMovimentacao',
    );

    const whereBase = {
      empresaId,
      status: 'PAGO' as const,
      ...filtroPeriodo,
    };

    const [
      receitasAgg,
      despesasAgg,
      receitasMesAgg,
      despesasMesAgg,
      agendamentosConcluidos,
    ] = await Promise.all([
      this.db().movimentacaoFinanceira.aggregate({
        where: {
          ...whereBase,
          tipo: 'RECEITA',
        },
        _sum: {
          valor: true,
        },
      }),

      this.db().movimentacaoFinanceira.aggregate({
        where: {
          ...whereBase,
          tipo: 'DESPESA',
        },
        _sum: {
          valor: true,
        },
      }),

      this.db().movimentacaoFinanceira.aggregate({
        where: {
          empresaId,
          status: 'PAGO' as const,
          tipo: 'RECEITA',
          dataMovimentacao: {
            gte: inicioMes,
          },
        },
        _sum: {
          valor: true,
        },
      }),

      this.db().movimentacaoFinanceira.aggregate({
        where: {
          empresaId,
          status: 'PAGO' as const,
          tipo: 'DESPESA',
          dataMovimentacao: {
            gte: inicioMes,
          },
        },
        _sum: {
          valor: true,
        },
      }),

      this.db().agendamento.count({
        where: {
          empresaId,
          status: 'CONCLUIDO',
          ...this.filtroData(dataInicio, dataFim, 'dataHoraInicio'),
        },
      }),
    ]);

    const receitas = this.numero(receitasAgg._sum?.valor);
    const despesas = this.numero(despesasAgg._sum?.valor);
    const receitasMes = this.numero(receitasMesAgg._sum?.valor);
    const despesasMes = this.numero(despesasMesAgg._sum?.valor);

    return {
      receitas,
      despesas,
      saldo: receitas - despesas,
      ticketMedio: agendamentosConcluidos
        ? Number((receitas / agendamentosConcluidos).toFixed(2))
        : 0,
      receitasMes,
      despesasMes,
      crescimentoFinanceiro: this.percentual(
        receitasMes,
        receitas - receitasMes,
      ),
    };
  }

  async servicos(empresaId: string, dataInicio?: string, dataFim?: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const agrupados = await this.db().agendamento.groupBy({
      by: ['servicoId'],
      where: {
        empresaId,
        status: 'CONCLUIDO',
        ...this.filtroData(dataInicio, dataFim, 'dataHoraInicio'),
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: this.analyticsTopLimit(),
    });

    const servicoIds = agrupados.map((item) => item.servicoId).filter(Boolean);

    if (!servicoIds.length) {
      return [];
    }

    const servicos = await this.db().servico.findMany({
      where: {
        empresaId,
        id: {
          in: servicoIds,
        },
      },
      select: {
        id: true,
        nome: true,
        preco: true,
      },
    });

    const servicosMap = new Map<string, (typeof servicos)[number]>(
      servicos.map((servico) => [servico.id, servico] as const),
    );

    return agrupados.map((item, index: number) => {
      const servico = servicosMap.get(item.servicoId);
      const quantidade = item._count.id;
      const preco = this.numero(servico?.preco);

      return {
        ranking: index + 1,
        servico: servico?.nome ?? 'ServiÃƒÂ§o nÃƒÂ£o encontrado',
        quantidade,
        receita: quantidade * preco,
      };
    });
  }

  async profissionais(
    empresaId: string,
    dataInicio?: string,
    dataFim?: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const agrupados = await this.db().agendamento.groupBy({
      by: ['profissionalId'],
      where: {
        empresaId,
        status: 'CONCLUIDO',
        ...this.filtroData(dataInicio, dataFim, 'dataHoraInicio'),
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: this.analyticsTopLimit(),
    });

    const profissionalIds = agrupados
      .map((item) => item.profissionalId)
      .filter(Boolean);

    if (!profissionalIds.length) {
      return [];
    }

    const [profissionais, comissoes] = await Promise.all([
      this.db().usuario.findMany({
        where: {
          empresaId,
          id: {
            in: profissionalIds,
          },
        },
        select: {
          id: true,
          nome: true,
        },
      }),

      this.db().comissaoProfissional.groupBy({
        by: ['profissionalId'],
        where: {
          empresaId,
          profissionalId: {
            in: profissionalIds,
          },
          ...this.filtroData(dataInicio, dataFim, 'createdAt'),
        },
        _sum: {
          valorServico: true,
          valorComissao: true,
        },
      }),
    ]);

    const profissionaisMap = new Map<string, (typeof profissionais)[number]>(
      profissionais.map(
        (profissional) => [profissional.id, profissional] as const,
      ),
    );

    const comissoesMap = new Map<string, (typeof comissoes)[number]>(
      comissoes.map((comissao) => [comissao.profissionalId, comissao] as const),
    );

    return agrupados.map((item, index: number) => {
      const profissional = profissionaisMap.get(item.profissionalId);
      const comissao = comissoesMap.get(item.profissionalId);

      return {
        ranking: index + 1,
        nome: profissional?.nome ?? 'Profissional nÃƒÂ£o encontrado',
        atendimentos: item._count.id,
        receita: this.numero(comissao?._sum.valorServico),
        comissao: this.numero(comissao?._sum.valorComissao),
      };
    });
  }

  async unidades(empresaId: string, dataInicio?: string, dataFim?: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const agrupados = await this.db().agendamento.groupBy({
      by: ['unidadeId'],
      where: {
        empresaId,
        ...this.filtroData(dataInicio, dataFim, 'dataHoraInicio'),
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: this.analyticsTopLimit(),
    });

    const unidadeIds = agrupados.map((item) => item.unidadeId).filter(Boolean);

    if (!unidadeIds.length) {
      return [];
    }

    const [unidades, receitas] = await Promise.all([
      this.db().unidade.findMany({
        where: {
          empresaId,
          id: {
            in: unidadeIds,
          },
        },
        select: {
          id: true,
          nome: true,
        },
      }),

      this.db().movimentacaoFinanceira.findMany({
        where: {
          empresaId,
          tipo: 'RECEITA',
          status: 'PAGO' as const,
          ...this.filtroData(dataInicio, dataFim, 'dataMovimentacao'),
          agendamento: {
            unidadeId: {
              in: unidadeIds,
            },
          },
        },
        take: this.analyticsScanLimit(),
        select: {
          valor: true,
          agendamento: {
            select: {
              unidadeId: true,
            },
          },
        },
      }),
    ]);

    const unidadesMap = new Map<string, (typeof unidades)[number]>(
      unidades.map((unidade) => [unidade.id, unidade] as const),
    );

    const receitasPorUnidade = new Map<string, number>();

    for (const receita of receitas) {
      const unidadeId = receita.agendamento?.unidadeId;

      if (!unidadeId) {
        continue;
      }

      receitasPorUnidade.set(
        unidadeId,
        (receitasPorUnidade.get(unidadeId) ?? 0) + this.numero(receita.valor),
      );
    }

    return agrupados.map((item, index: number) => {
      const unidade = unidadesMap.get(item.unidadeId);

      return {
        ranking: index + 1,
        unidade: unidade?.nome ?? 'Unidade nÃƒÂ£o encontrada',
        receita: receitasPorUnidade.get(item.unidadeId) ?? 0,
        agendamentos: item._count.id,
        clientes: 0,
      };
    });
  }

  async fidelidade(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const [
      clientesComPontos,
      pontosDistribuidosAgg,
      pontosResgatadosAgg,
      beneficiosLiberados,
      topClientes,
    ] = await Promise.all([
      this.db().fidelidade.count({
        where: {
          empresaId,
          saldoPontos: {
            gt: 0,
          },
        },
      }),

      this.db().movimentacaoPontos.aggregate({
        where: {
          empresaId,
          tipo: 'GANHO',
        },
        _sum: {
          pontos: true,
        },
      }),

      this.db().movimentacaoPontos.aggregate({
        where: {
          empresaId,
          tipo: 'RESGATE',
        },
        _sum: {
          pontos: true,
        },
      }),

      this.db().beneficio.count({
        where: {
          empresaId,
          ativo: true,
        },
      }),

      this.db().fidelidade.findMany({
        where: {
          empresaId,
        },
        orderBy: {
          saldoPontos: 'desc',
        },
        take: this.analyticsTopLimit(),
        select: {
          saldoPontos: true,
          cliente: {
            select: {
              id: true,
              nome: true,
              telefone: true,
            },
          },
        },
      }),
    ]);

    return {
      clientesComPontos,
      pontosDistribuidos: this.numero(pontosDistribuidosAgg._sum.pontos),
      pontosResgatados: this.numero(pontosResgatadosAgg._sum.pontos),
      beneficiosLiberados,
      topClientes: topClientes.map((item, index: number) => ({
        ranking: index + 1,
        clienteId: item.cliente.id,
        nome: item.cliente.nome,
        telefone: item.cliente.telefone,
        pontos: item.saldoPontos,
      })),
    };
  }

  async pacotes(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const [
      pacotesVendidos,
      pacotesAtivos,
      pacotesFinalizados,
      pacotesVencidos,
      clientesPacotes,
    ] = await Promise.all([
      this.db().clientePacote.count({
        where: {
          empresaId,
        },
      }),

      this.db().clientePacote.count({
        where: {
          empresaId,
          status: 'ATIVO',
        },
      }),

      this.db().clientePacote.count({
        where: {
          empresaId,
          status: 'FINALIZADO',
        },
      }),

      this.db().clientePacote.count({
        where: {
          empresaId,
          status: 'VENCIDO',
        },
      }),

      this.db().clientePacote.findMany({
        where: {
          empresaId,
        },
        take: this.analyticsScanLimit(),
        select: {
          pacote: {
            select: {
              valor: true,
            },
          },
        },
      }),
    ]);

    const receitaGerada = clientesPacotes.reduce(
      (total: number, item) => total + this.numero(item.pacote?.valor),
      0,
    );

    return {
      pacotesVendidos,
      pacotesAtivos,
      pacotesFinalizados,
      pacotesVencidos,
      receitaGerada,
    };
  }

  async whatsapp(empresaId: string, dataInicio?: string, dataFim?: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const whereBase = {
      empresaId,
      ...this.filtroData(dataInicio, dataFim, 'createdAt'),
    };

    const [
      mensagensCriadas,
      mensagensSimuladas,
      mensagensEnviadas,
      campanhasCriadas,
      templatesAtivos,
    ] = await Promise.all([
      this.db().mensagemWhatsApp.count({
        where: whereBase,
      }),

      this.db().mensagemWhatsApp.count({
        where: {
          ...whereBase,
          status: 'SIMULADA',
        },
      }),

      this.db().mensagemWhatsApp.count({
        where: {
          ...whereBase,
          status: 'ENVIADA',
        },
      }),

      this.db().campanhaWhatsApp.count({
        where: whereBase,
      }),

      this.db().templateWhatsApp.count({
        where: {
          empresaId,
          ativo: true,
        },
      }),
    ]);

    return {
      mensagensCriadas,
      mensagensSimuladas,
      mensagensEnviadas,
      campanhasCriadas,
      templatesAtivos,
    };
  }

  async notificacoes(empresaId: string, dataInicio?: string, dataFim?: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const whereBase = {
      empresaId,
      ...this.filtroData(dataInicio, dataFim, 'createdAt'),
    };

    const [total, lidas, naoLidas, arquivadas] = await Promise.all([
      this.db().notificacao.count({
        where: whereBase,
      }),

      this.db().notificacao.count({
        where: {
          ...whereBase,
          status: 'LIDA',
        },
      }),

      this.db().notificacao.count({
        where: {
          ...whereBase,
          status: 'NAO_LIDA',
        },
      }),

      this.db().notificacao.count({
        where: {
          ...whereBase,
          status: 'ARQUIVADA',
        },
      }),
    ]);

    return {
      totalNotificacoes: total,
      lidas,
      naoLidas,
      arquivadas,
    };
  }

  async eventos(empresaId: string, dataInicio?: string, dataFim?: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const whereBase = {
      empresaId,
      ...this.filtroData(dataInicio, dataFim, 'createdAt'),
    };

    const [totalEventos, porTipo, porModulo, ultimosEventos] =
      await Promise.all([
        this.db().eventoSistema.count({
          where: whereBase,
        }),

        this.db().eventoSistema.groupBy({
          by: ['tipo'],
          where: whereBase,
          _count: {
            id: true,
          },
        }),

        this.db().eventoSistema.groupBy({
          by: ['modulo'],
          where: whereBase,
          _count: {
            id: true,
          },
        }),

        this.db().eventoSistema.findMany({
          where: whereBase,
          orderBy: {
            createdAt: 'desc',
          },
          take: this.analyticsTopLimit(),
        }),
      ]);

    return {
      totalEventos,
      porTipo: porTipo.reduce((acc: Record<string, number>, item) => {
        acc[item.tipo] = item._count.id;

        return acc;
      }, {}),
      porModulo: porModulo.reduce((acc: Record<string, number>, item) => {
        acc[item.modulo] = item._count.id;

        return acc;
      }, {}),
      ultimosEventos,
    };
  }
}
