import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { Account } from 'src/business-modules/account/etities/account.entity';
import { AccountRepository } from 'src/business-modules/account/repositories/account.repository';

@Injectable()
export class UserRepository {
  private readonly tb_users = 'tb_users';

  constructor(
    @InjectRepository(UserEntity)
    private readonly userDataSource: Repository<UserEntity>,
    private readonly accountDataSource: AccountRepository,
  ) {}
  // find all users
  async findAllPaginated({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<User[]> {
    const query = `
      SELECT
      "name",
      "email",
      "Cpf",
      TO_CHAR("birth_date", 'DD/MM/YYYY - HH24:MI:SS'),
      TO_CHAR("created_at", 'DD/MM/YYYY - HH24:MI:SS'),
      TO_CAR("updated_at", DD/MM/YYYY - HH24:MI:SS)
      FROM ${this.tb_users}
      OFFSET $1 LIMIT $2;
    `;

    return await this.userDataSource.query(query, [offset, limit]);
  }

  async countUsers(): Promise<number> {
    const query = `SELECT COUNT(*) FROM ${this.tb_users}`;

    return await this.userDataSource.query(query);
  }

  async findOne(userIdentifier: string): Promise<User> {
    try {
      // verify if identifier is UUID -> if it doesn`t so we use cpf as the unique identifier
      const query = `
        SELECT * FROM ${this.tb_users} as u
        INNER JOIN tb_accounts as acc ON u.id = acc.user_id 
        WHERE id = $1;
    `;

      return await this.userDataSource.query(query, [userIdentifier]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findByCpf(cpf: string): Promise<User> {
    try {
      const query = `
     SELECT * FROM ${this.tb_users} as u
     WHERE u.Cpf = $1;
    `;
      return await this.userDataSource.query(query, [cpf]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // creae an user > user have one account -> one account can make multiple transactions
  async RegisterUser(user: Partial<User>): Promise<User> {
    return await this.userDataSource.save(user);
  }

  async updateUser(user: Partial<User>): Promise<UpdateResult> {
    try {
      return await this.userDataSource
        .createQueryBuilder()
        .update(UserEntity)
        .set(user)
        .where('id = :id', { id: user.id })
        .execute();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // create an user account -> we need account configurations
  async createAccount(userId: string, account: Partial<Account>) {
    try {
      account.user_id = userId;
      return await this.accountDataSource.createAccount(account);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(userId: string) {
    try {
      await this.userDataSource
        .createQueryBuilder()
        .delete()
        .from(UserEntity)
        .where('id = :id', { userId })
        .execute();
    } catch (error) {
      console.error(error);
    }
  }
}
