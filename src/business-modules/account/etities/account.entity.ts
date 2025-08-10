import { AccountEntity } from 'src/database/entities/account.entity';
import { TransactionEntity } from 'src/database/entities/transaction.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { AccountStatus } from '../enums/accountStatus.enum';
import { AccountType } from '../enums/accountType.enum';

export class Account implements AccountEntity {
  type: AccountType;
  id: string;
  user: UserEntity;
  credit: number;
  account_number: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  transferences: TransactionEntity[];
  incomingTransferences: TransactionEntity[];
  status: AccountStatus;
  generateRandomValue(): void {
    this.account_number = Math.floor(100000 + Math.random() * 9000000000);
  }
}
