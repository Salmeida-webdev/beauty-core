import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AreaClienteService } from '../area-cliente/area-cliente.service';
import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';

type ClienteAreaAuth = {
  clienteId?: string;
  sub?: string;
  empresaId?: string;
};

/**
 * Compatibility facade for the deprecated /cliente-area namespace.
 * New consumers must use /area-cliente. This class intentionally contains no
 * persistence or business logic; every operation delegates to the canonical
 * AreaClienteService so the namespaces cannot diverge silently.
 */
@Injectable()
export class ClienteAreaService {
  constructor(private readonly areaClienteService: AreaClienteService) {}

  private getAuth(auth: ClienteAreaAuth) {
    const clienteId = auth.clienteId ?? auth.sub;
    if (!clienteId || !auth.empresaId) {
      throw new UnauthorizedException('Token de cliente inválido.');
    }
    return { clienteId, empresaId: auth.empresaId };
  }

  private toPagination(query: ClienteAreaQueryDto) {
    return {
      page: query.page,
      limit: query.limit,
      orderBy: query.orderBy,
      orderDirection: query.orderDirection,
    };
  }

  async me(auth: ClienteAreaAuth) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return {
      data: await this.areaClienteService.perfil(empresaId, clienteId),
      meta: {},
    };
  }

  async dashboard(auth: ClienteAreaAuth) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return {
      data: await this.areaClienteService.dashboard(empresaId, clienteId),
      meta: {},
    };
  }

  async agendamentos(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return this.areaClienteService.agendamentos(
      empresaId,
      clienteId,
      undefined,
      this.toPagination(query),
    );
  }

  async proximosAgendamentos(auth: ClienteAreaAuth, _query: ClienteAreaQueryDto) {
    const { empresaId, clienteId } = this.getAuth(auth);
    const data = await this.areaClienteService.proximosAgendamentos(
      empresaId,
      clienteId,
    );
    return { data, meta: { total: data.length } };
  }

  async ultimoAgendamento(auth: ClienteAreaAuth) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return {
      data: await this.areaClienteService.ultimoAgendamento(
        empresaId,
        clienteId,
      ),
      meta: {},
    };
  }

  async fidelidade(auth: ClienteAreaAuth) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return {
      data: await this.areaClienteService.fidelidade(empresaId, clienteId),
      meta: {},
    };
  }

  async pontos(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return this.areaClienteService.pontos(
      empresaId,
      clienteId,
      this.toPagination(query),
    );
  }

  async beneficios(auth: ClienteAreaAuth) {
    const { empresaId, clienteId } = this.getAuth(auth);
    const data = await this.areaClienteService.beneficios(empresaId, clienteId);
    return { data, meta: { total: data.disponiveis.length } };
  }

  async pacotes(auth: ClienteAreaAuth) {
    const { empresaId, clienteId } = this.getAuth(auth);
    const data = await this.areaClienteService.pacotes(empresaId, clienteId);
    return {
      data,
      meta: {
        totalAtivos: data.ativos.length,
        totalFinalizados: data.finalizados.length,
        totalVencidos: data.vencidos.length,
        totalCancelados: data.cancelados.length,
      },
    };
  }

  async pacoteDetalhes(auth: ClienteAreaAuth, pacoteId: string) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return {
      data: await this.areaClienteService.pacoteDetalhes(
        empresaId,
        clienteId,
        pacoteId,
      ),
      meta: {},
    };
  }

  async notificacoes(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return this.areaClienteService.notificacoes(
      empresaId,
      clienteId,
      this.toPagination(query),
    );
  }

  async notificacoesNaoLidas(auth: ClienteAreaAuth) {
    const { empresaId, clienteId } = this.getAuth(auth);
    const result = await this.areaClienteService.notificacoesNaoLidas(
      empresaId,
      clienteId,
    );
    return { data: result.data, meta: { total: result.total } };
  }

  async marcarNotificacaoComoLida(auth: ClienteAreaAuth, id: string) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return {
      data: await this.areaClienteService.marcarNotificacaoComoLida(
        empresaId,
        clienteId,
        id,
      ),
      meta: {},
    };
  }

  async mensagensWhatsapp(auth: ClienteAreaAuth, query: ClienteAreaQueryDto) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return this.areaClienteService.mensagensWhatsapp(
      empresaId,
      clienteId,
      this.toPagination(query),
    );
  }

  async historico(auth: ClienteAreaAuth, _query: ClienteAreaQueryDto) {
    const { empresaId, clienteId } = this.getAuth(auth);
    return {
      data: await this.areaClienteService.historico(empresaId, clienteId),
      meta: {},
    };
  }
}
