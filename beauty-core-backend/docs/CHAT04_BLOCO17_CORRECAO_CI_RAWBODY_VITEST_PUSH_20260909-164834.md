# Chat 04 - Bloco 17 - Correcao CI rawBody e Vitest
Data da execucao: 2026-09-09 16:48:34 -03:00

Correcao autorizada somente para os quatro caminhos definidos; alteracoes locais nao autorizadas permanecem preservadas.
## Preflight
- Branch: `main`
- HEAD antes: `cce9e47c268c79ffd01edbc7502556f5eb413422`
- origin/main antes: `cce9e47c268c79ffd01edbc7502556f5eb413422`
- Alteracoes preservadas antes: 280
- Tracked modificados antes: 260
- Tracked preservados fora da autorizacao: 256
- Untracked antes: 20
- Staged antes: 0
- git diff --check: 0
- git diff --cached --check: 0
- Untracked preservados (nao serao staged):
  - beauty-core-backend/docs/CHAT04_BLOCO17_CORRECAO_CI_RAWBODY_VITEST_PUSH_20260909-163319.md
  - beauty-core-backend/docs/CHAT04_BLOCO14_DIAGNOSTICO_LINT_GLOBAL_LEGADO_20260909-160903.md
  - beauty-core-backend/docs/CHAT04_BLOCO06_TRIAGEM_SEGREDOS_COMMIT_20260909-144044.md
  - beauty-core-backend/docs/CHAT04_BLOCO05_PREFLIGHT_SINCRONIZACAO_20260909-143527.md
  - beauty-core-backend/docs/CHAT04_BLOCO11_CORRECAO_PRISMA_PUSH_20260909-154755.md
  - beauty-core-backend/docs/CHAT04_BLOCO03_AUDITORIA_SEMANTICA_HIGH_20260909-142130.md
  - beauty-core-backend/docs/CHAT04_BLOCO07_REVISAO_ESCOPO_CI_20260909-144442.md
  - beauty-core-backend/docs/CHAT04_BLOCO12_DIAGNOSTICO_MULTER_20260909-155402.md
  - beauty-core-backend/docs/CHAT04_BLOCO05_PREFLIGHT_SINCRONIZACAO_20260909-143339.md
  - beauty-core-backend/docs/CHAT04_BLOCO15_CORRECAO_BOM_JSYAML_PUSH_20260909-161419.md
  - beauty-core-backend/docs/CHAT04_BLOCO01_BASELINE_FINAL_20260909-135604.md
  - beauty-core-backend/docs/CHAT04_BLOCO09_DIAGNOSTICO_CI_PRISMA_20260909-153326.md
  - beauty-core-backend/docs/CHAT04_BLOCO13_CORRECAO_MULTER_PUSH_20260909-155854.md
  - beauty-core-backend/docs/CHAT04_BLOCO02_RECONCILIACAO_261_CAMINHOS_20260909-135948.md
  - beauty-core-backend/docs/CHAT04_BLOCO04_REVISAO_ESCOPO_SEGREDOS_20260909-142636.md
  - beauty-core-backend/docs/CHAT04_BLOCO16_DIAGNOSTICO_CI_POS_CORRECOES_20260909-162801.md
  - beauty-core-backend/docs/CHAT04_BLOCO17_CORRECAO_CI_RAWBODY_VITEST_PUSH_20260909-163601.md
  - beauty-core-backend/docs/CHAT04_BLOCO04_REVISAO_ESCOPO_SEGREDOS_20260909-143016.md
  - beauty-core-backend/docs/CHAT04_BLOCO17_CORRECAO_CI_RAWBODY_VITEST_PUSH_20260909-163757.md
  - beauty-core-backend/docs/CHAT04_BLOCO10_VALIDACAO_CANDIDATOS_PRISMA_20260909-153700.md
## Contrato backend
- main.ts habilita rawBody: True
- setup-e2e configura rawBody: True
- controller consome request.rawBody: True
- package.json ja estava fixado em Vitest 4.1.11; instalacao seletiva pulada.
- Vitest declarado apos atualizacao: `4.1.11`
- @vitest/coverage-v8 declarado apos atualizacao: `4.1.11`
### Reinstalacao limpa das dependencias frontend
- Exit code: 1
- Comando: `C:\WINDOWS\system32\cmd.exe /d /c ""C:\Program Files\nodejs\npm.cmd" ci --ignore-scripts --no-audit"`
```text
npm error code EUSAGE
npm error
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
npm error
npm error Missing: @testing-library/dom@10.4.1 from lock file
npm error Missing: @types/aria-query@5.0.4 from lock file
npm error Missing: aria-query@5.3.0 from lock file
npm error Missing: dom-accessibility-api@0.5.16 from lock file
npm error Missing: lz-string@1.5.0 from lock file
npm error Missing: pretty-format@27.5.1 from lock file
npm error Missing: ansi-styles@5.2.0 from lock file
npm error Missing: react-is@17.0.2 from lock file
npm error Missing: dequal@2.0.3 from lock file
npm error
npm error Clean install a project
npm error
npm error Usage:
npm error npm ci
npm error
npm error Options:
npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
npm error [--no-bin-links] [--no-fund] [--dry-run]
npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
npm error
npm error aliases: clean-install, ic, install-clean, isntall-clean
npm error
npm error Run "npm help ci" for more info
npm error A complete log of this run can be found in: C:\Users\cmted\AppData\Local\npm-cache\_logs\2026-09-09T19_48_35_774Z-debug-0.log
```

## Resultado: **NO-GO-CI-CORRECTION**
- Erro: Reinstalacao limpa das dependencias frontend falhou (exit code 1).
npm error code EUSAGE
npm error
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
npm error
npm error Missing: @testing-library/dom@10.4.1 from lock file
npm error Missing: @types/aria-query@5.0.4 from lock file
npm error Missing: aria-query@5.3.0 from lock file
npm error Missing: dom-accessibility-api@0.5.16 from lock file
npm error Missing: lz-string@1.5.0 from lock file
npm error Missing: pretty-format@27.5.1 from lock file
npm error Missing: ansi-styles@5.2.0 from lock file
npm error Missing: react-is@17.0.2 from lock file
npm error Missing: dequal@2.0.3 from lock file
npm error
npm error Clean install a project
npm error
npm error Usage:
npm error npm ci
npm error
npm error Options:
npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
npm error [--no-bin-links] [--no-fund] [--dry-run]
npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
npm error
npm error aliases: clean-install, ic, install-clean, isntall-clean
npm error
npm error Run "npm help ci" for more info
npm error A complete log of this run can be found in: C:\Users\cmted\AppData\Local\npm-cache\_logs\2026-09-09T19_48_35_774Z-debug-0.log
- O fluxo foi interrompido; nenhuma operacao posterior foi executada.
