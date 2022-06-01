import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../../modules/common/interceptors/transform.interceptor';
import { CreateTransactionDTO } from '../dtos/createTransaction.dto';
import { TransactionDTO } from '../dtos/transaction.dto';
import { UpdateTransactionDTO } from '../dtos/updateTransaction.dto';
import { TransactionsService } from '../services/transations.service';

@Controller('transactions')
@ApiTags('transactions')
export class TransactiosController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':id')
  @ApiOkResponse({ type: TransactionDTO })
  @UseInterceptors(new TransformInterceptor(TransactionDTO))
  async getTransaction(@Param('id') id: string) {
    return this.transactionsService.getTransactionById(id);
  }

  @Post()
  @ApiOkResponse({ type: TransactionDTO })
  @UseInterceptors(new TransformInterceptor(TransactionDTO))
  async createTransaction(@Body() transactionData: CreateTransactionDTO) {
    return this.transactionsService.createTransaction(transactionData);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async deleteTransaction(@Param('id') id: string) {
    await this.transactionsService.deleteTransaction(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TransactionDTO })
  @UseInterceptors(new TransformInterceptor(TransactionDTO))
  async updateTransaction(
    @Param('id') id: string,
    @Body() tramsactionData: UpdateTransactionDTO,
  ) {
    return this.transactionsService.updateTransaction(id, tramsactionData);
  }
}
