import { Processor } from '@nestjs/bullmq';

@Processor('investiment-job')
export class InvestimentProcessor {}
