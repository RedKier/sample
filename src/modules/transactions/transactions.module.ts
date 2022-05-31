import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TransactiosController } from './controllers/transactions.controller';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionsService } from './services/transations.service';

@Module({
  imports: [MikroOrmModule.forFeature([TransactionEntity])],
  controllers: [TransactiosController],
  providers: [TransactionsService],
  exports: [],
})
export class TransationsModule {}
