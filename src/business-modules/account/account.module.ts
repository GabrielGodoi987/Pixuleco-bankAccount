import { Module } from '@nestjs/common';
import { AccountRepository } from './repositories/account.repository';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';
import { TransactionEntity } from 'src/database/entities/transaction.entity';
import { UserService } from '../user/user.service';
import { TransactionsRepository } from './repositories/transaction.repository';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserRepository } from '../user/repository/user.repository';
import { AccountController } from './account.controller';
import { BullModule } from '@nestjs/bull';
import { DepositProcessor } from './processors/depoist.processor';
import { TransactionProcessor } from './processors/transaction.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity, TransactionEntity]),
    BullModule.registerQueue(
      {
        name: 'deposit-queue',
      },
      {
        name: 'transaction-queue',
      },
    ),
  ],
  controllers: [AccountController],
  providers: [
    TransactionsRepository,
    AccountRepository,
    AccountService,
    UserService,
    UserRepository,
    DepositProcessor,
    TransactionProcessor,
  ],
  exports: [TransactionsRepository, AccountService],
})
export class AccountModule {}
