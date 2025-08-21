import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AccountType } from '../enums/accountType.enum';

export class CreateAccountDto {
  @ApiProperty({ description: 'Id from an existent user' })
  @IsOptional()
  user_id: string;

  @ApiProperty({ default: 1 })
  @IsEnum(AccountType)
  @IsNotEmpty()
  type: AccountType;
}
