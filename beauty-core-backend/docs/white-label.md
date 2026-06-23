# White Label Guide — Beauty Core 1.0

## 1. Objetivo
Este documento descreve como o Beauty Core 1.0 pode ser operado como plataforma white-label, incluindo branding, domínios, slugs, personalização, temas, logos, clientes e escalabilidade.

## 2. Conceito White-label
White-label significa entregar a mesma base tecnológica com identidade visual, domínio, comunicação e configurações adaptadas para cada cliente.

O cliente final percebe a solução como uma plataforma própria da empresa contratante.

## 3. Branding
Elementos personalizáveis:
- Nome comercial.
- Logo.
- Cores.
- Tom de comunicação.
- Imagens.
- Domínio.
- Portal cliente.
- Mensagens e campanhas.

## 4. Domínios
Cada cliente pode usar domínio próprio ou subdomínio.

Exemplos: app.cliente.com.br, portal.cliente.com.br ou cliente.beautycore.com.br.

Domínio deve apontar para a infraestrutura correta e preservar HTTPS.

## 5. Slugs
Slug identifica publicamente uma empresa em rotas públicas.

Usos: portal público, autenticação cliente, configuração de tema e contexto de tenant.

## 6. Personalização
Personalização pode envolver identidade visual, textos, módulos habilitados, regras de fidelidade, pacotes, serviços, campanhas e configurações operacionais.

A personalização deve preservar a API central e o isolamento por empresa.

## 7. Temas
Temas futuros podem controlar cores, fontes, logos, banners, ícones e componentes visuais.

O backend deve armazenar configurações públicas de tema por empresa quando a camada frontend estiver ativa.

## 8. Logos e Imagens
Logos, banners e imagens podem ser armazenados via módulo de arquivos, respeitando visibilidade pública ou privada.

Arquivos privados não devem ser usados diretamente como assets públicos.

## 9. Clientes
Cada empresa possui seus próprios clientes finais, dados, pacotes, agendamentos, mensagens e histórico.

A experiência do cliente deve sempre respeitar tenant, slug, domínio e identidade visual.

## 10. Escalabilidade
A base white-label deve permitir adicionar novas empresas sem duplicar código.

Escalabilidade exige banco bem indexado, filas, Redis, storage, observabilidade, backup e CI/CD.

## 11. Checklist White-label
- Empresa cadastrada.
- Slug definido.
- Domínio configurado.
- Logo definido.
- Cores definidas.
- Serviços cadastrados.
- Regras de fidelidade configuradas.
- Portal cliente validado.
- Autenticação pública testada.
- Backup incluído.
- Monitoramento incluído.

## 12. Conclusão
O modelo white-label do Beauty Core 1.0 permite vender soluções personalizadas e recorrentes com base técnica única, escalável e profissional.
