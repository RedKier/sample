import { Controller } from '@nestjs/common';
import { TransactionsService } from '@modules/transactions/services/transations.service';

@Controller('transations')
export class TransactiosController {
  constructor(private readonly transactionsService: TransactionsService) {}
}
