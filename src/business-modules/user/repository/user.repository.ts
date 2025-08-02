import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
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
    // offset e limit -> retorna a quantidade de itens
    // count -> para sabermos quantas páginas nós temos
    // offset = página atual em que estamos
    // next page = offset + 1 (se offset == count, então nextpage = null)
    // previous page = offset - 1(se offset == 1 ou 0, então previous = null)
    const query = `
      SELECT
      name,
      email,
      cpf,
      TO_CHAR(birth_date, 'DD/MM/YYYY - HH24:MI:SS'),
      TO_CHAR(created_at, 'DD/MM/YYYY - HH24:MI:SS'),
      updated_at
      FROM ${this.tb_users}
      OFFSET $1 LIMIT $2;
    `;

    return await this.userDataSource.query(query, [offset, limit]);
  }

  async countUsers(): Promise<number> {
    const query = `SELECT COUNT(*) FROM ${this.tb_users}`;

    return await this.userDataSource.query(query);
  }

  findOne(userIdentifier: string): any {
    return 'encontrar apeas um user' + userIdentifier;
  }

  // creae an user > user have one account -> one account can make multiple transactions
  async RegisterUser(user: Partial<User>): Promise<User> {
    return await this.userDataSource.save(user);
  }
  // create an user account -> we need account configurations
  async createAccount(userId: string, account: Partial<Account>) {
    account.user_id = userId;
    return await this.accountDataSource.createAccount(account);
  }
  // user can make deposits on his account
  // if an acction is running the deposit needs to wait 'till it ends
  async deposit(userId: number, accountNumber: number, value: number) {
    return await this.accountDataSource.deposit({
      userId,
      accountNumber,
      value,
    });
  }
}
