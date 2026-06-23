import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';

export class UsuarioRolePolicy {
  private static readonly ROLES_CRIAVEIS_POR_SUPER_ADMIN: Role[] = [
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.GERENTE,
    Role.RECEPCAO,
    Role.PROFISSIONAL,
  ];

  private static readonly ROLES_CRIAVEIS_POR_ADMIN: Role[] = [
    Role.GERENTE,
    Role.RECEPCAO,
    Role.PROFISSIONAL,
  ];

  private static readonly ROLES_CRIAVEIS_POR_GERENTE: Role[] = [
    Role.RECEPCAO,
    Role.PROFISSIONAL,
  ];

  private static readonly ROLES_GERENCIAVEIS_POR_SUPER_ADMIN: Role[] = [
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.GERENTE,
    Role.RECEPCAO,
    Role.PROFISSIONAL,
  ];

  private static readonly ROLES_GERENCIAVEIS_POR_ADMIN: Role[] = [
    Role.GERENTE,
    Role.RECEPCAO,
    Role.PROFISSIONAL,
  ];

  private static readonly ROLES_GERENCIAVEIS_POR_GERENTE: Role[] = [
    Role.RECEPCAO,
    Role.PROFISSIONAL,
  ];

  static canCreateUser(actorRole: Role, targetRole: Role): boolean {
    if (actorRole === Role.SUPER_ADMIN) {
      return this.ROLES_CRIAVEIS_POR_SUPER_ADMIN.includes(targetRole);
    }

    if (actorRole === Role.ADMIN) {
      return this.ROLES_CRIAVEIS_POR_ADMIN.includes(targetRole);
    }

    if (actorRole === Role.GERENTE) {
      return this.ROLES_CRIAVEIS_POR_GERENTE.includes(targetRole);
    }

    return false;
  }

  static assertCanCreateUser(actorRole: Role, targetRole: Role): void {
    if (!this.canCreateUser(actorRole, targetRole)) {
      throw new ForbiddenException(
        `A role ${actorRole} não tem permissão para criar usuário com role ${targetRole}.`,
      );
    }
  }

  static canManageUser(actorRole: Role, targetRole: Role): boolean {
    if (actorRole === Role.SUPER_ADMIN) {
      return this.ROLES_GERENCIAVEIS_POR_SUPER_ADMIN.includes(targetRole);
    }

    if (actorRole === Role.ADMIN) {
      return this.ROLES_GERENCIAVEIS_POR_ADMIN.includes(targetRole);
    }

    if (actorRole === Role.GERENTE) {
      return this.ROLES_GERENCIAVEIS_POR_GERENTE.includes(targetRole);
    }

    return false;
  }

  static assertCanManageUser(actorRole: Role, targetRole: Role): void {
    if (!this.canManageUser(actorRole, targetRole)) {
      throw new ForbiddenException(
        `A role ${actorRole} não tem permissão para gerenciar usuário com role ${targetRole}.`,
      );
    }
  }

  static canUpdateUserRole(
    actorRole: Role,
    currentTargetRole: Role,
    newTargetRole: Role,
  ): boolean {
    if (!this.canManageUser(actorRole, currentTargetRole)) {
      return false;
    }

    if (!this.canCreateUser(actorRole, newTargetRole)) {
      return false;
    }

    return true;
  }

  static assertCanUpdateUserRole(
    actorRole: Role,
    currentTargetRole: Role,
    newTargetRole: Role,
  ): void {
    if (!this.canUpdateUserRole(actorRole, currentTargetRole, newTargetRole)) {
      throw new ForbiddenException(
        `A role ${actorRole} não tem permissão para alterar usuário de ${currentTargetRole} para ${newTargetRole}.`,
      );
    }
  }

  static assertCannotChangeOwnRole(
    actorId: string,
    targetUserId: string,
    currentTargetRole: Role,
    newTargetRole?: Role,
  ): void {
    if (!newTargetRole) {
      return;
    }

    const isSameUser = actorId === targetUserId;
    const isChangingRole = currentTargetRole !== newTargetRole;

    if (isSameUser && isChangingRole) {
      throw new ForbiddenException(
        'Usuário não pode alterar a própria role.',
      );
    }
  }

  static canManageEmpresa(actorRole: Role): boolean {
    return actorRole === Role.SUPER_ADMIN;
  }

  static assertCanManageEmpresa(actorRole: Role): void {
    if (!this.canManageEmpresa(actorRole)) {
      throw new ForbiddenException(
        'Apenas SUPER_ADMIN pode gerenciar empresas.',
      );
    }
  }

  static canAccessEmpresasModule(actorRole: Role): boolean {
    return actorRole === Role.SUPER_ADMIN;
  }

  static assertCanAccessEmpresasModule(actorRole: Role): void {
    if (!this.canAccessEmpresasModule(actorRole)) {
      throw new ForbiddenException(
        'Apenas SUPER_ADMIN pode acessar o módulo global de empresas.',
      );
    }
  }

  static assertAdminUserHasEmpresa(actorRole: Role, empresaId?: string | null) {
    const rolesQuePrecisamDeEmpresa: Role[] = [
      Role.ADMIN,
      Role.GERENTE,
      Role.RECEPCAO,
      Role.PROFISSIONAL,
    ];

    if (rolesQuePrecisamDeEmpresa.includes(actorRole) && !empresaId) {
      throw new ForbiddenException(
        `Usuário com role ${actorRole} precisa estar vinculado a uma empresa.`,
      );
    }
  }

  static assertTargetRoleHasValidEmpresa(
    targetRole: Role,
    empresaId?: string | null,
  ) {
    if (targetRole === Role.SUPER_ADMIN) {
      return;
    }

    if (targetRole === Role.CLIENTE) {
      throw new ForbiddenException(
        'CLIENTE não deve ser criado como usuário administrativo.',
      );
    }

    if (!empresaId) {
      throw new ForbiddenException(
        `Usuário com role ${targetRole} precisa estar vinculado a uma empresa.`,
      );
    }
  }

  static assertSuperAdminHasNoEmpresa(
    targetRole: Role,
    empresaId?: string | null,
  ) {
    if (targetRole === Role.SUPER_ADMIN && empresaId) {
      throw new ForbiddenException(
        'SUPER_ADMIN deve ser um usuário global e não deve estar vinculado a uma empresa.',
      );
    }
  }
}