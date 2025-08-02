import { UserEntity } from 'src/database/entities/user.entity';

export class User implements UserEntity {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  birth_date: string;
  created_at: string;
  updated_at: string;
}
