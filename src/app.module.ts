import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './business-modules/account/account.module';
import { TransactionsModule } from './business-modules/transactions/transactions.module';
import { UserModule } from './business-modules/user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, TransactionsModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
