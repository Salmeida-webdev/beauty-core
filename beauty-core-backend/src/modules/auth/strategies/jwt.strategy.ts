import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { SessoesService } from '../../sessoes/sessoes.service';

type JwtAdminPayload = {
  sub?: string;
  email?: string;
  role?: Role;
  empresaId?: string | null;
  sid?: string;
  tipo?: string;
  iat?: number;
  exp?: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly sessoesService: SessoesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtAdminPayload) {
    if (!payload?.sub) {
      throw new UnauthorizedException('Token inválido.');
    }

    if (payload.tipo !== 'ADMIN') {
      throw new UnauthorizedException(
        'Token inválido para área administrativa.',
      );
    }

    if (!payload.sid) {
      throw new UnauthorizedException('Sessão não identificada.');
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        empresaId: true,
        ativo: true,
        empresa: {
          select: {
            id: true,
            nome: true,
            slug: true,
            ativo: true,
            plano: true,
          },
        },
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    if (!usuario.ativo) {
      throw new UnauthorizedException('Usuário inativo.');
    }

    if (usuario.role === Role.CLIENTE) {
      throw new UnauthorizedException(
        'Token inválido para área administrativa.',
      );
    }

    await this.sessoesService.validarSessaoAdminAtiva(payload.sid, usuario.id);

    if (usuario.role === Role.SUPER_ADMIN) {
      if (usuario.empresaId) {
        throw new UnauthorizedException(
          'SUPER_ADMIN não deve estar vinculado a uma empresa.',
        );
      }

      return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
        empresaId: null,
        sessaoId: payload.sid,
      };
    }

    const rolesAdministrativasComEmpresa: Role[] = [
      Role.ADMIN,
      Role.GERENTE,
      Role.RECEPCAO,
      Role.PROFISSIONAL,
    ];

    if (!rolesAdministrativasComEmpresa.includes(usuario.role)) {
      throw new UnauthorizedException('Role administrativa inválida.');
    }

    if (!usuario.empresaId) {
      throw new UnauthorizedException(
        'Usuário administrativo sem empresa vinculada.',
      );
    }

    if (!usuario.empresa) {
      throw new UnauthorizedException('Empresa do usuário não encontrada.');
    }

    if (!usuario.empresa.ativo) {
      throw new UnauthorizedException('Empresa inativa.');
    }

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      empresaId: usuario.empresaId,
      sessaoId: payload.sid,
      empresa: {
        id: usuario.empresa.id,
        nome: usuario.empresa.nome,
        slug: usuario.empresa.slug,
        plano: usuario.empresa.plano,
        ativo: usuario.empresa.ativo,
      },
    };
  }
}
