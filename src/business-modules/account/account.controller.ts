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
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiOperation } from '@nestjs/swagger';
import { DepositDto } from './dto/deposit.dto';
import { TransactionDto } from './dto/transaction.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly serviceAccount: AccountService) {}

  @ApiOperation({
    summary: 'List all the account statement',
  })
  @Get('/:account_number/:user_id')
  async listAccountStateMent(
    @Param('account_number') account_number: number,
    @Param('user_id') user_id: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return await this.serviceAccount.findAllAccountSatement({
      offset,
      limit,
      account_number,
      user_id,
    });
  }

  @ApiOperation({
    summary: 'Create an account for an existent user',
  })
  @Post(':user_cpf')
  async createAccount(
    @Param('user_cpf') user_cpf: string,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.serviceAccount.createAccount(user_cpf, createAccountDto);
  }

  @ApiOperation({
    summary: 'Perfom a transaction between two accounts',
    tags: ['Transactions'],
  })
  // precisamos saber para qual conta vai e de qual conta vem
  @Post('transaction') // precisa de um job para processar os dados
  async transaction(@Body() transactionDto: TransactionDto) {
    return await this.serviceAccount.transaction(transactionDto);
  }

  @ApiOperation({
    summary: "Increase the value into the user's account",
  })
  @Patch('/deposit/:user_cpf')
  async deposit(
    @Param('user_cpf') userCpf: string,
    @Body() depositDto: DepositDto,
  ) {
    return await this.serviceAccount.deposit(userCpf, depositDto);
  }

  @ApiOperation({
    summary: 'Withdraw money from an existent account',
  })
  @Patch(':user_id/account/:account_number')
  async withdrawMoney(
    @Body() value: number,
    @Param(':user_id') user_id: string,
    @Param('account_number') account_number: number,
  ) {
    return this.serviceAccount.withDraw({
      user_id,
      account_number,
      value,
    });
  }

  // deixar o dinheiro rendendo uma porcentagem a cada dia
  // vamos criar um cron job, ele será responsável por incrementar um determinado valor na conta do usuário
  //@Patch()
  //async investMoney(@Body() value: number) {}
}
