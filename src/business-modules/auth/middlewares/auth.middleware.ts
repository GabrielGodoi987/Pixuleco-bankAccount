import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UtilsService } from 'src/commons/utils/util.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = UtilsService.extractHeaderToken(
      'authorization',
      'Bearer',
      req,
    );
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Unauthorized exception',
        status: HttpStatus.UNAUTHORIZED,
        timestamp: new Date().toISOString(),
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync(String(token), {
        secret: this.configService.get<string>('PRIVATE_JWT_KEY'),
      });

      if (
        this.configService.get<string>('PRIVATE_JWT_KEY') !== payload['jwtKey']
      ) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Unauthorized exception',
          status: HttpStatus.UNAUTHORIZED,
          timestamp: new Date().toISOString(),
        });
      }

      next();
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid token',
        status: HttpStatus.UNAUTHORIZED,
        timestamp: new Date().toISOString(),
        err: error.message,
      });
    }
  }
}
