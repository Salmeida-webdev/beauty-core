# Manual de Segurança — Beauty Core 1.0

## 1. Objetivo

Este documento consolida a estratégia de segurança do Beauty Core 1.0, incluindo JWT, refresh token, sessões, rate limit, uploads privados, roles, tenant validation, auditoria, LGPD, hardening e boas práticas operacionais.

A segurança da plataforma foi pensada para operação SaaS real, com múltiplas empresas, dados sensíveis, arquivos privados, usuários administrativos, clientes finais e rotinas automáticas.

---

## 2. Princípios de Segurança

- Menor privilégio.
- Isolamento por tenant.
- Autenticação forte.
- Autorização por perfil.
- Revalidação de sessão.
- Auditoria de ações sensíveis.
- Proteção contra IDOR.
- Validação rigorosa de entrada.
- Não exposição de segredos.
- Não exposição de arquivos privados.
- Observabilidade para detecção de falhas.
- Rotinas de backup e recuperação.

---

## 3. JWT

A plataforma usa JWT para autenticação de usuários administrativos e clientes finais.

Tipos principais:

- JWT Admin.
- JWT Cliente.
- Refresh Token Admin.
- Refresh Token Cliente.

Claims esperadas:

- sub.
- role.
- empresaId.
- sid.
- contexto do usuário ou cliente.

Regras:

- Access token deve ter duração limitada.
- Refresh token deve ser armazenado somente como hash.
- Token deve carregar sid para validação de sessão.
- Strategy deve revalidar usuário ou cliente no banco.
- Usuário inativo, cliente inválido ou sessão revogada não devem autenticar.

---

## 4. Refresh Token

Refresh token permite renovar o acesso sem exigir novo login a cada expiração curta do access token.

Boas práticas adotadas:

- Hash seguro do refresh token.
- Rotação a cada uso.
- Revogação no logout.
- Revogação global.
- Expiração da sessão.
- Registro de IP, dispositivo e user-agent.
- Auditoria de operações sensíveis.

Fluxo conceitual:

Refresh token -> valida sessão -> compara hash -> rotaciona token -> atualiza sessão -> retorna novos tokens.

---

## 5. Sessões

A plataforma mantém sessões para usuários administrativos e clientes finais.

Dados de sessão:

- empresaId.
- usuarioId ou clienteId.
- refreshTokenHash.
- dados de dispositivo.
- IP.
- user-agent.
- última atividade.
- data de expiração.
- status de revogação.

Operações suportadas:

- Criar sessão.
- Validar sessão.
- Rotacionar refresh token.
- Listar sessões.
- Revogar sessão individual.
- Logout atual.
- Logout global.
- Limpeza de sessões expiradas ou revogadas.

---

## 6. Rate Limit

Rate limit reduz abuso em endpoints sensíveis.

Áreas críticas:

- Login administrativo.
- Solicitação de OTP do cliente.
- Verificação de OTP.
- Refresh token.
- Uploads.
- Rotas públicas.
- Operações repetitivas de campanha.

Recomendações:

- Aplicar limites mais rígidos em login e OTP.
- Auditar tentativas suspeitas.
- Não retornar detalhes que facilitem enumeração.
- Considerar bloqueio progressivo em evolução futura.

---

## 7. Roles

Perfis principais:

- SUPER_ADMIN: controle global explícito.
- ADMIN: controle máximo dentro da empresa.
- GERENTE: gestão operacional conforme política.
- RECEPCAO: operação de agenda e atendimento.
- PROFISSIONAL: operação vinculada a serviços e agenda.
- CLIENTE: portal cliente.

A política de roles deve impedir:

- Escalada de privilégio.
- ADMIN criando SUPER_ADMIN.
- Usuário comum acessando outra empresa.
- Cliente acessando endpoints administrativos.
- SUPER_ADMIN sendo aplicado implicitamente sem regra explícita.

---

## 8. Tenant Validation

Tenant Validation é uma camada crítica de segurança.

Deve proteger:

- Leitura.
- Criação.
- Atualização.
- Exclusão.
- Downloads.
- Relatórios.
- Jobs.
- Operações financeiras.
- Pacotes.
- Sessões.
- Mensagens.
- Campanhas.

Toda operação tenant-aware deve confirmar que o recurso pertence à empresa do contexto autenticado.

---

## 9. Uploads Privados

Uploads privados devem ser protegidos em todas as fases.

Regras:

- Autenticação obrigatória.
- Validação de MIME.
- Validação de tamanho.
- Checksum.
- Storage separado por empresa.
- URL direta nula para arquivo privado.
- Download protegido.
- URL assinada com expiração.
- Auditoria quando necessário.

Diretórios privados não devem ser expostos publicamente.

---

## 10. Auditoria

A auditoria registra ações relevantes para rastreabilidade técnica, operacional e jurídica.

Eventos recomendados:

- Login.
- Logout.
- Refresh token.
- Criação, edição e exclusão de registros.
- Operações financeiras.
- Downloads privados.
- Exportação LGPD.
- Anonimização LGPD.
- Backup.
- Restore.
- DLQ.
- Reprocessamento.
- Scheduler manual.
- Falhas de acesso.

Dados sensíveis devem ser sanitizados antes de persistir auditoria.

---

## 11. LGPD

A plataforma contempla requisitos operacionais de LGPD.

Recursos:

- Exportação de dados pessoais.
- Anonimização de cliente.
- Política de retenção.
- Auditoria de operações.
- Proteção contra exposição indevida.
- Remoção de segredos técnicos.
- Preservação de integridade financeira e operacional.

LGPD não deve ser tratada como exclusão simples. A anonimização precisa preservar obrigações legais, financeiras, antifraude e de auditoria.

---

## 12. Hardening

Checklist de hardening:

- .env fora do Git.
- .env.example sem segredos reais.
- JWT secrets fortes.
- Redis com senha.
- PostgreSQL com senha forte.
- CORS controlado.
- ValidationPipe global.
- Throttler ativo.
- Docker com usuário não-root.
- Upload privado não exposto.
- Logs sem tokens e senhas.
- CI bloqueando falhas.
- Backup testado.
- Smoke tests no deploy.
- Health checks ativos.

---

## 13. Segurança em Docker

Recomendações:

- Rodar container como usuário não-root.
- Não copiar .env para a imagem.
- Usar secrets no ambiente.
- Não expor PostgreSQL publicamente.
- Não expor Redis publicamente.
- Usar volumes persistentes protegidos.
- Monitorar logs.
- Construir imagem com dependências mínimas.

---

## 14. Segurança Operacional

Rotinas recomendadas:

- Revisar logs.
- Revisar auditoria.
- Monitorar falhas de login.
- Monitorar filas.
- Monitorar health checks.
- Testar restore.
- Rotacionar secrets periodicamente.
- Revisar usuários administrativos.
- Remover sessões antigas.

---

## 15. Resposta a Incidentes

Em caso de incidente:

1. Identificar escopo.
2. Preservar logs.
3. Revogar sessões suspeitas.
4. Rotacionar secrets se necessário.
5. Isolar tenant afetado.
6. Validar backup.
7. Corrigir vulnerabilidade.
8. Documentar incidente.
9. Comunicar responsáveis conforme obrigação legal ou contratual.

---

## 16. Conclusão

A segurança do Beauty Core 1.0 foi desenhada para operação SaaS real, combinando autenticação, autorização, isolamento multiempresa, sessões, auditoria, LGPD, uploads privados, hardening e monitoramento.
