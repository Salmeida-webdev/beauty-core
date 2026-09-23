# Beauty Core - Chat B - B140 - Diagnostico crash ESLint

- Inicio: 2026-09-15T15:45:56.2499088-03:00
- Fim: 2026-09-15T15:45:57.9369333-03:00
- Script: B140-terminal-v1
- Modo: somente leitura; nenhum arquivo foi alterado.

## Ambiente

### Node

```text
v22.17.1
```

### NPM

```text
10.9.2
```

## ESLint global

- Exit code: 2
- NODE_OPTIONS usado: --max-old-space-size=4096
```text

> beauty-core-backend@0.0.1 lint
> eslint "{src,apps,libs,test}/**/*.ts" --fix compact

System.Management.Automation.RemoteException
Oops! Something went wrong! :(
System.Management.Automation.RemoteException
ESLint: 9.39.4
System.Management.Automation.RemoteException
No files matching the pattern "compact" were found.
Please check for typing mistakes in the pattern.
System.Management.Automation.RemoteException
```

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Nenhum --fix, Jest, build, E2E, migration, workflow ou operacao Git foi executado.

Status: BLOCKED
