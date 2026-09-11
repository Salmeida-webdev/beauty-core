import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { PrismaService } from '../../database/prisma/prisma.service';

interface CriarSessaoParams {
  id: string;
  empresaId?: string | null;
  usuarioId?: string | null;
  clienteId?: string | null;
  refreshToken: string;
  dispositivo?: string | null;
  sistemaOperacional?: string | null;
  navegador?: string | null;
  userAgent?: string | null;
  ip?: string | null;
  expiraEm: Date;
}

@Injectable()
export class SessoesService {
  constructor(private readonly prisma: PrismaService) {}

  private gerarTokenDigest(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private async gerarRefreshTokenHash(refreshToken: string): Promise<string> {
    const digest = this.gerarTokenDigest(refreshToken);

    return bcrypt.hash(digest, 12);
  }

  async criarSessao(params: CriarSessaoParams) {
    const refreshTokenHash = await this.gerarRefreshTokenHash(
      params.refreshToken,
    );

    return this.prisma.sessao.create({
      data: {
        id: params.id,
        empresaId: params.empresaId || null,
        usuarioId: params.usuarioId || null,
        clienteId: params.clienteId || null,
        refreshTokenHash,
        dispositivo: params.dispositivo || null,
        sistemaOperacional: params.sistemaOperacional || null,
        navegador: params.navegador || null,
        userAgent: params.userAgent || null,
        ip: params.ip || null,
        ultimaAtividade: new Date(),
        expiraEm: params.expiraEm,
      },
    });
  }

  async validarHash(refreshToken: string, refreshTokenHash: string) {
    const digest = this.gerarTokenDigest(refreshToken);

    return bcrypt.compare(digest, refreshTokenHash);
  }

  async rotacionarRefreshToken(
    sessaoId: string,
    novoRefreshToken: string,
    novaExpiracao: Date,
  ) {
    const refreshTokenHash = await this.gerarRefreshTokenHash(novoRefreshToken);

    return this.prisma.sessao.update({
      where: {
        id: sessaoId,
      },
      data: {
        refreshTokenHash,
        expiraEm: novaExpiracao,
        ultimaAtividade: new Date(),
      },
    });
  }

  async validarSessaoAdminAtiva(sessaoId: string, usuarioId: string) {
    const sessao = await this.prisma.sessao.findFirst({
      where: {
        id: sessaoId,
        usuarioId,
        clienteId: null,
      },
    });

    if (!sessao || sessao.revogada || sessao.expiraEm <= new Date()) {
      throw new UnauthorizedException('Sessão inválida ou expirada.');
    }

    return sessao;
  }

  async validarSessaoClienteAtiva(sessaoId: string, clienteId: string) {
    const sessao = await this.prisma.sessao.findFirst({
      where: {
        id: sessaoId,
        clienteId,
        usuarioId: null,
      },
    });

    if (!sessao || sessao.revogada || sessao.expiraEm <= new Date()) {
      throw new UnauthorizedException('Sessão inválida ou expirada.');
    }

    return sessao;
  }

  async buscarSessaoAdminPorId(sessaoId: string, usuarioId: string) {
    return this.prisma.sessao.findFirst({
      where: {
        id: sessaoId,
        usuarioId,
        clienteId: null,
      },
    });
  }

  async buscarSessaoClientePorId(sessaoId: string, clienteId: string) {
    return this.prisma.sessao.findFirst({
      where: {
        id: sessaoId,
        clienteId,
        usuarioId: null,
      },
    });
  }

  async revogarSessaoAdmin(sessaoId: string, usuarioId: string) {
    const result = await this.prisma.sessao.updateMany({
      where: {
        id: sessaoId,
        usuarioId,
        clienteId: null,
        revogada: false,
      },
      data: {
        revogada: true,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Sessão não encontrada.');
    }

    return result;
  }

  async revogarSessaoCliente(sessaoId: string, clienteId: string) {
    const result = await this.prisma.sessao.updateMany({
      where: {
        id: sessaoId,
        clienteId,
        usuarioId: null,
        revogada: false,
      },
      data: {
        revogada: true,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Sessão não encontrada.');
    }

    return result;
  }

  async revogarTodasSessoesAdmin(usuarioId: string) {
    return this.prisma.sessao.updateMany({
      where: {
        usuarioId,
        clienteId: null,
        revogada: false,
      },
      data: {
        revogada: true,
      },
    });
  }

  async revogarTodasSessoesCliente(clienteId: string) {
    return this.prisma.sessao.updateMany({
      where: {
        clienteId,
        usuarioId: null,
        revogada: false,
      },
      data: {
        revogada: true,
      },
    });
  }

  async listarSessoesAdmin(usuarioId: string) {
    return this.prisma.sessao.findMany({
      where: {
        usuarioId,
        clienteId: null,
        revogada: false,
        expiraEm: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        ip: true,
        dispositivo: true,
        sistemaOperacional: true,
        navegador: true,
        ultimaAtividade: true,
        expiraEm: true,
        createdAt: true,
      },
      orderBy: {
        ultimaAtividade: 'desc',
      },
    });
  }

  async listarSessoesCliente(clienteId: string) {
    return this.prisma.sessao.findMany({
      where: {
        clienteId,
        usuarioId: null,
        revogada: false,
        expiraEm: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        ip: true,
        dispositivo: true,
        sistemaOperacional: true,
        navegador: true,
        ultimaAtividade: true,
        expiraEm: true,
        createdAt: true,
      },
      orderBy: {
        ultimaAtividade: 'desc',
      },
    });
  }

  async atualizarAtividade(sessaoId: string) {
    return this.prisma.sessao.updateMany({
      where: {
        id: sessaoId,
        revogada: false,
        expiraEm: {
          gt: new Date(),
        },
      },
      data: {
        ultimaAtividade: new Date(),
      },
    });
  }

  async limparSessoesExpiradasERevogadasAntigas() {
    const agora = new Date();

    const limiteRevogadasAntigas = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000,
    );

    return this.prisma.sessao.deleteMany({
      where: {
        OR: [
          {
            expiraEm: {
              lt: agora,
            },
          },
          {
            revogada: true,
            updatedAt: {
              lt: limiteRevogadasAntigas,
            },
          },
        ],
      },
    });
  }
}
