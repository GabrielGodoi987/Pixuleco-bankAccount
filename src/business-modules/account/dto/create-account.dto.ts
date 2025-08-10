import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AccountType } from '../enums/accountType.enum';
import { Account } from '../etities/account.entity';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @ApiProperty()
  @IsEnum(AccountType)
  @IsNotEmpty()
  type: Account;
}
