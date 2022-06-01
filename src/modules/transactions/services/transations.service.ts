import { EntityRepository } from '@mikro-orm/core';
import { NotFoundException } from '@nestjs/common';
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

  async updateTransaction(id: string, transactionData: UpdateTransactionDTO) {
    const transaction = await this.getTransactionByIdOrThrow(id);

    const editedTransaction = this.transactionRepository.create({
      ...transaction,
      ...transactionData,
    });

    await this.transactionRepository.persistAndFlush(editedTransaction);

    return editedTransaction;
  }

  async getTransactionById(id: string) {
    return await this.getTransactionByIdOrThrow(id);
  }

  async deleteTransaction(id: string) {
    const transaction = await this.getTransactionByIdOrThrow(id);

    this.transactionRepository.remove(transaction);

    await this.transactionRepository.flush();
  }

  async getTransactionByIdOrThrow(id: string) {
    const transaction = await this.transactionRepository.findOne({ uuid: id });

    if (!transaction) {
      throw new NotFoundException(`Transaction with uuid: ${id}, do not exist`);
    }

    return transaction;
  }
}
