import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/modules/app.module';

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

  describe('TransactionsController (e2e) / POST', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .post('/transactions/')
        .send({})
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('TransactionsController (e2e) /:id PUT', () => {
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
