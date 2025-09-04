import { SetMetadata } from '@nestjs/common';

export const IsValidPhoneNumber = (...args: string[]) => SetMetadata('is-valid-phone-number', args);
