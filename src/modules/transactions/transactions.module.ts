import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TransactionEntity } from '@modules/transactions/entities/transaction.entity';
import { TransactiosController } from '@modules/transactions/controllers/transactions.controller';
import { TransactionsService } from '@modules/transactions/services/transations.service';

@Module({
  imports: [MikroOrmModule.forFeature([TransactionEntity])],
  controllers: [TransactiosController],
  providers: [TransactionsService],
  exports: [],
})
export class TransationsModule {}
