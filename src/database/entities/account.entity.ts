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

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;

  @OneToMany(
    () => TransactionEntity,
    (transactions) => transactions.from_account,
  )
  transferences: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transactions) => transactions.to_account)
  incomingTransferences: TransactionEntity[];
}
