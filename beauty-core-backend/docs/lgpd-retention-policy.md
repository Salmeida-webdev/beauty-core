# Beauty Core 1.0 — Política de Retenção LGPD

## Objetivo

Definir retenção, exportação, anonimização e limpeza de dados pessoais no Beauty Core 1.0.

## Dados pessoais

| Entidade | Dados pessoais |
|---|---|
| Cliente | nome, telefone, email, data de nascimento |
| Usuario | nome, email, telefone, role |
| Sessao | IP, userAgent, dispositivo e refresh token hash |
| Arquivo | nome, caminho, metadados e vínculo com cliente/empresa |
| AuditoriaSistema | IP, userAgent, usuário, cliente, rota e ação |

## Dados potencialmente sensíveis

Uploads privados podem conter documentos e informações sensíveis enviados por empresas ou clientes.

## Retenção inicial recomendada

| Dado | Retenção |
|---|---:|
| AuditoriaSistema | 5 anos |
| Sessões expiradas/revogadas | 90 dias |
| Logs de aplicação | 30 a 90 dias |
| Logs de backup | 1 ano |
| Uploads temporários | 24h a 7 dias |
| Jobs concluídos | 7 a 30 dias |
| Jobs falhos/DLQ | 30 a 90 dias |
| Notificações | 1 a 2 anos |
| Mensagens WhatsApp | 1 a 2 anos |
| Financeiro | Conforme necessidade legal/contratual |

## Exportação LGPD

A exportação de cliente deve incluir:

- perfil;
- agendamentos;
- pontos/fidelidade;
- pacotes;
- notificações;
- mensagens WhatsApp.

## Anonimização LGPD

A anonimização deve substituir identificadores diretos:

- nome;
- telefone;
- email.

A anonimização não deve excluir movimentações financeiras nem auditoria histórica.

---

## Scheduler de Backup e Retenção — Chat 36

| Rotina | Cron | Comportamento |
|---|---:|---|
| backup_postgres_diario | 0 2 * * * | Simulado por padrão |
| backup_uploads_diario | 30 2 * * * | Simulado por padrão |
| backup_semanal_completo | 0 3 * * 0 | Simulado por padrão |
| limpeza_operacional | 0 4 * * * | Executa limpeza de sessões, uploads temporários e retenção de jobs em modo seguro |

Backups continuam em modo seguro até habilitar explicitamente BACKUP_EXECUTION_ENABLED=true.

## LGPD expandida - Chat 39

A exportacao LGPD inclui perfil do cliente, agendamentos, fidelidade, pacotes, financeiro, arquivos, notificacoes, mensagens WhatsApp e sessoes quando os modelos existirem.

A exportacao remove segredos tecnicos como senha, password, refreshToken, refreshTokenHash, token, accessToken, codigo, codigoHash, codigoAcesso, otp, secret, clientSecret, apiKey e authorization.

A anonimizacao remove ou descaracteriza identificadores pessoais diretos do cliente quando presentes no modelo: nome, telefone, email, cpf, documento, dataNascimento, endereco, logradouro, numero, bairro, cidade, cep, complemento, observacoes, whatsapp, fotoUrl e avatarUrl.

Codigos de acesso de cliente tambem sao invalidados: telefone anonimizado, codigo HASHED, codigoHash nulo e usado=true.

A anonimizacao preserva movimentacoes financeiras, vinculos operacionais e auditoria historica para manter integridade fiscal, antifraude, suporte e rastreabilidade.
