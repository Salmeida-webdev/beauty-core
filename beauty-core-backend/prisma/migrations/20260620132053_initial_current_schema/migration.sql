-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL', 'CLIENTE');

-- CreateEnum
CREATE TYPE "StatusAgendamento" AS ENUM ('PENDENTE', 'CONFIRMADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO', 'FALTOU');

-- CreateEnum
CREATE TYPE "PlanoEmpresa" AS ENUM ('STARTER', 'PRO', 'PREMIUM');

-- CreateEnum
CREATE TYPE "TipoArquivo" AS ENUM ('LOGO_EMPRESA', 'FOTO_CLIENTE', 'FOTO_USUARIO', 'FOTO_PROFISSIONAL', 'IMAGEM_SERVICO', 'GALERIA_EMPRESA', 'DOCUMENTO', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusArquivo" AS ENUM ('ATIVO', 'INATIVO', 'EXCLUIDO');

-- CreateEnum
CREATE TYPE "TipoMovimentacaoPontos" AS ENUM ('GANHO', 'RESGATE', 'AJUSTE', 'EXPIRACAO');

-- CreateEnum
CREATE TYPE "TipoCupom" AS ENUM ('PERCENTUAL', 'VALOR_FIXO');

-- CreateEnum
CREATE TYPE "StatusClientePacote" AS ENUM ('ATIVO', 'FINALIZADO', 'VENCIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoMovimentacaoFinanceira" AS ENUM ('RECEITA', 'DESPESA');

-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('DINHEIRO', 'PIX', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'TRANSFERENCIA', 'BOLETO', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusPagamento" AS ENUM ('PENDENTE', 'PAGO', 'CANCELADO', 'ESTORNADO');

-- CreateEnum
CREATE TYPE "CategoriaFinanceiraTipo" AS ENUM ('RECEITA', 'DESPESA');

-- CreateEnum
CREATE TYPE "TipoNotificacao" AS ENUM ('SISTEMA', 'AGENDAMENTO', 'FINANCEIRO', 'FIDELIDADE', 'PACOTE', 'CLIENTE', 'MARKETING');

-- CreateEnum
CREATE TYPE "StatusNotificacao" AS ENUM ('NAO_LIDA', 'LIDA', 'ARQUIVADA');

-- CreateEnum
CREATE TYPE "TipoMensagemWhatsApp" AS ENUM ('LEMBRETE_AGENDAMENTO', 'CONFIRMACAO_AGENDAMENTO', 'CANCELAMENTO_AGENDAMENTO', 'ANIVERSARIO', 'FIDELIDADE', 'BENEFICIO', 'PACOTE', 'FINANCEIRO', 'CAMPANHA', 'SISTEMA');

-- CreateEnum
CREATE TYPE "StatusMensagemWhatsApp" AS ENUM ('PENDENTE', 'ENVIADA', 'FALHOU', 'CANCELADA', 'SIMULADA');

-- CreateEnum
CREATE TYPE "CanalWhatsApp" AS ENUM ('WHATSAPP_BUSINESS_GRATUITO', 'API_OFICIAL', 'PROVEDOR_EXTERNO', 'MODO_DEMONSTRACAO');

-- CreateEnum
CREATE TYPE "TipoEventoSistema" AS ENUM ('PONTOS_ADICIONADOS', 'PONTOS_RESGATADOS', 'BENEFICIO_LIBERADO', 'AGENDAMENTO_CRIADO', 'AGENDAMENTO_CONFIRMADO', 'AGENDAMENTO_CANCELADO', 'AGENDAMENTO_CONCLUIDO', 'PACOTE_CRIADO', 'PACOTE_FINALIZADO', 'PACOTE_VENCIDO', 'MOVIMENTACAO_FINANCEIRA', 'COMISSAO_GERADA', 'COMISSAO_PAGA', 'NOTIFICACAO_CRIADA', 'WHATSAPP_MENSAGEM_CRIADA', 'WHATSAPP_CAMPANHA_CRIADA', 'AUTOMACAO_EXECUTADA', 'SISTEMA');

-- CreateEnum
CREATE TYPE "ModuloEventoSistema" AS ENUM ('FIDELIDADE', 'AGENDAMENTOS', 'CLIENTES_PACOTES', 'FINANCEIRO', 'COMISSOES', 'NOTIFICACOES', 'WHATSAPP', 'AUTOMACOES', 'SISTEMA');

-- CreateEnum
CREATE TYPE "StatusAutomacaoSistema" AS ENUM ('ATIVA', 'INATIVA', 'PAUSADA');

-- CreateEnum
CREATE TYPE "GatilhoAutomacaoSistema" AS ENUM ('ANIVERSARIO_CLIENTE', 'AGENDAMENTO_CRIADO', 'AGENDAMENTO_CONFIRMADO', 'AGENDAMENTO_CANCELADO', 'AGENDAMENTO_CONCLUIDO', 'PACOTE_VENCENDO', 'PACOTE_FINALIZADO', 'PONTOS_ADICIONADOS', 'BENEFICIO_LIBERADO', 'FINANCEIRO_PENDENTE', 'CAMPANHA_WHATSAPP', 'MANUAL');

-- CreateEnum
CREATE TYPE "TipoUsuarioAuditoria" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL', 'CLIENTE', 'SISTEMA');

-- CreateEnum
CREATE TYPE "StatusAuditoria" AS ENUM ('SUCESSO', 'FALHA');

-- CreateEnum
CREATE TYPE "AcaoAuditoria" AS ENUM ('LOGIN_ADMIN', 'LOGIN_CLIENTE', 'LOGOUT', 'SOLICITAR_CODIGO', 'VERIFICAR_CODIGO', 'ACEITAR_TERMOS', 'CRIAR', 'ATUALIZAR', 'INATIVAR', 'EXCLUIR', 'CRIAR_SUPER_ADMIN', 'CRIAR_ADMIN', 'ALTERAR_ROLE', 'BLOQUEAR_ESCALACAO_ROLE', 'ACESSO_NEGADO_EMPRESAS', 'FALHA_VALIDACAO_TENANT', 'CANCELAR', 'CONCLUIR', 'PAGAR', 'UPLOAD', 'DOWNLOAD', 'LIMPEZA_ARQUIVOS', 'ARQUIVO_ORFAO', 'URL_ASSINADA', 'DELETE_ARQUIVO', 'DOWNLOAD_ARQUIVO', 'UPLOAD_ARQUIVO', 'VISUALIZAR', 'GERAR_RELATORIO', 'PROCESSAR_JOB', 'JOB_INICIADO', 'JOB_CONCLUIDO', 'JOB_FALHOU', 'CRON_EXECUTADO', 'CRON_FALHOU', 'REFRESH_ADMIN', 'REFRESH_CLIENTE', 'LOGOUT_ADMIN', 'LOGOUT_CLIENTE', 'LOGOUT_ALL_ADMIN', 'LOGOUT_ALL_CLIENTE', 'SESSAO_REVOGADA', 'LIMPEZA_SESSOES_EXPIRADAS', 'OUTRO', 'JOB_FALHA', 'JOB_DLQ', 'JOB_REPROCESSADO');

-- CreateEnum
CREATE TYPE "ArquivoVisibilidade" AS ENUM ('PUBLICO', 'PRIVADO');

-- CreateEnum
CREATE TYPE "TipoArmazenamento" AS ENUM ('LOCAL', 'S3', 'CLOUDINARY');

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "logo" TEXT,
    "corPrimaria" TEXT,
    "dominio" TEXT,
    "plano" "PlanoEmpresa" NOT NULL DEFAULT 'STARTER',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidade" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "endereco" TEXT,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "foto" TEXT,
    "role" "Role" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ultimoLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "foto" TEXT,
    "dataNascimento" TIMESTAMP(3),
    "observacoes" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ultimoAcessoPortal" TIMESTAMP(3),
    "aceitouTermos" BOOLEAN NOT NULL DEFAULT false,
    "dataAceiteTermos" TIMESTAMP(3),
    "ativoPortal" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodigoAcessoCliente" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "expiraEm" TIMESTAMP(3) NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodigoAcessoCliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "unidadeId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "dataHoraInicio" TIMESTAMP(3) NOT NULL,
    "dataHoraFim" TIMESTAMP(3) NOT NULL,
    "status" "StatusAgendamento" NOT NULL DEFAULT 'PENDENTE',
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "duracaoMinutos" INTEGER NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "imagem" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arquivo" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "clienteId" TEXT,
    "usuarioId" TEXT,
    "servicoId" TEXT,
    "unidadeId" TEXT,
    "tipo" "TipoArquivo" NOT NULL,
    "nomeOriginal" TEXT NOT NULL,
    "nomeArquivo" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "tamanhoBytes" INTEGER NOT NULL,
    "caminho" TEXT NOT NULL,
    "url" TEXT,
    "status" "StatusArquivo" NOT NULL DEFAULT 'ATIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visibilidade" "ArquivoVisibilidade" NOT NULL DEFAULT 'PUBLICO',
    "armazenamento" "TipoArmazenamento" NOT NULL DEFAULT 'LOCAL',
    "checksum" TEXT,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "ultimoDownloadEm" TIMESTAMP(3),
    "expiraEm" TIMESTAMP(3),
    "privado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fidelidade" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "saldoPontos" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fidelidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentacaoPontos" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" "TipoMovimentacaoPontos" NOT NULL,
    "pontos" INTEGER NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimentacaoPontos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cupom" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL DEFAULT 'Cupom',
    "descricao" TEXT,
    "tipo" "TipoCupom" NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "dataInicio" TIMESTAMP(3),
    "dataFim" TIMESTAMP(3),
    "quantidadeMaxima" INTEGER,
    "quantidadeUtilizada" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cupom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pacote" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valor" DECIMAL(10,2) NOT NULL,
    "quantidadeSessoes" INTEGER NOT NULL,
    "validadeDias" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pacote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientePacote" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "pacoteId" TEXT NOT NULL,
    "sessoesTotal" INTEGER NOT NULL,
    "sessoesUsadas" INTEGER NOT NULL DEFAULT 0,
    "sessoesRestantes" INTEGER NOT NULL,
    "dataCompra" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataValidade" TIMESTAMP(3),
    "status" "StatusClientePacote" NOT NULL DEFAULT 'ATIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientePacote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beneficio" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "pontosNecessarios" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beneficio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NivelFidelidade" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "pontosMinimos" INTEGER NOT NULL,
    "beneficios" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NivelFidelidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfiguracaoFidelidade" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "fidelidadeAtiva" BOOLEAN NOT NULL DEFAULT true,
    "pontuacaoAutomatica" BOOLEAN NOT NULL DEFAULT false,
    "pontosPorReal" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "reaisPorPonto" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "pontosParaResgate" INTEGER NOT NULL DEFAULT 100,
    "valorResgate" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "niveisAtivos" BOOLEAN NOT NULL DEFAULT false,
    "beneficiosAutomaticos" BOOLEAN NOT NULL DEFAULT false,
    "cupomAniversarioAtivo" BOOLEAN NOT NULL DEFAULT false,
    "cupomAniversarioCodigo" TEXT,
    "cupomAniversarioValor" DOUBLE PRECISION,
    "bonusAniversarioAtivo" BOOLEAN NOT NULL DEFAULT false,
    "bonusAniversarioPontos" INTEGER NOT NULL DEFAULT 50,
    "automacoesAtivas" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracaoFidelidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaFinanceira" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "CategoriaFinanceiraTipo" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoriaFinanceira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentacaoFinanceira" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "clienteId" TEXT,
    "agendamentoId" TEXT,
    "descricao" TEXT NOT NULL,
    "tipo" "TipoMovimentacaoFinanceira" NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "formaPagamento" "FormaPagamento" NOT NULL,
    "status" "StatusPagamento" NOT NULL DEFAULT 'PENDENTE',
    "dataMovimentacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovimentacaoFinanceira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComissaoProfissional" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "agendamentoId" TEXT NOT NULL,
    "valorServico" DECIMAL(10,2) NOT NULL,
    "percentual" DECIMAL(5,2) NOT NULL,
    "valorComissao" DECIMAL(10,2) NOT NULL,
    "status" "StatusPagamento" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComissaoProfissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "usuarioId" TEXT,
    "clienteId" TEXT,
    "tipo" "TipoNotificacao" NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "status" "StatusNotificacao" NOT NULL DEFAULT 'NAO_LIDA',
    "dataLeitura" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfiguracaoNotificacao" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "notificarAgendamentos" BOOLEAN NOT NULL DEFAULT true,
    "notificarFinanceiro" BOOLEAN NOT NULL DEFAULT true,
    "notificarFidelidade" BOOLEAN NOT NULL DEFAULT true,
    "notificarPacotes" BOOLEAN NOT NULL DEFAULT true,
    "notificarClientes" BOOLEAN NOT NULL DEFAULT true,
    "notificarMarketing" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracaoNotificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfiguracaoWhatsApp" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "canal" "CanalWhatsApp" NOT NULL DEFAULT 'MODO_DEMONSTRACAO',
    "numeroWhatsApp" TEXT,
    "mensagemSaudacao" TEXT,
    "mensagemAusencia" TEXT,
    "usarModoDemonstracao" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracaoWhatsApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateWhatsApp" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoMensagemWhatsApp" NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplateWhatsApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MensagemWhatsApp" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "clienteId" TEXT,
    "usuarioId" TEXT,
    "templateId" TEXT,
    "tipo" "TipoMensagemWhatsApp" NOT NULL,
    "destinatario" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "status" "StatusMensagemWhatsApp" NOT NULL DEFAULT 'PENDENTE',
    "erro" TEXT,
    "dataEnvio" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MensagemWhatsApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampanhaWhatsApp" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" "TipoMensagemWhatsApp" NOT NULL,
    "mensagem" TEXT NOT NULL,
    "status" "StatusMensagemWhatsApp" NOT NULL DEFAULT 'SIMULADA',
    "totalDestinatarios" INTEGER NOT NULL DEFAULT 0,
    "totalEnviadas" INTEGER NOT NULL DEFAULT 0,
    "totalFalhas" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampanhaWhatsApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoSistema" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" "TipoEventoSistema" NOT NULL,
    "modulo" "ModuloEventoSistema" NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "entidade" TEXT,
    "entidadeId" TEXT,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventoSistema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomacaoSistema" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "gatilho" "GatilhoAutomacaoSistema" NOT NULL,
    "status" "StatusAutomacaoSistema" NOT NULL DEFAULT 'ATIVA',
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "totalExecucoes" INTEGER NOT NULL DEFAULT 0,
    "totalSucessos" INTEGER NOT NULL DEFAULT 0,
    "totalFalhas" INTEGER NOT NULL DEFAULT 0,
    "ultimaExecucao" TIMESTAMP(3),
    "configuracao" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AutomacaoSistema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditoriaSistema" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT,
    "usuarioId" TEXT,
    "clienteId" TEXT,
    "tipoUsuario" "TipoUsuarioAuditoria",
    "acao" "AcaoAuditoria" NOT NULL,
    "modulo" TEXT NOT NULL,
    "rota" TEXT,
    "metodoHttp" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "recurso" TEXT,
    "recursoId" TEXT,
    "dadosAntes" JSONB,
    "dadosDepois" JSONB,
    "metadata" JSONB,
    "status" "StatusAuditoria" NOT NULL DEFAULT 'SUCESSO',
    "mensagem" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditoriaSistema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT,
    "usuarioId" TEXT,
    "clienteId" TEXT,
    "refreshTokenHash" TEXT NOT NULL,
    "dispositivo" TEXT,
    "sistemaOperacional" TEXT,
    "navegador" TEXT,
    "userAgent" TEXT,
    "ip" TEXT,
    "ultimaAtividade" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiraEm" TIMESTAMP(3) NOT NULL,
    "revogada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sessao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_slug_key" ON "Empresa"("slug");

-- CreateIndex
CREATE INDEX "Empresa_ativo_idx" ON "Empresa"("ativo");

-- CreateIndex
CREATE INDEX "Empresa_plano_idx" ON "Empresa"("plano");

-- CreateIndex
CREATE INDEX "Empresa_createdAt_idx" ON "Empresa"("createdAt");

-- CreateIndex
CREATE INDEX "Empresa_updatedAt_idx" ON "Empresa"("updatedAt");

-- CreateIndex
CREATE INDEX "Unidade_empresaId_idx" ON "Unidade"("empresaId");

-- CreateIndex
CREATE INDEX "Unidade_empresaId_ativa_idx" ON "Unidade"("empresaId", "ativa");

-- CreateIndex
CREATE INDEX "Unidade_empresaId_nome_idx" ON "Unidade"("empresaId", "nome");

-- CreateIndex
CREATE INDEX "Unidade_empresaId_createdAt_idx" ON "Unidade"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "Unidade_empresaId_updatedAt_idx" ON "Unidade"("empresaId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_empresaId_idx" ON "Usuario"("empresaId");

-- CreateIndex
CREATE INDEX "Usuario_role_idx" ON "Usuario"("role");

-- CreateIndex
CREATE INDEX "Usuario_ativo_idx" ON "Usuario"("ativo");

-- CreateIndex
CREATE INDEX "Usuario_createdAt_idx" ON "Usuario"("createdAt");

-- CreateIndex
CREATE INDEX "Usuario_updatedAt_idx" ON "Usuario"("updatedAt");

-- CreateIndex
CREATE INDEX "Usuario_empresaId_ativo_idx" ON "Usuario"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "Usuario_empresaId_role_idx" ON "Usuario"("empresaId", "role");

-- CreateIndex
CREATE INDEX "Usuario_empresaId_email_idx" ON "Usuario"("empresaId", "email");

-- CreateIndex
CREATE INDEX "Usuario_empresaId_ultimoLogin_idx" ON "Usuario"("empresaId", "ultimoLogin");

-- CreateIndex
CREATE INDEX "Usuario_empresaId_createdAt_idx" ON "Usuario"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "Usuario_empresaId_updatedAt_idx" ON "Usuario"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "Cliente_empresaId_idx" ON "Cliente"("empresaId");

-- CreateIndex
CREATE INDEX "Cliente_telefone_idx" ON "Cliente"("telefone");

-- CreateIndex
CREATE INDEX "Cliente_email_idx" ON "Cliente"("email");

-- CreateIndex
CREATE INDEX "Cliente_ativoPortal_idx" ON "Cliente"("ativoPortal");

-- CreateIndex
CREATE INDEX "Cliente_ultimoAcessoPortal_idx" ON "Cliente"("ultimoAcessoPortal");

-- CreateIndex
CREATE INDEX "Cliente_empresaId_ativo_idx" ON "Cliente"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "Cliente_empresaId_ativoPortal_idx" ON "Cliente"("empresaId", "ativoPortal");

-- CreateIndex
CREATE INDEX "Cliente_empresaId_nome_idx" ON "Cliente"("empresaId", "nome");

-- CreateIndex
CREATE INDEX "Cliente_empresaId_email_idx" ON "Cliente"("empresaId", "email");

-- CreateIndex
CREATE INDEX "Cliente_empresaId_dataNascimento_idx" ON "Cliente"("empresaId", "dataNascimento");

-- CreateIndex
CREATE INDEX "Cliente_empresaId_createdAt_idx" ON "Cliente"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "Cliente_empresaId_updatedAt_idx" ON "Cliente"("empresaId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_empresaId_telefone_key" ON "Cliente"("empresaId", "telefone");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_empresaId_idx" ON "CodigoAcessoCliente"("empresaId");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_clienteId_idx" ON "CodigoAcessoCliente"("clienteId");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_telefone_idx" ON "CodigoAcessoCliente"("telefone");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_codigo_idx" ON "CodigoAcessoCliente"("codigo");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_empresaId_clienteId_idx" ON "CodigoAcessoCliente"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_empresaId_telefone_idx" ON "CodigoAcessoCliente"("empresaId", "telefone");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_empresaId_codigo_idx" ON "CodigoAcessoCliente"("empresaId", "codigo");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_empresaId_usado_idx" ON "CodigoAcessoCliente"("empresaId", "usado");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_empresaId_expiraEm_idx" ON "CodigoAcessoCliente"("empresaId", "expiraEm");

-- CreateIndex
CREATE INDEX "CodigoAcessoCliente_empresaId_telefone_codigo_usado_idx" ON "CodigoAcessoCliente"("empresaId", "telefone", "codigo", "usado");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_idx" ON "Agendamento"("empresaId");

-- CreateIndex
CREATE INDEX "Agendamento_unidadeId_idx" ON "Agendamento"("unidadeId");

-- CreateIndex
CREATE INDEX "Agendamento_clienteId_idx" ON "Agendamento"("clienteId");

-- CreateIndex
CREATE INDEX "Agendamento_profissionalId_idx" ON "Agendamento"("profissionalId");

-- CreateIndex
CREATE INDEX "Agendamento_servicoId_idx" ON "Agendamento"("servicoId");

-- CreateIndex
CREATE INDEX "Agendamento_status_idx" ON "Agendamento"("status");

-- CreateIndex
CREATE INDEX "Agendamento_dataHoraInicio_idx" ON "Agendamento"("dataHoraInicio");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_status_idx" ON "Agendamento"("empresaId", "status");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_dataHoraInicio_idx" ON "Agendamento"("empresaId", "dataHoraInicio");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_dataHoraFim_idx" ON "Agendamento"("empresaId", "dataHoraFim");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_clienteId_idx" ON "Agendamento"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_profissionalId_idx" ON "Agendamento"("empresaId", "profissionalId");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_unidadeId_idx" ON "Agendamento"("empresaId", "unidadeId");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_servicoId_idx" ON "Agendamento"("empresaId", "servicoId");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_status_dataHoraInicio_idx" ON "Agendamento"("empresaId", "status", "dataHoraInicio");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_clienteId_dataHoraInicio_idx" ON "Agendamento"("empresaId", "clienteId", "dataHoraInicio");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_profissionalId_dataHoraInicio_idx" ON "Agendamento"("empresaId", "profissionalId", "dataHoraInicio");

-- CreateIndex
CREATE INDEX "Agendamento_empresaId_updatedAt_idx" ON "Agendamento"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "Servico_empresaId_idx" ON "Servico"("empresaId");

-- CreateIndex
CREATE INDEX "Servico_empresaId_ativo_idx" ON "Servico"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "Servico_empresaId_nome_idx" ON "Servico"("empresaId", "nome");

-- CreateIndex
CREATE INDEX "Servico_empresaId_preco_idx" ON "Servico"("empresaId", "preco");

-- CreateIndex
CREATE INDEX "Servico_empresaId_createdAt_idx" ON "Servico"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "Servico_empresaId_updatedAt_idx" ON "Servico"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_idx" ON "Arquivo"("empresaId");

-- CreateIndex
CREATE INDEX "Arquivo_clienteId_idx" ON "Arquivo"("clienteId");

-- CreateIndex
CREATE INDEX "Arquivo_usuarioId_idx" ON "Arquivo"("usuarioId");

-- CreateIndex
CREATE INDEX "Arquivo_servicoId_idx" ON "Arquivo"("servicoId");

-- CreateIndex
CREATE INDEX "Arquivo_unidadeId_idx" ON "Arquivo"("unidadeId");

-- CreateIndex
CREATE INDEX "Arquivo_tipo_idx" ON "Arquivo"("tipo");

-- CreateIndex
CREATE INDEX "Arquivo_status_idx" ON "Arquivo"("status");

-- CreateIndex
CREATE INDEX "Arquivo_createdAt_idx" ON "Arquivo"("createdAt");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_status_idx" ON "Arquivo"("empresaId", "status");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_tipo_idx" ON "Arquivo"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_clienteId_idx" ON "Arquivo"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_usuarioId_idx" ON "Arquivo"("empresaId", "usuarioId");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_servicoId_idx" ON "Arquivo"("empresaId", "servicoId");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_unidadeId_idx" ON "Arquivo"("empresaId", "unidadeId");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_tipo_status_idx" ON "Arquivo"("empresaId", "tipo", "status");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_createdAt_idx" ON "Arquivo"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_updatedAt_idx" ON "Arquivo"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_visibilidade_idx" ON "Arquivo"("empresaId", "visibilidade");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_armazenamento_idx" ON "Arquivo"("empresaId", "armazenamento");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_privado_idx" ON "Arquivo"("empresaId", "privado");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_checksum_idx" ON "Arquivo"("empresaId", "checksum");

-- CreateIndex
CREATE INDEX "Arquivo_empresaId_expiraEm_idx" ON "Arquivo"("empresaId", "expiraEm");

-- CreateIndex
CREATE INDEX "Fidelidade_empresaId_idx" ON "Fidelidade"("empresaId");

-- CreateIndex
CREATE INDEX "Fidelidade_clienteId_idx" ON "Fidelidade"("clienteId");

-- CreateIndex
CREATE INDEX "Fidelidade_empresaId_clienteId_idx" ON "Fidelidade"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "Fidelidade_empresaId_saldoPontos_idx" ON "Fidelidade"("empresaId", "saldoPontos");

-- CreateIndex
CREATE INDEX "Fidelidade_empresaId_updatedAt_idx" ON "Fidelidade"("empresaId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Fidelidade_clienteId_empresaId_key" ON "Fidelidade"("clienteId", "empresaId");

-- CreateIndex
CREATE INDEX "MovimentacaoPontos_empresaId_idx" ON "MovimentacaoPontos"("empresaId");

-- CreateIndex
CREATE INDEX "MovimentacaoPontos_clienteId_idx" ON "MovimentacaoPontos"("clienteId");

-- CreateIndex
CREATE INDEX "MovimentacaoPontos_tipo_idx" ON "MovimentacaoPontos"("tipo");

-- CreateIndex
CREATE INDEX "MovimentacaoPontos_createdAt_idx" ON "MovimentacaoPontos"("createdAt");

-- CreateIndex
CREATE INDEX "MovimentacaoPontos_empresaId_clienteId_idx" ON "MovimentacaoPontos"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "MovimentacaoPontos_empresaId_tipo_idx" ON "MovimentacaoPontos"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "MovimentacaoPontos_empresaId_createdAt_idx" ON "MovimentacaoPontos"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "MovimentacaoPontos_empresaId_clienteId_createdAt_idx" ON "MovimentacaoPontos"("empresaId", "clienteId", "createdAt");

-- CreateIndex
CREATE INDEX "Cupom_empresaId_idx" ON "Cupom"("empresaId");

-- CreateIndex
CREATE INDEX "Cupom_empresaId_ativo_idx" ON "Cupom"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "Cupom_empresaId_tipo_idx" ON "Cupom"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "Cupom_empresaId_dataInicio_idx" ON "Cupom"("empresaId", "dataInicio");

-- CreateIndex
CREATE INDEX "Cupom_empresaId_dataFim_idx" ON "Cupom"("empresaId", "dataFim");

-- CreateIndex
CREATE INDEX "Cupom_empresaId_ativo_dataInicio_dataFim_idx" ON "Cupom"("empresaId", "ativo", "dataInicio", "dataFim");

-- CreateIndex
CREATE INDEX "Cupom_empresaId_createdAt_idx" ON "Cupom"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "Cupom_empresaId_updatedAt_idx" ON "Cupom"("empresaId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Cupom_empresaId_codigo_key" ON "Cupom"("empresaId", "codigo");

-- CreateIndex
CREATE INDEX "Pacote_empresaId_idx" ON "Pacote"("empresaId");

-- CreateIndex
CREATE INDEX "Pacote_empresaId_ativo_idx" ON "Pacote"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "Pacote_empresaId_nome_idx" ON "Pacote"("empresaId", "nome");

-- CreateIndex
CREATE INDEX "Pacote_empresaId_valor_idx" ON "Pacote"("empresaId", "valor");

-- CreateIndex
CREATE INDEX "Pacote_empresaId_createdAt_idx" ON "Pacote"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "Pacote_empresaId_updatedAt_idx" ON "Pacote"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_idx" ON "ClientePacote"("empresaId");

-- CreateIndex
CREATE INDEX "ClientePacote_clienteId_idx" ON "ClientePacote"("clienteId");

-- CreateIndex
CREATE INDEX "ClientePacote_pacoteId_idx" ON "ClientePacote"("pacoteId");

-- CreateIndex
CREATE INDEX "ClientePacote_status_idx" ON "ClientePacote"("status");

-- CreateIndex
CREATE INDEX "ClientePacote_dataValidade_idx" ON "ClientePacote"("dataValidade");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_clienteId_idx" ON "ClientePacote"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_pacoteId_idx" ON "ClientePacote"("empresaId", "pacoteId");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_status_idx" ON "ClientePacote"("empresaId", "status");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_dataCompra_idx" ON "ClientePacote"("empresaId", "dataCompra");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_dataValidade_idx" ON "ClientePacote"("empresaId", "dataValidade");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_clienteId_status_idx" ON "ClientePacote"("empresaId", "clienteId", "status");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_status_dataValidade_idx" ON "ClientePacote"("empresaId", "status", "dataValidade");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_createdAt_idx" ON "ClientePacote"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "ClientePacote_empresaId_updatedAt_idx" ON "ClientePacote"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "Beneficio_empresaId_idx" ON "Beneficio"("empresaId");

-- CreateIndex
CREATE INDEX "Beneficio_ativo_idx" ON "Beneficio"("ativo");

-- CreateIndex
CREATE INDEX "Beneficio_pontosNecessarios_idx" ON "Beneficio"("pontosNecessarios");

-- CreateIndex
CREATE INDEX "Beneficio_empresaId_ativo_idx" ON "Beneficio"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "Beneficio_empresaId_pontosNecessarios_idx" ON "Beneficio"("empresaId", "pontosNecessarios");

-- CreateIndex
CREATE INDEX "Beneficio_empresaId_createdAt_idx" ON "Beneficio"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "Beneficio_empresaId_updatedAt_idx" ON "Beneficio"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "NivelFidelidade_empresaId_idx" ON "NivelFidelidade"("empresaId");

-- CreateIndex
CREATE INDEX "NivelFidelidade_pontosMinimos_idx" ON "NivelFidelidade"("pontosMinimos");

-- CreateIndex
CREATE INDEX "NivelFidelidade_empresaId_pontosMinimos_idx" ON "NivelFidelidade"("empresaId", "pontosMinimos");

-- CreateIndex
CREATE INDEX "NivelFidelidade_empresaId_createdAt_idx" ON "NivelFidelidade"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "NivelFidelidade_empresaId_updatedAt_idx" ON "NivelFidelidade"("empresaId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "NivelFidelidade_empresaId_nome_key" ON "NivelFidelidade"("empresaId", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguracaoFidelidade_empresaId_key" ON "ConfiguracaoFidelidade"("empresaId");

-- CreateIndex
CREATE INDEX "ConfiguracaoFidelidade_empresaId_idx" ON "ConfiguracaoFidelidade"("empresaId");

-- CreateIndex
CREATE INDEX "ConfiguracaoFidelidade_empresaId_updatedAt_idx" ON "ConfiguracaoFidelidade"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "CategoriaFinanceira_empresaId_idx" ON "CategoriaFinanceira"("empresaId");

-- CreateIndex
CREATE INDEX "CategoriaFinanceira_tipo_idx" ON "CategoriaFinanceira"("tipo");

-- CreateIndex
CREATE INDEX "CategoriaFinanceira_empresaId_tipo_idx" ON "CategoriaFinanceira"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "CategoriaFinanceira_empresaId_ativo_idx" ON "CategoriaFinanceira"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "CategoriaFinanceira_empresaId_createdAt_idx" ON "CategoriaFinanceira"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "CategoriaFinanceira_empresaId_updatedAt_idx" ON "CategoriaFinanceira"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_idx" ON "MovimentacaoFinanceira"("empresaId");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_categoriaId_idx" ON "MovimentacaoFinanceira"("categoriaId");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_clienteId_idx" ON "MovimentacaoFinanceira"("clienteId");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_agendamentoId_idx" ON "MovimentacaoFinanceira"("agendamentoId");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_tipo_idx" ON "MovimentacaoFinanceira"("tipo");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_status_idx" ON "MovimentacaoFinanceira"("status");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_dataMovimentacao_idx" ON "MovimentacaoFinanceira"("dataMovimentacao");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_categoriaId_idx" ON "MovimentacaoFinanceira"("empresaId", "categoriaId");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_clienteId_idx" ON "MovimentacaoFinanceira"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_agendamentoId_idx" ON "MovimentacaoFinanceira"("empresaId", "agendamentoId");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_tipo_idx" ON "MovimentacaoFinanceira"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_status_idx" ON "MovimentacaoFinanceira"("empresaId", "status");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_dataMovimentacao_idx" ON "MovimentacaoFinanceira"("empresaId", "dataMovimentacao");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_tipo_status_idx" ON "MovimentacaoFinanceira"("empresaId", "tipo", "status");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_tipo_status_dataMovimentac_idx" ON "MovimentacaoFinanceira"("empresaId", "tipo", "status", "dataMovimentacao");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_status_dataMovimentacao_idx" ON "MovimentacaoFinanceira"("empresaId", "status", "dataMovimentacao");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_createdAt_idx" ON "MovimentacaoFinanceira"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "MovimentacaoFinanceira_empresaId_updatedAt_idx" ON "MovimentacaoFinanceira"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_empresaId_idx" ON "ComissaoProfissional"("empresaId");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_profissionalId_idx" ON "ComissaoProfissional"("profissionalId");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_agendamentoId_idx" ON "ComissaoProfissional"("agendamentoId");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_status_idx" ON "ComissaoProfissional"("status");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_empresaId_profissionalId_idx" ON "ComissaoProfissional"("empresaId", "profissionalId");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_empresaId_agendamentoId_idx" ON "ComissaoProfissional"("empresaId", "agendamentoId");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_empresaId_status_idx" ON "ComissaoProfissional"("empresaId", "status");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_empresaId_profissionalId_status_idx" ON "ComissaoProfissional"("empresaId", "profissionalId", "status");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_empresaId_createdAt_idx" ON "ComissaoProfissional"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "ComissaoProfissional_empresaId_updatedAt_idx" ON "ComissaoProfissional"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_idx" ON "Notificacao"("empresaId");

-- CreateIndex
CREATE INDEX "Notificacao_usuarioId_idx" ON "Notificacao"("usuarioId");

-- CreateIndex
CREATE INDEX "Notificacao_clienteId_idx" ON "Notificacao"("clienteId");

-- CreateIndex
CREATE INDEX "Notificacao_tipo_idx" ON "Notificacao"("tipo");

-- CreateIndex
CREATE INDEX "Notificacao_status_idx" ON "Notificacao"("status");

-- CreateIndex
CREATE INDEX "Notificacao_createdAt_idx" ON "Notificacao"("createdAt");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_usuarioId_idx" ON "Notificacao"("empresaId", "usuarioId");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_clienteId_idx" ON "Notificacao"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_tipo_idx" ON "Notificacao"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_status_idx" ON "Notificacao"("empresaId", "status");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_createdAt_idx" ON "Notificacao"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_clienteId_status_idx" ON "Notificacao"("empresaId", "clienteId", "status");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_usuarioId_status_idx" ON "Notificacao"("empresaId", "usuarioId", "status");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_status_createdAt_idx" ON "Notificacao"("empresaId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Notificacao_empresaId_updatedAt_idx" ON "Notificacao"("empresaId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguracaoNotificacao_empresaId_key" ON "ConfiguracaoNotificacao"("empresaId");

-- CreateIndex
CREATE INDEX "ConfiguracaoNotificacao_empresaId_idx" ON "ConfiguracaoNotificacao"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguracaoWhatsApp_empresaId_key" ON "ConfiguracaoWhatsApp"("empresaId");

-- CreateIndex
CREATE INDEX "ConfiguracaoWhatsApp_empresaId_idx" ON "ConfiguracaoWhatsApp"("empresaId");

-- CreateIndex
CREATE INDEX "TemplateWhatsApp_empresaId_idx" ON "TemplateWhatsApp"("empresaId");

-- CreateIndex
CREATE INDEX "TemplateWhatsApp_tipo_idx" ON "TemplateWhatsApp"("tipo");

-- CreateIndex
CREATE INDEX "TemplateWhatsApp_ativo_idx" ON "TemplateWhatsApp"("ativo");

-- CreateIndex
CREATE INDEX "TemplateWhatsApp_empresaId_tipo_idx" ON "TemplateWhatsApp"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "TemplateWhatsApp_empresaId_ativo_idx" ON "TemplateWhatsApp"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "TemplateWhatsApp_empresaId_tipo_ativo_idx" ON "TemplateWhatsApp"("empresaId", "tipo", "ativo");

-- CreateIndex
CREATE INDEX "TemplateWhatsApp_empresaId_createdAt_idx" ON "TemplateWhatsApp"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "TemplateWhatsApp_empresaId_updatedAt_idx" ON "TemplateWhatsApp"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_idx" ON "MensagemWhatsApp"("empresaId");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_clienteId_idx" ON "MensagemWhatsApp"("clienteId");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_usuarioId_idx" ON "MensagemWhatsApp"("usuarioId");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_templateId_idx" ON "MensagemWhatsApp"("templateId");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_tipo_idx" ON "MensagemWhatsApp"("tipo");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_status_idx" ON "MensagemWhatsApp"("status");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_createdAt_idx" ON "MensagemWhatsApp"("createdAt");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_clienteId_idx" ON "MensagemWhatsApp"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_usuarioId_idx" ON "MensagemWhatsApp"("empresaId", "usuarioId");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_templateId_idx" ON "MensagemWhatsApp"("empresaId", "templateId");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_tipo_idx" ON "MensagemWhatsApp"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_status_idx" ON "MensagemWhatsApp"("empresaId", "status");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_createdAt_idx" ON "MensagemWhatsApp"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_clienteId_createdAt_idx" ON "MensagemWhatsApp"("empresaId", "clienteId", "createdAt");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_status_createdAt_idx" ON "MensagemWhatsApp"("empresaId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_tipo_status_idx" ON "MensagemWhatsApp"("empresaId", "tipo", "status");

-- CreateIndex
CREATE INDEX "MensagemWhatsApp_empresaId_updatedAt_idx" ON "MensagemWhatsApp"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "CampanhaWhatsApp_empresaId_idx" ON "CampanhaWhatsApp"("empresaId");

-- CreateIndex
CREATE INDEX "CampanhaWhatsApp_tipo_idx" ON "CampanhaWhatsApp"("tipo");

-- CreateIndex
CREATE INDEX "CampanhaWhatsApp_status_idx" ON "CampanhaWhatsApp"("status");

-- CreateIndex
CREATE INDEX "CampanhaWhatsApp_empresaId_tipo_idx" ON "CampanhaWhatsApp"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "CampanhaWhatsApp_empresaId_status_idx" ON "CampanhaWhatsApp"("empresaId", "status");

-- CreateIndex
CREATE INDEX "CampanhaWhatsApp_empresaId_tipo_status_idx" ON "CampanhaWhatsApp"("empresaId", "tipo", "status");

-- CreateIndex
CREATE INDEX "CampanhaWhatsApp_empresaId_createdAt_idx" ON "CampanhaWhatsApp"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "CampanhaWhatsApp_empresaId_updatedAt_idx" ON "CampanhaWhatsApp"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "EventoSistema_empresaId_idx" ON "EventoSistema"("empresaId");

-- CreateIndex
CREATE INDEX "EventoSistema_tipo_idx" ON "EventoSistema"("tipo");

-- CreateIndex
CREATE INDEX "EventoSistema_modulo_idx" ON "EventoSistema"("modulo");

-- CreateIndex
CREATE INDEX "EventoSistema_createdAt_idx" ON "EventoSistema"("createdAt");

-- CreateIndex
CREATE INDEX "EventoSistema_empresaId_tipo_idx" ON "EventoSistema"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "EventoSistema_empresaId_modulo_idx" ON "EventoSistema"("empresaId", "modulo");

-- CreateIndex
CREATE INDEX "EventoSistema_empresaId_createdAt_idx" ON "EventoSistema"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "EventoSistema_empresaId_tipo_createdAt_idx" ON "EventoSistema"("empresaId", "tipo", "createdAt");

-- CreateIndex
CREATE INDEX "EventoSistema_empresaId_modulo_createdAt_idx" ON "EventoSistema"("empresaId", "modulo", "createdAt");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_empresaId_idx" ON "AutomacaoSistema"("empresaId");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_gatilho_idx" ON "AutomacaoSistema"("gatilho");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_status_idx" ON "AutomacaoSistema"("status");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_ativa_idx" ON "AutomacaoSistema"("ativa");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_empresaId_gatilho_idx" ON "AutomacaoSistema"("empresaId", "gatilho");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_empresaId_status_idx" ON "AutomacaoSistema"("empresaId", "status");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_empresaId_ativa_idx" ON "AutomacaoSistema"("empresaId", "ativa");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_empresaId_status_ativa_idx" ON "AutomacaoSistema"("empresaId", "status", "ativa");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_empresaId_ultimaExecucao_idx" ON "AutomacaoSistema"("empresaId", "ultimaExecucao");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_empresaId_createdAt_idx" ON "AutomacaoSistema"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "AutomacaoSistema_empresaId_updatedAt_idx" ON "AutomacaoSistema"("empresaId", "updatedAt");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_empresaId_idx" ON "AuditoriaSistema"("empresaId");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_usuarioId_idx" ON "AuditoriaSistema"("usuarioId");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_clienteId_idx" ON "AuditoriaSistema"("clienteId");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_acao_idx" ON "AuditoriaSistema"("acao");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_modulo_idx" ON "AuditoriaSistema"("modulo");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_status_idx" ON "AuditoriaSistema"("status");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_createdAt_idx" ON "AuditoriaSistema"("createdAt");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_empresaId_createdAt_idx" ON "AuditoriaSistema"("empresaId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_empresaId_acao_idx" ON "AuditoriaSistema"("empresaId", "acao");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_empresaId_modulo_idx" ON "AuditoriaSistema"("empresaId", "modulo");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_empresaId_status_idx" ON "AuditoriaSistema"("empresaId", "status");

-- CreateIndex
CREATE INDEX "AuditoriaSistema_recurso_recursoId_idx" ON "AuditoriaSistema"("recurso", "recursoId");

-- CreateIndex
CREATE INDEX "Sessao_empresaId_idx" ON "Sessao"("empresaId");

-- CreateIndex
CREATE INDEX "Sessao_usuarioId_idx" ON "Sessao"("usuarioId");

-- CreateIndex
CREATE INDEX "Sessao_clienteId_idx" ON "Sessao"("clienteId");

-- CreateIndex
CREATE INDEX "Sessao_revogada_idx" ON "Sessao"("revogada");

-- CreateIndex
CREATE INDEX "Sessao_expiraEm_idx" ON "Sessao"("expiraEm");

-- CreateIndex
CREATE INDEX "Sessao_ultimaAtividade_idx" ON "Sessao"("ultimaAtividade");

-- AddForeignKey
ALTER TABLE "Unidade" ADD CONSTRAINT "Unidade_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodigoAcessoCliente" ADD CONSTRAINT "CodigoAcessoCliente_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodigoAcessoCliente" ADD CONSTRAINT "CodigoAcessoCliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fidelidade" ADD CONSTRAINT "Fidelidade_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fidelidade" ADD CONSTRAINT "Fidelidade_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoPontos" ADD CONSTRAINT "MovimentacaoPontos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoPontos" ADD CONSTRAINT "MovimentacaoPontos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cupom" ADD CONSTRAINT "Cupom_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pacote" ADD CONSTRAINT "Pacote_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientePacote" ADD CONSTRAINT "ClientePacote_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientePacote" ADD CONSTRAINT "ClientePacote_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientePacote" ADD CONSTRAINT "ClientePacote_pacoteId_fkey" FOREIGN KEY ("pacoteId") REFERENCES "Pacote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beneficio" ADD CONSTRAINT "Beneficio_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NivelFidelidade" ADD CONSTRAINT "NivelFidelidade_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfiguracaoFidelidade" ADD CONSTRAINT "ConfiguracaoFidelidade_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaFinanceira" ADD CONSTRAINT "CategoriaFinanceira_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoFinanceira" ADD CONSTRAINT "MovimentacaoFinanceira_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoFinanceira" ADD CONSTRAINT "MovimentacaoFinanceira_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaFinanceira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoFinanceira" ADD CONSTRAINT "MovimentacaoFinanceira_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoFinanceira" ADD CONSTRAINT "MovimentacaoFinanceira_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComissaoProfissional" ADD CONSTRAINT "ComissaoProfissional_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComissaoProfissional" ADD CONSTRAINT "ComissaoProfissional_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComissaoProfissional" ADD CONSTRAINT "ComissaoProfissional_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfiguracaoNotificacao" ADD CONSTRAINT "ConfiguracaoNotificacao_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfiguracaoWhatsApp" ADD CONSTRAINT "ConfiguracaoWhatsApp_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateWhatsApp" ADD CONSTRAINT "TemplateWhatsApp_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensagemWhatsApp" ADD CONSTRAINT "MensagemWhatsApp_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensagemWhatsApp" ADD CONSTRAINT "MensagemWhatsApp_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensagemWhatsApp" ADD CONSTRAINT "MensagemWhatsApp_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensagemWhatsApp" ADD CONSTRAINT "MensagemWhatsApp_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "TemplateWhatsApp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampanhaWhatsApp" ADD CONSTRAINT "CampanhaWhatsApp_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoSistema" ADD CONSTRAINT "EventoSistema_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomacaoSistema" ADD CONSTRAINT "AutomacaoSistema_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditoriaSistema" ADD CONSTRAINT "AuditoriaSistema_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditoriaSistema" ADD CONSTRAINT "AuditoriaSistema_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditoriaSistema" ADD CONSTRAINT "AuditoriaSistema_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
