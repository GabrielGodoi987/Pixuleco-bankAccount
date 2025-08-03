import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { TransactionDto } from './dto/transaction.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('user/accounts')
export class AccountController {
  constructor(private readonly serviceAccount: AccountService) {}

  @Get()
  async listAccountStateMent(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {}

  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto) {}

  @Patch(':account_number')
  async updateAccount(
    @Param('account_number') account_number: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {}

  // precisamos saber para qual conta vai e de qual conta vem
  @Post('transaction') // precisa de um job para processar os dados
  async transaction(@Body() transactionDto: TransactionDto) {}

  @Patch(':id')
  async withdrawMoney(@Body() value: number, @Param(':id') id: number) {}

  @Patch()
  async investMoney(@Body() value: number) {}
}
