import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UsuarioRolePolicy } from '../../src/modules/usuarios/policies/usuario-role.policy';

describe('UsuarioRolePolicy', () => {
  it('applies creation, management, and update matrices', () => {
    expect(UsuarioRolePolicy.canCreateUser(Role.SUPER_ADMIN, Role.ADMIN)).toBe(
      true,
    );
    expect(UsuarioRolePolicy.canCreateUser(Role.ADMIN, Role.GERENTE)).toBe(
      true,
    );
    expect(UsuarioRolePolicy.canCreateUser(Role.GERENTE, Role.ADMIN)).toBe(
      false,
    );
    expect(UsuarioRolePolicy.canManageUser(Role.ADMIN, Role.PROFISSIONAL)).toBe(
      true,
    );
    expect(
      UsuarioRolePolicy.canManageUser(Role.RECEPCAO, Role.PROFISSIONAL),
    ).toBe(false);
    expect(
      UsuarioRolePolicy.canUpdateUserRole(
        Role.ADMIN,
        Role.GERENTE,
        Role.PROFISSIONAL,
      ),
    ).toBe(true);
    expect(
      UsuarioRolePolicy.canUpdateUserRole(
        Role.GERENTE,
        Role.ADMIN,
        Role.PROFISSIONAL,
      ),
    ).toBe(false);
  });

  it('throws when authorization assertions are violated', () => {
    expect(() =>
      UsuarioRolePolicy.assertCanCreateUser(Role.GERENTE, Role.ADMIN),
    ).toThrow(ForbiddenException);
    expect(() =>
      UsuarioRolePolicy.assertCanManageUser(Role.RECEPCAO, Role.ADMIN),
    ).toThrow(ForbiddenException);
    expect(() =>
      UsuarioRolePolicy.assertCanUpdateUserRole(
        Role.GERENTE,
        Role.ADMIN,
        Role.PROFISSIONAL,
      ),
    ).toThrow(ForbiddenException);
  });

  it('validates self-role changes and empresa access', () => {
    expect(() =>
      UsuarioRolePolicy.assertCannotChangeOwnRole(
        'user-1',
        'user-1',
        Role.ADMIN,
        Role.GERENTE,
      ),
    ).toThrow(ForbiddenException);
    expect(() =>
      UsuarioRolePolicy.assertCannotChangeOwnRole(
        'user-1',
        'user-1',
        Role.ADMIN,
        Role.ADMIN,
      ),
    ).not.toThrow();
    expect(UsuarioRolePolicy.canManageEmpresa(Role.SUPER_ADMIN)).toBe(true);
    expect(UsuarioRolePolicy.canAccessEmpresasModule(Role.ADMIN)).toBe(false);
    expect(() => UsuarioRolePolicy.assertCanManageEmpresa(Role.ADMIN)).toThrow(
      ForbiddenException,
    );
    expect(() =>
      UsuarioRolePolicy.assertCanAccessEmpresasModule(Role.ADMIN),
    ).toThrow(ForbiddenException);
  });

  it('enforces empresa requirements for administrative roles', () => {
    expect(() =>
      UsuarioRolePolicy.assertAdminUserHasEmpresa(Role.ADMIN),
    ).toThrow(ForbiddenException);
    expect(() =>
      UsuarioRolePolicy.assertAdminUserHasEmpresa(Role.ADMIN, 'empresa-1'),
    ).not.toThrow();
    expect(() =>
      UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(Role.SUPER_ADMIN),
    ).not.toThrow();
    expect(() =>
      UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(
        Role.CLIENTE,
        'empresa-1',
      ),
    ).toThrow(ForbiddenException);
    expect(() =>
      UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(Role.ADMIN),
    ).toThrow(ForbiddenException);
    expect(() =>
      UsuarioRolePolicy.assertSuperAdminHasNoEmpresa(
        Role.SUPER_ADMIN,
        'empresa-1',
      ),
    ).toThrow(ForbiddenException);
    expect(() =>
      UsuarioRolePolicy.assertSuperAdminHasNoEmpresa(Role.SUPER_ADMIN),
    ).not.toThrow();
  });
});
