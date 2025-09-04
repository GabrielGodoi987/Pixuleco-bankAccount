import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { FailureReason } from '../enums/failure-reason.enum';

@Entity('tb_transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  from_account: number;

  @Column()
  to_account: number;

  @Column({
    type: 'float',
  })
  amount: number;

  @Column({
    type: 'int',
    default: 2,
  })
  status: TransactionStatus;

  @Column({
    type: 'enum',
    enum: FailureReason,
    nullable: true,
  })
  failure_reason: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  done_at: string;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  finished_at: string;

  @ManyToOne(() => AccountEntity, (account) => account.transferences)
  @JoinColumn({ name: 'from_account', referencedColumnName: 'account_number' })
  accountFrom: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.incomingTransferences)
  @JoinColumn({ name: 'to_account', referencedColumnName: 'account_number' })
  accountTo: AccountEntity;
}
