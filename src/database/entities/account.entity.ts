import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Transactions } from './transaction.entity';

@Entity('tb_account')
export class Accounts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Users)
  @JoinColumn({
    name: 'user_id',
  })
  user: Users;

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

  @ManyToOne(() => Transactions, (transactions) => transactions.from_account)
  transferences: Transactions[];

  @ManyToOne(() => Transactions, (transactions) => transactions.to_account)
  incomingTransferences: Transactions[];

  @BeforeInsert()
  generateRandomValue() {
    this.account_number = Math.floor(100000 + Math.random() * 9000000000);
  }
}
