import { Module } from '@nestjs/common';
import { AccountRepository } from './repositories/account.repository';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountRepository, AccountService],
})
export class AccountModule {}
