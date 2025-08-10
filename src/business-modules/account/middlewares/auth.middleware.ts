import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractBearer(req.headers);
    console.log(token);
    next();
  }

  extractBearer(header: IncomingHttpHeaders) {
    return header;
  }
}
