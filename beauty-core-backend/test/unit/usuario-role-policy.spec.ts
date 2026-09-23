import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UsuarioRolePolicy } from '../../src/modules/usuarios/policies/usuario-role.policy';

describe('UsuarioRolePolicy', () => {
  describe('canCreateUser and assertCanCreateUser', () => {
    it('applies the creation permissions for SUPER_ADMIN, ADMIN, and GERENTE', () => {
      expect(
        UsuarioRolePolicy.canCreateUser(Role.SUPER_ADMIN, Role.SUPER_ADMIN),
      ).toBe(true);
      expect(
        UsuarioRolePolicy.canCreateUser(Role.SUPER_ADMIN, Role.PROFISSIONAL),
      ).toBe(true);
      expect(
        UsuarioRolePolicy.canCreateUser(Role.SUPER_ADMIN, Role.CLIENTE),
      ).toBe(false);

      expect(UsuarioRolePolicy.canCreateUser(Role.ADMIN, Role.GERENTE)).toBe(
        true,
      );
      expect(UsuarioRolePolicy.canCreateUser(Role.ADMIN, Role.ADMIN)).toBe(
        false,
      );
      expect(
        UsuarioRolePolicy.canCreateUser(Role.ADMIN, Role.SUPER_ADMIN),
      ).toBe(false);

      expect(UsuarioRolePolicy.canCreateUser(Role.GERENTE, Role.RECEPCAO)).toBe(
        true,
      );
      expect(
        UsuarioRolePolicy.canCreateUser(Role.GERENTE, Role.PROFISSIONAL),
      ).toBe(true);
      expect(UsuarioRolePolicy.canCreateUser(Role.GERENTE, Role.GERENTE)).toBe(
        false,
      );
      expect(
        UsuarioRolePolicy.canCreateUser(Role.RECEPCAO, Role.PROFISSIONAL),
      ).toBe(false);
    });

    it('allows permitted creation and rejects a role escalation', () => {
      expect(() =>
        UsuarioRolePolicy.assertCanCreateUser(Role.ADMIN, Role.RECEPCAO),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertCanCreateUser(Role.GERENTE, Role.ADMIN),
      ).toThrow(ForbiddenException);
    });
  });

  describe('canManageUser and assertCanManageUser', () => {
    it('applies the management hierarchy and excludes CLIENTE', () => {
      expect(
        UsuarioRolePolicy.canManageUser(Role.SUPER_ADMIN, Role.SUPER_ADMIN),
      ).toBe(true);
      expect(
        UsuarioRolePolicy.canManageUser(Role.SUPER_ADMIN, Role.CLIENTE),
      ).toBe(false);
      expect(UsuarioRolePolicy.canManageUser(Role.ADMIN, Role.GERENTE)).toBe(
        true,
      );
      expect(UsuarioRolePolicy.canManageUser(Role.ADMIN, Role.ADMIN)).toBe(
        false,
      );
      expect(UsuarioRolePolicy.canManageUser(Role.GERENTE, Role.RECEPCAO)).toBe(
        true,
      );
      expect(
        UsuarioRolePolicy.canManageUser(Role.GERENTE, Role.PROFISSIONAL),
      ).toBe(true);
      expect(UsuarioRolePolicy.canManageUser(Role.GERENTE, Role.GERENTE)).toBe(
        false,
      );
      expect(
        UsuarioRolePolicy.canManageUser(Role.PROFISSIONAL, Role.RECEPCAO),
      ).toBe(false);
    });

    it('allows permitted management and rejects management of a superior role', () => {
      expect(() =>
        UsuarioRolePolicy.assertCanManageUser(Role.GERENTE, Role.PROFISSIONAL),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertCanManageUser(Role.ADMIN, Role.SUPER_ADMIN),
      ).toThrow(ForbiddenException);
    });
  });

  describe('canUpdateUserRole and assertCanUpdateUserRole', () => {
    it('requires permission for both the current and new target roles', () => {
      expect(
        UsuarioRolePolicy.canUpdateUserRole(
          Role.ADMIN,
          Role.GERENTE,
          Role.RECEPCAO,
        ),
      ).toBe(true);
      expect(
        UsuarioRolePolicy.canUpdateUserRole(
          Role.ADMIN,
          Role.ADMIN,
          Role.GERENTE,
        ),
      ).toBe(false);
      expect(
        UsuarioRolePolicy.canUpdateUserRole(
          Role.GERENTE,
          Role.RECEPCAO,
          Role.ADMIN,
        ),
      ).toBe(false);
    });

    it('allows an authorized role update and rejects an unauthorized update', () => {
      expect(() =>
        UsuarioRolePolicy.assertCanUpdateUserRole(
          Role.SUPER_ADMIN,
          Role.ADMIN,
          Role.GERENTE,
        ),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertCanUpdateUserRole(
          Role.GERENTE,
          Role.ADMIN,
          Role.RECEPCAO,
        ),
      ).toThrow(ForbiddenException);
    });
  });

  describe('assertCannotChangeOwnRole', () => {
    it('allows unchanged or other users and rejects changing the actor role', () => {
      expect(() =>
        UsuarioRolePolicy.assertCannotChangeOwnRole(
          'user-1',
          'user-1',
          Role.ADMIN,
          Role.ADMIN,
        ),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertCannotChangeOwnRole(
          'user-1',
          'user-2',
          Role.GERENTE,
          Role.RECEPCAO,
        ),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertCannotChangeOwnRole(
          'user-1',
          'user-1',
          Role.ADMIN,
        ),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertCannotChangeOwnRole(
          'user-1',
          'user-1',
          Role.ADMIN,
          Role.GERENTE,
        ),
      ).toThrow(ForbiddenException);
    });
  });

  describe('empresa permissions', () => {
    it('restricts company management and global company access to SUPER_ADMIN', () => {
      expect(UsuarioRolePolicy.canManageEmpresa(Role.SUPER_ADMIN)).toBe(true);
      expect(UsuarioRolePolicy.canManageEmpresa(Role.ADMIN)).toBe(false);
      expect(UsuarioRolePolicy.canAccessEmpresasModule(Role.SUPER_ADMIN)).toBe(
        true,
      );
      expect(UsuarioRolePolicy.canAccessEmpresasModule(Role.GERENTE)).toBe(
        false,
      );

      expect(() =>
        UsuarioRolePolicy.assertCanManageEmpresa(Role.SUPER_ADMIN),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertCanManageEmpresa(Role.ADMIN),
      ).toThrow(ForbiddenException);
      expect(() =>
        UsuarioRolePolicy.assertCanAccessEmpresasModule(Role.SUPER_ADMIN),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertCanAccessEmpresasModule(Role.GERENTE),
      ).toThrow(ForbiddenException);
    });

    it('requires a company for administrative actors that belong to a tenant', () => {
      expect(() =>
        UsuarioRolePolicy.assertAdminUserHasEmpresa(Role.ADMIN, 'empresa-a'),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertAdminUserHasEmpresa(Role.GERENTE, null),
      ).toThrow(ForbiddenException);
      expect(() =>
        UsuarioRolePolicy.assertAdminUserHasEmpresa(Role.SUPER_ADMIN, null),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertAdminUserHasEmpresa(Role.CLIENTE, null),
      ).not.toThrow();
    });

    it('requires valid tenant assignment for target roles and forbids CLIENTE', () => {
      expect(() =>
        UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(
          Role.SUPER_ADMIN,
          null,
        ),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(
          Role.ADMIN,
          'empresa-a',
        ),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(Role.ADMIN, null),
      ).toThrow(ForbiddenException);
      expect(() =>
        UsuarioRolePolicy.assertTargetRoleHasValidEmpresa(
          Role.CLIENTE,
          'empresa-a',
        ),
      ).toThrow(ForbiddenException);
    });

    it('keeps SUPER_ADMIN global while allowing tenant-bound non-super-admin roles', () => {
      expect(() =>
        UsuarioRolePolicy.assertSuperAdminHasNoEmpresa(Role.SUPER_ADMIN, null),
      ).not.toThrow();
      expect(() =>
        UsuarioRolePolicy.assertSuperAdminHasNoEmpresa(
          Role.SUPER_ADMIN,
          'empresa-a',
        ),
      ).toThrow(ForbiddenException);
      expect(() =>
        UsuarioRolePolicy.assertSuperAdminHasNoEmpresa(Role.ADMIN, 'empresa-a'),
      ).not.toThrow();
    });
  });
});
