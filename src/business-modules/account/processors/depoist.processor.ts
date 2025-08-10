import { Processor } from '@nestjs/bullmq';

@Processor('deposit-job')
export class DepositProcessor {}
