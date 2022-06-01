import { INestApplication } from '@nestjs/common';
import { EntityManager, SqlEntityRepository } from '@mikro-orm/postgresql';
import { TransactionEntity } from '../../src/modules/transactions/entities/transaction.entity';

export const createTransaction = async (
  app: INestApplication,
  transactionData: Partial<TransactionEntity>,
): Promise<TransactionEntity> => {
  const em = app.get(EntityManager);
  const entityRepository = em.getRepository(TransactionEntity);
  const transaction = entityRepository.create(transactionData);
  await entityRepository.persistAndFlush(transaction);

  return transaction;
};
