import { Injectable } from '@nestjs/common';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
}
