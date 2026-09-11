import type { TipoNotificacao } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, StatusNotificacao } from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { TenantValidatorService } from '../../shared/tenant';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../shared/utils/pagination.util';

import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

function toNotificationDate(value: unknown): Date {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }

  throw new TypeError('Data de notificacao invalida.');
}

@Injectable()
export class NotificacoesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantValidator: TenantValidatorService,
  ) {}

  async create(empresaId: string, dto: CreateNotificacaoDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.tenantValidator.validarUsuario(empresaId, dto.usuarioId);

    return this.prisma.notificacao.create({
      data: {
        empresaId,
        usuarioId: dto.usuarioId,
        tipo: dto.tipo,
        titulo: dto.titulo,
        mensagem: dto.mensagem,
      },
    });
  }

  async criarAutomatica(params: {
    empresaId: string;
    usuarioId: string;
    tipo: CreateNotificacaoDto['tipo'];
    titulo: string;
    mensagem: string;
  }) {
    await this.tenantValidator.validarEmpresaAtiva(params.empresaId);

    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id: params.usuarioId,
        empresaId: params.empresaId,
        ativo: true,
      },
    });

    if (!usuario) {
      return null;
    }

    return this.prisma.notificacao.create({
      data: {
        empresaId: params.empresaId,
        usuarioId: params.usuarioId,
        tipo: params.tipo,
        titulo: params.titulo,
        mensagem: params.mensagem,
      },
    });
  }

  async findAll(empresaId: string, usuarioId: string, query: PaginationDto) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.tenantValidator.validarUsuario(empresaId, usuarioId);

    const { page, limit, skip, take } = getPaginationParams(query);

    const orderDirection = query.orderDirection ?? 'desc';
    const orderBy: Prisma.NotificacaoOrderByWithRelationInput = (() => {
      switch (query.orderBy) {
        case 'updatedAt':
          return { updatedAt: orderDirection };
        case 'dataLeitura':
          return { dataLeitura: orderDirection };
        case 'status':
          return { status: orderDirection };
        case 'tipo':
          return { tipo: orderDirection };
        case 'titulo':
          return { titulo: orderDirection };
        case 'createdAt':
        default:
          return { createdAt: orderDirection };
      }
    })();

    const where = this.montarWhereNotificacao(empresaId, usuarioId, query);

    const [data, total] = await Promise.all([
      this.prisma.notificacao.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.notificacao.count({
        where,
      }),
    ]);

    return buildPaginatedResponse(data, total, page, limit);
  }

  async findNaoLidas(
    empresaId: string,
    usuarioId: string,
    query?: PaginationDto,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.tenantValidator.validarUsuario(empresaId, usuarioId);

    if (!query) {
      const quantidade = await this.prisma.notificacao.count({
        where: {
          empresaId,
          usuarioId,
          status: StatusNotificacao.NAO_LIDA,
        },
      });

      return {
        quantidade,
      };
    }

    return this.findAll(empresaId, usuarioId, {
      ...query,
      status: StatusNotificacao.NAO_LIDA,
    } as PaginationDto);
  }

  async resumo(empresaId: string, usuarioId: string) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.tenantValidator.validarUsuario(empresaId, usuarioId);

    const [total, naoLidas, lidas, arquivadas] = await Promise.all([
      this.prisma.notificacao.count({
        where: {
          empresaId,
          usuarioId,
        },
      }),
      this.prisma.notificacao.count({
        where: {
          empresaId,
          usuarioId,
          status: StatusNotificacao.NAO_LIDA,
        },
      }),
      this.prisma.notificacao.count({
        where: {
          empresaId,
          usuarioId,
          status: StatusNotificacao.LIDA,
        },
      }),
      this.prisma.notificacao.count({
        where: {
          empresaId,
          usuarioId,
          status: StatusNotificacao.ARQUIVADA,
        },
      }),
    ]);

    return {
      total,
      naoLidas,
      lidas,
      arquivadas,
    };
  }

  async findOne(empresaId: string, usuarioId: string, id: string) {
    return this.buscarNotificacaoOuFalhar(empresaId, usuarioId, id);
  }

  async update(
    empresaId: string,
    usuarioId: string,
    id: string,
    dto: UpdateNotificacaoDto,
  ) {
    await this.buscarNotificacaoOuFalhar(empresaId, usuarioId, id);

    const result = await this.prisma.notificacao.updateMany({
      where: {
        id,
        empresaId,
        usuarioId,
      },
      data: dto,
    });

    if (result.count === 0) {
      throw new NotFoundException('Notificação não encontrada.');
    }

    return this.buscarNotificacaoOuFalhar(empresaId, usuarioId, id);
  }

  async marcarComoLida(empresaId: string, usuarioId: string, id: string) {
    await this.buscarNotificacaoOuFalhar(empresaId, usuarioId, id);

    const result = await this.prisma.notificacao.updateMany({
      where: {
        id,
        empresaId,
        usuarioId,
      },
      data: {
        status: StatusNotificacao.LIDA,
        dataLeitura: new Date(),
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Notificação não encontrada.');
    }

    return this.buscarNotificacaoOuFalhar(empresaId, usuarioId, id);
  }

  async arquivar(empresaId: string, usuarioId: string, id: string) {
    await this.buscarNotificacaoOuFalhar(empresaId, usuarioId, id);

    const result = await this.prisma.notificacao.updateMany({
      where: {
        id,
        empresaId,
        usuarioId,
      },
      data: {
        status: StatusNotificacao.ARQUIVADA,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Notificação não encontrada.');
    }

    return this.buscarNotificacaoOuFalhar(empresaId, usuarioId, id);
  }

  async remove(empresaId: string, usuarioId: string, id: string) {
    await this.buscarNotificacaoOuFalhar(empresaId, usuarioId, id);

    const result = await this.prisma.notificacao.deleteMany({
      where: {
        id,
        empresaId,
        usuarioId,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Notificação não encontrada.');
    }

    return {
      message: 'Notificação excluída com sucesso.',
    };
  }

  private async buscarNotificacaoOuFalhar(
    empresaId: string,
    usuarioId: string,
    id: string,
  ) {
    await this.tenantValidator.validarEmpresaAtiva(empresaId);

    await this.tenantValidator.validarUsuario(empresaId, usuarioId);

    const notificacao = await this.prisma.notificacao.findFirst({
      where: {
        id,
        empresaId,
        usuarioId,
      },
    });

    if (!notificacao) {
      throw new NotFoundException('Notificação não encontrada.');
    }

    return notificacao;
  }

  private montarWhereNotificacao(
    empresaId: string,
    usuarioId: string,
    query: PaginationDto,
  ): Prisma.NotificacaoWhereInput {
    const dataInicio = query['dataInicio']
      ? toNotificationDate(query['dataInicio'])
      : undefined;

    const dataFim = query['dataFim']
      ? toNotificationDate(query['dataFim'])
      : undefined;

    const status = query['status'] as StatusNotificacao | undefined;

    const tipoQuery =
      typeof query['tipo'] === 'string'
        ? (query['tipo'] as TipoNotificacao)
        : undefined;

    return {
      empresaId,
      usuarioId,
      ...(status ? { status } : {}),
      ...(typeof tipoQuery === 'string' ? { tipo: tipoQuery } : {}),
      ...(dataInicio || dataFim
        ? {
            createdAt: {
              ...(dataInicio ? { gte: dataInicio } : {}),
              ...(dataFim ? { lte: dataFim } : {}),
            },
          }
        : {}),
      ...(query.search
        ? {
            OR: [
              {
                titulo: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
              {
                mensagem: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
    };
  }
}
