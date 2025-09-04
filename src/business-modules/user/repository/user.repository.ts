import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly tb_users = 'tb_users';

  constructor(
    @InjectRepository(UserEntity)
    private readonly userDataSource: Repository<UserEntity>,
  ) {}
  // find all users
  async findAllPaginated({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<any[]> {
    const query = `
      SELECT
      "name",
      "email",
      "cpf",
      TO_CHAR("birth_date", 'DD/MM/YYYY - HH24:MI:SS'),
      TO_CHAR("created_at", 'DD/MM/YYYY - HH24:MI:SS'),
      TO_CHAR("updated_at", 'DD/MM/YYYY - HH24:MI:SS')
      FROM ${this.tb_users}
      OFFSET $1 LIMIT $2;
    `;
    return await this.userDataSource.query(query, [offset, limit]);
  }

  async countUsers(): Promise<number> {
    const query = `SELECT COUNT(*) FROM ${this.tb_users}`;
    const [{ count }] = await this.userDataSource.query(query);
    return count;
  }

  async findOne(userIdentifier: string) {
    try {
      // verify if identifier is UUID -> if it doesn`t so we use cpf as the unique identifier
      return await this.userDataSource.findOne({
        where: {
          id: userIdentifier,
        },
        relations: {
          accounts: true,
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findByCpf(cpf: string): Promise<UserEntity | null> {
    try {
      return await this.userDataSource.findOne({
        where: {
          cpf,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.userDataSource.findOne({
        where: {
          email,
        },
      });
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
