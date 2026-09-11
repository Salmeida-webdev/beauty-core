import type { FileFilterCallback } from 'multer';
import type { Request } from 'express';
import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage, memoryStorage } from 'multer';
import { extname, join } from 'path';

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const DOCUMENT_MIME_TYPES = ['application/pdf'];

const ALLOWED_MIME_TYPES = [...IMAGE_MIME_TYPES, ...DOCUMENT_MIME_TYPES];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

const DOCUMENT_EXTENSIONS = ['.pdf'];

const ALLOWED_EXTENSIONS = [...IMAGE_EXTENSIONS, ...DOCUMENT_EXTENSIONS];

const BLOCKED_EXTENSIONS = [
  '.exe',
  '.bat',
  '.cmd',
  '.js',
  '.sh',
  '.apk',
  '.dll',
  '.msi',
  '.scr',
  '.php',
  '.jar',
  '.ps1',
  '.vbs',
];

function normalizeExtension(filename: string) {
  return extname(filename).toLowerCase();
}

function isDocumentUpload(pasta: string) {
  return pasta === 'documentos';
}

function getFileSizeLimit(pasta: string) {
  if (isDocumentUpload(pasta)) {
    return 10 * 1024 * 1024;
  }

  return 5 * 1024 * 1024;
}

function validateFile(pasta: string, file: Express.Multer.File) {
  const extensao = normalizeExtension(file.originalname);

  if (!extensao) {
    throw new BadRequestException('Arquivo sem extensão não é permitido.');
  }

  if (BLOCKED_EXTENSIONS.includes(extensao)) {
    throw new BadRequestException('Tipo de arquivo não permitido.');
  }

  if (!ALLOWED_EXTENSIONS.includes(extensao)) {
    throw new BadRequestException('Extensão de arquivo não permitida.');
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new BadRequestException('MIME type de arquivo não permitido.');
  }

  if (isDocumentUpload(pasta)) {
    if (
      !DOCUMENT_EXTENSIONS.includes(extensao) ||
      !DOCUMENT_MIME_TYPES.includes(file.mimetype)
    ) {
      throw new BadRequestException(
        'Apenas documentos PDF são permitidos nesta rota.',
      );
    }

    return;
  }

  if (
    !IMAGE_EXTENSIONS.includes(extensao) ||
    !IMAGE_MIME_TYPES.includes(file.mimetype)
  ) {
    throw new BadRequestException(
      'Apenas imagens JPG, PNG ou WEBP são permitidas nesta rota.',
    );
  }
}

export function multerStorageOptions(pasta: string) {
  const destino = join(process.cwd(), 'uploads', pasta);

  if (!existsSync(destino)) {
    mkdirSync(destino, {
      recursive: true,
    });
  }

  return {
    storage: diskStorage({
      destination: destino,

      filename: (_req, file, callback) => {
        const extensao = normalizeExtension(file.originalname);
        const nomeArquivo = `${randomUUID()}${extensao}`;

        callback(null, nomeArquivo);
      },
    }),

    fileFilter: (
      _req: Request,
      file: Express.Multer.File,
      callback: FileFilterCallback,
    ) => {
      try {
        validateFile(pasta, file);
        callback(null, true);
      } catch (error) {
        callback(error as Error);
      }
    },

    limits: {
      fileSize: getFileSizeLimit(pasta),
    },
  };
}

export const chat31BlockedExtensions = [
  '.exe',
  '.dll',
  '.bat',
  '.cmd',
  '.sh',
  '.apk',
  '.jar',
  '.php',
  '.ps1',
  '.scr',
];

export const chat31AllowedMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export const multerMemoryConfig = {
  storage: memoryStorage(),

  fileFilter: (
    _req: Request,

    file: Express.Multer.File,

    callback: FileFilterCallback,
  ) => {
    const originalName = file.originalname || '';
    const lastDotIndex = originalName.lastIndexOf('.');
    const extension =
      lastDotIndex >= 0 ? originalName.slice(lastDotIndex).toLowerCase() : '';

    if (chat31BlockedExtensions.includes(extension)) {
      return callback(
        new BadRequestException('Tipo de arquivo bloqueado por segurança.'),
      );
    }

    if (!chat31AllowedMimeTypes.includes(file.mimetype)) {
      return callback(new BadRequestException('MIME type não permitido.'));
    }

    return callback(null, true);
  },
};

export function getUploadLimitBytes(type: 'image' | 'document' = 'document') {
  const imageMb = Number(
    process.env.UPLOAD_MAX_IMAGE_MB || process.env.MAX_IMAGE_UPLOAD_MB || 5,
  );

  const documentMb = Number(
    process.env.UPLOAD_MAX_DOCUMENT_MB || process.env.MAX_PDF_UPLOAD_MB || 10,
  );

  const selectedMb = type === 'image' ? imageMb : documentMb;

  return selectedMb * 1024 * 1024;
}
