import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import {
  AcaoAuditoria,
  StatusAuditoria,
  TipoUsuarioAuditoria,
} from '@prisma/client';
import { QueuesService } from '../../queues/services/queues.service';
import { DistributedLockService } from '../../queues/services/distributed-lock.service';
import { QueueMonitorService } from '../../queues/services/queue-monitor.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { SessoesService } from '../sessoes/sessoes.service';
import { ArquivosCleanupService } from '../arquivos/arquivos-cleanup.service';
import {
  SchedulerCron,
  SCHEDULER_ROTINAS,
  SCHEDULER_TIMEZONE_DEFAULT,
} from './constants/scheduler-times';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly queuesService: QueuesService,
    private readonly auditoriaService: AuditoriaService,
    private readonly sessoesService: SessoesService,
    private readonly arquivosCleanupService: ArquivosCleanupService,
    private readonly distributedLockService: DistributedLockService,
    private readonly queueMonitorService: QueueMonitorService,
  ) {}

  getStatus() {
    return {
      enabled: this.isEnabled(),
      timezone: this.getTimezone(),
      rotinas: SCHEDULER_ROTINAS,
    };
  }

  private isEnabled(): boolean {
    return (
      this.configService.get<string>(
        'SCHEDULER_ENABLED',
        'true',
      ) !== 'false'
    );
  }

  private getTimezone(): string {
    return this.configService.get<string>(
      'SCHEDULER_TIMEZONE',
      SCHEDULER_TIMEZONE_DEFAULT,
    );
  }

  private async registrarAuditoriaScheduler(params: {
    rotina: string;
    status: 'INICIADA' | 'ENVIADA_PARA_FILA' | 'FALHA';
    mensagem: string;
    erro?: string;
    tempoMs?: number;
    result?: unknown;
  }) {
    const falhou = params.status === 'FALHA';

    await this.auditoriaService.registrar({
      tipoUsuario: 'SISTEMA' as TipoUsuarioAuditoria,
      acao: (
        falhou ? 'CRON_FALHOU' : 'CRON_EXECUTADO'
      ) as AcaoAuditoria,
      status: (
        falhou ? 'FALHA' : 'SUCESSO'
      ) as StatusAuditoria,
      modulo: 'SCHEDULER',
      recurso: 'Scheduler',
      mensagem: params.mensagem,
      metadata: {
        origem: 'scheduler',
        rotina: params.rotina,
        statusOperacional: params.status,
        erro: params.erro,
        tempoMs: params.tempoMs,
        timezone: this.getTimezone(),
        dataReferencia: new Date().toISOString(),
        result: params.result,
      },
    });
  }

  private async executarRotina(
    rotina: string,
    callback: () => Promise<unknown>,
  ) {
    const startedAt = Date.now();

    if (!this.isEnabled()) {
      this.logger.warn(
        `[SCHEDULER] rotina=${rotina} status=IGNORADA motivo=scheduler_desabilitado`,
      );

      return {
        success: false,
        skipped: true,
        rotina,
      };
    }

    try {
      this.logger.log(
        `[SCHEDULER] rotina=${rotina} status=INICIADA`,
      );

      await this.registrarAuditoriaScheduler({
        rotina,
        status: 'INICIADA',
        mensagem: `Rotina ${rotina} iniciada pelo Scheduler.`,
      });

      const result = await callback();

      const tempoMs = Date.now() - startedAt;

      this.logger.log(
        `[SCHEDULER] rotina=${rotina} status=ENVIADA_PARA_FILA tempoMs=${tempoMs}`,
      );

      await this.registrarAuditoriaScheduler({
        rotina,
        status: 'ENVIADA_PARA_FILA',
        mensagem: `Rotina ${rotina} enviada para fila com sucesso.`,
        tempoMs,
        result,
      });

      return {
        success: true,
        rotina,
        result,
        tempoMs,
      };
    } catch (error) {
      const tempoMs = Date.now() - startedAt;

      const mensagemErro =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido';

      this.logger.error(
        `[SCHEDULER] rotina=${rotina} status=FALHA tempoMs=${tempoMs} erro=${mensagemErro}`,
        error instanceof Error ? error.stack : String(error),
      );

      await this.registrarAuditoriaScheduler({
        rotina,
        status: 'FALHA',
        mensagem: `Rotina ${rotina} falhou: ${mensagemErro}`,
        erro: mensagemErro,
        tempoMs,
      });

      return {
        success: false,
        rotina,
        error: mensagemErro,
        tempoMs,
      };
    }
  }

  @Cron(SchedulerCron.ANIVERSARIOS_DIARIOS, {
    name: 'aniversarios_diarios',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async processarAniversariantesDiarios() {
    return this.executarRotinaComLock('aniversariantes_diarios', async () => {
      return this.executarRotina('aniversarios', async () => {
            return this.queuesService.adicionarAniversarioScheduler({
              tipo: 'ANIVERSARIANTES_DIA',
              dataReferencia: new Date().toISOString(),
              metadata: {
                origem: 'scheduler',
                rotina: 'aniversarios',
              },
            });
          });
    });
  }

  @Cron(SchedulerCron.LEMBRETES_AGENDAMENTO, {
    name: 'lembretes_agendamento',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async processarLembretesAgendamento() {
    return this.executarRotina(
      'lembretes_agendamento',
      async () => {
        return this.queuesService.adicionarWhatsappScheduler({
          mensagem:
            'Rotina automática de lembretes de agendamento iniciada.',
          tipo: 'LEMBRETE_AGENDAMENTO',
          dataReferencia: new Date().toISOString(),
          metadata: {
            origem: 'scheduler',
            rotina: 'lembretes_agendamento',
            preparadoPara: [
              'lembrete_24h',
              'lembrete_2h',
              'confirmacao_automatica',
            ],
          },
        });
      },
    );
  }

  @Cron(SchedulerCron.PACOTES_VENCIDOS, {
    name: 'pacotes_vencidos',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async processarPacotesVencidos() {
    return this.executarRotinaComLock('pacotes_vencidos', async () => {
      return this.executarRotina(
            'pacotes_vencidos',
            async () => {
              return this.queuesService.adicionarNotificacaoScheduler({
                titulo: 'Verificação de pacotes vencidos',
                mensagem:
                  'Rotina automática de pacotes vencidos iniciada.',
                tipo: 'PACOTES_VENCIDOS',
                dataReferencia: new Date().toISOString(),
                metadata: {
                  origem: 'scheduler',
                  rotina: 'pacotes_vencidos',
                  modo: 'verificacao_segura',
                },
              });
            },
          );
    });
  }

  @Cron(SchedulerCron.CAMPANHAS_AGENDADAS, {
    name: 'campanhas_agendadas',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async processarCampanhasAgendadas() {
    return this.executarRotinaComLock('campanhas_agendadas', async () => {
      return this.executarRotina(
            'campanhas_agendadas',
            async () => {
              return this.queuesService.adicionarCampanhaScheduler({
                tipo: 'CAMPANHAS_AGENDADAS',
                dataReferencia: new Date().toISOString(),
                metadata: {
                  origem: 'scheduler',
                  rotina: 'campanhas_agendadas',
                  envioReal: false,
                },
              });
            },
          );
    });
  }

  @Cron(SchedulerCron.RELATORIOS_DIARIOS, {
    name: 'relatorios_diarios',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async processarRelatoriosDiarios() {
    return this.executarRotinaComLock('relatorios_diarios', async () => {
      return this.executarRotina(
            'relatorios_diarios',
            async () => {
              return this.queuesService.adicionarRelatorioScheduler({
                tipo: 'RELATORIOS_DIARIOS',
                tipoRelatorio: 'GERAL',
                dataReferencia: new Date().toISOString(),
                metadata: {
                  origem: 'scheduler',
                  rotina: 'relatorios_diarios',
                  relatorios: [
                    'financeiro',
                    'agendamentos',
                    'executivo',
                  ],
                },
              });
            },
          );
    });
  }

  @Cron(SchedulerCron.LIMPEZA_NOTIFICACOES, {
    name: 'limpeza_notificacoes',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async processarLimpezaNotificacoesAntigas() {
    return this.executarRotina(
      'limpeza_notificacoes',
      async () => {
        return this.queuesService.adicionarNotificacaoScheduler({
          titulo: 'Limpeza de notificações antigas',
          mensagem:
            'Rotina automática de limpeza de notificações antigas iniciada.',
          tipo: 'LIMPEZA_NOTIFICACOES_ANTIGAS',
          dataReferencia: new Date().toISOString(),
          metadata: {
            origem: 'scheduler',
            rotina: 'limpeza_notificacoes',
            modo: 'preparacao_sem_exclusao_critica',
          },
        });
      },
    );
  }

  @Cron(SchedulerCron.LIMPEZA_AUDITORIA, {
    name: 'limpeza_auditoria',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async processarLimpezaAuditoriaAntiga() {
    return this.executarRotina(
      'limpeza_auditoria',
      async () => {
        this.logger.warn(
          '[SCHEDULER] limpeza de auditoria apenas registrada; nenhuma auditoria crítica será apagada.',
        );

        return {
          registrado: true,
          exclusaoExecutada: false,
        };
      },
    );
  }
  @Cron(SchedulerCron.LIMPEZA_SESSOES, {
    name: 'limpeza_sessoes',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async processarLimpezaSessoes() {
    return this.executarRotina(
      'limpeza_sessoes',
      async () => {
        const result =
          await this.sessoesService.limparSessoesExpiradasERevogadasAntigas();

        this.logger.log(
          `[SCHEDULER] rotina=limpeza_sessoes status=CONCLUIDA result=${JSON.stringify(result)}`,
        );

        return {
          limpezaExecutada: true,
          ...result,
        };
      },
    );
  }



  @Cron('0 4 * * *', {
    name: 'limpeza_arquivos_temp',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async limparArquivosTemporarios() {
    return this.executarRotina('limpeza_arquivos_temp', async () => {
      return this.arquivosCleanupService.limparArquivosTemp(24);
    });
  }

  @Cron('30 4 * * *', {
    name: 'relatorio_arquivos_orfaos',
    timeZone: SCHEDULER_TIMEZONE_DEFAULT,
    waitForCompletion: true,
  })
  async gerarRelatorioArquivosOrfaos() {
    return this.executarRotina('relatorio_arquivos_orfaos', async () => {
      return this.arquivosCleanupService.gerarRelatorioArquivosOrfaos();
    });
  }



  private async executarRotinaComLock<T>(
    rotina: string,
    callback: () => Promise<T> | T,
  ): Promise<T | { skipped: true; reason: 'LOCKED'; key: string }> {
    const lockKey = `beauty-core:scheduler:${rotina}`;

    return this.distributedLockService.withLock(lockKey, async () => {
      return callback();
    });
  }


  async getEnterpriseStatus() {
    return {
      scheduler: {
        enabled: typeof (this as any).isEnabled === 'function'
          ? (this as any).isEnabled()
          : true,
        timezone: typeof (this as any).getTimezone === 'function'
          ? (this as any).getTimezone()
          : process.env.SCHEDULER_TIMEZONE ?? 'America/Sao_Paulo',
      },
      locks: {
        provider: 'redis',
        ttlMs: Number(process.env.QUEUE_LOCK_TTL ?? 600000),
      },
      queues: await this.queueMonitorService.getStatus(),
    };
  }



  @Cron('0 3 * * *', {
    name: 'limpeza_jobs_bullmq',
  })
  async limparJobsBullMq() {
    return this.executarRotinaComLock('limpeza_jobs_bullmq', async () => {
      const queues = this.queueMonitorService.getQueuesMap();

      const completedGraceMs = Number(
        this.configService.get('QUEUE_CLEAN_COMPLETED_AGE_MS', 604800000),
      );

      const failedGraceMs = Number(
        this.configService.get('QUEUE_CLEAN_FAILED_AGE_MS', 2592000000),
      );

      const limit = Number(this.configService.get('QUEUE_CLEAN_LIMIT', 1000));

      const result: Record<string, unknown> = {};

      for (const [name, queue] of Object.entries(queues) as [string, any][]) {
        result[name] = {
          completed: await queue.clean(completedGraceMs, limit, 'completed'),
          failed: await queue.clean(failedGraceMs, limit, 'failed'),
        };
      }

      return {
        status: 'ok',
        completedGraceMs,
        failedGraceMs,
        limit,
        queues: result,
      };
    });
  }

}