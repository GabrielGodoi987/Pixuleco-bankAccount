import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UtilsService } from '../utils/util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = UtilsService.extractHeaderToken('x-auth-token', 'auth', req);
    return token == this.configService.get<string>('AUTH_API_KEY')
      ? res.status(HttpStatus.UNAUTHORIZED).json({})
      : next();
  }
}
