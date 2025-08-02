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

@Entity('tb_account')
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

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: string;

  @Column({
    type: 'timestamp',
  })
  updated_at: string;

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

  @ManyToOne(() => TransactionEntity, (transactions) => transactions.to_account)
  incomingTransferences: TransactionEntity[];

  @BeforeInsert()
  generateRandomValue() {
    this.account_number = Math.floor(100000 + Math.random() * 9000000000);
  }
}
