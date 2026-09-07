# Manual LGPD — Beauty Core 1.0

## 1. Objetivo
Este documento descreve exportação, anonimização, retenção, dados pessoais, auditoria e compliance LGPD no Beauty Core 1.0.

## 2. Dados Pessoais
A plataforma pode armazenar dados pessoais de clientes finais, usuários administrativos e registros operacionais.

Exemplos: nome, telefone, data de nascimento, histórico de agendamentos, pacotes, mensagens, notificações, fidelidade e registros financeiros associados.

## 3. Exportação
A exportação permite entregar ao titular uma cópia estruturada dos dados pessoais tratados pela plataforma.

Endpoint relacionado: GET /lgpd/exportar-cliente/:clienteId.

Regras: validar autenticação, permissão, empresaId, existência do cliente e registrar auditoria.

## 4. Anonimização
Anonimização remove ou descaracteriza dados pessoais do cliente preservando integridade operacional, financeira e de auditoria.

Endpoint relacionado: POST /lgpd/anonimizar-cliente/:clienteId.

## 5. Retenção
Retenção define por quanto tempo dados são mantidos antes de eliminação, anonimização ou arquivamento.

A política deve considerar obrigações legais, financeiras, fiscais, antifraude, contratuais e operacionais.

## 6. Auditoria
Operações LGPD devem ser auditadas com empresaId, usuário, ação, recurso, data, status e mensagem.

A auditoria não deve registrar dados sensíveis desnecessários.

## 7. Segurança
Exportação e anonimização exigem autenticação JWT Admin, role adequada e Tenant Validation.

SUPER_ADMIN pode operar globalmente quando permitido. ADMIN deve ficar restrito à própria empresa.

## 8. Multiempresa
Nenhuma operação LGPD pode exportar ou anonimizar dados de cliente pertencente a outra empresa para um ADMIN comum.

## 9. Compliance
A plataforma oferece mecanismos técnicos para apoiar compliance, mas a operação final depende de política jurídica, termos de uso, política de privacidade e processos internos do controlador.

## 10. Checklist LGPD
- Exportação implementada.
- Anonimização implementada.
- Tenant validation aplicado.
- Auditoria aplicada.
- Retenção documentada.
- Dados sensíveis protegidos.
- Backups considerados na política.
- Operação alinhada com política de privacidade.

## 11. Conclusão
A camada LGPD do Beauty Core 1.0 fortalece governança, confiança e preparo comercial para clientes profissionais.

## LGPD expandida - Chat 39

A exportacao LGPD inclui perfil do cliente, agendamentos, fidelidade, pacotes, financeiro, arquivos, notificacoes, mensagens WhatsApp e sessoes quando os modelos existirem.

A exportacao remove segredos tecnicos como senha, password, refreshToken, refreshTokenHash, token, accessToken, codigo, codigoHash, codigoAcesso, otp, secret, clientSecret, apiKey e authorization.

A anonimizacao remove ou descaracteriza identificadores pessoais diretos do cliente quando presentes no modelo: nome, telefone, email, cpf, documento, dataNascimento, endereco, logradouro, numero, bairro, cidade, cep, complemento, observacoes, whatsapp, fotoUrl e avatarUrl.

Codigos de acesso de cliente tambem sao invalidados: telefone anonimizado, codigo HASHED, codigoHash nulo e usado=true.

A anonimizacao preserva movimentacoes financeiras, vinculos operacionais e auditoria historica para manter integridade fiscal, antifraude, suporte e rastreabilidade.
