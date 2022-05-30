import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TransactionEntity } from '@modules/transactions/entities/transaction.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TransactionEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TransationsModule {}
