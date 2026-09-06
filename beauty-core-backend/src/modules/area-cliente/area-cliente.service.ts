import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  Prisma,
  StatusAgendamento,
  TipoMensagemWhatsApp,
  StatusArquivo,
  StatusClientePacote,
  StatusNotificacao,
  TipoMovimentacaoPontos,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { AgendamentosService } from '../agendamentos/agendamentos.service';
import { MensagensWhatsappService } from "../mensagens-whatsapp/mensagens-whatsapp.service";
import { ClientesPacotesService } from "../clientes-pacotes/clientes-pacotes.service";
import { CreateAgendamentoDto } from '../agendamentos/dto/create-agendamento.dto';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { TenantValidatorService } from '../../shared/tenant';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../shared/utils/pagination.util';

import { UpdatePerfilClienteDto } from './dto/update-perfil-cliente.dto';
import { CreatePortalAgendamentoDto } from './dto/create-portal-agendamento.dto';
import { ReschedulePortalAgendamentoDto } from './dto/reschedule-portal-agendamento.dto';

@Injectable()
export class AreaClienteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
    private readonly agendamentosService: AgendamentosService,


    private readonly mensagensWhatsappService: MensagensWhatsappService,private readonly clientesPacotesService: ClientesPacotesService,) {}

  private async validarClientePortal(
    empresaId: string,
    clienteId: string,
  ) {
    const clienteValidado =
      await this.tenantValidator.validarCliente(empresaId, clienteId);

    if (!clienteValidado.ativoPortal) {
      throw new NotFoundException(
        'Cliente nÃ£o encontrado ou portal desativado.',
      );
    }

    const cliente = await this.prisma.cliente.findFirst({
      where: {
        id: clienteId,
        empresaId,
        ativo: true,
        ativoPortal: true,
      },
    });

    if (!cliente) {
      throw new NotFoundException(
        'Cliente nÃ£o encontrado ou portal desativado.',
      );
    }

    return cliente;
  }

  async perfil(empresaId: string, clienteId: string) {
    const cliente = await this.validarClientePortal(
      empresaId,
      clienteId,
    );

    const [
      fidelidade,
      nivelAtual,
      pacotesAtivos,
      quantidadeAgendamentos,
    ] = await Promise.all([
      this.prisma.fidelidade.findUnique({
        where: {
          clienteId_empresaId: {
            clienteId,
            empresaId,
          },
        },
      }),
      this.buscarNivelAtual(empresaId, clienteId),
      this.prisma.clientePacote.findMany({
        where: {
          empresaId,
          clienteId,
          status: StatusClientePacote.ATIVO,
        },
        include: {
          pacote: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 20,
      }),
      this.prisma.agendamento.count({
        where: {
          empresaId,
          clienteId,
        },
      }),
    ]);

    return {
      id: cliente.id,
      empresaId: cliente.empresaId,
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      foto: cliente.foto,
      dataNascimento: cliente.dataNascimento,
      dataCadastro: cliente.createdAt,
      pontosAtuais: fidelidade?.saldoPontos ?? 0,
      nivelAtual,
      pacotesAtivos,
      quantidadeAgendamentos,
      ultimoAcessoPortal: cliente.ultimoAcessoPortal,
      aceitouTermos: cliente.aceitouTermos,
      dataAceiteTermos: cliente.dataAceiteTermos,
      ativoPortal: cliente.ativoPortal,
    };
  }

  async updatePerfil(
    empresaId: string,
    clienteId: string,
    dto: UpdatePerfilClienteDto,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const data: Prisma.ClienteUpdateManyMutationInput = {
      ultimoAcessoPortal: new Date(),
    };

    if (dto.nome !== undefined) {
      data.nome = dto.nome.trim();
    }

    if (dto.email !== undefined) {
      data.email = dto.email.trim().toLowerCase();
    }

    if (dto.dataNascimento !== undefined) {
      data.dataNascimento = new Date(dto.dataNascimento);
    }

    if (dto.foto !== undefined) {
      data.foto = dto.foto.trim();
    }

    if (
      dto.nome === undefined &&
      dto.email === undefined &&
      dto.dataNascimento === undefined &&
      dto.foto === undefined
    ) {
      throw new BadRequestException(
        'Informe pelo menos um campo para atualizar.',
      );
    }

    const resultado = await this.prisma.cliente.updateMany({
      where: {
        id: clienteId,
        empresaId,
        ativo: true,
        ativoPortal: true,
      },
      data,
    });

    if (resultado.count === 0) {
      throw new NotFoundException(
        'Cliente nÃ£o encontrado ou portal desativado.',
      );
    }

    return this.prisma.cliente.findFirst({
      where: {
        id: clienteId,
        empresaId,
        ativo: true,
        ativoPortal: true,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        telefone: true,
        email: true,
        foto: true,
        dataNascimento: true,
        ultimoAcessoPortal: true,
        aceitouTermos: true,
        dataAceiteTermos: true,
        ativoPortal: true,
        updatedAt: true,
      },
    });
  }

  async agendamentos(
    empresaId: string,
    clienteId: string,
    status?: string,
    query?: PaginationDto,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const { page, limit, skip, take } = getPaginationParams(query ?? {});

    const statusMap: Record<string, StatusAgendamento> = {
      pendentes: StatusAgendamento.PENDENTE,
      confirmados: StatusAgendamento.CONFIRMADO,
      concluidos: StatusAgendamento.CONCLUIDO,
      cancelados: StatusAgendamento.CANCELADO,
    };

    const where: Prisma.AgendamentoWhereInput = {
      empresaId,
      clienteId,
      ...(status && statusMap[status]
        ? { status: statusMap[status] }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.agendamento.findMany({
        where,
        skip,
        take,
        include: {
          servico: true,
          profissional: {
            select: {
              id: true,
              nome: true,
              foto: true,
              role: true,
            },
          },
          unidade: true,
        },
        orderBy: {
          dataHoraInicio: 'desc',
        },
      }),
      this.prisma.agendamento.count({ where }),
    ]);

    return buildPaginatedResponse(data, total, page, limit);
  }

  async proximosAgendamentos(empresaId: string, clienteId: string) {
    await this.validarClientePortal(empresaId, clienteId);

    return this.prisma.agendamento.findMany({
      where: {
        empresaId,
        clienteId,
        dataHoraInicio: {
          gte: new Date(),
        },
        status: {
          in: [
            StatusAgendamento.PENDENTE,
            StatusAgendamento.CONFIRMADO,
            StatusAgendamento.EM_ANDAMENTO,
          ],
        },
      },
      include: {
        servico: true,
        profissional: {
          select: {
            id: true,
            nome: true,
            foto: true,
          },
        },
        unidade: true,
      },
      orderBy: {
        dataHoraInicio: 'asc',
      },
      take: 20,
    });
  }

  async ultimoAgendamento(empresaId: string, clienteId: string) {
    await this.validarClientePortal(empresaId, clienteId);

    return this.prisma.agendamento.findFirst({
      where: {
        empresaId,
        clienteId,
        dataHoraInicio: {
          lt: new Date(),
        },
      },
      include: {
        servico: true,
        profissional: {
          select: {
            id: true,
            nome: true,
            foto: true,
          },
        },
        unidade: true,
      },
      orderBy: {
        dataHoraInicio: 'desc',
      },
    });
  }

  async fidelidade(empresaId: string, clienteId: string) {
    await this.validarClientePortal(empresaId, clienteId);

    const [
      fidelidade,
      ganhos,
      resgates,
      nivelAtual,
      niveis,
      beneficios,
    ] = await Promise.all([
      this.prisma.fidelidade.findUnique({
        where: {
          clienteId_empresaId: {
            clienteId,
            empresaId,
          },
        },
      }),
      this.prisma.movimentacaoPontos.aggregate({
        where: {
          empresaId,
          clienteId,
          tipo: TipoMovimentacaoPontos.GANHO,
        },
        _sum: {
          pontos: true,
        },
      }),
      this.prisma.movimentacaoPontos.aggregate({
        where: {
          empresaId,
          clienteId,
          tipo: TipoMovimentacaoPontos.RESGATE,
        },
        _sum: {
          pontos: true,
        },
      }),
      this.buscarNivelAtual(empresaId, clienteId),
      this.prisma.nivelFidelidade.findMany({
        where: {
          empresaId,
        },
        orderBy: {
          pontosMinimos: 'asc',
        },
      }),
      this.prisma.beneficio.findMany({
        where: {
          empresaId,
          ativo: true,
        },
        orderBy: {
          pontosNecessarios: 'asc',
        },
      }),
    ]);

    const saldoAtual = fidelidade?.saldoPontos ?? 0;
    const proximoNivel =
      niveis.find((nivel) => nivel.pontosMinimos > saldoAtual) ??
      null;

    return {
      saldoAtual,
      totalPontosRecebidos: ganhos._sum.pontos ?? 0,
      totalPontosResgatados: resgates._sum.pontos ?? 0,
      nivelAtual,
      proximoNivel,
      pontosParaProximoNivel: proximoNivel
        ? proximoNivel.pontosMinimos - saldoAtual
        : 0,
      beneficiosDisponiveis: beneficios.filter(
        (beneficio) => beneficio.pontosNecessarios <= saldoAtual,
      ),
    };
  }

  async pontos(
    empresaId: string,
    clienteId: string,
    query?: PaginationDto,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const { page, limit, skip, take } = getPaginationParams(query ?? {});

    const where: Prisma.MovimentacaoPontosWhereInput = {
      empresaId,
      clienteId,
    };

    const [data, total] = await Promise.all([
      this.prisma.movimentacaoPontos.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.movimentacaoPontos.count({ where }),
    ]);

    return buildPaginatedResponse(data, total, page, limit);
  }

  async beneficios(empresaId: string, clienteId: string) {
    await this.validarClientePortal(empresaId, clienteId);

    const [fidelidade, beneficios] = await Promise.all([
      this.prisma.fidelidade.findUnique({
        where: {
          clienteId_empresaId: {
            clienteId,
            empresaId,
          },
        },
      }),
      this.prisma.beneficio.findMany({
        where: {
          empresaId,
          ativo: true,
        },
        orderBy: {
          pontosNecessarios: 'asc',
        },
      }),
    ]);

    const saldoAtual = fidelidade?.saldoPontos ?? 0;

    return {
      liberados: beneficios.filter(
        (beneficio) => beneficio.pontosNecessarios <= saldoAtual,
      ),
      disponiveis: beneficios,
      utilizados: [],
    };
  }

  async pacotes(empresaId: string, clienteId: string) {
    await this.validarClientePortal(empresaId, clienteId);

    const pacotes = await this.prisma.clientePacote.findMany({
      where: {
        empresaId,
        clienteId,
      },
      include: {
        pacote: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });

    const mapPacote = (clientePacote: {
      id: string;
      pacoteId: string;
      pacote: {
        nome: string;
        descricao: string | null;
      } | null;
      sessoesTotal: number;
      sessoesUsadas: number;
      sessoesRestantes: number;
      dataCompra: Date;
      dataValidade: Date | null;
      status: StatusClientePacote;
    }) => ({
      id: clientePacote.id,
      pacoteId: clientePacote.pacoteId,
      nome: clientePacote.pacote?.nome,
      descricao: clientePacote.pacote?.descricao,
      sessoesTotal: clientePacote.sessoesTotal,
      sessoesUsadas: clientePacote.sessoesUsadas,
      sessoesRestantes: clientePacote.sessoesRestantes,
      dataCompra: clientePacote.dataCompra,
      dataValidade: clientePacote.dataValidade,
      status: clientePacote.status,
    });

    return {
      ativos: pacotes
        .filter((pacote) => pacote.status === StatusClientePacote.ATIVO)
        .map(mapPacote),
      finalizados: pacotes
        .filter(
          (pacote) => pacote.status === StatusClientePacote.FINALIZADO,
        )
        .map(mapPacote),
      vencidos: pacotes
        .filter((pacote) => pacote.status === StatusClientePacote.VENCIDO)
        .map(mapPacote),
      cancelados: pacotes
        .filter(
          (pacote) => pacote.status === StatusClientePacote.CANCELADO,
        )
        .map(mapPacote),
    };
  }

  async pacoteDetalhes(
    empresaId: string,
    clienteId: string,
    pacoteId: string,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const pacote = await this.prisma.clientePacote.findFirst({
      where: {
        id: pacoteId,
        empresaId,
        clienteId,
      },
      include: {
        pacote: true,
      },
    });

    if (!pacote) {
      throw new NotFoundException('Pacote do cliente nÃ£o encontrado');
    }

    return pacote;
  }

  async notificacoes(
    empresaId: string,
    clienteId: string,
    query?: PaginationDto,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const { page, limit, skip, take } = getPaginationParams(query ?? {});

    const where: Prisma.NotificacaoWhereInput = {
      empresaId,
      clienteId,
    };

    const [data, total] = await Promise.all([
      this.prisma.notificacao.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.notificacao.count({ where }),
    ]);

    return buildPaginatedResponse(data, total, page, limit);
  }

  async notificacoesNaoLidas(empresaId: string, clienteId: string) {
    await this.validarClientePortal(empresaId, clienteId);

    const [data, total] = await Promise.all([
      this.prisma.notificacao.findMany({
        where: {
          empresaId,
          clienteId,
          status: StatusNotificacao.NAO_LIDA,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 50,
      }),
      this.prisma.notificacao.count({
        where: {
          empresaId,
          clienteId,
          status: StatusNotificacao.NAO_LIDA,
        },
      }),
    ]);

    return {
      data,
      total,
    };
  }

  async marcarNotificacaoComoLida(
    empresaId: string,
    clienteId: string,
    id: string,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const resultado = await this.prisma.notificacao.updateMany({
      where: {
        id,
        empresaId,
        clienteId,
      },
      data: {
        status: StatusNotificacao.LIDA,
        dataLeitura: new Date(),
      },
    });

    if (resultado.count === 0) {
      throw new NotFoundException('NotificaÃ§Ã£o nÃ£o encontrada');
    }

    return this.prisma.notificacao.findFirst({
      where: {
        id,
        empresaId,
        clienteId,
      },
    });
  }

  async mensagensWhatsapp(
    empresaId: string,
    clienteId: string,
    query?: PaginationDto,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const { page, limit, skip, take } = getPaginationParams(query ?? {});

    const where: Prisma.MensagemWhatsAppWhereInput = {
      empresaId,
      clienteId,
    };

    const [data, total] = await Promise.all([
      this.prisma.mensagemWhatsApp.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          tipo: true,
          destinatario: true,
          mensagem: true,
          status: true,
          erro: true,
          dataEnvio: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.mensagemWhatsApp.count({ where }),
    ]);

    return buildPaginatedResponse(data, total, page, limit);
  }

  async dashboard(empresaId: string, clienteId: string) {
    await this.validarClientePortal(empresaId, clienteId);

    const [
      perfil,
      proximosAgendamentos,
      ultimoAgendamento,
      fidelidade,
      pacotes,
      beneficios,
      notificacoesNaoLidas,
    ] = await Promise.all([
      this.perfil(empresaId, clienteId),
      this.proximosAgendamentos(empresaId, clienteId),
      this.ultimoAgendamento(empresaId, clienteId),
      this.fidelidade(empresaId, clienteId),
      this.pacotes(empresaId, clienteId),
      this.beneficios(empresaId, clienteId),
      this.notificacoesNaoLidas(empresaId, clienteId),
    ]);

    return {
      perfil,
      agendamentos: {
        proximos: proximosAgendamentos,
        ultimo: ultimoAgendamento,
      },
      fidelidade,
      pacotes,
      beneficios,
      notificacoes: {
        naoLidas: notificacoesNaoLidas.data,
        totalNaoLidas: notificacoesNaoLidas.total,
      },
    };
  }

  async historico(empresaId: string, clienteId: string) {
    await this.validarClientePortal(empresaId, clienteId);

    const [
      agendamentos,
      pontos,
      pacotes,
      notificacoes,
      mensagensWhatsapp,
    ] = await Promise.all([
      this.prisma.agendamento.findMany({
        where: {
          empresaId,
          clienteId,
        },
        include: {
          servico: true,
          profissional: {
            select: {
              id: true,
              nome: true,
            },
          },
          unidade: true,
        },
        orderBy: {
          dataHoraInicio: 'desc',
        },
        take: 100,
      }),
      this.prisma.movimentacaoPontos.findMany({
        where: {
          empresaId,
          clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 100,
      }),
      this.prisma.clientePacote.findMany({
        where: {
          empresaId,
          clienteId,
        },
        include: {
          pacote: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 100,
      }),
      this.prisma.notificacao.findMany({
        where: {
          empresaId,
          clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 100,
      }),
      this.prisma.mensagemWhatsApp.findMany({
        where: {
          empresaId,
          clienteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 100,
      }),
    ]);

    const historico = [
      ...agendamentos.map((item) => ({
        tipo: 'AGENDAMENTO',
        data: item.dataHoraInicio,
        titulo: item.servico?.nome ?? 'Agendamento',
        descricao: item.observacoes,
        status: item.status,
        dados: item,
      })),
      ...pontos.map((item) => ({
        tipo: 'PONTOS',
        data: item.createdAt,
        titulo: item.tipo,
        descricao: item.descricao,
        status: item.tipo,
        dados: item,
      })),
      ...pacotes.map((item) => ({
        tipo: 'PACOTE',
        data: item.createdAt,
        titulo: item.pacote?.nome ?? 'Pacote',
        descricao: item.pacote?.descricao,
        status: item.status,
        dados: item,
      })),
      ...notificacoes.map((item) => ({
        tipo: 'NOTIFICACAO',
        data: item.createdAt,
        titulo: item.titulo,
        descricao: item.mensagem,
        status: item.status,
        dados: item,
      })),
      ...mensagensWhatsapp.map((item) => ({
        tipo: 'WHATSAPP',
        data: item.createdAt,
        titulo: item.tipo,
        descricao: item.mensagem,
        status: item.status,
        dados: item,
      })),
    ];

    return historico
      .sort(
        (a, b) =>
          new Date(b.data).getTime() -
          new Date(a.data).getTime(),
      )
      .slice(0, 200);
  }

  async criarAgendamento(
    empresaId: string,
    clienteId: string,
    dto: CreatePortalAgendamentoDto,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const payload: CreateAgendamentoDto = {
      ...dto,
      clienteId,
    };

    return this.agendamentosService.create(payload, empresaId);
  }

  async reagendarAgendamento(
    empresaId: string,
    clienteId: string,
    id: string,
    dto: ReschedulePortalAgendamentoDto,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const agendamento = await this.prisma.agendamento.findFirst({
      where: {
        id,
        empresaId,
        clienteId,
      },
    });

    if (!agendamento) {
      throw new NotFoundException(
        'Agendamento não encontrado para o cliente autenticado.',
      );
    }

    return this.agendamentosService.update(
      id,
      dto,
      empresaId,
    );
  }

  async cancelarAgendamento(
    empresaId: string,
    clienteId: string,
    id: string,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const agendamento = await this.prisma.agendamento.findFirst({
      where: {
        id,
        empresaId,
        clienteId,
      },
    });

    if (!agendamento) {
      throw new NotFoundException(
        'Agendamento não encontrado para o cliente autenticado.',
      );
    }

    return this.agendamentosService.cancelar(id, empresaId);
  }
  private async buscarNivelAtual(
    empresaId: string,
    clienteId: string,
  ) {
    const fidelidade = await this.prisma.fidelidade.findUnique({
      where: {
        clienteId_empresaId: {
          clienteId,
          empresaId,
        },
      },
    });

    const saldoAtual = fidelidade?.saldoPontos ?? 0;

    return this.prisma.nivelFidelidade.findFirst({
      where: {
        empresaId,
        pontosMinimos: {
          lte: saldoAtual,
        },
      },
      orderBy: {
        pontosMinimos: 'desc',
      },
    });
  }

  async usarSessaoPacote(
    empresaId: string,
    clienteId: string,
    pacoteId: string,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const pacote = await this.prisma.clientePacote.findFirst({
      where: {
        id: pacoteId,
        empresaId,
        clienteId,
      },
    });

    if (!pacote) {
      throw new NotFoundException("Pacote não encontrado para este cliente.");
    }

    return this.clientesPacotesService.usarSessao(
      empresaId,
      pacoteId,
    );
  }

  async documentos(
    empresaId: string,
    clienteId: string,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    return this.prisma.arquivo.findMany({
      where: {
        empresaId,
        clienteId,
        status: StatusArquivo.ATIVO,
      },
      select: {
        id: true,
        tipo: true,
        nomeOriginal: true,
        mimeType: true,
        tamanhoBytes: true,
        createdAt: true,
        updatedAt: true,
        expiraEm: true,
        privado: true,
        visibilidade: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async enviarMensagemWhatsappPortal(
    empresaId: string,
    clienteId: string,
    tipo: TipoMensagemWhatsApp,
    mensagem: string,
  ) {
    await this.validarClientePortal(empresaId, clienteId);

    const cliente = await this.prisma.cliente.findFirst({
      where: {
        id: clienteId,
        empresaId,
        ativo: true,
      },
      select: {
        telefone: true,
      },
    });

    if (!cliente?.telefone) {
      throw new BadRequestException(
        "Cliente não possui telefone cadastrado.",
      );
    }

    const destinatario = cliente.telefone.replace(/\D/g, "");

    if (destinatario.length < 10 || destinatario.length > 15) {
      throw new BadRequestException(
        "Telefone do cliente possui formato inválido.",
      );
    }

    return this.mensagensWhatsappService.enviar(
      empresaId,
      {
        clienteId,
        tipo,
        destinatario,
        mensagem,
      },
    );
  }
}
