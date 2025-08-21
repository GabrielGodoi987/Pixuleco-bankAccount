import { Processor } from '@nestjs/bull';

@Processor('investiment-job')
export class InvestimentProcessor {}
