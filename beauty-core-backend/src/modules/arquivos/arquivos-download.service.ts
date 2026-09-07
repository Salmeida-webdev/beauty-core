import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AcaoAuditoria, Arquivo, StatusArquivo, StatusAuditoria, TipoUsuarioAuditoria } from '@prisma/client';
import { ReadStream } from 'fs';

import { PrismaService } from '../../database/prisma/prisma.service';
import { ArquivoAccessPolicyService } from './arquivo-access-policy.service';
import { LocalStorageService } from './storage/local-storage.service';
import { StorageFactory } from './storage/storage.factory';
import { AuditoriaService } from '../auditoria/auditoria.service';

interface AuthenticatedFileUser {
  sub?: string;
  id?: string;
  usuarioId?: string;
  clienteId?: string;
  empresaId?: string;
  role?: string;
}

interface DownloadResult {
  arquivo: Arquivo;
  stream: ReadStream;
}

@Injectable()
export class ArquivosDownloadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageFactory: StorageFactory,
    private readonly localStorage: LocalStorageService,
    private readonly accessPolicy: ArquivoAccessPolicyService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async downloadProtegido(
    id: string,
    user: AuthenticatedFileUser,
  ): Promise<DownloadResult> {
    if (!user?.empresaId) {
      throw new ForbiddenException('Empresa não identificada no token.');
    }

    const arquivo = await this.prisma.arquivo.findFirst({
      where: {
        id,
        empresaId: user.empresaId,
        status: StatusArquivo.ATIVO,
      },
    });

    if (!arquivo) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    this.accessPolicy.assertCanAccess(user, arquivo);

    const stream = await this.criarStreamComValidacao(arquivo);

    await this.incrementarDownload(arquivo.id, arquivo.empresaId);

    await this.registrarAuditoriaArquivo({
      arquivo,
      user,
      acao: 'DOWNLOAD_ARQUIVO' as AcaoAuditoria,
      origem: 'download_protegido',
      mensagem: 'Download protegido de arquivo realizado com sucesso.',
    });

    return {
      arquivo,
      stream,
    };
  }

  async gerarSignedUrl(id: string, user: AuthenticatedFileUser) {
    if (!user?.empresaId) {
      throw new ForbiddenException('Empresa não identificada no token.');
    }

    const arquivo = await this.prisma.arquivo.findFirst({
      where: {
        id,
        empresaId: user.empresaId,
        status: StatusArquivo.ATIVO,
      },
    });

    if (!arquivo) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    this.accessPolicy.assertCanAccess(user, arquivo);

    const expiresIn = Number(process.env.SIGNED_URL_EXPIRATION || 300);

    const storage = this.storageFactory.getProvider();

    const signedUrl = await storage.generateSignedUrl(
      arquivo.id,
      arquivo.empresaId,
      expiresIn,
    );

    await this.registrarAuditoriaArquivo({
      arquivo,
      user,
      acao: 'URL_ASSINADA' as AcaoAuditoria,
      origem: 'signed_url',
      mensagem: 'URL assinada gerada com sucesso.',
    });

    return signedUrl;
  }

  async downloadPorSignedToken(token: string): Promise<DownloadResult> {
    const payload = this.localStorage.validateSignedToken(token);

    const arquivo = await this.prisma.arquivo.findFirst({
      where: {
        id: payload.arquivoId,
        empresaId: payload.empresaId,
        status: StatusArquivo.ATIVO,
      },
    });

    if (!arquivo) {
      throw new NotFoundException('Arquivo não encontrado.');
    }

    const stream = await this.criarStreamComValidacao(arquivo);

    await this.incrementarDownload(arquivo.id, arquivo.empresaId);

    await this.registrarAuditoriaArquivo({
      arquivo,
      acao: 'DOWNLOAD_ARQUIVO' as AcaoAuditoria,
      origem: 'download_signed_url',
      mensagem: 'Download por URL assinada realizado com sucesso.',
    });

    return {
      arquivo,
      stream,
    };
  }

  private async criarStreamComValidacao(arquivo: Arquivo): Promise<ReadStream> {
    if (!arquivo.caminho) {
      throw new NotFoundException('Caminho físico do arquivo não encontrado.');
    }

    const storage = this.storageFactory.getProvider();

    const existe = await storage.exists(arquivo.caminho);

    if (!existe) {
      throw new NotFoundException('Arquivo físico não encontrado.');
    }

    return storage.download(arquivo.caminho);
  }

  private async incrementarDownload(id: string, empresaId: string) {
    await this.prisma.arquivo.updateMany({
      where: {
        id,
        empresaId,
      },
      data: {
        downloadCount: {
          increment: 1,
        },
        ultimoDownloadEm: new Date(),
      },
    });
  }


  private async registrarAuditoriaArquivo(params: {
    arquivo: Arquivo;
    user?: AuthenticatedFileUser;
    acao: AcaoAuditoria;
    mensagem: string;
    origem: string;
  }) {
    await this.auditoriaService.registrar({
      empresaId: params.arquivo.empresaId,
      usuarioId:
        params.user?.role === 'CLIENTE'
          ? undefined
          : params.user?.usuarioId || params.user?.sub || params.user?.id,
      clienteId:
        params.user?.role === 'CLIENTE'
          ? params.user?.clienteId || params.user?.sub || params.user?.id
          : undefined,
      tipoUsuario: TipoUsuarioAuditoria.SISTEMA,
      acao: params.acao,
      status: 'SUCESSO' as StatusAuditoria,
      modulo: 'ARQUIVOS',
      recurso: 'Arquivo',
      recursoId: params.arquivo.id,
      metadata: {
        origem: params.origem,
        nomeOriginal: params.arquivo.nomeOriginal,
        mimeType: params.arquivo.mimeType,
        tamanhoBytes: params.arquivo.tamanhoBytes,
        visibilidade: params.arquivo.visibilidade,
        armazenamento: params.arquivo.armazenamento,
        privado: params.arquivo.privado,
        checksum: params.arquivo.checksum,
      },
      mensagem: params.mensagem,
    });
  }

}
