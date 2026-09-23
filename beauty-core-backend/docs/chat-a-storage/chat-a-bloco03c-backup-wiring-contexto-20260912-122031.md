# Beauty Core - Chat A - Bloco 03C - Contexto do wiring de backup

- **Status:** PASS_WITH_ATTENTION
- **Inicio:** 2026-09-12T12:20:31.0035108-03:00
- **Projeto:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Relatorio:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-a-storage\chat-a-bloco03c-backup-wiring-contexto-20260912-122031.md`

## Escopo e seguranca

- Captura contextual somente para preparar a correcao do wiring Linux.
- Nenhum arquivo de codigo foi alterado.
- Nenhum backup, restore, migration, instalacao, stage, commit, push ou deploy foi executado.
- Nenhum arquivo `.env` foi lido; valores de segredos encontrados em codigo serao mascarados.

## Marcadores encontrados no BackupService

- Arquivo: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\backup\backup.service.ts`
- Linhas com PowerShell/.ps1/child_process: 17

- Linha 3
- Linha 78
- Linha 79
- Linha 80
- Linha 81
- Linha 82
- Linha 83
- Linha 84
- Linha 278
- Linha 296
- Linha 304
- Linha 305
- Linha 353
- Linha 357
- Linha 361
- Linha 362
- Linha 363

## Contexto sanitizado do BackupService

```text
1: import { Injectable, Optional } from '@nestjs/common';
2: import { Cron } from '@nestjs/schedule';
3: import { execFileSync } from 'child_process';
4: import {
5:   appendFileSync,
6:   existsSync,
7:   mkdirSync,
8:   readdirSync,
75:         logs: this.pathStatus('logs/backups'),
76:       },
77:       scripts: {
78:         postgresBackup: this.pathStatus('scripts/backup/postgres-backup.ps1'),
79:         postgresRestore: this.pathStatus('scripts/backup/postgres-restore.ps1'),
80:         uploadsBackup: this.pathStatus('scripts/uploads/uploads-backup.ps1'),
81:         uploadsRestore: this.pathStatus('scripts/uploads/uploads-restore.ps1'),
82:         redisBackup: this.pathStatus('scripts/backup/redis-backup.ps1'),
83:         redisRestore: this.pathStatus('scripts/backup/redis-restore.ps1'),
84:         validateRestore: this.pathStatus('scripts/backup/validate-restore.ps1'),
85:       },
86:       scheduler: {
87:         backupPostgresDiario: '0 2 * * *',
88:         backupUploadsDiario: '30 2 * * *',
89:         backupSemanalCompleto: '0 3 * * 0',
275:     const results: BackupScriptResult[] = [];
276: 
277:     for (const script of scripts) {
278:       results.push(this.executarScriptPowerShell(script));
279:     }
280: 
281:     const payload = {
282:       job,
283:       status: 'SUCESSO',
293:     return payload;
294:   }
295: 
296:   private executarScriptPowerShell(script: string): BackupScriptResult {
297:     const scriptPath = resolve(this.projectRoot, script);
298: 
299:     if (!existsSync(scriptPath)) {
300:       throw new Error(`Script de backup nao encontrado: ${script}`);
301:     }
302: 
303:     try {
304:       const output = execFileSync(
305:         'powershell',
306:         ['-ExecutionPolicy', 'Bypass', '-File', scriptPath],
307:         {
308:           cwd: this.projectRoot,
309:           encoding: 'utf8',
310:           stdio: ['ignore', 'pipe', 'pipe'],
350: 
351:   private scriptsForJob(job: BackupJobName) {
352:     if (job === 'backup_postgres_diario') {
353:       return ['scripts/backup/postgres-backup.ps1'];
354:     }
355: 
356:     if (job === 'backup_uploads_diario') {
357:       return ['scripts/uploads/uploads-backup.ps1'];
358:     }
359: 
360:     return [
361:       'scripts/backup/postgres-backup.ps1',
362:       'scripts/uploads/uploads-backup.ps1',
363:       'scripts/backup/redis-backup.ps1',
364:     ];
365:   }
366: 
367:   private async registrarAuditoria(
368:     acao: string,
```

## Testes que precisam ser ajustados junto com o wiring

- Teste: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\chat36-backup.coverage.spec.ts`
- Linhas relacionadas ao executor/script: 23
- Linhas: 1, 8, 17, 18, 36, 38, 52, 63, 66, 67, 68, 75, 76, 79, 80, 81, 88, 91, 93, 94, 97, 98, 99

## Scripts POSIX que serao considerados na proxima correcao

- **PASS** - Backup POSIX encontrado: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\scripts\backup\postgres-backup.sh`
- pg_dump: presente
- checksum: presente
- **PASS** - Restore POSIX encontrado: `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\scripts\backup\postgres-restore-verify.sh`
- pg_restore/psql: presente
- verificacao de checksum: ausente

## Decisao tecnica para o proximo bloco

- Substituir o executor PowerShell por executor POSIX explicito e testavel.
- Manter `BACKUP_EXECUTION_ENABLED` como chave de seguranca para nao executar backup real por acidente.
- Atualizar os testes unitarios para simular o executor POSIX e validar argumentos sem credenciais.
- Nao ativar backup real antes de adicionar criptografia, destino externo, retencao, alerta e restore descartavel.

- **Termino:** 2026-09-12T12:20:31.1024506-03:00
- **Status do bloco:** PASS_WITH_ATTENTION
