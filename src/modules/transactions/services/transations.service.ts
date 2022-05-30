import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { TransactionEntity } from '../entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: EntityRepository<TransactionEntity>,
  ) {}
}
