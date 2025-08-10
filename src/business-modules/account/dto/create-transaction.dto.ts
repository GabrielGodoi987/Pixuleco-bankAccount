import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { FailureReason } from 'src/database/enums/failure-reason.enum';
import { TransactionStatus } from 'src/database/enums/transaction-status.enum';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  from_account: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  to_account: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @ApiProperty()
  @IsOptional()
  @IsEnum(FailureReason)
  failure_reason?: FailureReason;
}
