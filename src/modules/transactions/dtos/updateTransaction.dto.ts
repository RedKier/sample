import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  symbol: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  amount: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;
}
