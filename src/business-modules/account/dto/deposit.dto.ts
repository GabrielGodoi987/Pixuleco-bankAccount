import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DepositDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  account_number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  user_id: string;
}
