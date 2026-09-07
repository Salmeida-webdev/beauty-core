import { Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TipoArmazenamento } from '@prisma/client';
import { LocalStorageService } from './local-storage.service';
import { StorageProvider } from './storage.interface';

@Injectable()
export class StorageFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly localStorage: LocalStorageService,
  ) {}

  getProvider(): StorageProvider {
    const provider = this.getTipoArmazenamento();

    switch (provider) {
      case TipoArmazenamento.LOCAL:
        return this.localStorage;

      case TipoArmazenamento.S3:
        throw new NotImplementedException(
          'Provider S3 preparado, mas ainda não implementado.',
        );

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
