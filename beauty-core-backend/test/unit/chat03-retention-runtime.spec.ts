import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
  utimesSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import { BackupService } from '../../src/backup/backup.service';

describe('Chat 03 - retencao operacional runtime', () => {
  const originalCwd = process.cwd();
  const originalUploadsDir = process.env.UPLOADS_DIR;
  let tempRoot: string;

  beforeEach(() => {
    tempRoot = mkdtempSync(join(tmpdir(), 'beauty-core-chat03-retention-'));
    process.chdir(tempRoot);
    process.env.UPLOADS_DIR = join(tempRoot, 'uploads');

    const tempDir = join(tempRoot, 'uploads', 'temp');
    mkdirSync(tempDir, { recursive: true });

    const oldFile = join(tempDir, 'old-runtime-proof.tmp');
    const recentFile = join(tempDir, 'recent-runtime-proof.tmp');
    writeFileSync(oldFile, 'old');
    writeFileSync(recentFile, 'recent');

    const oldDate = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
    utimesSync(oldFile, oldDate, oldDate);
  });

  afterEach(() => {
    if (originalUploadsDir === undefined) {
      delete process.env.UPLOADS_DIR;
    } else {
      process.env.UPLOADS_DIR = originalUploadsDir;
    }
    process.chdir(originalCwd);
    rmSync(tempRoot, { recursive: true, force: true });
  });

  it('executa a rotina agendada e aplica as politicas implementadas', async () => {
    const prisma = {
      sessao: {
        deleteMany: jest.fn().mockResolvedValue({ count: 2 }),
      },
      auditoriaSistema: {
        create: jest.fn().mockResolvedValue({ id: 'auditoria-runtime' }),
      },
    };
    const service = new BackupService(prisma as never);

    const result = await service.executarLimpezaOperacionalAgendada();
    const results = result.results as Array<Record<string, unknown>>;
    const sessoes = results.find(
      (item) => item.job === 'limpeza_sessoes_expiradas',
    );
    const uploads = results.find((item) => item.job === 'limpeza_uploads_temp');
    const jobs = results.find((item) => item.job === 'limpeza_jobs_antigos');

    expect(prisma.sessao.deleteMany).toHaveBeenCalledTimes(1);
    expect(sessoes?.status).toBe('SUCESSO');
    expect(sessoes?.deletedCount).toBe(2);
    expect(uploads?.status).toBe('SUCESSO');
    expect(uploads?.removedCount).toBe(1);
    expect(jobs?.status).toBe('SIMULADO');

    expect(
      existsSync(join(tempRoot, 'uploads', 'temp', 'old-runtime-proof.tmp')),
    ).toBe(false);
    expect(
      existsSync(join(tempRoot, 'uploads', 'temp', 'recent-runtime-proof.tmp')),
    ).toBe(true);

    const logPath = join(tempRoot, 'logs', 'backups', 'automation.log');
    expect(existsSync(logPath)).toBe(true);
    expect(readFileSync(logPath, 'utf8')).toContain('LIMPEZA_OPERACIONAL');
  });
});
