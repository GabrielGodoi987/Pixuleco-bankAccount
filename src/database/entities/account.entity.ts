import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TransactionEntity } from './transaction.entity';
import { AccountType } from '../../business-modules/account/enums/accountType.enum';
import { AccountStatus } from '../../business-modules/account/enums/accountStatus.enum';

@Entity('tb_accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @Column({
    type: 'int',
  })
  credit: number;

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

  @Column({
    type: 'timestamp',
  })
  update_at: string;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user_id: string;

  @OneToMany(
    () => TransactionEntity,
    (transactions) => transactions.from_account,
  )
  transferences: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transactions) => transactions.to_account)
  incomingTransferences: TransactionEntity[];

  @BeforeInsert()
  generateRandomValue() {
    this.account_number = Math.floor(100000 + Math.random() * 9000000000);
  }
}
