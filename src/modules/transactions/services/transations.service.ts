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

  async createTransaction(transactionData: CreateTransactionDTO) {
    const transaction = this.transactionRepository.create(transactionData);
    
    await this.transactionRepository.persistAndFlush(transaction);

    return transaction;
  }

  async updateTransaction(id: string, transactionData: UpdateTransactionDTO) {}

  async getTransactionById(id: string) {}

  async deleteTransaction(id: string) {}


  async getTransactionByIdOrThrow(id: string) {
    
  }
}
