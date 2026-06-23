import { LogoutClienteDto } from './dto/logout-cliente.dto';
import { RefreshClienteTokenDto } from './dto/refresh-cliente-token.dto';
import { parseUserAgent } from '../../shared/utils/device.util';
import { durationToDate, durationToSeconds } from '../../shared/utils/duration.util';
import { SessoesService } from '../sessoes/sessoes.service';
import { createHmac, randomInt, randomUUID, timingSafeEqual } from 'crypto';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import {
  AcaoAuditoria,
  StatusAuditoria,
  TipoUsuarioAuditoria,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';
import { TenantPublicService } from '../../shared/tenant';

import { AuditoriaService } from '../auditoria/auditoria.service';

import { AceitarTermosDto } from './dto/aceitar-termos.dto';
import { SolicitarCodigoDto } from './dto/solicitar-codigo.dto';
import { VerificarCodigoDto } from './dto/verificar-codigo.dto';

type RequestContext = {
  ip?: string;
  userAgent?: string;
  rota?: string;
  metodoHttp?: string;
};

type TenantPublicoInput = {
  slug?: string;
  dominio?: string;
};

@Injectable()
export class AuthClienteService {
  private readonly logger = new Logger(AuthClienteService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly auditoriaService: AuditoriaService,
    private readonly tenantPublicService: TenantPublicService,
    private readonly configService: ConfigService,
    private readonly sessoesService: SessoesService,
  ) {}

  private async registrarAuditoriaSessaoCliente(params: {
    acao: AcaoAuditoria;
    status: StatusAuditoria;
    mensagem: string;
    clienteId?: string;
    empresaId?: string;
    sessaoId?: string;
    metadata?: Record<string, unknown>;
  }) {
    await this.auditoriaService.registrar({
      empresaId: params.empresaId,
      clienteId: params.clienteId,
      tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
      acao: params.acao,
      status: params.status,
      modulo: 'AUTH_CLIENTE',
      recurso: 'Sessao',
      recursoId: params.sessaoId,
      mensagem: params.mensagem,
      metadata: {
        origem: 'auth_cliente',
        sessaoId: params.sessaoId,
        ...params.metadata,
      },
    });
  }


  private async gerarAccessTokenCliente(
    cliente: {
      id: string;
      telefone: string;
      empresaId: string;
    },
    sessaoId: string,
  ) {
    const expiresIn =
      this.configService.get<string>('JWT_CLIENT_EXPIRES_IN') || '7d';

    const payload = {
      sub: cliente.id,
      clienteId: cliente.id,
      telefone: cliente.telefone,
      role: 'CLIENTE',
      empresaId: cliente.empresaId,
      sid: sessaoId,
      tipo: 'CLIENTE',
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_CLIENT_SECRET'),
      expiresIn: expiresIn as any,
    });

    return {
      accessToken,
      expiresInSeconds: durationToSeconds(expiresIn),
    };
  }

  private async gerarRefreshTokenCliente(
    cliente: {
      id: string;
      empresaId: string;
    },
    sessaoId: string,
  ) {
    const expiresIn =
      this.configService.get<string>('JWT_CLIENT_REFRESH_EXPIRES_IN') || '30d';

    const payload = {
      sub: cliente.id,
      empresaId: cliente.empresaId,
      sid: sessaoId,
      tipo: 'cliente_refresh',
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_CLIENT_REFRESH_SECRET'),
      expiresIn: expiresIn as any,
    });
  }

  private gerarCodigo(): string {
    return randomInt(100000, 1000000).toString();
  }

  private obterOtpSecret(): string {
    const secret = this.configService.get<string>('OTP_SECRET');

    if (!secret) {
      throw new Error('OTP_SECRET nao configurado.');
    }

    return secret;
  }

  private obterOtpExpiresMinutes(): number {
    const raw = this.configService.get<string>('OTP_EXPIRES_MINUTES') || '10';
    const value = Number(raw);

    if (!Number.isInteger(value) || value < 1 || value > 60) {
      return 10;
    }

    return value;
  }

  private gerarCodigoHash(
    codigo: string,
    empresaId: string,
    telefone: string,
  ): string {
    return createHmac('sha256', this.obterOtpSecret())
      .update([empresaId, telefone, codigo].join(':'))
      .digest('hex');
  }

  private validarCodigoHash(
    codigoInformado: string,
    codigoHash: string,
    empresaId: string,
    telefone: string,
  ): boolean {
    const expected = Buffer.from(
      this.gerarCodigoHash(codigoInformado, empresaId, telefone),
    );
    const received = Buffer.from(codigoHash);

    if (expected.length !== received.length) {
      return false;
    }

    return timingSafeEqual(expected, received);
  }

  private normalizarTelefone(telefone: string): string {
    return telefone.trim().replace(/\D/g, '');
  }

  private async resolverTenantPublico(dto: TenantPublicoInput) {
    const temSlug = Boolean(dto.slug?.trim());
    const temDominio = Boolean(dto.dominio?.trim());

    if (!temSlug && !temDominio) {
      throw new BadRequestException(
        'Informe o slug ou domÃ­nio da empresa.',
      );
    }

    if (temSlug && temDominio) {
      throw new BadRequestException(
        'Informe apenas slug ou domÃ­nio, nÃ£o ambos.',
      );
    }

    return this.tenantPublicService.resolverTenantPublico({
      slug: dto.slug,
      dominio: dto.dominio,
    });
  }

  async solicitarCodigo(
    dto: SolicitarCodigoDto,
    context?: RequestContext,
  ) {
    const startedAt = Date.now();

    const tenant = await this.resolverTenantPublico(dto);
    const empresaId = tenant.empresaId;
    const telefone = this.normalizarTelefone(dto.telefone);

    const cliente = await this.prisma.cliente.findFirst({
      where: {
        empresaId,
        telefone,
        ativo: true,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        telefone: true,
        ativoPortal: true,
      },
    });

    if (!cliente) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH_CLIENTE] solicitar codigo cliente nao cadastrado empresaId=${empresaId} clienteId=- status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarFalha({
        empresaId,
        tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
        acao: AcaoAuditoria.SOLICITAR_CODIGO,
        modulo: 'AUTH_CLIENTE',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        mensagem:
          'Tentativa de solicitar cÃ³digo para cliente nÃ£o cadastrado.',
        metadata: {
          telefone,
          tenant: {
            slug: dto.slug,
            dominio: dto.dominio,
          },
          tempoMs,
        },
      });

      throw new NotFoundException(
        'Cliente ainda nÃ£o estÃ¡ cadastrado.',
      );
    }

    if (!cliente.ativoPortal) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH_CLIENTE] solicitar codigo portal desativado empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarFalha({
        empresaId,
        clienteId: cliente.id,
        tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
        acao: AcaoAuditoria.SOLICITAR_CODIGO,
        modulo: 'AUTH_CLIENTE',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        mensagem:
          'Tentativa de solicitar cÃ³digo com portal desativado.',
        metadata: {
          telefone: cliente.telefone,
          tenant: {
            slug: dto.slug,
            dominio: dto.dominio,
          },
          tempoMs,
        },
      });

      throw new ForbiddenException(
        'Acesso ao portal do cliente estÃ¡ desativado.',
      );
    }

    await this.prisma.codigoAcessoCliente.updateMany({
      where: {
        empresaId,
        clienteId: cliente.id,
        telefone: cliente.telefone,
        usado: false,
      },
      data: {
        usado: true,
      },
    });

    const codigo = this.gerarCodigo();
    const codigoHash = this.gerarCodigoHash(
      codigo,
      empresaId,
      cliente.telefone,
    );

    const expiraEm = new Date();
    expiraEm.setMinutes(
      expiraEm.getMinutes() + this.obterOtpExpiresMinutes(),
    );

    await this.prisma.codigoAcessoCliente.create({
      data: {
        empresaId,
        clienteId: cliente.id,
        telefone: cliente.telefone,
        codigo: 'HASHED',
        codigoHash,
        expiraEm,
      },
    });

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[AUTH_CLIENTE] solicitar codigo sucesso empresaId=${empresaId} clienteId=${cliente.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarSucesso({
      empresaId,
      clienteId: cliente.id,
      tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
      acao: AcaoAuditoria.SOLICITAR_CODIGO,
      modulo: 'AUTH_CLIENTE',
      rota: context?.rota,
      metodoHttp: context?.metodoHttp,
      ip: context?.ip,
      userAgent: context?.userAgent,
      mensagem: 'CÃ³digo de acesso do cliente solicitado com sucesso.',
      metadata: {
        telefone: cliente.telefone,
        expiraEm,
        tenant: {
          slug: dto.slug,
          dominio: dto.dominio,
        },
        tempoMs,
      },
    });

    return {
      message: 'CÃ³digo gerado com sucesso.',
      empresa: {
        empresaId: tenant.empresaId,
        nome: tenant.nome,
        slug: tenant.slug,
        dominio: tenant.dominio,
        logo: tenant.logo,
      },
      codigoDesenvolvimento:
        process.env.NODE_ENV === 'production' ? undefined : codigo,
    };
  }

  async verificarCodigo(
    dto: VerificarCodigoDto,
    context?: RequestContext,
  ) {
    const startedAt = Date.now();

    const tenant = await this.resolverTenantPublico(dto);
    const empresaId = tenant.empresaId;
    const telefone = this.normalizarTelefone(dto.telefone);

    const cliente = await this.prisma.cliente.findFirst({
      where: {
        empresaId,
        telefone,
        ativo: true,
      },
    });

    if (!cliente) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH_CLIENTE] verificar codigo cliente nao encontrado empresaId=${empresaId} clienteId=- status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarFalha({
        empresaId,
        tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
        acao: AcaoAuditoria.VERIFICAR_CODIGO,
        modulo: 'AUTH_CLIENTE',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        mensagem:
          'Tentativa de verificar cÃ³digo para cliente nÃ£o encontrado.',
        metadata: {
          telefone,
          tenant: {
            slug: dto.slug,
            dominio: dto.dominio,
          },
          tempoMs,
        },
      });

      throw new NotFoundException('Cliente nÃ£o encontrado.');
    }

    if (!cliente.ativoPortal) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH_CLIENTE] verificar codigo portal desativado empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarFalha({
        empresaId,
        clienteId: cliente.id,
        tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
        acao: AcaoAuditoria.VERIFICAR_CODIGO,
        modulo: 'AUTH_CLIENTE',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        mensagem:
          'Tentativa de verificar cÃ³digo com portal desativado.',
        metadata: {
          telefone: cliente.telefone,
          tenant: {
            slug: dto.slug,
            dominio: dto.dominio,
          },
          tempoMs,
        },
      });

      throw new ForbiddenException(
        'Acesso ao portal do cliente estÃ¡ desativado.',
      );
    }

    const codigo = await this.prisma.codigoAcessoCliente.findFirst({
      where: {
        empresaId,
        clienteId: cliente.id,
        telefone,
        usado: false,
        expiraEm: {
          gte: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const codigoValido =
      Boolean(codigo?.codigoHash) &&
      this.validarCodigoHash(
        dto.codigo,
        codigo!.codigoHash!,
        empresaId,
        telefone,
      );

    if (!codigo || !codigoValido) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH_CLIENTE] codigo invalido ou expirado empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarFalha({
        empresaId,
        clienteId: cliente.id,
        tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
        acao: AcaoAuditoria.VERIFICAR_CODIGO,
        modulo: 'AUTH_CLIENTE',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        mensagem: 'CÃ³digo invÃ¡lido ou expirado.',
        metadata: {
          telefone: cliente.telefone,
          tenant: {
            slug: dto.slug,
            dominio: dto.dominio,
          },
          tempoMs,
        },
      });

      throw new UnauthorizedException('CÃ³digo invÃ¡lido ou expirado.');
    }

    const codigoAtualizado =
      await this.prisma.codigoAcessoCliente.updateMany({
        where: {
          id: codigo.id,
          empresaId,
          clienteId: cliente.id,
          usado: false,
        },
        data: {
          usado: true,
        },
      });

    if (codigoAtualizado.count === 0) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH_CLIENTE] codigo ja utilizado empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarFalha({
        empresaId,
        clienteId: cliente.id,
        tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
        acao: AcaoAuditoria.VERIFICAR_CODIGO,
        modulo: 'AUTH_CLIENTE',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        mensagem: 'CÃ³digo jÃ¡ utilizado.',
        metadata: {
          telefone: cliente.telefone,
          tenant: {
            slug: dto.slug,
            dominio: dto.dominio,
          },
          tempoMs,
        },
      });

      throw new BadRequestException(
        'Este cÃ³digo jÃ¡ foi utilizado.',
      );
    }

    const clienteAtualizado = await this.prisma.cliente.updateMany({
      where: {
        id: cliente.id,
        empresaId,
        ativo: true,
      },
      data: {
        ultimoAcessoPortal: new Date(),
      },
    });

    if (clienteAtualizado.count === 0) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH_CLIENTE] falha atualizar ultimo acesso empresaId=${empresaId} clienteId=${cliente.id} status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarFalha({
        empresaId,
        clienteId: cliente.id,
        tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
        acao: AcaoAuditoria.LOGIN_CLIENTE,
        modulo: 'AUTH_CLIENTE',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        mensagem:
          'Falha ao atualizar Ãºltimo acesso do cliente.',
        metadata: {
          telefone: cliente.telefone,
          tenant: {
            slug: dto.slug,
            dominio: dto.dominio,
          },
          tempoMs,
        },
      });

      throw new UnauthorizedException('Cliente nÃ£o encontrado.');
    }

    const clienteFinal = await this.me(cliente.id, empresaId);

    const sessaoId = randomUUID();

    const refreshToken = await this.gerarRefreshTokenCliente(
      clienteFinal,
      sessaoId,
    );

    const refreshExpiresIn =
      this.configService.get<string>('JWT_CLIENT_REFRESH_EXPIRES_IN') || '30d';

    const device = parseUserAgent(context?.userAgent);

    await this.sessoesService.criarSessao({
      id: sessaoId,
      empresaId,
      usuarioId: null,
      clienteId: clienteFinal.id,
      refreshToken,
      dispositivo: device.dispositivo,
      sistemaOperacional: device.sistemaOperacional,
      navegador: device.navegador,
      userAgent: device.userAgent,
      ip: context?.ip,
      expiraEm: durationToDate(refreshExpiresIn),
    });

    const access = await this.gerarAccessTokenCliente(
      clienteFinal,
      sessaoId,
    );

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[AUTH_CLIENTE] login cliente sucesso empresaId=${empresaId} clienteId=${clienteFinal.id} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarLoginCliente({
      empresaId,
      clienteId: clienteFinal.id,
      tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
      modulo: 'AUTH_CLIENTE',
      rota: context?.rota,
      metodoHttp: context?.metodoHttp,
      ip: context?.ip,
      userAgent: context?.userAgent,
      status: StatusAuditoria.SUCESSO,
      mensagem: 'Login do cliente realizado com sucesso.',
      metadata: {
        telefone: clienteFinal.telefone,
        primeiroAcesso: clienteFinal.aceitouTermos === false,
        tenant: {
          slug: dto.slug,
          dominio: dto.dominio,
        },
        tempoMs,
      },
    });

    return {
      access_token: access.accessToken,
      refresh_token: refreshToken,
      expires_in: access.expiresInSeconds,
      primeiroAcesso: clienteFinal.aceitouTermos === false,
      empresa: {
        empresaId: tenant.empresaId,
        nome: tenant.nome,
        slug: tenant.slug,
        dominio: tenant.dominio,
        logo: tenant.logo,
      },
      cliente: clienteFinal,
    };
  }

  async refreshCliente(dto: RefreshClienteTokenDto) {
    let payload: any;

    try {
      payload = await this.jwtService.verifyAsync(dto.refreshToken, {
        secret: this.configService.getOrThrow<string>(
          'JWT_CLIENT_REFRESH_SECRET',
        ),
      });
    } catch {
      throw new UnauthorizedException('Refresh token invÃ¡lido.');
    }

    if (payload?.tipo !== 'cliente_refresh') {
      throw new UnauthorizedException('Refresh token invÃ¡lido para Cliente.');
    }

    if (!payload?.sid || !payload?.sub) {
      throw new UnauthorizedException('Refresh token sem sessÃ£o vÃ¡lida.');
    }

    const sessao = await this.prisma.sessao.findFirst({
      where: {
        id: payload.sid,
        clienteId: payload.sub,
        usuarioId: null,
      },
      include: {
        cliente: {
          include: {
            empresa: true,
          },
        },
      },
    });

    if (!sessao || sessao.revogada || sessao.expiraEm <= new Date()) {
      throw new UnauthorizedException('SessÃ£o invÃ¡lida ou expirada.');
    }

    const refreshValido = await this.sessoesService.validarHash(
      dto.refreshToken,
      sessao.refreshTokenHash,
    );

    if (!refreshValido) {
      await this.prisma.sessao.updateMany({
        where: {
          id: sessao.id,
          clienteId: sessao.clienteId,
          usuarioId: null,
        },
        data: {
          revogada: true,
        },
      });

      throw new UnauthorizedException('Refresh token reutilizado ou invÃ¡lido.');
    }

    const cliente = sessao.cliente;

    if (!cliente || !cliente.ativo || !cliente.ativoPortal) {
      throw new UnauthorizedException('Cliente inativo ou sem acesso ao portal.');
    }

    if (!cliente.empresa || !cliente.empresa.ativo) {
      throw new UnauthorizedException('Empresa inativa ou inexistente.');
    }

    const novoRefreshToken = await this.gerarRefreshTokenCliente(
      cliente,
      sessao.id,
    );

    const refreshExpiresIn =
      this.configService.get<string>('JWT_CLIENT_REFRESH_EXPIRES_IN') || '30d';

    await this.sessoesService.rotacionarRefreshToken(
      sessao.id,
      novoRefreshToken,
      durationToDate(refreshExpiresIn),
    );

    const access = await this.gerarAccessTokenCliente(cliente, sessao.id);

    await this.registrarAuditoriaSessaoCliente({
      empresaId: cliente.empresaId,
      clienteId: cliente.id,
      sessaoId: sessao.id,
      acao: AcaoAuditoria.REFRESH_CLIENTE,
      status: StatusAuditoria.SUCESSO,
      mensagem: 'Refresh token Cliente rotacionado com sucesso.',
      metadata: {
        telefone: cliente.telefone,
      },
    });

    return {
      access_token: access.accessToken,
      refresh_token: novoRefreshToken,
      expires_in: access.expiresInSeconds,
      primeiroAcesso: cliente.aceitouTermos === false,
    };
  }

  async logoutCliente(clienteLogado: any, dto: LogoutClienteDto) {
    const sessaoId = clienteLogado?.sessaoId || clienteLogado?.sid;
    const clienteId =
      clienteLogado?.clienteId || clienteLogado?.id || clienteLogado?.sub;

    if (!sessaoId || !clienteId) {
      throw new UnauthorizedException('SessÃ£o nÃ£o identificada.');
    }

    const sessao = await this.prisma.sessao.findFirst({
      where: {
        id: sessaoId,
        clienteId,
        usuarioId: null,
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
        'Refresh token nÃ£o pertence Ã  sessÃ£o atual.',
      );
    }

    await this.sessoesService.revogarSessaoCliente(sessao.id, clienteId);

    await this.registrarAuditoriaSessaoCliente({
      empresaId: clienteLogado?.empresaId,
      clienteId,
      sessaoId: sessao.id,
      acao: AcaoAuditoria.LOGOUT_CLIENTE,
      status: StatusAuditoria.SUCESSO,
      mensagem: 'Logout Cliente realizado com sucesso.',
    });

    return {
      message: 'Logout realizado com sucesso.',
    };
  }

  async logoutAllCliente(clienteLogado: any) {
    const clienteId =
      clienteLogado?.clienteId || clienteLogado?.id || clienteLogado?.sub;

    if (!clienteId) {
      throw new UnauthorizedException('Cliente nÃ£o identificado.');
    }

    const result =
      await this.sessoesService.revogarTodasSessoesCliente(clienteId);

    await this.registrarAuditoriaSessaoCliente({
      empresaId: clienteLogado?.empresaId,
      clienteId,
      acao: AcaoAuditoria.LOGOUT_ALL_CLIENTE,
      status: StatusAuditoria.SUCESSO,
      mensagem: 'Logout global Cliente realizado com sucesso.',
      metadata: {
        totalRevogadas: result.count,
      },
    });

    return {
      message: 'Todas as sessÃµes foram encerradas com sucesso.',
      totalRevogadas: result.count,
    };
  }

  async listarSessoesCliente(clienteLogado: any) {
    const clienteId =
      clienteLogado?.clienteId || clienteLogado?.id || clienteLogado?.sub;

    if (!clienteId) {
      throw new UnauthorizedException('Cliente nÃ£o identificado.');
    }

    return this.sessoesService.listarSessoesCliente(clienteId);
  }


  async me(clienteId: string, empresaId: string) {
    const cliente = await this.prisma.cliente.findFirst({
      where: {
        id: clienteId,
        empresaId,
        ativo: true,
      },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        telefone: true,
        email: true,
        foto: true,
        dataNascimento: true,
        ultimoAcessoPortal: true,
        aceitouTermos: true,
        dataAceiteTermos: true,
        ativoPortal: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!cliente) {
      throw new UnauthorizedException('Cliente nÃ£o encontrado.');
    }

    if (!cliente.ativoPortal) {
      throw new ForbiddenException(
        'Acesso ao portal do cliente estÃ¡ desativado.',
      );
    }

    return cliente;
  }

  async aceitarTermos(
    clienteId: string,
    empresaId: string,
    dto: AceitarTermosDto,
    context?: RequestContext,
  ) {
    const startedAt = Date.now();

    if (!dto.aceitouTermos) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH_CLIENTE] aceitar termos recusado empresaId=${empresaId} clienteId=${clienteId} status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarFalha({
        empresaId,
        clienteId,
        tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
        acao: AcaoAuditoria.ACEITAR_TERMOS,
        modulo: 'AUTH_CLIENTE',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        mensagem:
          'Cliente tentou prosseguir sem aceitar os termos.',
        metadata: {
          tempoMs,
        },
      });

      throw new BadRequestException(
        'Ã‰ necessÃ¡rio aceitar os termos.',
      );
    }

    const resultado = await this.prisma.cliente.updateMany({
      where: {
        id: clienteId,
        empresaId,
        ativo: true,
        ativoPortal: true,
      },
      data: {
        aceitouTermos: true,
        dataAceiteTermos: new Date(),
        ultimoAcessoPortal: new Date(),
      },
    });

    if (resultado.count === 0) {
      const tempoMs = Date.now() - startedAt;

      this.logger.warn(
        `[AUTH_CLIENTE] aceitar termos cliente nao encontrado empresaId=${empresaId} clienteId=${clienteId} status=FALHA tempoMs=${tempoMs}`,
      );

      await this.auditoriaService.registrarFalha({
        empresaId,
        clienteId,
        tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
        acao: AcaoAuditoria.ACEITAR_TERMOS,
        modulo: 'AUTH_CLIENTE',
        rota: context?.rota,
        metodoHttp: context?.metodoHttp,
        ip: context?.ip,
        userAgent: context?.userAgent,
        mensagem:
          'Falha ao aceitar termos: cliente nÃ£o encontrado.',
        metadata: {
          tempoMs,
        },
      });

      throw new UnauthorizedException('Cliente nÃ£o encontrado.');
    }

    const tempoMs = Date.now() - startedAt;

    this.logger.log(
      `[AUTH_CLIENTE] aceitar termos sucesso empresaId=${empresaId} clienteId=${clienteId} status=SUCESSO tempoMs=${tempoMs}`,
    );

    await this.auditoriaService.registrarSucesso({
      empresaId,
      clienteId,
      tipoUsuario: TipoUsuarioAuditoria.CLIENTE,
      acao: AcaoAuditoria.ACEITAR_TERMOS,
      modulo: 'AUTH_CLIENTE',
      rota: context?.rota,
      metodoHttp: context?.metodoHttp,
      ip: context?.ip,
      userAgent: context?.userAgent,
      mensagem: 'Termos aceitos pelo cliente com sucesso.',
      metadata: {
        tempoMs,
      },
    });

    return this.me(clienteId, empresaId);
  }
}
