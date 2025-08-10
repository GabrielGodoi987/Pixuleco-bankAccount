import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { AccountRepository } from '../account/repositories/account.repository';
import { AccountEntity } from 'src/database/entities/account.entity';
import { TransactionEntity } from 'src/database/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity, TransactionEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, AccountRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
