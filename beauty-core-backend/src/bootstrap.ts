import * as bcrypt from 'bcrypt';
import { PrismaClient, PlanoEmpresa, Role } from '@prisma/client';

const prisma = new PrismaClient();

const valueOrDefault = (name: string, fallback: string): string => {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : fallback;
};

async function main(): Promise<void> {
  const existingUser = await prisma.usuario.findFirst({
    select: { id: true },
  });

  if (existingUser) return;

  const empresa = await prisma.empresa.upsert({
    where: { slug: valueOrDefault('SEED_EMPRESA_SLUG', 'beauty-core-demo') },
    update: { ativo: true },
    create: {
      nome: valueOrDefault('SEED_EMPRESA_NOME', 'Beauty Core Demo'),
      slug: valueOrDefault('SEED_EMPRESA_SLUG', 'beauty-core-demo'),
      email: valueOrDefault('SEED_EMPRESA_EMAIL', 'demo@beautycore.com'),
      telefone: valueOrDefault('SEED_EMPRESA_TELEFONE', '11999999999'),
      plano: PlanoEmpresa.PREMIUM,
      ativo: true,
    },
  });

  const adminEmail = valueOrDefault('SEED_ADMIN_EMAIL', 'admin@beautycore.com');
  const adminPassword = valueOrDefault('SEED_ADMIN_PASSWORD', 'Admin@123');

  await prisma.usuario.create({
    data: {
      empresaId: empresa.id,
      nome: valueOrDefault('SEED_ADMIN_NOME', 'Admin Demo'),
      email: adminEmail,
      senha: await bcrypt.hash(adminPassword, 10),
      role: Role.ADMIN,
      ativo: true,
    },
  });
}

main()
  .catch((error) => {
    console.error('Bootstrap inicial falhou:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
