import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PostgresService } from '../src/shared/postgres.service';

describe('CartController (e2e)', () => {
  let app: INestApplication<App>;
  let postgresService: PostgresService;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    app.enableShutdownHooks();
    app.enableCors();

    postgresService = app.get<PostgresService>(PostgresService);
    await postgresService.client.query(
      'TRUNCATE TABLE carts, cart_items RESTART IDENTITY CASCADE;'
    );
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be able to add product to cart', async () => {
    const response = await request(app.getHttpServer()).post('/cart').send({
      productId: 1,
      quantity: 2,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    const responseCart = await request(app.getHttpServer()).get('/cart/');
    expect(responseCart.status).toBe(200);
    expect(responseCart.body.id).toBe(response.body.id);
    expect(responseCart.body.items.length).toBe(1);
    expect(responseCart.body.items[0].quantity).toBe(2);
  });

  it('should be able to add products from same store to cart', async () => {
    const response = await request(app.getHttpServer()).post('/cart').send({
      productId: 1,
      quantity: 2,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    const response2 = await request(app.getHttpServer()).post('/cart').send({
      productId: 2,
      quantity: 3,
    });

    expect(response2.status).toBe(201);
    expect(response2.body).toHaveProperty('id');

    const response3 = await request(app.getHttpServer()).post('/cart').send({
      productId: 2,
      quantity: 1,
    });

    expect(response3.status).toBe(201);
    expect(response3.body).toHaveProperty('id');

    const responseCart = await request(app.getHttpServer()).get('/cart/');
    expect(responseCart.status).toBe(200);
    expect(responseCart.body.id).toBe(response.body.id);
    expect(responseCart.body.id).toBe(response2.body.id);
    expect(responseCart.body.id).toBe(response3.body.id);
    expect(responseCart.body.items.length).toBe(2);
    expect(responseCart.body.items[0].id).toBe(1);
    expect(responseCart.body.items[0].quantity).toBe(2);
    expect(responseCart.body.items[1].id).toBe(2);
    expect(responseCart.body.items[1].quantity).toBe(4);
  });
});
