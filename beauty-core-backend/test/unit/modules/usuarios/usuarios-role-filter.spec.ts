import { Role } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { PrismaService } from '../../../../src/database/prisma/prisma.service';
import { AuditoriaService } from '../../../../src/modules/auditoria/auditoria.service';

import { ListUsuariosQueryDto } from '../../../../src/modules/usuarios/dto/list-usuarios-query.dto';
import { UsuariosService } from '../../../../src/modules/usuarios/usuarios.service';

function createServiceSubject() {
  const findMany = jest.fn().mockResolvedValue([]);
  const count = jest.fn().mockResolvedValue(0);

  const prisma = {
    usuario: {
      findMany,
      count,
    },
  } as unknown as PrismaService;

  const auditoriaService = {} as unknown as AuditoriaService;

  return {
    service: new UsuariosService(prisma, auditoriaService),
    findMany,
    count,
  };
}

describe('ListUsuariosQueryDto', () => {
  it.each([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.GERENTE,
    Role.RECEPCAO,
    Role.PROFISSIONAL,
  ])('aceita a role administrativa %s', async (role) => {
    const dto = plainToInstance(ListUsuariosQueryDto, {
      role,
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('rejeita CLIENTE no módulo administrativo', async () => {
    const dto = plainToInstance(ListUsuariosQueryDto, {
      role: Role.CLIENTE,
    });

    const errors = await validate(dto);
    const roleError = errors.find((error) => error.property === 'role');

    expect(roleError?.constraints?.isIn).toBeDefined();
  });
});

describe('UsuariosService — filtro server-side de role', () => {
  it('combina PROFISSIONAL com tenant e matriz de ADMIN', async () => {
    const { service, findMany, count } = createServiceSubject();

    const actor = {
      id: 'd4eebf35-8057-4f79-b518-b010ce66f6b9',
      email: 'admin@beautycore.com',
      role: Role.ADMIN,
      empresaId: '0e8d8925-d6e0-4de7-b664-b3e75fd4b73e',
    };

    const query = Object.assign(new ListUsuariosQueryDto(), {
      page: 1,
      limit: 10,
      role: Role.PROFISSIONAL,
    });

    await service.findAll(actor, query);

    const expectedWhere = {
      empresaId: actor.empresaId,
      ativo: true,
      AND: [
        {
          role: Role.PROFISSIONAL,
        },
        {
          OR: [
            {
              id: actor.id,
            },
            {
              role: {
                in: [Role.GERENTE, Role.RECEPCAO, Role.PROFISSIONAL],
              },
            },
          ],
        },
      ],
    };

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expectedWhere,
      }),
    );

    expect(count).toHaveBeenCalledWith({
      where: expectedWhere,
    });
  });

  it('mantém exclusão de CLIENTE na visão global do SUPER_ADMIN', async () => {
    const { service, findMany, count } = createServiceSubject();

    const actor = {
      id: '43d3d94d-f988-4ce7-a162-9d6944212c28',
      email: 'master@beautycore.com',
      role: Role.SUPER_ADMIN,
      empresaId: null,
    };

    const query = Object.assign(new ListUsuariosQueryDto(), {
      page: 1,
      limit: 10,
      role: Role.PROFISSIONAL,
    });

    await service.findAll(actor, query);

    const expectedWhere = {
      ativo: true,
      role: {
        not: Role.CLIENTE,
      },
      AND: [
        {
          role: Role.PROFISSIONAL,
        },
      ],
    };

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expectedWhere,
      }),
    );

    expect(count).toHaveBeenCalledWith({
      where: expectedWhere,
    });
  });
});
