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

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity, TransactionEntity]),
  ],
  controllers: [AccountController],
  providers: [
    TransactionsRepository,
    AccountRepository,
    AccountService,
    UserService,
    UserRepository,
  ],
  exports: [TransactionsRepository, AccountService],
})
export class AccountModule {}
