# Beauty Core - Chat B - B09 - Auditoria de seguranca de dependencias

- Inicio: 2026-09-13T11:26:24.5860939-03:00
- Fim: 2026-09-13T11:26:24.7888373-03:00
- Script: B09-v1
- Modo: somente leitura; o relatorio e o unico artefato criado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Escopo

- Executar `npm audit` em backend e frontend, em modo de leitura e sem scripts de instalacao.
- Comparar dependencias de producao e conjunto completo para identificar o escopo real de cada advisory.
- Destacar `js-yaml` se aparecer, sem alterar package.json, package-lock.json ou node_modules.
- Nao executar npm install, npm update, npm audit fix, build, teste, migration ou deploy.

## Baseline

- Branch: `main`
- HEAD curto: `7da9794`
- Git status exit code: 0
- Entradas locais: 35

## Resultado do npm audit

### Backend - conjunto completo
- Diretorio: `beauty-core-backend`
- npm audit exit code: 0
- Vulnerabilidades totais: 0; info 0; low 0; moderate 0; high 0; critical 0
- Pacotes com advisory no retorno: nenhum.

### Backend - producao sem devDependencies
- Diretorio: `beauty-core-backend`
- npm audit exit code: 0
- Vulnerabilidades totais: 0; info 0; low 0; moderate 0; high 0; critical 0
- Pacotes com advisory no retorno: nenhum.

### Frontend - conjunto completo
- Diretorio: `beauty-core-ui`
- npm audit exit code: 0
- Vulnerabilidades totais: 0; info 0; low 0; moderate 0; high 0; critical 0
- Pacotes com advisory no retorno: nenhum.

### Frontend - producao sem devDependencies
- Diretorio: `beauty-core-ui`
- npm audit exit code: 0
- Vulnerabilidades totais: 0; info 0; low 0; moderate 0; high 0; critical 0
- Pacotes com advisory no retorno: nenhum.

## Foco js-yaml

- `beauty-core-backend\package-lock.json`: referencia(s) js-yaml localizada(s): 13
  - linha 1652; versao na linha: `versao nao identificada na mesma linha`
  - linha 2248; versao na linha: `versao nao identificada na mesma linha`
  - linha 2279; versao na linha: `versao nao identificada na mesma linha`
  - linha 2281; versao na linha: `versao nao identificada na mesma linha`
  - linha 2290; versao na linha: `versao nao identificada na mesma linha`
  - linha 3407; versao na linha: `versao nao identificada na mesma linha`
  - linha 3432; versao na linha: `versao nao identificada na mesma linha`
  - linha 3434; versao na linha: `versao nao identificada na mesma linha`
  - linha 3451; versao na linha: `versao nao identificada na mesma linha`
  - linha 6144; versao na linha: `versao nao identificada na mesma linha`
  - linha 8830; versao na linha: `versao nao identificada na mesma linha`
  - linha 8832; versao na linha: `versao nao identificada na mesma linha`
  - linha 8850; versao na linha: `versao nao identificada na mesma linha`
- `beauty-core-ui\package-lock.json`: referencia(s) js-yaml localizada(s): 5
  - linha 1062; versao na linha: `versao nao identificada na mesma linha`
  - linha 6410; versao na linha: `versao nao identificada na mesma linha`
  - linha 9356; versao na linha: `versao nao identificada na mesma linha`
  - linha 9358; versao na linha: `versao nao identificada na mesma linha`
  - linha 9375; versao na linha: `versao nao identificada na mesma linha`

## Decisao para a proxima etapa

- Nenhuma alteracao deve ser aplicada enquanto o pacote afetado, a versao resolvida e a severidade nao estiverem confirmados.
- Se houver advisory high/critical em dependencia de producao, a correcao deve ser seletiva, com diff limitado e validacao do lockfile.
- `npm audit fix` automatico nao sera usado neste fluxo.

## Operacoes nao executadas

- npm install/update/audit fix: nao executados.
- Alteracao de package.json, package-lock.json ou node_modules: nao executada.
- Build, teste, migration, escrita em banco/Redis, Git mutavel, release e deploy: nao executados.
- Segredos e valores de ambiente: nao lidos nem impressos.

## Classificacao final do B09

- `PASS_WITH_ATTENTION` - auditoria de dependencias concluida ou registrada com falhas controladas; a correcao depende dos advisories efetivamente retornados.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B09.
- O script grava somente este relatorio na pasta unica do Chat B e nao altera o projeto.