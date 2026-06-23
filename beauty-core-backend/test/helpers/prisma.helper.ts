import { Prisma, PrismaClient } from '@prisma/client';

export function assertTestDatabase() {
  const databaseUrl = process.env.DATABASE_URL_TEST ?? process.env.DATABASE_URL;

  if (!databaseUrl || !/beauty_core_test|_test/i.test(databaseUrl)) {
    throw new Error('Execução bloqueada: banco de teste inválido.');
  }
}

export function createTestPrismaClient() {
  assertTestDatabase();

  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL_TEST
      }
    }
  });
}

export async function resetTestDatabase(prisma: PrismaClient) {
  assertTestDatabase();

  const tables = await prisma.$queryRawUnsafe<Array<{ tablename: string }>>(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'"
  );

  if (!tables.length) {
    return;
  }

  const tableNames = tables.map((table) => '"public"."' + table.tablename + '"').join(', ');

  await prisma.$executeRawUnsafe('TRUNCATE TABLE ' + tableNames + ' RESTART IDENTITY CASCADE;');
}

export function modelExists(modelName: string) {
  return Prisma.dmmf.datamodel.models.some((model) => model.name === modelName);
}


