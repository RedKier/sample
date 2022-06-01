import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from '../dtos/createTransaction.dto';
import { UpdateTransactionDTO } from '../dtos/updateTransaction.dto';
import { TransactionEntity } from '../entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: EntityRepository<TransactionEntity>,
  ) {}

  async createTransaction(tramsactionData: CreateTransactionDTO) {}

  async updateTransaction(id: string, tramsactionData: UpdateTransactionDTO) {}

  async getTransactionById(id: string) {}

  async deleteTransaction(id: string) {}
}
