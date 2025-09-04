import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountRepository } from './repositories/account.repository';
import { PaginatedResponse } from 'src/commons/interfaces/PaginatedResponse';
import { CreateAccountDto } from './dto/create-account.dto';
import { UserService } from '../user/user.service';
import { DepositDto } from './dto/deposit.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userService: UserService,

    @InjectQueue('deposit-queue')
    private depositQueue: Queue,

    @InjectQueue('transaction-queue')
    private transactionQueue: Queue,
  ) {}

  async findAllAccountSatement({
    offset,
    limit,
    account_number,
    user_id,
  }: {
    offset: number;
    limit: number;
    account_number: number;
    user_id: string;
  }): Promise<PaginatedResponse<any>> {
    if (!(user_id || account_number || offset || limit)) {
      throw new BadRequestException(`A necessary key wasn't provided`);
    }
    try {
      const accountStatements =
        await this.accountRepository.findAllAccountStateMentPaginated({
          offset,
          limit,
          account_number,
          user_id,
        });

      const countAccounntStatement =
        await this.accountRepository.countAccountStateMent(account_number);

      return {
        current: offset,
        next: countAccounntStatement != offset ? offset + 1 : null,
        previous: offset > 0 ? offset + 1 : null,
        totalPages: Math.ceil(limit / countAccounntStatement),
        items: accountStatements,
      };
    } catch (error) {
      return error;
    }
  }

  // an logged user can see details about his account
  // an admin can see details about one account too
  async findOneAccountByAccountNumber(account_number: number) {
    try {
      const account =
        await this.accountRepository.findByAccountNumber(account_number);

      if (!account) {
        throw new BadRequestException('Account not found');
      }

      return account;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async createAccount(user_cpf: string, createAccount: CreateAccountDto) {
    console.log(user_cpf);
    // check if user has one account (we going to see if he has 3 in the future)
    const alreadyHaveAnAccount = await this.userService.findByCpf(user_cpf);
    if (alreadyHaveAnAccount.accounts !== undefined) {
      throw new ConflictException('User already have an account');
    }
    // We check the account type -> if the user has an account with the same type, they will be blocked.
    // We check the amount of money that passes through the other accounts.
    // Based on this, they can create a new account; otherwise, they cannot.

    createAccount.user_id = alreadyHaveAnAccount.id;
    const accountNumber = this.generateRandomValue();
    return this.accountRepository.createAccount({
      ...createAccount,
      accountNumber,
    });
  }

  // implement in the future
  //async deactivateAccount(account_number: number) {}

  // its required a serie of confirmations, emails, and lot of more
  async deleteAccount(account_number: number) {
    try {
      // verificar se a conta existe
      const accountExists =
        await this.accountRepository.findByAccountNumber(account_number);
      if (!accountExists) {
        throw new BadRequestException(
          `Account with number ${account_number} wasn't found`,
        );
      }
      await this.accountRepository.deleteAccount(accountExists.id);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // needs a serie of confirmation
  // needs to be processed by a queue -> concurrency = 1
  // needs a lock for this, the next process needs to wait till the other initiate
  async transaction(transactionDto: TransactionDto) {
    const { from_account, to_account } = transactionDto;
    const [acc1, acc2] = await Promise.all([
      this.accountRepository.findByAccountNumber(from_account),
      this.accountRepository.findByAccountNumber(to_account),
    ]);

    if (!(acc1 || acc2)) {
      throw new NotFoundException('one of the accounts does not exists');
    }

    const job = await this.transactionQueue.add(
      'transacion-processor',
      transactionDto,
      {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 3,
      },
    );

    return {
      id: job.id,
      timestamp: job.timestamp,
      progres: job.progress(),
    };
  }

  // recebe um depósito
  // verifica se já tem um em execução
  // envia para um processor
  // pega quanto de credit um user tem em conta
  // faz a devida atualização
  // salva no banco de dados
  // envia notificação
  async deposit(userCpf: string, depositDto: DepositDto) {
    const user = await this.userService.findByCpf(userCpf);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    depositDto.user_id = user.id;

    const job = await this.depositQueue.add('deposit-processor', depositDto, {
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: true,
    });

    return {
      job_id: job.id,
      timestamp: job.timestamp,
    };
  }

  // sacar dinheiro
  // fazemos a query para atualizar a conta e retirar o dinheiro
  // retornamos o valor para o usuário
  async withDraw({
    user_id,
    account_number,
    value,
  }: {
    user_id: string;
    account_number: number;
    value: number;
  }) {
    // verificamos se o usuário e a conta realmente existem
    const account =
      await this.accountRepository.findByAccountNumber(account_number);
    const user = await this.userService.findOne(user_id);
    if (!account) {
      throw new BadRequestException(`Account ${account_number} doesn't exists`);
    }
    if (!user) {
      throw new BadRequestException(`Account ${user_id} doesn't exists`);
    }
    return await this.accountRepository.withDrawMoney({
      user_id: user.id,
      account_number: account.account_number,
      value,
    });
  }

  async deactivateAccount(userCpf: string) {
    const user = await this.userService.findByCpf(userCpf);
    if (!user) {
      throw new NotFoundException('User was not found');
    }
  }

  private generateRandomValue() {
    return Math.floor(100000 + Math.random() * 9000000000);
  }
}
