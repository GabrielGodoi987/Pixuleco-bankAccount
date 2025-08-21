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

  async transaction(transaction: Partial<TransactionEntity>) {
    const data = this.transactionDataSource.create(transaction);
    await this.transactionDataSource.save(data);
    return data;
  }

  async updateTransactionField(
    id: string,
    transaction: DeepPartial<TransactionEntity>,
  ) {
    try {
      return this.transactionDataSource
        .createQueryBuilder()
        .update()
        .set(transaction)
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
