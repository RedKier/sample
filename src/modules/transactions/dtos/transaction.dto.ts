import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TransactionDTO {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  symbol: number;

  @Expose()
  @ApiProperty()
  amount: number;

  @Expose()
  @ApiProperty()
  price: number;
}
