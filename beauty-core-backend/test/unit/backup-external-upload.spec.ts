import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

type BackupExternalUploadHelper = {
  encryptFile: (
    sourcePath: string,
    targetPath: string,
    key: Buffer,
  ) => Promise<void>;
  decryptFile: (
    sourcePath: string,
    targetPath: string,
    key: Buffer,
  ) => Promise<void>;
  sha256File: (filePath: string) => Promise<string>;
  collectRecent: (
    rootPath: string,
    cutoff: number,
    files: string[],
  ) => Promise<void>;
};

const fsp = fs.promises;
import helperModule from '../../scripts/backup/backup-external-upload.js';

const helper = helperModule as BackupExternalUploadHelper;

describe('backup external uploader local crypto', () => {
  let tempDirectory: string;

  beforeEach(async () => {
    tempDirectory = await fsp.mkdtemp(
      path.join(os.tmpdir(), 'beauty-core-backup-test-'),
    );
  });

  afterEach(async () => {
    await fsp.rm(tempDirectory, { recursive: true, force: true });
  });

  it('faz round-trip AES-256-GCM e preserva SHA-256', async () => {
    const sourcePath = path.join(tempDirectory, 'database.dump');
    const encryptedPath = path.join(tempDirectory, 'database.dump.enc');
    const restoredPath = path.join(tempDirectory, 'database.restore.dump');
    const content = Buffer.from(
      'Beauty Core backup local sem dados sensiveis.',
    );
    const key = crypto.randomBytes(32);

    await fsp.writeFile(sourcePath, content);
    await helper.encryptFile(sourcePath, encryptedPath, key);
    await helper.decryptFile(encryptedPath, restoredPath, key);

    expect((await fsp.readFile(restoredPath)).equals(content)).toBe(true);
    expect(await helper.sha256File(sourcePath)).toBe(
      await helper.sha256File(restoredPath),
    );
    expect((await fsp.readFile(encryptedPath)).subarray(0, 5).toString()).toBe(
      'BCBK1',
    );
  });

  it('descobre somente artefatos recentes elegiveis', async () => {
    const candidatePath = path.join(tempDirectory, 'database.sql.gz');
    await fsp.writeFile(candidatePath, 'candidate');
    await fsp.writeFile(candidatePath + '.sha256', 'checksum');
    await fsp.writeFile(path.join(tempDirectory, 'ignored.enc'), 'ignored');
    await fsp.writeFile(path.join(tempDirectory, 'ignored.json'), 'ignored');

    const files: string[] = [];
    await helper.collectRecent(tempDirectory, Date.now() - 60000, files);

    expect(files).toContain(candidatePath);
    expect(files.some((file) => file.endsWith('.sha256'))).toBe(false);
    expect(files.some((file) => file.endsWith('.enc'))).toBe(false);
    expect(files.some((file) => file.endsWith('.json'))).toBe(false);
  });
});
