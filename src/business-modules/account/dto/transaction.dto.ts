import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  from_account: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  to_account: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
