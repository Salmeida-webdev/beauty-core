import { DocumentBuilder } from '@nestjs/swagger';

export function createSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Beauty Core API')
    .setDescription(
      'Plataforma White Label para Clínicas de Estética. API corporativa preparada para painel administrativo, portal do cliente, frontend web, mobile e integrações externas.',
    )
    .setVersion('1.0.0')
    .setContact('Beauty Core API Support', '', '')
    .setLicense('Private / Proprietary', '')
    .addServer('http://localhost:3000', 'Ambiente local')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Informe o token JWT no formato: Bearer <token>',
        in: 'header',
      },
      'JWT',
    )
    .build();
}