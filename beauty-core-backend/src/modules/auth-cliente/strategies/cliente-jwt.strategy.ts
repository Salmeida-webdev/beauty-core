import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { SessoesService } from '../../sessoes/sessoes.service';

type ClienteJwtPayload = {
  sub?: string;
  clienteId?: string;
  telefone?: string;
  role?: Role | 'CLIENTE';
  empresaId?: string;
  sid?: string;
  tipo?: string;
  iat?: number;
  exp?: number;
};

@Injectable()
export class ClienteJwtStrategy extends PassportStrategy(
  Strategy,
  'cliente-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly sessoesService: SessoesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_CLIENT_SECRET'),
    });
  }

  async validate(payload: ClienteJwtPayload) {
    if (!payload?.sub) {
      throw new UnauthorizedException('Token de cliente inválido.');
    }

    if (payload.tipo !== 'CLIENTE') {
      throw new UnauthorizedException('Token inválido para área do cliente.');
    }

    if (!payload.sid) {
      throw new UnauthorizedException('Sessão do cliente não identificada.');
    }

    if (!payload.empresaId) {
      throw new UnauthorizedException(
        'Token de cliente sem empresa vinculada.',
      );
    }

    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        telefone: true,
        email: true,
        ativo: true,
        ativoPortal: true,
        aceitouTermos: true,
        dataAceiteTermos: true,
        ultimoAcessoPortal: true,
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

    if (!cliente) {
      throw new UnauthorizedException('Cliente não encontrado.');
    }

    if (!cliente.ativo) {
      throw new UnauthorizedException('Cliente inativo.');
    }

    if (!cliente.ativoPortal) {
      throw new UnauthorizedException(
        'Portal do cliente está desativado para este cliente.',
      );
    }

    if (cliente.empresaId !== payload.empresaId) {
      throw new UnauthorizedException(
        'Cliente não pertence à empresa informada no token.',
      );
    }

    if (!cliente.empresa) {
      throw new UnauthorizedException('Empresa do cliente não encontrada.');
    }

    if (!cliente.empresa.ativo) {
      throw new UnauthorizedException('Empresa do cliente está inativa.');
    }

    await this.sessoesService.validarSessaoClienteAtiva(
      payload.sid,
      cliente.id,
    );

    return {
      id: cliente.id,
      clienteId: cliente.id,
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
      role: Role.CLIENTE,
      empresaId: cliente.empresaId,
      sessaoId: payload.sid,
      ativoPortal: cliente.ativoPortal,
      aceitouTermos: cliente.aceitouTermos,
      dataAceiteTermos: cliente.dataAceiteTermos,
      ultimoAcessoPortal: cliente.ultimoAcessoPortal,
      empresa: {
        id: cliente.empresa.id,
        nome: cliente.empresa.nome,
        slug: cliente.empresa.slug,
        plano: cliente.empresa.plano,
        ativo: cliente.empresa.ativo,
      },
    };
  }
}
