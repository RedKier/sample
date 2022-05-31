import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../../modules/common/interceptors/transform.interceptor';
import { TransactionDTO } from '../dtos/transaction.dto';
import { TransactionsService } from '../services/transations.service';

@Controller('transactions')
@ApiTags('transactions')
export class TransactiosController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/:id')
  @ApiOkResponse({ type: TransactionDTO })
  @UseInterceptors(new TransformInterceptor(TransactionDTO))
  async getTransaction(@Param('id') id: string) {
    return this.transactionsService.getTransactionById(id);
  }

  @Post()
  @ApiOkResponse({ type: TransactionDTO })
  @UseInterceptors(new TransformInterceptor(TransactionDTO))
  async createTransaction() {
    return this.transactionsService.createTransaction();
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async deleteTransaction(@Param('id') id: string) {
    await this.transactionsService.deleteTransaction(id);
  }

  @Put('/:id')
  @ApiOkResponse({ type: TransactionDTO })
  @UseInterceptors(new TransformInterceptor(TransactionDTO))
  async updateTransaction(@Param('id') id: string) {
    return this.transactionsService.updateTransaction(id);
  }
}
