import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

export class UtilsService {
  static extractHeaderToken(req: Request) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || Array.isArray(authHeader)) {
      throw new BadRequestException('Missing or invalid Authorization header');
    }

    const [type, token] = authHeader.split(' ');

    if (type != 'Bearer') {
      throw new BadRequestException();
    }

    return token;
  }
}
