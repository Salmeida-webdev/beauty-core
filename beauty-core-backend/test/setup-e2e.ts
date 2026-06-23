import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { AppModule } from '../src/app.module';
import { createTestPrismaClient, resetTestDatabase } from './helpers/prisma.helper';
import { seedTestDatabase, TestSeedResult } from './seeds/test-seed';

export type E2eContext = {
  app: INestApplication;
  prisma: PrismaClient;
  seed: TestSeedResult;
};

export async function bootstrapE2eTestApp(): Promise<E2eContext> {
  const prisma = createTestPrismaClient();

  await prisma.$connect();
  await resetTestDatabase(prisma);
  const seed = await seedTestDatabase(prisma);

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  await app.init();

  return {
    app,
    prisma,
    seed
  };
}

export async function teardownE2eTestApp(ctx?: Partial<E2eContext>) {
  if (ctx?.app) {
    await ctx.app.close();
  }

  if (ctx?.prisma) {
    await ctx.prisma.$disconnect();
  }
}


