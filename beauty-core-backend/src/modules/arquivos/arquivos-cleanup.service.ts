import { Injectable, Logger } from '@nestjs/common';
import { StatusArquivo } from '@prisma/client';
import { readdir, stat, unlink } from 'fs/promises';
import { join, relative, resolve } from 'path';

import { PrismaService } from '../../database/prisma/prisma.service';
import { LocalStorageService } from './storage/local-storage.service';

interface ArquivoFisicoInfo {
  caminhoRelativo: string;
  tamanhoBytes: number;
  updatedAt: string;
}

@Injectable()
export class ArquivosCleanupService {
  private readonly logger = new Logger(ArquivosCleanupService.name);
  private readonly baseDir = resolve(
    process.cwd(),
    process.env.UPLOADS_DIR || 'uploads',
  );

  constructor(
    private readonly prisma: PrismaService,
    private readonly localStorage: LocalStorageService,
  ) {}

  async gerarRelatorioArquivosOrfaos(empresaId?: string) {
    const arquivosBanco = await this.prisma.arquivo.findMany({
      where: {
        ...(empresaId ? { empresaId } : {}),
        status: {
          not: StatusArquivo.EXCLUIDO,
        },
      },
      select: {
        id: true,
        empresaId: true,
        nomeOriginal: true,
        caminho: true,
        url: true,
        visibilidade: true,
        armazenamento: true,
        privado: true,
        status: true,
        createdAt: true,
      },
    });

    const registrosSemArquivo: Array<Record<string, unknown>> = [];

    for (const arquivo of arquivosBanco) {
      if (!arquivo.caminho) {
        registrosSemArquivo.push({
          ...arquivo,
          motivo: 'REGISTRO_SEM_CAMINHO',
        });

        continue;
      }

      const existeFisicamente = await this.localStorage.exists(arquivo.caminho);

      if (!existeFisicamente) {
        registrosSemArquivo.push({
          ...arquivo,
          motivo: 'REGISTRO_SEM_ARQUIVO_FISICO',
        });
      }
    }

    const caminhosRegistrados = new Set(
      arquivosBanco
        .map((arquivo) => arquivo.caminho)
        .filter(Boolean)
        .map((caminho) => String(caminho).replace(/\\/g, '/')),
    );

    const arquivosFisicos = [
      ...(await this.listarArquivosFisicos('public')),
      ...(await this.listarArquivosFisicos('private')),
    ];

    const arquivosFisicosSemRegistro = arquivosFisicos.filter(
      (arquivo) => !caminhosRegistrados.has(arquivo.caminhoRelativo),
    );

    return {
      empresaId: empresaId ?? null,
      totalRegistrosBanco: arquivosBanco.length,
      totalArquivosFisicosAuditados: arquivosFisicos.length,
      registrosSemArquivo: registrosSemArquivo.length,
      arquivosFisicosSemRegistro: arquivosFisicosSemRegistro.length,
      detalhes: {
        registrosSemArquivo,
        arquivosFisicosSemRegistro,
      },
      geradoEm: new Date().toISOString(),
    };
  }

  async limparArquivosTemp(idadeMinimaHoras = 24) {
    const tempDir = resolve(this.baseDir, 'temp');
    const arquivosTemp = await this.listarArquivosFisicos('temp');

    const agora = Date.now();
    const idadeMinimaMs = idadeMinimaHoras * 60 * 60 * 1000;

    const removidos: ArquivoFisicoInfo[] = [];
    const ignorados: ArquivoFisicoInfo[] = [];

    for (const arquivo of arquivosTemp) {
      const caminhoAbsoluto = resolve(this.baseDir, arquivo.caminhoRelativo);

      if (!caminhoAbsoluto.startsWith(tempDir)) {
        ignorados.push(arquivo);
        continue;
      }

      const idadeMs = agora - new Date(arquivo.updatedAt).getTime();

      if (idadeMs < idadeMinimaMs) {
        ignorados.push(arquivo);
        continue;
      }

      await unlink(caminhoAbsoluto);
      removidos.push(arquivo);
    }

    return {
      idadeMinimaHoras,
      totalAuditados: arquivosTemp.length,
      removidos: removidos.length,
      ignorados: ignorados.length,
      detalhes: {
        removidos,
        ignorados,
      },
      executadoEm: new Date().toISOString(),
    };
  }

  private async listarArquivosFisicos(
    subpasta: 'public' | 'private' | 'temp',
  ): Promise<ArquivoFisicoInfo[]> {
    const raiz = resolve(this.baseDir, subpasta);

    try {
      return await this.walk(raiz);
    } catch {
      return [];
    }
  }

  private async walk(dir: string): Promise<ArquivoFisicoInfo[]> {
    const entries = await readdir(dir, { withFileTypes: true });
    const arquivos: ArquivoFisicoInfo[] = [];

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        arquivos.push(...(await this.walk(fullPath)));
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const info = await stat(fullPath);

      arquivos.push({
        caminhoRelativo: relative(this.baseDir, fullPath).replace(/\\/g, '/'),
        tamanhoBytes: info.size,
        updatedAt: info.mtime.toISOString(),
      });
    }

    return arquivos;
  }
}
