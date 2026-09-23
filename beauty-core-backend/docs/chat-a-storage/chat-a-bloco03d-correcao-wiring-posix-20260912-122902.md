# Beauty Core - Chat A - Bloco 03D - Correcao do wiring POSIX

- **Status:** PARTIAL
- **Inicio:** 2026-09-12T12:29:02.5298026-03:00
- **Projeto:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core`
- **Relatorio:** `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-a-storage\chat-a-bloco03d-correcao-wiring-posix-20260912-122902.md`

## Escopo

- Corrigir somente o executor do `BackupService` para shell POSIX.
- Atualizar o teste unitario para refletir `sh` e scripts `.sh`.
- Criar backup recuperavel dos arquivos antes da alteracao.
- Nenhum backup real, restore, migration, instalacao, stage, commit, push ou deploy sera executado.
- Nenhum `.env` sera lido e nenhum segredo sera exibido.

- **PASS** - Backup dos arquivos criticos: Backup criado em `C:\Users\cmted\AppData\Local\Temp\beauty-core-chat-a-bloco03d-backup-20260912-122902`.
- **PASS** - Executor POSIX: BackupService agora usa `execFileSync('sh', [scriptPath])` e nao possui referencia PowerShell/.ps1.
- **PASS** - Teste alinhado: Referencias do teste foram alinhadas ao executor e aos nomes `.sh`.

## Arquivos POSIX requeridos para o proximo gate

- **PASS** - `scripts/backup/postgres-backup.sh` encontrado.
- **PASS** - `scripts/backup/postgres-restore-verify.sh` encontrado.
- **ATTENTION** - `scripts/uploads/uploads-backup.sh` ainda nao foi encontrado.
- **ATTENTION** - `scripts/uploads/uploads-restore.sh` ainda nao foi encontrado.
- **ATTENTION** - `scripts/backup/redis-backup.sh` ainda nao foi encontrado.
- **ATTENTION** - `scripts/backup/redis-restore.sh` ainda nao foi encontrado.
- **ATTENTION** - `scripts/backup/validate-restore.sh` ainda nao foi encontrado.
- Criptografia, destino externo, retencao, alerta e restore descartavel continuam pendentes deste bloco.

## Comandos e resultados

### Teste unitario de backup
ExitCode: 1
```text

> beauty-core-backend@0.0.1 test
> jest --config ./jest.config.js --runInBand --runInBand test/unit/chat36-backup.coverage.spec.ts

FAIL test/unit/chat36-backup.coverage.spec.ts
  Chat 36 Backup Coverage
    ÔêÜ deve retornar status operacional de backup/recovery (4 ms)
    ÔêÜ deve manter execucao simulada quando BACKUP_EXECUTION_ENABLED nao estiver ativo (7 ms)
    ÔêÜ deve executar script real de postgres quando BACKUP_EXECUTION_ENABLED=true (2 ms)
    ├ù deve executar scripts reais de backup completo quando habilitado (1 ms)
    ÔêÜ deve propagar falha de script real quando backup habilitado falhar (4 ms)
    ÔêÜ deve delegar execucoes agendadas para os metodos principais (2 ms)
    ÔêÜ deve executar limpeza operacional com auditoria resiliente (3 ms)
    ÔêÜ deve ignorar falha de auditoria sem quebrar operacao (1 ms)
    ÔêÜ controller deve delegar endpoints para o service (3 ms)
System.Management.Automation.RemoteException
  ÔùÅ Chat 36 Backup Coverage ÔÇ║ deve executar scripts reais de backup completo quando habilitado
System.Management.Automation.RemoteException
    Script de backup nao encontrado: scripts/uploads/uploads-backup.sh
System.Management.Automation.RemoteException
    [0m [90m 298 |[39m
     [90m 299 |[39m     [36mif[39m ([33m![39mexistsSync(scriptPath)) {
    [31m[1m>[22m[39m[90m 300 |[39m       [36mthrow[39m [36mnew[39m [33mError[39m([32m`Script de backup nao encontrado: ${script}`[39m)[33m;[39m
     [90m     |[39m             [31m[1m^[22m[39m
     [90m 301 |[39m     }
     [90m 302 |[39m
     [90m 303 |[39m     [36mtry[39m {[0m
System.Management.Automation.RemoteException
      at BackupService.executarScriptPosix (src/backup/backup.service.ts:300:13)
      at BackupService.executarBackupReal (src/backup/backup.service.ts:278:25)
      at BackupService.registrarOuExecutarBackup (src/backup/backup.service.ts:253:17)
      at BackupService.executarBackupCompleto (src/backup/backup.service.ts:107:17)
      at Object.<anonymous> (test/unit/chat36-backup.coverage.spec.ts:83:28)
System.Management.Automation.RemoteException
Test Suites: 1 failed, 1 total
Tests:       1 failed, 8 passed, 9 total
Snapshots:   0 total
Time:        2.536 s
Ran all test suites matching test/unit/chat36-backup.coverage.spec.ts.
```

### Build do backend
ExitCode: 0
```text

> beauty-core-backend@0.0.1 build
> nest build

```

### Diff check do escopo
ExitCode: 0
```text
```

### Status local preservado
ExitCode: 0
```text
## main...origin/main
 M beauty-core-backend/.env.example
 M beauty-core-backend/package-lock.json
 M beauty-core-backend/package.json
 M beauty-core-backend/prisma/schema.prisma
 M beauty-core-backend/src/backup/backup.service.ts
 M beauty-core-backend/src/modules/arquivos/arquivos.module.ts
 M beauty-core-backend/src/modules/arquivos/storage/storage.factory.ts
 M beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
 M beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
 M beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
 M beauty-core-backend/src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
 M beauty-core-backend/test/unit/chat36-backup.coverage.spec.ts
?? beauty-core-backend/docs/chat-a-bloco00-baseline-20260911-190953.md
?? beauty-core-backend/docs/chat-a-bloco01-reconciliacao-meta-20260911-191539.md
?? beauty-core-backend/docs/chat-a-bloco01-reconciliacao-meta-20260911-192225.md
?? beauty-core-backend/docs/chat-a-meta/
?? beauty-core-backend/docs/chat-a-storage/
?? beauty-core-backend/docs/meta-whatsapp/
?? beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/
?? beauty-core-backend/src/modules/arquivos/storage/providers/s3-storage.service.ts
?? beauty-core-backend/test/integration/
?? beauty-core-backend/test/unit/s3-storage.service.spec.ts
?? beauty-core-ui/public/images/portal/states/source/portal-offline.webp
```

## Proximo gate

Corrigir o resultado indicado acima antes de prosseguir. O backup recuperavel permanece em `C:\Users\cmted\AppData\Local\Temp\beauty-core-chat-a-bloco03d-backup-20260912-122902` quando criado.

- **Termino:** 2026-09-12T12:29:22.0262190-03:00
- **Backup:** `C:\Users\cmted\AppData\Local\Temp\beauty-core-chat-a-bloco03d-backup-20260912-122902`
- **Arquivos alterados:** backup.service.ts, chat36-backup.coverage.spec.ts
- **Status do bloco:** PARTIAL
- Nenhum backup real, restore, migration, stage, commit, push, merge, tag, release ou deploy foi executado.
