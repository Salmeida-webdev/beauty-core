import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  Role,
  TipoUsuarioAuditoria,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../database/prisma/prisma.service';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import {
  buildPaginatedResponse,
  getPaginationParams,
} from '../../shared/utils/pagination.util';

import { AuditoriaService } from '../auditoria/auditoria.service';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioRolePolicy } from './policies/usuario-role.policy';

type UsuarioActor = {
  id: string;
  email: string;
  role: Role;
  empresaId?: string | null;
};

type CreateUsuarioPayload = CreateUsuarioDto & {
  empresaId?: string | null;
  telefone?: string | null;
  foto?: string | null;
};

type UpdateUsuarioPayload = UpdateUsuarioDto & {
  empresaId?: string | null;
  telefone?: string | null;
  foto?: string | null;
  ativo?: boolean;
};

const usuarioSelect = {
  id: true,
  nome: true,
  email: true,
  telefone: true,
  foto: true,
  role: true,
  ativo: true,
  ultimoLogin: true,
  createdAt: true,
  updatedAt: true,
  empresaId: true,
} satisfies Prisma.UsuarioSelect;

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async create(
    createUsuarioDto: CreateUsuarioDto,
    actor: UsuarioActor,
  ) {
    const startedAt = Date.now();
    const payload = createUsuarioDto as CreateUsuarioPayload;

    UsuarioRolePolicy.assertAdminUserHasEmpresa(
      actor.role,
      actor.empresaId,
    );

    UsuarioRolePolicy.assertCanCreateUser(
      actor.role,
      payload.role,
    );

    const empresaIdFinal = this.resolverEmpresaIdParaCriacao(
      actor,
      payload,
    );

    UsuarioRolePolicy.assertSuperAdminHasNoEmpresa(
      payload.role,
      empresaIdFinal,
    );

    UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(
      payload.role,
      empresaIdFinal,
    );

    if (empresaIdFinal) {
      await this.validarEmpresaAtiva(empresaIdFinal);
    }

    await this.validarEmailDisponivel(payload.email);

    const senhaCriptografada = await bcrypt.hash(payload.senha, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nome: payload.nome,
        email: payload.email,
        senha: senhaCriptografada,
        telefone: payload.telefone,
        foto: payload.foto,
        role: payload.role,
        empresaId: empresaIdFinal,
      },
      select: usuarioSelect,
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[USUARIOS] usuario criado actorId=${actor.id} actorRole=${actor.role} empresaId=${empresaIdFinal ?? 'GLOBAL'} usuarioId=${usuario.id} targetRole=${usuario.role} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarCriacao({
      empresaId: empresaIdFinal,
      usuarioId: actor.id,
      tipoUsuario: this.mapRoleToTipoUsuario(actor.role),
      modulo: 'USUARIOS',
      recurso: 'Usuario',
      recursoId: usuario.id,
      dadosDepois: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        role: usuario.role,
        ativo: usuario.ativo,
        empresaId: usuario.empresaId,
      },
      metadata: {
        actorId: actor.id,
        actorRole: actor.role,
        targetRole: usuario.role,
        tempoMs,
      },
      mensagem: 'Usuário criado com sucesso.',
    });

    return usuario;
  }

  async findAll(
    actor: UsuarioActor,
    query: PaginationDto,
  ) {
    UsuarioRolePolicy.assertAdminUserHasEmpresa(
      actor.role,
      actor.empresaId,
    );

    const { page, limit, skip, take } =
      getPaginationParams(query);

    const orderByPermitidos = [
      'nome',
      'email',
      'role',
      'createdAt',
      'updatedAt',
      'ultimoLogin',
    ];

    const orderBy: keyof Prisma.UsuarioOrderByWithRelationInput =
      orderByPermitidos.includes(query.orderBy ?? '')
        ? (query.orderBy as keyof Prisma.UsuarioOrderByWithRelationInput)
        : 'createdAt';

    const orderDirection = query.orderDirection ?? 'desc';

    const andFilters: Prisma.UsuarioWhereInput[] = [];

    if (query.search) {
      andFilters.push({
        OR: [
          {
            nome: {
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
      });
    }

    if (actor.role === Role.ADMIN) {
      andFilters.push({
        OR: [
          { id: actor.id },
          {
            role: {
              in: [
                Role.GERENTE,
                Role.RECEPCAO,
                Role.PROFISSIONAL,
              ],
            },
          },
        ],
      });
    }

    if (actor.role === Role.GERENTE) {
      andFilters.push({
        OR: [
          { id: actor.id },
          {
            role: {
              in: [
                Role.RECEPCAO,
                Role.PROFISSIONAL,
              ],
            },
          },
        ],
      });
    }

    const where: Prisma.UsuarioWhereInput =
      actor.role === Role.SUPER_ADMIN
        ? {
            ativo: true,
            role: {
              not: Role.CLIENTE,
            },
            ...(andFilters.length > 0
              ? { AND: andFilters }
              : {}),
          }
        : {
            empresaId: actor.empresaId,
            ativo: true,
            ...(andFilters.length > 0
              ? { AND: andFilters }
              : {}),
          };

    const [data, total] = await Promise.all([
      this.prisma.usuario.findMany({
        where,
        skip,
        take,
        orderBy: {
          [orderBy]: orderDirection,
        },
        select: usuarioSelect,
      }),
      this.prisma.usuario.count({
        where,
      }),
    ]);

    return buildPaginatedResponse(data, total, page, limit);
  }

  async findOne(
    id: string,
    actor: UsuarioActor,
  ) {
    const usuario = await this.buscarUsuarioPermitidoOuFalhar(
      id,
      actor,
      true,
    );

    return usuario;
  }

  async update(
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
    actor: UsuarioActor,
  ) {
    const startedAt = Date.now();
    const payload = updateUsuarioDto as UpdateUsuarioPayload;

    const usuarioAntes = await this.buscarUsuarioPermitidoOuFalhar(
      id,
      actor,
      false,
    );

    const novaRole = payload.role ?? usuarioAntes.role;

    UsuarioRolePolicy.assertCannotChangeOwnRole(
      actor.id,
      usuarioAntes.id,
      usuarioAntes.role,
      payload.role,
    );

    if (payload.role && payload.role !== usuarioAntes.role) {
      UsuarioRolePolicy.assertCanUpdateUserRole(
        actor.role,
        usuarioAntes.role,
        payload.role,
      );
    } else if (actor.id !== usuarioAntes.id) {
      UsuarioRolePolicy.assertCanManageUser(
        actor.role,
        usuarioAntes.role,
      );
    }

    const empresaIdFinal = this.resolverEmpresaIdParaAtualizacao(
      actor,
      usuarioAntes.empresaId,
      novaRole,
      payload,
    );

    UsuarioRolePolicy.assertSuperAdminHasNoEmpresa(
      novaRole,
      empresaIdFinal,
    );

    UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(
      novaRole,
      empresaIdFinal,
    );

    if (empresaIdFinal) {
      await this.validarEmpresaAtiva(empresaIdFinal);
    }

    if (payload.email && payload.email !== usuarioAntes.email) {
      await this.validarEmailDisponivel(payload.email, usuarioAntes.id);
    }

    const senhaCriptografada = payload.senha
      ? await bcrypt.hash(payload.senha, 10)
      : undefined;

    const usuarioDepois = await this.prisma.usuario.update({
      where: {
        id: usuarioAntes.id,
      },
      data: {
        nome: payload.nome,
        email: payload.email,
        telefone: payload.telefone,
        foto: payload.foto,
        senha: senhaCriptografada,
        role: novaRole,
        empresaId: empresaIdFinal,
        ativo: payload.ativo,
      },
      select: usuarioSelect,
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[USUARIOS] usuario atualizado actorId=${actor.id} actorRole=${actor.role} empresaId=${usuarioDepois.empresaId ?? 'GLOBAL'} usuarioId=${id} roleAntes=${usuarioAntes.role} roleDepois=${usuarioDepois.role} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarAtualizacao({
      empresaId: usuarioDepois.empresaId,
      usuarioId: actor.id,
      tipoUsuario: this.mapRoleToTipoUsuario(actor.role),
      modulo: 'USUARIOS',
      recurso: 'Usuario',
      recursoId: id,
      dadosAntes: {
        nome: usuarioAntes.nome,
        email: usuarioAntes.email,
        telefone: usuarioAntes.telefone,
        foto: usuarioAntes.foto,
        role: usuarioAntes.role,
        ativo: usuarioAntes.ativo,
        empresaId: usuarioAntes.empresaId,
      },
      dadosDepois: {
        nome: usuarioDepois.nome,
        email: usuarioDepois.email,
        telefone: usuarioDepois.telefone,
        foto: usuarioDepois.foto,
        role: usuarioDepois.role,
        ativo: usuarioDepois.ativo,
        empresaId: usuarioDepois.empresaId,
      },
      metadata: {
        actorId: actor.id,
        actorRole: actor.role,
        senhaAlterada: Boolean(payload.senha),
        roleAlterada: usuarioAntes.role !== usuarioDepois.role,
        empresaAlterada: usuarioAntes.empresaId !== usuarioDepois.empresaId,
        tempoMs,
      },
      mensagem: 'Usuário atualizado com sucesso.',
    });

    return usuarioDepois;
  }

  async inativar(
    id: string,
    actor: UsuarioActor,
  ) {
    const startedAt = Date.now();

    if (actor.id === id) {
      throw new ForbiddenException(
        'Usuário não pode inativar a própria conta.',
      );
    }

    const usuarioAntes = await this.buscarUsuarioPermitidoOuFalhar(
      id,
      actor,
      false,
    );

    UsuarioRolePolicy.assertCanManageUser(
      actor.role,
      usuarioAntes.role,
    );

    const usuarioDepois = await this.prisma.usuario.update({
      where: {
        id: usuarioAntes.id,
      },
      data: {
        ativo: false,
      },
      select: usuarioSelect,
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[USUARIOS] usuario inativado actorId=${actor.id} actorRole=${actor.role} empresaId=${usuarioAntes.empresaId ?? 'GLOBAL'} usuarioId=${id} targetRole=${usuarioAntes.role} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarInativacao({
      empresaId: usuarioAntes.empresaId,
      usuarioId: actor.id,
      tipoUsuario: this.mapRoleToTipoUsuario(actor.role),
      modulo: 'USUARIOS',
      recurso: 'Usuario',
      recursoId: id,
      dadosAntes: {
        id: usuarioAntes.id,
        nome: usuarioAntes.nome,
        email: usuarioAntes.email,
        role: usuarioAntes.role,
        ativo: usuarioAntes.ativo,
        empresaId: usuarioAntes.empresaId,
      },
      dadosDepois: {
        id: usuarioDepois.id,
        nome: usuarioDepois.nome,
        email: usuarioDepois.email,
        role: usuarioDepois.role,
        ativo: usuarioDepois.ativo,
        empresaId: usuarioDepois.empresaId,
      },
      metadata: {
        actorId: actor.id,
        actorRole: actor.role,
        targetRole: usuarioAntes.role,
        tempoMs,
      },
      mensagem: 'Usuário inativado com sucesso.',
    });

    return {
      message: 'Usuário inativado com sucesso',
    };
  }

  private async buscarUsuarioPermitidoOuFalhar(
    id: string,
    actor: UsuarioActor,
    permitirProprioUsuario: boolean,
  ) {
    UsuarioRolePolicy.assertAdminUserHasEmpresa(
      actor.role,
      actor.empresaId,
    );

    const usuario =
      actor.role === Role.SUPER_ADMIN
        ? await this.prisma.usuario.findFirst({
            where: {
              id,
              role: {
                not: Role.CLIENTE,
              },
            },
            select: usuarioSelect,
          })
        : await this.prisma.usuario.findFirst({
            where: {
              id,
              empresaId: actor.empresaId,
              role: {
                not: Role.CLIENTE,
              },
            },
            select: usuarioSelect,
          });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isProprioUsuario = actor.id === usuario.id;

    if (isProprioUsuario && permitirProprioUsuario) {
      return usuario;
    }

    if (!isProprioUsuario) {
      UsuarioRolePolicy.assertCanManageUser(
        actor.role,
        usuario.role,
      );
    }

    if (isProprioUsuario && !permitirProprioUsuario) {
      return usuario;
    }

    return usuario;
  }

  private resolverEmpresaIdParaCriacao(
    actor: UsuarioActor,
    payload: CreateUsuarioPayload,
  ): string | null {
    if (actor.role === Role.SUPER_ADMIN) {
      if (payload.role === Role.SUPER_ADMIN) {
        return null;
      }

      return payload.empresaId ?? null;
    }

    if (payload.empresaId && payload.empresaId !== actor.empresaId) {
      throw new ForbiddenException(
        'Usuário não pode criar usuário em outra empresa.',
      );
    }

    return actor.empresaId ?? null;
  }

  private resolverEmpresaIdParaAtualizacao(
    actor: UsuarioActor,
    empresaIdAtual: string | null,
    novaRole: Role,
    payload: UpdateUsuarioPayload,
  ): string | null {
    if (actor.role === Role.SUPER_ADMIN) {
      if (novaRole === Role.SUPER_ADMIN) {
        if (payload.empresaId) {
          throw new ForbiddenException(
            'SUPER_ADMIN não deve estar vinculado a uma empresa.',
          );
        }

        return null;
      }

      return payload.empresaId ?? empresaIdAtual;
    }

    if (payload.empresaId && payload.empresaId !== actor.empresaId) {
      throw new ForbiddenException(
        'Usuário não pode mover usuário para outra empresa.',
      );
    }

    return empresaIdAtual;
  }

  private async validarEmpresaAtiva(empresaId: string) {
    const empresa = await this.prisma.empresa.findFirst({
      where: {
        id: empresaId,
        ativo: true,
      },
      select: {
        id: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException(
        'Empresa não encontrada ou inativa.',
      );
    }
  }

  private async validarEmailDisponivel(
    email: string,
    usuarioIdIgnorado?: string,
  ) {
    const usuarioExistente = await this.prisma.usuario.findFirst({
      where: {
        email,
        ...(usuarioIdIgnorado
          ? {
              id: {
                not: usuarioIdIgnorado,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (usuarioExistente) {
      throw new ConflictException(
        'Já existe um usuário cadastrado com este e-mail.',
      );
    }
  }

  private mapRoleToTipoUsuario(role: Role): TipoUsuarioAuditoria {
    switch (role) {
      case Role.SUPER_ADMIN:
        return TipoUsuarioAuditoria.SUPER_ADMIN;
      case Role.ADMIN:
        return TipoUsuarioAuditoria.ADMIN;
      case Role.GERENTE:
        return TipoUsuarioAuditoria.GERENTE;
      case Role.RECEPCAO:
        return TipoUsuarioAuditoria.RECEPCAO;
      case Role.PROFISSIONAL:
        return TipoUsuarioAuditoria.PROFISSIONAL;
      case Role.CLIENTE:
        return TipoUsuarioAuditoria.CLIENTE;
      default:
        return TipoUsuarioAuditoria.SISTEMA;
    }
  }
}