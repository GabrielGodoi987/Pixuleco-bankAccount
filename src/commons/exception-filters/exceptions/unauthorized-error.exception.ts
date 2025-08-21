import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedExceptionError extends HttpException {
  constructor(msg: string) {
    super(msg || 'Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
