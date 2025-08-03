import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty()
  from_account: number;

  @ApiProperty()
  to_account: number;
}
