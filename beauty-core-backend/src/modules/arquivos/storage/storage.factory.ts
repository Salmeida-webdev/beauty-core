import { Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TipoArmazenamento } from '@prisma/client';
import { LocalStorageService } from './local-storage.service';
import { S3StorageService } from './providers/s3-storage.service';
import { StorageProvider } from './storage.interface';

@Injectable()
export class StorageFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly localStorage: LocalStorageService,
    private readonly s3Storage: S3StorageService,
  ) {}

  getProvider(): StorageProvider {
    const provider = this.getTipoArmazenamento();

    switch (provider) {
      case TipoArmazenamento.LOCAL:
        return this.localStorage;

      case TipoArmazenamento.S3:
        return this.s3Storage;

      case TipoArmazenamento.CLOUDINARY:
        throw new NotImplementedException(
          'Provider Cloudinary preparado, mas ainda não implementado.',
        );

      default:
        return this.localStorage;
    }
  }

  getTipoArmazenamento(): TipoArmazenamento {
    const provider =
      this.config.get<string>('STORAGE_PROVIDER') || TipoArmazenamento.LOCAL;

    if (
      provider === TipoArmazenamento.LOCAL ||
      provider === TipoArmazenamento.S3 ||
      provider === TipoArmazenamento.CLOUDINARY
    ) {
      return provider;
    }

    return TipoArmazenamento.LOCAL;
  }
}
