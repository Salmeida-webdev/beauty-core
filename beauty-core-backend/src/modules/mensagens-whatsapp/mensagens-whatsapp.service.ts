import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  StatusMensagemWhatsApp,
  TipoMensagemWhatsApp,
  TipoUsuarioAuditoria,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { TenantValidatorService } from '../../shared/tenant';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../shared/utils/pagination.util';

import { AuditoriaService } from '../auditoria/auditoria.service';

import { CreateMensagemWhatsAppDto } from './dto/create-mensagem-whatsapp.dto';
import { EnviarMensagemWhatsAppDto } from './dto/enviar-mensagem-whatsapp.dto';

type RelacionamentosMensagemWhatsApp = {
  clienteId?: string;
  usuarioId?: string;
  templateId?: string;
};

@Injectable()
export class MensagensWhatsappService {
  private readonly logger = new Logger(MensagensWhatsappService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(
    empresaId: string,
    dto: CreateMensagemWhatsAppDto,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);
    await this.validarRelacionamentos(empresaId, dto);

    const mensagem = await this.prisma.mensagemWhatsApp.create({
      data: {
        empresaId,
        clienteId: dto.clienteId,
        usuarioId: dto.usuarioId,
        templateId: dto.templateId,
        tipo: dto.tipo,
        destinatario: dto.destinatario,
        mensagem: dto.mensagem,
        status: StatusMensagemWhatsApp.PENDENTE,
      },
      include: this.getIncludeDetalhado(),
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[WHATSAPP] mensagem criada empresaId=${empresaId} mensagemId=${mensagem.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      clienteId: mensagem.clienteId ?? undefined,
      usuarioId: mensagem.usuarioId ?? undefined,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'MENSAGENS_WHATSAPP',
      recurso: 'MensagemWhatsApp',
      recursoId: mensagem.id,
      dadosDepois: this.montarDadosAuditoria(mensagem),
      metadata: {
        tempoMs,
      },
      mensagem: 'Mensagem WhatsApp criada com sucesso.',
    });

    return mensagem;
  }

  async enviar(
    empresaId: string,
    dto: EnviarMensagemWhatsAppDto,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const configuracao =
      await this.prisma.configuracaoWhatsApp.findUnique({
        where: { empresaId },
      });

    if (!configuracao) {
      throw new BadRequestException(
        'Configure o WhatsApp antes de enviar mensagens.',
      );
    }

    if (!configuracao.ativo) {
      throw new BadRequestException(
        'WhatsApp está desativado para esta empresa.',
      );
    }

    await this.validarRelacionamentos(empresaId, dto);

    const status = configuracao.usarModoDemonstracao
      ? StatusMensagemWhatsApp.SIMULADA
      : StatusMensagemWhatsApp.PENDENTE;

    const mensagem = await this.prisma.mensagemWhatsApp.create({
      data: {
        empresaId,
        clienteId: dto.clienteId,
        usuarioId: dto.usuarioId,
        templateId: dto.templateId,
        tipo: dto.tipo,
        destinatario: dto.destinatario,
        mensagem: dto.mensagem,
        status,
        dataEnvio:
          status === StatusMensagemWhatsApp.SIMULADA
            ? new Date()
            : null,
      },
      include: this.getIncludeDetalhado(),
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[WHATSAPP] mensagem enviada empresaId=${empresaId} mensagemId=${mensagem.id} status=${mensagem.status} tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      clienteId: mensagem.clienteId ?? undefined,
      usuarioId: mensagem.usuarioId ?? undefined,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'MENSAGENS_WHATSAPP',
      recurso: 'MensagemWhatsApp',
      recursoId: mensagem.id,
      dadosDepois: this.montarDadosAuditoria(mensagem),
      metadata: {
        tempoMs,
        modoDemonstracao: configuracao.usarModoDemonstracao,
        acaoOperacional: 'ENVIAR_WHATSAPP',
      },
      mensagem:
        status === StatusMensagemWhatsApp.SIMULADA
          ? 'Mensagem WhatsApp simulada com sucesso.'
          : 'Mensagem WhatsApp preparada para envio.',
    });

    return mensagem;
  }

  async findAll(
    empresaId: string,
    query: PaginationDto,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.validarFiltrosRelacionados(empresaId, {
      clienteId: query['clienteId'],
      usuarioId: query['usuarioId'],
      templateId: query['templateId'],
    });

    const { page, limit, skip, take } =
      getPaginationParams(query);

    const orderByPermitidos = [
      'createdAt',
      'updatedAt',
      'dataEnvio',
      'status',
      'tipo',
      'destinatario',
    ];

    const orderBy: keyof Prisma.MensagemWhatsAppOrderByWithRelationInput =
      orderByPermitidos.includes(query.orderBy ?? '')
        ? (query.orderBy as keyof Prisma.MensagemWhatsAppOrderByWithRelationInput)
        : 'createdAt';

    const orderDirection = query.orderDirection ?? 'desc';

    const where = this.montarWhereMensagem(
      empresaId,
      query,
    );

    const [data, total] = await Promise.all([
      this.prisma.mensagemWhatsApp.findMany({
        where,
        skip,
        take,
        orderBy: {
          [orderBy]: orderDirection,
        },
        include: this.getIncludeListagem(),
      }),
      this.prisma.mensagemWhatsApp.count({
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

  async findOne(empresaId: string, id: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.buscarMensagemOuFalhar(empresaId, id);
  }

  async cancelar(empresaId: string, id: string) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const mensagemAntes = await this.buscarMensagemOuFalhar(
      empresaId,
      id,
    );

    const result =
      await this.prisma.mensagemWhatsApp.updateMany({
        where: {
          id,
          empresaId,
        },
        data: {
          status: StatusMensagemWhatsApp.CANCELADA,
        },
      });

    if (result.count === 0) {
      throw new NotFoundException(
        'Mensagem WhatsApp não encontrada.',
      );
    }

    const mensagemCancelada = await this.buscarMensagemOuFalhar(
      empresaId,
      id,
    );

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[WHATSAPP] mensagem cancelada empresaId=${empresaId} mensagemId=${mensagemCancelada.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCancelamento({
      empresaId,
      clienteId: mensagemCancelada.clienteId ?? undefined,
      usuarioId: mensagemCancelada.usuarioId ?? undefined,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'MENSAGENS_WHATSAPP',
      recurso: 'MensagemWhatsApp',
      recursoId: mensagemCancelada.id,
      dadosAntes: this.montarDadosAuditoria(mensagemAntes),
      dadosDepois: this.montarDadosAuditoria(mensagemCancelada),
      metadata: {
        tempoMs,
        statusAnterior: mensagemAntes.status,
        statusAtual: mensagemCancelada.status,
      },
      mensagem: 'Mensagem WhatsApp cancelada com sucesso.',
    });

    return mensagemCancelada;
  }

  async prepararMensagemAgendamento(
    empresaId: string,
    destinatario: string,
    mensagem: string,
  ) {
    return this.prepararMensagemAutomatica(
      empresaId,
      TipoMensagemWhatsApp.LEMBRETE_AGENDAMENTO,
      destinatario,
      mensagem,
    );
  }

  async prepararMensagemAniversario(
    empresaId: string,
    destinatario: string,
    mensagem: string,
  ) {
    return this.prepararMensagemAutomatica(
      empresaId,
      TipoMensagemWhatsApp.ANIVERSARIO,
      destinatario,
      mensagem,
    );
  }

  async prepararMensagemFidelidade(
    empresaId: string,
    destinatario: string,
    mensagem: string,
  ) {
    return this.prepararMensagemAutomatica(
      empresaId,
      TipoMensagemWhatsApp.FIDELIDADE,
      destinatario,
      mensagem,
    );
  }

  async prepararMensagemPacote(
    empresaId: string,
    destinatario: string,
    mensagem: string,
  ) {
    return this.prepararMensagemAutomatica(
      empresaId,
      TipoMensagemWhatsApp.PACOTE,
      destinatario,
      mensagem,
    );
  }

  async prepararMensagemFinanceiro(
    empresaId: string,
    destinatario: string,
    mensagem: string,
  ) {
    return this.prepararMensagemAutomatica(
      empresaId,
      TipoMensagemWhatsApp.FINANCEIRO,
      destinatario,
      mensagem,
    );
  }

  async prepararMensagemCampanha(
    empresaId: string,
    destinatario: string,
    mensagem: string,
  ) {
    return this.prepararMensagemAutomatica(
      empresaId,
      TipoMensagemWhatsApp.CAMPANHA,
      destinatario,
      mensagem,
    );
  }

  private async prepararMensagemAutomatica(
    empresaId: string,
    tipo: TipoMensagemWhatsApp,
    destinatario: string,
    mensagem: string,
  ) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const configuracao =
      await this.prisma.configuracaoWhatsApp.findUnique({
        where: { empresaId },
      });

    const status =
      !configuracao || !configuracao.ativo
        ? StatusMensagemWhatsApp.CANCELADA
        : configuracao.usarModoDemonstracao
          ? StatusMensagemWhatsApp.SIMULADA
          : StatusMensagemWhatsApp.PENDENTE;

    const mensagemCriada =
      await this.prisma.mensagemWhatsApp.create({
        data: {
          empresaId,
          tipo,
          destinatario,
          mensagem,
          status,
          erro:
            !configuracao || !configuracao.ativo
              ? 'WhatsApp não configurado ou desativado.'
              : undefined,
          dataEnvio:
            configuracao?.usarModoDemonstracao
              ? new Date()
              : null,
        },
        include: this.getIncludeDetalhado(),
      });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[WHATSAPP] mensagem automática criada empresaId=${empresaId} mensagemId=${mensagemCriada.id} tipo=${tipo} status=${mensagemCriada.status} tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'MENSAGENS_WHATSAPP',
      recurso: 'MensagemWhatsApp',
      recursoId: mensagemCriada.id,
      dadosDepois: this.montarDadosAuditoria(mensagemCriada),
      metadata: {
        tempoMs,
        automatica: true,
        tipo,
        whatsappAtivo: Boolean(configuracao?.ativo),
        modoDemonstracao: Boolean(
          configuracao?.usarModoDemonstracao,
        ),
      },
      mensagem: 'Mensagem WhatsApp automática preparada.',
    });

    return mensagemCriada;
  }

  private async validarRelacionamentos(
    empresaId: string,
    dto:
      | CreateMensagemWhatsAppDto
      | EnviarMensagemWhatsAppDto,
  ) {
    await this.validarFiltrosRelacionados(empresaId, {
      clienteId: dto.clienteId,
      usuarioId: dto.usuarioId,
      templateId: dto.templateId,
    });
  }

  private async validarFiltrosRelacionados(
    empresaId: string,
    filtros: RelacionamentosMensagemWhatsApp,
  ) {
    const validacoes: Promise<unknown>[] = [];

    if (filtros.clienteId) {
      validacoes.push(
        this.tenantValidator.validarCliente(
          empresaId,
          filtros.clienteId,
        ),
      );
    }

    if (filtros.usuarioId) {
      validacoes.push(
        this.tenantValidator.validarUsuario(
          empresaId,
          filtros.usuarioId,
        ),
      );
    }

    if (filtros.templateId) {
      validacoes.push(
        this.validarTemplateWhatsApp(
          empresaId,
          filtros.templateId,
        ),
      );
    }

    await Promise.all(validacoes);
  }

  private async validarTemplateWhatsApp(
    empresaId: string,
    templateId: string,
  ) {
    const template =
      await this.prisma.templateWhatsApp.findFirst({
        where: {
          id: templateId,
          empresaId,
        },
        select: {
          id: true,
          empresaId: true,
          nome: true,
          tipo: true,
          titulo: true,
          ativo: true,
        },
      });

    if (!template) {
      throw new NotFoundException(
        'Template WhatsApp não encontrado nesta empresa.',
      );
    }

    return template;
  }

  private async buscarMensagemOuFalhar(
    empresaId: string,
    id: string,
  ) {
    const mensagem =
      await this.prisma.mensagemWhatsApp.findFirst({
        where: {
          id,
          empresaId,
        },
        include: this.getIncludeDetalhado(),
      });

    if (!mensagem) {
      throw new NotFoundException(
        'Mensagem WhatsApp não encontrada.',
      );
    }

    return mensagem;
  }

  private montarWhereMensagem(
    empresaId: string,
    query: PaginationDto,
  ): Prisma.MensagemWhatsAppWhereInput {
    const dataInicio = query['dataInicio']
      ? new Date(query['dataInicio'])
      : undefined;

    const dataFim = query['dataFim']
      ? new Date(query['dataFim'])
      : undefined;

    const status = query['status'] as
      | StatusMensagemWhatsApp
      | undefined;

    const tipo = query['tipo'] as
      | TipoMensagemWhatsApp
      | undefined;

    return {
      empresaId,
      ...(status ? { status } : {}),
      ...(tipo ? { tipo } : {}),
      ...(query['clienteId']
        ? { clienteId: query['clienteId'] }
        : {}),
      ...(query['usuarioId']
        ? { usuarioId: query['usuarioId'] }
        : {}),
      ...(query['templateId']
        ? { templateId: query['templateId'] }
        : {}),
      ...(dataInicio || dataFim
        ? {
            createdAt: {
              ...(dataInicio ? { gte: dataInicio } : {}),
              ...(dataFim ? { lte: dataFim } : {}),
            },
          }
        : {}),
      ...(query.search
        ? {
            OR: [
              {
                destinatario: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                mensagem: {
                  contains: query.search,
                  mode: 'insensitive',
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

  private montarDadosAuditoria(mensagem: any) {
    return {
      id: mensagem.id,
      empresaId: mensagem.empresaId,
      clienteId: mensagem.clienteId,
      clienteNome: mensagem.cliente?.nome,
      usuarioId: mensagem.usuarioId,
      usuarioNome: mensagem.usuario?.nome,
      templateId: mensagem.templateId,
      templateNome: mensagem.template?.nome,
      tipo: mensagem.tipo,
      destinatario: mensagem.destinatario,
      status: mensagem.status,
      dataEnvio: mensagem.dataEnvio,
      erro: mensagem.erro,
      createdAt: mensagem.createdAt,
      updatedAt: mensagem.updatedAt,
    };
  }

  private getIncludeListagem() {
    return {
      cliente: {
        select: {
          id: true,
          nome: true,
          telefone: true,
        },
      },
      usuario: {
        select: {
          id: true,
          nome: true,
          role: true,
        },
      },
      template: {
        select: {
          id: true,
          nome: true,
          tipo: true,
          titulo: true,
        },
      },
    };
  }

  private getIncludeDetalhado() {
    return {
      cliente: {
        select: {
          id: true,
          nome: true,
          telefone: true,
          email: true,
        },
      },
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
          role: true,
        },
      },
      template: {
        select: {
          id: true,
          nome: true,
          tipo: true,
          titulo: true,
          mensagem: true,
          ativo: true,
        },
      },
    };
  }
}