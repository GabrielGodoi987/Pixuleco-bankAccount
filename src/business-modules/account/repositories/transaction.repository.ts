import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/database/entities/transaction.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionDataSource: Repository<TransactionEntity>,
  ) {}

  // transaction query creation
  // we create an transaction in the database
  // we update account_from credit
  // we updaten to_account credit
  // we can notify account from and to account sending emails - tell then that the transaction was successfuly done
  async transaction(transaction: Partial<TransactionEntity>) {
    try {
      const data = this.transactionDataSource.create(transaction);
      await this.transactionDataSource.save(data);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async updateTransactionField(transaction: DeepPartial<TransactionEntity>) {
    try {
      const data = this.transactionDataSource.create(transaction);
      await this.transactionDataSource.save(data);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
