import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AccountType } from '../enums/accountType.enum';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsOptional()
  user_id: string;

  @ApiProperty({ default: 1 })
  @IsEnum(AccountType)
  @IsNotEmpty()
  type: AccountType;
}
