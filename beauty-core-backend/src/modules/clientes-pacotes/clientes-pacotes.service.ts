import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { StatusClientePacote, TipoUsuarioAuditoria } from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantValidatorService } from '../../shared/tenant';

import { CreateClientePacoteDto } from './dto/create-cliente-pacote.dto';

import { AutomacoesService } from '../automacoes/automacoes.service';
import { TipoEventoSistema } from '../automacoes/eventos/tipo-evento-sistema.enum';
import { AuditoriaService } from '../auditoria/auditoria.service';

@Injectable()
export class ClientesPacotesService {
  private readonly logger = new Logger(ClientesPacotesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly automacoesService: AutomacoesService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreateClientePacoteDto) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.tenantValidator.validarCliente(empresaId, dto.clienteId);

    const pacote = await this.prisma.pacote.findFirst({
      where: {
        id: dto.pacoteId,
        empresaId,
        ativo: true,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        quantidadeSessoes: true,
        validadeDias: true,
        ativo: true,
      },
    });

    if (!pacote) {
      throw new NotFoundException(
        'Pacote não encontrado, inativo ou não pertence à empresa informada.',
      );
    }

    let dataValidade: Date | undefined = undefined;

    if (pacote.validadeDias) {
      dataValidade = new Date();
      dataValidade.setDate(dataValidade.getDate() + pacote.validadeDias);
    }

    const clientePacote = await this.prisma.clientePacote.create({
      data: {
        empresaId,
        clienteId: dto.clienteId,
        pacoteId: dto.pacoteId,
        sessoesTotal: pacote.quantidadeSessoes,
        sessoesUsadas: 0,
        sessoesRestantes: pacote.quantidadeSessoes,
        dataValidade,
        status: StatusClientePacote.ATIVO,
      },
      include: {
        cliente: true,
        pacote: true,
      },
    });

    await this.automacoesService.processarEvento({
      empresaId,
      tipo: TipoEventoSistema.PACOTE_CRIADO,
      modulo: 'CLIENTES_PACOTES',
      titulo: 'Cliente comprou um pacote',
      mensagem: `Cliente adquiriu o pacote ${pacote.nome} com ${pacote.quantidadeSessoes} sessões.`,
      referenciaId: clientePacote.id,
      dados: {
        clientePacoteId: clientePacote.id,
        clienteId: clientePacote.clienteId,
        pacoteId: clientePacote.pacoteId,
        nomePacote: pacote.nome,
        sessoesTotal: clientePacote.sessoesTotal,
        sessoesUsadas: clientePacote.sessoesUsadas,
        sessoesRestantes: clientePacote.sessoesRestantes,
        dataValidade: clientePacote.dataValidade,
        status: clientePacote.status,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[CLIENTES_PACOTES] pacote vendido empresaId=${empresaId} clientePacoteId=${clientePacote.id} clienteId=${clientePacote.clienteId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      clienteId: clientePacote.clienteId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'CLIENTES_PACOTES',
      recurso: 'ClientePacote',
      recursoId: clientePacote.id,
      dadosDepois: {
        id: clientePacote.id,
        clienteId: clientePacote.clienteId,
        clienteNome: clientePacote.cliente?.nome,
        pacoteId: clientePacote.pacoteId,
        pacoteNome: clientePacote.pacote?.nome,
        sessoesTotal: clientePacote.sessoesTotal,
        sessoesUsadas: clientePacote.sessoesUsadas,
        sessoesRestantes: clientePacote.sessoesRestantes,
        dataValidade: clientePacote.dataValidade,
        status: clientePacote.status,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Pacote do cliente criado com sucesso.',
    });

    return clientePacote;
  }

  async findAll(empresaId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    return this.prisma.clientePacote.findMany({
      where: {
        empresaId,
      },
      include: {
        cliente: true,
        pacote: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByCliente(empresaId: string, clienteId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.tenantValidator.validarCliente(empresaId, clienteId);

    return this.prisma.clientePacote.findMany({
      where: {
        empresaId,
        clienteId,
      },
      include: {
        cliente: true,
        pacote: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async usarSessao(empresaId: string, id: string) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const clientePacote = await this.buscarClientePacoteOuFalhar(empresaId, id);

    await this.tenantValidator.validarCliente(
      empresaId,
      clientePacote.clienteId,
    );

    if (clientePacote.status !== StatusClientePacote.ATIVO) {
      throw new BadRequestException('Este pacote não está ativo');
    }

    if (clientePacote.dataValidade && clientePacote.dataValidade < new Date()) {
      const result = await this.prisma.clientePacote.updateMany({
        where: {
          id,
          empresaId,
          status: StatusClientePacote.ATIVO,
          dataValidade: {
            lt: new Date(),
          },
        },
        data: {
          status: StatusClientePacote.VENCIDO,
        },
      });

      if (result.count === 0) {
        const pacoteAtual = await this.buscarClientePacoteOuFalhar(
          empresaId,
          id,
        );

        throw new BadRequestException(
          pacoteAtual.status === StatusClientePacote.VENCIDO
            ? 'Este pacote está vencido'
            : 'Este pacote não está disponível para uso',
        );
      }

      const pacoteVencido = await this.buscarClientePacoteOuFalhar(
        empresaId,
        id,
      );

      await this.automacoesService.processarEvento({
        empresaId,
        tipo: TipoEventoSistema.PACOTE_VENCIDO,
        modulo: 'CLIENTES_PACOTES',
        titulo: 'Pacote vencido',
        mensagem: `O pacote ${pacoteVencido.pacote.nome} do cliente venceu.`,
        referenciaId: pacoteVencido.id,
        dados: {
          clientePacoteId: pacoteVencido.id,
          clienteId: pacoteVencido.clienteId,
          pacoteId: pacoteVencido.pacoteId,
          nomePacote: pacoteVencido.pacote.nome,
          dataValidade: pacoteVencido.dataValidade,
          status: pacoteVencido.status,
        },
      });

      const tempoMs = Date.now() - startedAt;

      this.logger.log(
        `[CLIENTES_PACOTES] pacote vencido empresaId=${empresaId} clientePacoteId=${pacoteVencido.id} clienteId=${pacoteVencido.clienteId} status=SUCESSO tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarAtualizacao({
        empresaId,
        clienteId: pacoteVencido.clienteId,
        tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
        modulo: 'CLIENTES_PACOTES',
        recurso: 'ClientePacote',
        recursoId: pacoteVencido.id,
        dadosAntes: {
          id: clientePacote.id,
          clienteId: clientePacote.clienteId,
          clienteNome: clientePacote.cliente?.nome,
          pacoteId: clientePacote.pacoteId,
          pacoteNome: clientePacote.pacote?.nome,
          sessoesTotal: clientePacote.sessoesTotal,
          sessoesUsadas: clientePacote.sessoesUsadas,
          sessoesRestantes: clientePacote.sessoesRestantes,
          dataValidade: clientePacote.dataValidade,
          status: clientePacote.status,
        },
        dadosDepois: {
          id: pacoteVencido.id,
          clienteId: pacoteVencido.clienteId,
          clienteNome: pacoteVencido.cliente?.nome,
          pacoteId: pacoteVencido.pacoteId,
          pacoteNome: pacoteVencido.pacote?.nome,
          sessoesTotal: pacoteVencido.sessoesTotal,
          sessoesUsadas: pacoteVencido.sessoesUsadas,
          sessoesRestantes: pacoteVencido.sessoesRestantes,
          dataValidade: pacoteVencido.dataValidade,
          status: pacoteVencido.status,
        },
        metadata: {
          tempoMs,
          statusAnterior: clientePacote.status,
          statusAtual: pacoteVencido.status,
        },
        mensagem: 'Pacote do cliente marcado como vencido.',
      });

      throw new BadRequestException('Este pacote está vencido');
    }

    if (clientePacote.sessoesRestantes <= 0) {
      throw new BadRequestException('Não há sessões restantes');
    }

    const result = await this.prisma.clientePacote.updateMany({
      where: {
        id,
        empresaId,
        status: StatusClientePacote.ATIVO,
        sessoesRestantes: {
          gt: 0,
        },
        OR: [{ dataValidade: null }, { dataValidade: { gt: new Date() } }],
      },
      data: {
        sessoesUsadas: {
          increment: 1,
        },
        sessoesRestantes: {
          decrement: 1,
        },
      },
    });

    if (result.count === 0) {
      const estadoAtual = await this.buscarClientePacoteOuFalhar(empresaId, id);

      if (estadoAtual.dataValidade && estadoAtual.dataValidade < new Date()) {
        throw new BadRequestException('Este pacote está vencido');
      }

      if (estadoAtual.sessoesRestantes <= 0) {
        throw new BadRequestException('Não há sessões restantes');
      }

      throw new BadRequestException('Este pacote não está disponível para uso');
    }

    let clientePacoteAtualizado = await this.buscarClientePacoteOuFalhar(
      empresaId,
      id,
    );

    const finalizacao = await this.prisma.clientePacote.updateMany({
      where: {
        id,
        empresaId,
        status: StatusClientePacote.ATIVO,
        sessoesRestantes: 0,
      },
      data: {
        status: StatusClientePacote.FINALIZADO,
      },
    });

    if (finalizacao.count === 1) {
      clientePacoteAtualizado = await this.buscarClientePacoteOuFalhar(
        empresaId,
        id,
      );
    }

    if (finalizacao.count === 1) {
      await this.automacoesService.processarEvento({
        empresaId,
        tipo: TipoEventoSistema.PACOTE_FINALIZADO,
        modulo: 'CLIENTES_PACOTES',
        titulo: 'Pacote finalizado',
        mensagem: `O cliente utilizou a última sessão do pacote ${clientePacoteAtualizado.pacote.nome}.`,
        referenciaId: clientePacoteAtualizado.id,
        dados: {
          clientePacoteId: clientePacoteAtualizado.id,
          clienteId: clientePacoteAtualizado.clienteId,
          pacoteId: clientePacoteAtualizado.pacoteId,
          nomePacote: clientePacoteAtualizado.pacote.nome,
          sessoesTotal: clientePacoteAtualizado.sessoesTotal,
          sessoesUsadas: clientePacoteAtualizado.sessoesUsadas,
          sessoesRestantes: clientePacoteAtualizado.sessoesRestantes,
          status: clientePacoteAtualizado.status,
        },
      });
    }

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[CLIENTES_PACOTES] sessão utilizada empresaId=${empresaId} clientePacoteId=${clientePacoteAtualizado.id} clienteId=${clientePacoteAtualizado.clienteId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarAtualizacao({
      empresaId,
      clienteId: clientePacoteAtualizado.clienteId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'CLIENTES_PACOTES',
      recurso: 'ClientePacote',
      recursoId: clientePacoteAtualizado.id,
      dadosAntes: {
        id: clientePacote.id,
        clienteId: clientePacote.clienteId,
        clienteNome: clientePacote.cliente?.nome,
        pacoteId: clientePacote.pacoteId,
        pacoteNome: clientePacote.pacote?.nome,
        sessoesTotal: clientePacote.sessoesTotal,
        sessoesUsadas: clientePacote.sessoesUsadas,
        sessoesRestantes: clientePacote.sessoesRestantes,
        status: clientePacote.status,
        dataValidade: clientePacote.dataValidade,
      },
      dadosDepois: {
        id: clientePacoteAtualizado.id,
        clienteId: clientePacoteAtualizado.clienteId,
        clienteNome: clientePacoteAtualizado.cliente?.nome,
        pacoteId: clientePacoteAtualizado.pacoteId,
        pacoteNome: clientePacoteAtualizado.pacote?.nome,
        sessoesTotal: clientePacoteAtualizado.sessoesTotal,
        sessoesUsadas: clientePacoteAtualizado.sessoesUsadas,
        sessoesRestantes: clientePacoteAtualizado.sessoesRestantes,
        status: clientePacoteAtualizado.status,
        dataValidade: clientePacoteAtualizado.dataValidade,
      },
      metadata: {
        tempoMs,
        acaoOperacional: 'USAR_SESSAO',
      },
      mensagem: 'Sessão de pacote utilizada com sucesso.',
    });

    return clientePacoteAtualizado;
  }

  async cancelar(empresaId: string, id: string) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const clientePacote = await this.buscarClientePacoteOuFalhar(empresaId, id);

    await this.tenantValidator.validarCliente(
      empresaId,
      clientePacote.clienteId,
    );

    const result = await this.prisma.clientePacote.updateMany({
      where: {
        id,
        empresaId,
      },
      data: {
        status: StatusClientePacote.CANCELADO,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Pacote do cliente não encontrado');
    }

    const clientePacoteCancelado = await this.buscarClientePacoteOuFalhar(
      empresaId,
      id,
    );

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[CLIENTES_PACOTES] pacote cancelado empresaId=${empresaId} clientePacoteId=${clientePacoteCancelado.id} clienteId=${clientePacoteCancelado.clienteId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCancelamento({
      empresaId,
      clienteId: clientePacoteCancelado.clienteId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'CLIENTES_PACOTES',
      recurso: 'ClientePacote',
      recursoId: clientePacoteCancelado.id,
      dadosAntes: {
        id: clientePacote.id,
        clienteId: clientePacote.clienteId,
        clienteNome: clientePacote.cliente?.nome,
        pacoteId: clientePacote.pacoteId,
        pacoteNome: clientePacote.pacote?.nome,
        sessoesTotal: clientePacote.sessoesTotal,
        sessoesUsadas: clientePacote.sessoesUsadas,
        sessoesRestantes: clientePacote.sessoesRestantes,
        dataValidade: clientePacote.dataValidade,
        status: clientePacote.status,
      },
      dadosDepois: {
        id: clientePacoteCancelado.id,
        clienteId: clientePacoteCancelado.clienteId,
        clienteNome: clientePacoteCancelado.cliente?.nome,
        pacoteId: clientePacoteCancelado.pacoteId,
        pacoteNome: clientePacoteCancelado.pacote?.nome,
        sessoesTotal: clientePacoteCancelado.sessoesTotal,
        sessoesUsadas: clientePacoteCancelado.sessoesUsadas,
        sessoesRestantes: clientePacoteCancelado.sessoesRestantes,
        dataValidade: clientePacoteCancelado.dataValidade,
        status: clientePacoteCancelado.status,
      },
      metadata: {
        tempoMs,
        statusAnterior: clientePacote.status,
        statusAtual: clientePacoteCancelado.status,
      },
      mensagem: 'Pacote do cliente cancelado com sucesso.',
    });

    return clientePacoteCancelado;
  }

  private async buscarClientePacoteOuFalhar(empresaId: string, id: string) {
    const clientePacote = await this.prisma.clientePacote.findFirst({
      where: {
        id,
        empresaId,
      },
      include: {
        cliente: true,
        pacote: true,
      },
    });

    if (!clientePacote) {
      throw new NotFoundException('Pacote do cliente não encontrado');
    }

    return clientePacote;
  }
}
