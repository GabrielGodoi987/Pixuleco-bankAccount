import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/database/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(TransactionsRepository)
    private readonly transactionDataSource: Repository<TransactionEntity>,
  ) {}
}
