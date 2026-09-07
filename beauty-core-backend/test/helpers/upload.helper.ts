import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export function createTempUploadFile(params?: {
  filename?: string;
  content?: string | Buffer;
}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'beauty-core-upload-'));
  const filePath = path.join(dir, params?.filename ?? 'documento-teste.pdf');

  fs.writeFileSync(
    filePath,
    params?.content ?? Buffer.from('%PDF-1.4\n% Beauty Core test PDF\n')
  );

  return {
    dir,
    filePath,
    cleanup: () => fs.rmSync(dir, { recursive: true, force: true })
  };
}

export function createBlockedTempFile() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'beauty-core-blocked-'));
  const filePath = path.join(dir, 'malware-teste.exe');

  fs.writeFileSync(filePath, Buffer.from('blocked'));

  return {
    dir,
    filePath,
    cleanup: () => fs.rmSync(dir, { recursive: true, force: true })
  };
}


