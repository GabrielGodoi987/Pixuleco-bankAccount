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

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'from_account', referencedColumnName: 'account_number' })
  from_account: AccountEntity;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'to_account', referencedColumnName: 'account_number' })
  to_account: AccountEntity;

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
  })
  finished_at: string;
}
