import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';
import { Repository } from 'typeorm';
import { Account } from '../etities/account.entity';

@Injectable()
export class AccountRepository {
  private readonly tableAccounts = 'tb_accounts';
  private readonly tableTransaction = 'tb_transaction';
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountDataSource: Repository<AccountEntity>,
  ) {}

  //
  async findAllAccountStateMentPaginated({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) {
    try {
      const query = `
      SELECT
       t.amount,
       t.status,
       TO_CHAR(t.finished_at, 'DD/MM/YYYY - HH24:MI:SS'),
       t.to_account
       acc.account_number
      FROM ${this.tableAccounts} as acc
      INNER JOIN ${this.tableTransaction} as t
       ON acc.account_number = t.from_account
      where t.finished_at < CURRENT_TIMESTAMP
      ORDER BY t.finished_at DESC
      OFFSET $1 LIMIT $2; 
    `;

      return this.accountDataSource.query(query, [offset, limit]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // -> transferencias, saques e muito  mais!
  // podemos listar todas as transferencias e sques que ja foram feitas
  async countAccountStateMent() {}

  // create account
  async createAccount(account: Partial<Account>) {
    return await this.accountDataSource.save(account);
  }

  async updateAccount(account: Account) {
    try {
      return this.accountDataSource.update(account.id, account);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async deleteAccount(accountId: string) {
    try {
      return this.accountDataSource.delete(accountId);
    } catch (error) {
      console.error(error);
      return error;
    }
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
    try {
      const query = `
     UPDATE ${this.tableAccounts} as acc
     SET acc.credit = acc.credit + $1
     WHERE acc.account_number = $2 and acc.user_id = $3;
    `;
      await this.accountDataSource.query(query, [value, accountNumber, userId]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
