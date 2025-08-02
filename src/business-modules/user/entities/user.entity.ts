import { AccountEntity } from 'src/database/entities/account.entity';
import { UserEntity } from 'src/database/entities/user.entity';

export class User implements UserEntity {
  id: string;
  name: string; // pode atualizar
  email: string; // pode atualizar
  cpf: string;
  password: string; // pode atualizar
  birth_date: string; // pode atualizar -> precisa de regra de negódcio para isso!
  created_at: string;
  updated_at: string;
  accounts: AccountEntity[];
}
