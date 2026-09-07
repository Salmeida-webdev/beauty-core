import { Injectable } from '@nestjs/common';
import {
  Role,
  TipoNotificacao,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { ConfiguracoesNotificacaoService } from '../configuracoes-notificacao/configuracoes-notificacao.service';

import { QueuesService } from '../../queues/services/queues.service';

import { ProcessarEventoDto } from './dto/processar-evento.dto';
import { TipoEventoSistema } from './eventos/tipo-evento-sistema.enum';

@Injectable()
export class AutomacoesService {
  private readonly maxEventosEmMemoria = 500;

  private eventosProcessados: ProcessarEventoDto[] = [];

  constructor(
    private readonly configuracoesNotificacaoService: ConfiguracoesNotificacaoService,
    private readonly prisma: PrismaService,
    private readonly queuesService: QueuesService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async processarEvento(dto: ProcessarEventoDto) {
    const empresaId = dto.empresaId as string;

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const permitido = await this.podeNotificar(
      empresaId,
      dto.tipo,
    );

    this.registrarEventoEmMemoria({
      ...dto,
      empresaId,
      dados: {
        ...dto.dados,
        processadoEm: new Date(),
        notificacaoGerada: permitido,
        processamento: 'assincrono',
      },
    });

    if (!permitido) {
      return {
        processado: true,
        processamento: 'assincrono',
        notificacaoGerada: false,
        motivo:
          'Notificação desativada nas configurações da empresa.',
      };
    }

    const usuarioResponsavel =
      await this.buscarUsuarioResponsavel(empresaId);

    const usuarioId =
      dto.usuarioId ??
      this.extrairUsuarioIdDosDados(dto.dados) ??
      usuarioResponsavel?.id;

    if (!usuarioId) {
      return {
        processado: true,
        processamento: 'assincrono',
        notificacaoGerada: false,
        motivo:
          'Nenhum usuário responsável encontrado para receber a notificação.',
      };
    }

    await this.tenantValidator.validarUsuario(
      empresaId,
      usuarioId,
    );

    const job =
      await this.queuesService.adicionarNotificacao({
        empresaId,
        usuarioId,
        titulo: dto.titulo ?? this.gerarTitulo(dto.tipo),
        mensagem:
          dto.mensagem ?? this.gerarMensagem(dto.tipo),
        tipo: this.mapearTipoNotificacao(dto.tipo),
      });

    return {
      processado: true,
      processamento: 'assincrono',
      notificacaoGerada: true,
      jobId: job.id,
      queue: 'notificacoes',
    };
  }

  async testarAniversario(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const job =
      await this.queuesService.adicionarAniversario({
        empresaId,
        clienteId: 'teste-cliente',
      });

    return {
      processado: true,
      processamento: 'assincrono',
      queue: 'aniversarios',
      jobId: job.id,
    };
  }

  async testarRelatorio(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const job =
      await this.queuesService.adicionarRelatorio({
        empresaId,
        tipo: 'FINANCEIRO',
      });

    return {
      processado: true,
      processamento: 'assincrono',
      queue: 'relatorios',
      jobId: job.id,
    };
  }

  async listarEventos(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const eventosEmpresa = this.eventosProcessados.filter(
      (evento) => evento.empresaId === empresaId,
    );

    const porTipo =
      eventosEmpresa.reduce<Record<string, number>>(
        (acc, evento) => {
          acc[evento.tipo] =
            (acc[evento.tipo] || 0) + 1;

          return acc;
        },
        {},
      );

    const porModulo =
      eventosEmpresa.reduce<Record<string, number>>(
        (acc, evento) => {
          acc[evento.modulo] =
            (acc[evento.modulo] || 0) + 1;

          return acc;
        },
        {},
      );

    return {
      total: eventosEmpresa.length,
      porTipo,
      porModulo,
      eventos: eventosEmpresa,
    };
  }

  private registrarEventoEmMemoria(evento: ProcessarEventoDto) {
    this.eventosProcessados.push(evento);

    if (this.eventosProcessados.length > this.maxEventosEmMemoria) {
      this.eventosProcessados = this.eventosProcessados.slice(
        -this.maxEventosEmMemoria,
      );
    }
  }

  private extrairUsuarioIdDosDados(
    dados?: Record<string, any> | null,
  ): string | undefined {
    if (!dados?.usuarioId) {
      return undefined;
    }

    if (typeof dados.usuarioId !== 'string') {
      return undefined;
    }

    return dados.usuarioId;
  }

  private async podeNotificar(
    empresaId: string,
    tipo: TipoEventoSistema,
  ): Promise<boolean> {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const config =
      await this.configuracoesNotificacaoService.findOne(
        empresaId,
      );

    if (!config) {
      return true;
    }

    if (
      [
        TipoEventoSistema.AGENDAMENTO_CRIADO,
        TipoEventoSistema.AGENDAMENTO_CONFIRMADO,
        TipoEventoSistema.AGENDAMENTO_CANCELADO,
        TipoEventoSistema.AGENDAMENTO_CONCLUIDO,
      ].includes(tipo)
    ) {
      return config.notificarAgendamentos;
    }

    if (
      [
        TipoEventoSistema.PONTOS_ADICIONADOS,
        TipoEventoSistema.PONTOS_RESGATADOS,
        TipoEventoSistema.BENEFICIO_LIBERADO,
        TipoEventoSistema.NIVEL_ALTERADO,
      ].includes(tipo)
    ) {
      return config.notificarFidelidade;
    }

    if (
      [
        TipoEventoSistema.PACOTE_CRIADO,
        TipoEventoSistema.PACOTE_FINALIZADO,
        TipoEventoSistema.PACOTE_VENCIDO,
      ].includes(tipo)
    ) {
      return config.notificarPacotes;
    }

    if (
      [
        TipoEventoSistema.MOVIMENTACAO_FINANCEIRA,
        TipoEventoSistema.COMISSAO_GERADA,
        TipoEventoSistema.COMISSAO_PAGA,
      ].includes(tipo)
    ) {
      return config.notificarFinanceiro;
    }

    if (
      [
        TipoEventoSistema.CLIENTE_CADASTRADO,
        TipoEventoSistema.CLIENTE_ANIVERSARIANTE,
      ].includes(tipo)
    ) {
      return config.notificarClientes;
    }

    return true;
  }

  private gerarTitulo(tipo: TipoEventoSistema): string {
    const titulos: Record<TipoEventoSistema, string> = {
      [TipoEventoSistema.AGENDAMENTO_CRIADO]:
        'Novo agendamento criado',
      [TipoEventoSistema.AGENDAMENTO_CONFIRMADO]:
        'Agendamento confirmado',
      [TipoEventoSistema.AGENDAMENTO_CANCELADO]:
        'Agendamento cancelado',
      [TipoEventoSistema.AGENDAMENTO_CONCLUIDO]:
        'Agendamento concluído',

      [TipoEventoSistema.PONTOS_ADICIONADOS]:
        'Pontos adicionados',
      [TipoEventoSistema.PONTOS_RESGATADOS]:
        'Pontos resgatados',
      [TipoEventoSistema.BENEFICIO_LIBERADO]:
        'Benefício liberado',
      [TipoEventoSistema.NIVEL_ALTERADO]:
        'Nível de fidelidade alterado',

      [TipoEventoSistema.PACOTE_CRIADO]: 'Pacote criado',
      [TipoEventoSistema.PACOTE_FINALIZADO]:
        'Pacote finalizado',
      [TipoEventoSistema.PACOTE_VENCIDO]: 'Pacote vencido',

      [TipoEventoSistema.MOVIMENTACAO_FINANCEIRA]:
        'Movimentação financeira registrada',

      [TipoEventoSistema.COMISSAO_GERADA]: 'Comissão gerada',
      [TipoEventoSistema.COMISSAO_PAGA]: 'Comissão paga',

      [TipoEventoSistema.CLIENTE_ANIVERSARIANTE]:
        'Cliente aniversariante',
      [TipoEventoSistema.CLIENTE_CADASTRADO]:
        'Novo cliente cadastrado',

      [TipoEventoSistema.SERVICO_CADASTRADO]:
        'Novo serviço cadastrado',
    };

    return titulos[tipo];
  }

  private gerarMensagem(tipo: TipoEventoSistema): string {
    return `Evento processado automaticamente: ${tipo}`;
  }

  private mapearTipoNotificacao(
    tipo: TipoEventoSistema,
  ): TipoNotificacao {
    if (tipo.includes('AGENDAMENTO')) {
      return TipoNotificacao.AGENDAMENTO;
    }

    if (
      tipo.includes('PONTO') ||
      tipo.includes('BENEFICIO') ||
      tipo.includes('NIVEL')
    ) {
      return TipoNotificacao.FIDELIDADE;
    }

    if (tipo.includes('PACOTE')) {
      return TipoNotificacao.PACOTE;
    }

    if (
      tipo.includes('FINANCEIRA') ||
      tipo.includes('COMISSAO')
    ) {
      return TipoNotificacao.FINANCEIRO;
    }

    if (tipo.includes('CLIENTE')) {
      return TipoNotificacao.CLIENTE;
    }

    return TipoNotificacao.SISTEMA;
  }

  private async buscarUsuarioResponsavel(
    empresaId: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.usuario.findFirst({
      where: {
        empresaId,
        ativo: true,
        role: {
          in: [Role.ADMIN, Role.GERENTE],
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}