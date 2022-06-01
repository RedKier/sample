import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { bootstrap } from '../src/main';
import { createTransaction } from './test-utils/transactions.utils';
import { TransactionEntity } from '../src/modules/transactions/entities/transaction.entity';

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await bootstrap();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('TransactionsController (e2e) / POST', () => {
    it('Should return 201 and create transaction', async () => {
      const data = {
        amount: faker.datatype.number(),
        price: faker.datatype.number(),
        symbol: faker.random.alpha(3),
      };

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
        amount: faker.datatype.number(),
        price: faker.datatype.number(),
      };

      await request(app.getHttpServer())
        .post('/transactions')
        .send(data)
        .expect(400);
    });

    it('Should return 400 and throw error when no amount specified', async () => {
      const data = {
        price: faker.datatype.number(),
        symbol: faker.random.alpha(3),
      };

      await request(app.getHttpServer())
        .post('/transactions')
        .send(data)
        .expect(400);
    });

    it('Should return 400 and throw error when no price specified', async () => {
      const data = {
        amount: faker.datatype.number(),
        symbol: faker.random.alpha(3),
      };

      await request(app.getHttpServer())
        .post('/transactions')
        .send(data)
        .expect(400);
    });
  });

  describe('TransactionsController (e2e) /:id GET', () => {
    const data = {
      amount: faker.datatype.number(),
      price: faker.datatype.number(),
      symbol: faker.random.alpha(3),
    };
    let transaction: TransactionEntity;

    beforeEach(async () => {
      transaction = await createTransaction(app, data);
    });

    it('Should return 200 and transaction data', () => {
      return request(app.getHttpServer())
        .get(`/transactions/${transaction.uuid}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body.uuid).toEqual(transaction.uuid);
          expect(body.createdAt).toBeDefined();
          expect(body.amount).toEqual(data.amount);
          expect(body.price).toEqual(data.price);
          expect(body.symbol).toEqual(data.symbol);
        });
    });

    it('Should return 404 when wrong id provided', () => {
      return request(app.getHttpServer()).get('/transactions/5').expect(404);
    });
  });

  describe('TransactionsController (e2e) /:id PATCH', () => {
    const data = {
      amount: faker.datatype.number(),
      price: faker.datatype.number(),
      symbol: faker.random.alpha(3),
    };
    let transaction: TransactionEntity;
    beforeEach(async () => {
      transaction = await createTransaction(app, data);
    });

    it('Should return 200 and update entity', () => {
      const editData = {
        amount: faker.datatype.number(),
        price: faker.datatype.number(),
      };
      return request(app.getHttpServer())
        .patch(`/transactions/${transaction.uuid}`)
        .send(editData)
        .expect(200)
        .expect(({ body }) => {
          expect(body.uuid).toEqual(transaction.uuid);
          expect(body.createdAt).toBeDefined();
          expect(body.amount).toEqual(editData.amount);
          expect(body.price).toEqual(editData.price);
          expect(body.symbol).toEqual(data.symbol);
        });
    });

    it('Should return 404 when wrong id provided', () => {
      return request(app.getHttpServer()).patch('/transactions/5').expect(404);
    });
  });

  describe('TransactionsController (e2e) /:id DELETE', () => {
    const data = {
      amount: faker.datatype.number(),
      price: faker.datatype.number(),
      symbol: faker.random.alpha(3),
    };
    let transaction: TransactionEntity;
    beforeEach(async () => {
      transaction = await createTransaction(app, data);
    });

    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .delete(`/transactions/${transaction.uuid}`)
        .expect(204);
    });

    it('Should return 404 when wrong id provided', () => {
      return request(app.getHttpServer()).delete('/transactions/5').expect(404);
    });
  });
});
