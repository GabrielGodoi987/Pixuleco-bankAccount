import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TransactionEntity } from './transaction.entity';
import { AccountType } from '../../business-modules/account/enums/accountType.enum';
import { AccountStatus } from '../../business-modules/account/enums/accountStatus.enum';

@Entity('tb_accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  credit: string;

  @Column({
    type: 'bigint',
    unique: true,
  })
  account_number: number;

  @Column({
    type: 'int',
    name: 'status',
  })
  status: AccountStatus;

  @Column({
    type: 'int',
    name: 'type',
  })
  type: AccountType;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: string;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @OneToMany(() => TransactionEntity, (t) => t.accountFrom)
  transferences: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (t) => t.accountTo)
  incomingTransferences: TransactionEntity[];
}
