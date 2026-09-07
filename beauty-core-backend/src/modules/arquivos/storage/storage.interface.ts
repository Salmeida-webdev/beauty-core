import { ReadStream } from 'fs';
import { ArquivoVisibilidade, TipoArquivo } from '@prisma/client';

export interface StorageUploadInput {
  file: Express.Multer.File;
  empresaId: string;
  tipo: TipoArquivo;
  visibilidade: ArquivoVisibilidade;
  subdiretorio?: string;
}

export interface StorageUploadResult {
  nomeArquivo: string;
  caminhoRelativo: string;
  caminhoAbsoluto: string;
  url: string | null;
  checksum: string;
  tamanhoBytes: number;
  mimeType: string;
}

export interface SignedUrlResult {
  url: string;
  expiresIn: number;
}

export interface StorageProvider {
  upload(input: StorageUploadInput): Promise<StorageUploadResult>;

  download(caminhoRelativo: string): Promise<ReadStream>;

  delete(caminhoRelativo: string): Promise<void>;

  exists(caminhoRelativo: string): Promise<boolean>;

  generateSignedUrl(
    arquivoId: string,
    empresaId: string,
    expiresInSeconds: number,
  ): Promise<SignedUrlResult>;
}
