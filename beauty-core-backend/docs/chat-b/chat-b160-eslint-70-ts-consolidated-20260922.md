# Beauty Core — coleta ESLint B160

- Data: 2026-09-22
- Baseline comparado: B157.
- Escopo: exclusivamente os arquivos `.ts` ativos sob `test/`; nenhum `.js` ou `.cjs` foi passado ao ESLint.
- Comando: `node --max-old-space-size=6144 node_modules/eslint/bin/eslint.js <lista explícita dos 70 caminhos .ts> --format json --no-cache`.

## Validação da coleta

| Métrica | Resultado |
|---|---:|
| `CANDIDATES` | 70 |
| `RESULTS` | 70 |
| `UNIQUE_PATHS` | 70 |
| `PATH_SETS_EQUAL` | `True` |
| Somente `.ts` | `True` |
| Exit code ESLint | 1, por diagnósticos |

Os caminhos candidatos foram enumerados com `test/**/*.ts`, excluindo `node_modules`, `coverage` e `dist`, e enviados individualmente ao ESLint. A lista não contém extensões `.js` ou `.cjs`.

## Comparação com B157

| Métrica | B157 | B160 | Variação |
|---|---:|---:|---:|
| Erros | 204 | 100 | -104 |
| Avisos | 129 | 92 | -37 |

## Observação

O resultado confirma a coleta correta dos 70 arquivos TypeScript. O relatório anterior B159 foi complementado por esta evidência de cardinalidade e de exclusão explícita de scripts JavaScript/CommonJS.
