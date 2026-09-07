import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  StatusAgendamento,
  TipoUsuarioAuditoria,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { ListAgendamentosQueryDto } from './dto/list-agendamentos-query.dto';
import { TenantValidatorService } from '../../shared/tenant';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../shared/utils/pagination.util';

import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';

import { AuditoriaService } from '../auditoria/auditoria.service';
import { AutomacoesService } from '../automacoes/automacoes.service';
import { TipoEventoSistema } from '../automacoes/eventos/tipo-evento-sistema.enum';

@Injectable()
export class AgendamentosService {
  private readonly logger = new Logger(AgendamentosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly automacoesService: AutomacoesService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(
    createAgendamentoDto: CreateAgendamentoDto,
    empresaId: string,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.validarRelacionamentosDoAgendamento(
      empresaId,
      {
        clienteId: createAgendamentoDto.clienteId,
        profissionalId: createAgendamentoDto.profissionalId,
        servicoId: createAgendamentoDto.servicoId,
        unidadeId: createAgendamentoDto.unidadeId,
      },
    );

    const agendamento = await this.prisma.$transaction(async (tx) => {
      await this.lockAgenda(tx, empresaId, [
        createAgendamentoDto.profissionalId,
      ]);

      const status =
        createAgendamentoDto.status ?? StatusAgendamento.PENDENTE;

      if (this.ocupaAgenda(status)) {
        await this.assertNoScheduleConflict(tx, {
          empresaId,
          profissionalId: createAgendamentoDto.profissionalId,
          dataHoraInicio: new Date(createAgendamentoDto.dataHoraInicio),
          dataHoraFim: new Date(createAgendamentoDto.dataHoraFim),
        });
      }

      return tx.agendamento.create({
        data: {
          ...createAgendamentoDto,
          empresaId,
        },
      });
    });

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.AGENDAMENTO_CRIADO,
      modulo: 'AGENDAMENTOS',
      titulo: 'Novo agendamento criado',
      mensagem: `Um novo agendamento foi criado para ${new Date(
        agendamento.dataHoraInicio,
      ).toLocaleString('pt-BR')}.`,
      referenciaId: agendamento.id,
      dados: {
        agendamentoId: agendamento.id,
        clienteId: agendamento.clienteId,
        profissionalId: agendamento.profissionalId,
        servicoId: agendamento.servicoId,
        unidadeId: agendamento.unidadeId,
        status: agendamento.status,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[AGENDAMENTOS] agendamento criado empresaId=${empresaId} agendamentoId=${agendamento.id} clienteId=${agendamento.clienteId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'AGENDAMENTOS',
      recurso: 'Agendamento',
      recursoId: agendamento.id,
      clienteId: agendamento.clienteId,
      dadosDepois: {
        id: agendamento.id,
        clienteId: agendamento.clienteId,
        profissionalId: agendamento.profissionalId,
        servicoId: agendamento.servicoId,
        unidadeId: agendamento.unidadeId,
        status: agendamento.status,
        dataHoraInicio: agendamento.dataHoraInicio,
        dataHoraFim: agendamento.dataHoraFim,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Agendamento criado com sucesso.',
    });

    return agendamento;
  }

  async findAll(
    empresaId: string,
    query: ListAgendamentosQueryDto,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const { page, limit, skip, take } =
      getPaginationParams(query);

    const orderByPermitidos = [
      'dataHoraInicio',
      'dataHoraFim',
      'status',
      'createdAt',
      'updatedAt',
    ];

    const orderBy: keyof Prisma.AgendamentoOrderByWithRelationInput =
      orderByPermitidos.includes(query.orderBy ?? '')
        ? (query.orderBy as keyof Prisma.AgendamentoOrderByWithRelationInput)
        : 'dataHoraInicio';

    const orderDirection = query.orderDirection ?? 'asc';

    const dataInicio = query.dataInicio
      ? new Date(query.dataInicio)
      : undefined;

    const dataFim = query.dataFim
      ? new Date(query.dataFim)
      : undefined;

    const status = query.status;
    const clienteId = query.clienteId;
    const profissionalId = query.profissionalId;
    const servicoId = query.servicoId;
    const unidadeId = query.unidadeId;

    await this.validarFiltrosRelacionados(
      empresaId,
      {
        clienteId,
        profissionalId,
        servicoId,
        unidadeId,
      },
    );

    const where: Prisma.AgendamentoWhereInput = {
      empresaId,
      ...(status ? { status } : {}),
      ...(clienteId ? { clienteId } : {}),
      ...(profissionalId ? { profissionalId } : {}),
      ...(servicoId ? { servicoId } : {}),
      ...(unidadeId ? { unidadeId } : {}),
      ...(dataInicio || dataFim
        ? {
            dataHoraInicio: {
              ...(dataInicio ? { gte: dataInicio } : {}),
              ...(dataFim ? { lte: dataFim } : {}),
            },
          }
        : {}),
      ...(query.search
        ? {
            OR: [
              {
                cliente: {
                  nome: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                profissional: {
                  nome: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                servico: {
                  nome: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                unidade: {
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

    const [data, total] = await Promise.all([
      this.prisma.agendamento.findMany({
        where,
        skip,
        take,
        orderBy: {
          [orderBy]: orderDirection,
        },
        include: {
          cliente: {
            select: {
              id: true,
              nome: true,
              telefone: true,
            },
          },
          profissional: {
            select: {
              id: true,
              nome: true,
            },
          },
          servico: {
            select: {
              id: true,
              nome: true,
              preco: true,
              duracaoMinutos: true,
            },
          },
          unidade: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      }),
      this.prisma.agendamento.count({
        where,
      }),
    ]);

    return buildPaginatedResponse(
      data,
      total,
      page,
      limit,
    );
  }

  async listarProfissionaisDisponiveis(
    empresaId: string,
    search?: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const normalizedSearch = search?.trim().slice(0, 100);

    return this.prisma.usuario.findMany({
      where: {
        empresaId,
        role: 'PROFISSIONAL',
        ativo: true,
        ...(normalizedSearch
          ? {
              nome: {
                contains: normalizedSearch,
                mode: 'insensitive',
              },
            }
          : {}),
      },
      select: {
        id: true,
        nome: true,
      },
      orderBy: {
        nome: 'asc',
      },
      take: 30,
    });
  }

  async listarUnidadesDisponiveis(
    empresaId: string,
    search?: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const normalizedSearch = search?.trim().slice(0, 100);

    return this.prisma.unidade.findMany({
      where: {
        empresaId,
        ativa: true,
        ...(normalizedSearch
          ? {
              nome: {
                contains: normalizedSearch,
                mode: 'insensitive',
              },
            }
          : {}),
      },
      select: {
        id: true,
        nome: true,
      },
      orderBy: {
        nome: 'asc',
      },
      take: 50,
    });
  }
  async findOne(
    id: string,
    empresaId: string,
  ) {
    await this.tenantValidator.validarAgendamento(
      empresaId,
      id,
    );

    const agendamento =
      await this.prisma.agendamento.findFirst({
        where: {
          id,
          empresaId,
        },
        include: {
          cliente: {
            select: {
              id: true,
              nome: true,
              telefone: true,
              email: true,
            },
          },
          profissional: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
          servico: {
            select: {
              id: true,
              nome: true,
              preco: true,
              duracaoMinutos: true,
            },
          },
          unidade: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });

    if (!agendamento) {
      throw new NotFoundException(
        'Agendamento não encontrado',
      );
    }

    return agendamento;
  }

  async update(
    id: string,
    updateAgendamentoDto: UpdateAgendamentoDto,
    empresaId: string,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarAgendamento(
      empresaId,
      id,
    );

    await this.validarRelacionamentosDoAgendamento(
      empresaId,
      {
        clienteId: updateAgendamentoDto.clienteId,
        profissionalId: updateAgendamentoDto.profissionalId,
        servicoId: updateAgendamentoDto.servicoId,
        unidadeId: updateAgendamentoDto.unidadeId,
      },
    );

    const agendamentoResult = await this.prisma.$transaction(async (tx) => {
      const atual = await tx.agendamento.findFirst({
        where: { id, empresaId },
      });

      if (!atual) {
        throw new NotFoundException('Agendamento não encontrado');
      }

      const profissionalId =
        updateAgendamentoDto.profissionalId ?? atual.profissionalId;

      await this.lockAgenda(tx, empresaId, [
        atual.profissionalId,
        profissionalId,
      ]);

      const atualBloqueado = await tx.agendamento.findFirst({
        where: { id, empresaId },
      });

      if (!atualBloqueado) {
        throw new NotFoundException('Agendamento não encontrado');
      }

      const status = updateAgendamentoDto.status ?? atualBloqueado.status;
      const dataHoraInicio = updateAgendamentoDto.dataHoraInicio
        ? new Date(updateAgendamentoDto.dataHoraInicio)
        : atualBloqueado.dataHoraInicio;
      const dataHoraFim = updateAgendamentoDto.dataHoraFim
        ? new Date(updateAgendamentoDto.dataHoraFim)
        : atualBloqueado.dataHoraFim;

      if (this.ocupaAgenda(status)) {
        await this.assertNoScheduleConflict(tx, {
          empresaId,
          profissionalId,
          dataHoraInicio,
          dataHoraFim,
          excludeId: id,
        });
      }

      const atualizado = await tx.agendamento.update({
        where: { id },
        data: updateAgendamentoDto,
      });

      return { anterior: atualBloqueado, atualizado };
    });

    const agendamentoAtual = agendamentoResult.anterior;
    const agendamentoAtualizado = agendamentoResult.atualizado;

    const dadosAntes = {
      status: agendamentoAtual.status,
      clienteId: agendamentoAtual.clienteId,
      profissionalId: agendamentoAtual.profissionalId,
      servicoId: agendamentoAtual.servicoId,
      unidadeId: agendamentoAtual.unidadeId,
      dataHoraInicio: agendamentoAtual.dataHoraInicio,
      dataHoraFim: agendamentoAtual.dataHoraFim,
    };

    if (
      updateAgendamentoDto.status &&
      updateAgendamentoDto.status !==
        agendamentoAtual.status
    ) {
      const evento = this.mapearEventoPorStatus(
        updateAgendamentoDto.status,
      );

      if (evento) {
        await this.automacoesService.processarEvento({
          empresaId,
          tipo: evento,
          modulo: 'AGENDAMENTOS',
          titulo: this.gerarTituloPorStatus(
            updateAgendamentoDto.status,
          ),
          mensagem: `O agendamento foi atualizado para o status ${updateAgendamentoDto.status}.`,
          referenciaId: agendamentoAtualizado.id,
          dados: {
            agendamentoId: agendamentoAtualizado.id,
            clienteId: agendamentoAtualizado.clienteId,
            profissionalId:
              agendamentoAtualizado.profissionalId,
            servicoId: agendamentoAtualizado.servicoId,
            unidadeId: agendamentoAtualizado.unidadeId,
            statusAnterior: agendamentoAtual.status,
            statusAtual: agendamentoAtualizado.status,
          },
        });
      }
    }

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[AGENDAMENTOS] agendamento atualizado empresaId=${empresaId} agendamentoId=${id} clienteId=${agendamentoAtualizado.clienteId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    const statusAlterado =
      updateAgendamentoDto.status &&
      updateAgendamentoDto.status !== agendamentoAtual.status;

    if (
      statusAlterado &&
      agendamentoAtualizado.status === StatusAgendamento.CONCLUIDO
    ) {
      await this.auditoriaService.registrarConclusao({
        empresaId,
        tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
        modulo: 'AGENDAMENTOS',
        recurso: 'Agendamento',
        recursoId: agendamentoAtualizado.id,
        clienteId: agendamentoAtualizado.clienteId,
        dadosAntes,
        dadosDepois: {
          status: agendamentoAtualizado.status,
          clienteId: agendamentoAtualizado.clienteId,
          profissionalId: agendamentoAtualizado.profissionalId,
          servicoId: agendamentoAtualizado.servicoId,
          unidadeId: agendamentoAtualizado.unidadeId,
          dataHoraInicio: agendamentoAtualizado.dataHoraInicio,
          dataHoraFim: agendamentoAtualizado.dataHoraFim,
        },
        metadata: {
          tempoMs,
          statusAnterior: agendamentoAtual.status,
          statusAtual: agendamentoAtualizado.status,
        },
        mensagem: 'Agendamento concluído.',
      });
    } else if (
      statusAlterado &&
      agendamentoAtualizado.status === StatusAgendamento.CANCELADO
    ) {
      await this.auditoriaService.registrarCancelamento({
        empresaId,
        tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
        modulo: 'AGENDAMENTOS',
        recurso: 'Agendamento',
        recursoId: agendamentoAtualizado.id,
        clienteId: agendamentoAtualizado.clienteId,
        dadosAntes,
        dadosDepois: {
          status: agendamentoAtualizado.status,
          clienteId: agendamentoAtualizado.clienteId,
          profissionalId: agendamentoAtualizado.profissionalId,
          servicoId: agendamentoAtualizado.servicoId,
          unidadeId: agendamentoAtualizado.unidadeId,
          dataHoraInicio: agendamentoAtualizado.dataHoraInicio,
          dataHoraFim: agendamentoAtualizado.dataHoraFim,
        },
        metadata: {
          tempoMs,
          statusAnterior: agendamentoAtual.status,
          statusAtual: agendamentoAtualizado.status,
        },
        mensagem: 'Agendamento cancelado.',
      });
    } else {
      await this.auditoriaService.registrarAtualizacao({
        empresaId,
        tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
        modulo: 'AGENDAMENTOS',
        recurso: 'Agendamento',
        recursoId: agendamentoAtualizado.id,
        clienteId: agendamentoAtualizado.clienteId,
        dadosAntes,
        dadosDepois: {
          status: agendamentoAtualizado.status,
          clienteId: agendamentoAtualizado.clienteId,
          profissionalId: agendamentoAtualizado.profissionalId,
          servicoId: agendamentoAtualizado.servicoId,
          unidadeId: agendamentoAtualizado.unidadeId,
          dataHoraInicio: agendamentoAtualizado.dataHoraInicio,
          dataHoraFim: agendamentoAtualizado.dataHoraFim,
        },
        metadata: {
          tempoMs,
        },
        mensagem: 'Agendamento atualizado.',
      });
    }

    return agendamentoAtualizado;
  }

  async cancelar(
    id: string,
    empresaId: string,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarAgendamento(
      empresaId,
      id,
    );

    const agendamentoAtual =
      await this.findOne(id, empresaId);

    const dadosAntes = {
      status: agendamentoAtual.status,
      clienteId: agendamentoAtual.clienteId,
      profissionalId: agendamentoAtual.profissionalId,
      servicoId: agendamentoAtual.servicoId,
      unidadeId: agendamentoAtual.unidadeId,
      dataHoraInicio: agendamentoAtual.dataHoraInicio,
      dataHoraFim: agendamentoAtual.dataHoraFim,
    };

    const result =
      await this.prisma.agendamento.updateMany({
        where: {
          id,
          empresaId,
        },
        data: {
          status: StatusAgendamento.CANCELADO,
        },
      });

    if (result.count === 0) {
      throw new NotFoundException(
        'Agendamento não encontrado',
      );
    }

    const agendamentoCancelado =
      await this.findOne(id, empresaId);

    if (agendamentoAtual.status !== StatusAgendamento.CANCELADO) {
      await this.automacoesService.processarEvento({
        empresaId,
        tipo: TipoEventoSistema.AGENDAMENTO_CANCELADO,
        modulo: 'AGENDAMENTOS',
        titulo: 'Agendamento cancelado',
        mensagem: 'Um agendamento foi cancelado.',
        referenciaId: agendamentoCancelado.id,
        dados: {
          agendamentoId: agendamentoCancelado.id,
          clienteId: agendamentoCancelado.clienteId,
          profissionalId:
            agendamentoCancelado.profissionalId,
          servicoId: agendamentoCancelado.servicoId,
          unidadeId: agendamentoCancelado.unidadeId,
          statusAnterior: agendamentoAtual.status,
          statusAtual: agendamentoCancelado.status,
        },
      });
    }

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[AGENDAMENTOS] agendamento cancelado empresaId=${empresaId} agendamentoId=${id} clienteId=${agendamentoCancelado.clienteId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCancelamento({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'AGENDAMENTOS',
      recurso: 'Agendamento',
      recursoId: agendamentoCancelado.id,
      clienteId: agendamentoCancelado.clienteId,
      dadosAntes,
      dadosDepois: {
        status: agendamentoCancelado.status,
        clienteId: agendamentoCancelado.clienteId,
        profissionalId: agendamentoCancelado.profissionalId,
        servicoId: agendamentoCancelado.servicoId,
        unidadeId: agendamentoCancelado.unidadeId,
        dataHoraInicio: agendamentoCancelado.dataHoraInicio,
        dataHoraFim: agendamentoCancelado.dataHoraFim,
      },
      metadata: {
        tempoMs,
        statusAnterior: agendamentoAtual.status,
        statusAtual: agendamentoCancelado.status,
      },
      mensagem: 'Agendamento cancelado.',
    });

    return agendamentoCancelado;
  }

  private ocupaAgenda(status: StatusAgendamento) {
    return new Set<StatusAgendamento>([
      StatusAgendamento.PENDENTE,
      StatusAgendamento.CONFIRMADO,
      StatusAgendamento.EM_ANDAMENTO,
    ]).has(status);
  }

  /**
   * Serializes writes for the same tenant/professional pair. The advisory
   * transaction lock closes the check-then-insert race without requiring a
   * Prisma-unsupported exclusion constraint in the schema.
   */
  private async lockAgenda(
    tx: Prisma.TransactionClient,
    empresaId: string,
    profissionalIds: string[],
  ) {
    const keys = [...new Set(profissionalIds)]
      .sort()
      .map((profissionalId) => `${empresaId}:${profissionalId}`);

    for (const key of keys) {
      await tx.$queryRaw`
        SELECT pg_advisory_xact_lock(hashtextextended(${key}, 0))
      `;
    }
  }

  private async assertNoScheduleConflict(
    tx: Prisma.TransactionClient,
    params: {
      empresaId: string;
      profissionalId: string;
      dataHoraInicio: Date;
      dataHoraFim: Date;
      excludeId?: string;
    },
  ) {
    const conflito = await tx.agendamento.findFirst({
      where: {
        empresaId: params.empresaId,
        profissionalId: params.profissionalId,
        status: {
          in: [
            StatusAgendamento.PENDENTE,
            StatusAgendamento.CONFIRMADO,
            StatusAgendamento.EM_ANDAMENTO,
          ],
        },
        dataHoraInicio: {
          lt: params.dataHoraFim,
        },
        dataHoraFim: {
          gt: params.dataHoraInicio,
        },
        ...(params.excludeId ? { id: { not: params.excludeId } } : {}),
      },
      select: {
        id: true,
        dataHoraInicio: true,
        dataHoraFim: true,
      },
    });

    if (conflito) {
      throw new ConflictException(
        'O profissional já possui um agendamento nesse intervalo.',
      );
    }
  }

  private async validarRelacionamentosDoAgendamento(
    empresaId: string,
    dados: {
      clienteId?: string;
      profissionalId?: string;
      servicoId?: string;
      unidadeId?: string;
    },
  ) {
    const validacoes: Promise<unknown>[] = [];

    if (dados.clienteId) {
      validacoes.push(
        this.tenantValidator.validarCliente(
          empresaId,
          dados.clienteId,
        ),
      );
    }

    if (dados.profissionalId) {
      validacoes.push(
        this.tenantValidator.validarProfissional(
          empresaId,
          dados.profissionalId,
        ),
      );
    }

    if (dados.servicoId) {
      validacoes.push(
        this.tenantValidator.validarServico(
          empresaId,
          dados.servicoId,
        ),
      );
    }

    if (dados.unidadeId) {
      validacoes.push(
        this.tenantValidator.validarUnidade(
          empresaId,
          dados.unidadeId,
        ),
      );
    }

    await Promise.all(validacoes);
  }

  private async validarFiltrosRelacionados(
    empresaId: string,
    filtros: {
      clienteId?: string;
      profissionalId?: string;
      servicoId?: string;
      unidadeId?: string;
    },
  ) {
    await this.validarRelacionamentosDoAgendamento(
      empresaId,
      filtros,
    );
  }

  private mapearEventoPorStatus(
    status: string,
  ): TipoEventoSistema | null {
    if (status === StatusAgendamento.CONFIRMADO) {
      return TipoEventoSistema.AGENDAMENTO_CONFIRMADO;
    }

    if (status === StatusAgendamento.CANCELADO) {
      return TipoEventoSistema.AGENDAMENTO_CANCELADO;
    }

    if (status === StatusAgendamento.CONCLUIDO) {
      return TipoEventoSistema.AGENDAMENTO_CONCLUIDO;
    }

    return null;
  }

  private gerarTituloPorStatus(status: string): string {
    if (status === StatusAgendamento.CONFIRMADO) {
      return 'Agendamento confirmado';
    }

    if (status === StatusAgendamento.CANCELADO) {
      return 'Agendamento cancelado';
    }

    if (status === StatusAgendamento.CONCLUIDO) {
      return 'Agendamento concluído';
    }

    return 'Agendamento atualizado';
  }
}
