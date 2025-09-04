import { SetMetadata } from '@nestjs/common';

export const IsValidCpf = (...args: string[]) => SetMetadata('is-valid-cpf', args);
