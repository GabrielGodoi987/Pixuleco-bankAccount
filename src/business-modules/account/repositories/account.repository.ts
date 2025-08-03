import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';
import { Repository } from 'typeorm';
import { Account } from '../etities/account.entity';
import { TransactionsRepository } from './transaction.repository';
import { TransactionEntity } from 'src/database/entities/transaction.entity';

@Injectable()
export class AccountRepository {
  private readonly tableAccounts = 'tb_accounts';
  private readonly tableTransaction = 'tb_transaction';
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountDataSource: Repository<AccountEntity>,

    @InjectRepository(TransactionsRepository)
    private readonly transactionDataSource: Repository<TransactionEntity>,
  ) {}

  //
  async findAllAccountStateMentPaginated({
    offset,
    limit,
    account_number,
    user_id,
  }: {
    offset: number;
    limit: number;
    account_number: number;
    user_id: string;
  }) {
    try {
      const query = `
      SELECT
       t.amount,
       t.status,
       TO_CHAR(t.done_at, 'DD/MM/YYYY - HH24:MI:SS')
       TO_CHAR(t.finished_at, 'DD/MM/YYYY - HH24:MI:SS'),
       t.to_account
       acc.account_number
      FROM ${this.tableAccounts} as acc
      INNER JOIN ${this.tableTransaction} as t
       ON acc.account_number = t.from_account
      where t.finished_at < CURRENT_TIMESTAMP
        AND acc.account_number = $3 AND acc.user_id = $4
      ORDER BY t.finished_at DESC
      OFFSET $1 LIMIT $2; 
    `;

      return this.accountDataSource.query(query, [
        offset,
        limit,
        account_number,
        user_id,
      ]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // -> transferencias, saques e muito  mais!
  // podemos listar todas as transferencias e sques que ja foram feitas
  async countAccountStateMent(account_number: number) {
    const query = `
     SELECT COUNT(*) FROM ${this.tableTransaction} t
     WHERE t.from_account = $1
       AND t.finished_at < CURRENT_TIMESTAMP;
    `;

    return await this.transactionDataSource.query(query, [account_number]);
  }

  async findByAccountNumber(account_number: number): Promise<Account> {
    try {
      const query = `
    SELECT * FROM ${this.tableAccounts} as acc
    WHERE acc.account_number = $1;
    `;

      return await this.accountDataSource.query(query, [account_number]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // create account
  async createAccount(account: Partial<Account>) {
    return await this.accountDataSource.save(account);
  }

  async updateAccount(account: Partial<Account>) {
    try {
      return this.accountDataSource.update(account.id ?? '', account);
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
