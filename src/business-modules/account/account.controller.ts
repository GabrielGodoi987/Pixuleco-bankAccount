import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('user/accounts')
export class AccountController {
  constructor(private readonly serviceAccount: AccountService) {}

  async listAccountStateMent() {}
  async createAccount() {}
  async updateAccount() {}
  async transaction() {}
  async withdrawMoney() {}
  async investMoney() {}
}
