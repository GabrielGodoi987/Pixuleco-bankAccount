import { AccountRepository } from '../repositories/account.repository';
import { DepositDto } from '../dto/deposit.dto';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('deposit-queue')
export class DepositProcessor {
  constructor(private readonly accountRepository: AccountRepository) {}

  @Process('deposit-processor')
  async process(job: Job<DepositDto>) {
    const { id, data } = job;
    const { account_number, value } = data;
    const account =
      await this.accountRepository.findByAccountNumber(account_number);

    const newCredit = Number(account.credit) + value;

    const update = await this.accountRepository.deposit({
      accountNumber: account.account_number,
      value: newCredit,
      userId: account.user_id,
    });

    console.log(update);

    return {
      id,
    };
  }
}
