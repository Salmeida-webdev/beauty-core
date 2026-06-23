import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { execFileSync } from 'child_process';
import { appendFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'fs';
import { join, resolve } from 'path';

import { PrismaService } from '../database/prisma/prisma.service';

type BackupJobName =
  | 'backup_postgres_diario'
  | 'backup_uploads_diario'
  | 'backup_semanal_completo';

type BackupScriptResult = {
  script: string;
  status: 'SUCESSO' | 'FALHA';
  output?: string;
  error?: string;
};

@Injectable()
export class BackupService {
  private readonly projectRoot = process.cwd();
  private readonly logPath = join(this.projectRoot, 'logs', 'backups', 'automation.log');

  constructor(private readonly prisma: PrismaService) {
    this.ensureDirectories();
  }

  getStatus() {
    return {
      timestamp: new Date().toISOString(),
      executionEnabled: this.isExecutionEnabled(),
      rpo: process.env.BACKUP_RPO ?? '24h',
      rto: process.env.BACKUP_RTO ?? '4h',
      directories: {
        postgres: this.pathStatus('backups/postgres'),
        uploads: this.pathStatus('backups/uploads'),
        redis: this.pathStatus('backups/redis'),
        logs: this.pathStatus('logs/backups'),
      },
      scripts: {
        postgresBackup: this.pathStatus('scripts/backup/postgres-backup.ps1'),
        postgresRestore: this.pathStatus('scripts/backup/postgres-restore.ps1'),
        uploadsBackup: this.pathStatus('scripts/uploads/uploads-backup.ps1'),
        uploadsRestore: this.pathStatus('scripts/uploads/uploads-restore.ps1'),
        redisBackup: this.pathStatus('scripts/backup/redis-backup.ps1'),
        redisRestore: this.pathStatus('scripts/backup/redis-restore.ps1'),
        validateRestore: this.pathStatus('scripts/backup/validate-restore.ps1'),
      },
      scheduler: {
        backupPostgresDiario: '0 2 * * *',
        backupUploadsDiario: '30 2 * * *',
        backupSemanalCompleto: '0 3 * * 0',
        limpezaSessoesExpiradas: 'manual-ready',
        limpezaUploadsTemp: 'manual-ready',
        limpezaJobsAntigos: 'scheduler-ready',
      },
      mode: this.isExecutionEnabled() ? 'execution-enabled' : 'scheduler-ready',
    };
  }

  executarBackupPostgres() {
    return this.registrarOuExecutarBackup('backup_postgres_diario');
  }

  executarBackupUploads() {
    return this.registrarOuExecutarBackup('backup_uploads_diario');
  }

  executarBackupCompleto() {
    return this.registrarOuExecutarBackup('backup_semanal_completo');
  }

  async executarLimpezaOperacional() {
    const sessoes = await this.limparSessoesAntigas();
    const uploads = this.limparUploadsTemp();
    const jobs = this.registrarLimpezaJobsAntigos();
    const payload = { timestamp: new Date().toISOString(), results: [sessoes, uploads, jobs] };

    this.appendAutomationLog({ evento: 'LIMPEZA_OPERACIONAL', ...payload });

    return payload;
  }

  @Cron('0 2 * * *')
  executarBackupPostgresAgendado() {
    return this.executarBackupPostgres();
  }

  @Cron('30 2 * * *')
  executarBackupUploadsAgendado() {
    return this.executarBackupUploads();
  }

  @Cron('0 3 * * 0')
  executarBackupCompletoAgendado() {
    return this.executarBackupCompleto();
  }

  @Cron('0 4 * * *')
  executarLimpezaOperacionalAgendada() {
    return this.executarLimpezaOperacional();
  }

  private async limparSessoesAntigas() {
    const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    let deletedCount = 0;
    const delegate = (this.prisma as any).sessao;

    if (delegate?.deleteMany) {
      const result = await delegate.deleteMany({
        where: {
          OR: [
            { expiraEm: { lt: cutoff } },
            { revogada: true, updatedAt: { lt: cutoff } },
          ],
        },
      });

      deletedCount = result?.count ?? 0;
    }

    const payload = {
      job: 'limpeza_sessoes_expiradas',
      status: 'SUCESSO',
      cutoff: cutoff.toISOString(),
      deletedCount,
    };

    this.appendAutomationLog(payload);
    await this.registrarAuditoria(
      'LIMPEZA_AUTOMATICA',
      'Sessoes expiradas/revogadas antigas limpas.',
      payload,
    );

    return payload;
  }

  private limparUploadsTemp() {
    const tempDir = resolve(this.projectRoot, 'uploads', 'temp');
    const cutoffMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
    let removedCount = 0;

    if (existsSync(tempDir)) {
      for (const item of readdirSync(tempDir)) {
        const itemPath = join(tempDir, item);

        if (statSync(itemPath).mtimeMs < cutoffMs) {
          rmSync(itemPath, { recursive: true, force: true });
          removedCount++;
        }
      }
    }

    const payload = {
      job: 'limpeza_uploads_temp',
      status: 'SUCESSO',
      retentionDays: 7,
      removedCount,
    };

    this.appendAutomationLog(payload);
    void this.registrarAuditoria(
      'LIMPEZA_AUTOMATICA',
      'Uploads temporarios antigos limpos.',
      payload,
    );

    return payload;
  }

  private registrarLimpezaJobsAntigos() {
    const payload = {
      job: 'limpeza_jobs_antigos',
      status: 'SIMULADO',
      retentionCompletedJobsDays: 30,
      retentionFailedJobsDays: 90,
      message: 'Estrutura de retencao de jobs antigos preparada para integracao BullMQ especifica.',
    };

    this.appendAutomationLog(payload);
    void this.registrarAuditoria(
      'RETENCAO_EXECUTADA',
      'Retencao de jobs antigos registrada em modo scheduler-ready.',
      payload,
    );

    return payload;
  }

  private registrarOuExecutarBackup(job: BackupJobName) {
    if (!this.isExecutionEnabled()) {
      return this.registrarExecucaoSimulada(job);
    }

    return this.executarBackupReal(job);
  }

  private registrarExecucaoSimulada(job: BackupJobName) {
    const payload = {
      job,
      status: 'SIMULADO',
      timestamp: new Date().toISOString(),
      executionEnabled: this.isExecutionEnabled(),
      message: 'Backup registrado em modo seguro. Execucao real exige BACKUP_EXECUTION_ENABLED=true.',
      scripts: this.scriptsForJob(job),
    };

    this.appendAutomationLog(payload);

    return payload;
  }

  private executarBackupReal(job: BackupJobName) {
    const scripts = this.scriptsForJob(job);
    const startedAt = Date.now();
    const results: BackupScriptResult[] = [];

    for (const script of scripts) {
      results.push(this.executarScriptPowerShell(script));
    }

    const payload = {
      job,
      status: 'SUCESSO',
      timestamp: new Date().toISOString(),
      executionEnabled: true,
      durationMs: Date.now() - startedAt,
      scripts,
      results,
    };

    this.appendAutomationLog(payload);

    return payload;
  }

  private executarScriptPowerShell(script: string): BackupScriptResult {
    const scriptPath = resolve(this.projectRoot, script);

    if (!existsSync(scriptPath)) {
      throw new Error(`Script de backup nao encontrado: ${script}`);
    }

    try {
      const output = execFileSync(
        'powershell',
        ['-ExecutionPolicy', 'Bypass', '-File', scriptPath],
        {
          cwd: this.projectRoot,
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
          timeout: Number(process.env.BACKUP_SCRIPT_TIMEOUT_MS ?? 15 * 60 * 1000),
        },
      );

      return {
        script,
        status: 'SUCESSO',
        output: this.truncateOutput(output),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const payload = {
        script,
        status: 'FALHA',
        error: message,
      } satisfies BackupScriptResult;

      this.appendAutomationLog({
        evento: 'BACKUP_SCRIPT_FALHA',
        ...payload,
      });

      throw new Error(`Falha ao executar script de backup ${script}: ${message}`);
    }
  }

  private truncateOutput(output: string) {
    const clean = output.trim();

    if (clean.length <= 2000) {
      return clean;
    }

    return clean.slice(0, 2000) + '...';
  }

  private scriptsForJob(job: BackupJobName) {
    if (job === 'backup_postgres_diario') {
      return ['scripts/backup/postgres-backup.ps1'];
    }

    if (job === 'backup_uploads_diario') {
      return ['scripts/uploads/uploads-backup.ps1'];
    }

    return [
      'scripts/backup/postgres-backup.ps1',
      'scripts/uploads/uploads-backup.ps1',
      'scripts/backup/redis-backup.ps1',
    ];
  }

  private async registrarAuditoria(
    acao: string,
    mensagem: string,
    dadosDepois: Record<string, unknown>,
  ) {
    try {
      const delegate = (this.prisma as any).auditoriaSistema;

      if (!delegate?.create) {
        return;
      }

      await delegate.create({
        data: {
          empresaId: null,
          usuarioId: null,
          clienteId: null,
          tipoUsuario: 'SISTEMA',
          acao,
          modulo: 'BACKUP_RECOVERY',
          rota: null,
          ip: null,
          userAgent: 'Scheduler',
          recurso: 'BackupRecovery',
          dadosAntes: null,
          dadosDepois,
          status: 'SUCESSO',
          mensagem,
        },
      });
    } catch {
      return;
    }
  }

  private appendAutomationLog(payload: Record<string, unknown>) {
    this.ensureDirectories();
    appendFileSync(this.logPath, JSON.stringify(payload) + '\n', { encoding: 'utf8' });
  }

  private isExecutionEnabled() {
    return process.env.BACKUP_EXECUTION_ENABLED === 'true';
  }

  private ensureDirectories() {
    for (const dir of [
      'backups/postgres',
      'backups/uploads',
      'backups/redis',
      'logs/backups',
      'uploads/temp',
    ]) {
      const fullPath = resolve(this.projectRoot, dir);

      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
      }
    }
  }

  private pathStatus(path: string) {
    const absolutePath = resolve(this.projectRoot, path);

    return { path, exists: existsSync(absolutePath) };
  }
}