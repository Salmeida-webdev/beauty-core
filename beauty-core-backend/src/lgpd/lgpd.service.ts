import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type LgpdRequestContext = {
  user?: {
    id?: string;
    sub?: string;
    usuarioId?: string;
    role?: string;
    empresaId?: string | null;
  };
  ip?: string;
  originalUrl?: string;
  url?: string;
  headers?: Record<string, string | string[] | undefined>;
};

@Injectable()
export class LgpdService {
  constructor(private readonly prisma: PrismaService) {}

  async exportarCliente(clienteId: string, request: LgpdRequestContext) {
    const cliente = await this.getClienteOrThrow(clienteId, request);
    const empresaId = cliente.empresaId as string;
    const where = { clienteId, empresaId };

    const agendamentos = await this.findManySafe('agendamento', where);
    const notificacoes = await this.findManySafe('notificacao', where);
    const mensagensWhatsApp = await this.findManySafe('mensagemWhatsApp', where);
    const arquivos = await this.findManySafe('arquivo', where);
    const sessoes = await this.findManySafe('sessao', where);

    const pontos = {
      fidelidade: await this.findManyFromModels(
        [
          'fidelidade',
          'historicoFidelidade',
          'fidelidadeHistorico',
          'historicoPontos',
          'pontosFidelidade',
        ],
        where,
      ),
    };

    const pacotes = {
      clientePacotes: await this.findManySafe('clientePacote', where),
      sessoesPacote: await this.findManySafe('sessaoPacote', where),
    };

    const financeiro = await this.findManyFromModels(
      [
        'movimentacaoFinanceira',
        'pagamentoFinanceiro',
        'comissaoProfissional',
      ],
      where,
    );

    const payload = {
      exportadoEm: new Date().toISOString(),
      clienteId,
      empresaId,
      perfil: this.removeTechnicalSecrets(cliente),
      agendamentos,
      pontos,
      pacotes,
      financeiro,
      arquivos,
      notificacoes,
      mensagensWhatsApp,
      sessoes,
    };

    await this.registrarAuditoria({
      acao: 'LGPD_EXPORTACAO',
      clienteId,
      empresaId,
      request,
      dadosDepois: {
        clienteId,
        secoesExportadas: [
          'perfil',
          'agendamentos',
          'pontos',
          'pacotes',
          'financeiro',
          'arquivos',
          'notificacoes',
          'mensagensWhatsApp',
          'sessoes',
        ],
      },
      mensagem: 'Exportacao LGPD de cliente realizada.',
    });

    return payload;
  }

  async anonimizarCliente(clienteId: string, request: LgpdRequestContext) {
    const cliente = await this.getClienteOrThrow(clienteId, request);
    const empresaId = cliente.empresaId as string;
    const token = this.createAnonToken(clienteId);

    const data = this.buildClienteAnonData(cliente, token, clienteId);

    if (Object.keys(data).length === 0) {
      throw new ForbiddenException(
        'Nenhum campo anonimizavel foi encontrado no modelo Cliente.',
      );
    }

    const clienteAnonimizado = await (this.prisma as any).cliente.update({
      where: { id: clienteId },
      data,
    });

    const relatedUpdates = await this.anonimizarDadosRelacionados(
      clienteId,
      empresaId,
      token,
      data,
    );

    await this.registrarAuditoria({
      acao: 'LGPD_ANONIMIZACAO',
      clienteId,
      empresaId,
      request,
      dadosAntes: this.maskClienteForAudit(cliente),
      dadosDepois: this.maskClienteForAudit(clienteAnonimizado),
      mensagem:
        'Anonimizacao LGPD de cliente realizada com preservacao de integridade financeira e auditoria.',
    });

    return {
      success: true,
      clienteId,
      empresaId,
      anonimizadoEm: new Date().toISOString(),
      camposAnonimizados: Object.keys(data),
      relacionamentosAnonimizados: relatedUpdates,
      observacao:
        'Movimentacoes financeiras, vinculos operacionais e auditoria historica foram preservados.',
    };
  }

  private buildClienteAnonData(
    cliente: Record<string, unknown>,
    token: string,
    clienteId: string,
  ) {
    const data: Record<string, unknown> = {};
    const anonPhone = 'anon-' + token;
    const anonEmail = 'cliente-' + token + '@anonimizado.local';
    const anonText = 'ANONIMIZADO';

    this.setIfExists(cliente, data, 'nome', 'Cliente anonimizado ' + token);
    this.setIfExists(cliente, data, 'telefone', anonPhone);
    this.setIfExists(cliente, data, 'email', anonEmail);
    this.setIfExists(cliente, data, 'cpf', this.createNumericAnonValue(clienteId, 11));
    this.setIfExists(cliente, data, 'documento', 'anon-' + token);
    this.setIfExists(cliente, data, 'dataNascimento', new Date('1900-01-01T00:00:00.000Z'));
    this.setIfExists(cliente, data, 'endereco', anonText);
    this.setIfExists(cliente, data, 'logradouro', anonText);
    this.setIfExists(cliente, data, 'numero', anonText);
    this.setIfExists(cliente, data, 'bairro', anonText);
    this.setIfExists(cliente, data, 'cidade', anonText);
    this.setIfExists(cliente, data, 'cep', anonText);
    this.setIfExists(cliente, data, 'complemento', anonText);
    this.setIfExists(cliente, data, 'observacoes', anonText);
    this.setIfExists(cliente, data, 'whatsapp', anonPhone);
    this.setIfExists(cliente, data, 'fotoUrl', null);
    this.setIfExists(cliente, data, 'avatarUrl', null);

    return data;
  }

  private setIfExists(
    source: Record<string, unknown>,
    target: Record<string, unknown>,
    field: string,
    value: unknown,
  ) {
    if (Object.prototype.hasOwnProperty.call(source, field)) {
      target[field] = value;
    }
  }

  private async anonimizarDadosRelacionados(
    clienteId: string,
    empresaId: string,
    token: string,
    clienteData: Record<string, unknown>,
  ) {
    const updates: Record<string, unknown> = {};

    const codigoDelegate = (this.prisma as any).codigoAcessoCliente;

    if (codigoDelegate?.updateMany) {
      try {
        const result = await codigoDelegate.updateMany({
          where: { clienteId, empresaId },
          data: {
            telefone:
              typeof clienteData.telefone === 'string'
                ? clienteData.telefone
                : 'anon-' + token,
            codigo: 'HASHED',
            codigoHash: null,
            usado: true,
          },
        });

        updates.codigoAcessoCliente = result?.count ?? 0;
      } catch {
        updates.codigoAcessoCliente = 'IGNORADO';
      }
    }

    return updates;
  }

  private async getClienteOrThrow(
    clienteId: string,
    request: LgpdRequestContext,
  ): Promise<Record<string, unknown>> {
    const empresaId = this.getEmpresaId(request);
    const isSuperAdmin = this.isSuperAdmin(request);

    const where = isSuperAdmin
      ? { id: clienteId }
      : {
          id: clienteId,
          empresaId,
        };

    const cliente = await (this.prisma as any).cliente.findFirst({
      where,
    });

    if (!cliente) {
      throw new NotFoundException('Cliente nao encontrado.');
    }

    if (!isSuperAdmin && cliente.empresaId !== empresaId) {
      throw new ForbiddenException(
        'Cliente nao pertence a empresa do usuario autenticado.',
      );
    }

    return cliente;
  }

  private async findManySafe(
    modelName: string,
    where: Record<string, unknown>,
  ): Promise<Record<string, unknown>[]> {
    const delegate = (this.prisma as any)[modelName];

    if (!delegate || typeof delegate.findMany !== 'function') {
      return [];
    }

    try {
      const rows = await delegate.findMany({
        where,
        orderBy: this.safeOrderBy(modelName),
        take: this.exportTakeLimit(),
      });

      return this.sanitizeRows(rows);
    } catch {
      try {
        const rows = await delegate.findMany({
          where,
          take: this.exportTakeLimit(),
        });

        return this.sanitizeRows(rows);
      } catch {
        return [];
      }
    }
  }

  private async findManyFromModels(
    modelNames: string[],
    where: Record<string, unknown>,
  ): Promise<Record<string, Record<string, unknown>[]>> {
    const result: Record<string, Record<string, unknown>[]> = {};

    for (const modelName of modelNames) {
      const rows = await this.findManySafe(modelName, where);

      if (rows.length > 0) {
        result[modelName] = rows;
      }
    }

    return result;
  }

  private sanitizeRows(rows: Record<string, unknown>[]) {
    return rows.map((row) => this.removeTechnicalSecrets(row));
  }

  private exportTakeLimit() {
    const value = Number(process.env.LGPD_EXPORT_MAX_ITEMS ?? 5000);

    if (!Number.isFinite(value) || value <= 0) {
      return 5000;
    }

    return Math.min(Math.floor(value), 10000);
  }
  private safeOrderBy(_modelName: string) {
    return {
      createdAt: 'desc',
    };
  }

  private isSuperAdmin(request: LgpdRequestContext): boolean {
    return request.user?.role === 'SUPER_ADMIN';
  }

  private getEmpresaId(request: LgpdRequestContext): string | null {
    return request.user?.empresaId ?? null;
  }

  private getUsuarioId(request: LgpdRequestContext): string | null {
    return (
      request.user?.id ??
      request.user?.sub ??
      request.user?.usuarioId ??
      null
    );
  }

  private getUserAgent(request: LgpdRequestContext): string | null {
    const value = request.headers?.['user-agent'];

    if (Array.isArray(value)) {
      return value.join(' ');
    }

    return value ?? null;
  }

  private createAnonToken(clienteId: string): string {
    const base = clienteId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
    const suffix = Date.now().toString().slice(-6);

    return (base || 'cliente') + suffix;
  }

  private createNumericAnonValue(input: string, length: number): string {
    let seed = 0;

    for (const char of input) {
      seed = (seed + char.charCodeAt(0) * 17) % 1000000007;
    }

    let output = '';

    for (let index = 0; index < length; index++) {
      seed = (seed * 1103515245 + 12345) % 2147483647;
      output += String(seed % 10);
    }

    return output.padStart(length, '0').slice(0, length);
  }

  private removeTechnicalSecrets(data: Record<string, unknown>) {
    const technicalFields = new Set([
      'senha',
      'password',
      'senhaHash',
      'hashSenha',
      'refreshToken',
      'refreshTokenHash',
      'accessToken',
      'token',
      'codigo',
      'codigoHash',
      'codigoAcesso',
      'otp',
      'secret',
      'clientSecret',
      'apiKey',
      'authorization',
    ]);

    const sanitize = (value: unknown): unknown => {
      if (Array.isArray(value)) {
        return value.map((item) => sanitize(item));
      }

      if (!value || typeof value !== 'object') {
        return value;
      }

      if (value instanceof Date) {
        return value;
      }

      const clone: Record<string, unknown> = {};

      for (const [key, nestedValue] of Object.entries(
        value as Record<string, unknown>,
      )) {
        if (technicalFields.has(key)) {
          continue;
        }

        clone[key] = sanitize(nestedValue);
      }

      return clone;
    };

    return sanitize(data) as Record<string, unknown>;
  }

  private maskClienteForAudit(data: Record<string, unknown>) {
    return {
      id: data.id,
      empresaId: data.empresaId,
      nome: data.nome ? '[REDACTED]' : null,
      telefone: data.telefone ? '[REDACTED]' : null,
      email: data.email ? '[REDACTED]' : null,
      cpf: data.cpf ? '[REDACTED]' : null,
      dataNascimento: data.dataNascimento ? '[REDACTED]' : null,
      endereco: data.endereco ? '[REDACTED]' : null,
      observacoes: data.observacoes ? '[REDACTED]' : null,
    };
  }

  private async registrarAuditoria(params: {
    acao: string;
    clienteId: string;
    empresaId: string;
    request: LgpdRequestContext;
    dadosAntes?: Record<string, unknown>;
    dadosDepois?: Record<string, unknown>;
    mensagem: string;
  }) {
    const delegate = (this.prisma as any).auditoriaSistema;

    if (!delegate || typeof delegate.create !== 'function') {
      return;
    }

    try {
      await delegate.create({
        data: {
          empresaId: params.empresaId,
          usuarioId: this.getUsuarioId(params.request),
          clienteId: params.clienteId,
          tipoUsuario: 'ADMIN',
          acao: params.acao,
          modulo: 'LGPD',
          rota: params.request.originalUrl ?? params.request.url ?? null,
          ip: params.request.ip ?? null,
          userAgent: this.getUserAgent(params.request),
          recurso: 'Cliente',
          dadosAntes: params.dadosAntes ?? null,
          dadosDepois: params.dadosDepois ?? null,
          status: 'SUCESSO',
          mensagem: params.mensagem,
        },
      });
    } catch {
      // Operacoes LGPD nao devem falhar por indisponibilidade de auditoria.
    }
  }
}