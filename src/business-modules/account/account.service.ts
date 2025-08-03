import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { AccountRepository } from './repositories/account.repository';
import { PaginatedResponse } from 'src/commons/interfaces/PaginatedResponse';
import { Account } from './etities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userService: UserService,
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
  }): PaginatedResponse<Account> {}

  // an logged user can see details about his account
  // an admin can see details about one account too
  async findOneAccountByAccountNumber(account_number: string) {}

  async createAccount(user_cpf: string, createAccount: CreateAccountDto) {
    // check if user has one account (we going to see if he has 3 in the future)
    const alreadyHaveAnAccount = await this.userService.findByCpf(user_cpf);

    if (alreadyHaveAnAccount.accounts.length == 1) {
      throw new ConflictException('User already have an account');
    }
    // We check the account type -> if the user has an account with the same type, they will be blocked.
    // We check the amount of money that passes through the other accounts.
    // Based on this, they can create a new account; otherwise, they cannot.

    createAccount.user_id = alreadyHaveAnAccount.id;

    return this.accountRepository.createAccount(createAccount);
  }

  async updateAccount(account_number: number, updateAccount: UpdateAccountDto) {
    const accountExists =
      await this.accountRepository.findByAccountNumber(account_number);
    if (!accountExists) {
      throw new BadRequestException(
        `Account with ${account_number} wasn't found`,
      );
    }
    updateAccount.id = accountExists.id;
    return await this.accountRepository.updateAccount(updateAccount);
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
  async transaction() {}
}
