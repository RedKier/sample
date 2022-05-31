import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/modules/common/entities/base.entity';

@Entity({ tableName: 'transactions' })
export class TransactionEntity extends BaseEntity {
  @Property({ type: 'text' })
  symbol: string;

  @Property({ type: 'int' })
  amount: string;

  @Property({ type: 'int' })
  price: string;
}
