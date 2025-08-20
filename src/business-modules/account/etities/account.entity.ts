import { AccountEntity } from 'src/database/entities/account.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { AccountType } from '../enums/accountType.enum';

export class Account implements Partial<AccountEntity> {
  id: string;
  type: AccountType;
  user: UserEntity;
  credit: number;
  account_number: number;
  created_at: string;
  update_at: string;
  user_id: string;
}
