import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../../../database/entities/account.entity';
import { Repository } from 'typeorm';
import { Account } from '../etities/account.entity';
import { TransactionEntity } from '../../../database/entities/transaction.entity';
import { AccountType } from '../enums/accountType.enum';

@Injectable()
export class AccountRepository {
  private readonly tableAccounts = 'tb_accounts';
  private readonly tableTransaction = 'tb_transaction';
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountDataSource: Repository<AccountEntity>,

    @InjectRepository(TransactionEntity)
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
  }): Promise<any[]> {
    try {
      const query = `
      SELECT
       t.amount,
       t.status,
       TO_CHAR(t.done_at, 'DD/MM/YYYY - HH24:MI:SS')
       TO_CHAR(t.finished_at, 'DD/MM/YYYY - HH24:MI:SS'),
       t.to_account,
       t.from_account,
       acc.account_number,
       CASE
         WHEN acc.status == 1 THEN 'Conta ativa'
         WHEN acc.status == 2 THEN 'Conta desativada'
         WHEN acc.status == 3 THEN 'Conta recém criada'
         WHEN acc.status == 4 THEN 'Conta cancelada'
       END as account_status,
       CASE
         WHEN acc.type == 1 THEN 'Conta corrente'
         WHEN acc.type == 2 THEN 'Conta poupança'
         WHEN acc.type == 3 THEN 'Conta salário'
       END as account_type
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
  async countAccountStateMent(account_number: number): Promise<number> {
    const query = `
     SELECT COUNT(*) FROM ${this.tableTransaction} t
     WHERE t.from_account = $1
       AND t.finished_at < CURRENT_TIMESTAMP;
    `;
    const [{ count }] = await this.transactionDataSource.query(query, [
      account_number,
    ]);
    return count;
  }

  async findByAccountNumber(account_number: number): Promise<Account> {
    try {
      const query = `
      SELECT * FROM ${this.tableAccounts} as acc
      WHERE acc.account_number = $1;
    `;

      const [data] = await this.accountDataSource.query(query, [
        account_number,
      ]);

      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // create account
  async createAccount(account: {
    type: AccountType;
    user_id: string;
    accountNumber: number;
  }) {
    const { type, user_id, accountNumber } = account;
    return await this.accountDataSource.save({
      type,
      user: {
        id: user_id,
      },
      account_number: accountNumber,
    });
  }

  async updateAccount(accountid: string, account: Partial<Account>) {
    try {
      return this.accountDataSource.update(accountid, account);
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
    userId: string;
  }): Promise<{ message: string; success: boolean }> {
    try {
      const query = `
      UPDATE ${this.tableAccounts} acc
      SET credit = acc.credit + $1
      WHERE account_number = $2
         AND user_id = $3;
    `;
      await this.accountDataSource.query(query, [value, accountNumber, userId]);

      return {
        message: 'Transaction succesfuly done',
        success: true,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async withDrawMoney({
    user_id,
    account_number,
    value,
  }: {
    user_id: string;
    account_number: number;
    value: number;
  }) {
    try {
      const query = `
      UPDATE ${this.tableAccounts} acc
      SET credit = acc.credit - $3
      WHERE acc.user_id = $1
        AND acc.account_number = $2
        AND acc.credit >= $3;
    `;

      await this.accountDataSource.query(query, [
        user_id,
        account_number,
        value,
      ]);

      return await this.accountDataSource.findOne({
        where: {
          account_number,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
