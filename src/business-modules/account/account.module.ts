import { Module } from '@nestjs/common';
import { AccountRepository } from './repositories/account.repository';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';
import { TransactionEntity } from 'src/database/entities/transaction.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, TransactionEntity])],
  providers: [AccountRepository, AccountService, UserService],
})
export class AccountModule {}
