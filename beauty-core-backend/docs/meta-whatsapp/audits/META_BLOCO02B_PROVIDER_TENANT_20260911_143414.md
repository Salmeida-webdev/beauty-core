# Beauty Core - Meta WhatsApp - Bloco 02B - Provider tenant-aware

- O provider agora aceita phoneNumberId por conexao/tenant.
- O fallback global permanece somente para compatibilidade legada/testes.
- Token continua vindo de META_WHATSAPP_ACCESS_TOKEN; nenhum segredo foi exibido.
- Backup criado antes da escrita.
- npm run build: `1`
```text

> beauty-core-backend@0.0.1 build
> nest build

[96msrc/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts[0m:[93m124[0m:[93m18[0m - [91merror[0m[90m TS1135: [0mArgument expression expected.
System.Management.Automation.RemoteException
[7m124[0m         mensagem,,
[7m   [0m [91m                 ~[0m
System.Management.Automation.RemoteException
Found 1 error(s).

```
- Testes Meta direcionados: `1`
```text

> beauty-core-backend@0.0.1 test
> jest --config ./jest.config.js --runInBand test/unit/meta-whatsapp-cloud.provider.spec.ts test/unit/meta-whatsapp-cloud-provider-retry.spec.ts test/unit/meta-whatsapp-worker-flow.spec.ts

FAIL test/unit/meta-whatsapp-worker-flow.spec.ts
  ÔùÅ Test suite failed to run
System.Management.Automation.RemoteException
    [96msrc/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts[0m:[93m124[0m:[93m18[0m - [91merror[0m[90m TS1135: [0mArgument expression expected.
System.Management.Automation.RemoteException
    [7m124[0m         mensagem,,
    [7m   [0m [91m                 ~[0m
System.Management.Automation.RemoteException
PASS test/unit/meta-whatsapp-cloud.provider.spec.ts
PASS test/unit/meta-whatsapp-cloud-provider-retry.spec.ts
System.Management.Automation.RemoteException
Test Suites: 1 failed, 2 passed, 3 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        6.497 s
Ran all test suites matching test/unit/meta-whatsapp-cloud.provider.spec.ts|test/unit/meta-whatsapp-cloud-provider-retry.spec.ts|test/unit/meta-whatsapp-worker-flow.spec.ts.
```
- Stage, commit, push, deploy e envio Meta real: NAO EXECUTADOS.
- Status: `BLOCKED`