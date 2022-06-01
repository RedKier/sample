import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { bootstrap } from '../src/main';

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await bootstrap();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('TransactionsController (e2e) /:id GET', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/transactions/5')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe.only('TransactionsController (e2e) / POST', () => {
    it('Should return 201 and create transaction', async () => {
      const data = {
        amount: -5,
        price: 6,
        symbol: "BTC"
    }

      await request(app.getHttpServer())
        .post('/transactions')
        .send(data)
        .expect(201)
        .expect(({ body }) => {
          expect(body.uuid).toBeDefined();
          expect(body.createdAt).toBeDefined();
          expect(body.amount).toEqual(data.amount);
          expect(body.price).toEqual(data.price);
          expect(body.symbol).toEqual(data.symbol);
        });
    });

    it('Should return 400 and throw error when no symbol specified', async () => {
      const data = {
        amount: -5,
        price: 6,
    }

      await request(app.getHttpServer())
        .post('/transactions')
        .send(data)
        .expect(400);
    });

    it('Should return 400 and throw error when no amount specified', async () => {
      const data = {
        price: 6,
        symbol: "BTC"
    }

      await request(app.getHttpServer())
        .post('/transactions')
        .send(data)
        .expect(400);
    });

    it('Should return 400 and throw error when no price specified', async () => {
      const data = {
        amount: -5,
        symbol: "BTC"
    }

      await request(app.getHttpServer())
        .post('/transactions')
        .send(data)
        .expect(400);
    });
  });

  describe('TransactionsController (e2e) /:id PATCH', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .patch('/transactions/5')
        .send({})
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('TransactionsController (e2e) /:id DELETE', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .delete('/transactions/5')
        .expect(204)
        .expect('Hello World!');
    });
  });
});
