import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';
import { Repository } from 'typeorm';
import { Account } from '../etities/account.entity';

@Injectable()
export class AccountRepository {
  private readonly tableName = 'tb_accounts';
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountDataSource: Repository<AccountEntity>,
  ) {}

  // create account
  async createAccount(account: Partial<Account>) {
    return await this.accountDataSource.save(account);
  }

  async updateAccount(account: Account) {
    return this.accountDataSource.update(account.id, account);
  }

  async deleteAccount(accountId: string) {
    return this.accountDataSource.delete(accountId);
  }

  async deposit({
    value,
    accountNumber,
    userId,
  }: {
    value: number;
    accountNumber: number;
    userId: number;
  }) {
    const query = `
     UPDATE ${this.tableName} as acc
     SET acc.credit = acc.credit + $1
     WHERE acc.account_number = $2 and acc.user_id = $3;
    `;
    await this.accountDataSource.query(query, [value, accountNumber, userId]);
  }
}
