import request = require('supertest');
import { INestApplication } from '@nestjs/common';

export async function expectTenantOk(app: INestApplication, slug: string) {
  const response = await request(app.getHttpServer())
    .get('/public/tenant/' + slug)
    .expect(200);

  const resolvedSlug =
    response.body.slug ??
    response.body.data?.slug ??
    response.body.empresa?.slug ??
    response.body.data?.empresa?.slug;

  expect(resolvedSlug).toBe(slug);

  return response.body;
}
