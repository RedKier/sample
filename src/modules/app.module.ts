import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import MikroormConfig from '../microorm.config';
import { AppController } from './app.controller';
import { TransationsModule } from '@modules/transactions/transactions.module';

@Module({
  imports: [MikroOrmModule.forRoot(MikroormConfig), TransationsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
