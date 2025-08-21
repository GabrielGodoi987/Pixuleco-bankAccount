import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AccountRepository } from '../repositories/account.repository';
import { TransactionDto } from '../dto/transaction.dto';
import { BadRequestException } from '@nestjs/common';
import { TransactionsRepository } from '../repositories/transaction.repository';
import { TransactionStatus } from 'src/database/enums/transaction-status.enum';
import { FailureReason } from 'src/database/enums/failure-reason.enum';

// transaction query creation
// we create an transaction in the database
// we update account_from credit
// we updaten to_account credit
// we can notify account from and to account sending emails - tell then that the transaction was successfuly done
/*

  1- entrou na fila a transação já precisa ser criada
  2 - teve falha de não ter crédito suficiente, registramos o erro e guardamos a transaction
  3 - no create da transaction ela precisa ter status de processando
  4 - ao final da transaction ela tem staus de criada e feita
  5 - enviamos notificações e emails para as partes interessadas(um comprovante em pdf pode ser gerado)


  -> se tivermos sucesso ao criar a transaction -> tiramos o dinheiro da conta que enviou e passamos esse valor para a conta que está recebendo
*/

@Processor('transaction-queue')
export class TransactionProcessor {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly transactionRepository: TransactionsRepository,
  ) {}
  @Process('transacion-processor')
  async process(job: Job<TransactionDto>) {
    const { id, data } = job;
    const { from_account, to_account, value } = data;
    console.log(data);
    try {
      const transaction = await this.transactionRepository.transaction({
        amount: value,
        from_account,
        to_account,
        status: TransactionStatus.PENDING,
      });

      const hasEnoughCredit =
        await this.accountRepository.findByAccountNumber(from_account);

      if (value > Number(hasEnoughCredit.credit)) {
        await this.transactionRepository.updateTransactionField(
          transaction.id,
          {
            failure_reason: FailureReason.INSUFFICIENT_FUNDS,
            finished_at: new Date().toISOString(),
          },
        );
        throw new BadRequestException('Sender account has no credit enough');
      }

      // inicia a transação -> tirar dinheiro de uma conta e passar para outra
      await this.accountRepository.withDrawMoney({
        account_number: from_account,
        user_id: transaction.accountFrom.user.id,
        value,
      });

      await this.accountRepository.deposit({
        value,
        accountNumber: to_account,
        userId: transaction.accountTo.user.id,
      });
      return {
        id,
        message: 'Transaction successfully done',
      };
    } catch (error) {
      console.error(error);
    }
  }
}
