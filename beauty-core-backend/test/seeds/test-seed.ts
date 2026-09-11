import * as bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';

export const TEST_PASSWORD = 'Teste@123456';

export const TEST_EMAILS = {
  superAdmin: 'superadmin.test@beautycore.com',
  admin: 'admin.test@beautycore.com',
  gerente: 'gerente.test@beautycore.com',
  recepcao: 'recepcao.test@beautycore.com',
  profissional: 'profissional.test@beautycore.com',
};

export const TEST_CLIENTE = {
  telefone: '83999990001',
  email: 'cliente.test@beautycore.com',
};

export type TestSeedResult = {
  empresaA: any;
  empresaB: any;
  usuarios: {
    superAdmin: any;
    admin: any;
    gerente: any;
    recepcao: any;
    profissional: any;
  };
  cliente: any;
  unidade?: any;
  servico?: any;
  pacote?: any;
};

function getModel(modelName: string) {
  return Prisma.dmmf.datamodel.models.find((model) => model.name === modelName);
}

function getEnumValues(enumName: string) {
  return (
    Prisma.dmmf.datamodel.enums
      .find((item) => item.name === enumName)
      ?.values.map((value) => value.name) ?? []
  );
}

function modelDelegate(modelName: string) {
  return modelName.charAt(0).toLowerCase() + modelName.slice(1);
}

function sanitizeData(modelName: string, defaults: Record<string, any>) {
  const model = getModel(modelName);

  if (!model) {
    throw new Error('Model não encontrado no Prisma: ' + modelName);
  }

  const data: Record<string, any> = {};

  for (const field of model.fields) {
    if (field.kind !== 'scalar' && field.kind !== 'enum') {
      continue;
    }

    if (field.isId || field.isUpdatedAt) {
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(defaults, field.name)) {
      if (field.kind === 'enum') {
        const values = getEnumValues(field.type);
        data[field.name] = values.includes(defaults[field.name])
          ? defaults[field.name]
          : values[0];
      } else {
        data[field.name] = defaults[field.name];
      }

      continue;
    }

    if (field.hasDefaultValue || !field.isRequired) {
      continue;
    }

    if (field.kind === 'enum') {
      data[field.name] = getEnumValues(field.type)[0];
      continue;
    }

    switch (field.type) {
      case 'String':
        data[field.name] = modelName + ' ' + field.name + ' teste';
        break;
      case 'Int':
        data[field.name] = 1;
        break;
      case 'Float':
      case 'Decimal':
        data[field.name] = 1;
        break;
      case 'Boolean':
        data[field.name] = true;
        break;
      case 'DateTime':
        data[field.name] = new Date();
        break;
      default:
        data[field.name] = null;
        break;
    }
  }

  return data;
}

async function createModel(
  prisma: PrismaClient,
  modelName: string,
  defaults: Record<string, any>,
) {
  const delegate = modelDelegate(modelName);
  const data = sanitizeData(modelName, defaults);

  return (prisma as any)[delegate].create({ data });
}

async function createIfModelExists(
  prisma: PrismaClient,
  modelName: string,
  defaults: Record<string, any>,
) {
  if (!getModel(modelName)) {
    return null;
  }

  return createModel(prisma, modelName, defaults);
}

export async function seedTestDatabase(
  prisma: PrismaClient,
): Promise<TestSeedResult> {
  const senhaHash = await bcrypt.hash(TEST_PASSWORD, 10);

  const empresaA = await createModel(prisma, 'Empresa', {
    nome: 'Beauty Core Teste A',
    slug: 'beauty-core-teste-a',
    email: 'empresa-a.test@beautycore.com',
    telefone: '83999990000',
    plano: 'PREMIUM',
    ativo: true,
    corPrimaria: '#111827',
  });

  const empresaB = await createModel(prisma, 'Empresa', {
    nome: 'Beauty Core Teste B',
    slug: 'beauty-core-teste-b',
    email: 'empresa-b.test@beautycore.com',
    telefone: '83999990002',
    plano: 'PRO',
    ativo: true,
    corPrimaria: '#111827',
  });

  const superAdmin = await createModel(prisma, 'Usuario', {
    empresaId: null,
    nome: 'Super Admin Teste',
    email: TEST_EMAILS.superAdmin,
    senha: senhaHash,
    password: senhaHash,
    role: 'SUPER_ADMIN',
    ativo: true,
  });

  const admin = await createModel(prisma, 'Usuario', {
    empresaId: empresaA.id,
    nome: 'Admin Teste',
    email: TEST_EMAILS.admin,
    senha: senhaHash,
    password: senhaHash,
    role: 'ADMIN',
    ativo: true,
  });

  const gerente = await createModel(prisma, 'Usuario', {
    empresaId: empresaA.id,
    nome: 'Gerente Teste',
    email: TEST_EMAILS.gerente,
    senha: senhaHash,
    password: senhaHash,
    role: 'GERENTE',
    ativo: true,
  });

  const recepcao = await createModel(prisma, 'Usuario', {
    empresaId: empresaA.id,
    nome: 'Recepção Teste',
    email: TEST_EMAILS.recepcao,
    senha: senhaHash,
    password: senhaHash,
    role: 'RECEPCAO',
    ativo: true,
  });

  const profissional = await createModel(prisma, 'Usuario', {
    empresaId: empresaA.id,
    nome: 'Profissional Teste',
    email: TEST_EMAILS.profissional,
    senha: senhaHash,
    password: senhaHash,
    role: 'PROFISSIONAL',
    ativo: true,
  });

  const cliente = await createModel(prisma, 'Cliente', {
    empresaId: empresaA.id,
    nome: 'Cliente Teste',
    telefone: TEST_CLIENTE.telefone,
    email: TEST_CLIENTE.email,
    ativo: true,
    ativoPortal: true,
    aceitouTermos: true,
    dataAceiteTermos: new Date(),
  });

  const unidade = await createIfModelExists(prisma, 'Unidade', {
    empresaId: empresaA.id,
    nome: 'Unidade Teste',
    telefone: '83999990003',
    ativa: true,
    ativo: true,
  });

  const servico = await createIfModelExists(prisma, 'Servico', {
    empresaId: empresaA.id,
    nome: 'Limpeza de Pele Teste',
    descricao: 'Serviço usado somente em testes automatizados.',
    preco: 120,
    valor: 120,
    duracaoMinutos: 60,
    ativo: true,
  });

  const pacote = await createIfModelExists(prisma, 'Pacote', {
    empresaId: empresaA.id,
    nome: 'Pacote Teste',
    descricao: 'Pacote usado em testes automatizados.',
    quantidadeSessoes: 5,
    valor: 500,
    preco: 500,
    ativo: true,
  });

  await createIfModelExists(prisma, 'Notificacao', {
    empresaId: empresaA.id,
    clienteId: cliente.id,
    titulo: 'Notificação Teste',
    mensagem: 'Mensagem de teste automatizado.',
    tipo: 'SISTEMA',
    status: 'NAO_LIDA',
    lida: false,
  });

  return {
    empresaA,
    empresaB,
    usuarios: {
      superAdmin,
      admin,
      gerente,
      recepcao,
      profissional,
    },
    cliente,
    unidade,
    servico,
    pacote,
  };
}
