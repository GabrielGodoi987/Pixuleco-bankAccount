import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  document: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  birth_date: string;
  @ApiProperty()
  created_at: string;
  @ApiProperty()
  updated_at: string;
}
