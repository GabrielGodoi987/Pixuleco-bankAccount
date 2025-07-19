import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_user')
export class Users {
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
}
