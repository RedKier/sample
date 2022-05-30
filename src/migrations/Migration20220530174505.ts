import { Migration } from '@mikro-orm/migrations';

export class Migration20220530174505 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "transactions" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "symbol" text not null, "amount" int not null, "price" int not null);');
    this.addSql('alter table "transactions" add constraint "transactions_pkey" primary key ("uuid");');
  }

}
