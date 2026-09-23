'use strict';

const crypto = require('crypto');
const fs = require('fs');
const fsp = fs.promises;
const os = require('os');
const path = require('path');
const https = require('https');
const { pipeline } = require('stream/promises');
const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');

function loadLocalEnv() {
  const envPath = path.resolve(__dirname, '../../.env');
  if (!fs.existsSync(envPath)) return;
  for (const rawLine of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (process.env[match[1]] === undefined) process.env[match[1]] = value;
  }
}

function required(name) {
  const value = process.env[name];
  if (!value || !value.trim()) throw new Error('Configuracao ausente: ' + name);
  return value.trim();
}

function encryptionKey() {
  const value = Buffer.from(required('BACKUP_ENCRYPTION_KEY'), 'base64');
  if (value.length !== 32) throw new Error('BACKUP_ENCRYPTION_KEY deve representar 32 bytes em base64.');
  return value;
}

async function sha256File(filePath) {
  const hash = crypto.createHash('sha256');
  for await (const chunk of fs.createReadStream(filePath)) hash.update(chunk);
  return hash.digest('hex');
}

async function encryptFile(sourcePath, targetPath, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const output = fs.createWriteStream(targetPath);
  output.write(Buffer.from('BCBK1'));
  output.write(iv);
  await pipeline(fs.createReadStream(sourcePath), cipher, output);
  await fsp.appendFile(targetPath, cipher.getAuthTag());
}

async function decryptFile(sourcePath, targetPath, key) {
  const stat = await fsp.stat(sourcePath);
  if (stat.size < 33) throw new Error('Artefato criptografado invalido.');
  const handle = await fsp.open(sourcePath, 'r');
  try {
    const header = Buffer.alloc(5);
    const iv = Buffer.alloc(12);
    const tag = Buffer.alloc(16);
    await handle.read(header, 0, 5, 0);
    await handle.read(iv, 0, 12, 5);
    await handle.read(tag, 0, 16, stat.size - 16);
    if (header.toString('utf8') !== 'BCBK1') throw new Error('Cabecalho de backup invalido.');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    await pipeline(
      fs.createReadStream(sourcePath, { start: 17, end: stat.size - 17 }),
      decipher,
      fs.createWriteStream(targetPath),
    );
  } finally {
    await handle.close();
  }
}
async function collectRecent(rootPath, cutoff, files) {
  if (!fs.existsSync(rootPath)) return;
  for (const entry of await fsp.readdir(rootPath, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(rootPath, entry.name);
    if (entry.isDirectory()) {
      await collectRecent(fullPath, cutoff, files);
    } else if (!entry.name.endsWith('.sha256') && !entry.name.endsWith('.enc') && !entry.name.endsWith('.json')) {
      const stat = await fsp.stat(fullPath);
      if (stat.mtimeMs >= cutoff) files.push(fullPath);
    }
  }
}

function createClient() {
  return new S3Client({
    region: required('AWS_REGION'),
    endpoint: required('AWS_ENDPOINT'),
    forcePathStyle: /^(1|true|yes)$/i.test(process.env.AWS_FORCE_PATH_STYLE || 'true'),
    credentials: { accessKeyId: required('AWS_ACCESS_KEY_ID'), secretAccessKey: required('AWS_SECRET_ACCESS_KEY') },
  });
}

async function uploadFile(client, bucket, key, filePath, metadata) {
  const stat = await fsp.stat(filePath);
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: fs.createReadStream(filePath),
    ContentLength: stat.size,
    ContentType: 'application/octet-stream',
    Metadata: metadata,
  }));
}

async function deleteExpired(client, bucket, prefix, days) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const keys = [];
  let token;
  do {
    const page = await client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, ContinuationToken: token }));
    for (const item of page.Contents || []) {
      if (item.Key && item.LastModified && item.LastModified.getTime() < cutoff) keys.push({ Key: item.Key });
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  for (let i = 0; i < keys.length; i += 1000) {
    await client.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: keys.slice(i, i + 1000), Quiet: true } }));
  }
  return keys.length;
}

function sendAlert(url, status, data) {
  if (!url) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const body = JSON.stringify({ status, service: 'beauty-core-backup', ...data });
    const request = https.request({
      method: 'POST', hostname: target.hostname, port: target.port || 443,
      path: target.pathname + target.search, protocol: target.protocol,
      headers: { 'content-type': 'application/json', 'content-length': Buffer.byteLength(body) },
    }, response => {
      response.resume();
      response.on('end', () => response.statusCode >= 200 && response.statusCode < 300 ? resolve() : reject(new Error('Alerta HTTP ' + response.statusCode)));
    });
    request.on('error', reject);
    request.end(body);
  });
}

async function main() {
  loadLocalEnv();
  const key = encryptionKey();
  const bucket = required('AWS_BUCKET');
  const prefix = (process.env.BACKUP_R2_PREFIX || 'backups/beauty-core').replace(/\/+$/, '');
  const root = path.resolve(process.env.BACKUP_ROOT_DIR || path.resolve(process.cwd(), 'backups'));
  const minutes = Number(process.env.BACKUP_DISCOVERY_WINDOW_MINUTES || '30');
  const retention = Number(process.env.BACKUP_RETENTION_DAYS || '30');
  if (!Number.isFinite(minutes) || minutes <= 0) throw new Error('BACKUP_DISCOVERY_WINDOW_MINUTES invalido.');
  if (!Number.isFinite(retention) || retention <= 0) throw new Error('BACKUP_RETENTION_DAYS invalido.');
  const files = process.argv.slice(2).map(file => path.resolve(file));
  if (files.length === 0) await collectRecent(root, Date.now() - minutes * 60 * 1000, files);
  if (files.length === 0) throw new Error('Nenhum artefato de backup recente encontrado.');
  for (const file of files) if (!fs.existsSync(file)) throw new Error('Artefato nao encontrado: ' + file);

  const client = createClient();
  const uploaded = [];
  try {
    for (const sourcePath of files) {
      const sourceStat = await fsp.stat(sourcePath);
      const sourceHash = await sha256File(sourcePath);
      const encryptedPath = path.join(os.tmpdir(), 'beauty-core-backup-' + process.pid + '-' + Date.now() + '.enc');
      try {
        await encryptFile(sourcePath, encryptedPath, key);
        const encryptedStat = await fsp.stat(encryptedPath);
        const encryptedHash = await sha256File(encryptedPath);
        const objectKey = prefix + '/' + new Date().toISOString().slice(0, 10) + '/' + path.basename(sourcePath) + '.enc';
        await uploadFile(client, bucket, objectKey, encryptedPath, { encryption: 'aes-256-gcm', checksum: sourceHash });
        await client.send(new PutObjectCommand({
          Bucket: bucket, Key: objectKey + '.manifest.json',
          Body: JSON.stringify({ format: 'beauty-core-backup-v1', sourceName: path.basename(sourcePath), sourceBytes: sourceStat.size, sourceSha256: sourceHash, encryptedBytes: encryptedStat.size, encryptedSha256: encryptedHash, algorithm: 'AES-256-GCM', objectKey, createdAt: new Date().toISOString() }, null, 2),
          ContentType: 'application/json',
        }));
        uploaded.push(objectKey);
      } finally {
        if (fs.existsSync(encryptedPath)) await fsp.unlink(encryptedPath);
      }
    }
    const deleted = await deleteExpired(client, bucket, prefix + '/', retention);
    await sendAlert(process.env.BACKUP_ALERT_WEBHOOK_URL, 'success', { uploaded: uploaded.length, deleted });
    console.log('BACKUP_EXTERNAL_UPLOAD_OK uploaded=' + uploaded.length + ' deleted=' + deleted);
  } catch (error) {
    try { await sendAlert(process.env.BACKUP_ALERT_WEBHOOK_URL, 'failure', { message: error.message }); } catch (_) {}
    throw error;
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('BACKUP_EXTERNAL_UPLOAD_FAILED ' + error.message);
    process.exitCode = 1;
  });
}

module.exports = { encryptFile, decryptFile, sha256File, collectRecent };