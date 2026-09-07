# Incident Response — Beauty Core 1.0

## Objetivo

Definir política de resposta a incidentes técnicos, operacionais e de segurança.

## Classificação

### Incidente de disponibilidade

Afeta acesso à API, autenticação, banco, Redis, filas ou deploy.

### Incidente de segurança

Envolve segredo exposto, acesso indevido, suspeita de vazamento, falha de autorização, IDOR ou comprometimento de dependência.

### Incidente de dados

Envolve perda, corrupção, inconsistência, exclusão indevida, restore ou violação de isolamento multiempresa.

### Incidente operacional

Envolve backup, scheduler, workers, DLQ, observabilidade ou falhas de processo.

## Severidade

| Severidade | Tempo alvo de resposta | Exemplo |
|---|---:|---|
| SEV1 | até 15 minutos | API fora do ar, banco down, secret vazado |
| SEV2 | até 1 hora | Redis down, backup falhando, DLQ crescendo |
| SEV3 | até 4 horas úteis | tenant isolado com falha |
| SEV4 | até 1 dia útil | melhoria preventiva |

## Fluxo

1. Detecção.
2. Classificação.
3. Contenção.
4. Diagnóstico.
5. Correção.
6. Validação.
7. Comunicação.
8. Pós-incidente.

## Evidências mínimas

- horário;
- ambiente;
- versão;
- logs relevantes;
- health checks;
- impacto;
- usuários ou tenants afetados;
- ação tomada;
- responsável.

## Regras para incidentes de segurança

- Nunca publicar segredo em issue, chat ou documentação.
- Revogar antes de investigar profundamente quando houver exposição clara.
- Rotacionar secret e reiniciar serviços dependentes.
- Preservar evidências.
- Avaliar necessidade de invalidar sessões.
- Avaliar impacto LGPD.
- Registrar pós-incidente.

## Regras para incidentes multiempresa

- Nunca executar correção global sem prova de impacto global.
- Confirmar `empresaId` afetado.
- Validar se houve vazamento entre tenants.
- Preservar auditoria.
- Corrigir com menor escopo possível.

## Pós-incidente

O relatório deve conter:

- resumo executivo;
- linha do tempo;
- causa raiz;
- impacto;
- ações de contenção;
- ações corretivas;
- prevenção futura;
- itens de backlog;
- responsável e prazo.

## Critérios de encerramento

Um incidente só pode ser encerrado quando:

- serviço normalizado;
- causa provável identificada;
- evidências preservadas;
- ações corretivas registradas;
- stakeholders comunicados quando aplicável;
- follow-up criado se houver prevenção pendente.

## Recomendação operacional

Todo SEV1 e SEV2 deve gerar atualização posterior nos runbooks, playbooks ou testes automatizados quando a causa raiz revelar uma lacuna operacional.
