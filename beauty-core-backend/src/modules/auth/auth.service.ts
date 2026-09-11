import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import {
  AcaoAuditoria,
  Role,
  StatusAuditoria,
  TipoUsuarioAuditoria,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

import { PrismaService } from '../../database/prisma/prisma.service';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { SessoesService } from '../sessoes/sessoes.service';

import { mapRole } from '../../shared/enums/role-mapper';
import {
  durationToDate,
  durationToSeconds,
} from '../../shared/utils/duration.util';
import { parseUserAgent } from '../../shared/utils/device.util';

import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

type AuthRequestContext = {
  ip?: string;
  userAgent?: string;
  rota?: string;
  metodoHttp?: string;
};

type AdminTokenPayload = {
  sub?: string;
  sid?: string;
  tipo?: string;
};

type AdminAuthenticatedUser = {
  id?: string;
  sub?: string;
  empresaId?: string | null;
  role?: string;
  sessaoId?: string;
  sid?: string;
};
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly auditoriaService: AuditoriaService,
    private readonly sessoesService: SessoesService,
  ) {}

  private async registrarAuditoriaSessaoAdmin(params: {
    acao: AcaoAuditoria;
    status: StatusAuditoria;
    mensagem: string;
    usuarioId?: string;
    empresaId?: string | null;
    role?: unknown;
    sessaoId?: string;
    metadata?: Record<string, unknown>;
  }) {
    await this.auditoriaService.registrar({
      empresaId: params.empresaId ?? undefined,
      usuarioId: params.usuarioId,
      tipoUsuario: (params.role ?? 'SISTEMA') as TipoUsuarioAuditoria,
      acao: params.acao,
      status: params.status,
      modulo: 'AUTH',
      recurso: 'Sessao',
      recursoId: params.sessaoId,
      mensagem: params.mensagem,
      metadata: {
        origem: 'auth_admin',
        sessaoId: params.sessaoId,
        ...params.metadata,
      },
    });
  }

  private async gerarAccessTokenAdmin(
    usuario: {
      id: string;
      email: string;
      role: Role;
      empresaId: string | null;
    },
    sessaoId: string,
  ) {
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') || '8h';

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: mapRole(usuario.role),
      empresaId: usuario.empresaId,
      sid: sessaoId,
      tipo: 'ADMIN',
    };

    const accessToken = String(
      await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
        expiresIn: expiresIn as unknown as JwtSignOptions['expiresIn'],
      }),
    );

    return {
      accessToken,
      expiresInSeconds: durationToSeconds(expiresIn),
    };
  }

  private async gerarRefreshTokenAdmin(
    usuario: {
      id: string;
      empresaId: string | null;
    },
    sessaoId: string,
  ) {
    const expiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '30d';

    const payload = {
      sub: usuario.id,
      empresaId: usuario.empresaId,
      sid: sessaoId,
      tipo: 'admin_refresh',
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: expiresIn as unknown as JwtSignOptions['expiresIn'],
    });
  }

  async login(loginDto: LoginDto, context?: AuthRequestContext) {
    const startedAt = Date.now();

    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!usuario) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH] login admin falhou empresaId=- usuarioId=- status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarLoginAdmin({
        modulo: 'AUTH',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        status: StatusAuditoria.FALHA,
        mensagem: 'Tentativa de login admin com e-mail inexistente.',
        metadata: {
          email: loginDto.email,
          tempoMs,
        },
      });

      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    if (!usuario.ativo) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH] login admin usuário inativo empresaId=${usuario.empresaId} usuarioId=${usuario.id} status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarLoginAdmin({
        empresaId: usuario.empresaId,
        usuarioId: usuario.id,
        tipoUsuario: usuario.role,
        modulo: 'AUTH',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        status: StatusAuditoria.FALHA,
        mensagem: 'Tentativa de login admin com usuário inativo.',
        metadata: {
          email: usuario.email,
          tempoMs,
        },
      });

      throw new UnauthorizedException('Usuário inativo.');
    }

    const senhaValida = await bcrypt.compare(loginDto.senha, usuario.senha);

    if (!senhaValida) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH] login admin senha inválida empresaId=${usuario.empresaId} usuarioId=${usuario.id} status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarLoginAdmin({
        empresaId: usuario.empresaId,
        usuarioId: usuario.id,
        tipoUsuario: usuario.role,
        modulo: 'AUTH',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        status: StatusAuditoria.FALHA,
        mensagem: 'Tentativa de login admin com senha inválida.',
        metadata: {
          email: usuario.email,
          tempoMs,
        },
      });

      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const sessaoId = randomUUID();

    const refreshToken = await this.gerarRefreshTokenAdmin(usuario, sessaoId);

    const refreshExpiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '30d';

    const device = parseUserAgent(context?.userAgent);

    await this.sessoesService.criarSessao({
      id: sessaoId,
      empresaId: usuario.empresaId,
      usuarioId: usuario.id,
      clienteId: null,
      refreshToken,
      dispositivo: device.dispositivo,
      sistemaOperacional: device.sistemaOperacional,
      navegador: device.navegador,
      userAgent: device.userAgent,
      ip: context?.ip,
      expiraEm: durationToDate(refreshExpiresIn),
    });

    const access = await this.gerarAccessTokenAdmin(usuario, sessaoId);

    await this.prisma.usuario.update({
      where: {
        id: usuario.id,
      },
      data: {
        ultimoLogin: new Date(),
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[AUTH] login admin sucesso empresaId=${usuario.empresaId} usuarioId=${usuario.id} sessaoId=${sessaoId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarLoginAdmin({
      empresaId: usuario.empresaId,
      usuarioId: usuario.id,
      tipoUsuario: usuario.role,
      modulo: 'AUTH',
      rota: context?.rota,
      metodoHttp: context?.metodoHttp,
      ip: context?.ip,
      userAgent: context?.userAgent,
      status: StatusAuditoria.SUCESSO,
      mensagem: 'Login administrativo realizado com sucesso.',
      metadata: {
        email: usuario.email,
        role: mapRole(usuario.role),
        sessaoId,
        dispositivo: device.dispositivo,
        sistemaOperacional: device.sistemaOperacional,
        navegador: device.navegador,
        tempoMs,
      },
    });

    const { senha, ...usuarioSemSenha } = usuario;
    void senha;

    return {
      access_token: access.accessToken,
      refresh_token: refreshToken,
      expires_in: access.expiresInSeconds,
      usuario: {
        ...usuarioSemSenha,
        role: mapRole(usuario.role),
      },
    };
  }

  async refresh(dto: RefreshTokenDto) {
    let payload: AdminTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<AdminTokenPayload>(
        dto.refreshToken,
        {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        },
      );
    } catch {
      throw new UnauthorizedException('Refresh token inválido.');
    }

    if (payload?.tipo !== 'admin_refresh') {
      throw new UnauthorizedException('Refresh token inválido para Admin.');
    }

    if (!payload?.sid || !payload?.sub) {
      throw new UnauthorizedException('Refresh token sem sessão válida.');
    }

    const sessao = await this.prisma.sessao.findFirst({
      where: {
        id: payload.sid,
        usuarioId: payload.sub,
        clienteId: null,
      },
      include: {
        usuario: {
          include: {
            empresa: true,
          },
        },
      },
    });

    if (!sessao || sessao.revogada || sessao.expiraEm <= new Date()) {
      throw new UnauthorizedException('Sessão inválida ou expirada.');
    }

    const refreshValido = await this.sessoesService.validarHash(
      dto.refreshToken,
      sessao.refreshTokenHash,
    );

    if (!refreshValido) {
      await this.prisma.sessao.updateMany({
        where: {
          id: sessao.id,
          usuarioId: sessao.usuarioId,
          clienteId: null,
        },
        data: {
          revogada: true,
        },
      });

      throw new UnauthorizedException('Refresh token reutilizado ou inválido.');
    }

    const usuario = sessao.usuario;

    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException('Usuário inativo ou inexistente.');
    }

    if (usuario.empresaId && (!usuario.empresa || !usuario.empresa.ativo)) {
      throw new UnauthorizedException('Empresa inativa ou inexistente.');
    }

    const novoRefreshToken = await this.gerarRefreshTokenAdmin(
      usuario,
      sessao.id,
    );

    const refreshExpiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '30d';

    await this.sessoesService.rotacionarRefreshToken(
      sessao.id,
      novoRefreshToken,
      durationToDate(refreshExpiresIn),
    );

    const access = await this.gerarAccessTokenAdmin(usuario, sessao.id);

    await this.registrarAuditoriaSessaoAdmin({
      empresaId: usuario.empresaId,
      usuarioId: usuario.id,
      role: usuario.role,
      sessaoId: sessao.id,
      acao: AcaoAuditoria.REFRESH_ADMIN,
      status: StatusAuditoria.SUCESSO,
      mensagem: 'Refresh token Admin rotacionado com sucesso.',
      metadata: {
        email: usuario.email,
      },
    });

    return {
      access_token: access.accessToken,
      refresh_token: novoRefreshToken,
      expires_in: access.expiresInSeconds,
    };
  }

  async logout(usuarioLogado: AdminAuthenticatedUser, dto: LogoutDto) {
    const sessaoId = usuarioLogado?.sessaoId || usuarioLogado?.sid;
    const usuarioId = usuarioLogado?.id || usuarioLogado?.sub;

    if (!sessaoId || !usuarioId) {
      throw new UnauthorizedException('Sessão não identificada.');
    }

    const sessao = await this.prisma.sessao.findFirst({
      where: {
        id: sessaoId,
        usuarioId,
        clienteId: null,
      },
    });

    if (!sessao) {
      return {
        message: 'Logout realizado com sucesso.',
      };
    }

    const refreshValido = await this.sessoesService.validarHash(
      dto.refreshToken,
      sessao.refreshTokenHash,
    );

    if (!refreshValido) {
      throw new UnauthorizedException(
        'Refresh token não pertence à sessão atual.',
      );
    }

    await this.sessoesService.revogarSessaoAdmin(sessao.id, usuarioId);

    await this.registrarAuditoriaSessaoAdmin({
      empresaId: usuarioLogado?.empresaId,
      usuarioId,
      role: usuarioLogado?.role,
      sessaoId: sessao.id,
      acao: AcaoAuditoria.LOGOUT_ADMIN,
      status: StatusAuditoria.SUCESSO,
      mensagem: 'Logout Admin realizado com sucesso.',
    });

    return {
      message: 'Logout realizado com sucesso.',
    };
  }

  async logoutAll(usuarioLogado: AdminAuthenticatedUser) {
    const usuarioId = usuarioLogado?.id || usuarioLogado?.sub;

    if (!usuarioId) {
      throw new UnauthorizedException('Usuário não identificado.');
    }

    const result =
      await this.sessoesService.revogarTodasSessoesAdmin(usuarioId);

    await this.registrarAuditoriaSessaoAdmin({
      empresaId: usuarioLogado?.empresaId,
      usuarioId,
      role: usuarioLogado?.role,
      acao: AcaoAuditoria.LOGOUT_ALL_ADMIN,
      status: StatusAuditoria.SUCESSO,
      mensagem: 'Logout global Admin realizado com sucesso.',
      metadata: {
        totalRevogadas: result.count,
      },
    });

    return {
      message: 'Todas as sessões foram encerradas com sucesso.',
      totalRevogadas: result.count,
    };
  }

  async listarSessoes(usuarioLogado: AdminAuthenticatedUser) {
    const usuarioId = usuarioLogado?.id || usuarioLogado?.sub;

    if (!usuarioId) {
      throw new UnauthorizedException('Usuário não identificado.');
    }

    return this.sessoesService.listarSessoesAdmin(usuarioId);
  }

  async revogarSessaoEspecifica(
    usuarioLogado: AdminAuthenticatedUser,
    sessaoId: string,
  ) {
    const usuarioId = usuarioLogado?.id || usuarioLogado?.sub;

    if (!usuarioId) {
      throw new UnauthorizedException('Usuário não identificado.');
    }

    const sessao = await this.prisma.sessao.findFirst({
      where: {
        id: sessaoId,
        usuarioId,
        clienteId: null,
      },
    });

    if (!sessao) {
      throw new NotFoundException('Sessão não encontrada.');
    }

    await this.sessoesService.revogarSessaoAdmin(sessaoId, usuarioId);

    await this.registrarAuditoriaSessaoAdmin({
      empresaId: usuarioLogado?.empresaId,
      usuarioId,
      role: usuarioLogado?.role,
      sessaoId,
      acao: AcaoAuditoria.SESSAO_REVOGADA,
      status: StatusAuditoria.SUCESSO,
      mensagem: 'Sessão Admin específica revogada com sucesso.',
    });

    return {
      message: 'Sessão encerrada com sucesso.',
    };
  }
}
