import { execFileSync } from 'child_process';

import { BackupController } from '../../src/backup/backup.controller';
import { BackupService } from '../../src/backup/backup.service';
import type { PrismaService } from '../../src/database/prisma/prisma.service';
type PrismaTestDouble = {
  sessao: { deleteMany: jest.Mock };
  auditoriaSistema: { create: jest.Mock };
};

type BackupResultWithScripts = {
  results: Array<{ script: string }>;
};

type BackupServiceTestDouble = {
  getStatus: jest.Mock;
  executarBackupPostgres: jest.Mock;
  executarBackupUploads: jest.Mock;
  executarBackupCompleto: jest.Mock;
  executarLimpezaOperacional: jest.Mock;
};

jest.mock('child_process', () => {
  const actual =
    jest.requireActual<typeof import('child_process')>('child_process');
  return { ...actual, execFileSync: jest.fn() };
});

describe('Chat 36 Backup Coverage', () => {
  let prisma: PrismaTestDouble;
  let service: BackupService;
  let originalBackupExecutionEnabled: string | undefined;

  beforeEach(() => {
    originalBackupExecutionEnabled = process.env.BACKUP_EXECUTION_ENABLED;
    delete process.env.BACKUP_EXECUTION_ENABLED;

    jest.clearAllMocks();

    prisma = {
      sessao: {
        deleteMany: jest.fn().mockResolvedValue({ count: 2 }),
      },
      auditoriaSistema: {
        create: jest.fn().mockResolvedValue({ id: 'auditoria-id' }),
      },
    };

    service = new BackupService(prisma as unknown as PrismaService);
  });

  afterEach(() => {
    if (originalBackupExecutionEnabled === undefined) {
      delete process.env.BACKUP_EXECUTION_ENABLED;
    } else {
      process.env.BACKUP_EXECUTION_ENABLED = originalBackupExecutionEnabled;
    }
  });

  it('deve retornar status operacional de backup/recovery', () => {
    const status = service.getStatus();

    expect(status).toBeDefined();
    expect(JSON.stringify(status)).toContain('postgres');
    expect(JSON.stringify(status)).toContain('uploads');
    expect(JSON.stringify(status)).toContain('redis');
    expect(JSON.stringify(status)).toContain('validateRestore');
  });

  it('deve manter execucao simulada quando BACKUP_EXECUTION_ENABLED nao estiver ativo', () => {
    const postgres = service.executarBackupPostgres();
    const uploads = service.executarBackupUploads();
    const completo = service.executarBackupCompleto();

    expect(postgres.status).toBe('SIMULADO');
    expect(uploads.status).toBe('SIMULADO');
    expect(completo.status).toBe('SIMULADO');
    expect(JSON.stringify(postgres)).toContain('backup_postgres_diario');
    expect(JSON.stringify(uploads)).toContain('backup_uploads_diario');
    expect(JSON.stringify(completo)).toContain('backup_semanal_completo');
    expect(execFileSync).not.toHaveBeenCalled();
  });

  it('deve executar script real de postgres quando BACKUP_EXECUTION_ENABLED=true', () => {
    process.env.BACKUP_EXECUTION_ENABLED = 'true';
    (execFileSync as jest.Mock).mockReturnValue('Backup PostgreSQL concluido');

    const result = service.executarBackupPostgres();

    expect(result.status).toBe('SUCESSO');
    expect(result.executionEnabled).toBe(true);
    if (!('results' in result)) {
      throw new Error('Backup PostgreSQL não retornou resultados de scripts.');
    }
    expect(result.results).toHaveLength(2);
    const typedResult = result as unknown as BackupResultWithScripts;
    expect(typedResult.results[0].script).toBe(
      'scripts/backup/postgres-backup.sh',
    );
    expect(execFileSync).toHaveBeenCalledTimes(2);
  });

  it('deve executar scripts reais de backup completo quando habilitado', () => {
    process.env.BACKUP_EXECUTION_ENABLED = 'true';
    (execFileSync as jest.Mock).mockReturnValue('OK');

    const result = service.executarBackupCompleto();

    expect(result.status).toBe('SUCESSO');
    if (!('results' in result)) {
      throw new Error('Backup completo não retornou resultados de scripts.');
    }
    expect(result.results).toHaveLength(4);
    expect(JSON.stringify(result)).toContain(
      'scripts/backup/postgres-backup.sh',
    );
    expect(JSON.stringify(result)).toContain(
      'scripts/uploads/uploads-backup.sh',
    );
    expect(JSON.stringify(result)).toContain('scripts/backup/redis-backup.sh');
    expect(execFileSync).toHaveBeenCalledTimes(4);
  });

  it('deve propagar falha de script real quando backup habilitado falhar', () => {
    process.env.BACKUP_EXECUTION_ENABLED = 'true';
    (execFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('docker down');
    });

    expect(() => service.executarBackupPostgres()).toThrow(/docker down/);
  });

  it('deve delegar execucoes agendadas para os metodos principais', () => {
    expect(JSON.stringify(service.executarBackupPostgresAgendado())).toContain(
      'backup_postgres_diario',
    );
    expect(JSON.stringify(service.executarBackupUploadsAgendado())).toContain(
      'backup_uploads_diario',
    );
    expect(JSON.stringify(service.executarBackupCompletoAgendado())).toContain(
      'backup_semanal_completo',
    );
  });

  it('deve executar limpeza operacional com auditoria resiliente', async () => {
    const result = await service.executarLimpezaOperacional();

    expect(result).toBeDefined();
    expect(prisma.sessao.deleteMany).toHaveBeenCalled();
    expect(JSON.stringify(result)).toContain('sessoes');
    expect(JSON.stringify(result)).toContain('uploads');
    expect(JSON.stringify(result)).toContain('jobs');
  });

  it('deve ignorar falha de auditoria sem quebrar operacao', () => {
    prisma.auditoriaSistema.create.mockRejectedValueOnce(
      new Error('audit down'),
    );

    const result = service.executarBackupPostgres();

    expect(result).toBeDefined();
    expect(JSON.stringify(result)).toContain('backup_postgres_diario');
  });

  it('controller deve delegar endpoints para o service', async () => {
    const mockService: BackupServiceTestDouble = {
      getStatus: jest.fn().mockReturnValue({ ok: true }),
      executarBackupPostgres: jest.fn().mockReturnValue({ job: 'postgres' }),
      executarBackupUploads: jest.fn().mockReturnValue({ job: 'uploads' }),
      executarBackupCompleto: jest.fn().mockReturnValue({ job: 'completo' }),
      executarLimpezaOperacional: jest.fn().mockResolvedValue({ ok: true }),
    };

    const controller = new BackupController(
      mockService as unknown as BackupService,
    );

    expect(controller.status()).toEqual({ ok: true });
    expect(controller.executarPostgres()).toEqual({ job: 'postgres' });
    expect(controller.executarUploads()).toEqual({ job: 'uploads' });
    expect(controller.executarCompleto()).toEqual({ job: 'completo' });
    await expect(controller.executarLimpeza()).resolves.toEqual({ ok: true });

    expect(mockService.getStatus).toHaveBeenCalledTimes(1);
    expect(mockService.executarBackupPostgres).toHaveBeenCalledTimes(1);
    expect(mockService.executarBackupUploads).toHaveBeenCalledTimes(1);
    expect(mockService.executarBackupCompleto).toHaveBeenCalledTimes(1);
    expect(mockService.executarLimpezaOperacional).toHaveBeenCalledTimes(1);
  });
});
