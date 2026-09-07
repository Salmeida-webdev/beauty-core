import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  StatusPagamento,
  TipoMovimentacaoFinanceira,
  TipoUsuarioAuditoria,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { TenantValidatorService } from '../../shared/tenant';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../shared/utils/pagination.util';

import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { RegistrarPagamentoDto } from './dto/registrar-pagamento.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';

import { AutomacoesService } from '../automacoes/automacoes.service';
import { TipoEventoSistema } from '../automacoes/eventos/tipo-evento-sistema.enum';
import { AuditoriaService } from '../auditoria/auditoria.service';

type DadosRelacionamentosFinanceiro = {
  categoriaId?: string | null;
  clienteId?: string | null;
  agendamentoId?: string | null;
  tipo?: TipoMovimentacaoFinanceira | null;
};

@Injectable()
export class FinanceiroService {
  private readonly logger = new Logger(FinanceiroService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly automacoesService: AutomacoesService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreateMovimentacaoDto) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.validarRelacionamentos(empresaId, dto);

    const movimentacao =
      await this.prisma.movimentacaoFinanceira.create({
        data: {
          empresaId,
          categoriaId: dto.categoriaId,
          clienteId: dto.clienteId,
          agendamentoId: dto.agendamentoId,
          descricao: dto.descricao,
          tipo: dto.tipo,
          valor: dto.valor,
          formaPagamento: dto.formaPagamento,
          observacoes: dto.observacoes,
        },
        include: this.getIncludeBasico(),
      });

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.MOVIMENTACAO_FINANCEIRA,
      modulo: 'FINANCEIRO',
      titulo:
        dto.tipo === TipoMovimentacaoFinanceira.RECEITA
          ? 'Receita criada'
          : 'Despesa criada',
      mensagem: `${
        dto.tipo === TipoMovimentacaoFinanceira.RECEITA
          ? 'Receita'
          : 'Despesa'
      } de R$ ${Number(movimentacao.valor).toFixed(2)} registrada.`,
      referenciaId: movimentacao.id,
      dados: {
        movimentacaoId: movimentacao.id,
        categoriaId: movimentacao.categoriaId,
        categoriaNome: movimentacao.categoria?.nome,
        clienteId: movimentacao.clienteId,
        agendamentoId: movimentacao.agendamentoId,
        descricao: movimentacao.descricao,
        tipo: movimentacao.tipo,
        valor: Number(movimentacao.valor),
        formaPagamento: movimentacao.formaPagamento,
        status: movimentacao.status,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[FINANCEIRO] movimentacao criada empresaId=${empresaId} movimentacaoId=${movimentacao.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'FINANCEIRO',
      recurso: 'MovimentacaoFinanceira',
      recursoId: movimentacao.id,
      clienteId: movimentacao.clienteId ?? undefined,
      dadosDepois: {
        id: movimentacao.id,
        descricao: movimentacao.descricao,
        tipo: movimentacao.tipo,
        valor: Number(movimentacao.valor),
        status: movimentacao.status,
        categoriaId: movimentacao.categoriaId,
        categoriaNome: movimentacao.categoria?.nome,
        clienteId: movimentacao.clienteId,
        agendamentoId: movimentacao.agendamentoId,
        formaPagamento: movimentacao.formaPagamento,
        observacoes: movimentacao.observacoes,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Movimentação financeira criada.',
    });

    return this.formatarMovimentacao(movimentacao);
  }

  async findAll(empresaId: string, query: PaginationDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.validarFiltrosFinanceiros(empresaId, {
      categoriaId: query['categoriaId'],
      clienteId: query['clienteId'],
      agendamentoId: query['agendamentoId'],
    });

    const { page, limit, skip, take } =
      getPaginationParams(query);

    const orderDirection = query.orderDirection ?? 'desc';
    const orderBy: Prisma.MovimentacaoFinanceiraOrderByWithRelationInput = (() => {
      switch (query.orderBy) {
        case 'createdAt':
          return { createdAt: orderDirection };
        case 'updatedAt':
          return { updatedAt: orderDirection };
        case 'valor':
          return { valor: orderDirection };
        case 'status':
          return { status: orderDirection };
        case 'tipo':
          return { tipo: orderDirection };
        case 'descricao':
          return { descricao: orderDirection };
        case 'dataMovimentacao':
        default:
          return { dataMovimentacao: orderDirection };
      }
    })();

    const where = this.montarWhereFinanceiro(
      empresaId,
      query,
    );

    const [data, total] = await Promise.all([
      this.prisma.movimentacaoFinanceira.findMany({
        where,
        skip,
        take,
        orderBy,
        include: this.getIncludeBasico(),
      }),
      this.prisma.movimentacaoFinanceira.count({
        where,
      }),
    ]);

    return buildPaginatedResponse(
      data.map((item) => this.formatarMovimentacao(item)),
      total,
      page,
      limit,
    );
  }

  async findOne(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const movimentacao =
      await this.prisma.movimentacaoFinanceira.findFirst({
        where: {
          id,
          empresaId,
        },
        include: this.getIncludeBasico(),
      });

    if (!movimentacao) {
      throw new NotFoundException(
        'Movimentação financeira não encontrada',
      );
    }

    return this.formatarMovimentacao(movimentacao);
  }

  async update(
    empresaId: string,
    id: string,
    dto: UpdateMovimentacaoDto,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const movimentacaoAtual = await this.findOne(
      empresaId,
      id,
    );

    const dadosAntes = {
      descricao: movimentacaoAtual.descricao,
      tipo: movimentacaoAtual.tipo,
      valor: movimentacaoAtual.valor,
      status: movimentacaoAtual.status,
      categoriaId: movimentacaoAtual.categoriaId,
      categoriaNome: movimentacaoAtual.categoria?.nome,
      clienteId: movimentacaoAtual.clienteId,
      agendamentoId: movimentacaoAtual.agendamentoId,
      formaPagamento: movimentacaoAtual.formaPagamento,
      observacoes: movimentacaoAtual.observacoes,
    };

    await this.validarRelacionamentos(empresaId, {
      categoriaId:
        dto.categoriaId ?? movimentacaoAtual.categoriaId,
      clienteId:
        dto.clienteId ?? movimentacaoAtual.clienteId,
      agendamentoId:
        dto.agendamentoId ?? movimentacaoAtual.agendamentoId,
      tipo: dto.tipo ?? movimentacaoAtual.tipo,
    });

    const result =
      await this.prisma.movimentacaoFinanceira.updateMany({
        where: {
          id,
          empresaId,
        },
        data: dto,
      });

    if (result.count === 0) {
      throw new NotFoundException(
        'Movimentação financeira não encontrada',
      );
    }

    const movimentacaoAtualizada = await this.findOne(
      empresaId,
      id,
    );

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[FINANCEIRO] movimentacao atualizada empresaId=${empresaId} movimentacaoId=${movimentacaoAtualizada.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarAtualizacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'FINANCEIRO',
      recurso: 'MovimentacaoFinanceira',
      recursoId: movimentacaoAtualizada.id,
      clienteId: movimentacaoAtualizada.clienteId ?? undefined,
      dadosAntes,
      dadosDepois: {
        descricao: movimentacaoAtualizada.descricao,
        tipo: movimentacaoAtualizada.tipo,
        valor: movimentacaoAtualizada.valor,
        status: movimentacaoAtualizada.status,
        categoriaId: movimentacaoAtualizada.categoriaId,
        categoriaNome: movimentacaoAtualizada.categoria?.nome,
        clienteId: movimentacaoAtualizada.clienteId,
        agendamentoId: movimentacaoAtualizada.agendamentoId,
        formaPagamento: movimentacaoAtualizada.formaPagamento,
        observacoes: movimentacaoAtualizada.observacoes,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Movimentação financeira atualizada.',
    });

    return movimentacaoAtualizada;
  }

  async cancelar(empresaId: string, id: string) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const movimentacaoAtual = await this.findOne(
      empresaId,
      id,
    );

    const dadosAntes = {
      descricao: movimentacaoAtual.descricao,
      tipo: movimentacaoAtual.tipo,
      valor: movimentacaoAtual.valor,
      status: movimentacaoAtual.status,
      categoriaId: movimentacaoAtual.categoriaId,
      categoriaNome: movimentacaoAtual.categoria?.nome,
      clienteId: movimentacaoAtual.clienteId,
      agendamentoId: movimentacaoAtual.agendamentoId,
      formaPagamento: movimentacaoAtual.formaPagamento,
    };

    const result =
      await this.prisma.movimentacaoFinanceira.updateMany({
        where: {
          id,
          empresaId,
        },
        data: {
          status: StatusPagamento.CANCELADO,
        },
      });

    if (result.count === 0) {
      throw new NotFoundException(
        'Movimentação financeira não encontrada',
      );
    }

    const movimentacaoCancelada = await this.findOne(
      empresaId,
      id,
    );

    if (
      movimentacaoAtual.status !==
      StatusPagamento.CANCELADO
    ) {
      await this.automacoesService.processarEvento({
        empresaId,
        tipo: TipoEventoSistema.MOVIMENTACAO_FINANCEIRA,
        modulo: 'FINANCEIRO',
        titulo: 'Movimentação financeira cancelada',
        mensagem: `Movimentação ${movimentacaoCancelada.descricao} foi cancelada.`,
        referenciaId: movimentacaoCancelada.id,
        dados: {
          movimentacaoId: movimentacaoCancelada.id,
          descricao: movimentacaoCancelada.descricao,
          tipo: movimentacaoCancelada.tipo,
          valor: movimentacaoCancelada.valor,
          statusAnterior: movimentacaoAtual.status,
          statusAtual: movimentacaoCancelada.status,
        },
      });
    }

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[FINANCEIRO] movimentacao cancelada empresaId=${empresaId} movimentacaoId=${movimentacaoCancelada.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCancelamento({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'FINANCEIRO',
      recurso: 'MovimentacaoFinanceira',
      recursoId: movimentacaoCancelada.id,
      clienteId: movimentacaoCancelada.clienteId ?? undefined,
      dadosAntes,
      dadosDepois: {
        descricao: movimentacaoCancelada.descricao,
        tipo: movimentacaoCancelada.tipo,
        valor: movimentacaoCancelada.valor,
        status: movimentacaoCancelada.status,
        categoriaId: movimentacaoCancelada.categoriaId,
        categoriaNome: movimentacaoCancelada.categoria?.nome,
        clienteId: movimentacaoCancelada.clienteId,
        agendamentoId: movimentacaoCancelada.agendamentoId,
        formaPagamento: movimentacaoCancelada.formaPagamento,
      },
      metadata: {
        tempoMs,
        statusAnterior: movimentacaoAtual.status,
        statusAtual: movimentacaoCancelada.status,
      },
      mensagem: 'Movimentação financeira cancelada.',
    });

    return movimentacaoCancelada;
  }

  async pagar(
    empresaId: string,
    id: string,
    dto: RegistrarPagamentoDto,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const movimentacaoAtual = await this.findOne(
      empresaId,
      id,
    );

    const dadosAntes = {
      descricao: movimentacaoAtual.descricao,
      tipo: movimentacaoAtual.tipo,
      valor: movimentacaoAtual.valor,
      status: movimentacaoAtual.status,
      categoriaId: movimentacaoAtual.categoriaId,
      categoriaNome: movimentacaoAtual.categoria?.nome,
      clienteId: movimentacaoAtual.clienteId,
      agendamentoId: movimentacaoAtual.agendamentoId,
      formaPagamento: movimentacaoAtual.formaPagamento,
    };

    const result =
      await this.prisma.movimentacaoFinanceira.updateMany({
        where: {
          id,
          empresaId,
        },
        data: {
          status: StatusPagamento.PAGO,
          formaPagamento: dto.formaPagamento,
        },
      });

    if (result.count === 0) {
      throw new NotFoundException(
        'Movimentação financeira não encontrada',
      );
    }

    const movimentacaoPaga = await this.findOne(
      empresaId,
      id,
    );

    if (movimentacaoAtual.status !== StatusPagamento.PAGO) {
      await this.automacoesService.processarEvento({
        empresaId,
        tipo: TipoEventoSistema.MOVIMENTACAO_FINANCEIRA,
        modulo: 'FINANCEIRO',
        titulo: 'Pagamento registrado',
        mensagem: `Pagamento de R$ ${Number(
          movimentacaoPaga.valor,
        ).toFixed(2)} registrado.`,
        referenciaId: movimentacaoPaga.id,
        dados: {
          movimentacaoId: movimentacaoPaga.id,
          descricao: movimentacaoPaga.descricao,
          tipo: movimentacaoPaga.tipo,
          valor: movimentacaoPaga.valor,
          formaPagamento: movimentacaoPaga.formaPagamento,
          statusAnterior: movimentacaoAtual.status,
          statusAtual: movimentacaoPaga.status,
        },
      });
    }

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[FINANCEIRO] pagamento registrado empresaId=${empresaId} movimentacaoId=${movimentacaoPaga.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarPagamento({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'FINANCEIRO',
      recurso: 'MovimentacaoFinanceira',
      recursoId: movimentacaoPaga.id,
      clienteId: movimentacaoPaga.clienteId ?? undefined,
      dadosAntes,
      dadosDepois: {
        descricao: movimentacaoPaga.descricao,
        tipo: movimentacaoPaga.tipo,
        valor: movimentacaoPaga.valor,
        status: movimentacaoPaga.status,
        categoriaId: movimentacaoPaga.categoriaId,
        categoriaNome: movimentacaoPaga.categoria?.nome,
        clienteId: movimentacaoPaga.clienteId,
        agendamentoId: movimentacaoPaga.agendamentoId,
        formaPagamento: movimentacaoPaga.formaPagamento,
      },
      metadata: {
        tempoMs,
        statusAnterior: movimentacaoAtual.status,
        statusAtual: movimentacaoPaga.status,
      },
      mensagem: 'Pagamento registrado.',
    });

    return movimentacaoPaga;
  }

  async resumo(
    empresaId: string,
    dataInicio?: string,
    dataFim?: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const filtroData = this.montarFiltroData(
      dataInicio,
      dataFim,
    );

    const [receitas, despesas] = await Promise.all([
      this.prisma.movimentacaoFinanceira.aggregate({
        where: {
          empresaId,
          tipo: TipoMovimentacaoFinanceira.RECEITA,
          status: StatusPagamento.PAGO,
          ...(filtroData
            ? { dataMovimentacao: filtroData }
            : {}),
        },
        _sum: {
          valor: true,
        },
      }),
      this.prisma.movimentacaoFinanceira.aggregate({
        where: {
          empresaId,
          tipo: TipoMovimentacaoFinanceira.DESPESA,
          status: StatusPagamento.PAGO,
          ...(filtroData
            ? { dataMovimentacao: filtroData }
            : {}),
        },
        _sum: {
          valor: true,
        },
      }),
    ]);

    const totalReceitas = Number(receitas._sum.valor || 0);
    const totalDespesas = Number(despesas._sum.valor || 0);

    return {
      receitas: totalReceitas,
      despesas: totalDespesas,
      saldo: totalReceitas - totalDespesas,
    };
  }

  async fluxoCaixa(
    empresaId: string,
    dataInicio?: string,
    dataFim?: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const filtroData = this.montarFiltroData(
      dataInicio,
      dataFim,
    );

    const whereBase: Prisma.MovimentacaoFinanceiraWhereInput = {
      empresaId,
      status: StatusPagamento.PAGO,
      ...(filtroData
        ? { dataMovimentacao: filtroData }
        : {}),
    };

    const [entradasTotal, saidasTotal, ultimasMovimentacoes] =
      await Promise.all([
        this.prisma.movimentacaoFinanceira.aggregate({
          where: {
            ...whereBase,
            tipo: TipoMovimentacaoFinanceira.RECEITA,
          },
          _sum: {
            valor: true,
          },
        }),
        this.prisma.movimentacaoFinanceira.aggregate({
          where: {
            ...whereBase,
            tipo: TipoMovimentacaoFinanceira.DESPESA,
          },
          _sum: {
            valor: true,
          },
        }),
        this.prisma.movimentacaoFinanceira.findMany({
          where: whereBase,
          orderBy: {
            dataMovimentacao: 'desc',
          },
          take: 100,
          include: this.getIncludeBasico(),
        }),
      ]);

    const totalEntradas = Number(
      entradasTotal._sum.valor || 0,
    );
    const totalSaidas = Number(
      saidasTotal._sum.valor || 0,
    );

    return {
      totalEntradas,
      totalSaidas,
      saldo: totalEntradas - totalSaidas,
      movimentacoes: ultimasMovimentacoes.map((item) =>
        this.formatarMovimentacao(item),
      ),
    };
  }

  async receitasMes(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const { inicioMes, fimMes, hoje } =
      this.getIntervaloMesAtual();

    const receitas =
      await this.prisma.movimentacaoFinanceira.aggregate({
        where: {
          empresaId,
          tipo: TipoMovimentacaoFinanceira.RECEITA,
          status: StatusPagamento.PAGO,
          dataMovimentacao: {
            gte: inicioMes,
            lt: fimMes,
          },
        },
        _sum: {
          valor: true,
        },
      });

    return {
      mes: hoje.getMonth() + 1,
      ano: hoje.getFullYear(),
      total: Number(receitas._sum.valor || 0),
    };
  }

  async despesasMes(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const { inicioMes, fimMes, hoje } =
      this.getIntervaloMesAtual();

    const despesas =
      await this.prisma.movimentacaoFinanceira.aggregate({
        where: {
          empresaId,
          tipo: TipoMovimentacaoFinanceira.DESPESA,
          status: StatusPagamento.PAGO,
          dataMovimentacao: {
            gte: inicioMes,
            lt: fimMes,
          },
        },
        _sum: {
          valor: true,
        },
      });

    return {
      mes: hoje.getMonth() + 1,
      ano: hoje.getFullYear(),
      total: Number(despesas._sum.valor || 0),
    };
  }

  private async validarRelacionamentos(
    empresaId: string,
    dto: DadosRelacionamentosFinanceiro,
  ) {
    if (dto.categoriaId) {
      const categoria =
        await this.tenantValidator.validarCategoriaFinanceira(
          empresaId,
          dto.categoriaId,
        );

      if (dto.tipo && categoria.tipo !== dto.tipo) {
        throw new BadRequestException(
          'O tipo da movimentação deve ser igual ao tipo da categoria',
        );
      }
    }

    if (
      dto.tipo === TipoMovimentacaoFinanceira.DESPESA &&
      (dto.clienteId || dto.agendamentoId)
    ) {
      throw new BadRequestException(
        'Despesas não devem possuir cliente ou agendamento',
      );
    }

    if (dto.clienteId) {
      await this.tenantValidator.validarCliente(
        empresaId,
        dto.clienteId,
      );
    }

    if (dto.agendamentoId) {
      const agendamento =
        await this.tenantValidator.validarAgendamento(
          empresaId,
          dto.agendamentoId,
        );

      if (
        dto.clienteId &&
        agendamento.clienteId !== dto.clienteId
      ) {
        throw new BadRequestException(
          'O agendamento informado não pertence ao cliente informado.',
        );
      }
    }
  }

  private async validarFiltrosFinanceiros(
    empresaId: string,
    filtros: {
      categoriaId?: string;
      clienteId?: string;
      agendamentoId?: string;
    },
  ) {
    const validacoes: Promise<unknown>[] = [];

    if (filtros.categoriaId) {
      validacoes.push(
        this.tenantValidator.validarCategoriaFinanceira(
          empresaId,
          filtros.categoriaId,
        ),
      );
    }

    if (filtros.clienteId) {
      validacoes.push(
        this.tenantValidator.validarCliente(
          empresaId,
          filtros.clienteId,
        ),
      );
    }

    if (filtros.agendamentoId) {
      validacoes.push(
        this.tenantValidator.validarAgendamento(
          empresaId,
          filtros.agendamentoId,
        ),
      );
    }

    await Promise.all(validacoes);
  }

  private montarWhereFinanceiro(
    empresaId: string,
    query: PaginationDto,
  ): Prisma.MovimentacaoFinanceiraWhereInput {
    const dataInicio = query['dataInicio']
      ? new Date(query['dataInicio'])
      : undefined;

    const dataFim = query['dataFim']
      ? new Date(query['dataFim'])
      : undefined;

    const tipo = query['tipo'] as
      | TipoMovimentacaoFinanceira
      | undefined;

    const status = query['status'] as
      | StatusPagamento
      | undefined;

    return {
      empresaId,
      ...(tipo ? { tipo } : {}),
      ...(status ? { status } : {}),
      ...(query['categoriaId']
        ? { categoriaId: query['categoriaId'] }
        : {}),
      ...(query['clienteId']
        ? { clienteId: query['clienteId'] }
        : {}),
      ...(query['agendamentoId']
        ? { agendamentoId: query['agendamentoId'] }
        : {}),
      ...(dataInicio || dataFim
        ? {
            dataMovimentacao: {
              ...(dataInicio ? { gte: dataInicio } : {}),
              ...(dataFim ? { lte: dataFim } : {}),
            },
          }
        : {}),
      ...(query.search
        ? {
            OR: [
              {
                descricao: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                categoria: {
                  nome: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                cliente: {
                  nome: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          }
        : {}),
    };
  }

  private montarFiltroData(
    dataInicio?: string,
    dataFim?: string,
  ): Prisma.DateTimeFilter | undefined {
    if (!dataInicio && !dataFim) {
      return undefined;
    }

    return {
      ...(dataInicio ? { gte: new Date(dataInicio) } : {}),
      ...(dataFim ? { lte: new Date(dataFim) } : {}),
    };
  }

  private getIntervaloMesAtual() {
    const hoje = new Date();

    const inicioMes = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      1,
    );

    const fimMes = new Date(
      hoje.getFullYear(),
      hoje.getMonth() + 1,
      1,
    );

    return {
      hoje,
      inicioMes,
      fimMes,
    };
  }

  private getIncludeBasico() {
    return {
      categoria: {
        select: {
          id: true,
          nome: true,
          tipo: true,
        },
      },
      cliente: {
        select: {
          id: true,
          nome: true,
          telefone: true,
        },
      },
      agendamento: {
        select: {
          id: true,
          dataHoraInicio: true,
          status: true,
        },
      },
    };
  }

  private formatarMovimentacao(movimentacao: any) {
    return {
      ...movimentacao,
      valor: Number(movimentacao.valor),
    };
  }
}
