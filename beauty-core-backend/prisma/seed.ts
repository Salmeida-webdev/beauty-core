import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import {
  CanalWhatsApp,
  CategoriaFinanceiraTipo,
  PlanoEmpresa,
  PrismaClient,
  Role,
} from '@prisma/client';

const prisma = new PrismaClient();

function getEnv(name: string, fallback: string): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    return fallback;
  }

  return value.trim();
}

async function seedCategoriasFinanceiras(empresaId: string) {
  const categorias = [
    {
      nome: 'Serviços',
      tipo: CategoriaFinanceiraTipo.RECEITA,
    },
    {
      nome: 'Produtos',
      tipo: CategoriaFinanceiraTipo.RECEITA,
    },
    {
      nome: 'Pacotes',
      tipo: CategoriaFinanceiraTipo.RECEITA,
    },
    {
      nome: 'Marketing',
      tipo: CategoriaFinanceiraTipo.DESPESA,
    },
    {
      nome: 'Aluguel',
      tipo: CategoriaFinanceiraTipo.DESPESA,
    },
    {
      nome: 'Fornecedores',
      tipo: CategoriaFinanceiraTipo.DESPESA,
    },
  ];

  for (const categoria of categorias) {
    const existente = await prisma.categoriaFinanceira.findFirst({
      where: {
        empresaId,
        nome: categoria.nome,
        tipo: categoria.tipo,
      },
    });

    if (!existente) {
      await prisma.categoriaFinanceira.create({
        data: {
          empresaId,
          nome: categoria.nome,
          tipo: categoria.tipo,
          ativo: true,
        },
      });
    }
  }
}

async function main() {
  const empresaNome = getEnv('SEED_EMPRESA_NOME', 'Beauty Core Demo');
  const empresaSlug = getEnv('SEED_EMPRESA_SLUG', 'beauty-core-demo');
  const empresaEmail = getEnv('SEED_EMPRESA_EMAIL', 'demo@beautycore.com');
  const empresaTelefone = getEnv('SEED_EMPRESA_TELEFONE', '11999999999');

  const superAdminNome = getEnv('SEED_SUPER_ADMIN_NOME', 'Super Admin');
  const superAdminEmail = getEnv(
    'SEED_SUPER_ADMIN_EMAIL',
    'superadmin@beautycore.com',
  );
  const superAdminPassword = getEnv(
    'SEED_SUPER_ADMIN_PASSWORD',
    'SuperAdmin@123',
  );

  const adminNome = getEnv('SEED_ADMIN_NOME', 'Admin Demo');
  const adminEmail = getEnv('SEED_ADMIN_EMAIL', 'admin@beautycore.com');
  const adminPassword = getEnv('SEED_ADMIN_PASSWORD', 'Admin@123');

  if (superAdminEmail.toLowerCase() === adminEmail.toLowerCase()) {
    throw new Error(
      'SEED_SUPER_ADMIN_EMAIL e SEED_ADMIN_EMAIL não podem ser iguais.',
    );
  }

  const empresa = await prisma.empresa.upsert({
    where: {
      slug: empresaSlug,
    },
    update: {
      nome: empresaNome,
      telefone: empresaTelefone,
      email: empresaEmail,
      corPrimaria: '#111827',
      plano: PlanoEmpresa.PREMIUM,
      ativo: true,
    },
    create: {
      nome: empresaNome,
      slug: empresaSlug,
      telefone: empresaTelefone,
      email: empresaEmail,
      corPrimaria: '#111827',
      plano: PlanoEmpresa.PREMIUM,
      ativo: true,
    },
  });

  const superAdminSenhaHash = await bcrypt.hash(superAdminPassword, 10);

  const superAdmin = await prisma.usuario.upsert({
    where: {
      email: superAdminEmail,
    },
    update: {
      empresaId: null,
      nome: superAdminNome,
      senha: superAdminSenhaHash,
      role: Role.SUPER_ADMIN,
      ativo: true,
    },
    create: {
      empresaId: null,
      nome: superAdminNome,
      email: superAdminEmail,
      senha: superAdminSenhaHash,
      role: Role.SUPER_ADMIN,
      ativo: true,
    },
  });

  const adminSenhaHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.usuario.upsert({
    where: {
      email: adminEmail,
    },
    update: {
      empresaId: empresa.id,
      nome: adminNome,
      senha: adminSenhaHash,
      role: Role.ADMIN,
      ativo: true,
    },
    create: {
      empresaId: empresa.id,
      nome: adminNome,
      email: adminEmail,
      senha: adminSenhaHash,
      role: Role.ADMIN,
      ativo: true,
    },
  });

  await prisma.configuracaoFidelidade.upsert({
    where: {
      empresaId: empresa.id,
    },
    update: {
      fidelidadeAtiva: true,
      pontuacaoAutomatica: false,
      pontosPorReal: 1,
      reaisPorPonto: 0.1,
      pontosParaResgate: 100,
      valorResgate: 10,
      niveisAtivos: false,
      beneficiosAutomaticos: false,
      cupomAniversarioAtivo: false,
      bonusAniversarioAtivo: false,
      bonusAniversarioPontos: 50,
      automacoesAtivas: false,
    },
    create: {
      empresaId: empresa.id,
      fidelidadeAtiva: true,
      pontuacaoAutomatica: false,
      pontosPorReal: 1,
      reaisPorPonto: 0.1,
      pontosParaResgate: 100,
      valorResgate: 10,
      niveisAtivos: false,
      beneficiosAutomaticos: false,
      cupomAniversarioAtivo: false,
      bonusAniversarioAtivo: false,
      bonusAniversarioPontos: 50,
      automacoesAtivas: false,
    },
  });

  await prisma.configuracaoNotificacao.upsert({
    where: {
      empresaId: empresa.id,
    },
    update: {
      notificarAgendamentos: true,
      notificarFinanceiro: true,
      notificarFidelidade: true,
      notificarPacotes: true,
      notificarClientes: true,
      notificarMarketing: false,
    },
    create: {
      empresaId: empresa.id,
      notificarAgendamentos: true,
      notificarFinanceiro: true,
      notificarFidelidade: true,
      notificarPacotes: true,
      notificarClientes: true,
      notificarMarketing: false,
    },
  });

  await prisma.configuracaoWhatsApp.upsert({
    where: {
      empresaId: empresa.id,
    },
    update: {
      ativo: true,
      canal: CanalWhatsApp.MODO_DEMONSTRACAO,
      numeroWhatsApp: empresaTelefone,
      mensagemSaudacao:
        'Olá! Seja bem-vindo(a) à Beauty Core Demo. Como podemos ajudar?',
      mensagemAusencia:
        'No momento estamos fora do horário de atendimento. Retornaremos em breve.',
      usarModoDemonstracao: true,
    },
    create: {
      empresaId: empresa.id,
      ativo: true,
      canal: CanalWhatsApp.MODO_DEMONSTRACAO,
      numeroWhatsApp: empresaTelefone,
      mensagemSaudacao:
        'Olá! Seja bem-vindo(a) à Beauty Core Demo. Como podemos ajudar?',
      mensagemAusencia:
        'No momento estamos fora do horário de atendimento. Retornaremos em breve.',
      usarModoDemonstracao: true,
    },
  });

  await seedCategoriasFinanceiras(empresa.id);

  console.log('Seed executado com sucesso.');
  console.log('----------------------------------------');
  console.log(`Empresa Demo: ${empresa.nome}`);
  console.log(`Empresa Slug: ${empresa.slug}`);
  console.log(`Empresa ID: ${empresa.id}`);
  console.log('----------------------------------------');
  console.log(`SUPER_ADMIN: ${superAdmin.email}`);
  console.log(`SUPER_ADMIN ID: ${superAdmin.id}`);
  console.log(`SUPER_ADMIN empresaId: ${superAdmin.empresaId ?? 'GLOBAL'}`);
  console.log('----------------------------------------');
  console.log(`ADMIN Demo: ${admin.email}`);
  console.log(`ADMIN Demo ID: ${admin.id}`);
  console.log(`ADMIN Demo empresaId: ${admin.empresaId}`);
  console.log('----------------------------------------');
  console.log(
    `Use este ID no SCHEDULER_EMPRESA_ID se quiser rodar rotinas da empresa demo: ${empresa.id}`,
  );
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });