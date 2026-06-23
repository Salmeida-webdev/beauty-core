import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  TipoUsuarioAuditoria,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { TenantValidatorService } from '../../shared/tenant';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../shared/utils/pagination.util';

import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

import { AutomacoesService } from '../automacoes/automacoes.service';
import { TipoEventoSistema } from '../automacoes/eventos/tipo-evento-sistema.enum';
import { AuditoriaService } from '../auditoria/auditoria.service';

@Injectable()
export class ClientesService {
  private readonly logger = new Logger(ClientesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly automacoesService: AutomacoesService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(createClienteDto: CreateClienteDto, empresaId: string) {
    const startedAt = Date.now();

    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const cliente = await this.prisma.cliente.create({
      data: {
        empresaId,
        nome: createClienteDto.nome,
        telefone: createClienteDto.telefone,
        email: createClienteDto.email,
        foto: createClienteDto.foto,
        dataNascimento: createClienteDto.dataNascimento
          ? new Date(createClienteDto.dataNascimento)
          : undefined,
        observacoes: createClienteDto.observacoes,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[CLIENTES] cliente criado empresaId=${empresaId} clienteId=${cliente.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'CLIENTES',
      recurso: 'Cliente',
      recursoId: cliente.id,
      dadosDepois: {
        id: cliente.id,
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email,
        dataNascimento: cliente.dataNascimento,
        ativo: cliente.ativo,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Cliente criado com sucesso.',
    });

    const usuarioResponsavel =
      await this.buscarUsuarioResponsavel(cliente.empresaId);

    await this.automacoesService.processarEvento({
      empresaId: cliente.empresaId,
      usuarioId: usuarioResponsavel?.id,
      tipo: TipoEventoSistema.CLIENTE_CADASTRADO,
      modulo: 'CLIENTES',
      titulo: 'Novo cliente cadastrado',
      mensagem: `Cliente ${cliente.nome} foi cadastrado no sistema.`,
      referenciaId: cliente.id,
      dados: {
        usuarioId: usuarioResponsavel?.id,
        clienteId: cliente.id,
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email,
        dataNascimento: cliente.dataNascimento,
        ativo: cliente.ativo,
      },
    });

    if (
      cliente.dataNascimento &&
      this.ehAniversarianteHoje(cliente.dataNascimento)
    ) {
      await this.prepararEventoClienteAniversariante(
        cliente.empresaId,
        cliente,
        usuarioResponsavel?.id,
      );
    }

    return cliente;
  }

  async findAll(empresaId: string, query: PaginationDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    const { page, limit, skip, take } = getPaginationParams(query);

    const orderByPermitidos = [
      'nome',
      'telefone',
      'email',
      'createdAt',
      'updatedAt',
      'ultimoAcessoPortal',
    ];

    const orderBy: keyof Prisma.ClienteOrderByWithRelationInput =
      orderByPermitidos.includes(query.orderBy ?? '')
        ? (query.orderBy as keyof Prisma.ClienteOrderByWithRelationInput)
        : 'createdAt';

    const orderDirection = query.orderDirection ?? 'desc';

    const where: Prisma.ClienteWhereInput = {
      empresaId,
      ativo: true,
      ...(query.search
        ? {
            OR: [
              {
                nome: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                telefone: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.cliente.findMany({
        where,
        skip,
        take,
        orderBy: {
          [orderBy]: orderDirection,
        },
      }),
      this.prisma.cliente.count({
        where,
      }),
    ]);

    return buildPaginatedResponse(data, total, page, limit);
  }

  async findOne(id: string, empresaId: string) {
    return this.tenantValidator.validarCliente(empresaId, id);
  }

  async update(
    id: string,
    updateClienteDto: UpdateClienteDto,
    empresaId: string,
  ) {
    const startedAt = Date.now();

    const clienteAntes = await this.tenantValidator.validarCliente(
      empresaId,
      id,
    );

    const result = await this.prisma.cliente.updateMany({
      where: {
        id,
        empresaId,
        ativo: true,
      },
      data: {
        nome: updateClienteDto.nome,
        telefone: updateClienteDto.telefone,
        email: updateClienteDto.email,
        foto: updateClienteDto.foto,
        dataNascimento: updateClienteDto.dataNascimento
          ? new Date(updateClienteDto.dataNascimento)
          : undefined,
        observacoes: updateClienteDto.observacoes,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const clienteDepois = await this.findOne(id, empresaId);

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[CLIENTES] cliente atualizado empresaId=${empresaId} clienteId=${id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarAtualizacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'CLIENTES',
      recurso: 'Cliente',
      recursoId: id,
      dadosAntes: {
        nome: clienteAntes.nome,
        telefone: clienteAntes.telefone,
        email: clienteAntes.email,
        foto: clienteAntes['foto'],
        dataNascimento: clienteAntes['dataNascimento'],
        observacoes: clienteAntes['observacoes'],
        ativo: clienteAntes.ativo,
      },
      dadosDepois: {
        nome: clienteDepois.nome,
        telefone: clienteDepois.telefone,
        email: clienteDepois.email,
        foto: clienteDepois['foto'],
        dataNascimento: clienteDepois['dataNascimento'],
        observacoes: clienteDepois['observacoes'],
        ativo: clienteDepois.ativo,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Cliente atualizado com sucesso.',
    });

    return clienteDepois;
  }

  async inativar(id: string, empresaId: string) {
    const startedAt = Date.now();

    const clienteAntes = await this.tenantValidator.validarCliente(
      empresaId,
      id,
    );

    const result = await this.prisma.cliente.updateMany({
      where: {
        id,
        empresaId,
        ativo: true,
      },
      data: {
        ativo: false,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[CLIENTES] cliente inativado empresaId=${empresaId} clienteId=${id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarInativacao({
      empresaId,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      modulo: 'CLIENTES',
      recurso: 'Cliente',
      recursoId: id,
      dadosAntes: {
        id: clienteAntes.id,
        nome: clienteAntes.nome,
        telefone: clienteAntes.telefone,
        email: clienteAntes.email,
        ativo: clienteAntes.ativo,
      },
      dadosDepois: {
        id: clienteAntes.id,
        nome: clienteAntes.nome,
        telefone: clienteAntes.telefone,
        email: clienteAntes.email,
        ativo: false,
      },
      metadata: {
        tempoMs,
      },
      mensagem: 'Cliente inativado com sucesso.',
    });

    return {
      message: 'Cliente inativado com sucesso',
    };
  }

  private async buscarUsuarioResponsavel(empresaId: string) {
    return this.prisma.usuario.findFirst({
      where: {
        empresaId,
        ativo: true,
        role: {
          in: ['ADMIN', 'GERENTE'],
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  private ehAniversarianteHoje(dataNascimento: Date): boolean {
    const hoje = new Date();

    return (
      dataNascimento.getDate() === hoje.getDate() &&
      dataNascimento.getMonth() === hoje.getMonth()
    );
  }

  private async prepararEventoClienteAniversariante(
    empresaId: string,
    cliente: {
      id: string;
      nome: string;
      telefone: string | null;
      email: string | null;
      dataNascimento: Date | null;
    },
    usuarioId?: string,
  ) {
    await this.automacoesService.processarEvento({
      empresaId,
      usuarioId,
      tipo: TipoEventoSistema.CLIENTE_ANIVERSARIANTE,
      modulo: 'CLIENTES',
      titulo: 'Cliente aniversariante',
      mensagem: `Hoje é aniversário do cliente ${cliente.nome}.`,
      referenciaId: cliente.id,
      dados: {
        usuarioId,
        clienteId: cliente.id,
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email,
        dataNascimento: cliente.dataNascimento,
        origem: 'estrutura_preparada_sem_rotina_diaria',
      },
    });
  }
}