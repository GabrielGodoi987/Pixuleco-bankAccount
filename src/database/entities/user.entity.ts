import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('tb_users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    unique: true,
    name: 'Cpf',
  })
  cpf: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'timestamp',
  })
  birth_date: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  created_at: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: string;

  @OneToMany(() => AccountEntity, (ac) => ac.user_id)
  accounts: AccountEntity[];
}
