import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('CartController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    app.enableShutdownHooks();
    app.enableCors();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be able to add product to cart', async () => {
    const response = await request(app.getHttpServer()).post('/cart').send({
      product_id: 1,
      quantity: 2,
    });

    console.log(response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    const responseCart = await request(app.getHttpServer()).get('/cart');
    expect(responseCart.status).toBe(200);
    expect(responseCart.body.id).toBe(response.body.id);
  });
});
